import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./auth.css";
import authService from "../../services/authService";

const Register = () => {
    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [passwordStrength, setPasswordStrength] = useState(0);

    const checkPasswordStrength = (pass) => {
        let strength = 0;
        if (pass.length >= 8) strength++;
        if (/[A-Z]/.test(pass)) strength++;
        if (/[0-9]/.test(pass)) strength++;
        if (/[^A-Za-z0-9]/.test(pass)) strength++;
        return strength;
    };

    const handlePasswordChange = (e) => {
        const pass = e.target.value;
        setPassword(pass);
        setPasswordStrength(checkPasswordStrength(pass));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        if (password !== confirmPassword) {
            setError("Mật khẩu xác nhận không khớp");
            return;
        }

        if (passwordStrength < 2) {
            setError("Mật khẩu quá yếu. Vui lòng sử dụng mật khẩu mạnh hơn");
            return;
        }

        setLoading(true);

        try {
            await authService.register({
                name,
                email,
                password
            });

            // Hiệu ứng delay trước khi chuyển trang
            setTimeout(() => {
                alert("Đăng ký thành công! Vui lòng đăng nhập.");
                navigate("/login");
            }, 800);

        } catch (err) {
            console.error(err);
            setError(err.response?.data?.message || "Đăng ký thất bại. Vui lòng thử lại.");
            setLoading(false);
        }
    };

    const getStrengthColor = () => {
        switch (passwordStrength) {
            case 0: return "#ef4444";
            case 1: return "#f97316";
            case 2: return "#eab308";
            case 3: return "#84cc16";
            case 4: return "#10b981";
            default: return "#e5e7eb";
        }
    };

    const getStrengthText = () => {
        switch (passwordStrength) {
            case 0: return "Rất yếu";
            case 1: return "Yếu";
            case 2: return "Trung bình";
            case 3: return "Mạnh";
            case 4: return "Rất mạnh";
            default: return "";
        }
    };

    return (
        <div className="auth-container">
            <div className="auth-box">
                <h2>Tạo Tài Khoản</h2>
                <p className="auth-subtitle">Đăng ký để bắt đầu trải nghiệm tuyệt vời</p>

                {error && (
                    <div className="error-message" style={{
                        background: 'rgba(239, 68, 68, 0.1)',
                        padding: '12px 16px',
                        borderRadius: '8px',
                        marginBottom: '20px',
                        border: '1px solid rgba(239, 68, 68, 0.2)',
                        fontSize: '14px',
                        color: '#ef4444',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px'
                    }}>
                        <span style={{ fontSize: '16px' }}>⚠️</span>
                        <span>{error}</span>
                    </div>
                )}

                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="name">Họ và tên</label>
                        <input
                            id="name"
                            type="text"
                            placeholder="Nhập họ và tên của bạn"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                            disabled={loading}
                        />
                    </div>

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
                        <label htmlFor="password">
                            Mật khẩu
                            {password && (
                                <span style={{
                                    float: 'right',
                                    fontSize: '12px',
                                    fontWeight: '600',
                                    color: getStrengthColor()
                                }}>
                                    {getStrengthText()}
                                </span>
                            )}
                        </label>
                        <input
                            id="password"
                            type="password"
                            placeholder="Nhập mật khẩu (ít nhất 8 ký tự)"
                            value={password}
                            onChange={handlePasswordChange}
                            required
                            disabled={loading}
                        />
                        {password && (
                            <div style={{
                                marginTop: '8px',
                                display: 'flex',
                                gap: '4px',
                                height: '4px'
                            }}>
                                {[1, 2, 3, 4].map((level) => (
                                    <div
                                        key={level}
                                        style={{
                                            flex: 1,
                                            backgroundColor: level <= passwordStrength
                                                ? getStrengthColor()
                                                : '#e5e7eb',
                                            borderRadius: '2px',
                                            transition: 'all 0.3s ease'
                                        }}
                                    />
                                ))}
                            </div>
                        )}
                        {password && (
                            <div style={{
                                fontSize: '12px',
                                color: '#6b7280',
                                marginTop: '4px',
                                display: 'flex',
                                flexWrap: 'wrap',
                                gap: '8px'
                            }}>
                                <span style={{ color: password.length >= 8 ? '#10b981' : '#9ca3af' }}>
                                    ✓ Ít nhất 8 ký tự
                                </span>
                                <span style={{ color: /[A-Z]/.test(password) ? '#10b981' : '#9ca3af' }}>
                                    ✓ Chữ hoa
                                </span>
                                <span style={{ color: /[0-9]/.test(password) ? '#10b981' : '#9ca3af' }}>
                                    ✓ Số
                                </span>
                                <span style={{ color: /[^A-Za-z0-9]/.test(password) ? '#10b981' : '#9ca3af' }}>
                                    ✓ Ký tự đặc biệt
                                </span>
                            </div>
                        )}
                    </div>

                    <div className="form-group">
                        <label htmlFor="confirmPassword">Xác nhận mật khẩu</label>
                        <input
                            id="confirmPassword"
                            type="password"
                            placeholder="Nhập lại mật khẩu"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                            disabled={loading}
                            style={{
                                borderColor: confirmPassword && password !== confirmPassword
                                    ? '#ef4444'
                                    : confirmPassword && password === confirmPassword
                                        ? '#10b981'
                                        : '#e5e7eb'
                            }}
                        />
                        {confirmPassword && password === confirmPassword && password && (
                            <span style={{
                                fontSize: '12px',
                                color: '#10b981',
                                marginTop: '4px',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '4px'
                            }}>
                                <span>✓</span> Mật khẩu khớp
                            </span>
                        )}
                        {confirmPassword && password !== confirmPassword && (
                            <span style={{
                                fontSize: '12px',
                                color: '#ef4444',
                                marginTop: '4px',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '4px'
                            }}>
                                <span>✗</span> Mật khẩu không khớp
                            </span>
                        )}
                    </div>

                    <div style={{
                        backgroundColor: '#f8fafc',
                        padding: '16px',
                        borderRadius: '8px',
                        margin: '20px 0',
                        fontSize: '14px',
                        color: '#64748b'
                    }}>
                        <div style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', marginBottom: '8px' }}>
                            <span>ℹ️</span>
                            <span>Mật khẩu nên có ít nhất 8 ký tự bao gồm chữ hoa, số và ký tự đặc biệt</span>
                        </div>
                    </div>

                    <button
                        className={`btn-primary ${loading ? 'loading' : ''}`}
                        type="submit"
                        disabled={loading}
                        style={{
                            width: '100%',
                            padding: '15px',
                            background: loading
                                ? '#9ca3af'
                                : 'linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)',
                            color: 'white',
                            border: 'none',
                            borderRadius: '8px',
                            fontSize: '16px',
                            fontWeight: '600',
                            cursor: loading ? 'not-allowed' : 'pointer',
                            transition: 'all 0.3s ease',
                            marginTop: '10px',
                            letterSpacing: '0.5px',
                            position: 'relative'
                        }}
                        onMouseEnter={(e) => {
                            if (!loading) {
                                e.target.style.transform = 'translateY(-2px)';
                                e.target.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1)';
                            }
                        }}
                        onMouseLeave={(e) => {
                            if (!loading) {
                                e.target.style.transform = 'translateY(0)';
                                e.target.style.boxShadow = 'none';
                            }
                        }}
                    >
                        {loading ? (
                            <>
                                <span style={{ opacity: 0 }}>Đăng ký</span>
                                <div style={{
                                    position: 'absolute',
                                    top: '50%',
                                    left: '50%',
                                    transform: 'translate(-50%, -50%)',
                                    width: '20px',
                                    height: '20px',
                                    border: '2px solid rgba(255, 255, 255, 0.3)',
                                    borderRadius: '50%',
                                    borderTopColor: 'white',
                                    animation: 'spin 0.8s linear infinite'
                                }}></div>
                            </>
                        ) : 'Đăng ký'}
                    </button>
                </form>

                <div className="auth-switch" style={{
                    textAlign: 'center',
                    marginTop: '30px',
                    paddingTop: '20px',
                    borderTop: '1px solid #e5e7eb',
                    color: '#6b7280',
                    fontSize: '15px'
                }}>
                    <p style={{ margin: 0 }}>
                        Đã có tài khoản?{' '}
                        <Link
                            to="/login"
                            style={{
                                color: '#4f46e5',
                                fontWeight: '600',
                                textDecoration: 'none',
                                position: 'relative',
                                transition: 'color 0.3s ease'
                            }}
                            onMouseEnter={(e) => {
                                e.target.style.color = '#4338ca';
                                e.target.style.textDecoration = 'underline';
                            }}
                            onMouseLeave={(e) => {
                                e.target.style.color = '#4f46e5';
                                e.target.style.textDecoration = 'none';
                            }}
                        >
                            Đăng nhập ngay
                        </Link>
                    </p>
                </div>
            </div>

            <style jsx="true">{`
                .auth-container {
                    min-height: 100vh;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
                    padding: 20px;
                }
                
                .auth-box {
                    background-color: #ffffff;
                    border-radius: 12px;
                    box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
                    padding: 40px;
                    width: 100%;
                    max-width: 480px;
                    transition: all 0.3s ease;
                    position: relative;
                    overflow: hidden;
                }
                
                .auth-box::before {
                    content: '';
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 4px;
                    background: linear-gradient(90deg, #4f46e5, #7c3aed);
                }
                
                .auth-box:hover {
                    transform: translateY(-5px);
                    box-shadow: 0 20px 40px -10px rgba(0, 0, 0, 0.15);
                }
                
                .auth-box h2 {
                    color: #1f2937;
                    font-size: 28px;
                    font-weight: 700;
                    margin-bottom: 8px;
                    text-align: center;
                }
                
                .auth-subtitle {
                    color: #6b7280;
                    text-align: center;
                    margin-bottom: 30px;
                    font-size: 15px;
                }
                
                .form-group {
                    margin-bottom: 20px;
                    position: relative;
                }
                
                .form-group label {
                    display: block;
                    color: #1f2937;
                    font-weight: 500;
                    margin-bottom: 8px;
                    font-size: 14px;
                    transition: all 0.3s ease;
                }
                
                .form-group input {
                    width: 100%;
                    padding: 14px 16px;
                    border: 2px solid #e5e7eb;
                    border-radius: 8px;
                    font-size: 16px;
                    transition: all 0.3s ease;
                    background-color: #f9fafb;
                    color: #1f2937;
                    box-sizing: border-box;
                }
                
                .form-group input:focus {
                    outline: none;
                    border-color: #4f46e5;
                    background-color: #fff;
                    box-shadow: 0 0 0 3px rgba(79, 70, 229, 0.1);
                }
                
                .form-group input::placeholder {
                    color: #9ca3af;
                }
                
                .form-group:focus-within label {
                    color: #4f46e5;
                }
                
                @keyframes spin {
                    to {
                        transform: translate(-50%, -50%) rotate(360deg);
                    }
                }
                
                @keyframes fadeIn {
                    from {
                        opacity: 0;
                        transform: translateY(20px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
                
                .auth-box {
                    animation: fadeIn 0.5s ease-out;
                }
                
                @media (max-width: 576px) {
                    .auth-container {
                        padding: 15px;
                        align-items: flex-start;
                        padding-top: 40px;
                    }
                    
                    .auth-box {
                        padding: 30px 25px;
                    }
                    
                    .auth-box h2 {
                        font-size: 24px;
                    }
                }
            `}</style>
        </div>
    );
};

export default Register;