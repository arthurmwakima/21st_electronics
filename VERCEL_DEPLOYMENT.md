# Vercel Deployment Guide for 21st Electronics

## Frontend Deployment (Vercel)

### Step 1: Connect GitHub Repository
1. Go to https://vercel.com
2. Sign in with GitHub account (arthurmwakima)
3. Click "New Project"
4. Select `arthurmwakima/21st_electronics` repository
5. Click "Import"

### Step 2: Configure Project Settings
1. **Framework Preset:** Vite
2. **Build Command:** `cd twentyfirst-connect && npm run build`
3. **Output Directory:** `twentyfirst-connect/dist`
4. **Root Directory:** Leave as default

### Step 3: Add Environment Variables
In Vercel Project Settings → Environment Variables, add:

```
VITE_API_BASE_URL = https://your-backend-api-url.com/api
```

**Note:** Replace with your actual backend URL after deploying backend

### Step 4: Deploy
Click "Deploy" - Vercel will automatically deploy on every git push to master

---

## Backend Deployment Options

### Option A: Deploy to Railway.app (Recommended)
1. Go to https://railway.app
2. Create new project
3. Connect GitHub repository
4. Select the `21st_Electronics` repo
5. Configure:
   - **Start Command:** `cd backend && npm start`
   - **Build Command:** `cd backend && npm install`

### Option B: Deploy to Render.com
1. Go to https://render.com
2. Create new Web Service
3. Connect GitHub repository
4. Configure:
   - **Build Command:** `cd backend && npm install`
   - **Start Command:** `cd backend && npm start`

### Option C: Deploy to Heroku
1. Go to https://dashboard.heroku.com
2. Create new app
3. Connect GitHub repository
4. Add Procfile in backend folder (already exists)
5. Deploy

---

## Environment Variables for Backend

Add these in your deployment platform:

```
NODE_ENV=production
PORT=3000
GMAIL_USER=arthurmwakima@gmail.com
GMAIL_APP_PASSWORD=your_16_char_app_password
FRONTEND_URL=https://your-21st-electronics.vercel.app
```

---

## Post-Deployment Steps

1. **Update Frontend Environment Variable**
   - After backend is deployed, get its URL (e.g., `https://21st-electronics-api.railway.app`)
   - Update Vercel's `VITE_API_BASE_URL` to point to backend URL

2. **Test Links**
   - Visit https://your-site.vercel.app
   - Test contact form submission
   - Verify all pages load correctly

3. **Configure Custom Domain** (Optional)
   - Add domain in Vercel Project Settings
   - Update DNS records as per Vercel instructions

---

## Deployment Summary

| Component | Platform | URL Pattern |
|-----------|----------|-------------|
| Frontend (React) | Vercel | `https://21st-electronics.vercel.app` |
| Backend (Express) | Railway/Render/Heroku | `https://21st-electronics-api.railway.app` |
| Repository | GitHub | `https://github.com/arthurmwakima/21st_electronics` |

---

## Troubleshooting

### Contact form not working after deployment?
- Check backend URL in VITE_API_BASE_URL
- Verify backend is running and accessible
- Check backend CORS settings if on different domain

### 404 errors on routes?
- This is configured in `vercel.json` with rewrites
- Should automatically redirect all routes to index.html

### Build fails on Vercel?
- Check build logs in Vercel dashboard
- Ensure all dependencies are in package.json
- Verify TypeScript compilation

