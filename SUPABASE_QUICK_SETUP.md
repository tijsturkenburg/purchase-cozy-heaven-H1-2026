# Quick Supabase Setup

## Your Supabase Project
**Project URL**: https://mgctvhqbzacekiddquez.supabase.co

## Step 1: Run SQL Setup

1. Go to your Supabase dashboard: https://supabase.com/dashboard/project/mgctvhqbzacekiddquez
2. Click on **"SQL Editor"** in the left sidebar
3. Click **"New Query"**
4. Copy and paste the entire contents of `supabase-setup.sql`
5. Click **"Run"** (or press Cmd/Ctrl + Enter)
6. You should see "Success. No rows returned"

## Step 2: Get Your API Keys

1. In Supabase dashboard, go to **"Settings"** → **"API"**
2. Copy these values:
   - **Project URL**: `https://mgctvhqbzacekiddquez.supabase.co` (you already have this)
   - **anon public key**: Copy the `anon` `public` key (starts with `eyJ...`)

## Step 3: Add to Vercel

1. Go to your Vercel project settings
2. Go to **"Environment Variables"**
3. Add:
   - **Name**: `SUPABASE_URL`
   - **Value**: `https://mgctvhqbzacekiddquez.supabase.co`
   - Add for: Production, Preview, Development
4. Add:
   - **Name**: `SUPABASE_ANON_KEY`
   - **Value**: (paste your anon public key here)
   - Add for: Production, Preview, Development
5. **Redeploy** your Vercel project

## Step 4: Verify

1. Visit your Vercel URL
2. Try creating a scenario
3. Check Supabase dashboard → **"Table Editor"** → **"scenarios"** to see your data

## Troubleshooting

### Table doesn't exist?
- Make sure you ran the SQL script in Supabase SQL Editor
- Check for any errors in the SQL Editor output

### API errors?
- Verify environment variables are set correctly in Vercel
- Check Vercel Function Logs for errors
- Make sure you copied the correct `anon public` key (not the `service_role` key)

### Connection refused?
- Check that your Supabase project is active (not paused)
- Verify the project URL is correct

