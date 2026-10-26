"""Regression tests for Nepal & Maldives destinations addition (iteration_13)."""
import os
import requests
import pytest

BASE_URL = os.environ.get("REACT_APP_BACKEND_URL", "https://agent-platform-68.preview.emergentagent.com").rstrip("/")


@pytest.fixture(scope="module")
def destinations():
    r = requests.get(f"{BASE_URL}/api/destinations", timeout=30)
    assert r.status_code == 200, f"GET /api/destinations failed: {r.status_code}"
    return r.json()


# --- Destinations list ---
def test_destinations_count_is_29(destinations):
    assert len(destinations) == 29, f"Expected 29 destinations, got {len(destinations)}"


def test_nepal_present_with_region(destinations):
    nepal = [d for d in destinations if d["name"] == "Nepal"]
    assert nepal, "Nepal missing from /api/destinations"
    assert nepal[0]["region"] == "South Asia"


def test_maldives_present_with_region(destinations):
    mal = [d for d in destinations if d["name"] == "Maldives"]
    assert mal, "Maldives missing from /api/destinations"
    assert mal[0]["region"] == "South Asia"


def test_south_asia_has_five_destinations(destinations):
    sa = sorted(d["name"] for d in destinations if d.get("region") == "South Asia")
    assert sa == ["Bhutan", "India", "Maldives", "Nepal", "Sri Lanka"], f"South Asia mismatch: {sa}"


# --- Nepal detail endpoint ---
@pytest.fixture(scope="module")
def nepal_detail():
    r = requests.get(f"{BASE_URL}/api/destinations/detail/Nepal", timeout=30)
    assert r.status_code == 200, f"Nepal detail failed: {r.status_code}"
    return r.json()


def test_nepal_detail_hero_image(nepal_detail):
    assert nepal_detail["detail"]["hero_image"], "Nepal hero_image missing"


def test_nepal_detail_six_packages(nepal_detail):
    pkgs = nepal_detail["detail"].get("packages", [])
    assert len(pkgs) == 6, f"Expected 6 packages, got {len(pkgs)}"


def test_nepal_detail_four_experiences(nepal_detail):
    exps = nepal_detail["detail"].get("key_experiences", [])
    assert len(exps) == 4, f"Expected 4 experiences, got {len(exps)}"


def test_nepal_paired_destinations(nepal_detail):
    paired = nepal_detail.get("paired_destinations", [])
    assert len(paired) >= 1, "Nepal paired_destinations missing"
    names = [p["name"] for p in paired]
    # Should be South Asian neighbors
    assert any(n in names for n in ["India", "Bhutan", "Sri Lanka"]), f"Unexpected paired: {names}"


# --- Maldives detail endpoint ---
@pytest.fixture(scope="module")
def maldives_detail():
    r = requests.get(f"{BASE_URL}/api/destinations/detail/Maldives", timeout=30)
    assert r.status_code == 200, f"Maldives detail failed: {r.status_code}"
    return r.json()


def test_maldives_detail_has_packages(maldives_detail):
    pkgs = maldives_detail["detail"].get("packages", [])
    assert len(pkgs) >= 1, f"Maldives packages missing, got {len(pkgs)}"


def test_maldives_detail_has_experiences(maldives_detail):
    exps = maldives_detail["detail"].get("key_experiences", [])
    assert len(exps) >= 1, f"Maldives key_experiences missing"
