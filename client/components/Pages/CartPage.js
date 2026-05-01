/* eslint-disable @next/next/no-img-element */

import { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { FiArrowRight, FiGift, FiMinus, FiPackage, FiPlus, FiShoppingCart, FiTag, FiTrash2, FiTruck } from 'react-icons/fi';
import { useAuth } from '@/contexts/AuthContext';
import { useCart } from '@/contexts/CartContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { useToast } from '@/components/Common/ToastProvider';
import { API_URL } from '@/lib/api';

const COPY = {
  en: {
    title: 'Cart | Laxmi Krishi Kendra',
    emptyTitle: 'Your cart is empty',
    emptyDescription: 'Browse our trusted agricultural products and add items to your cart.',
    browseProducts: 'Browse Products',
    cropDoctor: 'Try Crop Doctor',
    heading: 'Shopping Cart',
    itemsLabel: 'items',
    subtotal: 'Subtotal',
    delivery: 'Delivery',
    free: 'Free',
    freeDeliveryNote: 'Free delivery on orders above ₹500',
    total: 'Total',
    checkout: 'Proceed to Order',
    clearAll: 'Clear all items',
    couponPlaceholder: 'Enter coupon code',
    applyCoupon: 'Apply',
    couponApplied: 'Coupon applied!',
    discount: 'Discount',
    youSave: 'You save',
    removeCoupon: 'Remove',
    freeDeliveryBanner: 'Free delivery on this order!',
    addMoreForFree: 'Add ₹{n} more for free delivery',
  },
  hi: {
    title: '\u0915\u093e\u0930\u094d\u091f | \u0932\u0915\u094d\u0937\u094d\u092e\u0940 \u0915\u0943\u0937\u093f \u0915\u0947\u0902\u0926\u094d\u0930',
    emptyTitle: '\u0906\u092a\u0915\u0940 \u0915\u093e\u0930\u094d\u091f \u0916\u093e\u0932\u0940 \u0939\u0948',
    emptyDescription: '\u0939\u092e\u093e\u0930\u0947 \u092d\u0930\u094b\u0938\u0947\u092e\u0902\u0926 \u0915\u0943\u0937\u093f \u0909\u0924\u094d\u092a\u093e\u0926 \u0926\u0947\u0916\u0947\u0902 \u0914\u0930 \u0915\u093e\u0930\u094d\u091f \u092e\u0947\u0902 \u091c\u094b\u0921\u093c\u0947\u0902\u0964',
    browseProducts: '\u0909\u0924\u094d\u092a\u093e\u0926 \u0926\u0947\u0916\u0947\u0902',
    cropDoctor: '\u092b\u0938\u0932 \u0921\u0949\u0915\u094d\u091f\u0930',
    heading: '\u0936\u0949\u092a\u093f\u0902\u0917 \u0915\u093e\u0930\u094d\u091f',
    itemsLabel: '\u0906\u0907\u091f\u092e',
    subtotal: '\u0915\u0941\u0932',
    delivery: '\u0921\u093f\u0932\u0940\u0935\u0930\u0940',
    free: '\u092e\u0941\u092b\u093c\u094d\u0924',
    freeDeliveryNote: '\u20b9500 \u0938\u0947 \u0905\u0927\u093f\u0915 \u0915\u0947 \u0911\u0930\u094d\u0921\u0930 \u092a\u0930 \u092e\u0941\u092b\u094d\u0924 \u0921\u093f\u0932\u0940\u0935\u0930\u0940',
    total: '\u0915\u0941\u0932 \u092f\u094b\u0917',
    checkout: '\u0911\u0930\u094d\u0921\u0930 \u0915\u0930\u0947\u0902',
    clearAll: '\u0938\u092c \u0939\u091f\u093e\u090f\u0902',
    couponPlaceholder: '\u0915\u0942\u092a\u0928 \u0915\u094b\u0921 \u0921\u093e\u0932\u0947\u0902',
    applyCoupon: '\u0932\u093e\u0917\u0942 \u0915\u0930\u0947\u0902',
    couponApplied: '\u0915\u0942\u092a\u0928 \u0932\u093e\u0917\u0942!',
    discount: '\u091b\u0942\u091f',
    youSave: '\u0906\u092a \u092c\u091a\u093e\u0924\u0947 \u0939\u0948\u0902',
    removeCoupon: '\u0939\u091f\u093e\u090f\u0902',
    freeDeliveryBanner: '\u0907\u0938 \u0911\u0930\u094d\u0921\u0930 \u092a\u0930 \u092e\u0941\u092b\u094d\u0924 \u0921\u093f\u0932\u0940\u0935\u0930\u0940!',
    addMoreForFree: '\u092e\u0941\u092b\u094d\u0924 \u0921\u093f\u0932\u0940\u0935\u0930\u0940 \u0915\u0947 \u0932\u093f\u090f \u20b9{n} \u0914\u0930 \u091c\u094b\u0921\u093c\u0947\u0902',
  }
};

export default function CartPage() {
  const { cart, removeFromCart, updateQuantity, clearCart, cartTotal } = useCart();
  const { user } = useAuth();
  const { language } = useLanguage();
  const { success: toastSuccess, error: toastError } = useToast();
  const router = useRouter();
  const copy = COPY[language] || COPY.en;
  const isHindi = language === 'hi';

  const [couponCode, setCouponCode] = useState('');
  const [couponData, setCouponData] = useState(null);
  const [couponLoading, setCouponLoading] = useState(false);

  const deliveryCharge = cartTotal >= 500 ? 0 : 50;
  const couponDiscount = couponData?.discount || 0;
  const total = cartTotal + deliveryCharge - couponDiscount;

  const handleApplyCoupon = async () => {
    if (!couponCode.trim()) return;
    setCouponLoading(true);
    try {
      const res = await fetch(`${API_URL}/coupons/validate`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code: couponCode.trim(), orderAmount: cartTotal }),
      });
      const data = await res.json();
      if (res.ok && data.valid) {
        setCouponData(data);
        toastSuccess(copy.couponApplied);
      } else {
        toastError(data.message || 'Invalid coupon');
        setCouponData(null);
      }
    } catch {
      toastError('Could not validate coupon');
    } finally {
      setCouponLoading(false);
    }
  };

  const removeCoupon = () => {
    setCouponData(null);
    setCouponCode('');
  };

  if (cart.length === 0) {
    return (
      <>
        <Head>
          <title>{copy.title}</title>
        </Head>

        <div className="flex min-h-[70vh] flex-col items-center justify-center px-4 pb-16 pt-28 text-center">
          {/* Animated empty cart icon */}
          <div className="relative mb-8">
            <div className="flex h-24 w-24 items-center justify-center rounded-3xl bg-gradient-to-br from-emerald-100 to-green-50 text-emerald-600 shadow-lg shadow-emerald-500/10">
              <FiShoppingCart size={40} className="animate-bounce" style={{ animationDuration: '3s' }} />
            </div>
            <div className="absolute -right-1 -top-1 flex h-8 w-8 items-center justify-center rounded-full bg-slate-200 text-xs font-bold text-slate-500">0</div>
          </div>

          <h1 className={`mb-3 text-2xl font-black text-ink-primary sm:text-3xl ${isHindi ? 'font-hindi' : ''}`}>{copy.emptyTitle}</h1>
          <p className={`mb-8 max-w-md text-base text-ink-muted ${isHindi ? 'font-hindi' : ''}`}>{copy.emptyDescription}</p>

          <div className="flex flex-col gap-3 sm:flex-row">
            <Link
              href="/products"
              className="inline-flex items-center gap-2 rounded-xl bg-accent-emerald px-6 py-3.5 font-bold text-white shadow-lg shadow-emerald-500/20 transition-all hover:bg-emerald-600 hover:shadow-xl"
            >
              <FiPackage size={18} /> {copy.browseProducts}
            </Link>
            <Link
              href="/crop-doctor"
              className="inline-flex items-center gap-2 rounded-xl border border-accent-emerald/30 px-6 py-3.5 font-bold text-accent-emerald transition-all hover:bg-accent-emerald/5"
            >
              {copy.cropDoctor}
            </Link>
          </div>

          {/* Helpful quick links */}
          <div className="mt-12 flex flex-wrap justify-center gap-4 text-sm text-ink-muted">
            <Link href="/advisory" className="transition hover:text-accent-emerald">Advisory →</Link>
            <Link href="/contact" className="transition hover:text-accent-emerald">Contact →</Link>
            <Link href="/about" className="transition hover:text-accent-emerald">About →</Link>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Head>
        <title>{copy.title}</title>
      </Head>

      <div className="mx-auto max-w-5xl px-3 pb-16 pt-24 sm:px-4 sm:pt-28">
        <h1 className={`mb-6 flex flex-wrap items-center gap-3 text-2xl font-black text-ink-primary sm:mb-8 sm:text-3xl ${isHindi ? 'font-hindi' : ''}`}>
          <FiShoppingCart className="text-accent-emerald" />
          {copy.heading}
          <span className="rounded-full bg-accent-emerald/10 px-3 py-1 text-sm font-bold text-accent-emerald">{cart.length} {copy.itemsLabel}</span>
        </h1>

        {/* Free delivery progress banner */}
        {cartTotal < 500 ? (
          <div className="mb-5 flex items-center gap-2 rounded-xl border border-amber-200/60 bg-amber-50/80 px-4 py-3 text-sm font-semibold text-amber-700">
            <FiTruck size={16} />
            {copy.addMoreForFree.replace('{n}', 500 - cartTotal)}
            <div className="ml-auto h-2 w-24 overflow-hidden rounded-full bg-amber-200">
              <div className="h-full rounded-full bg-amber-500 transition-all" style={{ width: `${(cartTotal / 500) * 100}%` }} />
            </div>
          </div>
        ) : (
          <div className="mb-5 flex items-center gap-2 rounded-xl border border-emerald-200/60 bg-emerald-50/80 px-4 py-3 text-sm font-semibold text-emerald-700">
            <FiTruck size={16} />
            {copy.freeDeliveryBanner}
          </div>
        )}

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          <div className="space-y-3 lg:col-span-2">
            {cart.map((item) => (
              <div key={item.id} className="rounded-xl border border-line-soft/10 bg-slate-card p-4 transition hover:shadow-lg hover:shadow-black/5">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                  <div className="flex h-20 w-20 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-slate-base/50 text-3xl">
                    {item.image?.startsWith('http') ? (
                      <img src={item.image} alt={item.name} className="h-full w-full rounded-xl object-cover" />
                    ) : (
                      <FiPackage size={28} className="text-ink-muted/40" />
                    )}
                  </div>

                  <div className="min-w-0 flex-1">
                    <h3 className={`truncate font-bold text-ink-primary ${isHindi ? 'font-hindi' : ''}`}>{item.name}</h3>
                    <p className="text-sm text-ink-muted">{item.category}</p>
                    <p className="font-bold text-accent-emerald">₹{item.price}</p>
                  </div>

                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="flex h-8 w-8 items-center justify-center rounded-lg border border-line-soft/10 bg-slate-base/60 text-ink-secondary transition hover:bg-slate-base"
                    >
                      <FiMinus size={14} />
                    </button>
                    <span className="w-8 text-center font-bold text-ink-primary">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="flex h-8 w-8 items-center justify-center rounded-lg border border-line-soft/10 bg-slate-base/60 text-ink-secondary transition hover:bg-slate-base"
                    >
                      <FiPlus size={14} />
                    </button>
                  </div>

                  <div className="min-w-[70px] text-left sm:text-right">
                    <p className="font-bold text-ink-primary">₹{item.price * item.quantity}</p>
                  </div>

                  <button onClick={() => removeFromCart(item.id)} className="self-start p-2 text-red-400 transition hover:text-red-600 sm:self-auto">
                    <FiTrash2 size={16} />
                  </button>
                </div>
              </div>
            ))}

            <button onClick={clearCart} className="text-sm font-semibold text-red-500 transition hover:text-red-700">
              {copy.clearAll}
            </button>
          </div>

          {/* Order summary + coupon */}
          <div className="h-fit rounded-2xl border border-line-soft/10 bg-slate-card p-5 shadow-xl shadow-black/5 sm:p-6 lg:sticky lg:top-24">
            <h2 className={`mb-4 text-lg font-black text-ink-primary ${isHindi ? 'font-hindi' : ''}`}>
              {copy.subtotal}
            </h2>

            {/* Coupon input */}
            <div className="mb-4 rounded-xl border border-line-soft/10 bg-slate-base/40 p-3">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-ink-muted">
                <FiTag size={12} /> {copy.couponPlaceholder}
              </div>
              {couponData ? (
                <div className="mt-2 flex items-center justify-between rounded-lg bg-accent-emerald/10 px-3 py-2">
                  <div className="flex items-center gap-2 text-sm font-bold text-accent-emerald">
                    <FiGift size={14} /> {couponData.code} — {copy.youSave} ₹{couponData.discount}
                  </div>
                  <button onClick={removeCoupon} className="text-xs font-bold text-red-500 hover:text-red-700">{copy.removeCoupon}</button>
                </div>
              ) : (
                <div className="mt-2 flex gap-2">
                  <input
                    type="text"
                    value={couponCode}
                    onChange={e => setCouponCode(e.target.value.toUpperCase())}
                    placeholder="SAVE10"
                    className="flex-1 rounded-lg border border-line-soft/10 bg-slate-card px-3 py-2 text-sm font-semibold text-ink-primary outline-none focus:border-accent-emerald"
                  />
                  <button
                    onClick={handleApplyCoupon}
                    disabled={couponLoading || !couponCode.trim()}
                    className="rounded-lg bg-accent-emerald px-4 py-2 text-xs font-bold text-white transition hover:bg-emerald-600 disabled:opacity-50"
                  >
                    {couponLoading ? '...' : copy.applyCoupon}
                  </button>
                </div>
              )}
            </div>

            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-ink-muted">{copy.subtotal}</span>
                <span className="font-bold text-ink-primary">₹{cartTotal}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-ink-muted">{copy.delivery}</span>
                <span className={`font-bold ${deliveryCharge === 0 ? 'text-accent-emerald' : 'text-ink-primary'}`}>
                  {deliveryCharge === 0 ? copy.free : `₹${deliveryCharge}`}
                </span>
              </div>
              {deliveryCharge > 0 && <p className="text-xs text-ink-muted">{copy.freeDeliveryNote}</p>}
              {couponDiscount > 0 && (
                <div className="flex justify-between text-accent-emerald">
                  <span className="font-semibold">{copy.discount}</span>
                  <span className="font-bold">-₹{couponDiscount}</span>
                </div>
              )}
              <div className="flex justify-between border-t border-line-soft/10 pt-3 text-lg font-black">
                <span className="text-ink-primary">{copy.total}</span>
                <span className="text-accent-emerald">₹{total}</span>
              </div>
            </div>

            <button
              onClick={() => router.push(user ? '/checkout' : '/login?redirect=/checkout')}
              className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-green-600 to-emerald-700 py-3.5 font-bold text-white shadow-lg shadow-emerald-500/20 transition-all hover:shadow-xl active:scale-[0.98]"
            >
              {copy.checkout} <FiArrowRight />
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
