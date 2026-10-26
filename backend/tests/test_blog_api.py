"""
Blog API Tests for Hi DMC
Tests blog CRUD operations and filtering functionality
"""
import pytest
import requests
import os

BASE_URL = os.environ.get('REACT_APP_BACKEND_URL', '').rstrip('/')

class TestBlogAPI:
    """Blog endpoint tests"""
    
    def test_get_all_blog_posts(self):
        """GET /api/blog returns posts with destinations and categories arrays"""
        response = requests.get(f"{BASE_URL}/api/blog")
        assert response.status_code == 200
        
        data = response.json()
        assert "posts" in data
        assert "destinations" in data
        assert "categories" in data
        assert isinstance(data["posts"], list)
        assert isinstance(data["destinations"], list)
        assert isinstance(data["categories"], list)
        
        # Verify we have seeded posts
        assert len(data["posts"]) >= 12, f"Expected at least 12 posts, got {len(data['posts'])}"
        print(f"✓ Found {len(data['posts'])} blog posts")
    
    def test_filter_by_destination_india(self):
        """GET /api/blog?destination=India returns only India posts"""
        response = requests.get(f"{BASE_URL}/api/blog?destination=India")
        assert response.status_code == 200
        
        data = response.json()
        assert len(data["posts"]) == 2, f"Expected 2 India posts, got {len(data['posts'])}"
        
        for post in data["posts"]:
            assert post["destination"] == "India", f"Post destination is {post['destination']}, expected India"
        print(f"✓ India filter returned {len(data['posts'])} posts")
    
    def test_filter_by_category_cuisine(self):
        """GET /api/blog?category=Cuisine returns only Cuisine posts"""
        response = requests.get(f"{BASE_URL}/api/blog?category=Cuisine")
        assert response.status_code == 200
        
        data = response.json()
        assert len(data["posts"]) == 3, f"Expected 3 Cuisine posts, got {len(data['posts'])}"
        
        for post in data["posts"]:
            assert post["category"] == "Cuisine", f"Post category is {post['category']}, expected Cuisine"
        print(f"✓ Cuisine filter returned {len(data['posts'])} posts")
    
    def test_filter_by_destination_and_category(self):
        """GET /api/blog?destination=India&category=Cuisine returns combined filter"""
        response = requests.get(f"{BASE_URL}/api/blog?destination=India&category=Cuisine")
        assert response.status_code == 200
        
        data = response.json()
        assert len(data["posts"]) == 1, f"Expected 1 India+Cuisine post, got {len(data['posts'])}"
        
        post = data["posts"][0]
        assert post["destination"] == "India"
        assert post["category"] == "Cuisine"
        assert "delhi" in post["slug"].lower() or "street" in post["title"].lower()
        print(f"✓ India+Cuisine filter returned {len(data['posts'])} post")
    
    def test_get_single_blog_post(self):
        """GET /api/blog/{slug} returns single post with full content"""
        response = requests.get(f"{BASE_URL}/api/blog/must-try-street-foods-delhi")
        assert response.status_code == 200
        
        post = response.json()
        assert post["title"] == "10 Must-Try Street Foods in Delhi"
        assert post["destination"] == "India"
        assert post["category"] == "Cuisine"
        assert "content" in post
        assert len(post["content"]) > 100, "Content should be substantial"
        assert "author" in post
        print(f"✓ Single post retrieved: {post['title']}")
    
    def test_get_nonexistent_post_returns_404(self):
        """GET /api/blog/{slug} returns 404 for non-existent post"""
        response = requests.get(f"{BASE_URL}/api/blog/nonexistent-post-slug")
        assert response.status_code == 404
        print("✓ Non-existent post returns 404")
    
    def test_admin_blog_endpoint(self):
        """GET /api/admin/blog returns all posts including unpublished"""
        response = requests.get(f"{BASE_URL}/api/admin/blog")
        assert response.status_code == 200
        
        data = response.json()
        assert "posts" in data
        assert "total" in data
        assert data["total"] >= 12
        print(f"✓ Admin endpoint returned {data['total']} posts")


class TestBlogCRUD:
    """Blog CRUD operations tests"""
    
    test_post_id = None
    
    def test_create_blog_post(self):
        """POST /api/blog creates a new post"""
        payload = {
            "title": "TEST Post for API Testing",
            "excerpt": "This is a test excerpt for API testing",
            "content": "This is test content for API testing purposes. It should be long enough to be valid.",
            "image_url": "https://images.unsplash.com/photo-1506665531195-3566af2b4dfa?w=800&q=80",
            "destination": "India",
            "category": "Cuisine",
            "author": "Test Author"
        }
        
        response = requests.post(f"{BASE_URL}/api/blog", json=payload)
        assert response.status_code == 200
        
        post = response.json()
        assert post["title"] == payload["title"]
        assert post["destination"] == payload["destination"]
        assert post["category"] == payload["category"]
        assert "id" in post
        assert "slug" in post
        assert post["slug"] == "test-post-for-api-testing"
        
        # Store ID for cleanup
        TestBlogCRUD.test_post_id = post["id"]
        print(f"✓ Created post with ID: {post['id']}")
    
    def test_verify_created_post_exists(self):
        """Verify created post can be retrieved"""
        response = requests.get(f"{BASE_URL}/api/blog/test-post-for-api-testing")
        assert response.status_code == 200
        
        post = response.json()
        assert post["title"] == "TEST Post for API Testing"
        print("✓ Created post verified via GET")
    
    def test_delete_blog_post(self):
        """DELETE /api/blog/{id} deletes a post"""
        if not TestBlogCRUD.test_post_id:
            pytest.skip("No test post ID available")
        
        response = requests.delete(f"{BASE_URL}/api/blog/{TestBlogCRUD.test_post_id}")
        assert response.status_code == 200
        
        data = response.json()
        assert data["message"] == "Post deleted"
        print(f"✓ Deleted post with ID: {TestBlogCRUD.test_post_id}")
    
    def test_verify_deleted_post_gone(self):
        """Verify deleted post returns 404"""
        response = requests.get(f"{BASE_URL}/api/blog/test-post-for-api-testing")
        assert response.status_code == 404
        print("✓ Deleted post returns 404")
    
    def test_delete_nonexistent_post_returns_404(self):
        """DELETE /api/blog/{id} returns 404 for non-existent post"""
        response = requests.delete(f"{BASE_URL}/api/blog/nonexistent-id-12345")
        assert response.status_code == 404
        print("✓ Delete non-existent post returns 404")


class TestBlogPostValidation:
    """Blog post validation tests"""
    
    def test_create_duplicate_slug_fails(self):
        """POST /api/blog with duplicate slug returns 400"""
        # First create a post
        payload = {
            "title": "TEST Duplicate Slug Test",
            "slug": "test-duplicate-slug",
            "excerpt": "Test excerpt",
            "content": "Test content for duplicate slug testing",
            "image_url": "https://images.unsplash.com/photo-1506665531195-3566af2b4dfa?w=800&q=80",
            "destination": "India",
            "category": "Cuisine"
        }
        
        response1 = requests.post(f"{BASE_URL}/api/blog", json=payload)
        assert response1.status_code == 200
        post_id = response1.json()["id"]
        
        # Try to create another with same slug
        response2 = requests.post(f"{BASE_URL}/api/blog", json=payload)
        assert response2.status_code == 400
        assert "slug already exists" in response2.json()["detail"].lower()
        
        # Cleanup
        requests.delete(f"{BASE_URL}/api/blog/{post_id}")
        print("✓ Duplicate slug correctly rejected")


if __name__ == "__main__":
    pytest.main([__file__, "-v"])
