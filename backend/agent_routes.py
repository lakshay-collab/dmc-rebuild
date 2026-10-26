"""Agent Portal routes — auth, packages, and RFP."""
from fastapi import APIRouter, HTTPException, Request
from pydantic import BaseModel, Field
import bcrypt
import jwt as pyjwt
import os
import logging
from datetime import datetime, timezone, timedelta
from typing import Optional, List
import uuid

logger = logging.getLogger("agent")


# ── Pydantic Models ───────────────────────────────────────────
class AgentRegister(BaseModel):
    name: str
    email: str
    password: str
    agency_name: str
    phone: Optional[str] = None

class AgentLogin(BaseModel):
    email: str
    password: str

class RFPCreate(BaseModel):
    destination: str
    package_title: Optional[str] = None
    pax_count: Optional[int] = None
    travel_dates: Optional[str] = None
    message: Optional[str] = None


# ── Helpers ───────────────────────────────────────────────────
def hash_password(password: str) -> str:
    return bcrypt.hashpw(password.encode("utf-8"), bcrypt.gensalt()).decode("utf-8")

def verify_password(plain: str, hashed: str) -> bool:
    return bcrypt.checkpw(plain.encode("utf-8"), hashed.encode("utf-8"))

def create_agent_token(agent_id: str, email: str) -> str:
    payload = {
        "sub": agent_id,
        "email": email,
        "exp": datetime.now(timezone.utc) + timedelta(hours=24),
        "type": "agent",
    }
    return pyjwt.encode(payload, os.environ.get("JWT_SECRET", ""), algorithm="HS256")

async def get_current_agent(request: Request, db):
    auth = request.headers.get("Authorization", "")
    if not auth.startswith("Bearer "):
        raise HTTPException(status_code=401, detail="Not authenticated")
    token = auth[7:]
    try:
        payload = pyjwt.decode(token, os.environ.get("JWT_SECRET", ""), algorithms=["HS256"])
        if payload.get("type") != "agent":
            raise HTTPException(status_code=401, detail="Invalid token")
        agent = await db.agents.find_one({"id": payload["sub"]})
        if not agent:
            raise HTTPException(status_code=401, detail="Agent not found")
        agent.pop("_id", None)
        agent.pop("password_hash", None)
        return agent
    except pyjwt.ExpiredSignatureError:
        raise HTTPException(status_code=401, detail="Session expired")
    except pyjwt.InvalidTokenError:
        raise HTTPException(status_code=401, detail="Invalid token")


# ── Router Factory ────────────────────────────────────────────
def create_agent_router(db):
    router = APIRouter(prefix="/agent", tags=["agent"])

    @router.post("/register")
    async def agent_register(req: AgentRegister):
        email = req.email.strip().lower()
        existing = await db.agents.find_one({"email": email})
        if existing:
            raise HTTPException(status_code=400, detail="Email already registered")
        agent_id = str(uuid.uuid4())
        doc = {
            "id": agent_id,
            "name": req.name.strip(),
            "email": email,
            "password_hash": hash_password(req.password),
            "agency_name": req.agency_name.strip(),
            "phone": req.phone or "",
            "approved": True,
            "role": "agent",
            "created_at": datetime.now(timezone.utc).isoformat(),
        }
        await db.agents.insert_one(doc)
        token = create_agent_token(agent_id, email)
        return {
            "token": token,
            "agent": {"id": agent_id, "name": doc["name"], "email": email, "agency_name": doc["agency_name"]},
        }

    @router.post("/login")
    async def agent_login(req: AgentLogin):
        email = req.email.strip().lower()
        agent = await db.agents.find_one({"email": email})
        if not agent or not verify_password(req.password, agent["password_hash"]):
            raise HTTPException(status_code=401, detail="Invalid email or password")
        token = create_agent_token(agent["id"], email)
        return {
            "token": token,
            "agent": {"id": agent["id"], "name": agent["name"], "email": email, "agency_name": agent["agency_name"]},
        }

    @router.get("/me")
    async def agent_me(request: Request):
        agent = await get_current_agent(request, db)
        return agent

    @router.get("/packages")
    async def get_agent_packages(destination: Optional[str] = None, type: Optional[str] = None):
        query = {}
        if destination:
            query["destination"] = destination
        if type and type.lower() in ("fit", "group"):
            query["type"] = type.upper() if type.upper() == "FIT" else type.capitalize()
        packages = await db.agent_packages.find(query, {"_id": 0}).to_list(100)
        return packages

    @router.get("/destinations")
    async def get_agent_destinations():
        """Return the list of destinations that have agent packages."""
        pipeline = [
            {"$group": {"_id": "$destination", "count": {"$sum": 1}}},
            {"$sort": {"_id": 1}},
        ]
        results = await db.agent_packages.aggregate(pipeline).to_list(20)
        # Fetch destination images from the main destinations collection
        destinations = []
        for r in results:
            dest_doc = await db.destinations.find_one({"name": r["_id"]}, {"_id": 0, "name": 1, "image_url": 1, "region": 1})
            destinations.append({
                "name": r["_id"],
                "packages_count": r["count"],
                "image_url": dest_doc["image_url"] if dest_doc else "",
                "region": dest_doc.get("region", "") if dest_doc else "",
            })
        return destinations

    @router.post("/rfp")
    async def submit_rfp(req: RFPCreate, request: Request):
        agent = await get_current_agent(request, db)
        rfp_doc = {
            "id": str(uuid.uuid4()),
            "agent_id": agent["id"],
            "agent_name": agent["name"],
            "agency_name": agent["agency_name"],
            "agent_email": agent["email"],
            "destination": req.destination,
            "package_title": req.package_title or "",
            "pax_count": req.pax_count,
            "travel_dates": req.travel_dates or "",
            "message": req.message or "",
            "status": "pending",
            "created_at": datetime.now(timezone.utc).isoformat(),
        }
        await db.rfp_requests.insert_one(rfp_doc)
        logger.info(f"RFP submitted by {agent['email']} for {req.destination}")
        return {"status": "ok", "rfp_id": rfp_doc["id"]}

    return router
