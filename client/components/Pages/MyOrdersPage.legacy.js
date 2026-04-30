import { useCallback, useEffect, useState } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { FiCheckCircle, FiClock, FiPackage, FiTruck, FiXCircle } from 'react-icons/fi';
import { API_URL } from '@/lib/api';
import { useAuth } from '@/contexts/AuthContext';

export default function MyOrdersPage() {
  const router = useRouter();
  const { user, token, loading: authLoading } = useAuth();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!authLoading && !user) {
      router.replace('/login?redirect=/my-orders');
    }
  }, [authLoading, router, user]);

  const fetchOrders = useCallback(async () => {
    try {
      const response = await fetch(`${API_URL}/orders/my-orders`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.ok) {
        setOrders(await response.json());
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }, [token]);

  useEffect(() => {
    if (token) {
      fetchOrders();
    }
  }, [fetchOrders, token]);

  const statusIcon = {
    Pending: <FiClock className="text-yellow-600" />,
    Confirmed: <FiCheckCircle className="text-blue-600" />,
    Shipped: <FiTruck className="text-purple-600" />,
    Delivered: <FiCheckCircle className="text-green-600" />,
    Cancelled: <FiXCircle className="text-red-600" />,
  };

  const statusColor = {
    Pending: 'bg-yellow-100 text-yellow-700',
    Confirmed: 'bg-blue-100 text-blue-700',
    Shipped: 'bg-purple-100 text-purple-700',
    Delivered: 'bg-green-100 text-green-700',
    Cancelled: 'bg-red-100 text-red-700',
  };

  const paymentColor = {
    Pending: 'text-yellow-600',
    Paid: 'text-green-600',
    Failed: 'text-red-600',
  };

  if (authLoading || loading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-green-600 border-t-transparent" />
      </div>
    );
  }

  if (!user) {
    return <div className="flex min-h-[60vh] items-center justify-center text-gray-500">Redirecting to login...</div>;
  }

  return (
    <>
      <Head>
        <title>My Orders | Laxmi Krishi Kendra</title>
      </Head>

      <div className="mx-auto max-w-4xl px-4 py-8">
        <h1 className="mb-8 flex items-center gap-3 text-3xl font-bold text-gray-800">
          <FiPackage className="text-green-600" />
          My Orders
        </h1>

        {orders.length === 0 ? (
          <div className="py-16 text-center">
            <div className="mb-4 text-5xl">Orders</div>
            <p className="text-lg text-gray-500">No orders yet.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {orders.map((order) => (
              <div key={order._id} className="overflow-hidden rounded-xl border border-gray-200 bg-white transition hover:shadow-md">
                <div className="p-5">
                  <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
                    <div>
                      <span className="text-sm text-gray-500">Order</span>
                      <h3 className="font-bold text-green-700">{order.orderNumber}</h3>
                    </div>

                    <div className="flex gap-2">
                      <span className={`flex items-center gap-1 rounded-full px-3 py-1 text-xs font-semibold ${statusColor[order.orderStatus]}`}>
                        {statusIcon[order.orderStatus]} {order.orderStatus}
                      </span>
                      <span className={`rounded-full bg-gray-100 px-3 py-1 text-xs font-semibold ${paymentColor[order.paymentStatus]}`}>
                        {order.paymentMethod} • {order.paymentStatus}
                      </span>
                    </div>
                  </div>

                  <div className="mb-3 flex flex-wrap gap-3">
                    {order.items?.map((item, index) => (
                      <div key={`${item.name}-${index}`} className="flex items-center gap-2 rounded-lg bg-gray-50 px-3 py-2 text-sm">
                        <span>Item</span>
                        <span className="font-medium">{item.name}</span>
                        <span className="text-gray-400">x {item.quantity}</span>
                      </div>
                    ))}
                  </div>

                  <div className="flex flex-wrap items-center justify-between text-sm text-gray-500">
                    <span>{new Date(order.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
                    <span className="text-lg font-bold text-gray-800">Rs {order.totalAmount}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
