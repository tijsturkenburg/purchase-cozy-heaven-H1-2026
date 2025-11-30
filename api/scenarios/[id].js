// Vercel Serverless Function for single scenario operations
// This file must use CommonJS (require) for Vercel serverless functions
let createClient;
try {
  createClient = require('@supabase/supabase-js').createClient;
} catch (error) {
  console.error('Failed to load @supabase/supabase-js:', error);
  throw error;
}

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
  res.setHeader('Access-Control-Allow-Methods', 'GET,PUT,DELETE,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  const { id } = req.query;

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
        // Get single scenario
        const { data, error } = await supabase
          .from('scenarios')
          .select('*')
          .eq('id', id)
          .single();
        
        if (error) throw error;
        if (!data) {
          return res.status(404).json({ error: 'Scenario not found' });
        }
        res.json({
          id: data.id,
          name: data.name,
          colours: data.colours,
          savedAt: data.created_at,
          updatedAt: data.updated_at
        });
        break;

      case 'PUT':
        // Update scenario
        const { name: updateName, colours: updateColours } = req.body;
        if (!updateName || !updateColours) {
          return res.status(400).json({ error: 'Name and colours are required' });
        }

        const { data: updatedScenario, error: updateError } = await supabase
          .from('scenarios')
          .update({ name: updateName, colours: updateColours })
          .eq('id', id)
          .select()
          .single();
        
        if (updateError) throw updateError;
        if (!updatedScenario) {
          return res.status(404).json({ error: 'Scenario not found' });
        }
        res.json({
          id: updatedScenario.id,
          name: updatedScenario.name,
          colours: updatedScenario.colours,
          savedAt: updatedScenario.created_at,
          updatedAt: updatedScenario.updated_at
        });
        break;

      case 'DELETE':
        // Delete scenario
        const { error: deleteError } = await supabase
          .from('scenarios')
          .delete()
          .eq('id', id);
        
        if (deleteError) throw deleteError;
        res.json({ message: 'Scenario deleted successfully' });
        break;

      default:
        res.status(405).json({ error: 'Method not allowed' });
    }
  } catch (error) {
    console.error('API Error:', error);
    res.status(500).json({ error: error.message || 'Internal server error' });
  }
}

