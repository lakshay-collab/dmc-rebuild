"""Tests for Egypt package itineraries with new Maharaja-style structure."""
import os
import pytest
import requests

BASE_URL = os.environ.get("REACT_APP_BACKEND_URL", "https://agent-platform-68.preview.emergentagent.com").rstrip("/")

EGYPT_SLUGS = [
    "classic-egypt-cairo-nile",
    "pyramids-red-sea-combo",
    "grand-egypt-explorer",
    "desert-oasis-adventure",
    "egypt-luxury-heritage",
    "honeymoon-on-the-nile",
]

REQUIRED_KEYS = ["destination_name", "slug", "title", "subtitle", "duration",
                 "hero_image", "starting_price", "highlights", "stays",
                 "pricing", "things_to_know", "includes"]


@pytest.fixture(scope="module")
def session():
    s = requests.Session()
    s.headers.update({"Content-Type": "application/json"})
    return s


# --- New Maharaja-style structure validation ---
class TestNewStructure:
    def test_classic_egypt_returns_full_new_structure(self, session):
        r = session.get(f"{BASE_URL}/api/destinations/Egypt/packages/classic-egypt-cairo-nile")
        assert r.status_code == 200
        d = r.json()
        for k in REQUIRED_KEYS:
            assert k in d, f"missing key {k}"
        assert "_id" not in d
        assert d["title"] == "Classic Egypt \u2014 Cairo & Nile"
        assert d["starting_price"] == "85,000"
        assert d["duration"] == "8 days"
        # highlights array
        assert isinstance(d["highlights"], list) and len(d["highlights"]) == 7
        # stays - first stay sanity
        assert isinstance(d["stays"], list) and len(d["stays"]) >= 4
        first = d["stays"][0]
        for k in ["transport", "day_range", "title", "glance", "hotels", "experiences"]:
            assert k in first
        assert first["day_range"] == "Day 1 - 3"
        assert "Cairo" in first["title"]
        assert len(first["hotels"]) >= 1
        # hotel card has no Add-to-Inquiry style fields - just basic
        h0 = first["hotels"][0]
        assert "name" in h0 and "tier" in h0 and "image" in h0
        # experiences
        assert len(first["experiences"]) >= 1
        e0 = first["experiences"][0]
        assert "title" in e0 and "description" in e0 and "image" in e0
        # pricing
        assert isinstance(d["pricing"], list) and len(d["pricing"]) >= 5
        p0 = d["pricing"][0]
        assert "month" in p0 and "season" in p0 and "price" in p0
        # things to know
        assert len(d["things_to_know"]) == 6
        assert all("title" in f and "content" in f for f in d["things_to_know"])
        # includes
        assert len(d["includes"]) == 5
        assert all("title" in i and "desc" in i for i in d["includes"])

    def test_honeymoon_returns_distinct_package(self, session):
        r = session.get(f"{BASE_URL}/api/destinations/Egypt/packages/honeymoon-on-the-nile")
        assert r.status_code == 200
        d = r.json()
        assert d["slug"] == "honeymoon-on-the-nile"
        assert "Honeymoon" in d["title"]
        assert d["starting_price"] == "1,45,000"
        assert d["duration"] == "8 days"
        assert len(d["stays"]) >= 3
        assert len(d["pricing"]) >= 3

    def test_nonexistent_slug_404(self, session):
        r = session.get(f"{BASE_URL}/api/destinations/Egypt/packages/nonexistent")
        assert r.status_code == 404

    @pytest.mark.parametrize("slug", EGYPT_SLUGS)
    def test_all_six_slugs_new_structure(self, session, slug):
        r = session.get(f"{BASE_URL}/api/destinations/Egypt/packages/{slug}")
        assert r.status_code == 200, f"slug {slug} got {r.status_code}"
        d = r.json()
        for k in REQUIRED_KEYS:
            assert k in d, f"slug {slug} missing {k}"
        assert "_id" not in d
        assert len(d["stays"]) >= 3
        assert len(d["pricing"]) >= 3
