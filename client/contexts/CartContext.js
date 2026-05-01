import { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext(null);
const PRODUCT_ID_RE = /^[a-f\d]{24}$/i;

function isValidProductId(value) {
    return typeof value === 'string' && PRODUCT_ID_RE.test(value);
}

export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState([]);

    // Load cart from localStorage
    useEffect(() => {
        if (typeof window !== 'undefined') {
            const saved = localStorage.getItem('lkk_cart');
            if (saved) {
                try {
                    const parsed = JSON.parse(saved);
                    const sanitized = Array.isArray(parsed)
                        ? parsed.filter(item => isValidProductId(String(item?._id || item?.id || '')))
                        : [];
                    setCart(sanitized);
                } catch (e) { /* ignore */ }
            }
        }
    }, []);

    // Save to localStorage
    useEffect(() => {
        if (typeof window !== 'undefined' && cart.length > 0) {
            localStorage.setItem('lkk_cart', JSON.stringify(cart));
        }
        if (cart.length === 0 && typeof window !== 'undefined') {
            localStorage.removeItem('lkk_cart');
        }
    }, [cart]);

    const addToCart = (product, qty = 1) => {
        const productId = String(product?._id || product?.id || '');
        if (!isValidProductId(productId)) {
            return;
        }

        setCart(prev => {
            const existing = prev.find(item => item.id === productId);
            if (existing) {
                return prev.map(item =>
                    item.id === productId
                        ? { ...item, quantity: item.quantity + qty }
                        : item
                );
            }
            return [...prev, { ...product, id: productId, _id: productId, quantity: qty }];
        });
    };

    const removeFromCart = (id) => {
        setCart(prev => prev.filter(item => item.id !== id));
    };

    const updateQuantity = (id, quantity) => {
        if (quantity <= 0) { removeFromCart(id); return; }
        setCart(prev => prev.map(item =>
            item.id === id ? { ...item, quantity } : item
        ));
    };

    const clearCart = () => {
        setCart([]);
        if (typeof window !== 'undefined') localStorage.removeItem('lkk_cart');
    };

    const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
    const cartTotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

    return (
        <CartContext.Provider value={{
            cart, addToCart, removeFromCart, updateQuantity, clearCart,
            cartCount, cartTotal
        }}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => useContext(CartContext);
