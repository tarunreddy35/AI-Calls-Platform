# Deploy AI-Calls-Platform to Render

## Quick Deploy with Blueprint

1. **Go to Render Dashboard**: https://dashboard.render.com/

2. **Click "New" → "Blueprint"**

3. **Connect Your GitHub Repository**:
   - Repository: `tarunreddy35/AI-Calls-Platform`
   - Branch: `main`

4. **Configure Environment Variables**:
   
   For the **Backend Service** (`ai-calls-platform-backend`):
   - `GEMINI_API_KEY`: Your Google Gemini API key (get from https://makersuite.google.com/app/apikey)
   - `NODE_ENV`: `production` (auto-set)
   - `PORT`: `10000` (auto-set)

   For the **Frontend Service** (`ai-calls-platform-frontend`):
   - `VITE_API_URL`: Will be `https://ai-calls-platform-backend.onrender.com` (update after backend is deployed)

5. **Click "Apply"** - Render will:
   - Create 2 services (backend + frontend)
   - Install dependencies
   - Build both services
   - Deploy automatically

## Post-Deployment Steps

### 1. Update Frontend Environment Variable

After the backend deploys, you'll get a URL like:
```
https://ai-calls-platform-backend.onrender.com
```

Go to your **frontend service** → **Environment** → Update:
- `VITE_API_URL` = `https://ai-calls-platform-backend.onrender.com`

Then **manually redeploy** the frontend.

### 2. Access Your Application

- **Frontend**: `https://ai-calls-platform-frontend.onrender.com`
- **Backend API**: `https://ai-calls-platform-backend.onrender.com/api/health`

## Blueprint Configuration

The `render.yaml` includes:

### Backend Service
- ✅ Node.js runtime
- ✅ Automatic builds on git push
- ✅ Health check endpoint
- ✅ 1GB disk for demo_calls storage
- ✅ Environment variables for API keys
- ✅ Port binding to 10000

### Frontend Service
- ✅ Static site hosting
- ✅ Automatic Vite builds
- ✅ SPA routing configured
- ✅ Cache headers for performance
- ✅ API URL configuration

## Troubleshooting

### Backend Issues

**Check Logs**:
```bash
# In Render Dashboard → Backend Service → Logs
```

**Common Issues**:
1. **GEMINI_API_KEY not set**: Add it in Environment tab
2. **Demo calls not loading**: Disk mount may take time on first deploy
3. **Port binding error**: Ensure PORT is set to 10000

### Frontend Issues

**API Connection Fails**:
1. Verify `VITE_API_URL` is set correctly
2. Check backend service is running
3. Verify CORS is enabled in backend

**404 on Routes**:
- Blueprint includes SPA routing - should work automatically
- Check `staticPublishPath` is `./dist`

## Manual Deploy (Alternative)

If you prefer manual setup:

### Backend
1. New Web Service
2. Connect GitHub repo
3. Root directory: `service`
4. Build: `npm install && npm run build`
5. Start: `node dist/index.js`
6. Add environment variables

### Frontend
1. New Static Site
2. Connect GitHub repo
3. Build: `npm install && npm run build`
4. Publish: `./dist`
5. Add `VITE_API_URL` environment variable

## Free Tier Limits

- Both services run on **Free Tier**
- Backend spins down after 15 min of inactivity
- First request after spindown takes ~30 seconds
- Upgrade to paid plan for always-on services

## Updating Your App

Push to `main` branch:
```bash
git add .
git commit -m "Your changes"
git push origin main
```

Render auto-deploys on every push!

## Need Help?

- Render Docs: https://render.com/docs
- Gemini API: https://ai.google.dev/
- Repository: https://github.com/tarunreddy35/AI-Calls-Platform
