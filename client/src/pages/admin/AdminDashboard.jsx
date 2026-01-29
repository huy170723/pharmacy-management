import React, { useEffect, useState } from 'react';
import adminApi from '../../api/adminApi';

const AdminDashboard = () => {
    const [stats, setStats] = useState({
        revenue: 0,
        orders: 0,
        products: 0,
        users: 0,
        growth: 12.5,
        conversionRate: 3.2,
        avgOrdersPerDay: 11.5,
        avgOrderValue: 1200000,
        avgProcessingTime: 2.4
    });

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                setLoading(true);
                const res = await adminApi.getStatistics();

                // Giả lập dữ liệu
                const mockData = {
                    revenue: res.data || res || 12500000,
                    orders: 345,
                    products: 1289,
                    users: 567,
                    growth: 12.5,
                    conversionRate: 3.2,
                    avgOrdersPerDay: 11.5,
                    avgOrderValue: 1200000,
                    avgProcessingTime: 2.4
                };

                setStats(mockData);
            } catch (err) {
                console.error("Lỗi thống kê:", err);
            } finally {
                setLoading(false);
            }
        };
        fetchStats();
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

    timeFilter: {
        display: 'flex',
        gap: '10px',
    },

    filterBtn: {
        padding: '8px 16px',
        backgroundColor: '#1a1a2e',
        border: '1px solid #2a2a3a',
        borderRadius: '8px',
        color: '#a0a0c0',
        cursor: 'pointer',
        fontSize: '14px',
        transition: 'all 0.3s ease',
        '&:hover': {
            backgroundColor: '#2a2a3a',
        },
    },

    filterBtnActive: {
        padding: '8px 16px',
        backgroundColor: '#6366f1',
        border: '1px solid #6366f1',
        borderRadius: '8px',
        color: 'white',
        cursor: 'pointer',
        fontSize: '14px',
        fontWeight: '600',
        transition: 'all 0.3s ease',
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
        '&:hover': {
            transform: 'translateY(-5px)',
            boxShadow: '0 10px 25px rgba(0, 0, 0, 0.3)',
            borderColor: '#3a3a5a',
        },
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

    secondaryStatsGrid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
        gap: '20px',
        marginBottom: '30px',
    },

    secondaryStatCard: {
        backgroundColor: '#1a1a2e',
        borderRadius: '16px',
        padding: '20px',
        border: '1px solid #2a2a3a',
        transition: 'transform 0.3s ease',
        '&:hover': {
            transform: 'translateY(-3px)',
            borderColor: '#3a3a5a',
        },
    },

    secondaryStatHeader: {
        display: 'flex',
        alignItems: 'center',
        marginBottom: '15px',
    },

    secondaryStatIcon: {
        width: '45px',
        height: '45px',
        borderRadius: '10px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: '15px',
    },

    secondaryStatLabel: {
        fontSize: '15px',
        color: '#a0a0c0',
        margin: 0,
        fontWeight: '500',
    },

    secondaryStatValueContainer: {
        display: 'flex',
        alignItems: 'flex-end',
        justifyContent: 'space-between',
    },

    secondaryStatValue: {
        fontSize: '28px',
        fontWeight: '700',
        margin: 0,
        color: '#ffffff',
    },

    conversionIndicator: {
        width: '80px',
        height: '6px',
        backgroundColor: '#2a2a3a',
        borderRadius: '3px',
        overflow: 'hidden',
    },

    conversionBar: {
        height: '100%',
        backgroundColor: '#8b5cf6',
        borderRadius: '3px',
    },

    dailyOrdersIndicator: {
        display: 'flex',
        alignItems: 'flex-end',
        gap: '4px',
        height: '40px',
        width: '80px',
    },

    orderBar: {
        width: '12px',
        borderRadius: '3px 3px 0 0',
        transition: 'height 0.3s ease',
    },

    valueIndicator: {
        width: '80px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },

    valueCircles: {
        position: 'relative',
        width: '50px',
        height: '50px',
    },

    valueCircle: {
        position: 'absolute',
        width: '100%',
        height: '100%',
        borderRadius: '50%',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
    },

    timeIndicator: {
        width: '80px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '8px',
    },

    clockFace: {
        width: '40px',
        height: '40px',
        borderRadius: '50%',
        border: '2px solid #f59e0b',
        position: 'relative',
    },

    clockHand: {
        position: 'absolute',
        width: '2px',
        height: '15px',
        backgroundColor: '#f59e0b',
        top: '10px',
        left: '50%',
        transform: 'translateX(-50%)',
        transformOrigin: 'bottom center',
        animation: 'clockHandMove 2s ease-in-out infinite alternate',
    },

    timeProgress: {
        width: '100%',
        height: '4px',
        backgroundColor: '#2a2a3a',
        borderRadius: '2px',
        overflow: 'hidden',
    },

    timeProgressBar: {
        height: '100%',
        backgroundColor: '#f59e0b',
        borderRadius: '2px',
    },

    chartSection: {
        marginBottom: '30px',
    },

    chartCard: {
        backgroundColor: '#1a1a2e',
        borderRadius: '16px',
        padding: '25px',
        border: '1px solid #2a2a3a',
    },

    sectionHeader: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '25px',
    },

    sectionTitle: {
        fontSize: '20px',
        fontWeight: '600',
        margin: 0,
        color: '#ffffff',
    },

    viewAll: {
        fontSize: '14px',
        color: '#6366f1',
        cursor: 'pointer',
        fontWeight: '500',
        transition: 'color 0.3s ease',
        '&:hover': {
            color: '#8b5cf6',
        },
    },

    chartContainer: {
        height: '250px',
    },

    chart: {
        display: 'flex',
        alignItems: 'flex-end',
        justifyContent: 'space-between',
        height: '200px',
        padding: '0 20px',
        marginBottom: '20px',
    },

    chartColumnContainer: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        flex: 1,
    },

    chartColumn: {
        height: '100%',
        width: '40px',
        display: 'flex',
        alignItems: 'flex-end',
        justifyContent: 'center',
    },

    chartBar: {
        width: '25px',
        borderRadius: '6px 6px 0 0',
        transition: 'height 0.5s ease',
    },

    chartLabel: {
        marginTop: '10px',
        fontSize: '14px',
        color: '#a0a0c0',
    },

    chartLegend: {
        display: 'flex',
        justifyContent: 'center',
        gap: '20px',
    },

    legendItem: {
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
    },

    legendColor: {
        width: '12px',
        height: '12px',
        borderRadius: '3px',
    },
};

// Thêm animations
const styleSheet = document.styleSheets[0];
styleSheet.insertRule(`
    @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
    }
`, styleSheet.cssRules.length);

styleSheet.insertRule(`
    @keyframes clockHandMove {
        0% { transform: translateX(-50%) rotate(0deg); }
        100% { transform: translateX(-50%) rotate(180deg); }
    }
`, styleSheet.cssRules.length);

export default AdminDashboard;