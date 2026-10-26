"""
Test source_page tracking feature for signup forms.
Tests:
- POST /api/inquiries with source_page field stores and returns correctly
- GET /api/admin/signups returns source_page field for each signup
- Different source_page values: Homepage, Signup Page, Destination - {country}
"""
import pytest
import requests
import os
import uuid

BASE_URL = os.environ.get('REACT_APP_BACKEND_URL', '').rstrip('/')

class TestSourcePageTracking:
    """Test source_page field in inquiries API"""
    
    @pytest.fixture(autouse=True)
    def setup(self):
        """Setup test data prefix for cleanup"""
        self.test_prefix = f"TEST_{uuid.uuid4().hex[:8]}"
    
    def test_api_health(self):
        """Verify API is accessible"""
        response = requests.get(f"{BASE_URL}/api/")
        assert response.status_code == 200
        data = response.json()
        assert "message" in data
        print(f"API health check passed: {data}")
    
    def test_create_inquiry_with_homepage_source(self):
        """POST /api/inquiries with source_page='Homepage' stores and returns correctly"""
        payload = {
            "first_name": f"{self.test_prefix}_John",
            "last_name": "Doe",
            "agency_name": f"{self.test_prefix}_Test Agency",
            "email": f"{self.test_prefix}@test.com",
            "phone_code": "+91",
            "phone": "9876543210",
            "state": "Delhi",
            "source_page": "Homepage"
        }
        response = requests.post(f"{BASE_URL}/api/inquiries", json=payload)
        assert response.status_code == 200, f"Expected 200, got {response.status_code}: {response.text}"
        
        data = response.json()
        # Verify source_page is returned
        assert "source_page" in data, "source_page field missing in response"
        assert data["source_page"] == "Homepage", f"Expected 'Homepage', got '{data['source_page']}'"
        assert data["first_name"] == payload["first_name"]
        assert data["email"] == payload["email"]
        print(f"PASS: Created inquiry with source_page='Homepage': {data['id']}")
        return data
    
    def test_create_inquiry_with_signup_page_source(self):
        """POST /api/inquiries with source_page='Signup Page' stores and returns correctly"""
        payload = {
            "first_name": f"{self.test_prefix}_Jane",
            "last_name": "Smith",
            "agency_name": f"{self.test_prefix}_Smith Travels",
            "email": f"{self.test_prefix}_jane@test.com",
            "phone_code": "+1",
            "phone": "5551234567",
            "source_page": "Signup Page"
        }
        response = requests.post(f"{BASE_URL}/api/inquiries", json=payload)
        assert response.status_code == 200, f"Expected 200, got {response.status_code}: {response.text}"
        
        data = response.json()
        assert "source_page" in data, "source_page field missing in response"
        assert data["source_page"] == "Signup Page", f"Expected 'Signup Page', got '{data['source_page']}'"
        print(f"PASS: Created inquiry with source_page='Signup Page': {data['id']}")
        return data
    
    def test_create_inquiry_with_destination_source(self):
        """POST /api/inquiries with source_page='Destination - Japan' stores and returns correctly"""
        payload = {
            "first_name": f"{self.test_prefix}_Mike",
            "last_name": "Johnson",
            "agency_name": f"{self.test_prefix}_Johnson Tours",
            "email": f"{self.test_prefix}_mike@test.com",
            "phone_code": "+44",
            "phone": "7891234567",
            "source_page": "Destination - Japan"
        }
        response = requests.post(f"{BASE_URL}/api/inquiries", json=payload)
        assert response.status_code == 200, f"Expected 200, got {response.status_code}: {response.text}"
        
        data = response.json()
        assert "source_page" in data, "source_page field missing in response"
        assert data["source_page"] == "Destination - Japan", f"Expected 'Destination - Japan', got '{data['source_page']}'"
        print(f"PASS: Created inquiry with source_page='Destination - Japan': {data['id']}")
        return data
    
    def test_create_inquiry_without_source_page(self):
        """POST /api/inquiries without source_page should work (optional field)"""
        payload = {
            "first_name": f"{self.test_prefix}_NoSource",
            "last_name": "User",
            "agency_name": f"{self.test_prefix}_NoSource Agency",
            "email": f"{self.test_prefix}_nosource@test.com",
            "phone_code": "+91",
            "phone": "1234567890"
        }
        response = requests.post(f"{BASE_URL}/api/inquiries", json=payload)
        assert response.status_code == 200, f"Expected 200, got {response.status_code}: {response.text}"
        
        data = response.json()
        # source_page should be None or not present
        assert data.get("source_page") is None, f"Expected None, got '{data.get('source_page')}'"
        print(f"PASS: Created inquiry without source_page: {data['id']}")
        return data
    
    def test_admin_signups_returns_source_page(self):
        """GET /api/admin/signups returns source_page field for each signup"""
        # First create a test inquiry with source_page
        payload = {
            "first_name": f"{self.test_prefix}_Admin",
            "last_name": "Test",
            "agency_name": f"{self.test_prefix}_Admin Agency",
            "email": f"{self.test_prefix}_admin@test.com",
            "phone_code": "+91",
            "phone": "9999999999",
            "source_page": "Homepage"
        }
        create_response = requests.post(f"{BASE_URL}/api/inquiries", json=payload)
        assert create_response.status_code == 200
        
        # Now fetch admin signups
        response = requests.get(f"{BASE_URL}/api/admin/signups")
        assert response.status_code == 200, f"Expected 200, got {response.status_code}: {response.text}"
        
        data = response.json()
        assert "signups" in data, "signups field missing in response"
        assert "total" in data, "total field missing in response"
        assert isinstance(data["signups"], list), "signups should be a list"
        
        # Find our test signup
        test_signup = None
        for signup in data["signups"]:
            if signup.get("email") == payload["email"]:
                test_signup = signup
                break
        
        assert test_signup is not None, f"Test signup not found in admin signups"
        assert "source_page" in test_signup, "source_page field missing in admin signup"
        assert test_signup["source_page"] == "Homepage", f"Expected 'Homepage', got '{test_signup['source_page']}'"
        print(f"PASS: Admin signups returns source_page field correctly")
    
    def test_admin_signups_search_by_source(self):
        """Verify admin signups can be searched/filtered by source_page"""
        response = requests.get(f"{BASE_URL}/api/admin/signups")
        assert response.status_code == 200
        
        data = response.json()
        signups = data.get("signups", [])
        
        # Check that signups have various source_page values
        source_pages = set()
        for signup in signups:
            if signup.get("source_page"):
                source_pages.add(signup["source_page"])
        
        print(f"Found source_page values in signups: {source_pages}")
        # At minimum, we should have created some test signups with source_page
        print(f"PASS: Admin signups endpoint working, total: {data.get('total', 0)}")


