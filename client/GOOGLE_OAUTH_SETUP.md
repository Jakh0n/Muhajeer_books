# Google OAuth Setup Guide

## Step 1: Get Google OAuth Credentials

1. **Go to Google Cloud Console**

   - Visit: https://console.cloud.google.com/

2. **Create or Select a Project**

   - Click the project dropdown at the top
   - Click "New Project"
   - Enter project name (e.g., "Redopia")
   - Click "Create"

3. **Enable Google+ API**

   - Go to "APIs & Services" > "Library"
   - Search for "Google+ API" or "People API"
   - Click "Enable"

4. **Configure OAuth Consent Screen**

   - Go to "APIs & Services" > "OAuth consent screen"
   - Select "External" (or "Internal" if using Google Workspace)
   - Fill in:
     - App name: Your app name
     - User support email: Your email
     - Developer contact: Your email
   - Click "Save and Continue"
   - Skip the Scopes step (click "Continue")
   - Skip the Test Users step (click "Continue")
   - Review and click "Back to Dashboard"

5. **Create OAuth Client ID**
   - Go to "APIs & Services" > "Credentials"
   - Click "Create Credentials" > "OAuth client ID"
   - Application type: **Web application**
   - Name: "Redopia Web Client" (or any name)
   - **Authorized JavaScript origins:**
     ```
     http://localhost:3000
     ```
   - **Authorized redirect URIs:**
     ```
     http://localhost:3000/api/auth/callback/google
     ```
   - Click "Create"
   - **Copy the Client ID and Client Secret**

## Step 2: Add Environment Variables

Create a `.env.local` file in the `client` folder (if it doesn't exist) and add:

```env
# Google OAuth
GOOGLE_CLIENT_ID=your_client_id_here
GOOGLE_CLIENT_SECRET=your_client_secret_here

# NextAuth
NEXT_AUTH_SECRET=your_random_secret_here
NEXT_PUBLIC_JWT_SECRET=your_jwt_secret_here

# Server URL
NEXT_PUBLIC_SERVER_URL=http://localhost:5000
```

### Generate Secrets

You can generate random secrets using:

- Online: https://generate-secret.vercel.app/32
- Terminal: `openssl rand -base64 32`

## Step 3: Restart Your Development Server

After adding environment variables:

1. Stop your Next.js dev server (Ctrl+C)
2. Restart it: `npm run dev`

## Production Setup

For production, add your production URLs to Google Cloud Console:

**Authorized JavaScript origins:**

```
https://yourdomain.com
```

**Authorized redirect URIs:**

```
https://yourdomain.com/api/auth/callback/google
```

## Troubleshooting

### "Access Denied" Error

- Check if `GOOGLE_CLIENT_ID` and `GOOGLE_CLIENT_SECRET` are set correctly
- Verify redirect URI matches exactly (including protocol http/https)
- Make sure you restarted the dev server after adding env variables

### "Redirect URI Mismatch" (Error 400)

**This is the most common error!** Follow these steps:

1. **Go to Google Cloud Console**

   - Visit: https://console.cloud.google.com/
   - Select your project

2. **Navigate to Credentials**

   - Go to "APIs & Services" > "Credentials"
   - Find your OAuth 2.0 Client ID (the one you created)
   - Click the **pencil icon** (Edit) on the right

3. **Add the Redirect URI**

   - Scroll down to "Authorized redirect URIs"
   - Click "ADD URI"
   - Enter EXACTLY (no trailing slash, no spaces):
     ```
     http://localhost:3000/api/auth/callback/google
     ```
   - ⚠️ **IMPORTANT**:
     - Must be `http://` (not `https://`) for localhost
     - Must be exactly `/api/auth/callback/google` (NextAuth path)
     - No trailing slash
     - No extra spaces

4. **Also add Authorized JavaScript origins**

   - In "Authorized JavaScript origins" section
   - Click "ADD URI"
   - Enter:
     ```
     http://localhost:3000
     ```
   - No trailing slash!

5. **Save**

   - Click "SAVE" at the bottom
   - Wait a few seconds for changes to propagate

6. **Try again**
   - Go back to your app
   - Try signing in with Google again
   - It should work now!

**Common mistakes to avoid:**

- ❌ `http://localhost:3000/api/auth/callback/google/` (trailing slash)
- ❌ `https://localhost:3000/api/auth/callback/google` (https instead of http)
- ❌ `http://localhost:3000/auth/callback/google` (missing /api)
- ❌ `http://127.0.0.1:3000/api/auth/callback/google` (must use localhost, not 127.0.0.1)
- ✅ `http://localhost:3000/api/auth/callback/google` (correct!)

### "Invalid Client"

- Make sure you copied the entire Client ID and Client Secret
- Check for any extra spaces or line breaks
