# Railway Deployment Troubleshooting

## Your Railway URL
https://web-production-599f.up.railway.app/

## Common Issues & Solutions

### 1. Check Railway Dashboard

Go to your Railway dashboard and check:

**Service Settings:**
- ✅ Build Command: Should be `npm run build` (or leave empty, Railway auto-detects)
- ✅ Start Command: Should be `npm start`
- ✅ Root Directory: Leave empty (or set to `/`)

**Deployments Tab:**
- Check if the latest deployment succeeded
- Look at the build logs for any errors
- Check if the service is running (green status)

### 2. Build Command Issue

Railway needs to build the frontend before starting the server. Make sure:

1. **In Railway Dashboard → Settings → Build:**
   - Build Command: `npm run build`
   - Or Railway will auto-detect and run `npm run build`

2. **Start Command:**
   - Start Command: `npm start`

### 3. Database Path Issue

The database needs to be created. Check Railway logs for database errors.

**In Railway Dashboard:**
- Go to "Deployments" → Click latest deployment → View logs
- Look for database-related errors

### 4. Port Configuration

Railway automatically sets `PORT` environment variable. The server.js already handles this:
```javascript
const PORT = process.env.PORT || 3000;
```

### 5. Check Logs

**To view logs:**
1. Go to Railway Dashboard
2. Click on your service
3. Go to "Deployments" tab
4. Click on the latest deployment
5. View "Build Logs" and "Deploy Logs"

**Common errors to look for:**
- `Cannot find module` - Missing dependencies
- `EACCES` - Permission issues with database file
- `Port already in use` - Port configuration issue

### 6. Quick Fixes

**If build fails:**
- Make sure `package.json` has all dependencies
- Check that `npm run build` works locally first

**If server won't start:**
- Check that `dist/` folder exists after build
- Verify `server.js` can find `database.js`
- Check database file permissions

**If database errors:**
- Railway should create the `data/` directory automatically
- Check that the directory is writable

### 7. Redeploy

If something is wrong:
1. Go to Railway Dashboard
2. Click on your service
3. Go to "Settings" → "Deploy"
4. Click "Redeploy"

### 8. Environment Variables

Railway automatically provides:
- `PORT` - Port number (automatically set)
- `RAILWAY_ENVIRONMENT` - Environment name

No additional environment variables needed!

## Expected Behavior

When working correctly:
- ✅ Build completes successfully
- ✅ Server starts on Railway's PORT
- ✅ Database file created in `data/scenarios.db`
- ✅ API endpoints respond at `/api/scenarios`
- ✅ Frontend loads at root URL

## Still Having Issues?

1. **Check Railway Logs** - Most issues show up in logs
2. **Test Locally First** - Run `npm run build && npm start` locally
3. **Verify Dependencies** - Make sure all packages are in `package.json`
4. **Check File Structure** - Ensure `dist/` folder is created after build

