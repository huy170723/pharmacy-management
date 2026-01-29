import React, { useState } from 'react';
import AdminDashboard from './AdminDashboard';
import ProductManager from './ProductManager';
import CategoryManager from './CategoryManager';
import OrderManager from './OrderManager';
import UserManager from './UserManager';

const AdminLayout = () => {
    const [currentTab, setCurrentTab] = useState('dashboard');

    // Hàm render nội dung dựa trên tab được chọn
    const renderContent = () => {
        switch (currentTab) {
            case 'dashboard': return <AdminDashboard />;
            case 'products': return <ProductManager />;
            case 'categories': return <CategoryManager />;
            case 'orders': return <OrderManager />;
            case 'users': return <UserManager />;
            default: return <AdminDashboard />;
        }
    };

    return (
        <div style={styles.layoutContainer}>
            {/* SIDEBAR BÊN TRÁI */}
            <div style={styles.sidebar}>
                <div style={styles.sidebarHeader}>
                    <div style={styles.logoContainer}>

                        <h3 style={styles.logoText}>ADMIN PANEL</h3>
                    </div>
                    <div style={styles.userInfo}>
                        <div style={styles.avatar}>A</div>
                        <div>
                            <p style={styles.userName}>Admin User</p>
                            <p style={styles.userRole}>Super Admin</p>
                        </div>
                    </div>
                </div>

                <div style={styles.menuContainer}>
                    <ul style={styles.menuList}>
                        <MenuItem

                            label="Thống kê"
                            isActive={currentTab === 'dashboard'}
                            onClick={() => setCurrentTab('dashboard')}
                        />
                        <MenuItem

                            label="Sản phẩm"
                            isActive={currentTab === 'products'}
                            onClick={() => setCurrentTab('products')}
                        />
                        <MenuItem

                            label="Danh mục "
                            isActive={currentTab === 'categories'}
                            onClick={() => setCurrentTab('categories')}
                        />
                        <MenuItem

                            label="Đơn hàng"
                            isActive={currentTab === 'orders'}
                            onClick={() => setCurrentTab('orders')}
                        />
                        <MenuItem

                            label="Người dùng"
                            isActive={currentTab === 'users'}
                            onClick={() => setCurrentTab('users')}
                        />
                    </ul>
                </div>

                <div style={styles.sidebarFooter}>
                    <p style={styles.footerText}>© 2023 Admin Panel</p>
                    <p style={styles.footerVersion}>v2.1.0</p>
                </div>
            </div>

            {/* NỘI DUNG BÊN PHẢI */}
            <div style={styles.contentContainer}>
                <div style={styles.contentHeader}>
                    <h2 style={styles.pageTitle}>
                        {currentTab === 'dashboard' && 'Tổng quan hệ thống'}
                        {currentTab === 'products' && 'Quản lý sản phẩm'}
                        {currentTab === 'categories' && 'Quản lý danh mục & thương hiệu'}
                        {currentTab === 'orders' && 'Quản lý đơn hàng'}
                        {currentTab === 'users' && 'Quản lý người dùng'}
                    </h2>

                </div>

                <div style={styles.contentBody}>
                    {renderContent()}
                </div>
            </div>
        </div>
    );
};

// Component MenuItem để tái sử dụng
const MenuItem = ({ icon, label, isActive, onClick }) => {
    return (
        <li
            onClick={onClick}
            style={{
                ...styles.menuItem,
                backgroundColor: isActive ? '#1a1a2e' : 'transparent',
                borderLeft: isActive ? '4px solid #6366f1' : '4px solid transparent',
            }}
        >
            <span style={styles.menuIcon}>{icon}</span>
            <span style={styles.menuLabel}>{label}</span>
            {isActive && <span style={styles.activeIndicator}></span>}
        </li>
    );
};

