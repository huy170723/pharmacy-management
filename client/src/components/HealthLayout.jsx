import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const HealthLayout = ({ children }) => {
    const location = useLocation();

    const menuItems = [
        { name: 'Tính Chỉ Số BMI', path: '/bmi', icon: '⚖️' },
        { name: 'Tính BMR & TDEE', path: '/bmr-tdee', icon: '🔥' },
        { name: 'Tính Huyết Áp', path: '/blood-pressure', icon: '❤️' },
    ];

    return (
        <div style={{ display: 'flex', padding: '30px 80px', gap: '30px', backgroundColor: '#f4f7fe', minHeight: '80vh' }}>
            {/* Sidebar bên trái (Cố định) */}
            <div style={styles.sidebar}>
                <h3 style={{ fontSize: '18px', color: '#333', marginBottom: '20px', paddingLeft: '15px' }}>SỨC KHỎE</h3>
                {menuItems.map((item) => (
                    <Link key={item.path} to={item.path} style={{ textDecoration: 'none' }}>
                        <div style={{
                            ...styles.menuItem,
                            backgroundColor: location.pathname === item.path ? '#eef2ff' : 'transparent',
                            color: location.pathname === item.path ? '#1250dc' : '#555',
                            borderLeft: location.pathname === item.path ? '4px solid #1250dc' : '4px solid transparent'
                        }}>
                            <span style={{ marginRight: '10px' }}>{item.icon}</span>
                            {item.name}
                        </div>
                    </Link>
                ))}
            </div>

            {/* Nội dung bên phải (Thay đổi theo trang) */}
            <div style={{ flex: 1 }}>
                {/* Breadcrumb giống mẫu Long Châu */}
                <div style={{ marginBottom: '20px', fontSize: '14px', color: '#777' }}>
                    🏠 Trang chủ / Công cụ / <span style={{ color: '#333' }}>Kiểm tra sức khỏe</span>
                </div>
                <div style={styles.mainContent}>
                    {children}
                </div>
            </div>
        </div>
    );
};

const styles = {
    sidebar: { width: '280px', backgroundColor: 'white', borderRadius: '15px', padding: '20px 0', height: 'fit-content', boxShadow: '0 2px 10px rgba(0,0,0,0.05)' },
    menuItem: { padding: '15px 20px', fontSize: '15px', display: 'flex', alignItems: 'center', transition: '0.3s', cursor: 'pointer', fontWeight: '500' },
    mainContent: { backgroundColor: 'white', borderRadius: '15px', padding: '30px', boxShadow: '0 2px 10px rgba(0,0,0,0.05)', minHeight: '500px' }
};

export default HealthLayout;