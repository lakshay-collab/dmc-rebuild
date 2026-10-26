"""
Test destination-specific packages and Flights image fix.
Tests the P0 bug fixes:
1. Each destination shows country-specific packages (not India's packages on all pages)
2. Flights service image loads correctly (not broken/404)
"""
import pytest
import requests
import os

BASE_URL = os.environ.get('REACT_APP_BACKEND_URL', '').rstrip('/')

# Expected packages for each destination (first 3 packages)
EXPECTED_PACKAGES = {
    "India": ["Golden Triangle Classic", "Kerala Backwaters & Beaches", "Rajasthan Royal Heritage"],
    "Greece": ["Athens & Santorini Classic", "Greek Island Hopping", "Crete & Mainland Discovery"],
    "Japan": ["Tokyo & Kyoto Classic", "Cherry Blossom Special", "Japan Alps & Onsen"],
    "Thailand": ["Bangkok & Beaches Classic", "Northern Thailand Explorer", "Island Hopping Paradise"],
    "Morocco": ["Imperial Cities Circuit", "Sahara Desert Explorer", "Marrakech & Atlas Mountains"],
    "UAE": ["Dubai City Explorer", "Dubai & Abu Dhabi Combo", "UAE Luxury Collection"],
    "Indonesia": ["Bali Highlights", "Bali & Komodo Explorer", "Java Cultural Journey"],
    "Maldives": ["Overwater Villa Romance", "Island Hopping Discovery", "Ultimate Maldives Luxury"],
    "South Africa": ["Cape Town & Safari Classic", "Garden Route Drive", "Ultimate Safari Experience"],
    "Peru": ["Machu Picchu Classic", "Sacred Valley & Amazon", "Peru Grand Tour"],
    "New Zealand": ["North Island Explorer", "South Island Adventure", "New Zealand Grand Tour"],
    "Portugal": ["Lisbon & Porto Classic", "Algarve Beach Escape", "Portugal Wine & Coast"],
}

# India packages that should NOT appear on other destination pages
INDIA_PACKAGES = ["Golden Triangle Classic", "Kerala Backwaters & Beaches", "Rajasthan Royal Heritage"]


class TestDestinationPackages:
    """Test that each destination shows country-specific packages"""
    
    @pytest.fixture(autouse=True)
    def setup(self):
        """Setup test session"""
        self.session = requests.Session()
        self.session.headers.update({"Content-Type": "application/json"})
    
    @pytest.mark.parametrize("destination", ["Greece", "Japan", "Thailand", "Morocco", "UAE"])
    def test_destination_has_country_specific_packages(self, destination):
        """Verify destination shows its own packages, not India's"""
        response = self.session.get(f"{BASE_URL}/api/destinations/detail/{destination}")
        assert response.status_code == 200, f"Failed to get {destination} detail"
        
        data = response.json()
        assert "detail" in data and data["detail"] is not None, f"{destination} has no detail"
        
        packages = data["detail"].get("packages", [])
        assert len(packages) > 0, f"{destination} has no packages"
        
        package_titles = [p["title"] for p in packages]
        
        # Verify expected packages are present
        expected = EXPECTED_PACKAGES.get(destination, [])
        for pkg in expected:
            assert pkg in package_titles, f"Missing expected package '{pkg}' for {destination}"
        
        # Verify India packages are NOT present (unless this is India)
        if destination != "India":
            for india_pkg in INDIA_PACKAGES:
                assert india_pkg not in package_titles, f"India package '{india_pkg}' found on {destination} page"
    
    def test_india_has_india_packages(self):
        """Verify India shows India-specific packages"""
        response = self.session.get(f"{BASE_URL}/api/destinations/detail/India")
        assert response.status_code == 200
        
        data = response.json()
        packages = data["detail"].get("packages", [])
        package_titles = [p["title"] for p in packages]
        
        for pkg in INDIA_PACKAGES:
            assert pkg in package_titles, f"Missing India package '{pkg}'"
    
    def test_all_12_destinations_have_packages(self):
        """Verify all 12 destinations have packages defined"""
        destinations = ["India", "Greece", "Japan", "Morocco", "Indonesia", "UAE", 
                       "Maldives", "South Africa", "Peru", "New Zealand", "Portugal", "Thailand"]
        
        for dest in destinations:
            response = self.session.get(f"{BASE_URL}/api/destinations/detail/{dest}")
            assert response.status_code == 200, f"Failed to get {dest}"
            
            data = response.json()
            assert data.get("detail") is not None, f"{dest} has no detail"
            
            packages = data["detail"].get("packages", [])
            assert len(packages) >= 3, f"{dest} has fewer than 3 packages: {len(packages)}"


