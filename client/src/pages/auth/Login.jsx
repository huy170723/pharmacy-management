import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./auth.css";
import authService from "../../services/authService";

const Login = () => {
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        try {
            const res = await authService.login({
                email,
                password
            });

            // ✅ BƯỚC 1: Trích xuất đúng dữ liệu từ Backend
            // Đảm bảo Backend trả về các trường: id, email, name, token
            const { id, email: userEmail, name: userName, token } = res.data;

            // ✅ BƯỚC 2: Lưu Token bảo mật
            if (token) {
                localStorage.setItem("token", token);
            }

            // ✅ BƯỚC 3: Lưu thông tin User (Đây là chìa khóa để fix lỗi thanh toán)
            // Chúng ta ép kiểu id về số hoặc chuỗi chuẩn để tránh lỗi undefined
            if (id) {
                const userData = {
                    id: id,
                    email: userEmail,
                    name: userName || userEmail.split("@")[0]
                };
                localStorage.setItem("user", JSON.stringify(userData));
            } else {
                throw new Error("Dữ liệu phản hồi thiếu ID người dùng!");
            }

            // ✅ BƯỚC 4: Chuyển hướng và làm mới trạng thái
            setTimeout(() => {
                // Xóa lịch sử Login và load lại để App nhận diện User mới có ID
                window.location.replace("/");
            }, 500);

        } catch (err) {
            console.error("Lỗi đăng nhập:", err);
            setError(err.response?.data?.message || "Sai email hoặc mật khẩu hoặc lỗi hệ thống");
            setLoading(false);
        }
    };

    return (
        <div className="auth-container">
            <div className="auth-box">
                <h2>Đăng Nhập</h2>
                <p className="auth-subtitle">Chào mừng Huy trở lại!</p>

                {error && (
                    <div className="error-message" style={styles.errorBox}>
                        <span style={{ fontSize: '16px' }}>⚠️</span>
                        <span>{error}</span>
                    </div>
                )}

                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input
                            id="email"
                            type="email"
                            placeholder="Nhập email của bạn"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            disabled={loading}
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="password">Mật khẩu</label>
                        <input
                            id="password"
                            type="password"
                            placeholder="Nhập mật khẩu"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            disabled={loading}
                        />
                    </div>

                    <div style={{ textAlign: 'right', marginBottom: '10px' }}>
                        <Link to="/forgot-password" style={styles.forgotPass}>
                            Quên mật khẩu?
                        </Link>
                    </div>

                    <button
                        className={`btn-primary ${loading ? 'loading' : ''}`}
                        type="submit"
                        disabled={loading}
                        style={{
                            ...styles.loginBtn,
                            background: loading ? '#9ca3af' : 'linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)',
                            cursor: loading ? 'not-allowed' : 'pointer'
                        }}
                    >
                        {loading ? 'ĐANG XỬ LÝ...' : 'ĐĂNG NHẬP'}
                    </button>
                </form>

                <div className="auth-switch" style={styles.authSwitch}>
                    <p style={{ margin: 0 }}>
                        Chưa có tài khoản?{' '}
                        <Link to="/register" style={styles.registerLink}>
                            Đăng ký ngay
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

const styles = {
    errorBox: { background: 'rgba(239, 68, 68, 0.1)', padding: '12px 16px', borderRadius: '8px', marginBottom: '20px', border: '1px solid rgba(239, 68, 68, 0.2)', fontSize: '14px', color: '#ef4444', display: 'flex', alignItems: 'center', gap: '8px' },
    forgotPass: { fontSize: '14px', color: '#64748b', textDecoration: 'none' },
    loginBtn: { width: '100%', padding: '15px', color: 'white', border: 'none', borderRadius: '8px', fontSize: '16px', fontWeight: '600', transition: 'all 0.3s ease', marginTop: '10px' },
    authSwitch: { textAlign: 'center', marginTop: '30px', paddingTop: '20px', borderTop: '1px solid #e5e7eb', color: '#6b7280', fontSize: '15px' },
    registerLink: { color: '#4f46e5', fontWeight: '600', textDecoration: 'none' }
};

export default Login;