import { useCallback, useEffect, useMemo, useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import {
  FiArrowRight,
  FiBox,
  FiCheckCircle,
  FiClock,
  FiDollarSign,
  FiMessageSquare,
  FiRefreshCw,
  FiShoppingBag,
  FiUsers,
} from 'react-icons/fi';
import AdminLayout from '@/components/Admin/AdminLayout';
import { useAuth } from '@/contexts/AuthContext';
import { API_URL } from '@/lib/api';

const currencyFormatter = new Intl.NumberFormat('en-IN', {
  style: 'currency',
  currency: 'INR',
  maximumFractionDigits: 0,
});

const dateFormatter = new Intl.DateTimeFormat('en-IN', {
  day: 'numeric',
  month: 'short',
  year: 'numeric',
});

function StatCard({ label, value, icon, tone = 'emerald', hint }) {
  const tones = {
    emerald: 'from-emerald-500/20 to-emerald-400/5 text-emerald-300',
    cyan: 'from-cyan-500/20 to-cyan-400/5 text-cyan-300',
    amber: 'from-amber-500/20 to-amber-400/5 text-amber-300',
    rose: 'from-rose-500/20 to-rose-400/5 text-rose-300',
  };

  return (
    <div className="rounded-[2rem] border border-white/10 bg-slate-900 p-6 shadow-xl shadow-black/20">
      <div className={`mb-4 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br ${tones[tone]}`}>
        {icon}
      </div>
      <p className="text-sm font-semibold text-slate-400">{label}</p>
      <p className="mt-3 text-3xl font-black text-white">{value}</p>
      {hint ? <p className="mt-2 text-sm text-slate-500">{hint}</p> : null}
    </div>
  );
}

function StatusPill({ children, tone = 'slate' }) {
  const tones = {
    slate: 'bg-slate-800 text-slate-300',
    amber: 'bg-amber-500/15 text-amber-300',
    blue: 'bg-sky-500/15 text-sky-300',
    emerald: 'bg-emerald-500/15 text-emerald-300',
    rose: 'bg-rose-500/15 text-rose-300',
  };

  return <span className={`rounded-full px-3 py-1 text-xs font-bold uppercase tracking-[0.14em] ${tones[tone]}`}>{children}</span>;
}

function orderTone(status) {
  switch (status) {
    case 'Pending':
      return 'amber';
    case 'Confirmed':
      return 'blue';
    case 'Delivered':
      return 'emerald';
    case 'Cancelled':
      return 'rose';
    default:
      return 'slate';
  }
}

function enquiryTone(status) {
  switch (status) {
    case 'pending':
      return 'amber';
    case 'contacted':
      return 'blue';
    case 'resolved':
      return 'emerald';
    default:
      return 'slate';
  }
}

export default function AdminDashboardPage() {
  const { user, token, logout } = useAuth();
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState('');
  const [stats, setStats] = useState({
    userStats: {},
    orderStats: {},
    enquiryStats: {},
    productStats: {},
  });
  const [orders, setOrders] = useState([]);
  const [enquiries, setEnquiries] = useState([]);
  const [products, setProducts] = useState([]);

  const headers = useMemo(
    () => ({
      Authorization: `Bearer ${token}`,
    }),
    [token]
  );

  const fetchJson = useCallback(
    async (path, options = {}) => {
      const response = await fetch(`${API_URL}${path}`, {
        ...options,
        headers: {
          ...headers,
          ...(options.headers || {}),
        },
      });

      const data = await response.json().catch(() => ({}));
      if (!response.ok) {
        if (response.status === 401 || response.status === 403) {
          logout();
        }
        throw new Error(data.message || `Request failed for ${path}`);
      }
      return data;
    },
    [headers, logout]
  );

  const loadDashboard = useCallback(async () => {
    if (!token) {
      return;
    }

    setRefreshing(true);
    setError('');

    try {
      const [
        userStats,
        orderStats,
        enquiryStats,
        productStats,
        ordersData,
        enquiriesData,
        productsData,
      ] = await Promise.all([
        fetchJson('/auth/stats'),
        fetchJson('/orders/stats'),
        fetchJson('/enquiries/stats'),
        fetchJson('/products/admin/stats'),
        fetchJson('/orders?limit=5'),
        fetchJson('/enquiries?limit=5'),
        fetchJson('/products?limit=6'),
      ]);

      setStats({ userStats, orderStats, enquiryStats, productStats });
      setOrders(ordersData.orders || []);
      setEnquiries(enquiriesData.enquiries || []);
      setProducts(productsData.products || []);
    } catch (loadError) {
      setError(loadError.message || 'Unable to load admin dashboard.');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, [fetchJson, token]);

  useEffect(() => {
    loadDashboard();
  }, [loadDashboard]);

  const updateOrderStatus = async (orderId, payload) => {
    try {
      await fetchJson(`/orders/${orderId}/status`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });
      loadDashboard();
    } catch (actionError) {
      setError(actionError.message || 'Unable to update order.');
    }
  };

  const updateEnquiryStatus = async (enquiryId, status) => {
    try {
      await fetchJson(`/enquiries/${enquiryId}/status`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status }),
      });
      loadDashboard();
    } catch (actionError) {
      setError(actionError.message || 'Unable to update enquiry.');
    }
  };

  return (
    <AdminLayout>
      <Head>
        <title>Admin Dashboard | Laxmi Krashi Kendra</title>
      </Head>

      <div className="space-y-8">
        <section className="overflow-hidden rounded-[2.25rem] border border-white/10 bg-[radial-gradient(circle_at_top_left,_rgba(16,185,129,0.18),_transparent_32%),linear-gradient(135deg,_rgba(15,23,42,0.96),_rgba(2,6,23,0.98))] p-8 shadow-2xl shadow-black/30">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-3xl">
              <p className="text-xs font-black uppercase tracking-[0.24em] text-emerald-300">Admin Dashboard</p>
              <h1 className="mt-4 text-4xl font-black tracking-tight text-white sm:text-5xl">
                Farm operations, orders, and enquiries in one place.
              </h1>
              <p className="mt-4 max-w-2xl text-base leading-relaxed text-slate-300 sm:text-lg">
                Keep an eye on incoming orders, product inventory, and customer follow-ups without hopping between screens.
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">
              <div className="rounded-[1.5rem] border border-white/10 bg-white/5 px-5 py-4">
                <p className="text-xs font-black uppercase tracking-[0.18em] text-slate-400">Signed in</p>
                <p className="mt-2 text-lg font-semibold text-white">{user?.name || 'Admin'}</p>
                <p className="text-sm text-slate-400">{user?.email}</p>
              </div>

              <button
                type="button"
                onClick={loadDashboard}
                disabled={refreshing}
                className="inline-flex items-center justify-center gap-2 rounded-[1.5rem] bg-emerald-500 px-5 py-4 text-sm font-bold text-white transition hover:bg-emerald-600 disabled:cursor-not-allowed disabled:opacity-60"
              >
                <FiRefreshCw className={refreshing ? 'animate-spin' : ''} />
                {refreshing ? 'Refreshing...' : 'Refresh data'}
              </button>
            </div>
          </div>
        </section>

        {error ? (
          <div className="rounded-[1.75rem] border border-rose-500/20 bg-rose-500/10 px-5 py-4 text-sm font-medium text-rose-200">
            {error}
          </div>
        ) : null}

        <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          <StatCard
            label="Total orders"
            value={stats.orderStats.total || 0}
            icon={<FiShoppingBag size={22} />}
            tone="emerald"
            hint={`${stats.orderStats.pending || 0} pending`}
          />
          <StatCard
            label="Paid revenue"
            value={currencyFormatter.format(stats.orderStats.totalRevenue || 0)}
            icon={<FiDollarSign size={22} />}
            tone="cyan"
            hint={`${stats.orderStats.paidOrders || 0} paid orders`}
          />
          <StatCard
            label="Pending enquiries"
            value={stats.enquiryStats.pending || 0}
            icon={<FiMessageSquare size={22} />}
            tone="amber"
            hint={`${stats.enquiryStats.total || 0} total enquiries`}
          />
          <StatCard
            label="Products listed"
            value={stats.productStats.total || 0}
            icon={<FiBox size={22} />}
            tone="rose"
            hint={`${stats.productStats.featured || 0} featured`}
          />
        </section>

        <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          <StatCard label="Customers" value={stats.userStats.customers || 0} icon={<FiUsers size={22} />} tone="emerald" hint={`${stats.userStats.activeUsers || 0} active users`} />
          <StatCard label="Delivered orders" value={stats.orderStats.delivered || 0} icon={<FiCheckCircle size={22} />} tone="cyan" />
          <StatCard label="Payment pending" value={stats.orderStats.pendingPayments || 0} icon={<FiClock size={22} />} tone="amber" />
          <StatCard label="Out of stock" value={stats.productStats.outOfStock || 0} icon={<FiBox size={22} />} tone="rose" />
        </section>

        <section className="grid gap-6 xl:grid-cols-[1.15fr_0.85fr]">
          <div className="rounded-[2rem] border border-white/10 bg-slate-900 p-6 shadow-xl shadow-black/20">
            <div className="mb-6 flex items-center justify-between">
              <div>
                <p className="text-xs font-black uppercase tracking-[0.2em] text-emerald-300">Recent orders</p>
                <h2 className="mt-2 text-2xl font-bold text-white">Latest customer activity</h2>
              </div>
              <div className="flex items-center gap-3">
                <Link
                  href="/admin/orders"
                  className="inline-flex items-center gap-2 rounded-full bg-white/5 px-4 py-2 text-xs font-bold uppercase tracking-[0.14em] text-slate-300 transition hover:bg-white/10 hover:text-white"
                >
                  Open board
                  <FiArrowRight size={14} />
                </Link>
                <StatusPill tone="slate">{orders.length} loaded</StatusPill>
              </div>
            </div>

            <div className="space-y-4">
              {loading ? (
                <div className="rounded-[1.5rem] border border-white/10 bg-white/5 px-5 py-6 text-sm text-slate-300">Loading recent orders...</div>
              ) : orders.length === 0 ? (
                <div className="rounded-[1.5rem] border border-dashed border-white/10 px-5 py-6 text-sm text-slate-400">No orders have been placed yet.</div>
              ) : (
                orders.map((order) => (
                  <div key={order._id} className="rounded-[1.5rem] border border-white/10 bg-white/5 p-5">
                    <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                      <div>
                        <p className="text-sm font-bold text-emerald-300">{order.orderNumber}</p>
                        <p className="mt-2 text-lg font-semibold text-white">{order.customerName || 'Customer order'}</p>
                        <p className="mt-1 text-sm text-slate-400">
                          {order.customerPhone || 'No phone'} · {dateFormatter.format(new Date(order.createdAt))}
                        </p>
                      </div>

                      <div className="flex flex-wrap items-center gap-2">
                        <StatusPill tone={orderTone(order.orderStatus)}>{order.orderStatus}</StatusPill>
                        <StatusPill tone={order.paymentStatus === 'Paid' ? 'emerald' : 'amber'}>
                          {order.paymentMethod} {order.paymentStatus}
                        </StatusPill>
                      </div>
                    </div>

                    <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
                      <p className="text-sm text-slate-300">
                        Total: <span className="font-bold text-white">{currencyFormatter.format(order.totalAmount || 0)}</span>
                      </p>

                      <div className="flex flex-wrap gap-2">
                        {order.orderStatus === 'Pending' ? (
                          <button
                            type="button"
                            onClick={() => updateOrderStatus(order._id, { orderStatus: 'Confirmed' })}
                            className="rounded-full bg-sky-500/15 px-4 py-2 text-xs font-bold uppercase tracking-[0.14em] text-sky-300 transition hover:bg-sky-500/25"
                          >
                            Confirm
                          </button>
                        ) : null}

                        {order.orderStatus === 'Confirmed' ? (
                          <button
                            type="button"
                            onClick={() => updateOrderStatus(order._id, { orderStatus: 'Shipped' })}
                            className="rounded-full bg-violet-500/15 px-4 py-2 text-xs font-bold uppercase tracking-[0.14em] text-violet-300 transition hover:bg-violet-500/25"
                          >
                            Mark shipped
                          </button>
                        ) : null}

                        {order.orderStatus === 'Shipped' ? (
                          <button
                            type="button"
                            onClick={() => updateOrderStatus(order._id, { orderStatus: 'Delivered' })}
                            className="rounded-full bg-emerald-500/15 px-4 py-2 text-xs font-bold uppercase tracking-[0.14em] text-emerald-300 transition hover:bg-emerald-500/25"
                          >
                            Deliver
                          </button>
                        ) : null}
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          <div className="space-y-6">
            <div className="rounded-[2rem] border border-white/10 bg-slate-900 p-6 shadow-xl shadow-black/20">
              <div className="mb-6 flex items-center justify-between">
                <div>
                  <p className="text-xs font-black uppercase tracking-[0.2em] text-emerald-300">Enquiries</p>
                  <h2 className="mt-2 text-2xl font-bold text-white">Quick follow-up</h2>
                </div>
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 rounded-full bg-white/5 px-4 py-2 text-xs font-bold uppercase tracking-[0.14em] text-slate-300 transition hover:bg-white/10 hover:text-white"
                >
                  Open site
                  <FiArrowRight size={14} />
                </Link>
              </div>

              <div className="space-y-4">
                {loading ? (
                  <div className="rounded-[1.5rem] border border-white/10 bg-white/5 px-5 py-6 text-sm text-slate-300">Loading enquiries...</div>
                ) : enquiries.length === 0 ? (
                  <div className="rounded-[1.5rem] border border-dashed border-white/10 px-5 py-6 text-sm text-slate-400">No enquiries to review right now.</div>
                ) : (
                  enquiries.map((enquiry) => (
                    <div key={enquiry._id} className="rounded-[1.5rem] border border-white/10 bg-white/5 p-5">
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <p className="text-base font-semibold text-white">{enquiry.name || 'New enquiry'}</p>
                          <p className="mt-1 text-sm text-slate-400">{enquiry.phone || enquiry.email || 'No contact details'}</p>
                        </div>
                        <StatusPill tone={enquiryTone(enquiry.status)}>{enquiry.status}</StatusPill>
                      </div>

                      <p className="mt-3 text-sm leading-relaxed text-slate-300">{enquiry.message || 'No message provided.'}</p>

                      <div className="mt-4 flex flex-wrap gap-2">
                        {enquiry.status === 'pending' ? (
                          <button
                            type="button"
                            onClick={() => updateEnquiryStatus(enquiry._id, 'contacted')}
                            className="rounded-full bg-sky-500/15 px-4 py-2 text-xs font-bold uppercase tracking-[0.14em] text-sky-300 transition hover:bg-sky-500/25"
                          >
                            Mark contacted
                          </button>
                        ) : null}

                        {enquiry.status !== 'resolved' ? (
                          <button
                            type="button"
                            onClick={() => updateEnquiryStatus(enquiry._id, 'resolved')}
                            className="rounded-full bg-emerald-500/15 px-4 py-2 text-xs font-bold uppercase tracking-[0.14em] text-emerald-300 transition hover:bg-emerald-500/25"
                          >
                            Resolve
                          </button>
                        ) : null}
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>

            <div className="rounded-[2rem] border border-white/10 bg-slate-900 p-6 shadow-xl shadow-black/20">
              <p className="text-xs font-black uppercase tracking-[0.2em] text-emerald-300">Quick links</p>
              <div className="mt-5 grid gap-3">
                {[
                  { href: '/admin/orders', label: 'Manage orders', note: 'Track delivery and payment progress' },
                  { href: '/admin/products', label: 'Manage products', note: 'Update pricing and inventory' },
                  { href: '/admin/enquiries', label: 'Review enquiries', note: 'Follow up with incoming leads' },
                  { href: '/admin/posts', label: 'Edit posts', note: 'Refresh advisory content' },
                  { href: '/products', label: 'Open storefront', note: 'See the customer-facing catalog' },
                ].map((link) => (
                  <Link key={link.href} href={link.href} className="group rounded-[1.5rem] border border-white/10 bg-white/5 p-4 transition hover:bg-white/10">
                    <div className="flex items-center justify-between gap-4">
                      <div>
                        <p className="font-semibold text-white">{link.label}</p>
                        <p className="mt-1 text-sm text-slate-400">{link.note}</p>
                      </div>
                      <FiArrowRight className="text-slate-500 transition group-hover:translate-x-1 group-hover:text-white" />
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="rounded-[2rem] border border-white/10 bg-slate-900 p-6 shadow-xl shadow-black/20">
          <div className="mb-6 flex items-center justify-between">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.2em] text-emerald-300">Inventory snapshot</p>
              <h2 className="mt-2 text-2xl font-bold text-white">Featured and recent products</h2>
            </div>
            <StatusPill tone="slate">{products.length} items</StatusPill>
          </div>

          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {loading ? (
              [1, 2, 3].map((placeholder) => (
                <div key={placeholder} className="h-40 rounded-[1.5rem] border border-white/10 bg-white/5" />
              ))
            ) : products.length === 0 ? (
              <div className="rounded-[1.5rem] border border-dashed border-white/10 px-5 py-6 text-sm text-slate-400">Products will appear here once they are available in the catalog.</div>
            ) : (
              products.map((product) => (
                <div key={product._id || product.id || product.name} className="rounded-[1.5rem] border border-white/10 bg-white/5 p-5">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-500/10 text-lg font-black text-emerald-300">
                      {(product.name || 'P').slice(0, 1).toUpperCase()}
                    </div>
                    <StatusPill tone={product.inStock ? 'emerald' : 'rose'}>{product.inStock ? 'In stock' : 'Out of stock'}</StatusPill>
                  </div>

                  <p className="mt-4 text-lg font-semibold text-white">{product.name}</p>
                  <p className="mt-2 text-sm text-slate-400">{product.category || 'General'}</p>
                  <div className="mt-4 flex items-center justify-between">
                    <p className="text-xl font-black text-white">{currencyFormatter.format(product.price || 0)}</p>
                    <p className="text-sm text-slate-500">{product.brand || 'No brand'}</p>
                  </div>
                </div>
              ))
            )}
          </div>
        </section>
      </div>
    </AdminLayout>
  );
}
