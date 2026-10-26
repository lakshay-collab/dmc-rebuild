import requests
import sys
from datetime import datetime
import json

class DMCAPITester:
    def __init__(self, base_url="https://agent-platform-68.preview.emergentagent.com/api"):
        self.base_url = base_url
        self.tests_run = 0
        self.tests_passed = 0
        self.failed_tests = []

    def run_test(self, name, method, endpoint, expected_status, data=None, expected_fields=None):
        """Run a single API test"""
        url = f"{self.base_url}/{endpoint}"
        headers = {'Content-Type': 'application/json'}

        self.tests_run += 1
        print(f"\n🔍 Testing {name}...")
        print(f"   URL: {url}")
        
        try:
            if method == 'GET':
                response = requests.get(url, headers=headers, timeout=10)
            elif method == 'POST':
                response = requests.post(url, json=data, headers=headers, timeout=10)

            print(f"   Status: {response.status_code}")
            
            success = response.status_code == expected_status
            if success:
                self.tests_passed += 1
                print(f"✅ Passed - Status: {response.status_code}")
                
                # Check response structure if expected_fields provided
                if expected_fields and response.status_code == 200:
                    try:
                        response_data = response.json()
                        if isinstance(response_data, list) and len(response_data) > 0:
                            response_data = response_data[0]  # Check first item for lists
                        
                        for field in expected_fields:
                            if field not in response_data:
                                print(f"⚠️  Warning: Expected field '{field}' not found in response")
                        
                        print(f"   Response sample: {json.dumps(response_data, indent=2)[:200]}...")
                    except Exception as e:
                        print(f"   Could not parse response: {e}")
                
                return True, response.json() if response.content else {}
            else:
                self.failed_tests.append({
                    'name': name,
                    'expected': expected_status,
                    'actual': response.status_code,
                    'url': url,
                    'response': response.text[:200] if response.text else 'No response'
                })
                print(f"❌ Failed - Expected {expected_status}, got {response.status_code}")
                print(f"   Response: {response.text[:200]}")
                return False, {}

        except requests.exceptions.Timeout:
            self.failed_tests.append({
                'name': name,
                'error': 'Request timeout (10s)',
                'url': url
            })
            print(f"❌ Failed - Request timeout")
            return False, {}
        except Exception as e:
            self.failed_tests.append({
                'name': name,
                'error': str(e),
                'url': url
            })
            print(f"❌ Failed - Error: {str(e)}")
            return False, {}

    def test_root_endpoint(self):
        """Test root API endpoint"""
        return self.run_test("Root API", "GET", "", 200)

    def test_get_destinations(self):
        """Test get all destinations"""
        expected_fields = ['id', 'name', 'country', 'region', 'image_url', 'description']
        return self.run_test(
            "Get All Destinations", 
            "GET", 
            "destinations", 
            200,
            expected_fields=expected_fields
        )

    def test_get_trending_destinations(self):
        """Test get trending destinations"""
        expected_fields = ['id', 'name', 'trending', 'trending_month']
        return self.run_test(
            "Get Trending Destinations", 
            "GET", 
            "destinations/trending", 
            200,
            expected_fields=expected_fields
        )

    def test_get_destinations_by_region(self):
        """Test get destinations by region"""
        success, _ = self.run_test(
            "Get Destinations by Region (Europe)", 
            "GET", 
            "destinations/region/Europe", 
            200
        )
        return success

    def test_get_stats(self):
        """Test get stats endpoint"""
        expected_fields = ['destinations', 'regions', 'partners', 'countries']
        return self.run_test(
            "Get Stats", 
            "GET", 
            "stats", 
            200,
            expected_fields=expected_fields
        )

    def test_create_inquiry(self):
        """Test create inquiry"""
        test_inquiry = {
            "company_name": f"Test Company {datetime.now().strftime('%H%M%S')}",
            "contact_name": "John Doe",
            "email": "john.doe@testcompany.com",
            "phone": "+1234567890",
            "message": "This is a test inquiry for API testing",
            "inquiry_type": "demo_request"
        }
        
        expected_fields = ['id', 'company_name', 'contact_name', 'email', 'created_at']
        return self.run_test(
            "Create Inquiry", 
            "POST", 
            "inquiries", 
            200,
            data=test_inquiry,
            expected_fields=expected_fields
        )

    def run_all_tests(self):
        """Run all API tests"""
        print("🚀 Starting DMC API Testing...")
        print(f"Base URL: {self.base_url}")
        print("=" * 60)

        # Test all endpoints
        self.test_root_endpoint()
        self.test_get_destinations()
        self.test_get_trending_destinations()
        self.test_get_destinations_by_region()
        self.test_get_stats()
        self.test_create_inquiry()

        # Print summary
        print("\n" + "=" * 60)
        print(f"📊 Test Results: {self.tests_passed}/{self.tests_run} passed")
        
        if self.failed_tests:
            print("\n❌ Failed Tests:")
            for test in self.failed_tests:
                print(f"   • {test['name']}")
                if 'expected' in test:
                    print(f"     Expected: {test['expected']}, Got: {test['actual']}")
                if 'error' in test:
                    print(f"     Error: {test['error']}")
                if 'response' in test:
                    print(f"     Response: {test['response']}")
        
        success_rate = (self.tests_passed / self.tests_run) * 100 if self.tests_run > 0 else 0
        print(f"\n🎯 Success Rate: {success_rate:.1f}%")
        
        return self.tests_passed == self.tests_run

def main():
    tester = DMCAPITester()
    success = tester.run_all_tests()
    return 0 if success else 1

if __name__ == "__main__":
    sys.exit(main())