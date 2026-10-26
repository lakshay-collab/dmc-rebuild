"""
Hi DMC API Tests - Iteration 4
Tests for India page restructure and homepage improvements
"""
import pytest
import requests
import os

BASE_URL = os.environ.get('REACT_APP_BACKEND_URL', '').rstrip('/')

class TestHealthAndBasicEndpoints:
    """Basic API health and endpoint tests"""
    
    def test_api_root(self):
        """Test API root endpoint"""
        response = requests.get(f"{BASE_URL}/api/")
        assert response.status_code == 200
        data = response.json()
        assert "message" in data
        assert data["message"] == "Hi DMC API"
        print("✓ API root endpoint working")

    def test_get_all_destinations(self):
        """Test getting all destinations"""
        response = requests.get(f"{BASE_URL}/api/destinations")
        assert response.status_code == 200
        data = response.json()
        assert isinstance(data, list)
        assert len(data) > 0
        # Check destination structure
        dest = data[0]
        assert "name" in dest
        assert "country" in dest
        assert "region" in dest
        assert "image_url" in dest
        assert "description" in dest
        print(f"✓ Got {len(data)} destinations")

    def test_get_trending_destinations(self):
        """Test getting trending destinations"""
        response = requests.get(f"{BASE_URL}/api/destinations/trending")
        assert response.status_code == 200
        data = response.json()
        assert isinstance(data, list)
        # All should be trending
        for dest in data:
            assert dest.get("trending") == True
        print(f"✓ Got {len(data)} trending destinations")


class TestIndiaDestinationDetail:
    """Tests for India destination detail - the main focus of this iteration"""
    
    def test_india_detail_exists(self):
        """Test India destination detail endpoint returns data"""
        response = requests.get(f"{BASE_URL}/api/destinations/detail/India")
        assert response.status_code == 200
        data = response.json()
        assert data["name"] == "India"
        assert "detail" in data
        assert data["detail"] is not None
        print("✓ India detail endpoint returns data")

    def test_india_has_services_in_country(self):
        """Test India has 8 services in services_in_country"""
        response = requests.get(f"{BASE_URL}/api/destinations/detail/India")
        assert response.status_code == 200
        data = response.json()
        detail = data.get("detail", {})
        services = detail.get("services_in_country", [])
        assert len(services) == 8, f"Expected 8 services, got {len(services)}"
        
        # Check expected services
        service_titles = [s["title"] for s in services]
        expected_services = ["FIT Packages", "Group Tours", "Experiences", "Hotels", 
                           "Flights", "Ad Hoc Quotes", "Transfers", "MICE"]
        for expected in expected_services:
            assert expected in service_titles, f"Missing service: {expected}"
        print("✓ India has all 8 services")

    def test_india_has_team_info(self):
        """Test India has team_info with Rajesh Sharma"""
        response = requests.get(f"{BASE_URL}/api/destinations/detail/India")
        assert response.status_code == 200
        data = response.json()
        detail = data.get("detail", {})
        team_info = detail.get("team_info", {})
        
        assert team_info.get("manager") == "Rajesh Sharma"
        assert team_info.get("manager_title") == "India Operations Director"
        assert team_info.get("office") == "New Delhi, India"
        assert team_info.get("team_size") == "50+"
        print("✓ India has team_info with Rajesh Sharma")

    def test_india_has_key_cities(self):
        """Test India has 8 key cities"""
        response = requests.get(f"{BASE_URL}/api/destinations/detail/India")
        assert response.status_code == 200
        data = response.json()
        detail = data.get("detail", {})
        cities = detail.get("key_destinations_within", [])
        
        assert len(cities) == 8, f"Expected 8 cities, got {len(cities)}"
        city_names = [c["name"] for c in cities]
        expected_cities = ["Delhi", "Jaipur", "Agra", "Kerala", "Goa", "Udaipur", "Varanasi", "Mumbai"]
        for expected in expected_cities:
            assert expected in city_names, f"Missing city: {expected}"
        print("✓ India has all 8 key cities")

    def test_india_has_key_experiences(self):
        """Test India has 6 key experiences"""
        response = requests.get(f"{BASE_URL}/api/destinations/detail/India")
        assert response.status_code == 200
        data = response.json()
        detail = data.get("detail", {})
        experiences = detail.get("key_experiences", [])
        
        assert len(experiences) == 6, f"Expected 6 experiences, got {len(experiences)}"
        # Check experience structure
        for exp in experiences:
            assert "title" in exp
            assert "description" in exp
            assert "image" in exp
            assert "location" in exp
        print("✓ India has 6 key experiences")

    def test_india_has_key_facts(self):
        """Test India has key facts including Hi DMC Office and Local Team"""
        response = requests.get(f"{BASE_URL}/api/destinations/detail/India")
        assert response.status_code == 200
        data = response.json()
        detail = data.get("detail", {})
        facts = detail.get("key_facts", [])
        
        fact_labels = [f["label"] for f in facts]
        assert "Hi DMC Office" in fact_labels
        assert "Local Team" in fact_labels
        
        # Check values
        for fact in facts:
            if fact["label"] == "Hi DMC Office":
                assert fact["value"] == "New Delhi"
            if fact["label"] == "Local Team":
                assert fact["value"] == "50+ Experts"
        print("✓ India has key facts with Hi DMC Office and Local Team")


