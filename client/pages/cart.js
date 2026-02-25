import React, { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useCart } from '../contexts/CartContext';
import { useAuth } from '../contexts/AuthContext';
import { useLanguage } from '../contexts/LanguageContext';
import { FiTrash2, FiPlus, FiMinus, FiShoppingCart, FiArrowRight, FiPackage } from 'react-icons/fi';

export default function CartPage() {
    const { cart, removeFromCart, updateQuantity, clearCart, cartTotal } = useCart();
    const { user } = useAuth();
    const { language } = useLanguage();
    const router = useRouter();

    if (cart.length === 0) {
        return (
            <>
                <Head><title>{language === 'hi' ? 'कार्ट — लक्ष्मी कृषि केंद्र' : 'Cart — Laxmi Krishi Kendra'}</title></Head>
                <div className="min-h-[60vh] flex flex-col items-center justify-center p-8">
                    <div className="text-6xl mb-6">🛒</div>
                    <h1 className="text-2xl font-bold text-gray-800 mb-2">
                        {language === 'hi' ? 'आपका कार्ट खाली है' : 'Your cart is empty'}
                    </h1>
                    <p className="text-gray-500 mb-6">{language === 'hi' ? 'उत्पाद जोड़ें और खरीदारी शुरू करें' : 'Add products to start shopping'}</p>
                    <Link href="/products" className="px-6 py-3 bg-green-600 text-white rounded-xl font-semibold hover:bg-green-700 transition flex items-center gap-2">
                        <FiPackage /> {language === 'hi' ? 'उत्पाद देखें' : 'Browse Products'}
                    </Link>
                </div>
            </>
        );
    }

    const deliveryCharge = cartTotal >= 500 ? 0 : 50;
    const total = cartTotal + deliveryCharge;

    return (
        <>
            <Head><title>{language === 'hi' ? 'कार्ट — लक्ष्मी कृषि केंद्र' : 'Cart — Laxmi Krishi Kendra'}</title></Head>

            <div className="max-w-5xl mx-auto px-4 py-8">
                <h1 className="text-3xl font-bold text-gray-800 mb-8 flex items-center gap-3">
                    <FiShoppingCart className="text-green-600" />
                    {language === 'hi' ? 'आपका कार्ट' : 'Your Cart'}
                    <span className="text-sm bg-green-100 text-green-700 px-3 py-1 rounded-full">{cart.length} {language === 'hi' ? 'आइटम' : 'items'}</span>
                </h1>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Cart Items */}
                    <div className="lg:col-span-2 space-y-4">
                        {cart.map((item) => (
                            <div key={item.id} className="bg-white rounded-xl border border-gray-200 p-4 flex items-center gap-4 hover:shadow-md transition">
                                <div className="w-20 h-20 bg-gray-100 rounded-lg flex items-center justify-center text-3xl shrink-0">
                                    {item.image?.startsWith('http') ? (
                                        <img src={item.image} alt={item.name} className="w-full h-full object-cover rounded-lg" />
                                    ) : (item.emoji || '📦')}
                                </div>
                                <div className="flex-1 min-w-0">
                                    <h3 className="font-semibold text-gray-800 truncate">{item.name}</h3>
                                    <p className="text-sm text-gray-500">{item.category}</p>
                                    <p className="font-bold text-green-600">₹{item.price}</p>
                                </div>
                                <div className="flex items-center gap-2">
                                    <button onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                        className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center hover:bg-gray-200 transition">
                                        <FiMinus size={14} />
                                    </button>
                                    <span className="w-8 text-center font-semibold">{item.quantity}</span>
                                    <button onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                        className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center hover:bg-gray-200 transition">
                                        <FiPlus size={14} />
                                    </button>
                                </div>
                                <div className="text-right min-w-[70px]">
                                    <p className="font-bold text-gray-800">₹{item.price * item.quantity}</p>
                                </div>
                                <button onClick={() => removeFromCart(item.id)} className="text-red-400 hover:text-red-600 p-2 transition">
                                    <FiTrash2 size={16} />
                                </button>
                            </div>
                        ))}
                        <button onClick={clearCart} className="text-sm text-red-500 hover:text-red-700 transition">
                            {language === 'hi' ? '🗑️ सब हटाएं' : '🗑️ Clear All'}
                        </button>
                    </div>

                    {/* Summary */}
                    <div className="bg-white rounded-2xl border border-gray-200 p-6 h-fit sticky top-24">
                        <h2 className="text-lg font-bold text-gray-800 mb-4">{language === 'hi' ? 'ऑर्डर सारांश' : 'Order Summary'}</h2>
                        <div className="space-y-3 text-sm">
                            <div className="flex justify-between"><span className="text-gray-600">{language === 'hi' ? 'उप-योग' : 'Subtotal'}</span><span className="font-semibold">₹{cartTotal}</span></div>
                            <div className="flex justify-between"><span className="text-gray-600">{language === 'hi' ? 'डिलीवरी' : 'Delivery'}</span>
                                <span className={deliveryCharge === 0 ? 'text-green-600 font-semibold' : 'font-semibold'}>
                                    {deliveryCharge === 0 ? (language === 'hi' ? 'मुफ्त' : 'Free') : `₹${deliveryCharge}`}
                                </span>
                            </div>
                            {deliveryCharge > 0 && <p className="text-xs text-gray-400">{language === 'hi' ? '₹500+ पर मुफ्त डिलीवरी' : 'Free delivery on ₹500+'}</p>}
                            <div className="border-t pt-3 flex justify-between text-lg font-bold">
                                <span>{language === 'hi' ? 'कुल' : 'Total'}</span>
                                <span className="text-green-600">₹{total}</span>
                            </div>
                        </div>
                        <button
                            onClick={() => user ? router.push('/checkout') : alert(language === 'hi' ? 'कृपया पहले लॉगिन करें' : 'Please login first')}
                            className="w-full mt-6 py-3 bg-gradient-to-r from-green-600 to-emerald-700 text-white rounded-xl font-semibold hover:shadow-xl transition-all flex items-center justify-center gap-2"
                        >
                            {language === 'hi' ? 'चेकआउट करें' : 'Proceed to Checkout'} <FiArrowRight />
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}
