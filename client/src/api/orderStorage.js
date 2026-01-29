// src/api/orderStorage.js

export const saveOrder = (userId, order) => {
    const key = `orders_${userId}`;
    const orders = JSON.parse(localStorage.getItem(key)) || [];
    orders.push(order);
    localStorage.setItem(key, JSON.stringify(orders));
};

export const getOrdersByUser = (userId) => {
    const key = `orders_${userId}`;
    return JSON.parse(localStorage.getItem(key)) || [];
};
