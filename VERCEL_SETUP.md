# Vercel + Supabase Setup Guide

## Step 1: Set Up Supabase Database

1. **Go to Supabase**: Visit [supabase.com](https://supabase.com) and sign up/login

2. **Create a New Project**:
   - Click "New Project"
   - Choose your organization
   - Enter project name: `purchase-cozy-heaven`
   - Set a database password (save it!)
   - Choose a region
   - Click "Create new project"

3. **Run SQL Setup**:
   - Go to "SQL Editor" in Supabase dashboard
   - Click "New Query"
   - Copy and paste the contents of `supabase-setup.sql`
   - Click "Run" to create the table

## Step 2: Get Supabase Credentials

1. **Go to Project Settings** → **API**
2. Copy these values:
   - **Project URL** (this is your `SUPABASE_URL`)
   - **anon/public key** (this is your `SUPABASE_ANON_KEY`)

## Step 3: Deploy to Vercel

### Option 1: Via Vercel Dashboard (Easiest)

1. **Go to Vercel**: Visit [vercel.com](https://vercel.com) and sign up/login

2. **Import Project**:
   - Click "Add New..." → "Project"
   - Import from GitHub
   - Select your repository: `purchase-cozy-heaven-H1-2026`

3. **Configure Project**:
   - Framework Preset: Vite (auto-detected)
   - Root Directory: `./` (leave default)
   - Build Command: `npm run build` (auto-detected)
   - Output Directory: `dist` (auto-detected)

4. **Add Environment Variables**:
   - Click "Environment Variables"
   - Add:
     - `SUPABASE_URL` = Your Supabase Project URL
     - `SUPABASE_ANON_KEY` = Your Supabase anon/public key
   - Make sure to add them for Production, Preview, and Development

5. **Deploy**:
   - Click "Deploy"
   - Wait for build to complete
   - Your app will be live!

### Option 2: Via Vercel CLI

```bash
# Install Vercel CLI
npm i -g vercel

# Login
vercel login

# Deploy
vercel

# Add environment variables
vercel env add SUPABASE_URL
vercel env add SUPABASE_ANON_KEY
```

## Step 4: Verify Deployment

1. Visit your Vercel URL (e.g., `https://your-app.vercel.app`)
2. Test creating a scenario
3. Check Supabase dashboard → Table Editor → `scenarios` to see your data

## Troubleshooting

### Database Connection Errors?
- Verify `SUPABASE_URL` and `SUPABASE_ANON_KEY` are set correctly in Vercel
- Check that the SQL setup script ran successfully in Supabase

### API Not Working?
- Check Vercel Function Logs in dashboard
- Verify the `api/` folder structure is correct
- Make sure environment variables are set for all environments

### Build Fails?
- Check that all dependencies are in `package.json`
- Verify `npm run build` works locally first

## Environment Variables Needed

- `SUPABASE_URL` - Your Supabase project URL
- `SUPABASE_ANON_KEY` - Your Supabase anon/public API key

Both should be added in Vercel dashboard → Project Settings → Environment Variables.

