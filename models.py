from flask_login import UserMixin
from datetime import datetime
import json

class User(UserMixin):
    """User model for authentication"""
    
    def __init__(self, user_id, email, name, picture=None):
        self.id = user_id
        self.email = email
        self.name = name
        self.picture = picture
        self.created_at = datetime.utcnow()
        self.last_login = datetime.utcnow()
    
    def to_dict(self):
        """Convert user object to dictionary for session storage"""
        return {
            'id': self.id,
            'email': self.email,
            'name': self.name,
            'picture': self.picture,
            'created_at': self.created_at.isoformat(),
            'last_login': self.last_login.isoformat()
        }
    
    @classmethod
    def from_dict(cls, data):
        """Create user object from dictionary"""
        user = cls(
            user_id=data['id'],
            email=data['email'],
            name=data['name'],
            picture=data.get('picture')
        )
        user.created_at = datetime.fromisoformat(data['created_at'])
        user.last_login = datetime.fromisoformat(data['last_login'])
        return user

class UserSession:
    """Simple session storage for demo purposes"""
    
    def __init__(self):
        self.users = {}
    
    def add_user(self, user):
        """Add or update user in session storage"""
        self.users[user.id] = user
        return user
    
    def get_user(self, user_id):
        """Get user by ID"""
        return self.users.get(user_id)
    
    def remove_user(self, user_id):
        """Remove user from session storage"""
        if user_id in self.users:
            del self.users[user_id]

# Global session storage instance
user_session = UserSession() 