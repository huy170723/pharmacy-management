import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useCart } from '../contexts/CartContext';

const ProductDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { addToCart } = useCart();

    const [product, setProduct] = useState(null);
    const [relatedProducts, setRelatedProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [mainImage, setMainImage] = useState('');
    const [quantity, setQuantity] = useState(1);
    const [showNotification, setShowNotification] = useState(false);

    const user = JSON.parse(localStorage.getItem("user"));
    const DEFAULT_IMG = "https://via.placeholder.com/300?text=Pharmacy+Product";

    useEffect(() => {
        const fetchAllData = async () => {
            setLoading(true);
            try {
                // 1. Lấy chi tiết sản phẩm hiện tại
                let res;
                try {
                    res = await axios.get(`http://localhost:8080/api/products/${id}`);
                } catch {
                    res = await axios.get(`http://localhost:8080/api/sale_products/${id}`);
                }
                const productData = res.data;
                setProduct(productData);
                setMainImage(productData.imageUrl || DEFAULT_IMG);

                // 2. Lấy sản phẩm liên quan
                const relatedRes = await axios.get(`http://localhost:8080/api/products`);
                const list = relatedRes.data?._embedded?.products || [];

                // Lọc bỏ sản phẩm hiện tại và lấy 4 sản phẩm khác
                const filteredList = list.filter(p => p.id !== productData.id);
                setRelatedProducts(filteredList.slice(0, 4));

            } catch (error) {
                console.error("Lỗi tải dữ liệu:", error);
            } finally {
                setLoading(false);
                window.scrollTo({ top: 0, behavior: 'smooth' });
            }
        };

        fetchAllData();
    }, [id]);

    // ================= XỬ LÝ GIỎ HÀNG =================
    const handleAddToCart = () => {
        if (!user) {
            alert("Vui lòng đăng nhập để thêm vào giỏ hàng");
            navigate('/login');
            return;
        }

        addToCart({
            id: product.id,
            name: product.name,
            price: product.salePrice || product.price,
            imageUrl: product.imageUrl || DEFAULT_IMG,
            quantity: quantity
        });

        // Hiển thị thông báo
        setShowNotification(true);
        setTimeout(() => setShowNotification(false), 3000);
    };

    const handleBuyNow = () => {
        handleAddToCart();
        setTimeout(() => navigate('/cart'), 500);
    };

    const handleQuantityChange = (type) => {
        if (type === 'increase') {
            setQuantity(prev => prev + 1);
        } else if (type === 'decrease' && quantity > 1) {
            setQuantity(prev => prev - 1);
        }
    };

    if (loading) return (
        <div style={styles.loadingContainer}>
            <div style={styles.spinner}></div>
            <p style={styles.loadingText}>Đang tải dữ liệu...</p>
        </div>
    );

    if (!product) return (
        <div style={styles.errorContainer}>
            <div style={styles.errorIcon}>⚠️</div>
            <h2 style={styles.errorTitle}>Không tìm thấy sản phẩm!</h2>
            <Link to="/" style={styles.backButton}>
                ← Quay lại trang chủ
            </Link>
        </div>
    );

    const currentPrice = product.salePrice || product.price;
    const discount = product.salePrice ? Math.round((1 - product.salePrice / product.price) * 100) : 0;

    return (
        <div style={styles.container}>
            {/* Thông báo thêm giỏ hàng thành công */}
            {showNotification && (
                <div style={styles.notification}>
                    <span style={styles.notificationIcon}>✓</span>
                    Đã thêm sản phẩm vào giỏ hàng!
                </div>
            )}

            {/* Thanh điều hướng */}
            <div style={styles.breadcrumb}>
                <Link to="/" style={styles.breadcrumbLink}>Trang chủ</Link>
                <span style={styles.breadcrumbSeparator}>/</span>
                <Link to="/products" style={styles.breadcrumbLink}>Sản phẩm</Link>
                <span style={styles.breadcrumbSeparator}>/</span>
                <span style={styles.breadcrumbCurrent}>{product.name}</span>
            </div>

            <div style={styles.content}>
                {/* Phần hình ảnh */}
                <div style={styles.imageSection}>
                    <div style={styles.mainImageContainer}>
                        <img
                            src={mainImage}
                            alt={product.name}
                            style={styles.mainImage}
                            onError={(e) => {
                                e.target.src = DEFAULT_IMG;
                                setMainImage(DEFAULT_IMG);
                            }}
                        />
                        {discount > 0 && (
                            <div style={styles.discountBadge}>
                                -{discount}%
                            </div>
                        )}
                    </div>

                    {/* Thumbnail images (nếu có nhiều ảnh) */}
                    <div style={styles.thumbnailContainer}>
                        <button
                            style={styles.thumbnailButton}
                            onClick={() => setMainImage(product.imageUrl || DEFAULT_IMG)}
                        >
                            <img
                                src={product.imageUrl || DEFAULT_IMG}
                                alt="Thumbnail 1"
                                style={styles.thumbnail}
                            />
                        </button>
                        {/* Có thể thêm thêm thumbnail nếu product có nhiều ảnh */}
                    </div>
                </div>

                {/* Phần thông tin sản phẩm */}
                <div style={styles.infoSection}>
                    <h1 style={styles.productTitle}>{product.name}</h1>

                    {/* Đánh giá sao */}
                    <div style={styles.ratingContainer}>
                        <div style={styles.stars}>
                            {[...Array(5)].map((_, i) => (
                                <span key={i} style={styles.star}>★</span>
                            ))}
                        </div>
                        <span style={styles.ratingText}>(4.8/5) · 124 đánh giá</span>
                    </div>

                    {/* Giá */}
                    <div style={styles.priceContainer}>
                        <div style={styles.currentPrice}>
                            {currentPrice.toLocaleString()} đ
                        </div>
                        {product.salePrice && (
                            <>
                                <div style={styles.originalPrice}>
                                    {product?.price?.toLocaleString()} đ
                                </div>
                                <div style={styles.discountTag}>
                                    Tiết kiệm {(product.price - product.salePrice).toLocaleString()} đ
                                </div>
                            </>
                        )}
                    </div>

                    {/* Thông tin chi tiết */}
                    <div style={styles.detailsCard}>
                        <div style={styles.detailItem}>
                            <span style={styles.detailLabel}>Trạng thái:</span>
                            <span style={styles.detailValue}>
                                <span style={styles.inStockDot}>●</span> Còn hàng
                            </span>
                        </div>
                        <div style={styles.detailItem}>
                            <span style={styles.detailLabel}>Phân loại:</span>
                            <span style={styles.detailValue}>
                                {product.category || 'Thuốc không kê đơn'}
                            </span>
                        </div>
                        <div style={styles.detailItem}>
                            <span style={styles.detailLabel}>Hãng sản xuất:</span>
                            <span style={styles.detailValue}>
                                {product.brand || 'Đang cập nhật'}
                            </span>
                        </div>
                    </div>

                    {/* Mô tả */}
                    <div style={styles.descriptionCard}>
                        <h3 style={styles.descriptionTitle}>Mô tả sản phẩm</h3>
                        <p style={styles.descriptionText}>
                            {product.description || 'Đang cập nhật nội dung cho sản phẩm này...'}
                        </p>
                    </div>

                    {/* Số lượng */}
                    <div style={styles.quantityContainer}>
                        <span style={styles.quantityLabel}>Số lượng:</span>
                        <div style={styles.quantityControls}>
                            <button
                                style={styles.quantityButton}
                                onClick={() => handleQuantityChange('decrease')}
                            >
                                -
                            </button>
                            <span style={styles.quantityDisplay}>{quantity}</span>
                            <button
                                style={styles.quantityButton}
                                onClick={() => handleQuantityChange('increase')}
                            >
                                +
                            </button>
                        </div>
                    </div>

                    {/* Nút hành động */}
                    <div style={styles.actionButtons}>
                        <button
                            style={styles.addToCartButton}
                            onClick={handleAddToCart}
                        >
                            <span style={styles.cartIcon}>🛒</span>
                            Thêm vào giỏ hàng
                        </button>
                        <button
                            style={styles.buyNowButton}
                            onClick={handleBuyNow}
                        >
                            <span style={styles.buyIcon}>⚡</span>
                            Mua ngay
                        </button>
                    </div>

                    {/* Thông tin hỗ trợ */}
                    <div style={styles.supportInfo}>
                        <div style={styles.supportItem}>
                            <span style={styles.supportIcon}>🚚</span>
                            <span>Miễn phí vận chuyển đơn từ 300.000đ</span>
                        </div>
                        <div style={styles.supportItem}>
                            <span style={styles.supportIcon}>🔄</span>
                            <span>Đổi trả trong 7 ngày nếu không hài lòng</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Sản phẩm liên quan */}
            {relatedProducts.length > 0 && (
                <div style={styles.relatedSection}>
                    <h2 style={styles.sectionTitle}>Sản phẩm liên quan</h2>
                    <div style={styles.relatedGrid}>
                        {relatedProducts.map((item) => (
                            <Link
                                to={`/product/${item.id}`}
                                key={item.id}
                                style={styles.relatedCard}
                            >
                                <div style={styles.relatedImageContainer}>
                                    <img
                                        src={item.imageUrl || DEFAULT_IMG}
                                        alt={item.name}
                                        style={styles.relatedImage}
                                        onError={(e) => e.target.src = DEFAULT_IMG}
                                    />
                                    {item.salePrice && (
                                        <div style={styles.relatedDiscount}>
                                            -{Math.round((1 - item.salePrice / item.price) * 100)}%
                                        </div>
                                    )}
                                </div>
                                <h3 style={styles.relatedName}>{item.name}</h3>
                                <div style={styles.relatedPriceContainer}>
                                    <span style={styles.relatedCurrentPrice}>
                                        {(item.salePrice || item.price).toLocaleString()} đ
                                    </span>
                                    {item.salePrice && (
                                        <span style={styles.relatedOldPrice}>
                                            {item.price.toLocaleString()} đ
                                        </span>
                                    )}
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

const styles = {
    container: {
        padding: '40px 10%',
        background: 'linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)',
        minHeight: '100vh'
    },
    breadcrumb: {
        marginBottom: '30px',
        fontSize: '14px',
        display: 'flex',
        alignItems: 'center',
        gap: '8px'
    },
    breadcrumbLink: {
        textDecoration: 'none',
        color: '#64748b',
        transition: 'color 0.2s'
    },
    breadcrumbSeparator: {
        color: '#cbd5e1'
    },
    breadcrumbCurrent: {
        color: '#1e293b',
        fontWeight: '600'
    },
    content: {
        display: 'grid',
        gridTemplateColumns: '1fr 1.5fr',
        gap: '50px',
        background: '#fff',
        padding: '40px',
        borderRadius: '20px',
        boxShadow: '0 10px 25px rgba(0,0,0,0.05)',
        marginBottom: '60px'
    },
    imageSection: {
        display: 'flex',
        flexDirection: 'column',
        gap: '20px'
    },
    mainImageContainer: {
        position: 'relative',
        background: '#f8fafc',
        borderRadius: '15px',
        padding: '30px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    mainImage: {
        width: '100%',
        maxWidth: '400px',
        height: 'auto',
        objectFit: 'contain'
    },
    discountBadge: {
        position: 'absolute',
        top: '15px',
        right: '15px',
        background: '#ef4444',
        color: 'white',
        padding: '8px 12px',
        borderRadius: '20px',
        fontWeight: 'bold',
        fontSize: '14px'
    },
    thumbnailContainer: {
        display: 'flex',
        gap: '10px'
    },
    thumbnailButton: {
        border: '2px solid #e2e8f0',
        borderRadius: '10px',
        padding: '5px',
        background: 'white',
        cursor: 'pointer',
        transition: 'border-color 0.2s'
    },
    thumbnail: {
        width: '80px',
        height: '80px',
        objectFit: 'contain',
        borderRadius: '8px'
    },
    infoSection: {
        display: 'flex',
        flexDirection: 'column',
        gap: '20px'
    },
    productTitle: {
        fontSize: '32px',
        color: '#1e293b',
        fontWeight: '700',
        lineHeight: '1.2'
    },
    ratingContainer: {
        display: 'flex',
        alignItems: 'center',
        gap: '10px'
    },
    stars: {
        color: '#fbbf24',
        fontSize: '18px'
    },
    star: {
        marginRight: '2px'
    },
    ratingText: {
        color: '#64748b',
        fontSize: '14px'
    },
    priceContainer: {
        display: 'flex',
        alignItems: 'center',
        gap: '15px',
        flexWrap: 'wrap'
    },
    currentPrice: {
        fontSize: '42px',
        color: '#ef4444',
        fontWeight: '800'
    },
    originalPrice: {
        fontSize: '24px',
        color: '#94a3b8',
        textDecoration: 'line-through'
    },
    discountTag: {
        background: '#fef2f2',
        color: '#dc2626',
        padding: '6px 12px',
        borderRadius: '20px',
        fontSize: '14px',
        fontWeight: '600'
    },
    detailsCard: {
        background: '#f8fafc',
        padding: '20px',
        borderRadius: '12px',
        display: 'flex',
        flexDirection: 'column',
        gap: '12px'
    },
    detailItem: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    detailLabel: {
        color: '#64748b',
        fontSize: '14px'
    },
    detailValue: {
        color: '#1e293b',
        fontWeight: '500',
        fontSize: '14px'
    },
    inStockDot: {
        color: '#10b981',
        marginRight: '8px'
    },
    descriptionCard: {
        marginTop: '10px'
    },
    descriptionTitle: {
        fontSize: '18px',
        color: '#1e293b',
        marginBottom: '10px',
        fontWeight: '600'
    },
    descriptionText: {
        color: '#475569',
        lineHeight: '1.6',
        fontSize: '15px'
    },
    quantityContainer: {
        display: 'flex',
        alignItems: 'center',
        gap: '20px',
        marginTop: '10px'
    },
    quantityLabel: {
        color: '#1e293b',
        fontWeight: '500'
    },
    quantityControls: {
        display: 'flex',
        alignItems: 'center',
        border: '2px solid #e2e8f0',
        borderRadius: '10px',
        overflow: 'hidden'
    },
    quantityButton: {
        width: '40px',
        height: '40px',
        border: 'none',
        background: '#f8fafc',
        fontSize: '18px',
        cursor: 'pointer',
        transition: 'background 0.2s'
    },
    quantityDisplay: {
        width: '50px',
        textAlign: 'center',
        fontWeight: '600'
    },
    actionButtons: {
        display: 'flex',
        gap: '15px',
        marginTop: '10px'
    },
    addToCartButton: {
        flex: 1,
        padding: '16px 24px',
        borderRadius: '12px',
        border: '2px solid #3b82f6',
        background: 'white',
        color: '#3b82f6',
        fontWeight: '700',
        fontSize: '16px',
        cursor: 'pointer',
        transition: 'all 0.3s',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '10px'
    },
    buyNowButton: {
        flex: 1,
        padding: '16px 24px',
        borderRadius: '12px',
        background: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)',
        color: 'white',
        border: 'none',
        fontWeight: '700',
        fontSize: '16px',
        cursor: 'pointer',
        transition: 'all 0.3s',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '10px'
    },
    cartIcon: {
        fontSize: '18px'
    },
    buyIcon: {
        fontSize: '18px'
    },
    supportInfo: {
        marginTop: '20px',
        display: 'flex',
        flexDirection: 'column',
        gap: '10px'
    },
    supportItem: {
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
        color: '#475569',
        fontSize: '14px'
    },
    supportIcon: {
        fontSize: '16px'
    },
    relatedSection: {
        marginTop: '40px'
    },
    sectionTitle: {
        fontSize: '28px',
        color: '#1e293b',
        marginBottom: '30px',
        textAlign: 'center',
        fontWeight: '700'
    },
    relatedGrid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(4, 1fr)',
        gap: '25px'
    },
    relatedCard: {
        background: '#fff',
        borderRadius: '15px',
        overflow: 'hidden',
        textDecoration: 'none',
        transition: 'transform 0.3s, box-shadow 0.3s',
        boxShadow: '0 4px 12px rgba(0,0,0,0.05)'
    },
    relatedImageContainer: {
        position: 'relative',
        height: '200px',
        background: '#f8fafc',
        padding: '20px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    },
    relatedImage: {
        maxHeight: '100%',
        maxWidth: '100%',
        objectFit: 'contain'
    },
    relatedDiscount: {
        position: 'absolute',
        top: '10px',
        right: '10px',
        background: '#ef4444',
        color: 'white',
        padding: '4px 8px',
        borderRadius: '15px',
        fontSize: '12px',
        fontWeight: 'bold'
    },
    relatedName: {
        padding: '15px 15px 5px',
        fontSize: '14px',
        color: '#334155',
        fontWeight: '500',
        height: '40px',
        overflow: 'hidden',
        lineHeight: '1.3'
    },
    relatedPriceContainer: {
        padding: '0 15px 15px',
        display: 'flex',
        flexDirection: 'column',
        gap: '2px'
    },
    relatedCurrentPrice: {
        color: '#ef4444',
        fontSize: '16px',
        fontWeight: '700'
    },
    relatedOldPrice: {
        color: '#94a3b8',
        fontSize: '13px',
        textDecoration: 'line-through'
    },
    notification: {
        position: 'fixed',
        top: '20px',
        right: '20px',
        background: '#10b981',
        color: 'white',
        padding: '15px 25px',
        borderRadius: '10px',
        boxShadow: '0 4px 12px rgba(16, 185, 129, 0.3)',
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
        zIndex: '1000',
        animation: 'slideIn 0.3s ease-out'
    },
    notificationIcon: {
        fontSize: '20px',
        fontWeight: 'bold'
    },
    loadingContainer: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '70vh',
        gap: '20px'
    },
    spinner: {
        width: '50px',
        height: '50px',
        border: '4px solid #e2e8f0',
        borderTopColor: '#3b82f6',
        borderRadius: '50%',
        animation: 'spin 1s linear infinite'
    },
    loadingText: {
        color: '#64748b',
        fontSize: '18px'
    },
    errorContainer: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '70vh',
        gap: '20px'
    },
    errorIcon: {
        fontSize: '64px'
    },
    errorTitle: {
        color: '#ef4444',
        fontSize: '24px'
    },
    backButton: {
        padding: '12px 24px',
        background: '#3b82f6',
        color: 'white',
        textDecoration: 'none',
        borderRadius: '8px',
        fontWeight: '500',
        transition: 'background 0.3s'
    }
};

// Thêm CSS animations
const styleSheet = document.styleSheets[0];
styleSheet.insertRule(`
    @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
    }
`, styleSheet.cssRules.length);
styleSheet.insertRule(`
    @keyframes slideIn {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
`, styleSheet.cssRules.length);
styleSheet.insertRule(`
    .relatedCard:hover {
        transform: translateY(-5px);
        box-shadow: 0 10px 25px rgba(0,0,0,0.1);
    }
`, styleSheet.cssRules.length);
styleSheet.insertRule(`
    .addToCartButton:hover {
        background: #3b82f6;
        color: white;
    }
`, styleSheet.cssRules.length);
styleSheet.insertRule(`
    .buyNowButton:hover {
        transform: translateY(-2px);
        box-shadow: 0 8px 20px rgba(59, 130, 246, 0.3);
    }
`, styleSheet.cssRules.length);
styleSheet.insertRule(`
    .breadcrumbLink:hover {
        color: #3b82f6;
    }
`, styleSheet.cssRules.length);
styleSheet.insertRule(`
    .quantityButton:hover {
        background: #e2e8f0;
    }
`, styleSheet.cssRules.length);

export default ProductDetail;