class TestFlightsServiceImage:
    """Test that Flights service image loads correctly (not 404)"""
    
    @pytest.fixture(autouse=True)
    def setup(self):
        self.session = requests.Session()
    
    def test_flights_image_returns_200(self):
        """Verify the Flights service image URL returns HTTP 200"""
        # Get India destination detail to get the Flights image URL
        response = self.session.get(f"{BASE_URL}/api/destinations/detail/India")
        assert response.status_code == 200
        
        data = response.json()
        services = data["detail"].get("services_in_country", [])
        
        flights_service = next((s for s in services if s["title"] == "Flights"), None)
        assert flights_service is not None, "Flights service not found"
        
        flights_image_url = flights_service.get("image")
        assert flights_image_url is not None, "Flights service has no image URL"
        
        # Verify the image URL returns 200
        img_response = self.session.head(flights_image_url, allow_redirects=True)
        assert img_response.status_code == 200, f"Flights image returned {img_response.status_code}"
    
    def test_flights_image_url_is_correct(self):
        """Verify the Flights image URL is the fixed one (not the broken one)"""
        response = self.session.get(f"{BASE_URL}/api/destinations/detail/India")
        data = response.json()
        services = data["detail"].get("services_in_country", [])
        
        flights_service = next((s for s in services if s["title"] == "Flights"), None)
        flights_image_url = flights_service.get("image", "")
        
        # The fixed image URL should contain photo-1556388158-158ea5ccacbd
        assert "photo-1556388158-158ea5ccacbd" in flights_image_url, \
            f"Flights image URL is not the fixed one: {flights_image_url}"
        
        # The broken image URL contained photo-1436491865332 - should NOT be present
        assert "photo-1436491865332" not in flights_image_url, \
            "Flights image URL still contains the broken image ID"


class TestDestinationSearch:
    """Test destination search functionality"""
    
    @pytest.fixture(autouse=True)
    def setup(self):
        self.session = requests.Session()
    
    def test_get_all_destinations(self):
        """Verify /api/destinations returns all 12 destinations"""
        response = self.session.get(f"{BASE_URL}/api/destinations")
        assert response.status_code == 200
        
        destinations = response.json()
        assert len(destinations) == 12, f"Expected 12 destinations, got {len(destinations)}"
        
        names = [d["name"] for d in destinations]
        expected = ["India", "Greece", "Japan", "Morocco", "Indonesia", "UAE", 
                   "Maldives", "South Africa", "Peru", "New Zealand", "Portugal", "Thailand"]
        
        for exp in expected:
            assert exp in names, f"Missing destination: {exp}"
    
    def test_destination_detail_returns_all_sections(self):
        """Verify destination detail includes all expected sections"""
        response = self.session.get(f"{BASE_URL}/api/destinations/detail/Greece")
        assert response.status_code == 200
        
        data = response.json()
        detail = data.get("detail", {})
        
        # Check required sections
        required_sections = ["key_facts", "services_in_country", "packages", "regions", "food"]
        for section in required_sections:
            assert section in detail, f"Missing section: {section}"
            assert detail[section] is not None, f"Section {section} is None"


if __name__ == "__main__":
    pytest.main([__file__, "-v", "--tb=short"])
