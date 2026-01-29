import React, { useEffect, useState } from 'react';
import adminApi from '../../api/adminApi';

const UserManager = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);

    const loadUsers = async () => {
        try {
            const res = await adminApi.getUsers();
            setUsers(Array.isArray(res.data) ? res.data : []);
            setLoading(false);
        } catch (err) {
            console.error("Lỗi tải người dùng:", err);
            setLoading(false);
        }
    };

    useEffect(() => { loadUsers(); }, []);

    const handleDelete = async (id) => {
        if (window.confirm("Bạn có chắc chắn muốn xóa người dùng này?")) {
            try {
                await adminApi.deleteUser(id);
                alert("Xóa thành công!");
                loadUsers();
            } catch (err) {
                alert("Lỗi: Không thể xóa do ràng buộc dữ liệu đơn hàng!");
            }
        }
    };

    if (loading) return (
        <div style={styles.loadingContainer}>
            <div style={styles.spinner}></div>
            <p style={styles.loadingText}>Đang tải danh sách người dùng...</p>
        </div>
    );

    return (
        <div style={styles.container}>
            <h2 style={styles.title}>👤 Quản lý Người dùng hệ thống</h2>

            <div style={styles.tableContainer}>
                <table style={styles.table}>
                    <thead>
                        <tr>
                            <th style={styles.th}>ID</th>
                            <th style={styles.th}>Họ tên</th>
                            <th style={styles.th}>Email</th>
                            <th style={styles.th}>Trạng thái</th>
                            <th style={styles.th}>Ngày tạo</th>
                            <th style={styles.th}>Hành động</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map(u => (
                            <tr key={u.id} style={styles.tr}>
                                <td style={styles.td}>
                                    <span style={styles.idBadge}>#{u.id}</span>
                                </td>
                                <td style={styles.td}>
                                    <strong style={styles.userName}>{u.name}</strong>
                                </td>
                                <td style={styles.td}>
                                    <span style={styles.email}>{u.email}</span>
                                </td>
                                <td style={styles.td}>
                                    <span style={u.active === 1 ? styles.statusActive : styles.statusInactive}>
                                        {u.active === 1 ? '● Đang hoạt động' : '○ Bị khóa'}
                                    </span>
                                </td>
                                <td style={styles.td}>
                                    <span style={styles.date}>
                                        {new Date(u.createdAt).toLocaleDateString('vi-VN')}
                                    </span>
                                </td>
                                <td style={styles.td}>
                                    <button
                                        onClick={() => handleDelete(u.id)}
                                        style={styles.deleteBtn}
                                    >
                                        Xóa
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

// Styles
const styles = {
    container: {
        padding: '20px',
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

    title: {
        fontSize: '28px',
        fontWeight: '700',
        margin: '0 0 25px 0',
        background: 'linear-gradient(90deg, #2ecc71, #27ae60)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
    },

    tableContainer: {
        backgroundColor: '#1a1a2e',
        borderRadius: '12px',
        border: '1px solid #2a2a3a',
        overflow: 'hidden',
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

    userName: {
        fontSize: '15px',
        color: '#ffffff',
    },

    email: {
        fontSize: '14px',
        color: '#a0a0c0',
    },

    statusActive: {
        backgroundColor: 'rgba(16, 185, 129, 0.2)',
        color: '#10b981',
        padding: '6px 12px',
        borderRadius: '20px',
        fontSize: '12px',
        fontWeight: '500',
        display: 'inline-block',
    },

    statusInactive: {
        backgroundColor: 'rgba(239, 68, 68, 0.2)',
        color: '#ef4444',
        padding: '6px 12px',
        borderRadius: '20px',
        fontSize: '12px',
        fontWeight: '500',
        display: 'inline-block',
    },

    date: {
        fontSize: '13px',
        color: '#a0a0c0',
    },

    deleteBtn: {
        backgroundColor: 'rgba(239, 68, 68, 0.2)',
        color: '#ef4444',
        border: '1px solid rgba(239, 68, 68, 0.3)',
        borderRadius: '6px',
        padding: '6px 12px',
        cursor: 'pointer',
        fontSize: '13px',
        fontWeight: '500',
        transition: 'all 0.2s ease',
        '&:hover': {
            backgroundColor: 'rgba(239, 68, 68, 0.3)',
            transform: 'translateY(-1px)',
        },
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

export default UserManager;