import { useEffect, useState } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { FiCheckCircle, FiCreditCard, FiMapPin } from 'react-icons/fi';
import { API_URL } from '@/lib/api';
import { useAuth } from '@/contexts/AuthContext';
import { useCart } from '@/contexts/CartContext';

function isValidProductId(value) {
  return typeof value === 'string' && /^[a-f\d]{24}$/i.test(value);
}

export default function CheckoutPage() {
  const router = useRouter();
  const { cart, cartTotal, clearCart } = useCart();
  const { user, token, loading: authLoading } = useAuth();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [orderResult, setOrderResult] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState('COD');
  const [upiTxnId, setUpiTxnId] = useState('');
  const [address, setAddress] = useState({
    street: user?.address?.street || '',
    village: user?.address?.village || '',
    city: user?.address?.city || '',
    district: user?.address?.district || '',
    state: user?.address?.state || 'Madhya Pradesh',
    pincode: user?.address?.pincode || '',
  });

  const deliveryCharge = cartTotal >= 500 ? 0 : 50;
  const total = cartTotal + deliveryCharge;

  useEffect(() => {
    if (!authLoading && !user) {
      router.replace('/login?redirect=/checkout');
    }
  }, [authLoading, router, user]);

  useEffect(() => {
    if (!orderResult && cart.length === 0) {
      router.replace('/cart');
    }
  }, [cart.length, orderResult, router]);

  const handlePlaceOrder = async () => {
    setLoading(true);
    setError('');

    try {
      const invalidItems = cart.filter((item) => !isValidProductId(String(item._id || item.id || '')));
      if (invalidItems.length > 0) {
        throw new Error('Some cart items are demo or unavailable products. Please remove them and add real store products before placing the order.');
      }

      const response = await fetch(`${API_URL}/orders`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          items: cart.map((item) => ({
            product: item._id || item.id,
            quantity: item.quantity,
          })),
          deliveryAddress: address,
          paymentMethod,
          notes: '',
        }),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || 'Unable to place order.');
      }

      if (paymentMethod === 'UPI' && upiTxnId) {
        await fetch(`${API_URL}/orders/${data.order._id}/payment`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ transactionId: upiTxnId, paymentStatus: 'Paid' }),
        });
      }

      setOrderResult(data.order);
      clearCart();
      setStep(3);
    } catch (submitError) {
      setError(submitError.message || 'Unable to place order.');
    } finally {
      setLoading(false);
    }
  };

  if (authLoading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center px-4 pt-24 sm:pt-28">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-green-600 border-t-transparent" />
      </div>
    );
  }

  if (!user) {
    return <div className="flex min-h-[60vh] items-center justify-center px-4 pt-24 text-center text-gray-500 sm:pt-28">Redirecting to login...</div>;
  }

  return (
    <>
      <Head>
        <title>Checkout | Laxmi Krishi Kendra</title>
      </Head>

      <div className="mx-auto max-w-3xl px-4 pb-16 pt-24 sm:py-8 sm:pt-28">
        <div className="mb-8 flex flex-wrap items-center justify-center gap-3 sm:gap-4">
          {[
            { n: 1, label: 'Address', icon: <FiMapPin /> },
            { n: 2, label: 'Payment', icon: <FiCreditCard /> },
            { n: 3, label: 'Done', icon: <FiCheckCircle /> },
          ].map((item, index) => (
            <div key={item.n} className="flex items-center gap-4">
              {index > 0 ? <div className={`hidden h-0.5 w-12 sm:block ${step >= item.n ? 'bg-green-500' : 'bg-gray-200'}`} /> : null}
              <div className={`flex items-center gap-2 rounded-full px-3 py-2 text-xs font-semibold sm:px-4 sm:text-sm ${step >= item.n ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-400'}`}>
                {item.icon} {item.label}
              </div>
            </div>
          ))}
        </div>

        {error ? <div className="mb-6 rounded-xl border border-red-200 bg-red-50 p-4 text-red-700">{error}</div> : null}

        {step === 1 ? (
          <div className="rounded-2xl border border-gray-200 bg-white p-5 sm:p-6">
            <h2 className="mb-6 flex items-center gap-2 text-xl font-bold text-gray-800">
              <FiMapPin className="text-green-600" /> Delivery Address
            </h2>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              {[
                { key: 'street', label: 'Street *' },
                { key: 'village', label: 'Village' },
                { key: 'city', label: 'City *' },
                { key: 'district', label: 'District' },
                { key: 'state', label: 'State' },
                { key: 'pincode', label: 'Pincode *' },
              ].map((field) => (
                <div key={field.key}>
                  <label className="text-sm font-medium text-gray-700">{field.label}</label>
                  <input
                    type="text"
                    value={address[field.key]}
                    onChange={(event) => setAddress({ ...address, [field.key]: event.target.value })}
                    className="mt-1 w-full rounded-lg border border-gray-300 px-4 py-2.5 outline-none transition focus:ring-2 focus:ring-green-500"
                  />
                </div>
              ))}
            </div>

            <button
              onClick={() => {
                if (!address.street || !address.city || !address.pincode) {
                  setError('Fill street, city, and pincode before continuing.');
                  return;
                }

                setError('');
                setStep(2);
              }}
              className="mt-6 w-full rounded-xl bg-green-600 py-3 font-semibold text-white transition hover:bg-green-700"
            >
              Continue
            </button>
          </div>
        ) : null}

        {step === 2 ? (
          <div className="rounded-2xl border border-gray-200 bg-white p-5 sm:p-6">
            <h2 className="mb-6 flex items-center gap-2 text-xl font-bold text-gray-800">
              <FiCreditCard className="text-green-600" /> Payment Method
            </h2>

            <div className="mb-6 space-y-4">
              {[
                {
                  value: 'COD',
                  title: 'Cash on Delivery',
                  description: 'Pay when your order arrives.',
                },
                {
                  value: 'UPI',
                  title: 'UPI Payment',
                  description: 'Pay via GPay, PhonePe, or Paytm.',
                },
              ].map((option) => (
                <label
                  key={option.value}
                  className={`flex cursor-pointer items-center gap-4 rounded-xl border-2 p-4 transition ${
                    paymentMethod === option.value ? 'border-green-500 bg-green-50' : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <input
                    type="radio"
                    name="payment"
                    value={option.value}
                    checked={paymentMethod === option.value}
                    onChange={() => setPaymentMethod(option.value)}
                    className="h-5 w-5 text-green-600"
                  />
                  <div className="flex-1">
                    <p className="font-semibold text-gray-800">{option.title}</p>
                    <p className="text-sm text-gray-500">{option.description}</p>
                  </div>
                </label>
              ))}
            </div>

            {paymentMethod === 'UPI' ? (
              <div className="mb-6 rounded-xl border border-blue-200 bg-blue-50 p-5">
                <p className="mb-3 font-semibold text-blue-800">Pay to this UPI</p>
                <div className="mb-3 rounded-lg bg-white p-4 text-center">
                  <p className="mb-1 text-2xl font-bold text-gray-800">9977938192@upi</p>
                  <p className="text-sm text-gray-500">
                    Amount: <span className="font-bold text-green-600">Rs {total}</span>
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium text-blue-800">UPI Transaction ID</label>
                  <input
                    type="text"
                    value={upiTxnId}
                    onChange={(event) => setUpiTxnId(event.target.value)}
                    placeholder="Enter after payment"
                    className="mt-1 w-full rounded-lg border border-blue-300 px-4 py-2.5 outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
            ) : null}

            <div className="mb-6 space-y-2 rounded-xl bg-gray-50 p-4 text-sm">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>Rs {cartTotal}</span>
              </div>
              <div className="flex justify-between">
                <span>Delivery</span>
                <span>{deliveryCharge === 0 ? 'Free' : `Rs ${deliveryCharge}`}</span>
              </div>
              <div className="flex justify-between border-t pt-2 text-lg font-bold">
                <span>Total</span>
                <span className="text-green-600">Rs {total}</span>
              </div>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">
              <button onClick={() => setStep(1)} className="flex-1 rounded-xl border border-gray-300 py-3 font-semibold text-gray-700 transition hover:bg-gray-50">
                Back
              </button>
              <button
                onClick={handlePlaceOrder}
                disabled={loading}
                className="flex-1 rounded-xl bg-gradient-to-r from-green-600 to-emerald-700 py-3 font-semibold text-white transition hover:shadow-xl disabled:opacity-50"
              >
                {loading ? 'Placing order...' : 'Place Order'}
              </button>
            </div>
          </div>
        ) : null}

        {step === 3 && orderResult ? (
          <div className="rounded-2xl border border-gray-200 bg-white p-6 text-center sm:p-8">
            <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-green-100">
              <FiCheckCircle size={40} className="text-green-600" />
            </div>
            <h2 className="mb-2 text-2xl font-bold text-gray-800">Order placed successfully</h2>
            <p className="mb-6 text-gray-600">Your order has been submitted to the store.</p>

            <div className="mb-6 inline-block rounded-xl bg-green-50 p-4">
              <p className="text-sm text-gray-600">Order Number</p>
              <p className="text-2xl font-bold text-green-700">{orderResult.orderNumber}</p>
            </div>

            <div className="mb-6 grid grid-cols-1 gap-4 text-sm sm:grid-cols-2">
              <div className="rounded-lg bg-gray-50 p-3">
                <p className="text-gray-500">Amount</p>
                <p className="text-lg font-bold">Rs {orderResult.totalAmount}</p>
              </div>
              <div className="rounded-lg bg-gray-50 p-3">
                <p className="text-gray-500">Payment</p>
                <p className="text-lg font-bold">{orderResult.paymentMethod}</p>
              </div>
            </div>

            <div className="flex flex-col justify-center gap-3 sm:flex-row">
              <button onClick={() => router.push('/my-orders')} className="rounded-xl bg-green-600 px-6 py-3 font-semibold text-white transition hover:bg-green-700">
                View My Orders
              </button>
              <button onClick={() => router.push('/products')} className="rounded-xl border border-gray-300 px-6 py-3 font-semibold text-gray-700 transition hover:bg-gray-50">
                Continue Shopping
              </button>
            </div>
          </div>
        ) : null}
      </div>
    </>
  );
}
