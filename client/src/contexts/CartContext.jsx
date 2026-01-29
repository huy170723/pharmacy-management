import React, { createContext, useContext, useState } from 'react';

const CartContext = createContext(undefined);

export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState([]);

    const addToCart = (product) => {
        setCart(prev => {
            const exist = prev.find(p => p.id === product.id);
            if (exist) {
                return prev.map(p =>
                    p.id === product.id
                        ? { ...p, quantity: p.quantity + 1 }
                        : p
                );
            }
            return [...prev, { ...product, quantity: 1 }];
        });
    };

    const removeFromCart = (id) => {
        setCart(prev => prev.filter(p => p.id !== id));
    };

    // --- BỔ SUNG HÀM NÀY ĐỂ FIX LỖI ---
    const updateQuantity = (id, newQuantity) => {
        setCart(prev =>
            prev.map(p =>
                p.id === id ? { ...p, quantity: Math.max(1, newQuantity) } : p
            )
        );
    };

    const clearCart = () => setCart([]);

    return (
        // --- PHẢI THÊM updateQuantity VÀO ĐÂY ---
        <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart, updateQuantity }}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => {
    const ctx = useContext(CartContext);
    return ctx;
};