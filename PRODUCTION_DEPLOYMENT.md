# Production Deployment Guide for MailMitra

## 🚀 Quick Deploy Steps

### Step 1: Set Up External Services

#### 1.1 MongoDB Atlas (Database)
1. Go to [MongoDB Atlas](https://cloud.mongodb.com)
2. Create a free cluster (M0)
3. Create database user with password
4. Whitelist IP: `0.0.0.0/0` (allow all) for serverless deployments
5. Get connection string: `mongodb+srv://username:password@cluster.mongodb.net/mailmitra`

#### 1.2 Upstash Redis (Sessions)
1. Go to [Upstash Console](https://console.upstash.com)
2. Create a new Redis database (free tier)
3. Copy the `rediss://` URL

#### 1.3 Google OAuth (Gmail Integration)
1. Go to [Google Cloud Console](https://console.cloud.google.com/apis/credentials)
2. Edit your OAuth 2.0 Client
3. Add authorized redirect URI: `https://YOUR_BACKEND_URL/api/auth/google/callback`
4. Add authorized JavaScript origin: `https://YOUR_FRONTEND_URL`

---

### Step 2: Deploy Backend (Railway recommended)

#### Option A: Railway (Recommended)
1. Go to [Railway](https://railway.app)
2. Create new project → Deploy from GitHub repo
3. Select `backend` folder as root directory
4. Add environment variables (see below)
5. Deploy!

#### Option B: Render
1. Go to [Render](https://render.com)
2. Create new Web Service
3. Connect GitHub repo, set root to `backend`
4. Set build command: `npm install && npm run build`
5. Set start command: `npm start`

### Backend Environment Variables

```bash
NODE_ENV=production
PORT=5000

# MongoDB Atlas
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/mailmitra?retryWrites=true&w=majority

# AI APIs
OPENAI_API_KEY=your-openai-key
GEMINI_API_KEY=your-gemini-key

# Frontend URL (update after deploying frontend)
FRONTEND_URL=https://mailmitra.vercel.app

# Google OAuth
GOOGLE_CLIENT_ID=your-client-id.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=GOCSPX-your-secret
GOOGLE_REDIRECT_URI=https://YOUR_BACKEND_URL/api/auth/google/callback

# Security (generate with: openssl rand -base64 32)
JWT_SECRET=your-super-secret-jwt-key-min-32-chars

# Redis (Upstash)
REDIS_URL=rediss://default:password@your-endpoint.upstash.io:6379
```

---

### Step 3: Deploy Frontend (Vercel)

1. Go to [Vercel](https://vercel.com)
2. Import GitHub repo
3. Set root directory: `frontend`
4. Add environment variable:
   ```
   NEXT_PUBLIC_API_URL=https://your-backend-url.railway.app
   ```
5. Deploy!

---

### Step 4: Update URLs

After both are deployed:

1. **Update Backend** `FRONTEND_URL` with your Vercel URL
2. **Update Google OAuth** redirect URI with your Railway/Render backend URL
3. Redeploy backend

---

## 📋 Pre-Deployment Checklist

- [ ] MongoDB Atlas cluster created
- [ ] Upstash Redis database created
- [ ] Google OAuth credentials updated with production URLs
- [ ] Backend deployed with all env vars
- [ ] Frontend deployed with `NEXT_PUBLIC_API_URL`
- [ ] Test email generation
- [ ] Test Gmail OAuth flow
- [ ] Test email sending

---

## 🔐 Security Notes

1. **JWT_SECRET**: Generate with `openssl rand -base64 32`
2. **API Keys**: Never commit to Git
3. **MongoDB**: Use strong password, enable IP whitelist in production
4. **Redis**: Always use `rediss://` (TLS) in production

---

## 🛠️ Troubleshooting

### CORS Errors
- Ensure `FRONTEND_URL` matches exactly (no trailing slash)
- Check backend logs for CORS rejection

### OAuth Errors
- Verify redirect URI matches exactly in Google Console
- Ensure user is added as test user if app not verified

### Session Lost
- Check Redis connection in backend logs
- Verify `REDIS_URL` is correct

1. **JWT_SECRET**: Generate using:
   ```bash
   openssl rand -base64 32
   ```

2. **MongoDB**: Use MongoDB Atlas with IP whitelist or VPC peering

3. **Redis**: Always use `rediss://` (TLS) in production

4. **API Keys**: Never commit to Git, use environment variables only
