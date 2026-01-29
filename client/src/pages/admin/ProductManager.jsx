import React, { useEffect, useState } from 'react';
import adminApi from '../../api/adminApi';

const ProductManager = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(10);

    // State quản lý Form với giá trị mặc định để tránh lỗi 'uncontrolled'
    const [isEdit, setIsEdit] = useState(false);
    const [selectedId, setSelectedId] = useState(null);
    const [formData, setFormData] = useState({
        name: '',
        price: '',
        image_url: '',
        stock: '',
        specifications: ''
    });

    // 1. Lấy danh sách sản phẩm từ Backend
    const loadProducts = async () => {
        try {
            const res = await adminApi.getProducts();
            // Axios trả về dữ liệu trong thuộc tính .data
            setProducts(res.data || []);
            setLoading(false);
        } catch (err) {
            console.error("Lỗi kết nối API:", err);
            setLoading(false);
        }
    };

    useEffect(() => {
        loadProducts();
    }, []);

    // 2. Xử lý Thêm hoặc Cập nhật sản phẩm
    const handleSubmit = async (e) => {
        e.preventDefault();

        // Chuẩn bị dữ liệu gửi đi
        const dataToSend = {
            ...formData,
            // Ép kiểu số để tránh lỗi Type Mismatch ở Backend
            price: parseFloat(formData.price) || 0,
            stock: parseInt(formData.stock) || 0,
            // Bỏ qua trường ảnh: Nếu không nhập, gửi chuỗi rỗng thay vì null
            image_url: formData.image_url || ''
        };

        try {
            if (isEdit) {
                await adminApi.updateProduct(selectedId, dataToSend);
            } else {
                await adminApi.createProduct(dataToSend);
            }
            alert("Thành công!");
            resetForm();
            loadProducts();
        } catch (err) {
            console.error("Lỗi gửi dữ liệu:", err.response?.data);
            alert("Lỗi dữ liệu! Vui lòng kiểm tra tab Network để xem chi tiết.");
        }
    };

    // 3. Xử lý Xóa sản phẩm
    const handleDelete = async (id) => {
        // Xác nhận trước khi xóa
        if (window.confirm("Bạn có chắc chắn muốn xóa vĩnh viễn sản phẩm này?")) {
            try {
                // Gọi API xóa từ adminApi
                await adminApi.deleteProduct(id);

                // Thông báo và tải lại danh sách
                alert("Xóa thành công!");
                loadProducts();
            } catch (err) {
                console.error("Lỗi xóa:", err.response?.data);
                alert("Không thể xóa trực tiếp! Hãy chắc chắn bạn đã xóa dữ liệu liên quan ở bảng order_items trước.");
            }
        }
    };

    // 4. Đổ dữ liệu vào Form khi bấm nút Sửa
    const handleEdit = (p) => {
        setFormData({
            name: p.name || '',
            price: p.price || '',
            image_url: p.image_url || '',
            stock: p.stock || '',
            specifications: p.specifications || ''
        });
        setSelectedId(p.id);
        setIsEdit(true);
        // Cuộn lên đầu form
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const resetForm = () => {
        setFormData({ name: '', price: '', image_url: '', stock: '', specifications: '' });
        setIsEdit(false);
        setSelectedId(null);
    };

    // Tìm kiếm sản phẩm
    const filteredProducts = products.filter(product =>
        product.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.id?.toString().includes(searchTerm)
    );

    // Phân trang
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filteredProducts.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    if (loading) return (
        <div style={styles.loadingContainer}>
            <div style={styles.spinner}></div>
            <p style={styles.loadingText}>Đang tải dữ liệu từ hệ thống...</p>
        </div>
    );

    return (
        <div style={styles.container}>
            {/* Header */}
            <div style={styles.header}>
                <h2 style={styles.title}>📦 Quản lý kho hàng</h2>
                <div style={styles.headerStats}>
                    <div style={styles.statCard}>
                        <span style={styles.statLabel}>Tổng sản phẩm</span>
                        <span style={styles.statValue}>{products.length}</span>
                    </div>
                    <div style={styles.statCard}>
                        <span style={styles.statLabel}>Đang hoạt động</span>
                        <span style={styles.statValue}>{products.filter(p => p.stock > 0).length}</span>
                    </div>
                    <div style={styles.statCard}>
                        <span style={styles.statLabel}>Hết hàng</span>
                        <span style={styles.statValue}>{products.filter(p => p.stock <= 0).length}</span>
                    </div>
                </div>
            </div>

            {/* FORM THÊM / SỬA */}
            <div style={styles.formCard}>
                <div style={styles.formHeader}>
                    <h3 style={styles.formTitle}>
                        {isEdit ? '✏️ Chỉnh sửa sản phẩm' : '➕ Thêm sản phẩm mới'}
                    </h3>
                    {isEdit && (
                        <button onClick={resetForm} style={styles.cancelBtn}>
                            Hủy chỉnh sửa
                        </button>
                    )}
                </div>

                <form onSubmit={handleSubmit}>
                    <div style={styles.formGrid}>
                        <div style={styles.formGroup}>
                            <label style={styles.label}>Tên sản phẩm *</label>
                            <input
                                type="text"
                                placeholder="Nhập tên sản phẩm"
                                value={formData.name}
                                onChange={e => setFormData({ ...formData, name: e.target.value })}
                                required
                                style={styles.input}
                            />
                        </div>

                        <div style={styles.formGroup}>
                            <label style={styles.label}>Giá (VNĐ) *</label>
                            <input
                                type="number"
                                placeholder="Nhập giá"
                                value={formData.price}
                                onChange={e => setFormData({ ...formData, price: e.target.value })}
                                required
                                style={styles.input}
                                min="0"
                            />
                        </div>

                        <div style={styles.formGroup}>
                            <label style={styles.label}>Số lượng kho *</label>
                            <input
                                type="number"
                                placeholder="Nhập số lượng"
                                value={formData.stock}
                                onChange={e => setFormData({ ...formData, stock: e.target.value })}
                                style={styles.input}
                                min="0"
                            />
                        </div>

                        <div style={styles.formGroup}>
                            <label style={styles.label}>Link ảnh</label>
                            <input
                                type="text"
                                placeholder="https://example.com/image.jpg"
                                value={formData.image_url}
                                onChange={e => setFormData({ ...formData, image_url: e.target.value })}
                                style={styles.input}
                            />
                        </div>

                        <div style={styles.formGroupFull}>
                            <label style={styles.label}>Thông số kỹ thuật</label>
                            <textarea
                                placeholder="Mô tả thông số kỹ thuật..."
                                value={formData.specifications}
                                onChange={e => setFormData({ ...formData, specifications: e.target.value })}
                                style={styles.textarea}
                                rows="3"
                            />
                        </div>
                    </div>

                    <div style={styles.formActions}>
                        <button type="submit" style={isEdit ? styles.submitEditBtn : styles.submitAddBtn}>
                            {isEdit ? '💾 Cập nhật sản phẩm' : '➕ Thêm sản phẩm mới'}
                        </button>
                    </div>
                </form>
            </div>

            {/* Bộ lọc và tìm kiếm */}
            <div style={styles.filterSection}>
                <div style={styles.searchContainer}>
                    <div style={styles.searchIcon}>🔍</div>
                    <input
                        type="text"
                        placeholder="Tìm kiếm sản phẩm theo tên hoặc ID..."
                        value={searchTerm}
                        onChange={e => setSearchTerm(e.target.value)}
                        style={styles.searchInput}
                    />
                    {searchTerm && (
                        <button onClick={() => setSearchTerm('')} style={styles.clearSearchBtn}>
                            ✕
                        </button>
                    )}
                </div>
                <div style={styles.filterStats}>
                    <span style={styles.filterText}>
                        Hiển thị {currentItems.length} trong tổng số {filteredProducts.length} sản phẩm
                    </span>
                </div>
            </div>

            {/* BẢNG DANH SÁCH */}
            <div style={styles.tableContainer}>
                <table style={styles.table}>
                    <thead>
                        <tr>
                            <th style={styles.th}>ID</th>
                            <th style={styles.th}>Ảnh</th>
                            <th style={styles.th}>Tên sản phẩm</th>
                            <th style={styles.th}>Giá</th>
                            <th style={styles.th}>Kho</th>
                            <th style={styles.th}>Trạng thái</th>
                            <th style={styles.th}>Hành động</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentItems.length > 0 ? (
                            currentItems.map(p => (
                                <tr key={p.id} style={styles.tr}>
                                    <td style={styles.td}>
                                        <span style={styles.idBadge}>#{p.id}</span>
                                    </td>
                                    <td style={styles.td}>
                                        <div style={styles.imageContainer}>
                                            <img
                                                src={p.image_url || 'https://via.placeholder.com/50'}
                                                alt={p.name}
                                                style={styles.productImage}
                                                onError={(e) => {
                                                    e.target.src = 'https://via.placeholder.com/50';
                                                }}
                                            />
                                        </div>
                                    </td>
                                    <td style={styles.td}>
                                        <div>
                                            <strong style={styles.productName}>{p.name}</strong>
                                            {p.specifications && (
                                                <p style={styles.specs}>{p.specifications.substring(0, 50)}...</p>
                                            )}
                                        </div>
                                    </td>
                                    <td style={styles.td}>
                                        <span style={styles.price}>
                                            {p.price?.toLocaleString('vi-VN')} đ
                                        </span>
                                    </td>
                                    <td style={styles.td}>
                                        <span style={p.stock > 10 ? styles.stockHigh : p.stock > 0 ? styles.stockLow : styles.stockOut}>
                                            {p.stock}
                                        </span>
                                    </td>
                                    <td style={styles.td}>
                                        <span style={p.stock > 0 ? styles.statusActive : styles.statusInactive}>
                                            {p.stock > 0 ? '📦 Còn hàng' : '⛔ Hết hàng'}
                                        </span>
                                    </td>
                                    <td style={styles.td}>
                                        <div style={styles.actionButtons}>
                                            <button
                                                onClick={() => handleEdit(p)}
                                                style={styles.editBtn}
                                                title="Chỉnh sửa"
                                            >
                                                ✏️
                                            </button>
                                            <button
                                                onClick={() => handleDelete(p.id)}
                                                style={styles.deleteBtn}
                                                title="Xóa"
                                            >
                                                🗑️
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="7" style={styles.noData}>
                                    <div style={styles.noDataContent}>
                                        <span style={styles.noDataIcon}>📦</span>
                                        <p>Không tìm thấy sản phẩm nào</p>
                                    </div>
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* Phân trang */}
            {totalPages > 1 && (
                <div style={styles.pagination}>
                    <button
                        onClick={() => handlePageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                        style={currentPage === 1 ? styles.pageBtnDisabled : styles.pageBtn}
                    >
                        ← Trước
                    </button>

                    {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                        let pageNumber;
                        if (totalPages <= 5) {
                            pageNumber = i + 1;
                        } else if (currentPage <= 3) {
                            pageNumber = i + 1;
                        } else if (currentPage >= totalPages - 2) {
                            pageNumber = totalPages - 4 + i;
                        } else {
                            pageNumber = currentPage - 2 + i;
                        }

                        return (
                            <button
                                key={pageNumber}
                                onClick={() => handlePageChange(pageNumber)}
                                style={currentPage === pageNumber ? styles.pageBtnActive : styles.pageBtn}
                            >
                                {pageNumber}
                            </button>
                        );
                    })}

                    <button
                        onClick={() => handlePageChange(currentPage + 1)}
                        disabled={currentPage === totalPages}
                        style={currentPage === totalPages ? styles.pageBtnDisabled : styles.pageBtn}
                    >
                        Sau →
                    </button>
                </div>
            )}
        </div>
    );
};

// Styles
const styles = {
    container: {
        color: '#e0e0e0',
        minHeight: '100%',
    },

    loadingContainer: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '400px',
    },

    spinner: {
        width: '50px',
        height: '50px',
        border: '5px solid rgba(99, 102, 241, 0.3)',
        borderTop: '5px solid #6366f1',
        borderRadius: '50%',
        animation: 'spin 1s linear infinite',
    },

    loadingText: {
        marginTop: '20px',
        color: '#a0a0c0',
        fontSize: '16px',
    },

    header: {
        marginBottom: '30px',
    },

    title: {
        fontSize: '28px',
        fontWeight: '700',
        margin: '0 0 20px 0',
        background: 'linear-gradient(90deg, #ffffff, #a0a0c0)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
    },

    headerStats: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: '20px',
        marginBottom: '20px',
    },

    statCard: {
        backgroundColor: '#1a1a2e',
        borderRadius: '12px',
        padding: '20px',
        border: '1px solid #2a2a3a',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },

    statLabel: {
        fontSize: '14px',
        color: '#a0a0c0',
        marginBottom: '8px',
    },

    statValue: {
        fontSize: '28px',
        fontWeight: '700',
        color: '#ffffff',
    },

    formCard: {
        backgroundColor: '#1a1a2e',
        borderRadius: '16px',
        padding: '30px',
        border: '1px solid #2a2a3a',
        marginBottom: '30px',
    },

    formHeader: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '25px',
    },

    formTitle: {
        fontSize: '20px',
        fontWeight: '600',
        margin: 0,
        color: '#ffffff',
    },

    cancelBtn: {
        backgroundColor: 'transparent',
        border: '1px solid #ef4444',
        color: '#ef4444',
        padding: '8px 16px',
        borderRadius: '8px',
        cursor: 'pointer',
        fontSize: '14px',
        transition: 'all 0.3s ease',
        '&:hover': {
            backgroundColor: 'rgba(239, 68, 68, 0.1)',
        },
    },

    formGrid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
        gap: '20px',
        marginBottom: '25px',
    },

    formGroup: {
        marginBottom: '15px',
    },

    formGroupFull: {
        gridColumn: '1 / -1',
        marginBottom: '15px',
    },

    label: {
        display: 'block',
        marginBottom: '8px',
        fontSize: '14px',
        color: '#a0a0c0',
        fontWeight: '500',
    },

    input: {
        width: '100%',
        padding: '12px 16px',
        backgroundColor: '#0a0a0f',
        border: '1px solid #2a2a3a',
        borderRadius: '8px',
        color: '#ffffff',
        fontSize: '14px',
        boxSizing: 'border-box',
        '&:focus': {
            outline: 'none',
            borderColor: '#6366f1',
            boxShadow: '0 0 0 2px rgba(99, 102, 241, 0.2)',
        },
        '&::placeholder': {
            color: '#666',
        },
    },

    textarea: {
        width: '100%',
        padding: '12px 16px',
        backgroundColor: '#0a0a0f',
        border: '1px solid #2a2a3a',
        borderRadius: '8px',
        color: '#ffffff',
        fontSize: '14px',
        boxSizing: 'border-box',
        resize: 'vertical',
        fontFamily: 'inherit',
        '&:focus': {
            outline: 'none',
            borderColor: '#6366f1',
            boxShadow: '0 0 0 2px rgba(99, 102, 241, 0.2)',
        },
        '&::placeholder': {
            color: '#666',
        },
    },

    formActions: {
        textAlign: 'right',
    },

    submitAddBtn: {
        backgroundColor: '#10b981',
        color: 'white',
        border: 'none',
        padding: '12px 30px',
        borderRadius: '8px',
        cursor: 'pointer',
        fontSize: '16px',
        fontWeight: '600',
        transition: 'all 0.3s ease',
        '&:hover': {
            backgroundColor: '#059669',
            transform: 'translateY(-2px)',
            boxShadow: '0 5px 15px rgba(16, 185, 129, 0.3)',
        },
    },

    submitEditBtn: {
        backgroundColor: '#f59e0b',
        color: 'white',
        border: 'none',
        padding: '12px 30px',
        borderRadius: '8px',
        cursor: 'pointer',
        fontSize: '16px',
        fontWeight: '600',
        transition: 'all 0.3s ease',
        '&:hover': {
            backgroundColor: '#d97706',
            transform: 'translateY(-2px)',
            boxShadow: '0 5px 15px rgba(245, 158, 11, 0.3)',
        },
    },

    filterSection: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '20px',
        flexWrap: 'wrap',
        gap: '15px',
    },

    searchContainer: {
        display: 'flex',
        alignItems: 'center',
        backgroundColor: '#1a1a2e',
        borderRadius: '10px',
        padding: '5px 15px',
        border: '1px solid #2a2a3a',
        flex: '1',
        maxWidth: '400px',
    },

    searchIcon: {
        fontSize: '18px',
        marginRight: '10px',
        color: '#a0a0c0',
    },

    searchInput: {
        flex: 1,
        border: 'none',
        background: 'transparent',
        color: '#ffffff',
        fontSize: '14px',
        padding: '10px 0',
        '&:focus': {
            outline: 'none',
        },
        '&::placeholder': {
            color: '#666',
        },
    },

    clearSearchBtn: {
        background: 'none',
        border: 'none',
        color: '#a0a0c0',
        cursor: 'pointer',
        fontSize: '18px',
        padding: '0',
        marginLeft: '10px',
        '&:hover': {
            color: '#ffffff',
        },
    },

    filterStats: {
        fontSize: '14px',
        color: '#a0a0c0',
    },

    filterText: {
        backgroundColor: '#1a1a2e',
        padding: '8px 16px',
        borderRadius: '8px',
        border: '1px solid #2a2a3a',
    },

    tableContainer: {
        backgroundColor: '#1a1a2e',
        borderRadius: '12px',
        border: '1px solid #2a2a3a',
        overflow: 'hidden',
        marginBottom: '30px',
    },

    table: {
        width: '100%',
        borderCollapse: 'collapse',
    },

    th: {
        padding: '16px 20px',
        textAlign: 'left',
        borderBottom: '1px solid #2a2a3a',
        color: '#a0a0c0',
        fontSize: '14px',
        fontWeight: '600',
        backgroundColor: '#0f0f1a',
    },

    tr: {
        borderBottom: '1px solid #2a2a3a',
        transition: 'background-color 0.2s ease',
        '&:hover': {
            backgroundColor: 'rgba(99, 102, 241, 0.05)',
        },
        '&:last-child': {
            borderBottom: 'none',
        },
    },

    td: {
        padding: '16px 20px',
        fontSize: '14px',
        color: '#e0e0e0',
    },

    idBadge: {
        backgroundColor: 'rgba(99, 102, 241, 0.2)',
        color: '#6366f1',
        padding: '4px 8px',
        borderRadius: '6px',
        fontSize: '12px',
        fontWeight: '600',
    },

    imageContainer: {
        width: '50px',
        height: '50px',
        borderRadius: '8px',
        overflow: 'hidden',
        backgroundColor: '#0a0a0f',
    },

    productImage: {
        width: '100%',
        height: '100%',
        objectFit: 'cover',
    },

    productName: {
        fontSize: '15px',
        fontWeight: '600',
        color: '#ffffff',
        display: 'block',
        marginBottom: '4px',
    },

    specs: {
        fontSize: '12px',
        color: '#a0a0c0',
        margin: 0,
        lineHeight: '1.4',
    },

    price: {
        fontSize: '15px',
        fontWeight: '600',
        color: '#10b981',
    },

    stockHigh: {
        color: '#10b981',
        fontWeight: '600',
    },

    stockLow: {
        color: '#f59e0b',
        fontWeight: '600',
    },

    stockOut: {
        color: '#ef4444',
        fontWeight: '600',
    },

    statusActive: {
        backgroundColor: 'rgba(16, 185, 129, 0.2)',
        color: '#10b981',
        padding: '4px 8px',
        borderRadius: '6px',
        fontSize: '12px',
        fontWeight: '500',
    },

    statusInactive: {
        backgroundColor: 'rgba(239, 68, 68, 0.2)',
        color: '#ef4444',
        padding: '4px 8px',
        borderRadius: '6px',
        fontSize: '12px',
        fontWeight: '500',
    },

    actionButtons: {
        display: 'flex',
        gap: '8px',
    },

    editBtn: {
        backgroundColor: 'rgba(245, 158, 11, 0.2)',
        color: '#f59e0b',
        border: '1px solid rgba(245, 158, 11, 0.3)',
        borderRadius: '6px',
        padding: '8px 12px',
        cursor: 'pointer',
        fontSize: '14px',
        transition: 'all 0.2s ease',
        '&:hover': {
            backgroundColor: 'rgba(245, 158, 11, 0.3)',
            transform: 'translateY(-1px)',
        },
    },

    deleteBtn: {
        backgroundColor: 'rgba(239, 68, 68, 0.2)',
        color: '#ef4444',
        border: '1px solid rgba(239, 68, 68, 0.3)',
        borderRadius: '6px',
        padding: '8px 12px',
        cursor: 'pointer',
        fontSize: '14px',
        transition: 'all 0.2s ease',
        '&:hover': {
            backgroundColor: 'rgba(239, 68, 68, 0.3)',
            transform: 'translateY(-1px)',
        },
    },

    noData: {
        padding: '60px 20px',
        textAlign: 'center',
    },

    noDataContent: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '15px',
    },

    noDataIcon: {
        fontSize: '48px',
        opacity: 0.5,
    },

    pagination: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        gap: '8px',
        marginTop: '20px',
    },

    pageBtn: {
        backgroundColor: '#1a1a2e',
        border: '1px solid #2a2a3a',
        color: '#a0a0c0',
        padding: '8px 16px',
        borderRadius: '8px',
        cursor: 'pointer',
        fontSize: '14px',
        transition: 'all 0.2s ease',
        '&:hover': {
            backgroundColor: '#2a2a3a',
            color: '#ffffff',
        },
    },

    pageBtnActive: {
        backgroundColor: '#6366f1',
        border: '1px solid #6366f1',
        color: 'white',
        padding: '8px 16px',
        borderRadius: '8px',
        cursor: 'pointer',
        fontSize: '14px',
        fontWeight: '600',
    },

    pageBtnDisabled: {
        backgroundColor: '#1a1a2e',
        border: '1px solid #2a2a3a',
        color: '#666',
        padding: '8px 16px',
        borderRadius: '8px',
        cursor: 'not-allowed',
        fontSize: '14px',
        opacity: 0.5,
    },
};

// Thêm animation cho loading spinner
const styleSheet = document.styleSheets[0];
styleSheet.insertRule(`
    @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
    }
`, styleSheet.cssRules.length);

export default ProductManager;