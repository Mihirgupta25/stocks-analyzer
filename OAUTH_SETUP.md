# Google OAuth Setup Guide

This guide will help you set up Google OAuth authentication for the Stock Portfolio Analyzer application.

## Prerequisites

1. A Google account
2. Python 3.7+ installed
3. The application dependencies installed

## Step 1: Create Google OAuth Credentials

### 1. Go to Google Cloud Console
- Visit [Google Cloud Console](https://console.cloud.google.com/)
- Sign in with your Google account

### 2. Create a New Project
- Click on the project dropdown at the top
- Click "New Project"
- Enter a project name (e.g., "Stock Portfolio Analyzer")
- Click "Create"

### 3. Enable Google+ API
- In the left sidebar, click "APIs & Services" > "Library"
- Search for "Google+ API" or "Google+ API"
- Click on it and click "Enable"

### 4. Create OAuth 2.0 Credentials
- Go to "APIs & Services" > "Credentials"
- Click "Create Credentials" > "OAuth client ID"
- If prompted, configure the OAuth consent screen:
  - User Type: External
  - App name: "Stock Portfolio Analyzer"
  - User support email: Your email
  - Developer contact information: Your email
  - Save and continue through the other sections

### 5. Create OAuth Client ID
- Application type: "Web application"
- Name: "Stock Portfolio Analyzer Web Client"
- Authorized redirect URIs:
  - `http://localhost:5001/callback` (for development)
  - `https://yourdomain.com/callback` (for production)
- Click "Create"

### 6. Save Your Credentials
- Copy the **Client ID** and **Client Secret**
- Keep these secure and don't share them publicly

## Step 2: Configure Environment Variables

### Option 1: Environment Variables (Recommended)
Create a `.env` file in your project root:

```bash
# .env file
GOOGLE_CLIENT_ID=your_client_id_here
GOOGLE_CLIENT_SECRET=your_client_secret_here
SECRET_KEY=your_secret_key_here
```

### Option 2: Direct Configuration
Update the `config.py` file with your credentials:

```python
GOOGLE_CLIENT_ID = 'your_client_id_here'
GOOGLE_CLIENT_SECRET = 'your_client_secret_here'
SECRET_KEY = 'your_secret_key_here'
```

## Step 3: Install Additional Dependencies

```bash
pip install python-dotenv
```

## Step 4: Update the Application

Add this to the top of `app.py`:

```python
from dotenv import load_dotenv
load_dotenv()
```

## Step 5: Test the Setup

1. Start the application:
   ```bash
   python app.py
   ```

2. Open your browser to `http://localhost:5001`

3. Click "Sign in with Google"

4. You should be redirected to Google's OAuth consent screen

5. After authorization, you'll be redirected back to the dashboard

## Troubleshooting

### Common Issues:

1. **"redirect_uri_mismatch" error**
   - Make sure the redirect URI in Google Cloud Console matches exactly
   - For development: `http://localhost:5001/callback`
   - For production: `https://yourdomain.com/callback`

2. **"invalid_client" error**
   - Check that your Client ID and Client Secret are correct
   - Make sure you're using the Web application credentials, not other types

3. **"access_denied" error**
   - Check that the Google+ API is enabled
   - Verify your OAuth consent screen is configured

4. **"state" parameter error**
   - This is usually a session issue. Try clearing your browser cookies
   - Make sure your Flask secret key is set

### Security Best Practices:

1. **Never commit credentials to version control**
   - Use environment variables
   - Add `.env` to your `.gitignore`

2. **Use HTTPS in production**
   - Google OAuth requires HTTPS for production
   - Set up SSL certificates

3. **Rotate secrets regularly**
   - Change your Client Secret periodically
   - Update your Flask secret key

4. **Limit OAuth scopes**
   - Only request the scopes you need
   - Current scopes: `openid`, `email`, `profile`

## Production Deployment

For production deployment:

1. **Update redirect URIs** in Google Cloud Console
2. **Set up HTTPS** with proper SSL certificates
3. **Use environment variables** for all secrets
4. **Configure proper session storage** (Redis, database, etc.)
5. **Set up monitoring** for OAuth errors

## Example Environment Variables

```bash
# Development
GOOGLE_CLIENT_ID=123456789-abcdef.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=GOCSPX-your-secret-here
SECRET_KEY=your-super-secret-key-change-this
FLASK_ENV=development

# Production
GOOGLE_CLIENT_ID=123456789-abcdef.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=GOCSPX-your-secret-here
SECRET_KEY=your-super-secret-key-change-this
FLASK_ENV=production
DATABASE_URL=postgresql://user:pass@localhost/dbname
```

## Support

If you encounter issues:

1. Check the Google Cloud Console for any error messages
2. Verify your OAuth configuration matches this guide
3. Check the Flask application logs for detailed error messages
4. Ensure all dependencies are installed correctly

## Additional Resources

- [Google OAuth 2.0 Documentation](https://developers.google.com/identity/protocols/oauth2)
- [Flask-Login Documentation](https://flask-login.readthedocs.io/)
- [Google Cloud Console](https://console.cloud.google.com/) 