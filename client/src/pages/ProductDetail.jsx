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

    const user = JSON.parse(localStorage.getItem("user"));
    const DEFAULT_IMG = "https://via.placeholder.com/300?text=Pharmacy+Product";

    useEffect(() => {
        const fetchAllData = async () => {
            setLoading(true);
            try {
                // 1. Lấy chi tiết sản phẩm hiện tại (Thử bảng products rồi đến sale_products)
                let res;
                try {
                    res = await axios.get(`http://localhost:8080/api/products/${id}`);
                } catch {
                    res = await axios.get(`http://localhost:8080/api/sale_products/${id}`);
                }
                setProduct(res.data);

                // 2. Lấy đại sản phẩm liên quan (Lấy 4 cái đầu tiên từ danh sách chung)
                // Theo cấu trúc Spring Data REST của Huy: dữ liệu nằm trong _embedded.products
                const relatedRes = await axios.get(`http://localhost:8080/api/products`);
                const list = relatedRes.data?._embedded?.products || [];

                // Lấy đại 4 sản phẩm đầu tiên
                setRelatedProducts(list.slice(0, 4));

            } catch (error) {
                console.error("Lỗi tải dữ liệu:", error);
            } finally {
                setLoading(false);
                // Tự động cuộn lên đầu trang khi đổi sản phẩm
                window.scrollTo({ top: 0, behavior: 'smooth' });
            }
        };

        fetchAllData();
    }, [id]); // Quan trọng: Phải có [id] để khi bấm sản phẩm liên quan trang sẽ load lại

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
            imageUrl: product.imageUrl || DEFAULT_IMG
        });

        alert("Đã thêm sản phẩm vào giỏ hàng");
    };

    const handleBuyNow = () => {
        handleAddToCart();
        navigate('/cart');
    };

    if (loading) return <div style={styles.loading}>Đang tải dữ liệu...</div>;
    if (!product) return <div style={styles.loading}>Không tìm thấy sản phẩm!</div>;

    return (
        <div style={styles.container}>
            {/* Thanh điều hướng nhỏ */}
            <div style={styles.breadcrumb}>
                <Link to="/" style={{ textDecoration: 'none', color: '#666' }}>Trang chủ</Link>
                <span style={{ margin: '0 10px' }}>/</span>
                <span style={{ color: '#333', fontWeight: 'bold' }}>{product.name}</span>
            </div>

            <div style={styles.content}>
                <div style={styles.left}>
                    <img
                        src={product.imageUrl || DEFAULT_IMG}
                        alt={product.name}
                        style={styles.img}
                        onError={(e) => e.target.src = DEFAULT_IMG}
                    />
                </div>

                <div style={styles.right}>
                    <h1 style={styles.productTitle}>{product.name}</h1>

                    <div style={styles.priceBox}>
                        <span style={styles.salePrice}>
                            {(product.salePrice || product.price)?.toLocaleString()} đ
                        </span>
                        {product.salePrice && (
                            <span style={styles.oldPrice}>{product.price?.toLocaleString()} đ</span>
                        )}
                    </div>

                    <div style={styles.infoSection}>
                        <p><strong>Trạng thái:</strong> <span style={{ color: '#10b981' }}>Còn hàng</span></p>
                        <p><strong>Mô tả:</strong> {product.description || 'Đang cập nhật nội dung cho sản phẩm này...'}</p>
                    </div>

                    <div style={styles.btns}>
                        <button style={styles.btnCart} onClick={handleAddToCart}>
                            🛒 THÊM GIỎ HÀNG
                        </button>
                        <button style={styles.btnBuy} onClick={handleBuyNow}>
                            ⚡ MUA NGAY
                        </button>
                    </div>
                </div>
            </div>


        </div>
    );
};

const styles = {
    container: { padding: '40px 10%', background: '#f8fafc', minHeight: '100vh' },
    breadcrumb: { marginBottom: '25px', fontSize: '14px' },
    content: { display: 'flex', gap: '50px', background: '#fff', padding: '40px', borderRadius: '20px', boxShadow: '0 10px 25px rgba(0,0,0,0.05)' },
    left: { flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center' },
    img: { width: '100%', maxWidth: '350px', borderRadius: '15px', objectFit: 'contain' },
    right: { flex: 1.5 },
    productTitle: { fontSize: '32px', color: '#1e293b', marginBottom: '15px' },
    priceBox: { margin: '20px 0', display: 'flex', alignItems: 'baseline', gap: '15px' },
    salePrice: { fontSize: '36px', color: '#ef4444', fontWeight: 'bold' },
    oldPrice: { fontSize: '18px', color: '#94a3b8', textDecoration: 'line-through' },
    infoSection: { lineHeight: '1.8', color: '#475569', marginBottom: '30px' },
    btns: { display: 'flex', gap: '20px' },
    btnCart: { flex: 1, padding: '15px', borderRadius: '12px', border: '2px solid #1250dc', color: '#1250dc', fontWeight: 'bold', cursor: 'pointer', background: '#fff', transition: '0.3s' },
    btnBuy: { flex: 1, padding: '15px', borderRadius: '12px', background: '#1250dc', color: '#fff', border: 'none', fontWeight: 'bold', cursor: 'pointer', transition: '0.3s' },
    relatedSection: { marginTop: '60px' },
    sectionTitle: { fontSize: '24px', color: '#1e293b', marginBottom: '25px', textAlign: 'center' },
    relatedGrid: { display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '25px' },
    relatedCard: { background: '#fff', padding: '20px', borderRadius: '15px', textAlign: 'center', boxShadow: '0 4px 12px rgba(0,0,0,0.03)', transition: '0.3s' },
    relatedImgBox: { height: '150px', marginBottom: '15px' },
    relatedImg: { height: '100%', maxWidth: '100%', objectFit: 'contain' },
    relatedName: { fontSize: '14px', color: '#334155', marginBottom: '10px', height: '40px', overflow: 'hidden' },
    relatedPrice: { color: '#1250dc', fontSize: '16px' },
    loading: { textAlign: 'center', padding: '100px', fontSize: '20px', color: '#666' }
};

export default ProductDetail;