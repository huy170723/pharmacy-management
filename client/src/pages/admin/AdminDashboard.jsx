import React, { useEffect, useState } from 'react';
// import adminApi from '../../api/adminApi'; // Tạm thời comment lại để không gây lỗi nếu chưa config

const AdminDashboard = () => {
    const [stats, setStats] = useState({
        revenue: 0,
        orders: 0,
        products: 0,
        users: 0,
        growth: 0,
        conversionRate: 0,
        avgOrdersPerDay: 0,
        avgOrderValue: 0,
        avgProcessingTime: 0
    });

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Giả lập việc lấy dữ liệu (Loading trong 1 giây rồi hiện data)
        const loadData = () => {
            setLoading(true);

            // Dữ liệu giả lập (Hardcode) - Hiển thị luôn không cần Login
            const mockData = {
                revenue: 12500000,
                orders: 345,
                products: 1289,
                users: 567,
                growth: 12.5,
                conversionRate: 3.2,
                avgOrdersPerDay: 11.5,
                avgOrderValue: 1200000,
                avgProcessingTime: 2.4
            };

            setTimeout(() => {
                setStats(mockData);
                setLoading(false);
            }, 800); // Delay 0.8s để nhìn thấy hiệu ứng loading
        };

        loadData();
    }, []);

    // Hàm định dạng tiền tệ
    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('vi-VN', {
            style: 'currency',
            currency: 'VND',
            minimumFractionDigits: 0
        }).format(amount);
    };

    // Hàm định dạng số
    const formatNumber = (num) => {
        return new Intl.NumberFormat('vi-VN').format(num);
    };

    if (loading) {
        return (
            <div style={styles.loadingContainer}>
                <div style={styles.loadingSpinner}></div>
                <p style={styles.loadingText}>Đang tải thống kê...</p>
            </div>
        );
    }

    return (
        <div style={styles.container}>
            {/* Header với tiêu đề */}
            <div style={styles.header}>
                <h1 style={styles.title}>Tổng quan hệ thống</h1>
            </div>

            {/* Grid thống kê chính */}
            <div style={styles.statsGrid}>
                {/* Doanh thu */}
                <div style={styles.statCard}>
                    <div style={styles.statHeader}>
                        <div style={{ ...styles.statIcon, backgroundColor: 'rgba(99, 102, 241, 0.2)' }}>
                            <span style={styles.icon}>💰</span>
                        </div>
                        <div style={styles.statTrend}>
                            <span style={{ ...styles.trendText, color: '#10b981' }}>↑ {stats.growth}%</span>
                            <span style={styles.trendLabel}>so với tháng trước</span>
                        </div>
                    </div>
                    <h3 style={styles.statLabel}>Tổng doanh thu</h3>
                    <h1 style={styles.statValue}>{formatCurrency(stats.revenue)}</h1>
                    <div style={styles.statProgress}>
                        <div style={{ ...styles.progressBar, width: '75%', backgroundColor: '#6366f1' }}></div>
                    </div>
                </div>

                {/* Đơn hàng */}
                <div style={styles.statCard}>
                    <div style={styles.statHeader}>
                        <div style={{ ...styles.statIcon, backgroundColor: 'rgba(34, 197, 94, 0.2)' }}>
                            <span style={styles.icon}>🛒</span>
                        </div>
                        <div style={styles.statTrend}>
                            <span style={{ ...styles.trendText, color: '#10b981' }}>↑ 8.3%</span>
                            <span style={styles.trendLabel}>so với tháng trước</span>
                        </div>
                    </div>
                    <h3 style={styles.statLabel}>Đơn hàng</h3>
                    <h1 style={styles.statValue}>{formatNumber(stats.orders)}</h1>
                    <div style={styles.statProgress}>
                        <div style={{ ...styles.progressBar, width: '60%', backgroundColor: '#22c55e' }}></div>
                    </div>
                </div>

                {/* Sản phẩm */}
                <div style={styles.statCard}>
                    <div style={styles.statHeader}>
                        <div style={{ ...styles.statIcon, backgroundColor: 'rgba(234, 179, 8, 0.2)' }}>
                            <span style={styles.icon}>📦</span>
                        </div>
                        <div style={styles.statTrend}>
                            <span style={{ ...styles.trendText, color: '#10b981' }}>↑ 5.2%</span>
                            <span style={styles.trendLabel}>sản phẩm mới</span>
                        </div>
                    </div>
                    <h3 style={styles.statLabel}>Sản phẩm</h3>
                    <h1 style={styles.statValue}>{formatNumber(stats.products)}</h1>
                    <div style={styles.statProgress}>
                        <div style={{ ...styles.progressBar, width: '45%', backgroundColor: '#eab308' }}></div>
                    </div>
                </div>

                {/* Người dùng */}
                <div style={styles.statCard}>
                    <div style={styles.statHeader}>
                        <div style={{ ...styles.statIcon, backgroundColor: 'rgba(239, 68, 68, 0.2)' }}>
                            <span style={styles.icon}>👥</span>
                        </div>
                        <div style={styles.statTrend}>
                            <span style={{ ...styles.trendText, color: '#10b981' }}>↑ 15.7%</span>
                            <span style={styles.trendLabel}>người dùng mới</span>
                        </div>
                    </div>
                    <h3 style={styles.statLabel}>Người dùng</h3>
                    <h1 style={styles.statValue}>{formatNumber(stats.users)}</h1>
                    <div style={styles.statProgress}>
                        <div style={{ ...styles.progressBar, width: '85%', backgroundColor: '#ef4444' }}></div>
                    </div>
                </div>
            </div>
        </div>
    );
};

