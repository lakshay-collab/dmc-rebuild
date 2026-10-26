"""Tests for Egypt package itinerary endpoints (GET /api/destinations/{dest}/packages/{slug})."""
import os
import pytest
import requests

BASE_URL = os.environ.get('REACT_APP_BACKEND_URL', '').rstrip('/')

EGYPT_SLUGS = [
    "classic-egypt-cairo-nile",
    "pyramids-red-sea-combo",
    "grand-egypt-explorer",
    "desert-oasis-adventure",
    "egypt-luxury-heritage",
    "honeymoon-on-the-nile",
]


@pytest.fixture
def session():
    s = requests.Session()
    s.headers.update({"Content-Type": "application/json"})
    return s


class TestPackageItinerary:
    def test_classic_egypt_cairo_nile_returns_full_data(self, session):
        url = f"{BASE_URL}/api/destinations/Egypt/packages/classic-egypt-cairo-nile"
        r = session.get(url)
        assert r.status_code == 200, r.text
        data = r.json()
        assert data["slug"] == "classic-egypt-cairo-nile"
        assert "Classic Egypt" in data["title"]
        assert data["tag"] == "Bestseller"
        assert data.get("pickup_drop")
        assert data.get("duration")
        assert isinstance(data.get("itinerary"), list) and len(data["itinerary"]) >= 1
        assert isinstance(data.get("inclusions"), list) and len(data["inclusions"]) >= 1
        assert isinstance(data.get("exclusions"), list) and len(data["exclusions"]) >= 1
        assert isinstance(data.get("gallery"), list) and len(data["gallery"]) >= 1
        # _id must not be present
        assert "_id" not in data
        # Itinerary day shape
        day1 = data["itinerary"][0]
        assert "title" in day1 or "day" in day1
        assert isinstance(day1.get("bullets") or day1.get("activities") or [], list)

    def test_honeymoon_on_the_nile_returns_different_package(self, session):
        url = f"{BASE_URL}/api/destinations/Egypt/packages/honeymoon-on-the-nile"
        r = session.get(url)
        assert r.status_code == 200
        data = r.json()
        assert data["slug"] == "honeymoon-on-the-nile"
        # Different title than classic
        assert "classic-egypt-cairo-nile" not in data["title"].lower()
        assert isinstance(data.get("itinerary"), list) and len(data["itinerary"]) >= 1

    def test_nonexistent_slug_returns_404(self, session):
        url = f"{BASE_URL}/api/destinations/Egypt/packages/nonexistent"
        r = session.get(url)
        assert r.status_code == 404

    def test_nonexistent_destination_returns_404(self, session):
        url = f"{BASE_URL}/api/destinations/Mars/packages/classic-egypt-cairo-nile"
        r = session.get(url)
        assert r.status_code == 404

    @pytest.mark.parametrize("slug", EGYPT_SLUGS)
    def test_all_six_egypt_packages_present(self, session, slug):
        url = f"{BASE_URL}/api/destinations/Egypt/packages/{slug}"
        r = session.get(url)
        assert r.status_code == 200, f"Slug {slug} failed: {r.text}"
        data = r.json()
        assert data["slug"] == slug
        assert data["destination_name"].lower() == "egypt"
        assert data.get("title")
        assert len(data.get("itinerary", [])) >= 1

    def test_destination_name_case_insensitive(self, session):
        # lowercase 'egypt' should also work
        url = f"{BASE_URL}/api/destinations/egypt/packages/classic-egypt-cairo-nile"
        r = session.get(url)
        assert r.status_code == 200


if __name__ == "__main__":
    pytest.main([__file__, "-v", "--tb=short"])
