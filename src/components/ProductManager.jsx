import React, { useState, useEffect } from 'react';
import { Package, Plus, Edit2, Trash2, X, Save } from 'lucide-react';

export default function ProductManager({ onClose, onProductSelect }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    item_type: 'cover',
    category: 'individual',
    width: '',
    length: '',
    pillow_size: '',
    pillow_count: 1,
    sku: '',
    components: []
  });

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    try {
      const response = await fetch('/api/products');
      if (response.ok) {
        const data = await response.json();
        setProducts(data);
      }
    } catch (error) {
      console.error('Error loading products:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const productData = {
        ...formData,
        width: formData.width ? parseInt(formData.width) : null,
        length: formData.length ? parseInt(formData.length) : null,
        pillow_count: formData.pillow_count || 1,
        components: formData.components || []
      };

      const url = editingProduct 
        ? `/api/products?id=${editingProduct.id}`
        : '/api/products';
      
      const method = editingProduct ? 'PUT' : 'POST';
      const body = editingProduct ? { id: editingProduct.id, ...productData } : productData;

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
      });

      if (response.ok) {
        await loadProducts();
        resetForm();
      } else {
        const error = await response.json();
        alert(`Error: ${error.error || 'Failed to save product'}`);
      }
    } catch (error) {
      console.error('Error saving product:', error);
      alert('Failed to save product');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this product?')) return;
    
    try {
      const response = await fetch(`/api/products?id=${id}`, {
        method: 'DELETE'
      });

      if (response.ok) {
        await loadProducts();
      } else {
        alert('Failed to delete product');
      }
    } catch (error) {
      console.error('Error deleting product:', error);
      alert('Failed to delete product');
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      item_type: 'cover',
      category: 'individual',
      width: '',
      length: '',
      pillow_size: '',
      pillow_count: 1,
      sku: '',
      components: []
    });
    setEditingProduct(null);
    setShowAddForm(false);
  };

  const startEdit = (product) => {
    setEditingProduct(product);
    setFormData({
      name: product.name || '',
      item_type: product.item_type || 'cover',
      category: product.category || 'individual',
      width: product.width || '',
      length: product.length || '',
      pillow_size: product.pillow_size || '',
      pillow_count: product.pillow_count || 1,
      sku: product.sku || '',
      components: product.components || []
    });
    setShowAddForm(true);
  };

  if (loading) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg p-6">Loading products...</div>
      </div>
    );
  }

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50" onClick={onClose}>
        <div className="bg-white dark:bg-slate-800 rounded-lg shadow-xl max-w-5xl w-full mx-4 max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
          <div className="p-4 border-b border-slate-200 dark:border-slate-700 flex items-center justify-between">
            <h2 className="text-xl font-bold text-slate-800 dark:text-slate-100 flex items-center gap-2">
            <Package className="w-5 h-5 text-blue-600" />
            Product Manager
          </h2>
          <button onClick={onClose} className="text-slate-500 hover:text-slate-700">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-4">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-semibold text-slate-800">Products ({products.length})</h3>
            <button
              onClick={() => {
                resetForm();
                setShowAddForm(true);
              }}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 flex items-center gap-2"
            >
              <Plus className="w-4 h-4" />
              Add Product
            </button>
          </div>

          {showAddForm && (
            <div className="mb-6 p-4 bg-slate-50 rounded-lg border border-slate-200">
              <h4 className="font-semibold mb-3">{editingProduct ? 'Edit Product' : 'Add New Product'}</h4>
              <form onSubmit={handleSubmit} className="space-y-3">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Name *</label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-3 py-2 border border-slate-300 rounded text-sm"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">SKU</label>
                    <input
                      type="text"
                      value={formData.sku}
                      onChange={(e) => setFormData({ ...formData, sku: e.target.value })}
                      className="w-full px-3 py-2 border border-slate-300 rounded text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Type *</label>
                    <select
                      value={formData.item_type}
                      onChange={(e) => setFormData({ ...formData, item_type: e.target.value })}
                      className="w-full px-3 py-2 border border-slate-300 rounded text-sm"
                      required
                    >
                      <option value="cover">Duvet Cover</option>
                      <option value="pillowcase">Pillowcase</option>
                      <option value="sheet">Fitted Sheet</option>
                      <option value="set">Bedding Set</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Category *</label>
                    <select
                      value={formData.category}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                      className="w-full px-3 py-2 border border-slate-300 rounded text-sm"
                      required
                    >
                      <option value="individual">Individual</option>
                      <option value="sets">Sets</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Width (cm)</label>
                    <input
                      type="number"
                      value={formData.width}
                      onChange={(e) => setFormData({ ...formData, width: e.target.value })}
                      className="w-full px-3 py-2 border border-slate-300 rounded text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Length (cm)</label>
                    <input
                      type="number"
                      value={formData.length}
                      onChange={(e) => setFormData({ ...formData, length: e.target.value })}
                      className="w-full px-3 py-2 border border-slate-300 rounded text-sm"
                    />
                  </div>
                  {formData.item_type === 'set' && (
                    <>
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">Pillow Size (e.g., 40×80)</label>
                        <input
                          type="text"
                          value={formData.pillow_size}
                          onChange={(e) => setFormData({ ...formData, pillow_size: e.target.value })}
                          className="w-full px-3 py-2 border border-slate-300 rounded text-sm"
                          placeholder="40×80"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">Pillow Count</label>
                        <input
                          type="number"
                          value={formData.pillow_count}
                          onChange={(e) => setFormData({ ...formData, pillow_count: parseInt(e.target.value) || 1 })}
                          className="w-full px-3 py-2 border border-slate-300 rounded text-sm"
                          min="1"
                        />
                      </div>
                    </>
                  )}
                </div>
                <div className="flex gap-2">
                  <button
                    type="submit"
                    className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 flex items-center gap-2"
                  >
                    <Save className="w-4 h-4" />
                    {editingProduct ? 'Update' : 'Create'} Product
                  </button>
                  <button
                    type="button"
                    onClick={resetForm}
                    className="px-4 py-2 bg-slate-300 text-slate-700 rounded hover:bg-slate-400"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          )}

          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-slate-100 sticky top-0">
                <tr>
                  <th className="px-3 py-2 text-left">Name</th>
                  <th className="px-3 py-2 text-left">Type</th>
                  <th className="px-3 py-2 text-left">Category</th>
                  <th className="px-3 py-2 text-left">Size</th>
                  <th className="px-3 py-2 text-left">SKU</th>
                  <th className="px-3 py-2 text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product) => (
                  <tr key={product.id} className="border-b border-slate-200 hover:bg-slate-50">
                    <td className="px-3 py-2">{product.name}</td>
                    <td className="px-3 py-2">{product.item_type}</td>
                    <td className="px-3 py-2">{product.category}</td>
                    <td className="px-3 py-2">
                      {product.width && product.length 
                        ? `${product.width}×${product.length}`
                        : product.pillow_size || '-'}
                    </td>
                    <td className="px-3 py-2">{product.sku || '-'}</td>
                    <td className="px-3 py-2 text-right">
                      <div className="flex justify-end gap-2">
                        <button
                          onClick={() => startEdit(product)}
                          className="p-1 text-blue-600 hover:bg-blue-50 rounded"
                          title="Edit"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(product.id)}
                          className="p-1 text-red-600 hover:bg-red-50 rounded"
                          title="Delete"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
                {products.length === 0 && (
                  <tr>
                    <td colSpan="6" className="px-3 py-8 text-center text-slate-500">
                      No products found. Click "Add Product" to create one.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

