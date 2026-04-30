import { startTransition, useCallback, useDeferredValue, useEffect, useMemo, useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import {
  FiArrowRight,
  FiClock,
  FiDollarSign,
  FiMapPin,
  FiPackage,
  FiRefreshCw,
  FiSearch,
  FiShoppingBag,
  FiTrash2,
  FiUser,
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
  hour: 'numeric',
  minute: '2-digit',
});

const ORDER_STATUS_OPTIONS = ['Pending', 'Confirmed', 'Shipped', 'Delivered', 'Cancelled'];
const PAYMENT_STATUS_OPTIONS = ['Pending', 'Paid', 'Failed'];
const PAYMENT_METHOD_OPTIONS = ['all', 'COD', 'UPI'];

function StatCard({ label, value, hint, icon, tone = 'emerald' }) {
  const tones = {
    emerald: 'from-emerald-500/20 to-emerald-400/5 text-emerald-300',
    cyan: 'from-cyan-500/20 to-cyan-400/5 text-cyan-300',
    amber: 'from-amber-500/20 to-amber-400/5 text-amber-300',
    rose: 'from-rose-500/20 to-rose-400/5 text-rose-300',
  };

  return (
    <div className="rounded-[1.8rem] border border-white/10 bg-slate-900 p-5 shadow-xl shadow-black/20">
      <div className={`inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br ${tones[tone]}`}>
        {icon}
      </div>
      <p className="mt-4 text-sm font-semibold text-slate-400">{label}</p>
      <p className="mt-2 text-3xl font-black text-white">{value}</p>
      {hint ? <p className="mt-2 text-sm text-slate-500">{hint}</p> : null}
    </div>
  );
}

function Pill({ children, tone = 'slate' }) {
  const tones = {
    slate: 'bg-slate-800 text-slate-300',
    amber: 'bg-amber-500/15 text-amber-300',
    blue: 'bg-sky-500/15 text-sky-300',
    violet: 'bg-violet-500/15 text-violet-300',
    emerald: 'bg-emerald-500/15 text-emerald-300',
    rose: 'bg-rose-500/15 text-rose-300',
  };

  return <span className={`rounded-full px-3 py-1 text-xs font-bold uppercase tracking-[0.14em] ${tones[tone]}`}>{children}</span>;
}

function getOrderTone(status) {
  switch (status) {
    case 'Pending':
      return 'amber';
    case 'Confirmed':
      return 'blue';
    case 'Shipped':
      return 'violet';
    case 'Delivered':
      return 'emerald';
    case 'Cancelled':
      return 'rose';
    default:
      return 'slate';
  }
}

function getPaymentTone(status) {
  switch (status) {
    case 'Paid':
      return 'emerald';
    case 'Failed':
      return 'rose';
    default:
      return 'amber';
  }
}

function buildAddress(order) {
  const address = order?.deliveryAddress || {};
  return [address.street, address.village, address.city, address.district, address.state, address.pincode]
    .filter(Boolean)
    .join(', ');
}

