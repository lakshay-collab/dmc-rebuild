"""Agent Portal backend tests — auth, packages, destinations, RFP."""
import os
import uuid
import pytest
import requests

BASE_URL = os.environ.get("REACT_APP_BACKEND_URL", "https://agent-platform-68.preview.emergentagent.com").rstrip("/")
API = f"{BASE_URL}/api/agent"


# ── Fixtures ──────────────────────────────────────────────
@pytest.fixture(scope="module")
def client():
    s = requests.Session()
    s.headers.update({"Content-Type": "application/json"})
    return s


@pytest.fixture(scope="module")
def existing_agent_token(client):
    """Login with pre-seeded test agent."""
    r = client.post(f"{API}/login", json={"email": "test@agency.com", "password": "test1234"})
    if r.status_code != 200:
        pytest.skip(f"Pre-existing test agent login failed ({r.status_code}): {r.text}")
    return r.json()["token"]


@pytest.fixture(scope="module")
def new_agent(client):
    """Register a fresh agent so we have full round-trip coverage."""
    unique = uuid.uuid4().hex[:8]
    payload = {
        "name": "TEST Agent",
        "email": f"TEST_agent_{unique}@example.com",
        "password": "SecurePass123!",
        "agency_name": "TEST Agency",
        "phone": "+9199988877",
    }
    r = client.post(f"{API}/register", json=payload)
    assert r.status_code == 200, f"Register failed: {r.status_code} {r.text}"
    data = r.json()
    assert "token" in data and "agent" in data
    return {"payload": payload, "token": data["token"], "agent": data["agent"]}


# ── Registration ──────────────────────────────────────────
class TestAgentRegistration:
    def test_register_returns_token_and_agent(self, new_agent):
        assert new_agent["token"]
        agent = new_agent["agent"]
        assert agent["email"] == new_agent["payload"]["email"].lower()
        assert agent["name"] == new_agent["payload"]["name"]
        assert agent["agency_name"] == new_agent["payload"]["agency_name"]
        assert "id" in agent and isinstance(agent["id"], str)

    def test_duplicate_email_returns_400(self, client, new_agent):
        r = client.post(f"{API}/register", json=new_agent["payload"])
        assert r.status_code == 400, f"Expected 400, got {r.status_code}: {r.text}"


# ── Login ────────────────────────────────────────────────
class TestAgentLogin:
    def test_login_success(self, client, new_agent):
        r = client.post(f"{API}/login", json={
            "email": new_agent["payload"]["email"],
            "password": new_agent["payload"]["password"],
        })
        assert r.status_code == 200
        data = r.json()
        assert data["token"]
        assert data["agent"]["email"] == new_agent["payload"]["email"].lower()

    def test_login_wrong_password_returns_401(self, client, new_agent):
        r = client.post(f"{API}/login", json={
            "email": new_agent["payload"]["email"],
            "password": "wrongwrong",
        })
        assert r.status_code == 401

    def test_login_unknown_email_returns_401(self, client):
        r = client.post(f"{API}/login", json={
            "email": f"nonexistent_{uuid.uuid4().hex[:6]}@nowhere.com",
            "password": "whatever",
        })
        assert r.status_code == 401

    def test_predefined_agent_login(self, existing_agent_token):
        assert existing_agent_token  # fixture will skip if unavailable


# ── /me ──────────────────────────────────────────────────
class TestAgentMe:
    def test_me_requires_auth(self, client):
        r = client.get(f"{API}/me")
        assert r.status_code == 401

    def test_me_returns_agent(self, client, new_agent):
        r = client.get(f"{API}/me", headers={"Authorization": f"Bearer {new_agent['token']}"})
        assert r.status_code == 200
        agent = r.json()
        assert agent["email"] == new_agent["payload"]["email"].lower()
        assert "password_hash" not in agent
        assert "_id" not in agent

    def test_me_invalid_token(self, client):
        r = client.get(f"{API}/me", headers={"Authorization": "Bearer garbage"})
        assert r.status_code == 401


# ── Destinations ─────────────────────────────────────────
class TestAgentDestinations:
    def test_destinations_returns_three(self, client):
        r = client.get(f"{API}/destinations")
        assert r.status_code == 200
        data = r.json()
        names = sorted(d["name"] for d in data)
        assert names == ["Egypt", "Sri Lanka", "Vietnam"], f"Unexpected destinations: {names}"
        for d in data:
            assert d["packages_count"] == 4, f"{d['name']} has {d['packages_count']} packages, expected 4"
            assert "image_url" in d
            assert "region" in d


# ── Packages ────────────────────────────────────────────
class TestAgentPackages:
    def test_all_packages(self, client):
        r = client.get(f"{API}/packages")
        assert r.status_code == 200
        pkgs = r.json()
        assert len(pkgs) == 12, f"Expected 12 packages, got {len(pkgs)}"
        for p in pkgs:
            assert p["destination"] in ("Sri Lanka", "Vietnam", "Egypt")
            assert p["type"] in ("FIT", "Group")
            assert "_id" not in p

    def test_filter_by_destination(self, client):
        for dest in ("Sri Lanka", "Vietnam", "Egypt"):
            r = client.get(f"{API}/packages", params={"destination": dest})
            assert r.status_code == 200
            pkgs = r.json()
            assert len(pkgs) == 4, f"{dest}: expected 4, got {len(pkgs)}"
            assert all(p["destination"] == dest for p in pkgs)

    def test_filter_by_type_fit(self, client):
        r = client.get(f"{API}/packages", params={"type": "FIT"})
        assert r.status_code == 200
        pkgs = r.json()
        assert len(pkgs) == 6, f"Expected 6 FIT packages, got {len(pkgs)}"
        assert all(p["type"] == "FIT" for p in pkgs)

    def test_filter_by_type_group(self, client):
        r = client.get(f"{API}/packages", params={"type": "Group"})
        assert r.status_code == 200
        pkgs = r.json()
        assert len(pkgs) == 6, f"Expected 6 Group packages, got {len(pkgs)}"
        assert all(p["type"] == "Group" for p in pkgs)

    def test_combined_dest_and_type(self, client):
        r = client.get(f"{API}/packages", params={"destination": "Egypt", "type": "FIT"})
        assert r.status_code == 200
        pkgs = r.json()
        assert len(pkgs) == 2
        assert all(p["destination"] == "Egypt" and p["type"] == "FIT" for p in pkgs)


# ── RFP ─────────────────────────────────────────────────
class TestRFPSubmission:
    def test_rfp_requires_auth(self, client):
        r = client.post(f"{API}/rfp", json={"destination": "Egypt"})
        assert r.status_code == 401

    def test_rfp_submit_success(self, client, new_agent):
        payload = {
            "destination": "Sri Lanka",
            "package_title": "Classic Sri Lanka Triangle",
            "pax_count": 4,
            "travel_dates": "Feb 10-18, 2026",
            "message": "TEST_RFP - please ignore",
        }
        r = client.post(f"{API}/rfp", json=payload,
                        headers={"Authorization": f"Bearer {new_agent['token']}"})
        assert r.status_code == 200, r.text
        data = r.json()
        assert data["status"] == "ok"
        assert "rfp_id" in data and isinstance(data["rfp_id"], str)

    def test_rfp_minimal_payload(self, client, new_agent):
        r = client.post(f"{API}/rfp", json={"destination": "Vietnam"},
                        headers={"Authorization": f"Bearer {new_agent['token']}"})
        assert r.status_code == 200
        assert r.json()["status"] == "ok"
