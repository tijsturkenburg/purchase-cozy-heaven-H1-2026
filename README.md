# Purchase Cozy Heaven H1 2026

A modern React web application with an Order Configurator for bedding products.

## Quick Start

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Start the development server:**
   ```bash
   npm run dev
   ```

3. **Open your browser:**
   Navigate to [http://localhost:3000](http://localhost:3000)

## Project Structure

```
purchase_cozy_heaven_H1_2026/
├── src/
│   ├── components/
│   │   └── OrderConfigurator.jsx  # Main order configurator component
│   ├── App.jsx                    # Root App component
│   ├── main.jsx                   # React entry point
│   └── index.css                  # Global styles with Tailwind
├── index.html                     # HTML template
├── vite.config.js                 # Vite configuration
├── tailwind.config.js             # Tailwind CSS configuration
├── postcss.config.js              # PostCSS configuration
├── package.json                   # Dependencies and scripts
└── README.md                      # This file
```

## Features

- ✅ **React 18** with Vite for fast development
- ✅ **Tailwind CSS** for modern styling
- ✅ **Order Configurator** - Complete bedding order management system
  - Multiple colour support
  - Bedding sets (Duvet covers + Pillowcases)
  - Individual products (Duvet covers, Pillowcases, Fitted sheets)
  - MOQ (Minimum Order Quantity) tracking per colour
  - Fabric calculation per product
  - Real-time totals and summaries
- ✅ **Lucide React** icons for beautiful UI
- ✅ Hot module replacement for instant updates

## Available Scripts

- `npm run dev` - Start development server (Vite)
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm start` - Start Express server (legacy)

## Order Configurator Features

The Order Configurator allows you to:

- **Add/Remove Colours**: Manage multiple colour variants
- **Track Bedding Sets**: Configure complete bedding sets with duvet covers and pillowcases
- **Manage Individual Items**: Order duvet covers, pillowcases, and fitted sheets separately
- **MOQ Tracking**: Visual indicators show which colours meet the minimum order quantity (2000m)
- **Fabric Calculations**: Automatic calculation of fabric needed per product
- **Real-time Totals**: See totals per colour and overall order summary

## Development

The development server runs on port 3000 by default with Vite's fast HMR (Hot Module Replacement).

## Technology Stack

- **React 18** - UI library
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **Lucide React** - Icon library

## Deployment

### Railway (Recommended - Supports Database)

Railway supports Node.js apps with persistent storage for SQLite databases.

**Option 1: Deploy via Railway CLI**

1. **Install Railway CLI** (if not already installed):
   ```bash
   npm i -g @railway/cli
   ```

2. **Login to Railway**:
   ```bash
   railway login
   ```

3. **Initialize and deploy**:
   ```bash
   railway init
   railway up
   ```

**Option 2: Deploy via Railway Web Dashboard**

1. Go to [railway.app](https://railway.app) and sign up/login
2. Click "New Project"
3. Select "Deploy from GitHub repo"
4. Connect your GitHub repository
5. Railway will automatically detect Node.js and deploy
6. The database will be created automatically in Railway's persistent storage

### Render

1. Go to [render.com](https://render.com) and sign up/login
2. Create a new "Web Service"
3. Connect your GitHub repository
4. Set:
   - **Build Command**: `npm run build`
   - **Start Command**: `npm start`
   - **Environment**: Node
5. Add a persistent disk for database storage
6. Deploy

### Local Production Build

```bash
npm run build
npm start
```

The production build will be in the `dist/` directory, and the server will run on port 3000 (or PORT environment variable).

### Database

The SQLite database is automatically created in the `data/` directory on first run. In production (Railway/Render), the database persists in the platform's storage.

