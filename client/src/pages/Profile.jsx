import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Profile = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    // Hàm gọi API lấy đơn hàng từ Backend (MySQL)
    const loadOrders = async (userId) => {
        try {
            const res = await axios.get(`http://localhost:8080/api/orders/client/${userId}`);
            const data = res.data || [];
            // Sắp xếp đơn hàng mới nhất lên đầu
            data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
            setOrders(data);
        } catch (err) {
            console.error("Lỗi tải lịch sử đơn hàng:", err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        // Lấy dữ liệu user từ kho
        const userData = JSON.parse(localStorage.getItem('user'));

        // ✅ CHỈ ĐUỔI KHI THỰC SỰ ĐÉO CÓ USER TRONG KHO
        if (!userData) {
            navigate('/login');
            return;
        }

        setUser(userData);

        // ✅ CÓ ID THÌ LOAD ĐƠN HÀNG, KHÔNG CÓ THÌ CHỈ HIỂN THỊ INFO CƠ BẢN (KHÔNG VĂNG)
        if (userData.id) {
            loadOrders(userData.id);
        } else {
            setLoading(false);
        }
    }, [navigate]);

    return (
        <div style={{ padding: '40px 20px', maxWidth: '900px', margin: '0 auto', fontFamily: 'Arial, sans-serif' }}>
            <h2 style={{ color: '#1250dc', borderBottom: '2px solid #1250dc', paddingBottom: '10px' }}>
                👤 Hồ sơ cá nhân của bạn
            </h2>

            {/* THÔNG TIN USER */}
            <div style={{ background: '#f8f9fa', padding: '25px', borderRadius: '12px', marginBottom: '30px', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '150px 1fr', gap: '10px' }}>
                    <p><b>Họ và tên:</b></p> <p>{user?.name || "Nguyễn Đức Huy"}</p>
                    <p><b>Email:</b></p> <p>{user?.email || "Chưa cập nhật"}</p>
                    <p><b>Trạng thái:</b></p> <p><span style={{ color: '#27ae60', fontWeight: 'bold' }}>Đã đăng nhập</span></p>
                </div>
            </div>

            <h3 style={{ color: '#2c3e50', marginBottom: '20px' }}>🛍️ Lịch sử mua thuốc & Sản phẩm</h3>

            {loading ? (
                <p>Đang tải đơn hàng...</p>
            ) : orders.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '40px', background: '#fff', borderRadius: '12px', border: '1px dashed #ccc' }}>
                    <p style={{ color: '#7f8c8d' }}>Huy chưa có đơn hàng nào trong hệ thống.</p>
                </div>
            ) : (
                orders.map(order => (
                    <div
                        key={order.id}
                        style={{
                            border: '1px solid #e1e8ed',
                            padding: '20px',
                            marginBottom: '20px',
                            borderRadius: '12px',
                            backgroundColor: '#fff',
                            boxShadow: '0 4px 6px rgba(0,0,0,0.02)'
                        }}
                    >
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '15px', borderBottom: '1px solid #f1f1f1', paddingBottom: '10px' }}>
                            <span><b>Mã đơn:</b> <span style={{ color: '#1250dc' }}>#{order.id}</span></span>
                            <span style={{ color: '#666', fontSize: '14px' }}>
                                📅 {new Date(order.createdAt).toLocaleString()}
                            </span>
                        </div>

                        {/* DANH SÁCH SẢN PHẨM TRONG ĐƠN */}
                        <div style={{ background: '#f9fafb', padding: '15px', borderRadius: '8px', marginBottom: '15px' }}>
                            {order.items?.map((item, index) => (
                                <div key={index} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px', marginBottom: '5px' }}>
                                    <span>{item.productName} <b>x{item.quantity}</b></span>
                                    <span>{item.price?.toLocaleString()} đ</span>
                                </div>
                            ))}
                        </div>

                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <div>
                                <b>Trạng thái:</b>{' '}
                                <span style={{
                                    padding: '4px 12px',
                                    borderRadius: '20px',
                                    fontSize: '12px',
                                    fontWeight: 'bold',
                                    backgroundColor: '#e8f5e9',
                                    color: '#2e7d32'
                                }}>
                                    {order.status || 'Thành công'}
                                </span>
                            </div>
                            <div style={{ fontSize: '18px', color: '#e74c3c', fontWeight: 'bold' }}>
                                Tổng: {order.totalPrice?.toLocaleString()} đ
                            </div>
                        </div>
                    </div>
                ))
            )}
        </div>
    );
};

export default Profile;