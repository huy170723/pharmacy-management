import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import productApi from '../api/productApi';

const Header = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [suggestions, setSuggestions] = useState([]);
    const [showSuggestions, setShowSuggestions] = useState(false);
    const [isSearchFocused, setIsSearchFocused] = useState(false);
    const [cartCount, setCartCount] = useState(0);

    const navigate = useNavigate();
    const wrapperRef = useRef(null);

    /* USER SAFE */
    const user = (() => {
        try {
            return JSON.parse(localStorage.getItem('user'));
        } catch {
            return null;
        }
    })();

    /* ================== GIỎ HÀNG ================== */
    const loadCartCount = () => {
        if (!user) {
            setCartCount(0);
            return;
        }

        const cartKey = `cart_${user.id}`;
        const cart = JSON.parse(localStorage.getItem(cartKey)) || [];

        const totalQty = cart.reduce(
            (sum, item) => sum + (item.quantity || 1),
            0
        );

        setCartCount(totalQty);
    };

    useEffect(() => {
        loadCartCount();

        // 🔥 update realtime khi localStorage đổi
        const handleStorage = () => loadCartCount();
        window.addEventListener('storage', handleStorage);

        return () => window.removeEventListener('storage', handleStorage);
    }, [user]);

    /* CLICK OUTSIDE -> ẨN GỢI Ý */
    useEffect(() => {
        const handleClickOutside = (e) => {
            if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
                setShowSuggestions(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    /* FETCH SEARCH SUGGESTIONS */
    useEffect(() => {
        const fetchSuggestions = async () => {
            if (!searchTerm.trim()) {
                setSuggestions([]);
                setShowSuggestions(false);
                return;
            }

            try {
                const res = await productApi.getAll();
                const data = res.data?._embedded
                    ? res.data._embedded.productList
                    : res.data;

                const filtered = data
                    .filter(p =>
                        (p.name || p.proname || '')
                            .toLowerCase()
                            .includes(searchTerm.toLowerCase())
                    )
                    .slice(0, 5);

                setSuggestions(filtered);
                setShowSuggestions(filtered.length > 0);
            } catch (err) {
                console.error('Lỗi lấy gợi ý:', err);
            }
        };

        const timer = setTimeout(fetchSuggestions, 300);
        return () => clearTimeout(timer);
    }, [searchTerm]);

    /* SEARCH */
    const onSearch = (keyword) => {
        const finalKeyword = keyword || searchTerm;
        if (!finalKeyword.trim()) return;

        navigate(`/products?search=${encodeURIComponent(finalKeyword)}`);
        setShowSuggestions(false);
    };

    const handleLogout = () => {
        localStorage.removeItem('user');
        localStorage.removeItem('token');
        navigate('/login');
        window.location.reload();
    };

    return (
        <header style={styles.header}>
            <div style={styles.headerContent}>

                {/* LOGO */}
                <div style={styles.logo} onClick={() => navigate('/')}>
                    💊 <span style={styles.logoText}>PHARMACY</span>
                </div>

                {/* SEARCH */}
                <div style={styles.searchWrapper} ref={wrapperRef}>
                    <div
                        style={{
                            ...styles.searchContainer,
                            borderColor: isSearchFocused ? '#ffc107' : '#fff'
                        }}
                    >
                        <input
                            type="text"
                            placeholder="Tìm thuốc, thực phẩm chức năng..."
                            style={styles.searchInput}
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            onFocus={() => {
                                setIsSearchFocused(true);
                                if (suggestions.length) setShowSuggestions(true);
                            }}
                            onBlur={() => setIsSearchFocused(false)}
                            onKeyDown={(e) => e.key === 'Enter' && onSearch()}
                        />

                        <button style={styles.searchBtn} onClick={() => onSearch()}>
                            🔍
                        </button>
                    </div>

                    {/* GỢI Ý */}
                    {showSuggestions && (
                        <div style={styles.suggestionBox}>
                            {suggestions.map(p => (
                                <div
                                    key={p.id}
                                    style={styles.productSuggestion}
                                    onMouseDown={() => onSearch(p.name || p.proname)}
                                >
                                    <img
                                        src={p.imageUrl || 'https://via.placeholder.com/40'}
                                        alt=""
                                        style={styles.productImage}
                                    />
                                    <div>
                                        <div style={styles.productName}>
                                            {p.name || p.proname}
                                        </div>
                                        <div style={styles.productPrice}>
                                            {p.price?.toLocaleString()} đ
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* ACTIONS */}
                <div style={styles.actions}>

                    {/* GIỎ HÀNG */}
                    <div style={styles.cartWrapper}>
                        <button
                            style={styles.cartButton}
                            onClick={() => {
                                if (!user) {
                                    alert('Vui lòng đăng nhập để xem giỏ hàng');
                                    navigate('/login');
                                } else {
                                    navigate('/cart');
                                }
                            }}
                        >
                            🛒
                        </button>

                        {cartCount > 0 && (
                            <span style={styles.cartBadge}>
                                {cartCount}
                            </span>
                        )}
                    </div>

                    {/* Thay thế đoạn hiển thị userBox cũ của Huy */}
                    {user ? (
                        <div style={styles.userBox}>
                            <span
                                style={styles.userName}
                                onClick={() => navigate('/profile')}
                            >
                                👤 {user.name || user.email}
                            </span>

                            {/* Thêm nút Admin nếu cần để Huy dễ vào quản trị */}


                            <button style={styles.logoutButton} onClick={handleLogout}>
                                Đăng xuất
                            </button>
                        </div>
                    ) : (
                        <button
                            style={styles.loginButton}
                            onClick={() => navigate('/login')}
                        >
                            Đăng nhập
                        </button>
                    )}
                </div>

            </div>
        </header>
    );
};

/* STYLE */
const styles = {
    header: {
        backgroundColor: '#1250dc',
        padding: '12px 0',
        position: 'sticky',
        top: 0,
        zIndex: 1000
    },
    headerContent: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '0 24px'
    },
    logo: { cursor: 'pointer', fontSize: 22, fontWeight: 'bold', color: '#fff' },
    logoText: { marginLeft: 6 },

    searchWrapper: { flex: 1, margin: '0 32px', position: 'relative' },
    searchContainer: {
        display: 'flex',
        background: '#fff',
        borderRadius: 24,
        padding: '8px 16px',
        border: '2px solid transparent'
    },
    searchInput: { flex: 1, border: 'none', outline: 'none' },
    searchBtn: { border: 'none', background: 'none', cursor: 'pointer' },

    suggestionBox: {
        position: 'absolute',
        background: '#fff',
        width: '100%',
        marginTop: 8,
        borderRadius: 8,
        boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
        zIndex: 999
    },
    productSuggestion: {
        padding: 10,
        display: 'flex',
        gap: 10,
        cursor: 'pointer'
    },
    productImage: { width: 40, height: 40, objectFit: 'contain' },
    productName: { fontSize: 14 },
    productPrice: { fontSize: 13, color: '#1250dc' },

    actions: { display: 'flex', alignItems: 'center', gap: 16 },

    cartWrapper: { position: 'relative' },
    cartButton: {
        background: 'none',
        border: 'none',
        color: '#fff',
        fontSize: 20,
        cursor: 'pointer'
    },
    cartBadge: {
        position: 'absolute',
        top: -6,
        right: -10,
        background: '#ffc107',
        color: '#000',
        borderRadius: '50%',
        padding: '2px 6px',
        fontSize: 12,
        fontWeight: 'bold'
    },

    loginButton: {
        background: '#ffc107',
        border: 'none',
        padding: '8px 20px',
        borderRadius: 20,
        cursor: 'pointer'
    },
    userBox: {
        display: 'flex',
        alignItems: 'center',
        gap: 10,
        background: 'rgba(255,255,255,0.15)',
        padding: '6px 14px',
        borderRadius: 20,
        color: '#fff'
    },
    userName: { cursor: 'pointer', fontWeight: 600 },
    logoutButton: {
        background: 'none',
        border: 'none',
        color: '#fff',
        cursor: 'pointer',
        fontSize: 13
    }
};

export default Header;