// Styles
const styles = {
    layoutContainer: {
        display: 'flex',
        minHeight: '100vh',
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
        backgroundColor: '#0f0f1a',
        color: '#e0e0e0',
    },

    // Sidebar styles
    sidebar: {
        width: '280px',
        background: 'linear-gradient(180deg, #0a0a0f 0%, #121212 100%)',
        color: 'white',
        display: 'flex',
        flexDirection: 'column',
        boxShadow: '4px 0 15px rgba(0, 0, 0, 0.5)',
        zIndex: 10,
    },

    sidebarHeader: {
        padding: '25px 20px',
        borderBottom: '1px solid #2a2a3a',
    },

    logoContainer: {
        display: 'flex',
        alignItems: 'center',
        marginBottom: '25px',
    },

    logoIcon: {
        fontSize: '28px',
        marginRight: '12px',
        color: '#6366f1',
    },

    logoText: {
        margin: 0,
        fontSize: '18px',
        fontWeight: '700',
        letterSpacing: '1px',
        background: 'linear-gradient(90deg, #6366f1, #a855f7)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
    },

    userInfo: {
        display: 'flex',
        alignItems: 'center',
        padding: '12px 15px',
        backgroundColor: '#1a1a2e',
        borderRadius: '10px',
        marginTop: '10px',
    },

    avatar: {
        width: '40px',
        height: '40px',
        borderRadius: '50%',
        backgroundColor: '#6366f1',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: '12px',
        fontWeight: 'bold',
        fontSize: '18px',
    },

    userName: {
        margin: 0,
        fontSize: '14px',
        fontWeight: '600',
    },

    userRole: {
        margin: 0,
        fontSize: '12px',
        color: '#a0a0c0',
    },

    menuContainer: {
        flex: 1,
        padding: '20px 0',
    },

    menuList: {
        listStyle: 'none',
        padding: 0,
        margin: 0,
    },

    menuItem: {
        display: 'flex',
        alignItems: 'center',
        padding: '15px 25px',
        cursor: 'pointer',
        transition: 'all 0.2s ease',
        marginBottom: '5px',
        position: 'relative',
        '&:hover': {
            backgroundColor: '#1a1a2e',
        },
    },

    menuIcon: {
        fontSize: '18px',
        marginRight: '15px',
        opacity: 0.9,
    },

    menuLabel: {
        fontSize: '15px',
        fontWeight: '500',
    },

    activeIndicator: {
        position: 'absolute',
        right: '15px',
        width: '8px',
        height: '8px',
        borderRadius: '50%',
        backgroundColor: '#6366f1',
        boxShadow: '0 0 8px #6366f1',
    },

    sidebarFooter: {
        padding: '20px',
        textAlign: 'center',
        borderTop: '1px solid #2a2a3a',
    },

    footerText: {
        fontSize: '12px',
        color: '#8888aa',
        margin: '5px 0',
    },

    footerVersion: {
        fontSize: '11px',
        color: '#555577',
        margin: 0,
    },

    // Content area styles
    contentContainer: {
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: '#0f0f1a',
        padding: '20px',
        overflowY: 'auto',
    },

    contentHeader: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '25px',
        paddingBottom: '20px',
        borderBottom: '1px solid #2a2a3a',
    },

    pageTitle: {
        margin: 0,
        fontSize: '26px',
        fontWeight: '700',
        color: '#ffffff',
        letterSpacing: '0.5px',
    },

    headerActions: {
        display: 'flex',
        gap: '15px',
    },

    notificationBtn: {
        position: 'relative',
        backgroundColor: '#1a1a2e',
        border: 'none',
        borderRadius: '10px',
        width: '50px',
        height: '50px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer',
        transition: 'all 0.3s ease',
        '&:hover': {
            backgroundColor: '#2a2a3a',
            transform: 'translateY(-2px)',
        },
    },

    notificationIcon: {
        fontSize: '20px',
    },

    notificationBadge: {
        position: 'absolute',
        top: '8px',
        right: '8px',
        backgroundColor: '#ef4444',
        color: 'white',
        borderRadius: '50%',
        width: '18px',
        height: '18px',
        fontSize: '11px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontWeight: 'bold',
    },

    settingsBtn: {
        backgroundColor: '#1a1a2e',
        border: 'none',
        borderRadius: '10px',
        width: '50px',
        height: '50px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer',
        transition: 'all 0.3s ease',
        '&:hover': {
            backgroundColor: '#2a2a3a',
            transform: 'translateY(-2px)',
        },
    },

    settingsIcon: {
        fontSize: '20px',
    },

    contentBody: {
        flex: 1,
        backgroundColor: '#0a0a0f',
        borderRadius: '16px',
        padding: '25px',
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.4)',
        border: '1px solid #2a2a3a',
        overflowY: 'auto',
    },
};

export default AdminLayout;