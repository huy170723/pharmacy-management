import React, { useEffect, useState } from 'react';
import adminApi from '../../api/adminApi';

const OrderManager = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('ALL');
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    // Cấu hình màu sắc cho từng trạng thái
    const statusColors = {
        'PENDING': '#f59e0b',
        'PROCESSING': '#3b82f6',
        'SHIPPED': '#8b5cf6',
        'DELIVERED': '#10b981',
        'CANCELLED': '#ef4444',
        'REFUNDED': '#6b7280'
    };

    const statusLabels = {
        'PENDING': '⏳ Chờ xử lý',
        'PROCESSING': '🔄 Đang xử lý',
        'SHIPPED': '🚚 Đang giao',
        'DELIVERED': '✅ Đã giao',
        'CANCELLED': '❌ Đã hủy',
        'REFUNDED': '💰 Hoàn tiền'
    };

    // Hàm tải danh sách đơn hàng từ API
    const loadOrders = async () => {
        try {
            const res = await adminApi.getOrders();
            // Đảm bảo nhận mảng dữ liệu từ API admin
            setOrders(Array.isArray(res.data) ? res.data : []);
            setLoading(false);
        } catch (err) {
            console.error("Lỗi tải đơn hàng:", err);
            setOrders([]);
            setLoading(false);
        }
    };

    useEffect(() => {
        loadOrders();
    }, []);

    const handleDelete = async (id) => {
        if (window.confirm("⚠️ Bạn có chắc chắn muốn xóa đơn hàng này?")) {
            try {
                await adminApi.deleteOrder(id);
                alert("✅ Đã xóa đơn hàng thành công!");
                loadOrders();
            } catch (err) {
                alert("❌ Lỗi xóa: Kiểm tra ràng buộc dữ liệu tại Server!");
            }
        }
    };

    const updateOrderStatus = async (orderId, newStatus) => {
        try {
            await adminApi.updateOrderStatus(orderId, { status: newStatus });
            alert(`✅ Đã chuyển trạng thái sang: ${statusLabels[newStatus]}`);
            loadOrders();
        } catch (err) {
            alert("❌ Không thể cập nhật trạng thái!");
        }
    };

    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount || 0);
    };

    const formatDate = (dateString) => {
        if (!dateString) return 'N/A';
        const date = new Date(dateString);
        return date.toLocaleString('vi-VN');
    };

    // Logic lọc đơn hàng theo ID hoặc Email
    const filteredOrders = orders.filter(order => {
        const matchesSearch =
            order.id?.toString().includes(searchTerm) ||
            order.userEmail?.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesStatus = statusFilter === 'ALL' || order.status === statusFilter;
        return matchesSearch && matchesStatus;
    });

    // Phân trang đơn hàng
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentOrders = filteredOrders.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(filteredOrders.length / itemsPerPage);

    if (loading) return <div style={styles.loading}>Đang nạp dữ liệu đơn hàng cho Huy...</div>;

    return (
        <div style={styles.container}>
            <div style={styles.header}>
                <h2 style={styles.title}>📋 Quản lý Đơn hàng</h2>
                <div style={styles.filterBar}>
                    <input
                        type="text"
                        placeholder="Tìm theo ID hoặc Email..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        style={styles.searchInput}
                    />
                    <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} style={styles.selectInput}>
                        <option value="ALL">Tất cả trạng thái</option>
                        {Object.keys(statusLabels).map(key => (
                            <option key={key} value={key}>{statusLabels[key]}</option>
                        ))}
                    </select>
                </div>
            </div>

            <div style={styles.tableCard}>
                <table style={styles.table}>
                    <thead>
                        <tr>
                            <th style={styles.th}>ID</th>
                            <th style={styles.th}>KHÁCH HÀNG</th>
                            <th style={styles.th}>TỔNG TIỀN</th>
                            <th style={styles.th}>TRẠNG THÁI</th>
                            <th style={styles.th}>NGÀY ĐẶT</th>
                            <th style={styles.th}>THAO TÁC</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentOrders.map(order => (
                            <tr key={order.id} style={styles.tr}>
                                <td style={styles.td}>#{order.id}</td>
                                <td style={styles.td}>
                                    <div><strong>ID: {order.userId}</strong></div>
                                    <div style={{ fontSize: '12px', color: '#888' }}>{order.userEmail}</div>
                                </td>
                                <td style={styles.td}><span style={styles.priceText}>{formatCurrency(order.totalPrice)}</span></td>
                                <td style={styles.td}>
                                    <select
                                        value={order.status}
                                        onChange={(e) => updateOrderStatus(order.id, e.target.value)}
                                        style={{ ...styles.statusSelect, color: statusColors[order.status], borderColor: statusColors[order.status] }}
                                    >
                                        {Object.keys(statusLabels).map(key => (
                                            <option key={key} value={key}>{statusLabels[key]}</option>
                                        ))}
                                    </select>
                                </td>
                                <td style={styles.td}>{formatDate(order.orderDate)}</td>
                                <td style={styles.td}>
                                    <button onClick={() => setSelectedOrder(order)} style={styles.btnView}>👁️ Xem</button>

                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* MODAL CHI TIẾT ĐƠN HÀNG */}
            {selectedOrder && (
                <div style={styles.overlay} onClick={() => setSelectedOrder(null)}>
                    <div style={styles.modal} onClick={e => e.stopPropagation()}>
                        <h3>Chi tiết đơn hàng #{selectedOrder.id}</h3>
                        <hr style={{ opacity: 0.1 }} />
                        <div style={styles.modalBody}>
                            <p><strong>Khách hàng:</strong> {selectedOrder.userEmail} (ID: {selectedOrder.userId})</p>
                            <p><strong>Ngày tạo:</strong> {formatDate(selectedOrder.orderDate)}</p>
                            <h4>Sản phẩm:</h4>
                            {selectedOrder.items?.map((item, idx) => (
                                <div key={idx} style={styles.itemRow}>
                                    <span>{item.productName} (x{item.quantity})</span>
                                    <span>{formatCurrency(item.price * item.quantity)}</span>
                                </div>
                            ))}
                            <div style={styles.modalTotal}>
                                <strong>Tổng thanh toán: {formatCurrency(selectedOrder.totalPrice)}</strong>
                            </div>
                        </div>
                        <button onClick={() => setSelectedOrder(null)} style={styles.btnClose}>Đóng</button>
                    </div>
                </div>
            )}
        </div>
    );
};