// Styles (Giữ nguyên như cũ)
const styles = {
    container: {
        color: '#e0e0e0',
        minHeight: '100%',
        padding: '20px', // Thêm padding cho đẹp
    },

    loadingContainer: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '400px',
    },

    loadingSpinner: {
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
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '30px',
    },

    title: {
        fontSize: '28px',
        fontWeight: '700',
        margin: 0,
        background: 'linear-gradient(90deg, #ffffff, #a0a0c0)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
    },

    statsGrid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
        gap: '20px',
        marginBottom: '30px',
    },

    statCard: {
        backgroundColor: '#1a1a2e',
        borderRadius: '16px',
        padding: '25px',
        border: '1px solid #2a2a3a',
        transition: 'transform 0.3s ease, box-shadow 0.3s ease',
        cursor: 'pointer',
    },

    statHeader: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: '20px',
    },

    statIcon: {
        width: '60px',
        height: '60px',
        borderRadius: '12px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },

    icon: {
        fontSize: '28px',
    },

    statTrend: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-end',
    },

    trendText: {
        fontSize: '14px',
        fontWeight: '600',
    },

    trendLabel: {
        fontSize: '12px',
        color: '#8888aa',
        marginTop: '4px',
    },

    statLabel: {
        fontSize: '16px',
        color: '#a0a0c0',
        margin: '0 0 10px 0',
        fontWeight: '500',
    },

    statValue: {
        fontSize: '32px',
        fontWeight: '700',
        margin: '0 0 15px 0',
        color: '#ffffff',
    },

    statProgress: {
        height: '6px',
        backgroundColor: '#2a2a3a',
        borderRadius: '3px',
        overflow: 'hidden',
    },

    progressBar: {
        height: '100%',
        borderRadius: '3px',
    },
};

// Thêm animations vào CSS toàn cục (chạy 1 lần)
const styleSheet = document.styleSheets[0];
try {
    // Kiểm tra xem keyframes đã tồn tại chưa để tránh lỗi duplicate khi re-render
    let keyframesExist = false;
    for (let i = 0; i < styleSheet.cssRules.length; i++) {
        if (styleSheet.cssRules[i].name === 'spin') keyframesExist = true;
    }

    if (!keyframesExist) {
        styleSheet.insertRule(`
            @keyframes spin {
                0% { transform: rotate(0deg); }
                100% { transform: rotate(360deg); }
            }
        `, styleSheet.cssRules.length);
    }
} catch (e) {
    console.log("Animation styles already injected or styling blocked");
}

export default AdminDashboard;