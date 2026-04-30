/* eslint-disable @next/next/no-img-element */
import { useCallback, useEffect, useMemo, useState } from 'react';
import Head from 'next/head';
import AdminLayout from '@/components/Admin/AdminLayout';
import { useAuth } from '@/contexts/AuthContext';
import { API_URL } from '@/lib/api';
import { FiAlertCircle, FiCheck, FiEdit2, FiEye, FiFilter, FiLoader, FiPackage, FiPlus, FiSearch, FiTrash2, FiX } from 'react-icons/fi';

const categories = [
  ['all', 'All categories'],
  ['seeds', 'Seeds'],
  ['fertilizers', 'Fertilizers'],
  ['pesticides', 'Pesticides'],
  ['hardware', 'Hardware'],
  ['tools', 'Tools'],
  ['irrigation', 'Irrigation']
];
const units = ['kg', 'g', 'litre', 'ml', 'packet', 'piece'];
const emptyForm = {
  name: '', nameHindi: '', description: '', descriptionHindi: '', category: 'seeds', brand: '',
  price: '', stockQuantity: '0', unit: 'packet', imageFile: null, imagePreview: '', existingImage: '', featured: false
};

const labelForCategory = value => categories.find(item => item[0] === value)?.[1] || value;
const formatPrice = value => new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(Number(value) || 0);
const stockState = product => {
  const stock = Number(product.stockQuantity || 0);
  if (!product.inStock || stock <= 0) return ['Out of stock', 'bg-red-500/15 text-red-200 border-red-500/20'];
  if (stock <= 10) return ['Low stock', 'bg-amber-500/15 text-amber-200 border-amber-500/20'];
  return ['Active', 'bg-emerald-500/15 text-emerald-200 border-emerald-500/20'];
};
const normalizeError = (error, fallback) => {
  if (error instanceof TypeError && /fetch/i.test(error.message)) return 'Cannot reach the backend server. Start the API and try again.';
  return error?.message || fallback;
};
const revokePreviewUrl = value => {
  if (value && String(value).startsWith('blob:')) {
    URL.revokeObjectURL(value);
  }
};

