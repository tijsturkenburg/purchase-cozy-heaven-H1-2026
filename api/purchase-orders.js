// Vercel Serverless Function for purchase orders API
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
        const { data: orders, error } = await supabase
          .from('purchase_orders')
          .select(`
            *,
            items:purchase_order_items(
              *,
              product:products(*)
            )
          `)
          .order('created_at', { ascending: false });
        
        if (error) throw error;
        res.json(orders || []);
        break;

      case 'POST':
        const { order_number, order_date, supplier, status, notes, items } = req.body;
        
        if (!order_number) {
          return res.status(400).json({ error: 'Order number is required' });
        }

        // Create order
        const { data: newOrder, error: createError } = await supabase
          .from('purchase_orders')
          .insert({ 
            order_number,
            order_date: order_date || new Date().toISOString().split('T')[0],
            supplier,
            status: status || 'draft',
            notes
          })
          .select()
          .single();
        
        if (createError) {
          console.error('Supabase insert error:', createError);
          return res.status(500).json({ 
            error: 'Database error', 
            message: createError.message
          });
        }

        // Add items if provided
        if (items && items.length > 0) {
          const orderItems = items.map(item => ({
            purchase_order_id: newOrder.id,
            product_id: item.product_id,
            colour_id: item.colour_id,
            colour_name: item.colour_name,
            quantity: item.quantity,
            fabric_meters: item.fabric_meters
          }));

          const { error: itemsError } = await supabase
            .from('purchase_order_items')
            .insert(orderItems);
          
          if (itemsError) {
            console.error('Error inserting order items:', itemsError);
            // Delete the order if items fail
            await supabase.from('purchase_orders').delete().eq('id', newOrder.id);
            return res.status(500).json({ 
              error: 'Failed to create order items', 
              message: itemsError.message
            });
          }
        }

        // Fetch complete order with items
        const { data: completeOrder, error: fetchError } = await supabase
          .from('purchase_orders')
          .select(`
            *,
            items:purchase_order_items(
              *,
              product:products(*)
            )
          `)
          .eq('id', newOrder.id)
          .single();
        
        if (fetchError) throw fetchError;
        res.status(201).json(completeOrder);
        break;

      case 'PUT':
        const { id, ...updateData } = req.body;
        if (!id) {
          return res.status(400).json({ error: 'Order ID is required' });
        }

        const { data: updatedOrder, error: updateError } = await supabase
          .from('purchase_orders')
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
        
        res.json(updatedOrder);
        break;

      case 'DELETE':
        const { id: deleteId } = req.query;
        if (!deleteId) {
          return res.status(400).json({ error: 'Order ID is required' });
        }

        const { error: deleteError } = await supabase
          .from('purchase_orders')
          .delete()
          .eq('id', deleteId);
        
        if (deleteError) {
          console.error('Supabase delete error:', deleteError);
          return res.status(500).json({ 
            error: 'Database error', 
            message: deleteError.message
          });
        }
        
        res.json({ message: 'Order deleted successfully' });
        break;

      default:
        res.status(405).json({ error: 'Method not allowed' });
    }
  } catch (error) {
    console.error('API Error:', error);
    res.status(500).json({ error: error.message || 'Internal server error' });
  }
};

