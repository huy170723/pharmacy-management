import React from 'react';
import { useCart } from '../contexts/CartContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const CartPage = () => {
    // 1. Lấy dữ liệu 'cart' từ Context (Huy lưu ý tên biến là 'cart')
    const { cart, removeFromCart, clearCart, updateQuantity } = useCart();
    const navigate = useNavigate();

    const subtotal = cart.reduce((sum, p) => sum + (p.price * p.quantity), 0);
    const shipping = subtotal > 1000000 || subtotal === 0 ? 0 : 30000;
    const tax = subtotal * 0.1;
    const total = subtotal + shipping + tax;

    const handleQuantityChange = (id, newQuantity) => {
        if (newQuantity >= 1 && newQuantity <= 100) {
            updateQuantity(id, newQuantity);
        }
    };

    const handleCheckout = async () => {
        const userStr = localStorage.getItem("user");

        if (!userStr) {
            alert("Vui lòng đăng nhập để thanh toán!");
            navigate('/login');
            return;
        }

        const user = JSON.parse(userStr);

        // Kiểm tra xem user có 'id' không (đã fix từ 'userId' sang 'id' cho khớp Login)
        if (!user || !user.id) {
            console.log("Dữ liệu User hiện tại:", user);
            alert("Lỗi: Không tìm thấy ID người dùng! Huy hãy Đăng xuất và Đăng nhập lại để cập nhật ID nhé.");
            return;
        }

        try {
            const orderData = {
                userId: user.id,
                totalPrice: total,
                status: "PENDING",
                // ✅ FIX LỖI TẠI ĐÂY: Đổi 'cartItems' thành 'cart' cho khớp với khai báo ở trên
                items: cart.map(item => ({
                    productId: item.id,
                    productName: item.name,
                    price: item.price,
                    quantity: item.quantity
                }))
            };

            // Gọi API đến đúng Controller Huy đã viết
            await axios.post("http://localhost:8080/api/orders/checkout", orderData);

            alert("Thanh toán thành công! Đơn hàng của Nguyễn Đức Huy đã được ghi nhận.");
            clearCart();
            navigate('/');
        } catch (err) {
            console.error("Lỗi API thanh toán:", err);
            alert("Lỗi thanh toán: " + (err.response?.data || "Server không phản hồi"));
        }
    };

    if (cart.length === 0) return (
        <div style={styles.emptyContainer}>
            <div style={styles.emptyIcon}>🛒</div>
            <h3 style={styles.emptyTitle}>Giỏ hàng của Huy đang trống</h3>
            <button onClick={() => navigate('/')} style={styles.shopButton}>🛍️ Mua sắm ngay</button>
        </div>
    );

    return (
        <div style={styles.container}>
            <div style={styles.header}>
                <h1 style={styles.title}>🛒 Giỏ hàng</h1>
                <div style={styles.cartSummary}>
                    <span style={styles.summaryText}>{cart.length} sản phẩm</span>
                    <span style={styles.summaryText}>{total.toLocaleString()} đ</span>
                </div>
            </div>

            <div style={styles.content}>
                <div style={styles.productsSection}>
                    {cart.map(product => (
                        <div key={product.id} style={styles.productCard}>
                            <div style={styles.productInfo}>
                                <img
                                    src={product.imageUrl || 'https://via.placeholder.com/80'}
                                    alt={product.name}
                                    style={styles.productImg}
                                />
                                <div>
                                    <h4 style={styles.productName}>{product.name}</h4>
                                    <p style={styles.unitPrice}>{product.price.toLocaleString()} đ</p>
                                </div>
                            </div>

                            <div style={styles.quantityControl}>
                                <button onClick={() => handleQuantityChange(product.id, product.quantity - 1)} style={styles.quantityBtn}>−</button>
                                <input type="number" value={product.quantity} readOnly style={styles.quantityInput} />
                                <button onClick={() => handleQuantityChange(product.id, product.quantity + 1)} style={styles.quantityBtn}>+</button>
                            </div>

                            <div style={styles.totalCell}>
                                <span style={styles.itemTotalAmount}>{(product.price * product.quantity).toLocaleString()} đ</span>
                            </div>

                            <button onClick={() => removeFromCart(product.id)} style={styles.removeButton}>🗑️</button>
                        </div>
                    ))}
                    <button onClick={clearCart} style={styles.clearButton}>Xóa hết giỏ hàng</button>
                </div>

                <div style={styles.checkoutSection}>
                    <div style={styles.checkoutCard}>
                        <h3 style={styles.checkoutTitle}>Tóm tắt đơn hàng</h3>
                        <div style={styles.summaryRow}><span>Tạm tính</span><span>{subtotal.toLocaleString()} đ</span></div>
                        <div style={styles.summaryRow}><span>Phí ship</span><span>{shipping === 0 ? 'Miễn phí' : shipping.toLocaleString() + ' đ'}</span></div>
                        <div style={styles.summaryRow}><span>Thuế VAT (10%)</span><span>{tax.toLocaleString()} đ</span></div>
                        <div style={styles.totalRow}>
                            <span style={styles.totalLabel}>Tổng cộng</span>
                            <span style={styles.totalAmount}>{total.toLocaleString()} đ</span>
                        </div>
                        <button onClick={handleCheckout} style={styles.checkoutButton}>💳 Thanh toán ngay</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

// ... Styles giữ nguyên như bản của bạn ...
const styles = {
    container: { padding: '30px', backgroundColor: '#0f0f1a', minHeight: '100vh', color: '#e0e0e0' },
    emptyContainer: { textAlign: 'center', paddingTop: '100px' },
    emptyIcon: { fontSize: '80px', marginBottom: '20px' },
    emptyTitle: { color: '#fff', marginBottom: '20px' },
    shopButton: { backgroundColor: '#6366f1', color: '#fff', border: 'none', padding: '10px 20px', borderRadius: '8px', cursor: 'pointer' },
    header: { marginBottom: '30px' },
    title: { color: '#fff', fontSize: '28px' },
    cartSummary: { display: 'flex', gap: '10px', color: '#a0a0c0' },
    summaryText: { backgroundColor: '#1a1a2e', padding: '5px 15px', borderRadius: '20px' },
    content: { display: 'flex', flexWrap: 'wrap', gap: '20px' },
    productsSection: { flex: '1 1 600px', backgroundColor: '#1a1a2e', padding: '20px', borderRadius: '16px' },
    productCard: { display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '15px', backgroundColor: '#0a0a0f', borderRadius: '12px', marginBottom: '15px' },
    productInfo: { display: 'flex', alignItems: 'center', gap: '15px', width: '30%' },
    productImg: { width: '60px', height: '60px', borderRadius: '8px', objectFit: 'cover' },
    productName: { margin: 0, fontSize: '14px' },
    unitPrice: { margin: 0, fontSize: '12px', color: '#888' },
    quantityControl: { display: 'flex', alignItems: 'center', gap: '5px' },
    quantityBtn: { width: '30px', height: '30px', backgroundColor: '#1a1a2e', color: '#fff', border: '1px solid #333', cursor: 'pointer' },
    quantityInput: { width: '40px', textAlign: 'center', backgroundColor: '#0a0a0f', color: '#fff', border: 'none' },
    totalCell: { width: '100px', textAlign: 'right' },
    itemTotalAmount: { color: '#10b981', fontWeight: 'bold' },
    removeButton: { background: 'none', border: 'none', cursor: 'pointer', fontSize: '18px' },
    clearButton: { marginTop: '10px', background: 'none', color: '#ef4444', border: '1px solid #ef4444', padding: '5px 10px', cursor: 'pointer', borderRadius: '5px' },
    checkoutSection: { flex: '1 1 300px' },
    checkoutCard: { backgroundColor: '#1a1a2e', padding: '20px', borderRadius: '16px', border: '1px solid #2a2a3a' },
    checkoutTitle: { borderBottom: '1px solid #333', paddingBottom: '10px' },
    summaryRow: { display: 'flex', justifyContent: 'space-between', marginBottom: '10px', fontSize: '14px' },
    totalRow: { display: 'flex', justifyContent: 'space-between', marginTop: '20px', paddingTop: '10px', borderTop: '2px solid #333' },
    totalLabel: { fontSize: '18px', fontWeight: 'bold' },
    totalAmount: { fontSize: '18px', fontWeight: 'bold', color: '#10b981' },
    checkoutButton: { width: '100%', padding: '15px', backgroundColor: '#10b981', color: '#fff', border: 'none', borderRadius: '10px', marginTop: '20px', cursor: 'pointer', fontWeight: 'bold' },
    loading: { textAlign: 'center', padding: '100px', fontSize: '18px' }
};

export default CartPage;