export default function AdminProductsPage() {
  const { token } = useAuth();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('all');
  const [formOpen, setFormOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [form, setForm] = useState(emptyForm);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const fetchProducts = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      const response = await fetch(`${API_URL}/products?limit=200`);
      if (!response.ok) throw new Error('Failed to load products');
      const data = await response.json();
      setProducts(data.products || []);
    } catch (err) {
      setError(normalizeError(err, 'Failed to load products'));
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchProducts(); }, [fetchProducts]);

  const filteredProducts = useMemo(() => {
    const query = search.trim().toLowerCase();
    return products.filter(product => {
      const categoryMatch = category === 'all' || product.category === category;
      if (!categoryMatch) return false;
      if (!query) return true;
      return [product.name, product.nameHindi, product.description, product.brand, product.category]
        .filter(Boolean)
        .some(value => String(value).toLowerCase().includes(query));
    });
  }, [products, search, category]);

  const openCreate = () => {
    revokePreviewUrl(form.imagePreview);
    setEditingId(null);
    setForm(emptyForm);
    setError('');
    setSuccess('');
    setFormOpen(true);
  };

  const openEdit = product => {
    setEditingId(product._id);
    setForm({
      name: product.name || '',
      nameHindi: product.nameHindi || '',
      description: product.description || '',
      descriptionHindi: product.descriptionHindi || '',
      category: product.category || 'seeds',
      brand: product.brand || '',
      price: product.price != null ? String(product.price) : '',
      stockQuantity: String(product.stockQuantity ?? 0),
      unit: product.unit || 'packet',
      imageFile: null,
      imagePreview: product.image || '',
      existingImage: product.image || '',
      featured: Boolean(product.featured)
    });
    setError('');
    setSuccess('');
    setFormOpen(true);
  };

  const closeForm = () => {
    if (saving) return;
    revokePreviewUrl(form.imagePreview);
    setFormOpen(false);
    setEditingId(null);
    setForm(emptyForm);
  };

  useEffect(() => () => revokePreviewUrl(form.imagePreview), [form.imagePreview]);

  const handleChange = event => {
    const { name, value, type, checked, files } = event.target;
    if (type === 'file') {
      const file = files?.[0] || null;
      setForm(current => {
        revokePreviewUrl(current.imagePreview);
        return {
          ...current,
          imageFile: file,
          imagePreview: file ? URL.createObjectURL(file) : current.existingImage || ''
        };
      });
      return;
    }
    setForm(current => ({ ...current, [name]: type === 'checkbox' ? checked : value }));
  };

  const handleSubmit = async event => {
    event.preventDefault();
    if (!token) {
      setError('Admin session expired. Please log in again.');
      return;
    }

    setSaving(true);
    setError('');
    setSuccess('');
    const stockQuantity = Math.max(0, Number(form.stockQuantity) || 0);
    const payload = new FormData();
    [
      ['name', form.name.trim()],
      ['nameHindi', form.nameHindi.trim()],
      ['description', form.description.trim()],
      ['descriptionHindi', form.descriptionHindi.trim()],
      ['category', form.category],
      ['brand', form.brand.trim()],
      ['price', String(Number(form.price) || 0)],
      ['stockQuantity', String(stockQuantity)],
      ['unit', form.unit],
      ['featured', String(form.featured)],
      ['inStock', String(stockQuantity > 0)]
    ].forEach(([key, value]) => {
      if (value !== '') payload.append(key, value);
    });
    if (form.imageFile) {
      payload.append('image', form.imageFile);
    }

    try {
      const response = await fetch(editingId ? `${API_URL}/products/${editingId}` : `${API_URL}/products`, {
        method: editingId ? 'PUT' : 'POST',
        headers: { Authorization: `Bearer ${token}` },
        body: payload
      });
      const data = await response.json().catch(() => ({}));
      if (!response.ok) throw new Error(data.message || 'Could not save product');
      setSuccess(editingId ? 'Product updated successfully.' : 'Product created successfully.');
      closeForm();
      await fetchProducts();
    } catch (err) {
      setError(normalizeError(err, 'Could not save product'));
    } finally {
      setSaving(false);
    }
  };

  const confirmDelete = async () => {
    if (!deleteTarget || !token) return;
    setSaving(true);
    setError('');
    setSuccess('');
    try {
      const response = await fetch(`${API_URL}/products/${deleteTarget._id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await response.json().catch(() => ({}));
      if (!response.ok) throw new Error(data.message || 'Could not delete product');
      setDeleteTarget(null);
      setSuccess('Product deleted successfully.');
      await fetchProducts();
    } catch (err) {
      setError(normalizeError(err, 'Could not delete product'));
    } finally {
      setSaving(false);
    }
  };

  return (
    <AdminLayout>
      <Head><title>Admin Products | Laxmi Krashi Kendra</title></Head>
      <div className="space-y-6">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.22em] text-emerald-300">Catalog manager</p>
            <h1 className="mt-2 text-3xl font-semibold text-white">Manage products</h1>
            <p className="mt-2 max-w-2xl text-sm text-slate-400">Add items, update prices, and control stock from one place.</p>
          </div>
          <button type="button" onClick={openCreate} className="inline-flex items-center justify-center gap-2 rounded-2xl bg-emerald-500 px-5 py-3 text-sm font-semibold text-white transition hover:bg-emerald-600">
            <FiPlus size={18} /> Add product
          </button>
        </div>

        {error ? <div className="flex items-start gap-3 rounded-2xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-100"><FiAlertCircle className="mt-0.5 shrink-0" /><span>{error}</span></div> : null}
        {success ? <div className="flex items-start gap-3 rounded-2xl border border-emerald-500/20 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-100"><FiCheck className="mt-0.5 shrink-0" /><span>{success}</span></div> : null}

        <div className="grid gap-4 sm:grid-cols-3">
          <div className="rounded-[1.75rem] border border-white/10 bg-white/5 p-5"><p className="text-sm text-slate-400">Total</p><p className="mt-3 text-3xl font-semibold text-white">{products.length}</p></div>
          <div className="rounded-[1.75rem] border border-white/10 bg-white/5 p-5"><p className="text-sm text-slate-400">In stock</p><p className="mt-3 text-3xl font-semibold text-white">{products.filter(item => Number(item.stockQuantity || 0) > 0 && item.inStock !== false).length}</p></div>
          <div className="rounded-[1.75rem] border border-white/10 bg-white/5 p-5"><p className="text-sm text-slate-400">Featured</p><p className="mt-3 text-3xl font-semibold text-white">{products.filter(item => item.featured).length}</p></div>
        </div>

        <section className="rounded-[1.75rem] border border-white/10 bg-white/5 p-5 backdrop-blur">
          <div className="grid gap-4 md:grid-cols-[1fr_260px]">
            <label className="relative block">
              <FiSearch className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" />
              <input type="text" value={search} onChange={event => setSearch(event.target.value)} placeholder="Search product name, Hindi name, description, or brand" className="w-full rounded-2xl border border-white/10 bg-slate-900/80 py-3 pl-11 pr-4 text-sm text-white outline-none placeholder:text-slate-500 focus:border-emerald-400" />
            </label>
            <label className="relative block">
              <FiFilter className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-slate-500" />
              <select value={category} onChange={event => setCategory(event.target.value)} className="w-full appearance-none rounded-2xl border border-white/10 bg-slate-900/80 px-4 py-3 text-sm text-white outline-none focus:border-emerald-400">
                {categories.map(([value, label]) => <option key={value} value={value}>{label}</option>)}
              </select>
            </label>
          </div>
        </section>

        <section className="overflow-hidden rounded-[1.75rem] border border-white/10 bg-white shadow-2xl shadow-black/10">
          {loading ? (
            <div className="flex items-center justify-center gap-3 px-6 py-20 text-slate-600"><FiLoader className="animate-spin" /><span>Loading products...</span></div>
          ) : filteredProducts.length === 0 ? (
            <div className="px-6 py-20 text-center text-slate-600"><div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600"><FiPackage size={28} /></div><h2 className="mt-5 text-xl font-semibold text-slate-900">No products found</h2><p className="mt-2 text-sm text-slate-500">Try a different filter or add your first item.</p></div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-slate-200">
                <thead className="bg-slate-50"><tr className="text-left text-xs font-semibold uppercase tracking-[0.18em] text-slate-500"><th className="px-6 py-4">Product</th><th className="px-6 py-4">Category</th><th className="px-6 py-4">Price</th><th className="px-6 py-4">Stock</th><th className="px-6 py-4">Status</th><th className="px-6 py-4">Actions</th></tr></thead>
                <tbody className="divide-y divide-slate-200 bg-white">
                  {filteredProducts.map(product => {
                    const stock = Number(product.stockQuantity || 0);
                    const [statusLabel, statusTone] = stockState(product);
                    return (
                      <tr key={product._id} className="transition hover:bg-slate-50">
                        <td className="px-6 py-5"><div className="flex items-start gap-4"><div className="flex h-12 w-12 items-center justify-center overflow-hidden rounded-2xl bg-emerald-50 text-emerald-600">{product.image ? <img src={product.image} alt={product.name} className="h-full w-full object-cover" /> : <FiPackage size={20} />}</div><div><p className="font-semibold text-slate-900">{product.name}</p><p className="mt-1 text-sm text-slate-500">{product.nameHindi || 'No Hindi name'}</p></div></div></td>
                        <td className="px-6 py-5"><span className="inline-flex rounded-full bg-slate-100 px-3 py-1 text-sm font-medium text-slate-700">{labelForCategory(product.category)}</span></td>
                        <td className="px-6 py-5 font-semibold text-slate-900">{formatPrice(product.price)}</td>
                        <td className="px-6 py-5 text-sm text-slate-600">{stock} {product.unit || ''}</td>
                        <td className="px-6 py-5"><span className={`inline-flex rounded-full border px-3 py-1 text-sm font-medium ${statusTone}`}>{statusLabel}</span></td>
                        <td className="px-6 py-5"><div className="flex items-center gap-2">{product.image ? <a href={product.image} target="_blank" rel="noreferrer" className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 text-blue-600 transition hover:bg-blue-50" aria-label={`View ${product.name}`}><FiEye size={18} /></a> : null}<button type="button" onClick={() => openEdit(product)} className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 text-emerald-600 transition hover:bg-emerald-50" aria-label={`Edit ${product.name}`}><FiEdit2 size={18} /></button><button type="button" onClick={() => setDeleteTarget(product)} className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 text-red-600 transition hover:bg-red-50" aria-label={`Delete ${product.name}`}><FiTrash2 size={18} /></button></div></td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </section>
      </div>

      {formOpen ? (
        <div className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-slate-950/80 p-4 sm:p-8">
          <div className="w-full max-w-4xl rounded-[2rem] border border-white/10 bg-slate-900 p-6 shadow-2xl shadow-black/40">
            <div className="flex items-start justify-between gap-4"><div><p className="text-xs font-black uppercase tracking-[0.22em] text-emerald-300">{editingId ? 'Update product' : 'Create product'}</p><h2 className="mt-2 text-2xl font-semibold text-white">{editingId ? 'Edit product' : 'Add a new product'}</h2></div><button type="button" onClick={closeForm} className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-slate-300 transition hover:bg-white/10"><FiX size={18} /></button></div>
            <form onSubmit={handleSubmit} className="mt-6 space-y-5">
              <div className="grid gap-4 md:grid-cols-2"><label className="grid gap-2"><span className="text-sm font-medium text-slate-300">Product name</span><input name="name" value={form.name} onChange={handleChange} required className="rounded-2xl border border-white/10 bg-slate-950 px-4 py-3 text-sm text-white outline-none focus:border-emerald-400" /></label><label className="grid gap-2"><span className="text-sm font-medium text-slate-300">Hindi name</span><input name="nameHindi" value={form.nameHindi} onChange={handleChange} className="rounded-2xl border border-white/10 bg-slate-950 px-4 py-3 text-sm text-white outline-none focus:border-emerald-400" /></label></div>
              <div className="grid gap-4 md:grid-cols-2"><label className="grid gap-2"><span className="text-sm font-medium text-slate-300">Description</span><textarea name="description" value={form.description} onChange={handleChange} required rows="4" className="rounded-2xl border border-white/10 bg-slate-950 px-4 py-3 text-sm text-white outline-none focus:border-emerald-400" /></label><label className="grid gap-2"><span className="text-sm font-medium text-slate-300">Hindi description</span><textarea name="descriptionHindi" value={form.descriptionHindi} onChange={handleChange} rows="4" className="rounded-2xl border border-white/10 bg-slate-950 px-4 py-3 text-sm text-white outline-none focus:border-emerald-400" /></label></div>
              <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4"><label className="grid gap-2"><span className="text-sm font-medium text-slate-300">Category</span><select name="category" value={form.category} onChange={handleChange} className="rounded-2xl border border-white/10 bg-slate-950 px-4 py-3 text-sm text-white outline-none focus:border-emerald-400">{categories.filter(item => item[0] !== 'all').map(([value, label]) => <option key={value} value={value}>{label}</option>)}</select></label><label className="grid gap-2"><span className="text-sm font-medium text-slate-300">Brand</span><input name="brand" value={form.brand} onChange={handleChange} className="rounded-2xl border border-white/10 bg-slate-950 px-4 py-3 text-sm text-white outline-none focus:border-emerald-400" /></label><label className="grid gap-2"><span className="text-sm font-medium text-slate-300">Price</span><input name="price" type="number" min="0" value={form.price} onChange={handleChange} required className="rounded-2xl border border-white/10 bg-slate-950 px-4 py-3 text-sm text-white outline-none focus:border-emerald-400" /></label><label className="grid gap-2"><span className="text-sm font-medium text-slate-300">Stock quantity</span><input name="stockQuantity" type="number" min="0" value={form.stockQuantity} onChange={handleChange} className="rounded-2xl border border-white/10 bg-slate-950 px-4 py-3 text-sm text-white outline-none focus:border-emerald-400" /></label></div>
              <div className="grid gap-4 md:grid-cols-[180px_1fr]">
                <label className="grid gap-2">
                  <span className="text-sm font-medium text-slate-300">Unit</span>
                  <select name="unit" value={form.unit} onChange={handleChange} className="rounded-2xl border border-white/10 bg-slate-950 px-4 py-3 text-sm text-white outline-none focus:border-emerald-400">{units.map(value => <option key={value} value={value}>{value}</option>)}</select>
                </label>
                <div className="grid gap-2">
                  <span className="text-sm font-medium text-slate-300">Product image</span>
                  <label className="flex cursor-pointer items-center justify-center rounded-2xl border border-dashed border-white/15 bg-slate-950 px-4 py-4 text-sm text-slate-300 transition hover:border-emerald-400/60 hover:bg-slate-900">
                    <input name="imageFile" type="file" accept="image/png,image/jpeg,image/webp" onChange={handleChange} className="hidden" />
                    {form.imageFile ? `Selected: ${form.imageFile.name}` : editingId ? 'Upload a new image to replace the current one' : 'Choose a product image'}
                  </label>
                  <p className="text-xs text-slate-500">Accepted: JPG, PNG, WEBP. Leave unchanged while editing to keep the current image.</p>
                </div>
              </div>
              {form.imagePreview ? (
                <div className="rounded-2xl border border-white/10 bg-slate-950/80 p-4">
                  <p className="mb-3 text-sm font-medium text-slate-300">Image preview</p>
                  <img src={form.imagePreview} alt="Selected product preview" className="h-40 w-40 rounded-2xl object-cover" />
                </div>
              ) : null}
              <label className="flex items-center gap-3 rounded-2xl border border-white/10 bg-slate-950 px-4 py-3 text-sm text-white"><input name="featured" type="checkbox" checked={form.featured} onChange={handleChange} className="h-4 w-4 rounded border-white/20 bg-slate-900 text-emerald-500 focus:ring-emerald-400" /> Mark as featured on the storefront</label>
              <div className="flex flex-col gap-3 border-t border-white/10 pt-5 sm:flex-row sm:justify-end"><button type="button" onClick={closeForm} className="rounded-2xl border border-white/10 px-5 py-3 text-sm font-semibold text-slate-300 transition hover:bg-white/5">Cancel</button><button type="submit" disabled={saving} className="inline-flex items-center justify-center gap-2 rounded-2xl bg-emerald-500 px-5 py-3 text-sm font-semibold text-white transition hover:bg-emerald-600 disabled:cursor-not-allowed disabled:opacity-70">{saving ? <FiLoader className="animate-spin" /> : <FiCheck size={16} />}{editingId ? 'Save changes' : 'Create product'}</button></div>
            </form>
          </div>
        </div>
      ) : null}

      {deleteTarget ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 p-4">
          <div className="w-full max-w-md rounded-[2rem] border border-white/10 bg-slate-900 p-6 shadow-2xl shadow-black/40"><div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-red-500/10 text-red-300"><FiTrash2 size={24} /></div><h2 className="mt-5 text-center text-xl font-semibold text-white">Delete product?</h2><p className="mt-3 text-center text-sm leading-7 text-slate-400">This will permanently remove <span className="font-semibold text-white">{deleteTarget.name}</span> from the catalog.</p><div className="mt-6 grid gap-3 sm:grid-cols-2"><button type="button" onClick={() => setDeleteTarget(null)} className="rounded-2xl border border-white/10 px-4 py-3 text-sm font-semibold text-slate-300 transition hover:bg-white/5">Cancel</button><button type="button" onClick={confirmDelete} disabled={saving} className="inline-flex items-center justify-center gap-2 rounded-2xl bg-red-500 px-4 py-3 text-sm font-semibold text-white transition hover:bg-red-600 disabled:cursor-not-allowed disabled:opacity-70">{saving ? <FiLoader className="animate-spin" /> : <FiTrash2 size={16} />}Delete</button></div></div>
        </div>
      ) : null}
    </AdminLayout>
  );
}
