# Setup Checklist - Make Application Work

## ✅ Step 1: Create Database Table in Supabase

1. Go to: https://supabase.com/dashboard/project/mgctvhqbzacekiddquez
2. Click **"SQL Editor"** in left sidebar
3. Click **"New Query"**
4. Copy and paste the entire contents of `supabase-setup.sql`
5. Click **"Run"** (or press Cmd/Ctrl + Enter)
6. You should see: "Success. No rows returned"
7. Verify: Go to **"Table Editor"** → You should see `scenarios` table

## ✅ Step 2: Set Environment Variables in Vercel

1. Go to: https://vercel.com/dashboard
2. Find your project: `purchase-cozy-heaven-h1-2026`
3. Click **"Settings"** tab
4. Click **"Environment Variables"** in left sidebar
5. Add these TWO variables:

   **Variable 1:**
   - Key: `SUPABASE_URL`
   - Value: `https://mgctvhqbzacekiddquez.supabase.co`
   - Environments: ✅ Production, ✅ Preview, ✅ Development
   - Click **"Save"**

   **Variable 2:**
   - Key: `SUPABASE_ANON_KEY`
   - Value: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1nY3R2aHFiemFjZWtpZGRxdWV6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQ1NDE5NjIsImV4cCI6MjA4MDExNzk2Mn0.zKVl57msdRRkuy8hVgSiQlNXY_QVEgrl0qOOnNEf7-8`
   - Environments: ✅ Production, ✅ Preview, ✅ Development
   - Click **"Save"**

6. **IMPORTANT**: After adding env vars, go to **"Deployments"** tab
7. Click **"..."** on the latest deployment → **"Redeploy"**
8. Or push a new commit to trigger redeploy

## ✅ Step 3: Verify Setup

### Test Health Endpoint:
Visit: `https://your-app.vercel.app/api/health`

Expected response:
```json
{
  "status": "ok",
  "message": "API is running",
  "database": "connected",
  "hasEnvVars": true,
  "timestamp": "..."
}
```

If `database: "not_configured"` → Environment variables not set
If `database: "error"` → Database table not created or RLS issue

### Test Scenarios Endpoint:
Visit: `https://your-app.vercel.app/api/scenarios`

Expected response: `[]` (empty array) or list of scenarios

## ✅ Step 4: Test in Application

1. Open your deployed app
2. Open browser console (F12)
3. Try to save a scenario
4. Check console for any errors
5. If error, check the detailed error message

## Common Issues

### Issue: "Database not configured"
- **Fix**: Environment variables not set in Vercel → Follow Step 2

### Issue: "relation 'scenarios' does not exist"
- **Fix**: Database table not created → Follow Step 1

### Issue: "new row violates row-level security policy"
- **Fix**: RLS policy not set → Run `supabase-setup.sql` again (Step 1)

### Issue: API returns 404
- **Fix**: Check Vercel deployment logs, ensure API folder structure is correct

## Still Not Working?

1. Check Vercel Function Logs:
   - Vercel Dashboard → Your Project → **"Functions"** tab
   - Click on `/api/scenarios`
   - View **"Logs"** to see errors

2. Check Browser Console:
   - Open DevTools (F12)
   - Try saving scenario
   - Look for error messages

3. Share:
   - Browser console error
   - Vercel function logs error
   - Health endpoint response

