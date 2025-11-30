// Vercel Serverless Function for scenarios API
const { createClient } = require('@supabase/supabase-js');

function getSupabaseClient() {
  const supabaseUrl = process.env.SUPABASE_URL;
  const supabaseKey = process.env.SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseKey) {
    console.error('Missing Supabase environment variables:', {
      hasUrl: !!supabaseUrl,
      hasKey: !!supabaseKey
    });
    return null;
  }

  return createClient(supabaseUrl, supabaseKey);
}

module.exports = async function handler(req, res) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  try {
    const supabase = getSupabaseClient();
    
    if (!supabase) {
      return res.status(500).json({ 
        error: 'Database not configured', 
        message: 'Missing Supabase environment variables. Please set SUPABASE_URL and SUPABASE_ANON_KEY in Vercel.',
        hint: 'Check Vercel Settings → Environment Variables'
      });
    }
    
    switch (req.method) {
      case 'GET':
        // Get all scenarios
        const { data, error } = await supabase
          .from('scenarios')
          .select('*')
          .order('updated_at', { ascending: false });
        
        if (error) throw error;
        res.json(data.map(s => ({
          id: s.id,
          name: s.name,
          colours: s.colours,
          savedAt: s.created_at,
          updatedAt: s.updated_at
        })));
        break;

      case 'POST':
        // Create scenario
        const { name, colours } = req.body;
        console.log('POST request received:', { name, hasColours: !!colours });
        
        if (!name || !colours) {
          return res.status(400).json({ error: 'Name and colours are required' });
        }

        console.log('Attempting to insert into scenarios table...');
        const { data: newScenario, error: createError } = await supabase
          .from('scenarios')
          .insert({ name, colours })
          .select()
          .single();
        
        if (createError) {
          console.error('Supabase insert error:', {
            message: createError.message,
            code: createError.code,
            details: createError.details,
            hint: createError.hint
          });
          return res.status(500).json({ 
            error: 'Database error', 
            message: createError.message,
            code: createError.code,
            details: createError.details,
            hint: createError.hint || 'Check if table exists and RLS policies are set correctly'
          });
        }
        
        if (!newScenario) {
          console.error('No data returned from insert');
          return res.status(500).json({ 
            error: 'Insert failed', 
            message: 'No data returned from database'
          });
        }
        
        console.log('Scenario created successfully:', newScenario.id);
        res.status(201).json({
          id: newScenario.id,
          name: newScenario.name,
          colours: newScenario.colours,
          savedAt: newScenario.created_at,
          updatedAt: newScenario.updated_at
        });
        break;

      default:
        res.status(405).json({ error: 'Method not allowed' });
    }
  } catch (error) {
    console.error('API Error:', error);
    res.status(500).json({ error: error.message || 'Internal server error' });
  }
};

