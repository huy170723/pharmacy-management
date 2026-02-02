import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
    // Lấy thông tin từ localStorage đã lưu ở AdminLogin.jsx
    const role = localStorage.getItem('role');
    const adminId = localStorage.getItem('adminId');
    const location = useLocation();

    // Ràng buộc: Phải có adminId VÀ role phải là 'ADMIN' mới được vào
    const isAuthenticated = adminId && role === 'ADMIN';

    if (!isAuthenticated) {
        // Lưu lại vị trí trang mà người dùng định vào để sau khi login xong có thể quay lại
        return <Navigate to="/admin/login" state={{ from: location }} replace />;
    }

    return children;
};

export default ProtectedRoute;