export default function AdminOrdersPage() {
  const { token, logout } = useAuth();
  const [orders, setOrders] = useState([]);
  const [stats, setStats] = useState({});
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState('');
  const [expandedOrderId, setExpandedOrderId] = useState('');
  const [savingOrderId, setSavingOrderId] = useState('');
  const [deletingOrderId, setDeletingOrderId] = useState('');
  const [noteDrafts, setNoteDrafts] = useState({});
  const [filters, setFilters] = useState({
    status: 'all',
    paymentMethod: 'all',
    paymentStatus: 'all',
    query: '',
  });
  const deferredQuery = useDeferredValue(filters.query);

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

  const loadOrders = useCallback(async () => {
    if (!token) {
      return;
    }

    setRefreshing(true);
    setError('');

    try {
      const params = new URLSearchParams({
        limit: '100',
      });

      if (filters.status !== 'all') {
        params.set('status', filters.status);
      }
      if (filters.paymentMethod !== 'all') {
        params.set('payment', filters.paymentMethod);
      }
      if (filters.paymentStatus !== 'all') {
        params.set('paymentStatus', filters.paymentStatus);
      }

      const [ordersData, orderStats] = await Promise.all([
        fetchJson(`/orders?${params.toString()}`),
        fetchJson('/orders/stats'),
      ]);

      const nextOrders = ordersData.orders || [];
      setOrders(nextOrders);
      setStats(orderStats || {});
      setNoteDrafts((current) => {
        const nextDrafts = { ...current };
        nextOrders.forEach((order) => {
          if (typeof nextDrafts[order._id] !== 'string') {
            nextDrafts[order._id] = order.adminNotes || '';
          }
        });
        return nextDrafts;
      });
    } catch (loadError) {
      setError(loadError.message || 'Unable to load orders.');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, [fetchJson, filters.paymentMethod, filters.paymentStatus, filters.status, token]);

  useEffect(() => {
    loadOrders();
  }, [loadOrders]);

  const filteredOrders = useMemo(() => {
    const normalizedQuery = deferredQuery.trim().toLowerCase();
    if (!normalizedQuery) {
      return orders;
    }

    return orders.filter((order) => {
      const haystack = [
        order.orderNumber,
        order.customerName,
        order.customerPhone,
        order.customerEmail,
        order.paymentMethod,
        order.orderStatus,
        order.paymentStatus,
        ...(order.items || []).map((item) => item.name),
      ]
        .filter(Boolean)
        .join(' ')
        .toLowerCase();

      return haystack.includes(normalizedQuery);
    });
  }, [deferredQuery, orders]);

  const handleFilterChange = (key, value) => {
    startTransition(() => {
      setFilters((current) => ({
        ...current,
        [key]: value,
      }));
    });
  };

  const handleNoteChange = (orderId, value) => {
    setNoteDrafts((current) => ({
      ...current,
      [orderId]: value,
    }));
  };

  const updateOrder = async (orderId, payload) => {
    setSavingOrderId(orderId);
    setError('');

    try {
      await fetchJson(`/orders/${orderId}/status`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });
      await loadOrders();
    } catch (actionError) {
      setError(actionError.message || 'Unable to update order.');
    } finally {
      setSavingOrderId('');
    }
  };

  const deleteOrder = async (orderId) => {
    const shouldDelete = typeof window !== 'undefined' ? window.confirm('Delete this order permanently?') : false;
    if (!shouldDelete) {
      return;
    }

    setDeletingOrderId(orderId);
    setError('');

    try {
      await fetchJson(`/orders/${orderId}`, {
        method: 'DELETE',
      });
      if (expandedOrderId === orderId) {
        setExpandedOrderId('');
      }
      await loadOrders();
    } catch (actionError) {
      setError(actionError.message || 'Unable to delete order.');
    } finally {
      setDeletingOrderId('');
    }
  };

  return (
    <AdminLayout>
      <Head>
        <title>Admin Orders | Laxmi Krashi Kendra</title>
      </Head>

      <div className="space-y-8">
        <section className="overflow-hidden rounded-[2.25rem] border border-white/10 bg-[radial-gradient(circle_at_top_left,_rgba(16,185,129,0.16),_transparent_32%),linear-gradient(135deg,_rgba(15,23,42,0.96),_rgba(2,6,23,0.98))] p-8 shadow-2xl shadow-black/30">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-3xl">
              <p className="text-xs font-black uppercase tracking-[0.24em] text-emerald-300">Orders Board</p>
              <h1 className="mt-4 text-4xl font-black tracking-tight text-white sm:text-5xl">
                Review, confirm, and fulfill every customer order from one screen.
              </h1>
              <p className="mt-4 max-w-2xl text-base leading-relaxed text-slate-300 sm:text-lg">
                Filter by order stage, payment state, or payment method, then update delivery progress and admin notes without leaving the workflow.
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">
              <button
                type="button"
                onClick={loadOrders}
                disabled={refreshing}
                className="inline-flex items-center justify-center gap-2 rounded-[1.5rem] bg-emerald-500 px-5 py-4 text-sm font-bold text-white transition hover:bg-emerald-600 disabled:cursor-not-allowed disabled:opacity-60"
              >
                <FiRefreshCw className={refreshing ? 'animate-spin' : ''} />
                {refreshing ? 'Refreshing...' : 'Refresh orders'}
              </button>

              <Link
                href="/my-orders"
                className="inline-flex items-center justify-center gap-2 rounded-[1.5rem] border border-white/10 bg-white/5 px-5 py-4 text-sm font-bold text-slate-200 transition hover:bg-white/10"
              >
                Customer view
                <FiArrowRight size={16} />
              </Link>
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
            value={stats.total || 0}
            hint={`${stats.pending || 0} pending review`}
            icon={<FiShoppingBag size={22} />}
            tone="emerald"
          />
          <StatCard
            label="Paid revenue"
            value={currencyFormatter.format(stats.totalRevenue || 0)}
            hint={`${stats.paidOrders || 0} paid orders`}
            icon={<FiDollarSign size={22} />}
            tone="cyan"
          />
          <StatCard
            label="Pending payment"
            value={stats.pendingPayments || 0}
            hint={`${stats.failedPayments || 0} failed payments`}
            icon={<FiClock size={22} />}
            tone="amber"
          />
          <StatCard
            label="Delivered"
            value={stats.delivered || 0}
            hint={`${stats.shipped || 0} currently shipped`}
            icon={<FiPackage size={22} />}
            tone="rose"
          />
        </section>

        <section className="rounded-[2rem] border border-white/10 bg-slate-900 p-5 shadow-xl shadow-black/20">
          <div className="grid gap-4 xl:grid-cols-[1.2fr_repeat(3,0.6fr)]">
            <label className="block">
              <span className="mb-2 block text-xs font-black uppercase tracking-[0.16em] text-slate-400">Search</span>
              <div className="flex items-center gap-3 rounded-[1.25rem] border border-white/10 bg-white/5 px-4 py-3 text-slate-300">
                <FiSearch className="text-slate-500" />
                <input
                  type="text"
                  value={filters.query}
                  onChange={(event) => handleFilterChange('query', event.target.value)}
                  placeholder="Order number, customer, phone, item..."
                  className="w-full bg-transparent text-sm text-white outline-none placeholder:text-slate-500"
                />
              </div>
            </label>

            <label className="block">
              <span className="mb-2 block text-xs font-black uppercase tracking-[0.16em] text-slate-400">Order status</span>
              <select
                value={filters.status}
                onChange={(event) => handleFilterChange('status', event.target.value)}
                className="w-full rounded-[1.25rem] border border-white/10 bg-white/5 px-4 py-3 text-sm font-medium text-white outline-none"
              >
                <option value="all">All statuses</option>
                {ORDER_STATUS_OPTIONS.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </label>

            <label className="block">
              <span className="mb-2 block text-xs font-black uppercase tracking-[0.16em] text-slate-400">Payment method</span>
              <select
                value={filters.paymentMethod}
                onChange={(event) => handleFilterChange('paymentMethod', event.target.value)}
                className="w-full rounded-[1.25rem] border border-white/10 bg-white/5 px-4 py-3 text-sm font-medium text-white outline-none"
              >
                {PAYMENT_METHOD_OPTIONS.map((option) => (
                  <option key={option} value={option}>
                    {option === 'all' ? 'All methods' : option}
                  </option>
                ))}
              </select>
            </label>

            <label className="block">
              <span className="mb-2 block text-xs font-black uppercase tracking-[0.16em] text-slate-400">Payment state</span>
              <select
                value={filters.paymentStatus}
                onChange={(event) => handleFilterChange('paymentStatus', event.target.value)}
                className="w-full rounded-[1.25rem] border border-white/10 bg-white/5 px-4 py-3 text-sm font-medium text-white outline-none"
              >
                <option value="all">All payment states</option>
                {PAYMENT_STATUS_OPTIONS.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </label>
          </div>
        </section>

        <section className="rounded-[2rem] border border-white/10 bg-slate-900 p-6 shadow-xl shadow-black/20">
          <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.2em] text-emerald-300">Live queue</p>
              <h2 className="mt-2 text-2xl font-bold text-white">Customer orders</h2>
            </div>
            <Pill tone="slate">{filteredOrders.length} visible</Pill>
          </div>

          <div className="space-y-4">
            {loading ? (
              <div className="rounded-[1.5rem] border border-white/10 bg-white/5 px-5 py-8 text-sm text-slate-300">Loading orders...</div>
            ) : filteredOrders.length === 0 ? (
              <div className="rounded-[1.5rem] border border-dashed border-white/10 px-5 py-8 text-sm text-slate-400">
                No orders matched the current filters.
              </div>
            ) : (
              filteredOrders.map((order) => {
                const isExpanded = expandedOrderId === order._id;
                const isSaving = savingOrderId === order._id;
                const isDeleting = deletingOrderId === order._id;
                const address = buildAddress(order);
                const notesValue = typeof noteDrafts[order._id] === 'string' ? noteDrafts[order._id] : order.adminNotes || '';

                return (
                  <article key={order._id} className="rounded-[1.6rem] border border-white/10 bg-white/5 p-5">
                    <div className="flex flex-col gap-5 xl:flex-row xl:items-start xl:justify-between">
                      <div className="min-w-0 flex-1">
                        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                          <div>
                            <p className="text-sm font-bold text-emerald-300">{order.orderNumber}</p>
                            <h3 className="mt-1 text-xl font-bold text-white">{order.customerName || 'Customer order'}</h3>
                          </div>

                          <div className="flex flex-wrap gap-2">
                            <Pill tone={getOrderTone(order.orderStatus)}>{order.orderStatus}</Pill>
                            <Pill tone={getPaymentTone(order.paymentStatus)}>
                              {order.paymentMethod} {order.paymentStatus}
                            </Pill>
                          </div>
                        </div>

                        <div className="mt-4 grid gap-3 text-sm text-slate-300 md:grid-cols-2 xl:grid-cols-4">
                          <div className="rounded-2xl border border-white/10 bg-slate-950/40 px-4 py-3">
                            <p className="mb-1 text-xs font-black uppercase tracking-[0.12em] text-slate-500">Customer</p>
                            <p className="flex items-center gap-2 font-medium text-white">
                              <FiUser className="text-slate-500" />
                              {order.customerPhone || order.customerEmail || 'No contact'}
                            </p>
                          </div>

                          <div className="rounded-2xl border border-white/10 bg-slate-950/40 px-4 py-3">
                            <p className="mb-1 text-xs font-black uppercase tracking-[0.12em] text-slate-500">Placed</p>
                            <p className="font-medium text-white">{dateFormatter.format(new Date(order.createdAt))}</p>
                          </div>

                          <div className="rounded-2xl border border-white/10 bg-slate-950/40 px-4 py-3">
                            <p className="mb-1 text-xs font-black uppercase tracking-[0.12em] text-slate-500">Items</p>
                            <p className="font-medium text-white">{order.items?.length || 0} line items</p>
                          </div>

                          <div className="rounded-2xl border border-white/10 bg-slate-950/40 px-4 py-3">
                            <p className="mb-1 text-xs font-black uppercase tracking-[0.12em] text-slate-500">Total</p>
                            <p className="font-medium text-white">{currencyFormatter.format(order.totalAmount || 0)}</p>
                          </div>
                        </div>

                        {order.items?.length ? (
                          <div className="mt-4 flex flex-wrap gap-2">
                            {order.items.map((item, index) => (
                              <span key={`${order._id}-${item.product || item.name}-${index}`} className="rounded-full bg-slate-950/60 px-3 py-2 text-xs font-medium text-slate-300">
                                {item.name} x {item.quantity}
                              </span>
                            ))}
                          </div>
                        ) : null}

                        {address ? (
                          <p className="mt-4 flex items-start gap-2 text-sm leading-relaxed text-slate-400">
                            <FiMapPin className="mt-0.5 shrink-0 text-slate-500" />
                            <span>{address}</span>
                          </p>
                        ) : null}
                      </div>

                      <div className="flex flex-wrap gap-2 xl:w-[14rem] xl:flex-col">
                        <button
                          type="button"
                          onClick={() => setExpandedOrderId(isExpanded ? '' : order._id)}
                          className="inline-flex items-center justify-center rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm font-semibold text-slate-200 transition hover:bg-white/10"
                        >
                          {isExpanded ? 'Hide details' : 'Manage order'}
                        </button>

                        <button
                          type="button"
                          onClick={() => deleteOrder(order._id)}
                          disabled={isDeleting}
                          className="inline-flex items-center justify-center gap-2 rounded-2xl border border-rose-500/20 bg-rose-500/10 px-4 py-3 text-sm font-semibold text-rose-200 transition hover:bg-rose-500/20 disabled:cursor-not-allowed disabled:opacity-60"
                        >
                          <FiTrash2 size={15} />
                          {isDeleting ? 'Deleting...' : 'Delete'}
                        </button>
                      </div>
                    </div>

                    {isExpanded ? (
                      <div className="mt-5 grid gap-4 rounded-[1.5rem] border border-white/10 bg-slate-950/40 p-5 xl:grid-cols-[0.92fr_1.08fr]">
                        <div className="space-y-4">
                          <div className="grid gap-4 sm:grid-cols-2">
                            <label className="block">
                              <span className="mb-2 block text-xs font-black uppercase tracking-[0.14em] text-slate-400">Order status</span>
                              <select
                                value={order.orderStatus}
                                onChange={(event) => updateOrder(order._id, { orderStatus: event.target.value })}
                                disabled={isSaving}
                                className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm font-medium text-white outline-none disabled:cursor-not-allowed disabled:opacity-60"
                              >
                                {ORDER_STATUS_OPTIONS.map((option) => (
                                  <option key={option} value={option}>
                                    {option}
                                  </option>
                                ))}
                              </select>
                            </label>

                            <label className="block">
                              <span className="mb-2 block text-xs font-black uppercase tracking-[0.14em] text-slate-400">Payment status</span>
                              <select
                                value={order.paymentStatus}
                                onChange={(event) => updateOrder(order._id, { paymentStatus: event.target.value })}
                                disabled={isSaving}
                                className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm font-medium text-white outline-none disabled:cursor-not-allowed disabled:opacity-60"
                              >
                                {PAYMENT_STATUS_OPTIONS.map((option) => (
                                  <option key={option} value={option}>
                                    {option}
                                  </option>
                                ))}
                              </select>
                            </label>
                          </div>

                          <div className="rounded-[1.35rem] border border-white/10 bg-white/5 p-4">
                            <p className="text-xs font-black uppercase tracking-[0.14em] text-slate-400">Payment details</p>
                            <div className="mt-3 grid gap-3 text-sm text-slate-300 sm:grid-cols-2">
                              <p>
                                Method: <span className="font-semibold text-white">{order.paymentMethod}</span>
                              </p>
                              <p>
                                Transaction: <span className="font-semibold text-white">{order.transactionId || 'Not added'}</span>
                              </p>
                            </div>
                          </div>

                          <div className="rounded-[1.35rem] border border-white/10 bg-white/5 p-4">
                            <p className="text-xs font-black uppercase tracking-[0.14em] text-slate-400">Customer note</p>
                            <p className="mt-3 text-sm leading-relaxed text-slate-300">{order.notes || 'No customer note provided.'}</p>
                          </div>
                        </div>

                        <div className="space-y-4">
                          <label className="block">
                            <span className="mb-2 block text-xs font-black uppercase tracking-[0.14em] text-slate-400">Admin notes</span>
                            <textarea
                              value={notesValue}
                              onChange={(event) => handleNoteChange(order._id, event.target.value)}
                              rows={7}
                              className="w-full rounded-[1.35rem] border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none placeholder:text-slate-500"
                              placeholder="Add delivery instructions, payment follow-up, or stock notes..."
                            />
                          </label>

                          <div className="flex flex-wrap gap-3">
                            <button
                              type="button"
                              onClick={() => updateOrder(order._id, { adminNotes: notesValue })}
                              disabled={isSaving}
                              className="rounded-2xl bg-emerald-500 px-5 py-3 text-sm font-bold text-white transition hover:bg-emerald-600 disabled:cursor-not-allowed disabled:opacity-60"
                            >
                              {isSaving ? 'Saving...' : 'Save notes'}
                            </button>

                            <button
                              type="button"
                              onClick={() => {
                                setNoteDrafts((current) => ({
                                  ...current,
                                  [order._id]: order.adminNotes || '',
                                }));
                              }}
                              className="rounded-2xl border border-white/10 bg-white/5 px-5 py-3 text-sm font-semibold text-slate-200 transition hover:bg-white/10"
                            >
                              Reset draft
                            </button>
                          </div>
                        </div>
                      </div>
                    ) : null}
                  </article>
                );
              })
            )}
          </div>
        </section>
      </div>
    </AdminLayout>
  );
}
