import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { saveOrder } from '../api/orderStorage';

const PaymentSuccess = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user'));
        const cart = JSON.parse(localStorage.getItem('cart')) || [];

        if (!user) {
            navigate('/login');
            return;
        }

        const total = cart.reduce(
            (sum, item) => sum + item.price * item.quantity,
            0
        );

        const order = {
            id: Date.now(),
            items: cart,
            total,
            status: 'paid',
            createdAt: new Date().toISOString()
        };

        saveOrder(user.id, order);

        // clear cart
        localStorage.removeItem('cart');

        // chuyển sang profile
        setTimeout(() => {
            navigate('/profile');
        }, 1000);
    }, [navigate]);

    return (
        <div>
            <h2>Thanh toán thành công 🎉</h2>
            <p>Đang chuyển về trang cá nhân...</p>
        </div>
    );
};

export default PaymentSuccess;
