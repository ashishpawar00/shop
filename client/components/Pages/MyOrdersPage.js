import { useCallback, useEffect, useMemo, useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import {
  FiCheckCircle,
  FiClock,
  FiCreditCard,
  FiPackage,
  FiRefreshCw,
  FiShoppingCart,
  FiTruck,
  FiXCircle,
} from 'react-icons/fi';
import { API_URL } from '@/lib/api';
import { useAuth } from '@/contexts/AuthContext';
import { useCart } from '@/contexts/CartContext';
import { useTheme } from '@/contexts/ThemeContext';

const SUPPORT_WHATSAPP = '919977938192';
const CURRENCY = new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 });
const ORDER_STEPS = ['Pending', 'Confirmed', 'Shipped', 'Delivered'];

const STATUS_META = {
  Pending: { icon: FiClock, tone: 'bg-amber-100 text-amber-800 dark:bg-amber-500/15 dark:text-amber-300' },
  Confirmed: { icon: FiCheckCircle, tone: 'bg-sky-100 text-sky-800 dark:bg-sky-500/15 dark:text-sky-300' },
  Shipped: { icon: FiTruck, tone: 'bg-violet-100 text-violet-800 dark:bg-violet-500/15 dark:text-violet-300' },
  Delivered: { icon: FiCheckCircle, tone: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-500/15 dark:text-emerald-300' },
  Cancelled: { icon: FiXCircle, tone: 'bg-rose-100 text-rose-800 dark:bg-rose-500/15 dark:text-rose-300' },
};

const PAYMENT_TONE = {
  Pending: 'bg-amber-100 text-amber-800 dark:bg-amber-500/15 dark:text-amber-300',
  Paid: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-500/15 dark:text-emerald-300',
  Failed: 'bg-rose-100 text-rose-800 dark:bg-rose-500/15 dark:text-rose-300',
};

function cardClasses(isLight) {
  return isLight ? 'border-slate-200 bg-white shadow-slate-200/60' : 'border-white/10 bg-slate-900 shadow-black/20';
}

function buildAddress(order) {
  const address = order?.deliveryAddress || {};
  return [address.street, address.village, address.city, address.district, address.state, address.pincode].filter(Boolean).join(', ');
}

function stepIndex(status) {
  return ORDER_STEPS.indexOf(status);
}

export default function MyOrdersPage() {
  const router = useRouter();
  const { user, token, loading: authLoading } = useAuth();
  const { addToCart } = useCart();
  const { isLight } = useTheme();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState('');
  const [expandedOrderId, setExpandedOrderId] = useState('');

  useEffect(() => {
    if (!authLoading && !user) {
      router.replace('/login?redirect=/my-orders');
    }
  }, [authLoading, router, user]);

  const fetchOrders = useCallback(async () => {
    if (!token) return;
    setRefreshing(true);
    setError('');

    try {
      const response = await fetch(`${API_URL}/orders/my-orders`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await response.json().catch(() => []);

      if (!response.ok) {
        throw new Error(data.message || 'Unable to load your orders right now.');
      }

      setOrders(Array.isArray(data) ? data : []);
      setExpandedOrderId(current => current || data?.[0]?._id || '');
    } catch (fetchError) {
      setError(
        fetchError.message === 'Failed to fetch'
          ? 'The order service is not reachable right now. Please start the backend server and try again.'
          : fetchError.message
      );
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, [token]);

  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);

  const stats = useMemo(() => ({
    delivered: orders.filter(order => order.orderStatus === 'Delivered').length,
    active: orders.filter(order => !['Delivered', 'Cancelled'].includes(order.orderStatus)).length,
    spent: orders.reduce((sum, order) => sum + Number(order.totalAmount || 0), 0),
  }), [orders]);

  const reorderItems = useCallback((order) => {
    order.items?.forEach(item => {
      addToCart(
        {
          id: String(item.product || `${item.name}-${item.price}`),
          _id: item.product,
          name: item.name,
          nameHindi: item.nameHindi,
          price: item.price,
          image: item.image,
          category: item.category,
        },
        item.quantity
      );
    });
    router.push('/cart');
  }, [addToCart, router]);

  if (authLoading || loading) {
    return <div className="flex min-h-[60vh] items-center justify-center"><div className="h-10 w-10 animate-spin rounded-full border-4 border-emerald-500 border-t-transparent" /></div>;
  }

  if (!user) {
    return <div className="flex min-h-[60vh] items-center justify-center text-slate-500">Redirecting to login...</div>;
  }

  return (
    <>
      <Head>
        <title>My Orders | Laxmi Krashi Kendra</title>
      </Head>

      <div className={isLight ? 'bg-[#f4f7f4] text-slate-950' : 'bg-slate-950 text-white'}>
        <main className="mx-auto max-w-7xl px-4 pb-20 pt-28 sm:px-6 lg:px-8 lg:pt-32">
          <section className={`overflow-hidden rounded-[2.35rem] border p-8 shadow-2xl ${isLight ? 'border-emerald-100 bg-[radial-gradient(circle_at_top_left,_rgba(16,185,129,0.16),_transparent_32%),linear-gradient(135deg,_rgba(255,255,255,0.98),_rgba(244,247,244,0.96))] shadow-slate-200/70' : 'border-white/10 bg-[radial-gradient(circle_at_top_left,_rgba(16,185,129,0.18),_transparent_32%),linear-gradient(135deg,_rgba(15,23,42,0.96),_rgba(2,6,23,0.98))] shadow-black/30'}`}>
            <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
              <div className="max-w-3xl">
                <p className={`text-xs font-black uppercase tracking-[0.24em] ${isLight ? 'text-emerald-600' : 'text-emerald-300'}`}>Order history</p>
                <h1 className="mt-4 text-4xl font-black tracking-tight sm:text-5xl">Track every order, payment, and delivery update in one place.</h1>
                <p className={`mt-4 max-w-2xl text-base leading-relaxed sm:text-lg ${isLight ? 'text-slate-600' : 'text-slate-300'}`}>See order progress, review delivery details, and quickly reorder the same products whenever you need another round.</p>
              </div>
              <button type="button" onClick={fetchOrders} disabled={refreshing} className="inline-flex items-center justify-center gap-2 rounded-[1.4rem] bg-emerald-500 px-5 py-4 text-sm font-bold text-white transition hover:bg-emerald-600 disabled:cursor-not-allowed disabled:opacity-60">
                <FiRefreshCw className={refreshing ? 'animate-spin' : ''} />
                {refreshing ? 'Refreshing...' : 'Refresh orders'}
              </button>
            </div>
          </section>

          {error ? <div className={`mt-6 rounded-[1.5rem] border px-5 py-4 text-sm font-medium ${isLight ? 'border-rose-200 bg-rose-50 text-rose-700' : 'border-rose-500/20 bg-rose-500/10 text-rose-200'}`}>{error}</div> : null}

          <section className="mt-8 grid gap-4 md:grid-cols-3">
            <div className={`rounded-[1.7rem] border p-5 shadow-xl ${cardClasses(isLight)}`}><p className={`text-sm font-semibold ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>Total orders</p><p className="mt-2 text-3xl font-black">{orders.length}</p></div>
            <div className={`rounded-[1.7rem] border p-5 shadow-xl ${cardClasses(isLight)}`}><p className={`text-sm font-semibold ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>Delivered</p><p className="mt-2 text-3xl font-black">{stats.delivered}</p></div>
            <div className={`rounded-[1.7rem] border p-5 shadow-xl ${cardClasses(isLight)}`}><p className={`text-sm font-semibold ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>Amount spent</p><p className="mt-2 text-3xl font-black">{CURRENCY.format(stats.spent)}</p><p className={`mt-2 text-sm ${isLight ? 'text-slate-500' : 'text-slate-500'}`}>{stats.active} active orders</p></div>
          </section>

          {orders.length === 0 ? (
            <section className={`mt-8 rounded-[2rem] border px-6 py-14 text-center shadow-xl ${cardClasses(isLight)}`}>
              <FiPackage className={`mx-auto h-10 w-10 ${isLight ? 'text-emerald-600' : 'text-emerald-300'}`} />
              <h2 className="mt-5 text-2xl font-black">No orders yet</h2>
              <p className={`mx-auto mt-3 max-w-xl text-base leading-relaxed ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>Once you place an order, it will appear here with payment and delivery progress.</p>
              <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
                <Link href="/products" className="inline-flex items-center justify-center rounded-full bg-emerald-500 px-6 py-3 text-sm font-bold text-white transition hover:bg-emerald-600">Browse products</Link>
                <Link href="/crop-doctor" className={`inline-flex items-center justify-center rounded-full border px-6 py-3 text-sm font-bold transition ${isLight ? 'border-emerald-200 text-emerald-700 hover:bg-emerald-50' : 'border-emerald-500/40 text-emerald-300 hover:bg-emerald-500/10'}`}>Start crop diagnosis</Link>
              </div>
            </section>
          ) : (
            <section className="mt-8 space-y-5">
              {orders.map(order => {
                const meta = STATUS_META[order.orderStatus] || STATUS_META.Pending;
                const StatusIcon = meta.icon;
                const address = buildAddress(order);
                const isExpanded = expandedOrderId === order._id;
                const currentStep = stepIndex(order.orderStatus);
                const supportLink = `https://wa.me/${SUPPORT_WHATSAPP}?text=${encodeURIComponent(`Hello, I need help with my order ${order.orderNumber}.`)}`;

                return (
                  <article key={order._id} className={`overflow-hidden rounded-[2rem] border shadow-xl ${cardClasses(isLight)}`}>
                    <div className="p-6">
                      <div className="flex flex-col gap-5 xl:flex-row xl:items-start xl:justify-between">
                        <div className="min-w-0 flex-1">
                          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                            <div>
                              <p className={`${isLight ? 'text-emerald-600' : 'text-emerald-300'} text-sm font-bold`}>{order.orderNumber}</p>
                              <p className={`mt-2 text-lg font-bold ${isLight ? 'text-slate-900' : 'text-white'}`}>{new Date(order.createdAt).toLocaleString('en-IN', { day: 'numeric', month: 'short', year: 'numeric', hour: 'numeric', minute: '2-digit' })}</p>
                            </div>
                            <div className="flex flex-wrap gap-2">
                              <span className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-bold uppercase tracking-[0.14em] ${meta.tone}`}><StatusIcon className="h-3.5 w-3.5" />{order.orderStatus}</span>
                              <span className={`rounded-full px-3 py-1 text-xs font-bold uppercase tracking-[0.14em] ${PAYMENT_TONE[order.paymentStatus] || PAYMENT_TONE.Pending}`}>{order.paymentMethod} - {order.paymentStatus}</span>
                            </div>
                          </div>

                          <div className="mt-4 grid gap-3 md:grid-cols-2 xl:grid-cols-4">
                            <div className={`rounded-[1.2rem] border px-4 py-3 ${isLight ? 'border-slate-200 bg-slate-50' : 'border-white/10 bg-slate-950/40'}`}><p className="text-xs font-black uppercase tracking-[0.12em] text-slate-500">Items</p><p className={`mt-2 text-sm font-semibold ${isLight ? 'text-slate-900' : 'text-white'}`}>{order.items?.length || 0} line items</p></div>
                            <div className={`rounded-[1.2rem] border px-4 py-3 ${isLight ? 'border-slate-200 bg-slate-50' : 'border-white/10 bg-slate-950/40'}`}><p className="text-xs font-black uppercase tracking-[0.12em] text-slate-500">Total</p><p className={`mt-2 text-sm font-semibold ${isLight ? 'text-slate-900' : 'text-white'}`}>{CURRENCY.format(order.totalAmount || 0)}</p></div>
                            <div className={`rounded-[1.2rem] border px-4 py-3 ${isLight ? 'border-slate-200 bg-slate-50' : 'border-white/10 bg-slate-950/40'}`}><p className="text-xs font-black uppercase tracking-[0.12em] text-slate-500">Payment</p><p className={`mt-2 text-sm font-semibold ${isLight ? 'text-slate-900' : 'text-white'}`}>{order.transactionId || order.paymentMethod}</p></div>
                            <div className={`rounded-[1.2rem] border px-4 py-3 ${isLight ? 'border-slate-200 bg-slate-50' : 'border-white/10 bg-slate-950/40'}`}><p className="text-xs font-black uppercase tracking-[0.12em] text-slate-500">Delivery address</p><p className={`mt-2 text-sm font-semibold ${isLight ? 'text-slate-900' : 'text-white'}`}>{address || 'Not added'}</p></div>
                          </div>

                          <div className="mt-5 grid gap-2 sm:grid-cols-4">
                            {ORDER_STEPS.map((step, index) => (
                              <div key={step} className={`rounded-[1.1rem] border px-3 py-2 text-sm font-semibold ${order.orderStatus === 'Cancelled' ? isLight ? 'border-rose-200 bg-rose-50 text-rose-700' : 'border-rose-500/20 bg-rose-500/10 text-rose-200' : index <= currentStep ? isLight ? 'border-emerald-200 bg-emerald-50 text-emerald-700' : 'border-emerald-500/20 bg-emerald-500/10 text-emerald-200' : isLight ? 'border-slate-200 bg-slate-50 text-slate-500' : 'border-white/10 bg-slate-950/40 text-slate-500'}`}>{step}</div>
                            ))}
                          </div>
                        </div>

                        <div className="flex flex-wrap gap-2 xl:w-[15rem] xl:flex-col">
                          <button type="button" onClick={() => setExpandedOrderId(isExpanded ? '' : order._id)} className={`rounded-[1.2rem] px-4 py-3 text-sm font-bold transition ${isLight ? 'bg-slate-100 text-slate-800 hover:bg-slate-200' : 'bg-white/5 text-white hover:bg-white/10'}`}>{isExpanded ? 'Hide details' : 'Order details'}</button>
                          <button type="button" onClick={() => reorderItems(order)} className="inline-flex items-center justify-center gap-2 rounded-[1.2rem] bg-emerald-500 px-4 py-3 text-sm font-bold text-white transition hover:bg-emerald-600"><FiShoppingCart size={15} />Reorder items</button>
                          <a href={supportLink} target="_blank" rel="noreferrer" className={`inline-flex items-center justify-center gap-2 rounded-[1.2rem] border px-4 py-3 text-sm font-bold transition ${isLight ? 'border-emerald-200 text-emerald-700 hover:bg-emerald-50' : 'border-emerald-500/35 text-emerald-300 hover:bg-emerald-500/10'}`}>WhatsApp support</a>
                        </div>
                      </div>

                      {isExpanded ? (
                        <div className={`mt-5 grid gap-4 rounded-[1.6rem] border p-5 xl:grid-cols-[1fr_0.9fr] ${isLight ? 'border-slate-200 bg-slate-50/80' : 'border-white/10 bg-slate-950/40'}`}>
                          <div>
                            <h3 className={`text-base font-black ${isLight ? 'text-slate-900' : 'text-white'}`}>Items in this order</h3>
                            <div className="mt-4 space-y-3">
                              {order.items?.map((item, index) => (
                                <div key={`${order._id}-${item.product || item.name}-${index}`} className={`rounded-[1.2rem] border px-4 py-3 ${isLight ? 'border-slate-200 bg-white' : 'border-white/10 bg-white/5'}`}>
                                  <div className="flex flex-wrap items-center justify-between gap-3">
                                    <div><p className={`font-semibold ${isLight ? 'text-slate-900' : 'text-white'}`}>{item.name}</p><p className={`mt-1 text-sm ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>{CURRENCY.format(item.price || 0)} x {item.quantity}</p></div>
                                    <p className={`text-sm font-bold ${isLight ? 'text-slate-900' : 'text-white'}`}>{CURRENCY.format((item.price || 0) * (item.quantity || 0))}</p>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>

                          <div className="space-y-4">
                            <div className={`rounded-[1.2rem] border px-4 py-4 ${isLight ? 'border-slate-200 bg-white' : 'border-white/10 bg-white/5'}`}><h3 className="text-sm font-black uppercase tracking-[0.14em] text-slate-500">Payment summary</h3><div className={`mt-3 space-y-2 text-sm ${isLight ? 'text-slate-700' : 'text-slate-300'}`}><div className="flex items-center justify-between"><span>Subtotal</span><span className={`font-semibold ${isLight ? 'text-slate-900' : 'text-white'}`}>{CURRENCY.format(order.subtotal || 0)}</span></div><div className="flex items-center justify-between"><span>Delivery charge</span><span className={`font-semibold ${isLight ? 'text-slate-900' : 'text-white'}`}>{CURRENCY.format(order.deliveryCharge || 0)}</span></div><div className={`flex items-center justify-between border-t pt-2 ${isLight ? 'border-slate-200' : 'border-white/10'}`}><span>Total</span><span className={`font-bold ${isLight ? 'text-slate-900' : 'text-white'}`}>{CURRENCY.format(order.totalAmount || 0)}</span></div></div></div>
                            <div className={`rounded-[1.2rem] border px-4 py-4 ${isLight ? 'border-slate-200 bg-white' : 'border-white/10 bg-white/5'}`}><h3 className="text-sm font-black uppercase tracking-[0.14em] text-slate-500">Customer note</h3><p className={`mt-3 text-sm leading-relaxed ${isLight ? 'text-slate-700' : 'text-slate-300'}`}>{order.notes || 'No order note provided.'}</p></div>
                            {order.adminNotes ? <div className={`rounded-[1.2rem] border px-4 py-4 ${isLight ? 'border-emerald-200 bg-emerald-50' : 'border-emerald-500/20 bg-emerald-500/10'}`}><h3 className={`text-sm font-black uppercase tracking-[0.14em] ${isLight ? 'text-emerald-700' : 'text-emerald-300'}`}>Store note</h3><p className={`mt-3 text-sm leading-relaxed ${isLight ? 'text-emerald-900' : 'text-emerald-100'}`}>{order.adminNotes}</p></div> : null}
                          </div>
                        </div>
                      ) : null}
                    </div>
                  </article>
                );
              })}
            </section>
          )}
        </main>
      </div>
    </>
  );
}
