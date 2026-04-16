# Heroku Backend Deployment Guide

## Prerequisites
- Heroku Account (free tier available): https://www.heroku.com
- Heroku CLI installed: https://devcenter.heroku.com/articles/heroku-cli
- GitHub repository already set up ✓

---

## Step 1: Install Heroku CLI

```bash
# Download from https://devcenter.heroku.com/articles/heroku-cli
# Or using chocolatey on Windows:
choco install heroku-cli

# Verify installation
heroku --version
```

---

## Step 2: Login to Heroku

```bash
heroku login
```
This will open your browser to login. Authorize and return to terminal.

---

## Step 3: Create Heroku App

```bash
cd c:\projects\21st_Electronics

# Create new Heroku app
heroku create 21st-electronics-api

# Or let Heroku generate a name:
heroku create
```

**Note:** App name must be unique globally. If `21st-electronics-api` is taken, Heroku will suggest alternatives.

Your app URL will be: `https://21st-electronics-api.herokuapp.com`

---

## Step 4: Set Environment Variables

Set all required environment variables on Heroku:

```bash
heroku config:set NODE_ENV=production
heroku config:set SMTP_USER=arthurmwakima@gmail.com
heroku config:set SMTP_PASSWORD=your_16_char_app_password
heroku config:set CONTACT_EMAIL=info@21st-electronics.com
heroku config:set SUPPORT_EMAIL=support@21st-electronics.com
heroku config:set FRONTEND_URL=https://21st-electronics-com.vercel.app
```

**Or via Heroku Dashboard:**
1. Go to https://dashboard.heroku.com/apps/21st-electronics-api
2. Settings → Config Vars
3. Add each variable manually

### Variables to Set:
| Variable | Value | Example |
|----------|-------|---------|
| NODE_ENV | production | - |
| SMTP_USER | Your Gmail | arthurmwakima@gmail.com |
| SMTP_PASSWORD | 16-char app password | xxxxxxxxxxxx |
| CONTACT_EMAIL | Business email | info@21st-electronics.com |
| SUPPORT_EMAIL | Support email | support@21st-electronics.com |
| FRONTEND_URL | Vercel frontend URL | https://21st-electronics-com.vercel.app |

---

## Step 5: Deploy Backend to Heroku

```bash
# Option A: Deploy from GitHub (Recommended)
# 1. Go to https://dashboard.heroku.com/apps/21st-electronics-api
# 2. Deploy → Connect to GitHub
# 3. Search for "21st_electronics"
# 4. Click "Connect"
# 5. Click "Enable Automatic Deploys"

# Option B: Deploy from Command Line
cd c:\projects\21st_Electronics
heroku git:remote -a 21st-electronics-api
git push heroku master
```

**Deploy Logs:**
```bash
heroku logs --tail
```

---

## Step 6: Verify Backend Deployment

```bash
# Test the API endpoint
curl https://21st-electronics-api.herokuapp.com/api/status

# Or visit in browser:
# https://21st-electronics-api.herokuapp.com/api/status
```

**Expected Response:**
```json
{
  "status": "Backend API is running",
  "timestamp": "2026-04-16T10:30:00Z"
}
```

---

## Step 7: Update Frontend Environment Variable

1. Go to https://vercel.com/dashboard
2. Select your 21st Electronics project
3. Settings → Environment Variables
4. Update `VITE_API_BASE_URL`:
   - **Value:** `https://21st-electronics-api.herokuapp.com/api`
5. Click "Save"

---

## Step 8: Redeploy Frontend

1. In Vercel Dashboard → Deployments
2. Click "Re-deploy" on latest build
3. Wait for completion

---

## Step 9: Test Everything

### Test Frontend Routes
Visit https://21st-electronics-com.vercel.app and test:
- ✓ `/` (Home page loads)
- ✓ `/plans` (no 404)
- ✓ `/products` (no 404)
- ✓ `/contact` (page loads)

### Test Form Submission
1. Go to Contact page: https://21st-electronics-com.vercel.app/contact
2. Fill out contact form
3. Click "Send Message"
4. Should see success message
5. Check Gmail inbox for confirmation email

---

## Monitoring

### Check Heroku Logs
```bash
# Real-time logs
heroku logs --tail

# Last 50 lines
heroku logs -n 50

# Filter for errors
heroku logs | grep "ERROR"
```

### Heroku Dashboard
- App status: https://dashboard.heroku.com/apps/21st-electronics-api
- View logs: Resources → View logs
- Restart app: Resources → Dyno formation → Restart

---

## Troubleshooting

### App Crashes on Deploy
**Symptom:** `Application Error` when visiting app

**Solution:**
```bash
# Check logs for errors
heroku logs --tail

# Restart app
heroku restart
```

### Forms Not Sending Emails
**Check:**
1. Gmail credentials correct in Config Vars
2. Gmail app password is valid (not account password)
3. "Less secure apps" is enabled if using Gmail password
4. Check Heroku logs for SMTP errors

```bash
heroku logs --tail | grep SMTP
```

### 404 on API Endpoints
**Solution:** Backend Procfile might not exist or server isn't starting
```bash
# Verify Procfile exists in backend directory
# Should contain: web: node server.js

# Check server.js is listening on correct port
# Should use: process.env.PORT || 5000
```

### CORS Errors
**Solution:** Update backend CORS configuration
```bash
# In backend/server.js, verify:
const corsOptions = {
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  credentials: true
};
```

---

## Useful Commands

```bash
# Get app info
heroku apps

# View config vars
heroku config

# Set config var
heroku config:set KEY=value

# Unset config var
heroku config:unset KEY

# Restart app
heroku restart

# Stop/Start dyno
heroku ps:scale web=0  # Stop
heroku ps:scale web=1  # Start

# View dyno usage
heroku ps

# Open app in browser
heroku open

# Destroy app (⚠️ irreversible)
heroku apps:destroy 21st-electronics-api
```

---

## Next Steps

1. ✅ Backend deployed to Heroku
2. ✅ Frontend points to backend
3. ✅ Forms are working
4. **Next:** Consider:
   - Custom domain (add to Heroku)
   - SSL certificate (included with Heroku)
   - Database if needed for scaling
   - Monitoring with New Relic

---

## Success Checklist

- [ ] Heroku account created
- [ ] Heroku CLI installed
- [ ] Backend app created on Heroku
- [ ] All environment variables set
- [ ] Code deployed to Heroku
- [ ] Backend API responding at https://21st-electronics-api.herokuapp.com/api
- [ ] Frontend environment variable updated with backend URL
- [ ] Frontend redeployed on Vercel
- [ ] Contact form successfully sends emails
- [ ] All routes work without 404 errors
