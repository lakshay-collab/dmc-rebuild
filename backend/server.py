from fastapi import FastAPI, APIRouter, HTTPException, Request
from fastapi.staticfiles import StaticFiles
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
import re
import bcrypt
import jwt as pyjwt
from pathlib import Path
from pydantic import BaseModel, Field, ConfigDict
from typing import List, Optional
import uuid
from datetime import datetime, timezone, timedelta

from seed_data import ALL_DESTINATION_DETAILS, PAIRED_DESTINATIONS
from seed_data_new import ADDITIONAL_DESTINATION_DETAILS, ADDITIONAL_PAIRED
from egypt_packages import EGYPT_PACKAGE_ITINERARIES
from agent_routes import create_agent_router
from agent_seed import AGENT_PACKAGES

# Merge new destinations into existing
ALL_DESTINATION_DETAILS.update(ADDITIONAL_DESTINATION_DETAILS)
PAIRED_DESTINATIONS.update(ADDITIONAL_PAIRED)

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

app = FastAPI()
api_router = APIRouter(prefix="/api")
api_router.include_router(create_agent_router(db))

# Models
class Destination(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    country: str
    region: str
    image_url: str
    description: str
    trending: bool = False
    trending_month: Optional[str] = None
    packages_count: int = 0
    rating: float = 4.5
    tags: List[str] = []

class Inquiry(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    first_name: str
    last_name: str
    agency_name: str
    email: str
    phone_code: Optional[str] = "+91"
    phone: Optional[str] = None
    state: Optional[str] = None
    city: Optional[str] = None
    pin_code: Optional[str] = None
    country: Optional[str] = None
    destination: Optional[str] = None
    source_page: Optional[str] = None
    form_type: Optional[str] = None
    comments: Optional[str] = None
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

class InquiryCreate(BaseModel):
    first_name: str
    last_name: str
    agency_name: str
    email: str
    phone_code: Optional[str] = "+91"
    phone: Optional[str] = None
    state: Optional[str] = None
    source_page: Optional[str] = None
    destination: Optional[str] = None
    form_type: Optional[str] = None
    comments: Optional[str] = None
    city: Optional[str] = None
    pin_code: Optional[str] = None
    country: Optional[str] = None

class BlogPost(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    title: str
    slug: str
    excerpt: str
    content: str
    image_url: str
    destination: str
    category: str
    author: str = "Hi DMC Editorial"
    published: bool = True
    featured: bool = False
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))


def _build_sembark_comment(input: InquiryCreate) -> str:
    """Build the comment string for Sembark API from the inquiry data."""
    source = (input.source_page or "").lower()
    parts = []
    if source in ("homepage hero", "signup page", "service - agent portal") or source.startswith("service"):
        parts.append("B2B AGENT REGISTRATION")
        parts.append(f"Agency: {input.agency_name}")
        parts.append(f"Contact Person: {input.first_name} {input.last_name}")
        if input.city:
            parts.append(f"City: {input.city}")
        if input.state:
            parts.append(f"State: {input.state}")
        if input.pin_code:
            parts.append(f"Pin: {input.pin_code}")
    else:
        parts.append(f"Agency: {input.agency_name}")
        if input.city:
            parts.append(f"City: {input.city}")
        if input.state:
            parts.append(f"State: {input.state}")
    parts.append(f"Source: {input.source_page or 'Website'}")
    if input.comments:
        parts.append(f"Notes: {input.comments}")
    return " | ".join(parts)


def _build_sembark_payload(input: InquiryCreate, reference_id: str) -> dict:
    """Build the JSON payload for Sembark trip plan request."""
    payload = {
        "name": f"{input.first_name} {input.last_name}",
        "phone_number": f"{input.phone_code or '+91'}{input.phone or ''}",
        "email": input.email,
        "comments": _build_sembark_comment(input)[:500],
        "reference_id": reference_id[:36],
        "agency_full_name": input.agency_name,
        "agency_short_name": input.agency_name.split(" ")[0] if input.agency_name else "",
        "contact_person_name": f"{input.first_name} {input.last_name}",
        "contact_person_email": input.email,
        "contact_person_phone": f"{input.phone_code or '+91'}{input.phone or ''}",
        "city": input.city or "",
        "state": input.state or "",
        "pin_code": input.pin_code or "",
        "country": input.country or ("India" if (input.phone_code or "").startswith("+91") else ""),
        "source_page": input.source_page or "",
        "form_type": input.form_type or "B2B",
    }
    if input.destination:
        payload["destination"] = input.destination
    return payload


async def forward_to_sembark(input: InquiryCreate, reference_id: str):
    """Forward a lead to Sembark using the correct token based on source_page."""
    import httpx
    sembark_base = os.environ.get("SEMBARK_API_BASE")
    service_token = os.environ.get("SEMBARK_SERVICE_TOKEN")
    destination_token = os.environ.get("SEMBARK_DESTINATION_TOKEN")

    if not sembark_base:
        return {"forwarded": False, "message": "Sembark not configured"}

    source = (input.source_page or "").lower()
    is_destination = source.startswith("destination") or source.startswith("package")
    token = destination_token if is_destination else service_token

    if not token:
        return {"forwarded": False, "message": "Sembark token not configured"}

    payload = _build_sembark_payload(input, reference_id)

    try:
        async with httpx.AsyncClient(timeout=15) as client:
            resp = await client.post(
                f"{sembark_base.rstrip('/')}/integrations/v1/trip-plan-requests",
                json=payload,
                headers={"Authorization": f"Bearer {token}", "Accept": "application/json", "Content-Type": "application/json"},
            )
        if resp.status_code == 201:
            token_type = "destination" if is_destination else "service"
            logger.info(f"Sembark lead created ({token_type}): {reference_id}")
            return {"forwarded": True, "message": f"Lead forwarded to Sembark ({token_type})"}
        else:
            logger.error(f"Sembark API error: {resp.status_code} {resp.text}")
            return {"forwarded": False, "message": f"Sembark returned {resp.status_code}"}
    except httpx.RequestError as e:
        logger.error(f"Sembark connection error: {e}")
        return {"forwarded": False, "message": str(e)}

class BlogPostCreate(BaseModel):
    title: str
    slug: str = ""
    excerpt: str
    content: str
    image_url: str
    destination: str
    category: str
    author: str = "Hi DMC Editorial"
    published: bool = True

class TripPlanRequest(BaseModel):
    name: str
    phone_number: str
    email: Optional[str] = None
    start_date: Optional[str] = None
    no_of_days: Optional[int] = None
    no_of_adults: Optional[int] = None
    no_of_children: Optional[int] = None
    destination: Optional[str] = None
    comments: Optional[str] = None

# Seed data
SEED_DESTINATIONS = [
    {
        "name": "India",
        "country": "India",
        "region": "South Asia",
        "image_url": "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=800&q=80",
        "description": "Ancient temples, vibrant cultures, majestic palaces, and diverse landscapes — from the Himalayas to tropical beaches.",
        "trending": True,
        "trending_month": "February 2026",
        "packages_count": 85,
        "tags": ["culture", "heritage", "adventure"]
    },
    {
        "name": "Greece",
        "country": "Greece",
        "region": "Europe",
        "image_url": "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?w=800&q=80",
        "description": "Sun-kissed islands, ancient ruins, and Mediterranean charm — from Santorini's cliffs to Athens' timeless grandeur.",
        "trending": True,
        "trending_month": "December 2025",
        "packages_count": 47,
        "tags": ["beach", "luxury", "honeymoon"]
    },
    {
        "name": "Japan",
        "country": "Japan",
        "region": "East Asia",
        "image_url": "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=800&q=80",
        "description": "Where ancient tradition meets futurism — cherry blossoms, bullet trains, and culinary artistry.",
        "trending": True,
        "trending_month": "December 2025",
        "packages_count": 63,
        "tags": ["culture", "food", "technology"]
    },
    {
        "name": "Morocco",
        "country": "Morocco",
        "region": "North Africa",
        "image_url": "https://images.unsplash.com/photo-1597212618440-806262de4f6b?w=800&q=80",
        "description": "Spice-scented souks, palatial riads, vast Saharan dunes, and the vibrant energy of Marrakech.",
        "trending": True,
        "trending_month": "December 2025",
        "packages_count": 35,
        "tags": ["culture", "adventure", "luxury"]
    },
    {
        "name": "Indonesia",
        "country": "Indonesia",
        "region": "Southeast Asia",
        "image_url": "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=800&q=80",
        "description": "17,000 islands of paradise — from Bali's terraced temples to Komodo's wild landscapes.",
        "trending": True,
        "trending_month": "December 2025",
        "packages_count": 58,
        "tags": ["wellness", "beach", "culture"]
    },
    {
        "name": "UAE",
        "country": "UAE",
        "region": "Middle East",
        "image_url": "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=800&q=80",
        "description": "The ultimate luxury playground — desert safaris, futuristic skylines, and world-class hospitality.",
        "trending": True,
        "trending_month": "December 2025",
        "packages_count": 72,
        "tags": ["luxury", "shopping", "adventure"]
    },
    {
        "name": "Maldives",
        "country": "Maldives",
        "region": "South Asia",
        "image_url": "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=800&q=80",
        "description": "Overwater villas, crystal lagoons, and the world's most exclusive island escapes.",
        "trending": False,
        "packages_count": 41,
        "tags": ["luxury", "beach", "honeymoon"]
    },
    {
        "name": "South Africa",
        "country": "South Africa",
        "region": "Africa",
        "image_url": "https://images.unsplash.com/photo-1580060839134-75a5edca2e99?w=800&q=80",
        "description": "Safari adventures, coastal beauty, world-class wine regions, and the vibrant spirit of Cape Town.",
        "trending": False,
        "packages_count": 33,
        "tags": ["safari", "adventure", "wine"]
    },
    {
        "name": "Peru",
        "country": "Peru",
        "region": "South America",
        "image_url": "https://images.unsplash.com/photo-1526392060635-9d6019884377?w=800&q=80",
        "description": "Machu Picchu, the Sacred Valley, Amazon rainforest, and 5,000 years of living culture.",
        "trending": False,
        "packages_count": 25,
        "tags": ["history", "adventure", "culture"]
    },
    {
        "name": "New Zealand",
        "country": "New Zealand",
        "region": "Oceania",
        "image_url": "https://images.unsplash.com/photo-1507699622108-4be3abd695ad?w=800&q=80",
        "description": "Dramatic fjords, alpine peaks, and adrenaline-fueled adventures in Middle Earth.",
        "trending": False,
        "packages_count": 31,
        "tags": ["adventure", "nature", "extreme"]
    },
    {
        "name": "Portugal",
        "country": "Portugal",
        "region": "Europe",
        "image_url": "https://images.unsplash.com/photo-1585208798174-6cedd86e019a?w=800&q=80",
        "description": "Sun-drenched coasts, historic cities, world-class surfing, and culinary treasures.",
        "trending": False,
        "packages_count": 39,
        "tags": ["food", "culture", "beach"]
    },
    {
        "name": "Thailand",
        "country": "Thailand",
        "region": "Southeast Asia",
        "image_url": "https://images.unsplash.com/photo-1528181304800-259b08848526?w=800&q=80",
        "description": "Golden temples, tropical islands, legendary street food, and warm Thai hospitality.",
        "trending": False,
        "packages_count": 52,
        "tags": ["beach", "culture", "food"]
    },
    {
        "name": "China",
        "country": "China",
        "region": "East Asia",
        "image_url": "https://images.unsplash.com/photo-1508804185872-d7badad00f7d?w=800&q=80",
        "description": "The Great Wall, ancient dynasties, futuristic cities, and 5,000 years of continuous civilisation.",
        "trending": False,
        "packages_count": 65,
        "tags": ["culture", "history", "food"]
    },
    {
        "name": "South Korea",
        "country": "South Korea",
        "region": "East Asia",
        "image_url": "https://images.unsplash.com/photo-1517154421773-0529f29ea451?w=800&q=80",
        "description": "K-culture capital — ancient palaces, neon-lit streets, temple stays, and culinary mastery.",
        "trending": False,
        "packages_count": 38,
        "tags": ["culture", "food", "technology"]
    },
    {
        "name": "Taiwan",
        "country": "Taiwan",
        "region": "East Asia",
        "image_url": "https://images.unsplash.com/photo-1470004914212-05527e49370b?w=800&q=80",
        "description": "Night markets, mountain gorges, hot springs, and one of Asia's friendliest food cultures.",
        "trending": False,
        "packages_count": 25,
        "tags": ["food", "nature", "culture"]
    },
    {
        "name": "Sri Lanka",
        "country": "Sri Lanka",
        "region": "South Asia",
        "image_url": "https://images.pexels.com/photos/6045035/pexels-photo-6045035.jpeg?auto=compress&cs=tinysrgb&w=800",
        "description": "Tea plantations, ancient ruins, pristine beaches, and wildlife safaris on a compact island.",
        "trending": False,
        "packages_count": 30,
        "tags": ["wildlife", "beach", "culture"]
    },
    {
        "name": "Bhutan",
        "country": "Bhutan",
        "region": "South Asia",
        "image_url": "https://images.unsplash.com/photo-1593331792312-15bead7aaa9b?w=800&q=80",
        "description": "The last Himalayan kingdom — Tiger's Nest, sacred festivals, and Gross National Happiness.",
        "trending": False,
        "packages_count": 15,
        "tags": ["culture", "trekking", "spiritual"]
    },
    {
        "name": "Bali",
        "country": "Indonesia",
        "region": "Southeast Asia",
        "image_url": "https://images.unsplash.com/photo-1573790387438-4da905039392?w=800&q=80",
        "description": "Island of the Gods — rice terraces, temple ceremonies, world-class surf, and luxury villas.",
        "trending": True,
        "trending_month": "April 2026",
        "packages_count": 55,
        "tags": ["wellness", "beach", "luxury"]
    },
    {
        "name": "Vietnam",
        "country": "Vietnam",
        "region": "Southeast Asia",
        "image_url": "https://images.unsplash.com/photo-1583417319070-4a69db38a482?w=800&q=80",
        "description": "Ha Long Bay, ancient Hoi An, Mekong Delta, and the world's most exciting street food scene.",
        "trending": False,
        "packages_count": 42,
        "tags": ["food", "culture", "adventure"]
    },
    {
        "name": "Malaysia",
        "country": "Malaysia",
        "region": "Southeast Asia",
        "image_url": "https://images.unsplash.com/photo-1596422846543-75c6fc197f07?w=800&q=80",
        "description": "Petronas Towers, Borneo rainforests, Langkawi beaches, and a melting pot of cuisines.",
        "trending": False,
        "packages_count": 35,
        "tags": ["food", "nature", "culture"]
    },
    {
        "name": "Singapore",
        "country": "Singapore",
        "region": "Southeast Asia",
        "image_url": "https://images.unsplash.com/photo-1525625293386-3f8f99389edd?w=800&q=80",
        "description": "Garden city-state — Marina Bay, hawker centres, futuristic architecture, and world-class shopping.",
        "trending": False,
        "packages_count": 20,
        "tags": ["luxury", "food", "shopping"]
    },
    {
        "name": "Philippines",
        "country": "Philippines",
        "region": "Southeast Asia",
        "image_url": "https://images.unsplash.com/photo-1518509562904-e7ef99cdcc86?w=800&q=80",
        "description": "7,641 islands of white sand, turquoise lagoons, chocolate hills, and legendary Filipino warmth.",
        "trending": False,
        "packages_count": 30,
        "tags": ["beach", "diving", "adventure"]
    },
    {
        "name": "Cambodia",
        "country": "Cambodia",
        "region": "Southeast Asia",
        "image_url": "https://images.unsplash.com/photo-1569154941061-e231b4725ef1?w=800&q=80",
        "description": "Angkor Wat, floating villages, royal palaces, and a resilient culture steeped in history.",
        "trending": False,
        "packages_count": 22,
        "tags": ["history", "culture", "adventure"]
    },
    {
        "name": "Laos",
        "country": "Laos",
        "region": "Southeast Asia",
        "image_url": "https://images.unsplash.com/photo-1570366583862-f91883984fde?w=800&q=80",
        "description": "Mekong river life, Luang Prabang's monk processions, and Southeast Asia's untouched gem.",
        "trending": False,
        "packages_count": 15,
        "tags": ["culture", "adventure", "nature"]
    },
    {
        "name": "Kazakhstan",
        "country": "Kazakhstan",
        "region": "Central Asia",
        "image_url": "https://images.unsplash.com/photo-1565008576549-57569a49371d?w=800&q=80",
        "description": "Futuristic Nur-Sultan, ancient Silk Road, vast steppes, and nomadic culture at the crossroads of Asia.",
        "trending": False,
        "packages_count": 12,
        "tags": ["adventure", "culture", "nature"]
    },
    {
        "name": "Egypt",
        "country": "Egypt",
        "region": "North Africa",
        "image_url": "https://images.unsplash.com/photo-1553913861-c0fddf2619ee?w=800&q=80",
        "description": "Land of the Pharaohs — the Great Pyramids, Nile cruises, ancient temples, and Red Sea diving.",
        "trending": True,
        "trending_month": "June 2026",
        "packages_count": 55,
        "tags": ["history", "culture", "adventure"]
    },
    {
        "name": "Mauritius",
        "country": "Mauritius",
        "region": "Indian Ocean Islands",
        "image_url": "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&q=80",
        "description": "Turquoise lagoons, coral reefs, luxury resorts, and a multicultural island paradise in the Indian Ocean.",
        "trending": False,
        "packages_count": 25,
        "tags": ["beach", "honeymoon", "luxury"]
    },
    {
        "name": "Seychelles",
        "country": "Seychelles",
        "region": "Indian Ocean Islands",
        "image_url": "https://images.unsplash.com/photo-1589979481223-deb893043163?w=800&q=80",
        "description": "Pristine granite beaches, rare wildlife, and the world's most exclusive island hideaways.",
        "trending": False,
        "packages_count": 18,
        "tags": ["beach", "luxury", "honeymoon"]
    },
    {
        "name": "Nepal",
        "country": "Nepal",
        "region": "South Asia",
        "image_url": "https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=800&q=80",
        "description": "Roof of the world — Everest base camp, ancient Kathmandu temples, and Himalayan adventures.",
        "trending": False,
        "packages_count": 28,
        "tags": ["trekking", "adventure", "spiritual"]
    }
]


@app.on_event("startup")
async def seed_data():
    # Upsert all destinations (ensures new destinations are added even if DB was previously seeded)
    for dest in SEED_DESTINATIONS:
        dest_obj = Destination(**dest)
        doc = dest_obj.model_dump()
        doc['created_at'] = datetime.now(timezone.utc).isoformat()
        existing = await db.destinations.find_one({"name": dest["name"]})
        if not existing:
            await db.destinations.insert_one(doc)
            logger.info(f"Seeded destination: {dest['name']}")
        else:
            # Update fields but preserve the original id and created_at
            await db.destinations.update_one(
                {"name": dest["name"]},
                {"$set": {k: v for k, v in doc.items() if k not in ("id", "created_at")}}
            )

    # Seed/update ALL destination details
    for name, detail in ALL_DESTINATION_DETAILS.items():
        existing = await db.destination_details.find_one({"destination_name": name})
        if not existing:
            await db.destination_details.insert_one({**detail, "created_at": datetime.now(timezone.utc).isoformat()})
            logger.info(f"Seeded detail for {name}")
        else:
            await db.destination_details.replace_one({"destination_name": name}, {**detail, "created_at": datetime.now(timezone.utc).isoformat()})
            logger.info(f"Updated detail for {name}")

    # Seed/update blog posts
    blog_count = await db.blog_posts.count_documents({})
    if blog_count == 0:
        from blog_seed import SEED_BLOG_POSTS
        for post_data in SEED_BLOG_POSTS:
            post = BlogPost(**post_data)
            doc = post.model_dump()
            doc['created_at'] = doc['created_at'].isoformat()
            await db.blog_posts.insert_one(doc)
        logger.info(f"Seeded {len(SEED_BLOG_POSTS)} blog posts")
    else:
        from blog_seed import SEED_BLOG_POSTS
        for post_data in SEED_BLOG_POSTS:
            await db.blog_posts.update_one(
                {"slug": post_data["slug"]},
                {"$set": {"content": post_data["content"], "excerpt": post_data["excerpt"]}},
            )

    # Seed/update imported blog posts (Top 200), upserted by slug so they are added
    # whether or not the DB was previously seeded, preserving each post's id/created_at.
    top200_path = ROOT_DIR / "top200_blogs.json"
    if top200_path.exists():
        import json as _json
        with open(top200_path, "r", encoding="utf-8") as _f:
            imported_posts = _json.load(_f)
        _added = 0
        for post_data in imported_posts:
            post = BlogPost(**post_data)
            doc = post.model_dump()
            if isinstance(doc.get("created_at"), datetime):
                doc["created_at"] = doc["created_at"].isoformat()
            existing = await db.blog_posts.find_one({"slug": doc["slug"]})
            if not existing:
                await db.blog_posts.insert_one(doc)
                _added += 1
            else:
                await db.blog_posts.update_one(
                    {"slug": doc["slug"]},
                    {"$set": {k: v for k, v in doc.items() if k not in ("id", "created_at")}},
                )
        logger.info(f"Imported blog posts: {_added} new, {len(imported_posts)} total upserted")

    # Seed/update package itineraries
    for pkg in EGYPT_PACKAGE_ITINERARIES:
        existing = await db.package_itineraries.find_one({"slug": pkg["slug"], "destination_name": pkg["destination_name"]})
        if not existing:
            await db.package_itineraries.insert_one({**pkg, "created_at": datetime.now(timezone.utc).isoformat()})
            logger.info(f"Seeded itinerary: {pkg['slug']}")
        else:
            await db.package_itineraries.replace_one({"slug": pkg["slug"], "destination_name": pkg["destination_name"]}, {**pkg, "created_at": datetime.now(timezone.utc).isoformat()})
            logger.info(f"Updated itinerary: {pkg['slug']}")

    # Seed/update agent packages
    for pkg in AGENT_PACKAGES:
        existing = await db.agent_packages.find_one({"destination": pkg["destination"], "title": pkg["title"]})
        if not existing:
            await db.agent_packages.insert_one({**pkg, "created_at": datetime.now(timezone.utc).isoformat()})
            logger.info(f"Seeded agent package: {pkg['title']}")
        else:
            await db.agent_packages.replace_one(
                {"destination": pkg["destination"], "title": pkg["title"]},
                {**pkg, "created_at": datetime.now(timezone.utc).isoformat()}
            )

    # Ensure agents collection index
    await db.agents.create_index("email", unique=True)

@api_router.get("/")
async def root():
    return {"message": "Hi DMC API"}


@api_router.get("/destinations", response_model=List[Destination])
async def get_destinations():
    destinations = await db.destinations.find({}, {"_id": 0}).to_list(100)
    return destinations


@api_router.get("/destinations/trending", response_model=List[Destination])
async def get_trending_destinations():
    destinations = await db.destinations.find({"trending": True}, {"_id": 0}).to_list(20)
    return destinations


@api_router.get("/destinations/detail/{name}")
async def get_destination_detail(name: str):
    safe_name = re.escape(name)
    destination = await db.destinations.find_one(
        {"name": {"$regex": f"^{safe_name}$", "$options": "i"}},
        {"_id": 0}
    )
    if not destination:
        raise HTTPException(status_code=404, detail="Destination not found")

    detail = await db.destination_details.find_one(
        {"destination_name": {"$regex": f"^{safe_name}$", "$options": "i"}},
        {"_id": 0}
    )

    # Add paired destinations
    paired = PAIRED_DESTINATIONS.get(destination.get("name", ""), [])
    paired_list = []
    if paired:
        for pname in paired:
            pdoc = await db.destinations.find_one({"name": pname}, {"_id": 0})
            if pdoc:
                paired_list.append(pdoc)

    return {**destination, "detail": detail, "paired_destinations": paired_list}


@api_router.get("/destinations/{dest_name}/packages/{slug}")
async def get_package_itinerary(dest_name: str, slug: str):
    safe_name = re.escape(dest_name)
    pkg = await db.package_itineraries.find_one(
        {"destination_name": {"$regex": f"^{safe_name}$", "$options": "i"}, "slug": slug},
        {"_id": 0}
    )
    if not pkg:
        raise HTTPException(status_code=404, detail="Package itinerary not found")
    return pkg


@api_router.get("/destinations/region/{region}", response_model=List[Destination])
async def get_destinations_by_region(region: str):
    destinations = await db.destinations.find(
        {"region": {"$regex": region, "$options": "i"}},
        {"_id": 0}
    ).to_list(50)
    return destinations


@api_router.post("/inquiries")
async def create_inquiry(input: InquiryCreate):
    import asyncio
    from email_service import send_thank_you_email

    reference_id = f"HIDMC_{int(datetime.now(timezone.utc).timestamp())}"
    inquiry_obj = Inquiry(**{k: v for k, v in input.model_dump().items() if k in Inquiry.model_fields})
    doc = inquiry_obj.model_dump()
    doc['created_at'] = doc['created_at'].isoformat()
    await db.inquiries.insert_one(doc)
    doc.pop('_id', None)

    logger.info(f"NEW LEAD: {input.first_name} {input.last_name} | Agency: {input.agency_name} | Source: {input.source_page} | Dest: {input.destination or '-'}")

    sembark_result = await forward_to_sembark(input, reference_id)

    # Send thank-you email in background (non-blocking)
    if input.email:
        asyncio.get_event_loop().run_in_executor(
            None,
            lambda: asyncio.run(send_thank_you_email(
                input.email, input.first_name or "there", input.agency_name or "",
                input.destination, input.source_page
            ))
        )

    return {"id": inquiry_obj.id, "reference_id": reference_id, "sembark": sembark_result}


# ── Admin Auth ──

class AdminLogin(BaseModel):
    email: str
    password: str

def verify_admin(email: str, password: str) -> bool:
    return email == os.environ.get("ADMIN_EMAIL") and password == os.environ.get("ADMIN_PASSWORD")

def create_admin_token(email: str) -> str:
    payload = {"sub": email, "exp": datetime.now(timezone.utc) + timedelta(hours=12), "type": "admin"}
    return pyjwt.encode(payload, os.environ.get("JWT_SECRET", ""), algorithm="HS256")

def verify_admin_token(request: Request) -> str:
    # Check httpOnly cookie first, then fall back to Authorization header
    token = request.cookies.get("hidmc_admin")
    if not token:
        auth = request.headers.get("Authorization", "")
        if not auth.startswith("Bearer "):
            raise HTTPException(status_code=401, detail="Not authenticated")
        token = auth[7:]
    try:
        payload = pyjwt.decode(token, os.environ.get("JWT_SECRET", ""), algorithms=["HS256"])
        if payload.get("type") != "admin":
            raise HTTPException(status_code=401, detail="Invalid token")
        return payload["sub"]
    except pyjwt.ExpiredSignatureError:
        raise HTTPException(status_code=401, detail="Session expired")
    except pyjwt.InvalidTokenError:
        raise HTTPException(status_code=401, detail="Invalid token")

@api_router.post("/admin/login")
async def admin_login(req: AdminLogin):
    from starlette.responses import JSONResponse
    if not verify_admin(req.email, req.password):
        raise HTTPException(status_code=401, detail="Invalid credentials")
    token = create_admin_token(req.email)
    response = JSONResponse({"token": token, "email": req.email})
    response.set_cookie(
        key="hidmc_admin",
        value=token,
        httponly=True,
        secure=True,
        samesite="lax",
        max_age=86400,
        path="/api",
    )
    return response

@api_router.post("/admin/logout")
async def admin_logout():
    from starlette.responses import JSONResponse
    response = JSONResponse({"status": "ok"})
    response.delete_cookie("hidmc_admin", path="/api")
    return response

@api_router.get("/admin/verify")
async def admin_verify(request: Request):
    email = verify_admin_token(request)
    return {"authenticated": True, "email": email}

@api_router.get("/admin/signups")
async def get_signups(request: Request, date: Optional[str] = None, page: int = 1, limit: int = 20, tab: str = "service", period: str = "week"):
    verify_admin_token(request)
    query = {}

    # Tab filter: service vs destination
    if tab == "service":
        query["$or"] = [
            {"source_page": {"$regex": "^(Homepage Hero|Signup Page|Service)", "$options": "i"}},
            {"source_page": {"$exists": False}},
        ]
    elif tab == "destination":
        query["$or"] = [
            {"source_page": {"$regex": "^(Destination|Package)", "$options": "i"}},
        ]

    # Period filter
    if date:
        query["created_at"] = {"$regex": f"^{date}"}
    elif period != "all":
        now = datetime.now(timezone.utc)
        if period == "today":
            start = now.replace(hour=0, minute=0, second=0, microsecond=0)
        elif period == "week":
            start = now - timedelta(days=now.weekday())
            start = start.replace(hour=0, minute=0, second=0, microsecond=0)
        elif period == "month":
            start = now.replace(day=1, hour=0, minute=0, second=0, microsecond=0)
        else:
            start = None
        if start:
            query["created_at"] = {"$gte": start.isoformat()}

    total = await db.inquiries.count_documents(query)
    skip = (page - 1) * limit
    cursor = db.inquiries.find(query, {"_id": 0}).sort("created_at", -1).skip(skip).limit(limit)
    signups = await cursor.to_list(length=limit)
    return {"total": total, "page": page, "limit": limit, "has_more": skip + limit < total, "signups": signups}


# ── Onboarding Checklist ──

ONBOARDING_STEPS = [
    {"step": "Initial Call with Agent", "assigned_to": "Amit Verma"},
    {"step": "Video Call / Demo", "assigned_to": "Amit Verma"},
    {"step": "Onboard on Agent Portal", "assigned_to": "Sneha Kapoor"},
    {"step": "Agent Portal Training", "assigned_to": "Sneha Kapoor"},
    {"step": "Add to Email Lists", "assigned_to": "Priya Mehta"},
    {"step": "Add to WhatsApp Group", "assigned_to": "Priya Mehta"},
    {"step": "Generate Initial Leads / Start Work", "assigned_to": "Rohan Gupta"},
    {"step": "Handover to Sales Team", "assigned_to": "Rohan Gupta"},
]

@api_router.get("/admin/onboarding/{lead_id}")
async def get_onboarding(lead_id: str, request: Request):
    verify_admin_token(request)
    doc = await db.onboarding.find_one({"lead_id": lead_id}, {"_id": 0})
    if not doc:
        # Create default checklist for this lead
        doc = {
            "lead_id": lead_id,
            "checklist": [
                {**s, "completed": False, "completed_at": None, "approved": False, "approved_at": None, "comments": ""}
                for s in ONBOARDING_STEPS
            ],
            "created_at": datetime.now(timezone.utc).isoformat(),
            "updated_at": datetime.now(timezone.utc).isoformat(),
        }
        await db.onboarding.insert_one(doc)
        doc.pop("_id", None)
    return doc

@api_router.put("/admin/onboarding/{lead_id}")
async def update_onboarding(lead_id: str, request: Request):
    verify_admin_token(request)
    body = await request.json()
    checklist = body.get("checklist", [])
    await db.onboarding.update_one(
        {"lead_id": lead_id},
        {"$set": {"checklist": checklist, "updated_at": datetime.now(timezone.utc).isoformat()}},
        upsert=True,
    )
    return {"status": "updated"}


@api_router.get("/stats")
async def get_stats():
    dest_count = await db.destinations.count_documents({})
    inquiry_count = await db.inquiries.count_documents({})
    regions = await db.destinations.distinct("region")
    return {
        "destinations": dest_count,
        "regions": len(regions),
        "inquiries": inquiry_count,
        "partners": 850,
        "countries": 45,
        "bookings_annual": 125000
    }


# Blog endpoints
@api_router.get("/blog")
async def get_blog_posts(destination: Optional[str] = None, category: Optional[str] = None):
    query = {"published": True}
    if destination:
        query["destination"] = {"$regex": f"^{re.escape(destination)}$", "$options": "i"}
    if category:
        query["category"] = {"$regex": f"^{re.escape(category)}$", "$options": "i"}
    posts = await db.blog_posts.find(query, {"_id": 0}).sort("created_at", -1).to_list(1000)
    destinations = await db.blog_posts.distinct("destination", {"published": True})
    categories = await db.blog_posts.distinct("category", {"published": True})
    return {"posts": posts, "destinations": sorted(destinations), "categories": sorted(categories)}


@api_router.get("/blog/{slug}")
async def get_blog_post(slug: str):
    post = await db.blog_posts.find_one({"slug": slug, "published": True}, {"_id": 0})
    if not post:
        raise HTTPException(status_code=404, detail="Post not found")
    return post


@api_router.post("/blog", response_model=BlogPost)
async def create_blog_post(input: BlogPostCreate):
    if not input.slug:
        input.slug = re.sub(r'[^a-z0-9]+', '-', input.title.lower()).strip('-')
    existing = await db.blog_posts.find_one({"slug": input.slug})
    if existing:
        raise HTTPException(status_code=400, detail="A post with this slug already exists")
    post = BlogPost(**input.model_dump())
    doc = post.model_dump()
    doc['created_at'] = doc['created_at'].isoformat()
    await db.blog_posts.insert_one(doc)
    doc.pop('_id', None)
    return post


@api_router.put("/blog/{post_id}")
async def update_blog_post(post_id: str, input: BlogPostCreate):
    if not input.slug:
        input.slug = re.sub(r'[^a-z0-9]+', '-', input.title.lower()).strip('-')
    update_data = input.model_dump()
    result = await db.blog_posts.update_one({"id": post_id}, {"$set": update_data})
    if result.matched_count == 0:
        raise HTTPException(status_code=404, detail="Post not found")
    updated = await db.blog_posts.find_one({"id": post_id}, {"_id": 0})
    return updated


@api_router.delete("/blog/{post_id}")
async def delete_blog_post(post_id: str):
    result = await db.blog_posts.delete_one({"id": post_id})
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Post not found")
    return {"message": "Post deleted"}


@api_router.get("/admin/blog")
async def get_all_blog_posts():
    posts = await db.blog_posts.find({}, {"_id": 0}).sort("created_at", -1).to_list(500)
    return {"posts": posts, "total": len(posts)}


class AgentPortalLead(BaseModel):
    first_name: str
    last_name: str
    agency_name: str
    email: str
    phone_code: Optional[str] = "+91"
    phone: Optional[str] = None
    state: Optional[str] = None
    comments: Optional[str] = None


@api_router.post("/agent-portal-lead")
async def create_agent_portal_lead(req: AgentPortalLead):
    """Agent Portal form — routes through unified inquiry + Sembark pipeline."""
    return await create_inquiry(InquiryCreate(
        first_name=req.first_name, last_name=req.last_name,
        agency_name=req.agency_name, email=req.email,
        phone_code=req.phone_code, phone=req.phone,
        state=req.state or "", source_page="Service - Agent Portal",
        form_type="B2B", comments=req.comments,
    ))


@api_router.post("/trip-plan-request")
async def create_trip_plan_request(req: TripPlanRequest):
    import httpx
    sembark_base = os.environ.get("SEMBARK_API_BASE")
    sembark_token = os.environ.get("SEMBARK_API_TOKEN")
    if not sembark_base or not sembark_token:
        raise HTTPException(status_code=500, detail="Sembark integration not configured")

    reference_id = f"WEBSITE_{int(datetime.now(timezone.utc).timestamp())}"
    payload = {"name": req.name, "phone_number": req.phone_number, "reference_id": reference_id}
    if req.email:
        payload["email"] = req.email
    if req.start_date:
        payload["start_date"] = req.start_date
    if req.no_of_days is not None:
        payload["no_of_days"] = req.no_of_days
    if req.no_of_adults is not None:
        payload["no_of_adults"] = req.no_of_adults
    if req.no_of_children is not None:
        payload["no_of_children"] = req.no_of_children
    if req.destination:
        payload["destination"] = req.destination
    if req.comments:
        payload["comments"] = req.comments

    try:
        async with httpx.AsyncClient(timeout=15) as client:
            resp = await client.post(
                f"{sembark_base.rstrip('/')}/integrations/v1/trip-plan-requests",
                json=payload,
                headers={"Authorization": f"Bearer {sembark_token}", "Accept": "application/json", "Content-Type": "application/json"},
            )
        if resp.status_code == 201:
            return {"success": True, "message": "Trip plan request submitted successfully", "reference_id": reference_id}
        else:
            logger.error(f"Sembark API error: {resp.status_code} {resp.text}")
            raise HTTPException(status_code=502, detail=f"Sembark returned {resp.status_code}")
    except httpx.RequestError as e:
        logger.error(f"Sembark connection error: {e}")
        raise HTTPException(status_code=502, detail="Could not reach Sembark API")


app.include_router(api_router)

# Serve static files (office photos, etc.)
static_dir = ROOT_DIR / "static"
if static_dir.exists():
    app.mount("/api/static", StaticFiles(directory=str(static_dir)), name="static")

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)


@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
