import React, { useEffect, useState } from 'react';
import adminApi from '../../api/adminApi';

const CategoryManager = () => {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isEdit, setIsEdit] = useState(false);
    const [selectedId, setSelectedId] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [formData, setFormData] = useState({
        name: '',
        description: ''
    });

    const loadCategories = async () => {
        try {
            const res = await adminApi.getCategories();
            setCategories(res.data || []);
            setLoading(false);
        } catch (err) {
            console.error("Lỗi:", err);
            setLoading(false);
        }
    };

    useEffect(() => {
        loadCategories();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!formData.name.trim()) {
            alert("Vui lòng nhập tên danh mục!");
            return;
        }

        try {
            if (isEdit) {
                await adminApi.updateCategory(selectedId, formData);
            } else {
                await adminApi.createCategory(formData);
            }
            alert("Thành công!");
            resetForm();
            loadCategories();
        } catch (err) {
            alert("Lỗi dữ liệu!");
        }
    };

    const handleDelete = async (id) => {
        // Thông báo cho người dùng biết hậu quả của CASCADE
        const isConfirmed = window.confirm(
            "⚠️ CẢNH BÁO QUAN TRỌNG!\n\nXóa danh mục này sẽ xóa TẤT CẢ các sản phẩm thuộc về nó.\nHành động này không thể hoàn tác.\n\nBạn có chắc chắn muốn tiếp tục?"
        );

        if (isConfirmed) {
            try {
                await adminApi.deleteCategory(id);
                alert("✅ Đã xóa danh mục và các sản phẩm liên quan thành công!");
                loadCategories();
            } catch (err) {
                console.error("Lỗi xóa:", err.response?.data);
                alert("❌ Lỗi hệ thống! Vui lòng kiểm tra lại.");
            }
        }
    };

    const handleEdit = (cat) => {
        setFormData({
            name: cat.name || '',
            description: cat.description || ''
        });
        setSelectedId(cat.id);
        setIsEdit(true);
        // Cuộn lên đầu form
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const resetForm = () => {
        setFormData({ name: '', description: '' });
        setIsEdit(false);
        setSelectedId(null);
    };

    // Tìm kiếm danh mục
    const filteredCategories = categories.filter(cat =>
        cat.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        cat.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        cat.id?.toString().includes(searchTerm)
    );

    if (loading) {
        return (
            <div style={styles.loadingContainer}>
                <div style={styles.spinner}></div>
                <p style={styles.loadingText}>Đang tải danh mục...</p>
            </div>
        );
    }

    return (
        <div style={styles.container}>
            {/* Header */}
            <div style={styles.header}>
                <h2 style={styles.title}>📁 Quản lý danh mục & Brand</h2>
                <div style={styles.headerStats}>
                    <div style={styles.statCard}>
                        <span style={styles.statLabel}>Tổng danh mục</span>
                        <span style={styles.statValue}>{categories.length}</span>
                    </div>
                    <div style={styles.statCard}>
                        <span style={styles.statLabel}>Đang sử dụng</span>
                        <span style={styles.statValue}>{categories.length}</span>
                    </div>
                </div>
            </div>

            {/* FORM THÊM / SỬA */}
            <div style={styles.formCard}>
                <div style={styles.formHeader}>
                    <h3 style={styles.formTitle}>
                        {isEdit ? '✏️ Chỉnh sửa danh mục' : '➕ Thêm danh mục mới'}
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
                            <label style={styles.label}>
                                Tên danh mục *
                                <span style={styles.required}> *</span>
                            </label>
                            <input
                                type="text"
                                placeholder="Nhập tên danh mục..."
                                value={formData.name}
                                onChange={e => setFormData({ ...formData, name: e.target.value })}
                                required
                                style={styles.input}
                                maxLength="100"
                            />
                            <div style={styles.charCount}>
                                {formData.name.length}/100 ký tự
                            </div>
                        </div>

                        <div style={styles.formGroup}>
                            <label style={styles.label}>Mô tả (Tùy chọn)</label>
                            <textarea
                                placeholder="Nhập mô tả cho danh mục..."
                                value={formData.description}
                                onChange={e => setFormData({ ...formData, description: e.target.value })}
                                style={styles.textarea}
                                rows="3"
                                maxLength="500"
                            />
                            <div style={styles.charCount}>
                                {formData.description.length}/500 ký tự
                            </div>
                        </div>
                    </div>

                    <div style={styles.formActions}>
                        <button type="submit" style={isEdit ? styles.submitEditBtn : styles.submitAddBtn}>
                            {isEdit ? '💾 Cập nhật danh mục' : '➕ Thêm danh mục mới'}
                        </button>
                    </div>
                </form>
            </div>

            {/* CẢNH BÁO XÓA */}
            <div style={styles.warningCard}>
                <div style={styles.warningHeader}>
                    <span style={styles.warningIcon}>⚠️</span>
                    <h4 style={styles.warningTitle}>Lưu ý quan trọng về việc xóa</h4>
                </div>
                <p style={styles.warningText}>
                    Khi xóa một danh mục, <strong>TẤT CẢ sản phẩm thuộc danh mục đó sẽ bị xóa vĩnh viễn</strong>.
                    Hành động này không thể hoàn tác. Vui lòng kiểm tra kỹ trước khi thực hiện.
                </p>
            </div>

            {/* TÌM KIẾM */}
            <div style={styles.searchSection}>
                <div style={styles.searchContainer}>
                    <div style={styles.searchIcon}>🔍</div>
                    <input
                        type="text"
                        placeholder="Tìm kiếm danh mục theo tên, mô tả hoặc ID..."
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
                        Hiển thị {filteredCategories.length} trong tổng số {categories.length} danh mục
                    </span>
                </div>
            </div>

            {/* DANH SÁCH DANH MỤC */}
            <div style={styles.tableContainer}>
                <table style={styles.table}>
                    <thead>
                        <tr>
                            <th style={styles.th}>ID</th>
                            <th style={styles.th}>Tên danh mục</th>
                            <th style={styles.th}>Mô tả</th>
                            <th style={styles.th}>Số sản phẩm</th>
                            <th style={styles.th}>Trạng thái</th>
                            <th style={styles.th}>Hành động</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredCategories.length > 0 ? (
                            filteredCategories.map(cat => (
                                <tr key={cat.id} style={styles.tr}>
                                    <td style={styles.td}>
                                        <span style={styles.idBadge}>#{cat.id}</span>
                                    </td>
                                    <td style={styles.td}>
                                        <div style={styles.categoryInfo}>
                                            <div style={styles.categoryAvatar}>
                                                {cat.name.charAt(0).toUpperCase()}
                                            </div>
                                            <div>
                                                <strong style={styles.categoryName}>{cat.name}</strong>
                                                <div style={styles.categoryMeta}>
                                                    <span style={styles.createdDate}>
                                                        ID: {cat.id}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </td>
                                    <td style={styles.td}>
                                        <div style={styles.description}>
                                            {cat.description || (
                                                <span style={styles.noDescription}>Chưa có mô tả</span>
                                            )}
                                        </div>
                                    </td>
                                    <td style={styles.td}>
                                        <span style={styles.productCount}>
                                            {cat.product_count || 0}
                                        </span>
                                    </td>
                                    <td style={styles.td}>
                                        <span style={styles.statusActive}>
                                            ✅ Đang hoạt động
                                        </span>
                                    </td>
                                    <td style={styles.td}>
                                        <div style={styles.actionButtons}>
                                            <button
                                                onClick={() => handleEdit(cat)}
                                                style={styles.editBtn}
                                                title="Chỉnh sửa"
                                            >
                                                ✏️
                                            </button>
                                            <button
                                                onClick={() => handleDelete(cat.id)}
                                                style={styles.deleteBtn}
                                                title="Xóa danh mục"
                                            >
                                                🗑️
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="6" style={styles.noData}>
                                    <div style={styles.noDataContent}>
                                        <span style={styles.noDataIcon}>📁</span>
                                        <p>Không tìm thấy danh mục nào</p>
                                        {searchTerm && (
                                            <button
                                                onClick={() => setSearchTerm('')}
                                                style={styles.clearSearchBtnText}
                                            >
                                                Xóa bộ lọc tìm kiếm
                                            </button>
                                        )}
                                    </div>
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* THÔNG TIN HƯỚNG DẪN */}
            <div style={styles.infoCard}>
                <h4 style={styles.infoTitle}>📌 Hướng dẫn sử dụng</h4>
                <ul style={styles.infoList}>
                    <li>Mỗi danh mục có thể chứa nhiều sản phẩm</li>
                    <li>Tên danh mục phải là duy nhất trong hệ thống</li>
                    <li>Danh mục đang chứa sản phẩm sẽ không thể ẩn/xóa trừ khi di chuyển sản phẩm</li>
                    <li>Sử dụng mô tả để phân loại rõ ràng các danh mục</li>
                </ul>
            </div>
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
        marginBottom: '25px',
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
        gridTemplateColumns: '1fr',
        gap: '20px',
        marginBottom: '25px',
    },

    formGroup: {
        marginBottom: '15px',
    },

    label: {
        display: 'block',
        marginBottom: '8px',
        fontSize: '14px',
        color: '#a0a0c0',
        fontWeight: '500',
    },

    required: {
        color: '#ef4444',
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
        minHeight: '80px',
        '&:focus': {
            outline: 'none',
            borderColor: '#6366f1',
            boxShadow: '0 0 0 2px rgba(99, 102, 241, 0.2)',
        },
        '&::placeholder': {
            color: '#666',
        },
    },

    charCount: {
        textAlign: 'right',
        fontSize: '12px',
        color: '#666',
        marginTop: '5px',
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

    warningCard: {
        backgroundColor: 'rgba(239, 68, 68, 0.1)',
        border: '1px solid rgba(239, 68, 68, 0.3)',
        borderRadius: '12px',
        padding: '20px',
        marginBottom: '25px',
    },

    warningHeader: {
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
        marginBottom: '10px',
    },

    warningIcon: {
        fontSize: '24px',
    },

    warningTitle: {
        fontSize: '16px',
        fontWeight: '600',
        color: '#ef4444',
        margin: 0,
    },

    warningText: {
        fontSize: '14px',
        color: '#e0e0e0',
        lineHeight: '1.6',
        margin: 0,
    },

    searchSection: {
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
        verticalAlign: 'middle',
    },

    idBadge: {
        backgroundColor: 'rgba(99, 102, 241, 0.2)',
        color: '#6366f1',
        padding: '4px 8px',
        borderRadius: '6px',
        fontSize: '12px',
        fontWeight: '600',
    },

    categoryInfo: {
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
    },

    categoryAvatar: {
        width: '40px',
        height: '40px',
        borderRadius: '8px',
        backgroundColor: '#6366f1',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontWeight: '600',
        fontSize: '16px',
        color: 'white',
        flexShrink: 0,
    },

    categoryName: {
        fontSize: '15px',
        fontWeight: '600',
        color: '#ffffff',
        display: 'block',
        marginBottom: '2px',
    },

    categoryMeta: {
        display: 'flex',
        gap: '10px',
        fontSize: '12px',
        color: '#a0a0c0',
    },

    createdDate: {
        backgroundColor: 'rgba(99, 102, 241, 0.1)',
        padding: '2px 6px',
        borderRadius: '4px',
    },

    description: {
        lineHeight: '1.5',
        maxWidth: '300px',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
    },

    noDescription: {
        color: '#666',
        fontStyle: 'italic',
    },

    productCount: {
        backgroundColor: 'rgba(16, 185, 129, 0.2)',
        color: '#10b981',
        padding: '4px 8px',
        borderRadius: '6px',
        fontSize: '12px',
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

    clearSearchBtnText: {
        backgroundColor: 'transparent',
        border: '1px solid #6366f1',
        color: '#6366f1',
        padding: '8px 16px',
        borderRadius: '6px',
        cursor: 'pointer',
        fontSize: '14px',
        transition: 'all 0.2s ease',
        '&:hover': {
            backgroundColor: 'rgba(99, 102, 241, 0.1)',
        },
    },

    infoCard: {
        backgroundColor: '#1a1a2e',
        borderRadius: '12px',
        padding: '25px',
        border: '1px solid #2a2a3a',
    },

    infoTitle: {
        fontSize: '18px',
        fontWeight: '600',
        color: '#ffffff',
        margin: '0 0 15px 0',
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
    },

    infoList: {
        margin: 0,
        paddingLeft: '20px',
        color: '#a0a0c0',
        lineHeight: '1.8',
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

export default CategoryManager;