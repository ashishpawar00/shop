/* eslint-disable @next/next/no-img-element */

import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { FiArrowRight, FiMinus, FiPackage, FiPlus, FiShoppingCart, FiTrash2 } from 'react-icons/fi';
import { useAuth } from '@/contexts/AuthContext';
import { useCart } from '@/contexts/CartContext';

export default function CartPage() {
  const { cart, removeFromCart, updateQuantity, clearCart, cartTotal } = useCart();
  const { user } = useAuth();
  const router = useRouter();

  if (cart.length === 0) {
    return (
      <>
        <Head>
          <title>Cart | Laxmi Krishi Kendra</title>
        </Head>

        <div className="flex min-h-[60vh] flex-col items-center justify-center p-8">
          <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-green-100 text-green-700">
            <FiShoppingCart size={34} />
          </div>
          <h1 className="mb-2 text-2xl font-bold text-gray-800">Your cart is empty</h1>
          <p className="mb-6 text-gray-500">Add products to start shopping.</p>
          <Link
            href="/products"
            className="inline-flex items-center gap-2 rounded-xl bg-green-600 px-6 py-3 font-semibold text-white transition hover:bg-green-700"
          >
            <FiPackage /> Browse Products
          </Link>
        </div>
      </>
    );
  }

  const deliveryCharge = cartTotal >= 500 ? 0 : 50;
  const total = cartTotal + deliveryCharge;

  return (
    <>
      <Head>
        <title>Cart | Laxmi Krishi Kendra</title>
      </Head>

      <div className="mx-auto max-w-5xl px-4 py-8">
        <h1 className="mb-8 flex items-center gap-3 text-3xl font-bold text-gray-800">
          <FiShoppingCart className="text-green-600" />
          Your Cart
          <span className="rounded-full bg-green-100 px-3 py-1 text-sm text-green-700">{cart.length} items</span>
        </h1>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          <div className="space-y-4 lg:col-span-2">
            {cart.map((item) => (
              <div key={item.id} className="flex items-center gap-4 rounded-xl border border-gray-200 bg-white p-4 transition hover:shadow-md">
                <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-lg bg-gray-100 text-3xl">
                  {item.image?.startsWith('http') ? (
                    <img src={item.image} alt={item.name} className="h-full w-full rounded-lg object-cover" />
                  ) : (
                    item.emoji || 'Item'
                  )}
                </div>

                <div className="min-w-0 flex-1">
                  <h3 className="truncate font-semibold text-gray-800">{item.name}</h3>
                  <p className="text-sm text-gray-500">{item.category}</p>
                  <p className="font-bold text-green-600">Rs {item.price}</p>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    className="flex h-8 w-8 items-center justify-center rounded-lg bg-gray-100 transition hover:bg-gray-200"
                  >
                    <FiMinus size={14} />
                  </button>
                  <span className="w-8 text-center font-semibold">{item.quantity}</span>
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    className="flex h-8 w-8 items-center justify-center rounded-lg bg-gray-100 transition hover:bg-gray-200"
                  >
                    <FiPlus size={14} />
                  </button>
                </div>

                <div className="min-w-[70px] text-right">
                  <p className="font-bold text-gray-800">Rs {item.price * item.quantity}</p>
                </div>

                <button onClick={() => removeFromCart(item.id)} className="p-2 text-red-400 transition hover:text-red-600">
                  <FiTrash2 size={16} />
                </button>
              </div>
            ))}

            <button onClick={clearCart} className="text-sm text-red-500 transition hover:text-red-700">
              Clear All
            </button>
          </div>

          <div className="sticky top-24 h-fit rounded-2xl border border-gray-200 bg-white p-6">
            <h2 className="mb-4 text-lg font-bold text-gray-800">Order Summary</h2>

            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Subtotal</span>
                <span className="font-semibold">Rs {cartTotal}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Delivery</span>
                <span className={deliveryCharge === 0 ? 'font-semibold text-green-600' : 'font-semibold'}>
                  {deliveryCharge === 0 ? 'Free' : `Rs ${deliveryCharge}`}
                </span>
              </div>
              {deliveryCharge > 0 ? <p className="text-xs text-gray-400">Free delivery on Rs 500+</p> : null}
              <div className="flex justify-between border-t pt-3 text-lg font-bold">
                <span>Total</span>
                <span className="text-green-600">Rs {total}</span>
              </div>
            </div>

            <button
              onClick={() => router.push(user ? '/checkout' : '/login?redirect=/checkout')}
              className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-green-600 to-emerald-700 py-3 font-semibold text-white transition-all hover:shadow-xl"
            >
              Proceed to Checkout <FiArrowRight />
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
