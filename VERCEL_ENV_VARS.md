# Vercel Environment Variables Setup

## Your Supabase Credentials

✅ **Project URL**: `https://mgctvhqbzacekiddquez.supabase.co`

✅ **anon public key**: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1nY3R2aHFiemFjZWtpZGRxdWV6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQ1NDE5NjIsImV4cCI6MjA4MDExNzk2Mn0.zKVl57msdRRkuy8hVgSiQlNXY_QVEgrl0qOOnNEf7-8`

## Step 1: Run SQL Setup in Supabase

Before deploying, make sure you've created the database table:

1. Go to: https://supabase.com/dashboard/project/mgctvhqbzacekiddquez
2. Click **"SQL Editor"** → **"New Query"**
3. Copy and paste the entire contents of `supabase-setup.sql`
4. Click **"Run"**
5. You should see "Success"

## Step 2: Add Environment Variables to Vercel

1. **Go to Vercel**: https://vercel.com/dashboard
2. **Select your project** (or create new one and import from GitHub)
3. **Go to Settings** → **Environment Variables**
4. **Add First Variable**:
   - **Key**: `SUPABASE_URL`
   - **Value**: `https://mgctvhqbzacekiddquez.supabase.co`
   - **Environments**: ✅ Production, ✅ Preview, ✅ Development
   - Click **"Save"**

5. **Add Second Variable**:
   - **Key**: `SUPABASE_ANON_KEY`
   - **Value**: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1nY3R2aHFiemFjZWtpZGRxdWV6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQ1NDE5NjIsImV4cCI6MjA4MDExNzk2Mn0.zKVl57msdRRkuy8hVgSiQlNXY_QVEgrl0qOOnNEf7-8`
   - **Environments**: ✅ Production, ✅ Preview, ✅ Development
   - Click **"Save"**

## Step 3: Deploy

1. If you haven't deployed yet:
   - Click **"Deployments"** tab
   - Click **"Redeploy"** on the latest deployment
   - Or push new code to trigger auto-deploy

2. If you just added environment variables:
   - You need to **redeploy** for them to take effect
   - Go to **"Deployments"** → Click **"..."** on latest → **"Redeploy"**

## Step 4: Verify

1. Visit your Vercel URL
2. Try creating a scenario
3. Check Supabase → **"Table Editor"** → **"scenarios"** to see your data

## Troubleshooting

### Environment variables not working?
- Make sure you added them for **all environments** (Production, Preview, Development)
- **Redeploy** after adding environment variables
- Check Vercel Function Logs for errors

### Database errors?
- Verify you ran the SQL setup script in Supabase
- Check Supabase → Table Editor → you should see `scenarios` table
- Verify RLS policies are set correctly (the SQL script sets them up)

