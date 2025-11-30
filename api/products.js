// Vercel Serverless Function for products API
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

  try {
    return createClient(supabaseUrl, supabaseKey);
  } catch (error) {
    console.error('Failed to create Supabase client:', error);
    return null;
  }
}

module.exports = async function handler(req, res) {
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
        message: 'Missing Supabase environment variables.'
      });
    }
    
    switch (req.method) {
      case 'GET':
        const { data, error } = await supabase
          .from('products')
          .select('*')
          .order('category', { ascending: true })
          .order('item_type', { ascending: true });
        
        if (error) throw error;
        res.json(data || []);
        break;

      case 'POST':
        const { name, item_type, category, width, length, pillow_size, pillow_count, sku, components, fabric_per_unit } = req.body;
        
        if (!name || !item_type || !category) {
          return res.status(400).json({ error: 'Name, item_type, and category are required' });
        }

        const { data: newProduct, error: createError } = await supabase
          .from('products')
          .insert({ 
            name, 
            item_type, 
            category, 
            width, 
            length, 
            pillow_size, 
            pillow_count, 
            sku, 
            components, 
            fabric_per_unit 
          })
          .select()
          .single();
        
        if (createError) {
          console.error('Supabase insert error:', createError);
          return res.status(500).json({ 
            error: 'Database error', 
            message: createError.message,
            code: createError.code
          });
        }
        
        res.status(201).json(newProduct);
        break;

      case 'PUT':
        const { id, ...updateData } = req.body;
        if (!id) {
          return res.status(400).json({ error: 'Product ID is required' });
        }

        const { data: updatedProduct, error: updateError } = await supabase
          .from('products')
          .update(updateData)
          .eq('id', id)
          .select()
          .single();
        
        if (updateError) {
          console.error('Supabase update error:', updateError);
          return res.status(500).json({ 
            error: 'Database error', 
            message: updateError.message
          });
        }
        
        res.json(updatedProduct);
        break;

      case 'DELETE':
        const { id: deleteId } = req.query;
        if (!deleteId) {
          return res.status(400).json({ error: 'Product ID is required' });
        }

        const { error: deleteError } = await supabase
          .from('products')
          .delete()
          .eq('id', deleteId);
        
        if (deleteError) {
          console.error('Supabase delete error:', deleteError);
          return res.status(500).json({ 
            error: 'Database error', 
            message: deleteError.message
          });
        }
        
        res.json({ message: 'Product deleted successfully' });
        break;

      default:
        res.status(405).json({ error: 'Method not allowed' });
    }
  } catch (error) {
    console.error('API Error:', error);
    res.status(500).json({ error: error.message || 'Internal server error' });
  }
};

