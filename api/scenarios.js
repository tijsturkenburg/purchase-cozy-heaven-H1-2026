// Vercel Serverless Function for scenarios API
const { createClient } = require('@supabase/supabase-js');

function getSupabaseClient() {
  const supabaseUrl = process.env.SUPABASE_URL;
  const supabaseKey = process.env.SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseKey) {
    throw new Error('Missing Supabase environment variables. Please set SUPABASE_URL and SUPABASE_ANON_KEY in Vercel.');
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
        if (!name || !colours) {
          return res.status(400).json({ error: 'Name and colours are required' });
        }

        const { data: newScenario, error: createError } = await supabase
          .from('scenarios')
          .insert({ name, colours })
          .select()
          .single();
        
        if (createError) {
          console.error('Supabase insert error:', createError);
          return res.status(500).json({ 
            error: 'Database error', 
            details: createError.message,
            code: createError.code
          });
        }
        
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