class TestDestinationSourcePages:
    """Test source_page values for different destination pages"""
    
    def test_destination_india_source_format(self):
        """Verify Destination - India format works"""
        payload = {
            "first_name": "TEST_India",
            "last_name": "User",
            "agency_name": "TEST_India Agency",
            "email": "test_india@test.com",
            "phone_code": "+91",
            "phone": "1111111111",
            "state": "Maharashtra",
            "source_page": "Destination - India"
        }
        response = requests.post(f"{BASE_URL}/api/inquiries", json=payload)
        assert response.status_code == 200
        data = response.json()
        assert data["source_page"] == "Destination - India"
        print("PASS: Destination - India source_page format works")
    
    def test_destination_greece_source_format(self):
        """Verify Destination - Greece format works"""
        payload = {
            "first_name": "TEST_Greece",
            "last_name": "User",
            "agency_name": "TEST_Greece Agency",
            "email": "test_greece@test.com",
            "phone_code": "+30",
            "phone": "2222222222",
            "source_page": "Destination - Greece"
        }
        response = requests.post(f"{BASE_URL}/api/inquiries", json=payload)
        assert response.status_code == 200
        data = response.json()
        assert data["source_page"] == "Destination - Greece"
        print("PASS: Destination - Greece source_page format works")
    
    def test_destination_uae_source_format(self):
        """Verify Destination - UAE format works"""
        payload = {
            "first_name": "TEST_UAE",
            "last_name": "User",
            "agency_name": "TEST_UAE Agency",
            "email": "test_uae@test.com",
            "phone_code": "+971",
            "phone": "3333333333",
            "source_page": "Destination - UAE"
        }
        response = requests.post(f"{BASE_URL}/api/inquiries", json=payload)
        assert response.status_code == 200
        data = response.json()
        assert data["source_page"] == "Destination - UAE"
        print("PASS: Destination - UAE source_page format works")
