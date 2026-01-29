import React from 'react';
import { useNavigate } from 'react-router-dom';

const Checkout = () => {
    const navigate = useNavigate();

    const handlePayment = () => {
        // giả lập thanh toán OK
        navigate('/payment-success');
    };

    return (
        <div>
            <h2>Checkout</h2>
            <button onClick={handlePayment}>
                Thanh toán
            </button>
        </div>
    );
};

export default Checkout;
