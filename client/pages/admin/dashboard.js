import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useAuth } from '../../contexts/AuthContext';
import { useLanguage } from '../../contexts/LanguageContext';
import Link from 'next/link';
import {
  FiUsers, FiPackage, FiShoppingCart, FiMessageSquare,
  FiTrendingUp, FiDollarSign, FiClock, FiCheckCircle,
  FiTruck, FiXCircle, FiRefreshCw, FiHome, FiChevronRight,
  FiShield, FiPlus, FiTrash2, FiEdit, FiPhone, FiMail,
  FiCalendar, FiFilter, FiX, FiImage, FiAlertCircle
} from 'react-icons/fi';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

export default function AdminDashboard() {
  const { user, token, isAdmin, loading: authLoading } = useAuth();
  const { language } = useLanguage();
  const router = useRouter();

  const [activeTab, setActiveTab] = useState('overview');
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  // Data
  const [userStats, setUserStats] = useState({});
  const [enquiryStats, setEnquiryStats] = useState({});
  const [orderStats, setOrderStats] = useState({});
  const [enquiries, setEnquiries] = useState([]);
  const [orders, setOrders] = useState([]);
  const [users, setUsers] = useState([]);
  const [products, setProducts] = useState([]);

  // Filters
  const [orderFilter, setOrderFilter] = useState({ status: 'all', payment: 'all', paymentStatus: 'all' });

  // Product form
  const [showProductForm, setShowProductForm] = useState(false);
  const [editProduct, setEditProduct] = useState(null);
  const [productForm, setProductForm] = useState({ name: '', nameHindi: '', description: '', category: 'fertilizers', price: '', brand: '', unit: 'kg', inStock: true, featured: false });
  const [productImage, setProductImage] = useState(null);
  const [formError, setFormError] = useState('');
  const [formLoading, setFormLoading] = useState(false);

  // Protect
  useEffect(() => { if (!authLoading && (!user || !isAdmin)) router.replace('/'); }, [user, isAdmin, authLoading]);
  useEffect(() => { if (token && isAdmin) fetchAll(); }, [token, isAdmin]);

  const headers = { 'Authorization': `Bearer ${token}` };

  const fetchAll = async () => {
    setRefreshing(true);
    try {
      const [uR, eR, eL, oR, oL, uL, pL] = await Promise.all([
        fetch(`${API_URL}/auth/stats`, { headers }),
        fetch(`${API_URL}/enquiries/stats`, { headers }),
        fetch(`${API_URL}/enquiries?limit=50`, { headers }),
        fetch(`${API_URL}/orders/stats`, { headers }),
        fetch(`${API_URL}/orders?limit=50`, { headers }),
        fetch(`${API_URL}/auth/users`, { headers }),
        fetch(`${API_URL}/products?limit=100`, { headers }),
      ]);
      if (uR.ok) setUserStats(await uR.json());
      if (eR.ok) setEnquiryStats(await eR.json());
      if (eL.ok) { const d = await eL.json(); setEnquiries(d.enquiries || []); }
      if (oR.ok) setOrderStats(await oR.json());
      if (oL.ok) { const d = await oL.json(); setOrders(d.orders || []); }
      if (uL.ok) setUsers(await uL.json());
      if (pL.ok) { const d = await pL.json(); setProducts(d.products || []); }
    } catch (e) { console.error(e); }
    finally { setLoading(false); setRefreshing(false); }
  };

  const updateEnquiryStatus = async (id, status) => {
    await fetch(`${API_URL}/enquiries/${id}/status`, { method: 'PUT', headers: { ...headers, 'Content-Type': 'application/json' }, body: JSON.stringify({ status }) });
    fetchAll();
  };

  const updateOrderStatus = async (id, data) => {
    await fetch(`${API_URL}/orders/${id}/status`, { method: 'PUT', headers: { ...headers, 'Content-Type': 'application/json' }, body: JSON.stringify(data) });
    fetchAll();
  };

  const deleteOrder = async (id) => {
    if (!confirm(language === 'hi' ? 'क्या आप सच में इस ऑर्डर को हटाना चाहते हैं?' : 'Are you sure you want to delete this order?')) return;
    await fetch(`${API_URL}/orders/${id}`, { method: 'DELETE', headers });
    fetchAll();
  };

  const deleteUser = async (id) => {
    if (!confirm(language === 'hi' ? 'इस यूज़र को हटाएं?' : 'Delete this user?')) return;
    // We need to implement user deletion on the backend or just deactivate
    // For now, we'll show an alert
    alert(language === 'hi' ? 'यूज़र डिलीट फीचर जल्द आ रहा है' : 'User deletion coming soon');
  };

  // Product CRUD
  const handleProductSubmit = async (e) => {
    e.preventDefault();
    setFormLoading(true); setFormError('');
    try {
      const fd = new FormData();
      Object.keys(productForm).forEach(k => { if (productForm[k] !== '' && productForm[k] !== undefined) fd.append(k, productForm[k]); });
      if (productImage) fd.append('image', productImage);

      const url = editProduct ? `${API_URL}/products/${editProduct._id}` : `${API_URL}/products`;
      const method = editProduct ? 'PUT' : 'POST';

      const res = await fetch(url, { method, headers: { 'Authorization': `Bearer ${token}` }, body: fd });
      if (!res.ok) { const d = await res.json(); throw new Error(d.message); }

      setShowProductForm(false); setEditProduct(null); setProductImage(null);
      setProductForm({ name: '', nameHindi: '', description: '', category: 'fertilizers', price: '', brand: '', unit: 'kg', inStock: true, featured: false });
      fetchAll();
    } catch (e) { setFormError(e.message); }
    finally { setFormLoading(false); }
  };

  const deleteProduct = async (id) => {
    if (!confirm(language === 'hi' ? 'इस प्रोडक्ट को हटाएं?' : 'Delete this product?')) return;
    await fetch(`${API_URL}/products/${id}`, { method: 'DELETE', headers });
    fetchAll();
  };

  const openEditProduct = (p) => {
    setEditProduct(p);
    setProductForm({ name: p.name || '', nameHindi: p.nameHindi || '', description: p.description || '', category: p.category || 'fertilizers', price: p.price || '', brand: p.brand || '', unit: p.unit || 'kg', inStock: p.inStock !== false, featured: !!p.featured });
    setShowProductForm(true);
  };

  if (authLoading || loading) return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="w-12 h-12 border-4 border-green-600 border-t-transparent rounded-full animate-spin"></div>
    </div>
  );
  if (!isAdmin) return null;

  const tabs = [
    { id: 'overview', label: language === 'hi' ? 'ओवरव्यू' : 'Overview', icon: <FiTrendingUp /> },
    { id: 'orders', label: language === 'hi' ? 'ऑर्डर' : 'Orders', icon: <FiShoppingCart />, badge: orderStats.pending },
    { id: 'products', label: language === 'hi' ? 'उत्पाद' : 'Products', icon: <FiPackage /> },
    { id: 'enquiries', label: language === 'hi' ? 'पूछताछ' : 'Enquiries', icon: <FiMessageSquare />, badge: enquiryStats.pending },
    { id: 'users', label: language === 'hi' ? 'उपयोगकर्ता' : 'Users', icon: <FiUsers /> },
  ];

  const SC = { Pending: 'bg-yellow-100 text-yellow-700', Confirmed: 'bg-blue-100 text-blue-700', Shipped: 'bg-purple-100 text-purple-700', Delivered: 'bg-green-100 text-green-700', Cancelled: 'bg-red-100 text-red-700' };
  const PC = { Pending: 'bg-yellow-100 text-yellow-700', Paid: 'bg-green-100 text-green-700', Failed: 'bg-red-100 text-red-700' };

  const filteredOrders = orders.filter(o => {
    if (orderFilter.status !== 'all' && o.orderStatus !== orderFilter.status) return false;
    if (orderFilter.payment !== 'all' && o.paymentMethod !== orderFilter.payment) return false;
    if (orderFilter.paymentStatus !== 'all' && o.paymentStatus !== orderFilter.paymentStatus) return false;
    return true;
  });

  return (
    <>
      <Head><title>Admin Dashboard — लक्ष्मी कृषि केंद्र</title></Head>
      <div className="min-h-screen bg-gray-50">

        {/* Top Bar */}
        <div className="bg-gradient-to-r from-gray-800 to-gray-900 text-white">
          <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Link href="/" className="text-gray-400 hover:text-white text-sm flex items-center gap-1"><FiHome size={13} /> {language === 'hi' ? 'साइट' : 'Site'}</Link>
              <FiChevronRight className="text-gray-600" size={12} />
              <span className="flex items-center gap-2 font-bold"><FiShield className="text-amber-400" /> {language === 'hi' ? 'एडमिन पैनल' : 'Admin Panel'}</span>
            </div>
            <button onClick={fetchAll} disabled={refreshing} className="flex items-center gap-1 px-3 py-1.5 bg-white/10 rounded-lg text-sm hover:bg-white/20 transition disabled:opacity-50">
              <FiRefreshCw size={13} className={refreshing ? 'animate-spin' : ''} /> {language === 'hi' ? 'ताज़ा करें' : 'Refresh'}
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white border-b sticky top-[64px] z-40">
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex gap-1 overflow-x-auto py-2">
              {tabs.map(tab => (
                <button key={tab.id} onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition ${activeTab === tab.id ? 'bg-green-100 text-green-700' : 'text-gray-600 hover:bg-gray-100'}`}
                >
                  {tab.icon} {tab.label}
                  {tab.badge > 0 && <span className="bg-red-500 text-white text-xs px-1.5 py-0.5 rounded-full">{tab.badge}</span>}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 py-6">

          {/* ========== OVERVIEW ========== */}
          {activeTab === 'overview' && (
            <div className="space-y-6">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  { label: language === 'hi' ? 'कुल ऑर्डर' : 'Total Orders', value: orderStats.total || 0, icon: <FiShoppingCart />, color: 'from-blue-500 to-blue-600' },
                  { label: language === 'hi' ? 'पेंडिंग ऑर्डर' : 'Pending Orders', value: orderStats.pending || 0, icon: <FiClock />, color: 'from-yellow-500 to-orange-500' },
                  { label: language === 'hi' ? 'कुल आय' : 'Revenue', value: `₹${orderStats.totalRevenue || 0}`, icon: <FiDollarSign />, color: 'from-green-500 to-emerald-600' },
                  { label: language === 'hi' ? 'कुल ग्राहक' : 'Customers', value: userStats.customers || 0, icon: <FiUsers />, color: 'from-purple-500 to-violet-600' },
                ].map((s, i) => (
                  <div key={i} className="bg-white rounded-2xl p-5 shadow-sm border hover:shadow-md transition">
                    <div className={`inline-flex w-10 h-10 rounded-xl bg-gradient-to-br ${s.color} text-white items-center justify-center mb-3`}>{s.icon}</div>
                    <div className="text-2xl font-bold text-gray-800">{s.value}</div>
                    <div className="text-sm text-gray-500">{s.label}</div>
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  { label: 'COD', value: orderStats.codOrders || 0, color: 'text-amber-600' },
                  { label: 'UPI', value: orderStats.upiOrders || 0, color: 'text-blue-600' },
                  { label: language === 'hi' ? 'भुगतान हुआ' : 'Paid', value: orderStats.paidOrders || 0, color: 'text-green-600' },
                  { label: language === 'hi' ? 'भुगतान बाकी' : 'Payment Pending', value: orderStats.pendingPayments || 0, color: 'text-yellow-600' },
                ].map((s, i) => (
                  <div key={i} className="bg-white rounded-xl p-4 border text-center">
                    <div className={`text-xl font-bold ${s.color}`}>{s.value}</div>
                    <div className="text-xs text-gray-500">{s.label}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ========== ORDERS ========== */}
          {activeTab === 'orders' && (
            <div>
              {/* Filters */}
              <div className="bg-white rounded-xl p-4 mb-4 border flex flex-wrap gap-3 items-center">
                <FiFilter className="text-gray-400" />
                <select value={orderFilter.status} onChange={e => setOrderFilter({ ...orderFilter, status: e.target.value })} className="px-3 py-1.5 border rounded-lg text-sm">
                  <option value="all">{language === 'hi' ? 'सभी स्टेटस' : 'All Status'}</option>
                  {['Pending', 'Confirmed', 'Shipped', 'Delivered', 'Cancelled'].map(s => <option key={s} value={s}>{s}</option>)}
                </select>
                <select value={orderFilter.payment} onChange={e => setOrderFilter({ ...orderFilter, payment: e.target.value })} className="px-3 py-1.5 border rounded-lg text-sm">
                  <option value="all">{language === 'hi' ? 'सभी भुगतान' : 'All Payment'}</option>
                  <option value="COD">COD</option><option value="UPI">UPI</option>
                </select>
                <select value={orderFilter.paymentStatus} onChange={e => setOrderFilter({ ...orderFilter, paymentStatus: e.target.value })} className="px-3 py-1.5 border rounded-lg text-sm">
                  <option value="all">{language === 'hi' ? 'भुगतान स्टेटस' : 'Payment Status'}</option>
                  <option value="Pending">Pending</option><option value="Paid">Paid</option><option value="Failed">Failed</option>
                </select>
                <span className="text-sm text-gray-500 ml-auto">{filteredOrders.length} {language === 'hi' ? 'ऑर्डर' : 'orders'}</span>
              </div>

              {filteredOrders.length === 0 ? (
                <div className="bg-white rounded-xl p-12 text-center border"><p className="text-gray-500">📦 {language === 'hi' ? 'कोई ऑर्डर नहीं' : 'No orders found'}</p></div>
              ) : (
                <div className="space-y-3">
                  {filteredOrders.map(order => (
                    <div key={order._id} className="bg-white rounded-xl border p-5 hover:shadow-md transition">
                      <div className="flex flex-wrap items-start justify-between gap-3 mb-3">
                        <div>
                          <p className="font-bold text-green-700 text-lg">{order.orderNumber}</p>
                          <p className="font-semibold text-gray-800">{order.customerName}</p>
                          <div className="flex items-center gap-3 text-xs text-gray-500 mt-1">
                            <span className="flex items-center gap-1"><FiPhone size={10} /> {order.customerPhone}</span>
                            <span className="flex items-center gap-1"><FiCalendar size={10} /> {new Date(order.createdAt).toLocaleDateString('hi-IN')}</span>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-xl font-bold text-gray-800">₹{order.totalAmount}</p>
                          <div className="flex gap-2 mt-1">
                            <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${SC[order.orderStatus]}`}>{order.orderStatus}</span>
                            <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${PC[order.paymentStatus]}`}>{order.paymentMethod} • {order.paymentStatus}</span>
                          </div>
                          {order.transactionId && <p className="text-xs text-gray-400 mt-1">TXN: {order.transactionId}</p>}
                        </div>
                      </div>

                      {/* Items */}
                      <div className="flex flex-wrap gap-2 mb-3">{order.items?.map((item, i) => (
                        <span key={i} className="bg-gray-50 px-2 py-1 rounded text-xs">{item.name} ×{item.quantity} (₹{item.price * item.quantity})</span>
                      ))}</div>

                      {/* Address */}
                      <p className="text-xs text-gray-500 mb-3">📍 {[order.deliveryAddress?.street, order.deliveryAddress?.village, order.deliveryAddress?.city, order.deliveryAddress?.pincode].filter(Boolean).join(', ')}</p>

                      {/* Actions */}
                      <div className="flex flex-wrap gap-2">
                        {order.orderStatus === 'Pending' && <button onClick={() => updateOrderStatus(order._id, { orderStatus: 'Confirmed' })} className="px-3 py-1.5 bg-blue-50 text-blue-600 text-xs font-semibold rounded-lg hover:bg-blue-100">✓ Confirm</button>}
                        {order.orderStatus === 'Confirmed' && <button onClick={() => updateOrderStatus(order._id, { orderStatus: 'Shipped' })} className="px-3 py-1.5 bg-purple-50 text-purple-600 text-xs font-semibold rounded-lg hover:bg-purple-100">🚚 Ship</button>}
                        {order.orderStatus === 'Shipped' && <button onClick={() => updateOrderStatus(order._id, { orderStatus: 'Delivered' })} className="px-3 py-1.5 bg-green-50 text-green-600 text-xs font-semibold rounded-lg hover:bg-green-100">✅ Delivered</button>}
                        {!['Cancelled', 'Delivered'].includes(order.orderStatus) && <button onClick={() => updateOrderStatus(order._id, { orderStatus: 'Cancelled' })} className="px-3 py-1.5 bg-red-50 text-red-500 text-xs font-semibold rounded-lg hover:bg-red-100">✕ Cancel</button>}
                        {order.paymentStatus === 'Pending' && order.paymentMethod === 'UPI' && <button onClick={() => updateOrderStatus(order._id, { paymentStatus: 'Paid' })} className="px-3 py-1.5 bg-green-50 text-green-600 text-xs font-semibold rounded-lg">💰 Mark Paid</button>}
                        <a href={`https://wa.me/91${order.customerPhone?.replace(/\D/g, '')}`} target="_blank" className="px-3 py-1.5 bg-green-600 text-white text-xs font-semibold rounded-lg hover:bg-green-700">WhatsApp</a>
                        <button onClick={() => deleteOrder(order._id)} className="px-3 py-1.5 text-red-400 hover:text-red-600 text-xs"><FiTrash2 size={14} /></button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* ========== PRODUCTS ========== */}
          {activeTab === 'products' && (
            <div>
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-bold text-gray-800">{language === 'hi' ? 'उत्पाद प्रबंधन' : 'Product Management'} ({products.length})</h2>
                <button onClick={() => { setEditProduct(null); setProductForm({ name: '', nameHindi: '', description: '', category: 'fertilizers', price: '', brand: '', unit: 'kg', inStock: true, featured: false }); setProductImage(null); setShowProductForm(true); }}
                  className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg font-semibold text-sm hover:bg-green-700 transition">
                  <FiPlus /> {language === 'hi' ? 'उत्पाद जोड़ें' : 'Add Product'}
                </button>
              </div>

              {/* Product Form Modal */}
              {showProductForm && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                  <div className="absolute inset-0 bg-black/50" onClick={() => setShowProductForm(false)} />
                  <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
                    <div className="p-6">
                      <div className="flex justify-between items-center mb-4">
                        <h3 className="text-lg font-bold">{editProduct ? (language === 'hi' ? 'उत्पाद संपादित करें' : 'Edit Product') : (language === 'hi' ? 'नया उत्पाद' : 'New Product')}</h3>
                        <button onClick={() => setShowProductForm(false)} className="text-gray-400 hover:text-gray-600"><FiX size={20} /></button>
                      </div>
                      {formError && <div className="mb-4 p-3 bg-red-50 text-red-700 text-sm rounded-lg flex items-center gap-2"><FiAlertCircle /> {formError}</div>}
                      <form onSubmit={handleProductSubmit} className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                          <div><label className="text-sm font-medium text-gray-700">{language === 'hi' ? 'नाम (English)' : 'Name'} *</label>
                            <input required type="text" value={productForm.name} onChange={e => setProductForm({ ...productForm, name: e.target.value })} className="mt-1 w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 outline-none text-sm" />
                          </div>
                          <div><label className="text-sm font-medium text-gray-700">{language === 'hi' ? 'नाम (हिंदी)' : 'Name Hindi'}</label>
                            <input type="text" value={productForm.nameHindi} onChange={e => setProductForm({ ...productForm, nameHindi: e.target.value })} className="mt-1 w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 outline-none text-sm" />
                          </div>
                        </div>
                        <div><label className="text-sm font-medium text-gray-700">{language === 'hi' ? 'विवरण' : 'Description'} *</label>
                          <textarea required rows={3} value={productForm.description} onChange={e => setProductForm({ ...productForm, description: e.target.value })} className="mt-1 w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 outline-none text-sm resize-none" />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div><label className="text-sm font-medium text-gray-700">{language === 'hi' ? 'श्रेणी' : 'Category'} *</label>
                            <select value={productForm.category} onChange={e => setProductForm({ ...productForm, category: e.target.value })} className="mt-1 w-full px-3 py-2 border rounded-lg text-sm">
                              <option value="fertilizers">{language === 'hi' ? 'खाद / रसायन' : 'Fertilizer / Chemical'}</option>
                              <option value="hardware">{language === 'hi' ? 'हार्डवेयर' : 'Hardware Items'}</option>
                              <option value="seeds">{language === 'hi' ? 'बीज' : 'Seeds'}</option>
                              <option value="pesticides">{language === 'hi' ? 'कीटनाशक' : 'Pesticides'}</option>
                            </select>
                          </div>
                          <div><label className="text-sm font-medium text-gray-700">{language === 'hi' ? 'मूल्य (₹)' : 'Price (₹)'} *</label>
                            <input required type="number" value={productForm.price} onChange={e => setProductForm({ ...productForm, price: e.target.value })} className="mt-1 w-full px-3 py-2 border rounded-lg text-sm" />
                          </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div><label className="text-sm font-medium text-gray-700">{language === 'hi' ? 'ब्रांड' : 'Brand'}</label>
                            <input type="text" value={productForm.brand} onChange={e => setProductForm({ ...productForm, brand: e.target.value })} className="mt-1 w-full px-3 py-2 border rounded-lg text-sm" />
                          </div>
                          <div><label className="text-sm font-medium text-gray-700">{language === 'hi' ? 'इकाई' : 'Unit'}</label>
                            <select value={productForm.unit} onChange={e => setProductForm({ ...productForm, unit: e.target.value })} className="mt-1 w-full px-3 py-2 border rounded-lg text-sm">
                              {['kg', 'g', 'litre', 'ml', 'packet', 'piece'].map(u => <option key={u} value={u}>{u}</option>)}
                            </select>
                          </div>
                        </div>
                        <div><label className="text-sm font-medium text-gray-700 flex items-center gap-2"><FiImage /> {language === 'hi' ? 'तस्वीर' : 'Image'}</label>
                          <input type="file" accept="image/*" onChange={e => setProductImage(e.target.files[0])} className="mt-1 w-full text-sm" />
                        </div>
                        <div className="flex gap-4">
                          <label className="flex items-center gap-2 text-sm"><input type="checkbox" checked={productForm.inStock} onChange={e => setProductForm({ ...productForm, inStock: e.target.checked })} className="w-4 h-4 text-green-600 rounded" /> {language === 'hi' ? 'स्टॉक में' : 'In Stock'}</label>
                          <label className="flex items-center gap-2 text-sm"><input type="checkbox" checked={productForm.featured} onChange={e => setProductForm({ ...productForm, featured: e.target.checked })} className="w-4 h-4 text-green-600 rounded" /> {language === 'hi' ? 'फीचर्ड' : 'Featured'}</label>
                        </div>
                        <button type="submit" disabled={formLoading} className="w-full py-3 bg-green-600 text-white rounded-xl font-semibold hover:bg-green-700 disabled:opacity-50 transition flex items-center justify-center gap-2">
                          {formLoading ? <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : (editProduct ? (language === 'hi' ? '✅ अपडेट करें' : '✅ Update') : (language === 'hi' ? '✅ जोड़ें' : '✅ Add Product'))}
                        </button>
                      </form>
                    </div>
                  </div>
                </div>
              )}

              {/* Product List */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {products.map(p => (
                  <div key={p._id} className="bg-white rounded-xl border overflow-hidden hover:shadow-md transition">
                    <div className="h-40 bg-gray-100 flex items-center justify-center">
                      {p.image?.startsWith('http') ? <img src={p.image} alt={p.name} className="w-full h-full object-cover" /> : <span className="text-4xl">📦</span>}
                    </div>
                    <div className="p-4">
                      <h3 className="font-semibold text-gray-800 truncate">{p.name}</h3>
                      <p className="text-sm text-gray-500">{p.nameHindi}</p>
                      <div className="flex items-center justify-between mt-2">
                        <span className="font-bold text-green-600 text-lg">₹{p.price || '—'}</span>
                        <span className={`text-xs px-2 py-0.5 rounded-full font-semibold ${p.inStock ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>{p.inStock ? (language === 'hi' ? 'उपलब्ध' : 'In Stock') : (language === 'hi' ? 'अनुपलब्ध' : 'Out of Stock')}</span>
                      </div>
                      <p className="text-xs text-gray-400 mt-1">{p.category} • {p.brand || '—'}</p>
                      <div className="flex gap-2 mt-3">
                        <button onClick={() => openEditProduct(p)} className="flex-1 py-2 text-xs font-semibold bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 flex items-center justify-center gap-1"><FiEdit size={12} /> {language === 'hi' ? 'संपादित' : 'Edit'}</button>
                        <button onClick={() => deleteProduct(p._id)} className="py-2 px-3 text-xs text-red-400 hover:text-red-600 rounded-lg hover:bg-red-50"><FiTrash2 size={14} /></button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ========== ENQUIRIES ========== */}
          {activeTab === 'enquiries' && (
            <div className="space-y-3">
              {enquiries.length === 0 ? (
                <div className="bg-white rounded-xl p-12 text-center border"><p className="text-gray-500">📭 {language === 'hi' ? 'कोई पूछताछ नहीं' : 'No enquiries'}</p></div>
              ) : enquiries.map(enq => (
                <div key={enq._id} className="bg-white rounded-xl border p-5 hover:shadow-sm transition">
                  <div className="flex flex-wrap justify-between gap-3 mb-2">
                    <div>
                      <h3 className="font-semibold text-gray-800">{enq.name}</h3>
                      <div className="flex items-center gap-3 text-xs text-gray-500 mt-1">
                        {enq.phone && <a href={`tel:${enq.phone}`} className="flex items-center gap-1 hover:text-green-600"><FiPhone size={10} /> {enq.phone}</a>}
                        {enq.email && <span className="flex items-center gap-1"><FiMail size={10} /> {enq.email}</span>}
                        <span className="flex items-center gap-1"><FiCalendar size={10} /> {new Date(enq.createdAt).toLocaleDateString('hi-IN')}</span>
                      </div>
                    </div>
                    <span className={`px-2 py-0.5 h-fit rounded-full text-xs font-semibold ${enq.status === 'pending' ? 'bg-yellow-100 text-yellow-700' : enq.status === 'contacted' ? 'bg-blue-100 text-blue-700' : 'bg-green-100 text-green-700'}`}>{enq.status}</span>
                  </div>
                  <p className="text-sm text-gray-600 mb-3">{enq.message}</p>
                  <div className="flex gap-2">
                    {enq.status === 'pending' && <button onClick={() => updateEnquiryStatus(enq._id, 'contacted')} className="px-3 py-1.5 bg-blue-50 text-blue-600 text-xs font-semibold rounded-lg">Contacted</button>}
                    {enq.status !== 'resolved' && <button onClick={() => updateEnquiryStatus(enq._id, 'resolved')} className="px-3 py-1.5 bg-green-50 text-green-600 text-xs font-semibold rounded-lg">✓ Resolved</button>}
                    {enq.phone && <a href={`https://wa.me/91${enq.phone.replace(/\D/g, '')}`} target="_blank" className="px-3 py-1.5 bg-green-600 text-white text-xs font-semibold rounded-lg">WhatsApp</a>}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* ========== USERS ========== */}
          {activeTab === 'users' && (
            <div>
              <h2 className="text-lg font-bold text-gray-800 mb-4">{language === 'hi' ? 'सभी उपयोगकर्ता' : 'All Users'} ({users.length})</h2>
              <div className="bg-white rounded-xl border overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="text-left px-4 py-3 font-semibold text-gray-600">{language === 'hi' ? 'नाम' : 'Name'}</th>
                        <th className="text-left px-4 py-3 font-semibold text-gray-600">{language === 'hi' ? 'ईमेल' : 'Email'}</th>
                        <th className="text-left px-4 py-3 font-semibold text-gray-600">{language === 'hi' ? 'फोन' : 'Phone'}</th>
                        <th className="text-left px-4 py-3 font-semibold text-gray-600">{language === 'hi' ? 'रोल' : 'Role'}</th>
                        <th className="text-left px-4 py-3 font-semibold text-gray-600">{language === 'hi' ? 'शामिल' : 'Joined'}</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y">
                      {users.map(u => (
                        <tr key={u._id} className="hover:bg-gray-50">
                          <td className="px-4 py-3 font-medium">{u.name}</td>
                          <td className="px-4 py-3 text-gray-600">{u.email}</td>
                          <td className="px-4 py-3">{u.phone || '—'}</td>
                          <td className="px-4 py-3"><span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${u.role === 'admin' ? 'bg-amber-100 text-amber-700' : 'bg-gray-100 text-gray-600'}`}>{u.role}</span></td>
                          <td className="px-4 py-3 text-gray-500">{new Date(u.createdAt).toLocaleDateString('hi-IN')}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

        </div>
      </div>
    </>
  );
}