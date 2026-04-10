import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useAuth } from '../contexts/AuthContext';
import { useLanguage } from '../contexts/LanguageContext';
import { FiPackage, FiClock, FiCheckCircle, FiTruck, FiXCircle } from 'react-icons/fi';

import { API_URL } from '@/lib/api';

export default function MyOrders() {
    const { user, token, loading: authLoading } = useAuth();
    const { language } = useLanguage();
    const router = useRouter();
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!authLoading && !user) router.replace('/');
    }, [user, authLoading]);

    useEffect(() => {
        if (token) fetchOrders();
    }, [token]);

    const fetchOrders = async () => {
        try {
            const res = await fetch(`${API_URL}/orders/my-orders`, { headers: { 'Authorization': `Bearer ${token}` } });
            if (res.ok) setOrders(await res.json());
        } catch (err) { console.error(err); }
        finally { setLoading(false); }
    };

    const statusIcon = { Pending: <FiClock className="text-yellow-600" />, Confirmed: <FiCheckCircle className="text-blue-600" />, Shipped: <FiTruck className="text-purple-600" />, Delivered: <FiCheckCircle className="text-green-600" />, Cancelled: <FiXCircle className="text-red-600" /> };
    const statusColor = { Pending: 'bg-yellow-100 text-yellow-700', Confirmed: 'bg-blue-100 text-blue-700', Shipped: 'bg-purple-100 text-purple-700', Delivered: 'bg-green-100 text-green-700', Cancelled: 'bg-red-100 text-red-700' };
    const paymentColor = { Pending: 'text-yellow-600', Paid: 'text-green-600', Failed: 'text-red-600' };

    if (authLoading || loading) return <div className="min-h-[60vh] flex items-center justify-center"><div className="w-10 h-10 border-4 border-green-600 border-t-transparent rounded-full animate-spin"></div></div>;

    return (
        <>
            <Head><title>{language === 'hi' ? 'मेरे ऑर्डर' : 'My Orders'}</title></Head>
            <div className="max-w-4xl mx-auto px-4 py-8">
                <h1 className="text-3xl font-bold text-gray-800 mb-8 flex items-center gap-3"><FiPackage className="text-green-600" /> {language === 'hi' ? 'मेरे ऑर्डर' : 'My Orders'}</h1>

                {orders.length === 0 ? (
                    <div className="text-center py-16">
                        <div className="text-5xl mb-4">📦</div>
                        <p className="text-gray-500 text-lg">{language === 'hi' ? 'अभी कोई ऑर्डर नहीं' : 'No orders yet'}</p>
                    </div>
                ) : (
                    <div className="space-y-4">
                        {orders.map(order => (
                            <div key={order._id} className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-md transition">
                                <div className="p-5">
                                    <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
                                        <div>
                                            <span className="text-sm text-gray-500">{language === 'hi' ? 'ऑर्डर' : 'Order'}</span>
                                            <h3 className="font-bold text-green-700">{order.orderNumber}</h3>
                                        </div>
                                        <div className="flex gap-2">
                                            <span className={`px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1 ${statusColor[order.orderStatus]}`}>
                                                {statusIcon[order.orderStatus]} {order.orderStatus}
                                            </span>
                                            <span className={`px-3 py-1 rounded-full text-xs font-semibold bg-gray-100 ${paymentColor[order.paymentStatus]}`}>
                                                {order.paymentMethod} • {order.paymentStatus}
                                            </span>
                                        </div>
                                    </div>

                                    <div className="flex flex-wrap gap-3 mb-3">
                                        {order.items?.map((item, i) => (
                                            <div key={i} className="flex items-center gap-2 bg-gray-50 rounded-lg px-3 py-2 text-sm">
                                                <span>📦</span>
                                                <span className="font-medium">{item.name}</span>
                                                <span className="text-gray-400">×{item.quantity}</span>
                                            </div>
                                        ))}
                                    </div>

                                    <div className="flex flex-wrap justify-between items-center text-sm text-gray-500">
                                        <span>{new Date(order.createdAt).toLocaleDateString('hi-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
                                        <span className="text-lg font-bold text-gray-800">₹{order.totalAmount}</span>
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
