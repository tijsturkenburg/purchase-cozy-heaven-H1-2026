// Health check endpoint
// This file must use CommonJS (require) for Vercel serverless functions
let createClient;
try {
  createClient = require('@supabase/supabase-js').createClient;
} catch (error) {
  console.error('Failed to load @supabase/supabase-js:', error);
}

function getSupabaseClient() {
  const supabaseUrl = process.env.SUPABASE_URL;
  const supabaseKey = process.env.SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseKey) {
    return null;
  }

  return createClient(supabaseUrl, supabaseKey);
}

module.exports = async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  try {
    const supabase = getSupabaseClient();
    const hasEnvVars = !!supabase;
    
    let dbStatus = 'not_configured';
    if (supabase) {
      // Try a simple query
      const { error } = await supabase.from('scenarios').select('id').limit(1);
      dbStatus = error ? 'error' : 'connected';
    }

    res.json({ 
      status: 'ok', 
      message: 'API is running',
      database: dbStatus,
      hasEnvVars,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    res.json({ 
      status: 'error', 
      message: error.message,
      timestamp: new Date().toISOString()
    });
  }
};

