import React, { useState } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useCart } from '../contexts/CartContext';
import { useAuth } from '../contexts/AuthContext';
import { useLanguage } from '../contexts/LanguageContext';
import { FiMapPin, FiCreditCard, FiCheckCircle, FiShoppingCart, FiPhone } from 'react-icons/fi';
import { API_URL } from '@/lib/api';

export default function Checkout() {
    const { cart, cartTotal, clearCart } = useCart();
    const { user, token } = useAuth();
    const { language } = useLanguage();
    const router = useRouter();

    const [step, setStep] = useState(1); // 1=address, 2=payment, 3=confirmation
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [orderResult, setOrderResult] = useState(null);

    const [address, setAddress] = useState({
        street: user?.address?.street || '',
        village: user?.address?.village || '',
        city: user?.address?.city || '',
        district: user?.address?.district || '',
        state: user?.address?.state || 'Madhya Pradesh',
        pincode: user?.address?.pincode || ''
    });

    const [paymentMethod, setPaymentMethod] = useState('COD');
    const [upiTxnId, setUpiTxnId] = useState('');

    const deliveryCharge = cartTotal >= 500 ? 0 : 50;
    const total = cartTotal + deliveryCharge;

    if (!user) {
        if (typeof window !== 'undefined') router.replace('/');
        return null;
    }
    if (cart.length === 0 && !orderResult) {
        if (typeof window !== 'undefined') router.replace('/cart');
        return null;
    }

    const handlePlaceOrder = async () => {
        setLoading(true);
        setError('');
        try {
            const res = await fetch(`${API_URL}/orders`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
                body: JSON.stringify({
                    items: cart.map(item => ({
                        product: item._id || item.id,
                        quantity: item.quantity
                    })),
                    deliveryAddress: address,
                    paymentMethod,
                    notes: ''
                })
            });
            const data = await res.json();
            if (!res.ok) throw new Error(data.message);

            // If UPI, update payment status
            if (paymentMethod === 'UPI' && upiTxnId) {
                await fetch(`${API_URL}/orders/${data.order._id}/payment`, {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
                    body: JSON.stringify({ transactionId: upiTxnId, paymentStatus: 'Paid' })
                });
            }

            setOrderResult(data.order);
            clearCart();
            setStep(3);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <Head><title>{language === 'hi' ? 'चेकआउट — लक्ष्मी कृषि केंद्र' : 'Checkout — Laxmi Krishi Kendra'}</title></Head>

            <div className="max-w-3xl mx-auto px-4 py-8">
                {/* Steps */}
                <div className="flex items-center justify-center gap-4 mb-8">
                    {[
                        { n: 1, label: language === 'hi' ? 'पता' : 'Address', icon: <FiMapPin /> },
                        { n: 2, label: language === 'hi' ? 'भुगतान' : 'Payment', icon: <FiCreditCard /> },
                        { n: 3, label: language === 'hi' ? 'पुष्टि' : 'Done', icon: <FiCheckCircle /> }
                    ].map((s, i) => (
                        <React.Fragment key={s.n}>
                            {i > 0 && <div className={`w-12 h-0.5 ${step >= s.n ? 'bg-green-500' : 'bg-gray-200'}`}></div>}
                            <div className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold transition-all ${step >= s.n ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-400'}`}>
                                {s.icon} {s.label}
                            </div>
                        </React.Fragment>
                    ))}
                </div>

                {error && <div className="mb-6 p-4 bg-red-50 text-red-700 rounded-xl border border-red-200">{error}</div>}

                {/* Step 1: Address */}
                {step === 1 && (
                    <div className="bg-white rounded-2xl border border-gray-200 p-6">
                        <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2"><FiMapPin className="text-green-600" /> {language === 'hi' ? 'डिलीवरी पता' : 'Delivery Address'}</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {[
                                { key: 'street', label: language === 'hi' ? 'मकान/गली *' : 'Street *', required: true },
                                { key: 'village', label: language === 'hi' ? 'गाँव' : 'Village' },
                                { key: 'city', label: language === 'hi' ? 'शहर/तहसील *' : 'City *', required: true },
                                { key: 'district', label: language === 'hi' ? 'जिला' : 'District' },
                                { key: 'state', label: language === 'hi' ? 'राज्य' : 'State' },
                                { key: 'pincode', label: language === 'hi' ? 'पिनकोड *' : 'Pincode *', required: true }
                            ].map(field => (
                                <div key={field.key}>
                                    <label className="text-sm font-medium text-gray-700">{field.label}</label>
                                    <input type="text" value={address[field.key]}
                                        onChange={e => setAddress({ ...address, [field.key]: e.target.value })}
                                        className="mt-1 w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 outline-none transition"
                                    />
                                </div>
                            ))}
                        </div>
                        <button onClick={() => {
                            if (!address.street || !address.city || !address.pincode) { setError(language === 'hi' ? 'पता भरें (मकान, शहर, पिनकोड अनिवार्य)' : 'Fill address (street, city, pincode required)'); return; }
                            setError(''); setStep(2);
                        }}
                            className="mt-6 w-full py-3 bg-green-600 text-white rounded-xl font-semibold hover:bg-green-700 transition"
                        >
                            {language === 'hi' ? 'आगे बढ़ें' : 'Continue'} →
                        </button>
                    </div>
                )}

                {/* Step 2: Payment */}
                {step === 2 && (
                    <div className="bg-white rounded-2xl border border-gray-200 p-6">
                        <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2"><FiCreditCard className="text-green-600" /> {language === 'hi' ? 'भुगतान विधि' : 'Payment Method'}</h2>

                        <div className="space-y-4 mb-6">
                            {/* COD */}
                            <label className={`flex items-center gap-4 p-4 rounded-xl border-2 cursor-pointer transition ${paymentMethod === 'COD' ? 'border-green-500 bg-green-50' : 'border-gray-200 hover:border-gray-300'}`}>
                                <input type="radio" name="payment" value="COD" checked={paymentMethod === 'COD'} onChange={() => setPaymentMethod('COD')} className="w-5 h-5 text-green-600" />
                                <div className="flex-1">
                                    <p className="font-semibold text-gray-800">{language === 'hi' ? '💵 कैश ऑन डिलीवरी (COD)' : '💵 Cash on Delivery (COD)'}</p>
                                    <p className="text-sm text-gray-500">{language === 'hi' ? 'डिलीवरी के समय भुगतान करें' : 'Pay when your order arrives'}</p>
                                </div>
                            </label>

                            {/* UPI */}
                            <label className={`flex items-center gap-4 p-4 rounded-xl border-2 cursor-pointer transition ${paymentMethod === 'UPI' ? 'border-green-500 bg-green-50' : 'border-gray-200 hover:border-gray-300'}`}>
                                <input type="radio" name="payment" value="UPI" checked={paymentMethod === 'UPI'} onChange={() => setPaymentMethod('UPI')} className="w-5 h-5 text-green-600" />
                                <div className="flex-1">
                                    <p className="font-semibold text-gray-800">{language === 'hi' ? '📱 UPI भुगतान' : '📱 UPI Payment'}</p>
                                    <p className="text-sm text-gray-500">{language === 'hi' ? 'GPay/PhonePe/Paytm से भुगतान करें' : 'Pay via GPay/PhonePe/Paytm'}</p>
                                </div>
                            </label>
                        </div>

                        {/* UPI Details */}
                        {paymentMethod === 'UPI' && (
                            <div className="bg-blue-50 rounded-xl p-5 mb-6 border border-blue-200">
                                <p className="font-semibold text-blue-800 mb-3">{language === 'hi' ? 'UPI पर भुगतान करें:' : 'Pay to UPI:'}</p>
                                <div className="bg-white rounded-lg p-4 text-center mb-3">
                                    <p className="text-2xl font-bold text-gray-800 mb-1">9977938192@upi</p>
                                    <p className="text-sm text-gray-500">{language === 'hi' ? 'राशि' : 'Amount'}: <span className="font-bold text-green-600">₹{total}</span></p>
                                </div>
                                <div>
                                    <label className="text-sm font-medium text-blue-800">{language === 'hi' ? 'UPI ट्रांज़ैक्शन ID' : 'UPI Transaction ID'}</label>
                                    <input type="text" value={upiTxnId} onChange={e => setUpiTxnId(e.target.value)}
                                        placeholder={language === 'hi' ? 'भुगतान के बाद ID डालें' : 'Enter after payment'}
                                        className="mt-1 w-full px-4 py-2.5 border border-blue-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                                    />
                                </div>
                            </div>
                        )}

                        {/* Order Summary */}
                        <div className="bg-gray-50 rounded-xl p-4 mb-6 space-y-2 text-sm">
                            <div className="flex justify-between"><span>{language === 'hi' ? 'उप-योग' : 'Subtotal'}</span><span>₹{cartTotal}</span></div>
                            <div className="flex justify-between"><span>{language === 'hi' ? 'डिलीवरी' : 'Delivery'}</span><span>{deliveryCharge === 0 ? '🟢 Free' : `₹${deliveryCharge}`}</span></div>
                            <div className="flex justify-between font-bold text-lg border-t pt-2"><span>{language === 'hi' ? 'कुल' : 'Total'}</span><span className="text-green-600">₹{total}</span></div>
                        </div>

                        <div className="flex gap-3">
                            <button onClick={() => setStep(1)} className="flex-1 py-3 border border-gray-300 text-gray-700 rounded-xl font-semibold hover:bg-gray-50 transition">← {language === 'hi' ? 'पीछे' : 'Back'}</button>
                            <button onClick={handlePlaceOrder} disabled={loading}
                                className="flex-1 py-3 bg-gradient-to-r from-green-600 to-emerald-700 text-white rounded-xl font-semibold hover:shadow-xl disabled:opacity-50 transition flex items-center justify-center gap-2"
                            >
                                {loading ? <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></span> : (
                                    <>{language === 'hi' ? '✅ ऑर्डर करें' : '✅ Place Order'}</>
                                )}
                            </button>
                        </div>
                    </div>
                )}

                {/* Step 3: Confirmation */}
                {step === 3 && orderResult && (
                    <div className="bg-white rounded-2xl border border-gray-200 p-8 text-center">
                        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                            <FiCheckCircle size={40} className="text-green-600" />
                        </div>
                        <h2 className="text-2xl font-bold text-gray-800 mb-2">
                            {language === 'hi' ? '🎉 ऑर्डर सफल!' : '🎉 Order Placed!'}
                        </h2>
                        <p className="text-gray-600 mb-6">{language === 'hi' ? 'आपका ऑर्डर सफलतापूर्वक प्लेस हो गया है' : 'Your order has been placed successfully'}</p>

                        <div className="bg-green-50 rounded-xl p-4 mb-6 inline-block">
                            <p className="text-sm text-gray-600">{language === 'hi' ? 'ऑर्डर नंबर' : 'Order Number'}</p>
                            <p className="text-2xl font-bold text-green-700">{orderResult.orderNumber}</p>
                        </div>

                        <div className="grid grid-cols-2 gap-4 text-sm mb-6">
                            <div className="bg-gray-50 rounded-lg p-3">
                                <p className="text-gray-500">{language === 'hi' ? 'राशि' : 'Amount'}</p>
                                <p className="font-bold text-lg">₹{orderResult.totalAmount}</p>
                            </div>
                            <div className="bg-gray-50 rounded-lg p-3">
                                <p className="text-gray-500">{language === 'hi' ? 'भुगतान' : 'Payment'}</p>
                                <p className="font-bold text-lg">{orderResult.paymentMethod}</p>
                            </div>
                        </div>

                        <div className="flex gap-3 justify-center">
                            <button onClick={() => router.push('/my-orders')} className="px-6 py-3 bg-green-600 text-white rounded-xl font-semibold hover:bg-green-700 transition">
                                {language === 'hi' ? 'मेरे ऑर्डर देखें' : 'View My Orders'}
                            </button>
                            <button onClick={() => router.push('/products')} className="px-6 py-3 border border-gray-300 text-gray-700 rounded-xl font-semibold hover:bg-gray-50 transition">
                                {language === 'hi' ? 'और खरीदें' : 'Continue Shopping'}
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
}