class TestNonIndiaDestinations:
    """Tests for non-India destinations (should have basic info only)"""
    
    def test_greece_detail(self):
        """Test Greece destination returns basic info without rich detail"""
        response = requests.get(f"{BASE_URL}/api/destinations/detail/Greece")
        assert response.status_code == 200
        data = response.json()
        assert data["name"] == "Greece"
        # Greece should not have rich detail (services_in_country, team_info, etc.)
        detail = data.get("detail")
        # detail should be None for non-India destinations
        assert detail is None, "Greece should not have rich detail"
        print("✓ Greece returns basic info without rich detail")


class TestInquirySubmission:
    """Tests for inquiry form submission"""
    
    def test_create_destination_inquiry(self):
        """Test creating a destination inquiry (India enquiry form)"""
        inquiry_data = {
            "contact_name": "TEST_John Smith",
            "company_name": "TEST_Travel Agency Ltd",
            "email": "test@travelagency.com",
            "phone": "+1234567890",
            "message": "Enquiry about India destination packages",
            "inquiry_type": "destination_inquiry"
        }
        response = requests.post(f"{BASE_URL}/api/inquiries", json=inquiry_data)
        assert response.status_code == 200
        data = response.json()
        
        # Verify response data
        assert data["contact_name"] == inquiry_data["contact_name"]
        assert data["company_name"] == inquiry_data["company_name"]
        assert data["email"] == inquiry_data["email"]
        assert data["inquiry_type"] == "destination_inquiry"
        assert "id" in data
        print("✓ Destination inquiry created successfully")

    def test_create_inquiry_minimal_fields(self):
        """Test creating inquiry with minimal required fields"""
        inquiry_data = {
            "contact_name": "TEST_Jane Doe",
            "company_name": "TEST_Another Agency",
            "email": "jane@agency.com",
            "message": "General inquiry"
        }
        response = requests.post(f"{BASE_URL}/api/inquiries", json=inquiry_data)
        assert response.status_code == 200
        data = response.json()
        assert data["inquiry_type"] == "demo_request"  # default value
        print("✓ Inquiry with minimal fields created successfully")


class TestStatsEndpoint:
    """Tests for stats endpoint"""
    
    def test_get_stats(self):
        """Test stats endpoint returns expected data"""
        response = requests.get(f"{BASE_URL}/api/stats")
        assert response.status_code == 200
        data = response.json()
        
        assert "destinations" in data
        assert "regions" in data
        assert "partners" in data
        assert "countries" in data
        print(f"✓ Stats: {data['destinations']} destinations, {data['regions']} regions")


if __name__ == "__main__":
    pytest.main([__file__, "-v"])