const styles = {
    container: { padding: '20px', background: '#f8fafc', minHeight: '100vh' },
    header: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' },
    title: { margin: 0, color: '#1e293b' },
    filterBar: { display: 'flex', gap: '10px' },
    searchInput: { padding: '8px 15px', borderRadius: '8px', border: '1px solid #ddd' },
    selectInput: { padding: '8px', borderRadius: '8px', border: '1px solid #ddd' },
    tableCard: { background: '#fff', borderRadius: '12px', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)', overflow: 'hidden' },
    table: { width: '100%', borderCollapse: 'collapse' },
    th: { padding: '15px', background: '#f1f5f9', textAlign: 'left', color: '#64748b', fontSize: '13px' },
    td: { padding: '15px', borderBottom: '1px solid #f1f5f9', fontSize: '14px' },
    priceText: { color: '#10b981', fontWeight: 'bold' },
    statusSelect: { padding: '5px', borderRadius: '5px', fontWeight: '500', background: 'none' },
    btnView: { marginRight: '10px', padding: '5px 10px', borderRadius: '5px', border: '1px solid #6366f1', color: '#6366f1', cursor: 'pointer', background: '#fff' },
    btnDelete: { padding: '5px 10px', borderRadius: '5px', border: '1px solid #ef4444', color: '#ef4444', cursor: 'pointer', background: '#fff' },
    overlay: { position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1000 },
    modal: { background: '#fff', padding: '30px', borderRadius: '15px', width: '500px', boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1)' },
    itemRow: { display: 'flex', justifyContent: 'space-between', padding: '10px 0', borderBottom: '1px dashed #eee' },
    modalTotal: { marginTop: '20px', textAlign: 'right', fontSize: '18px', color: '#10b981' },
    btnClose: { marginTop: '20px', width: '100%', padding: '10px', borderRadius: '8px', border: 'none', background: '#64748b', color: '#fff', cursor: 'pointer' },
    loading: { textAlign: 'center', padding: '100px', color: '#64748b' }
};

export default OrderManager;