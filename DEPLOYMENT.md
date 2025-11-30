# Deployment Guide

## Quick Deploy to Railway (Recommended)

Railway is the easiest way to deploy this app with database support.

### Step 1: Push to GitHub
Make sure your code is pushed to GitHub:
```bash
git push origin main
```

### Step 2: Deploy via Railway Web Interface

1. **Go to Railway**: Visit [railway.app](https://railway.app) and sign up/login (free tier available)

2. **Create New Project**:
   - Click "New Project"
   - Select "Deploy from GitHub repo"
   - Authorize Railway to access your GitHub
   - Select your repository: `purchase-cozy-heaven-H1-2026`

3. **Railway Auto-Detection**:
   - Railway will automatically detect Node.js
   - It will use `npm start` as the start command
   - The database will be created automatically in Railway's persistent storage

4. **Get Your URL**:
   - Once deployed, Railway will provide a public URL
   - Your app will be live at: `https://your-app-name.up.railway.app`

5. **Environment Variables** (Optional):
   - Railway automatically sets `PORT` environment variable
   - No additional configuration needed!

### Step 3: Verify Deployment

1. Visit your Railway URL
2. Test creating a scenario
3. The database will persist across deployments


## Database Persistence

- **Railway**: Database automatically persists in Railway's storage
- **Local**: Database stored in `data/scenarios.db`

## Troubleshooting

### Database not persisting?
- Make sure you're using a platform with persistent storage (Railway/Render)
- Check that the `data/` directory is writable

### Port issues?
- Railway and Render automatically set the `PORT` environment variable
- The server.js already uses `process.env.PORT || 3000`

### Build fails?
- Make sure all dependencies are in `package.json`
- Check that `npm run build` works locally first

## Production Checklist

- ✅ Code pushed to GitHub
- ✅ Database configured (SQLite in `data/` directory)
- ✅ Environment variables set (if needed)
- ✅ Build command: `npm run build`
- ✅ Start command: `npm start`
- ✅ Port configured: Uses `process.env.PORT`

