import requests
import sys
import json
from datetime import datetime

class WolDynamicsAPITester:
    def __init__(self, base_url="https://web-marketing-hub-4.preview.emergentagent.com/api"):
        self.base_url = base_url
        self.tests_run = 0
        self.tests_passed = 0
        self.created_message_id = None

    def run_test(self, name, method, endpoint, expected_status, data=None, headers=None):
        """Run a single API test"""
        url = f"{self.base_url}/{endpoint}"
        if headers is None:
            headers = {'Content-Type': 'application/json'}

        self.tests_run += 1
        print(f"\n🔍 Testing {name}...")
        print(f"   URL: {url}")
        
        try:
            if method == 'GET':
                response = requests.get(url, headers=headers)
            elif method == 'POST':
                response = requests.post(url, json=data, headers=headers)
            elif method == 'PATCH':
                response = requests.patch(url, json=data, headers=headers)
            elif method == 'DELETE':
                response = requests.delete(url, headers=headers)

            success = response.status_code == expected_status
            if success:
                self.tests_passed += 1
                print(f"✅ Passed - Status: {response.status_code}")
                try:
                    response_data = response.json()
                    print(f"   Response: {json.dumps(response_data, indent=2)[:200]}...")
                    return True, response_data
                except:
                    return True, {}
            else:
                print(f"❌ Failed - Expected {expected_status}, got {response.status_code}")
                try:
                    error_data = response.json()
                    print(f"   Error: {json.dumps(error_data, indent=2)}")
                except:
                    print(f"   Raw response: {response.text}")
                return False, {}

        except Exception as e:
            print(f"❌ Failed - Error: {str(e)}")
            return False, {}

    def test_root_endpoint(self):
        """Test root API endpoint"""
        success, response = self.run_test(
            "Root Endpoint",
            "GET",
            "",
            200
        )
        return success

    def test_create_contact_message(self):
        """Test creating a contact message"""
        test_data = {
            "name": f"Test User {datetime.now().strftime('%H%M%S')}",
            "email": "test@example.com",
            "phone": "+54 11 1234-5678",
            "service": "automatizacion",
            "message": "Este es un mensaje de prueba para verificar la funcionalidad de contacto."
        }
        
        success, response = self.run_test(
            "Create Contact Message",
            "POST",
            "contact",
            200,
            data=test_data
        )
        
        if success and 'id' in response:
            self.created_message_id = response['id']
            print(f"   Created message ID: {self.created_message_id}")
            
        return success

    def test_get_contact_messages(self):
        """Test retrieving all contact messages"""
        success, response = self.run_test(
            "Get Contact Messages",
            "GET",
            "contact",
            200
        )
        
        if success and isinstance(response, list):
            print(f"   Found {len(response)} messages")
            if len(response) > 0:
                print(f"   Latest message: {response[0].get('name', 'N/A')}")
                
        return success

    def test_get_stats(self):
        """Test getting statistics"""
        success, response = self.run_test(
            "Get Statistics",
            "GET",
            "stats",
            200
        )
        
        if success and 'total' in response and 'unread' in response:
            print(f"   Stats - Total: {response['total']}, Unread: {response['unread']}")
            
        return success

    def test_mark_message_read(self):
        """Test marking a message as read"""
        if not self.created_message_id:
            print("⚠️ Skipping mark as read test - no message ID available")
            return True
            
        success, response = self.run_test(
            f"Mark Message Read (ID: {self.created_message_id})",
            "PATCH",
            f"contact/{self.created_message_id}/read",
            200
        )
        return success

    def test_delete_message(self):
        """Test deleting a message"""
        if not self.created_message_id:
            print("⚠️ Skipping delete test - no message ID available")
            return True
            
        success, response = self.run_test(
            f"Delete Message (ID: {self.created_message_id})",
            "DELETE",
            f"contact/{self.created_message_id}",
            200
        )
        return success

def main():
    print("🚀 Starting Wol Dynamics API Testing...")
    print("=" * 50)
    
    # Setup
    tester = WolDynamicsAPITester()
    
    # Run tests in sequence
    test_results = []
    
    print("\n📋 Running API Tests:")
    
    # Test 1: Root endpoint
    test_results.append(tester.test_root_endpoint())
    
    # Test 2: Create contact message
    test_results.append(tester.test_create_contact_message())
    
    # Test 3: Get all messages
    test_results.append(tester.test_get_contact_messages())
    
    # Test 4: Get stats
    test_results.append(tester.test_get_stats())
    
    # Test 5: Mark as read (depends on create)
    test_results.append(tester.test_mark_message_read())
    
    # Test 6: Delete message (depends on create)
    test_results.append(tester.test_delete_message())
    
    # Print final results
    print("\n" + "=" * 50)
    print("📊 FINAL RESULTS:")
    print(f"Tests run: {tester.tests_run}")
    print(f"Tests passed: {tester.tests_passed}")
    print(f"Success rate: {(tester.tests_passed/tester.tests_run*100):.1f}%" if tester.tests_run > 0 else "0%")
    
    if tester.tests_passed == tester.tests_run:
        print("🎉 All tests passed!")
        return 0
    else:
        print("❌ Some tests failed")
        return 1

if __name__ == "__main__":
    sys.exit(main())