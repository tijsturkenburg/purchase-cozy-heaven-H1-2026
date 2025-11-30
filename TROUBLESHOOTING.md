# Troubleshooting: "Failed to save scenario"

## Quick Checks

### 1. Check Browser Console
Open browser console (F12) and look for error messages when saving. The improved error handling will now show:
- HTTP status codes
- Database error messages
- Network errors

### 2. Verify Supabase Database Table

1. Go to: https://supabase.com/dashboard/project/mgctvhqbzacekiddquez
2. Click **"Table Editor"** in left sidebar
3. You should see a **"scenarios"** table
4. If not, go to **"SQL Editor"** and run `supabase-setup.sql`

### 3. Verify Vercel Environment Variables

1. Go to Vercel dashboard → Your project → **Settings** → **Environment Variables**
2. Check that both are set:
   - `SUPABASE_URL` = `https://mgctvhqbzacekiddquez.supabase.co`
   - `SUPABASE_ANON_KEY` = (your JWT token)
3. Make sure they're enabled for **Production**, **Preview**, and **Development**
4. **Important**: After adding/changing env vars, you MUST redeploy!

### 4. Check Vercel Function Logs

1. Go to Vercel dashboard → Your project → **Functions** tab
2. Click on `/api/scenarios`
3. View **Logs** to see any errors
4. Common errors:
   - "Missing Supabase environment variables" → Env vars not set
   - "relation 'scenarios' does not exist" → Table not created
   - "new row violates row-level security policy" → RLS policy issue

### 5. Test API Directly

Try these URLs in your browser:

- Health check: `https://your-app.vercel.app/api/health`
  - Should return: `{"status":"ok",...}`

- Get scenarios: `https://your-app.vercel.app/api/scenarios`
  - Should return: `[]` (empty array) or list of scenarios

- If you get errors, check the response for details

### 6. Common Issues & Solutions

**Issue: "Missing Supabase environment variables"**
- Solution: Add `SUPABASE_URL` and `SUPABASE_ANON_KEY` in Vercel → Settings → Environment Variables
- Then redeploy

**Issue: "relation 'scenarios' does not exist"**
- Solution: Run `supabase-setup.sql` in Supabase SQL Editor

**Issue: "new row violates row-level security policy"**
- Solution: The SQL script sets up RLS policies, but verify:
  1. Go to Supabase → Table Editor → scenarios
  2. Click "..." → "View Policies"
  3. Should see "Allow all operations on scenarios" policy
  4. If not, run the SQL script again

**Issue: CORS errors**
- Solution: Already handled in API functions, but check browser console

**Issue: Network error / Failed to fetch**
- Solution: Check Vercel deployment status, verify API endpoint exists

## Debug Steps

1. **Open browser console** (F12)
2. **Try saving a scenario**
3. **Check console for errors** - you'll now see detailed error messages
4. **Check Network tab** - see the actual API request/response
5. **Check Vercel Function Logs** - see server-side errors

## Still Not Working?

Share:
1. Browser console error message
2. Vercel Function Logs error
3. Network tab → Request/Response details

This will help identify the exact issue!

