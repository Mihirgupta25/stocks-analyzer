import os
from datetime import timedelta

class Config:
    """Configuration class for the Flask application"""
    
    # Flask configuration
    SECRET_KEY = os.environ.get('SECRET_KEY') or 'your-secret-key-change-this-in-production'
    
    # OAuth configuration
    GOOGLE_CLIENT_ID = os.environ.get('GOOGLE_CLIENT_ID') or 'your-google-client-id'
    GOOGLE_CLIENT_SECRET = os.environ.get('GOOGLE_CLIENT_SECRET') or 'your-google-client-secret'
    GOOGLE_DISCOVERY_URL = "https://accounts.google.com/.well-known/openid_configuration"
    
    # Session configuration
    PERMANENT_SESSION_LIFETIME = timedelta(hours=24)
    
    # Database configuration (if needed later)
    DATABASE_URL = os.environ.get('DATABASE_URL') or 'sqlite:///stocks_analyzer.db'
    
    # API configuration
    YAHOO_FINANCE_RATE_LIMIT = 100  # requests per minute
    STOCK_CACHE_DURATION = 300  # 5 minutes in seconds 