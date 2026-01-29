import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const HomePage = () => {
    const [products, setProducts] = useState([]);
    const [saleProducts, setSaleProducts] = useState([]);
    const [currentSubBanner, setCurrentSubBanner] = useState(0);

    const subBannerImages = [
        "https://cdn.nhathuoclongchau.com.vn/unsafe/1920x0/filters:quality(90):format(webp)/Banner_H1_Web_PC_1610x492_805x246_969a492928.jpg",
        "https://cdn.nhathuoclongchau.com.vn/unsafe/1920x0/filters:quality(90):format(webp)/Banner_H1_Web_PC_1610x492_805x246_d7a013df35.jpg",
        "https://cdn.nhathuoclongchau.com.vn/unsafe/1920x0/filters:quality(90):format(webp)/D_H1_Desktop_1200x367_f6daf1d18a.png",
        "https://cdn.nhathuoclongchau.com.vn/unsafe/1920x0/filters:quality(90):format(webp)/D_H1_Desktop_1200x367_9deee4e798.png"
    ];

    const blogPosts = [
        { id: 1, tag: 'Truyền thông', title: 'Pharmacy phối hợp STADA Pymepharco lan toả kiến thức y khoa về phòng tránh thừa cân, béo phì và giảm cân an toàn', img: 'https://cdn.nhathuoclongchau.com.vn/unsafe/835x470/filters:format(webp)/PAP_05829_e4106ae0fc.jpg' },
        { id: 2, tag: 'Truyền thông', title: 'Pharmacy đóng góp sáng kiến về y tế số tại Diễn đàn Kinh tế Thụy Sĩ – Việt Nam 2025', img: 'https://cdn.nhathuoclongchau.com.vn/unsafe/228x129/filters:format(webp)/img9763_1762309914009601793386_1762310125225_17623101258241322932016_e90feeffd6.jpg' },
        { id: 3, tag: 'Truyền thông', title: 'Pharmacy cùng Abbott – tập đoàn chăm sóc sức khỏe thế giới triển khai hợp tác chiến lược', img: 'https://cdn.nhathuoclongchau.com.vn/unsafe/228x129/filters:format(webp)/photo_2025_11_05_13_47_30_2_c90020df61.jpg' },
        { id: 4, tag: 'Truyền thông', title: 'Thương gửi "khúc ruột" miền Trung, Long Châu điều động 4 tấn thuốc hỗ trợ vùng lũ', img: 'https://cdn.nhathuoclongchau.com.vn/unsafe/228x129/filters:format(webp)/PAP_06210_bf4900b4cc.jpg' }
    ];

    const categories = [
        { id: 1, name: 'Thần kinh não', slug: 'than-kinh-nao', img: 'https://cdn.nhathuoclongchau.com.vn/unsafe/96x0/filters:quality(90):format(webp)/smalls/Than_kinh_nao_ae09cbf6e8.png' },
        { id: 2, name: 'Vitamin & Khoáng chất', slug: 'vitamin-khoang-chat', img: 'https://cdn.nhathuoclongchau.com.vn/unsafe/96x0/filters:quality(90):format(webp)/smalls/Vitamin_and_Khoang_chat_a92b3b1672.png' },
        { id: 3, name: 'Sức khoẻ tim mạch', slug: 'suc-khoe-tim-mach', img: 'https://cdn.nhathuoclongchau.com.vn/unsafe/96x0/filters:quality(90):format(webp)/smalls/Suc_khoe_tim_mach_e413362a48.png' },
        { id: 4, name: 'Tăng sức đề kháng', slug: 'tang-suc-de-khang', img: 'https://cdn.nhathuoclongchau.com.vn/unsafe/96x0/filters:quality(90):format(webp)/smalls/Tang_suc_de_khang_mien_dich_9926e39ba8.png' },
        { id: 5, name: 'Hỗ trợ tiêu hoá', slug: 'ho-tro-tieu-hoa', img: 'https://cdn.nhathuoclongchau.com.vn/unsafe/96x0/filters:quality(90):format(webp)/smalls/Ho_tro_tieu_hoa_ed4a57d578.png' },
        { id: 6, name: 'Sinh lý - Nội tiết tố', slug: 'sinh-ly-noi-tiet-to', img: 'https://cdn.nhathuoclongchau.com.vn/unsafe/96x0/filters:quality(90):format(webp)/smalls/Sinh_li_Noi_tiet_to_f9d4faa138.png' },
        { id: 7, name: 'Dinh dưỡng', slug: 'dinh-duong', img: 'https://cdn.nhathuoclongchau.com.vn/unsafe/96x0/filters:quality(90):format(webp)/smalls/Dinh_duong_c16bba60b5.png' },
        { id: 8, name: 'Hỗ trợ điều trị', slug: 'ho-tro-dieu-tri', img: 'https://cdn.nhathuoclongchau.com.vn/unsafe/96x0/filters:quality(90):format(webp)/smalls/Ho_tro_dieu_tri_149cc44167.png' },
        { id: 9, name: 'Giải pháp làn da', slug: 'giai-phap-lan-da', img: 'https://cdn.nhathuoclongchau.com.vn/unsafe/96x0/filters:quality(90):format(webp)/smalls/Icon_cat_lvl2_Giai_phap_lan_da_db544098c9.png' },
        { id: 10, name: 'Chăm sóc da mặt', slug: 'cham-soc-da-mat', img: 'https://cdn.nhathuoclongchau.com.vn/unsafe/96x0/filters:quality(90):format(webp)/smalls/Cham_soc_da_mat_cd83b6f191.png' },
        { id: 11, name: 'Hỗ trợ làm đẹp', slug: 'ho-tro-lam-dep', img: 'https://cdn.nhathuoclongchau.com.vn/unsafe/96x0/filters:quality(90):format(webp)/smalls/Ho_tro_lam_dep_dff6e2c13d.png' },
        { id: 12, name: 'Hỗ trợ tình dục', slug: 'ho-tro-tinh-duc', img: 'https://cdn.nhathuoclongchau.com.vn/unsafe/96x0/filters:quality(90):format(webp)/smalls/Ho_tro_tinh_duc_2497bbf972.png' }
    ];

    const healthChecks = [
        { title: 'Tính chỉ số BMI', path: '/bmi', icon: '⚖️', desc: 'Biết được tình trạng cân nặng của bạn thông qua chỉ số khối cơ thể.' },
        { title: 'Tra cứu Huyết áp', path: '/blood-pressure', icon: '❤️', desc: 'Đánh giá chỉ số huyết áp tâm thu và tâm trương của bạn.' },
        { title: 'Tính BMR & TDEE', path: '/bmr-tdee', icon: '🔥', desc: 'Xác định lượng calo cần thiết dựa trên mức độ hoạt động.' }
    ];

    useEffect(() => {
        const fetchData = async () => {
            try {
                // 1. SẢN PHẨM BÁN CHẠY
                const prodRes = await axios.get('http://localhost:8080/api/products');
                setProducts(prodRes.data || []);

                // 2. FLASH SALE (giữ nguyên như cũ)
                const saleRes = await axios.get('http://localhost:8080/api/sale_products');
                const saleList = saleRes.data?._embedded?.saleProducts || [];
                setSaleProducts(saleList);

            } catch (error) {
                console.error("Lỗi kết nối API:", error);
            }
        };
        fetchData();
    }, []);


    const handleNext = () => setCurrentSubBanner((prev) => (prev === subBannerImages.length - 1 ? 0 : prev + 1));
    const handlePrev = () => setCurrentSubBanner((prev) => (prev === 0 ? subBannerImages.length - 1 : prev - 1));

    return (
        <div style={{ backgroundColor: '#f4f7fe', minHeight: '100vh', fontFamily: 'Arial, sans-serif' }}>
            <div style={styles.fixedBannerWrapper}>
                <img src="https://cdn.nhathuoclongchau.com.vn/unsafe/2560x0/filters:quality(90):format(webp)/D_Hero_Banner_1216x280_png_ac03b0e531.png" alt="Fixed Banner" style={{ width: '100vw', height: 'auto', display: 'block' }} />
            </div>

            <div style={{ padding: '0 80px' }}>
                <div style={styles.subBannerWrapper}>
                    <button onClick={handlePrev} style={{ ...styles.navBtn, left: '15px' }}>❮</button>
                    <img src={subBannerImages[currentSubBanner]} alt="Slideshow" style={styles.subBannerImg} />
                    <button onClick={handleNext} style={{ ...styles.navBtn, right: '15px' }}>❯</button>
                </div>

                {/* FLASH SALE */}
                <section style={styles.saleSection}>
                    <h2 style={styles.saleTitle}>⚡ FLASH SALE HÔM NAY</h2>
                    <div style={styles.productGrid}>
                        {saleProducts.length > 0 ? saleProducts.map(p => {
                            // Tách ID từ self link để tránh lỗi undefined
                            const productId = p._links.self.href.split('/').pop();
                            return (
                                <Link key={productId} to={`/product/${productId}`} style={{ textDecoration: 'none' }}>
                                    <div style={styles.card}>
                                        <div style={styles.discountBadge}>-{p.discountPercent}%</div>
                                        <img src={p.imageUrl} alt={p.name} style={styles.img} />
                                        <h4 style={styles.title}>{p.name}</h4>
                                        <p style={styles.oldPrice}>{p.oldPrice?.toLocaleString()} đ</p>
                                        <p style={styles.salePriceText}>{p.salePrice?.toLocaleString()} đ</p>
                                        <button style={styles.btnBuy}>Mua ngay</button>
                                    </div>
                                </Link>
                            );
                        }) : <p style={{ color: 'white', textAlign: 'center', width: '100%' }}>Hiện tại chưa có ưu đãi Sale...</p>}
                    </div>
                </section>

                {/* SẢN PHẨM BÁN CHẠY */}
                {/* SẢN PHẨM BÁN CHẠY */}
                <section style={styles.hotSection}>
                    <h2 style={{ color: 'white', textAlign: 'center', marginBottom: '25px' }}>
                        🔥 SẢN PHẨM BÁN CHẠY
                    </h2>

                    <div style={styles.productGrid}>
                        {products.length > 0 ? products.slice(0, 5).map(product => (
                            <Link
                                key={product.id}
                                to={`/product/${product.id}`}
                                style={{ textDecoration: 'none' }}
                            >
                                <div style={styles.card}>
                                    <img
                                        src={product.imageUrl}
                                        alt={product.name}
                                        style={styles.img}
                                    />
                                    <h4 style={styles.title}>{product.name}</h4>
                                    <p style={styles.price}>
                                        {product.price?.toLocaleString()} đ
                                    </p>
                                    <button style={styles.btnBuy}>Chọn mua</button>
                                </div>
                            </Link>
                        )) : (
                            <p style={{ color: 'white', textAlign: 'center', width: '100%' }}>
                                Đang tải sản phẩm...
                            </p>
                        )}
                    </div>
                </section>


                {/* DANH MỤC NỔI BẬT */}
                <div style={{ marginTop: '40px' }}>
                    <h3>Danh mục nổi bật</h3>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6,1fr)', gap: '15px' }}>
                        {categories.map(cat => (
                            <Link
                                key={cat.id}
                                to={`/products?category=${cat.slug}`}
                                style={{ textDecoration: 'none' }}
                            >
                                <div style={{ background: '#fff', padding: '15px', borderRadius: '12px', textAlign: 'center' }}>
                                    <img src={cat.img} alt={cat.name} style={{ width: '60px', height: '60px' }} />
                                    <p style={{ marginTop: '10px', color: '#333', fontWeight: '600' }}>
                                        {cat.name}
                                    </p>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>

                {/* KIỂM TRA SỨC KHỎE */}
                <div style={{ marginTop: '30px' }}>
                    <div style={styles.healthCheckBanner}>
                        <div style={{ zIndex: 2 }}>
                            <h2 style={{ fontSize: '26px', marginBottom: '8px' }}>Kiểm tra sức khỏe</h2>
                            <p style={{ fontSize: '15px', opacity: 0.9 }}>Kết quả đánh giá sẽ cho bạn lời khuyên phù hợp!</p>
                        </div>
                        <div style={styles.checkCardContainer}>
                            {healthChecks.map((check, index) => (
                                <Link key={index} to={check.path} style={{ textDecoration: 'none', flex: 1 }}>
                                    <div style={styles.checkCard}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
                                            <div style={styles.checkIcon}>{check.icon}</div>
                                            <h4 style={{ fontSize: '15px', color: '#333', margin: 0 }}>{check.title}</h4>
                                        </div>
                                        <p style={{ fontSize: '12px', color: '#666', height: '32px' }}>{check.desc}</p>
                                        <button style={styles.btnStart}>Bắt đầu ngay</button>
                                    </div>
                                </Link>
                            ))}
                        </div>
                        <div style={styles.doctorWrapper}>
                            <img src="https://nhathuoclongchau.com.vn/estore-images/home/doctor-check.png" alt="Doctor" style={styles.doctorImg} />
                        </div>
                    </div>
                </div>

                {/* GÓC SỨC KHỎE */}
                <div style={{ marginTop: '50px', marginBottom: '50px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                        <h3 style={{ fontSize: '24px', display: 'flex', alignItems: 'center', margin: 0 }}>
                            <span style={{ color: '#1250dc', marginRight: '10px' }}>📰</span> Góc sức khỏe
                        </h3>
                        <Link to="/blog" style={{ color: '#1250dc', textDecoration: 'none', fontWeight: 'bold' }}>Xem tất cả &gt;</Link>
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: '30px' }}>
                        <Link to={`/blog/${blogPosts[0].id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                            <div style={styles.mainBlog}>
                                <img src={blogPosts[0].img} alt="Main" style={styles.mainBlogImg} />
                                <p style={{ color: '#777', fontSize: '14px', marginTop: '15px' }}>{blogPosts[0].tag}</p>
                                <h2 style={styles.mainBlogTitle}>{blogPosts[0].title}</h2>
                            </div>
                        </Link>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                            {blogPosts.slice(1).map(post => (
                                <Link key={post.id} to={`/blog/${post.id}`} style={{ textDecoration: 'none', color: 'inherit', display: 'flex', gap: '15px' }}>
                                    <img src={post.img} alt="sub" style={styles.subBlogImg} />
                                    <div>
                                        <p style={{ color: '#777', fontSize: '12px', margin: 0 }}>{post.tag}</p>
                                        <h4 style={styles.subBlogTitle}>{post.title}</h4>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

const styles = {
    fixedBannerWrapper: { width: '100%', position: 'relative', overflow: 'hidden', lineHeight: 0 },
    subBannerWrapper: { marginTop: '20px', position: 'relative', borderRadius: '15px', overflow: 'hidden', display: 'flex', alignItems: 'center', backgroundColor: '#fff' },
    subBannerImg: { width: '100%', aspectRatio: '16/5', objectFit: 'cover' },
    navBtn: { position: 'absolute', zIndex: 10, backgroundColor: 'rgba(255,255,255,0.8)', border: 'none', borderRadius: '50%', width: '40px', height: '40px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' },
    saleSection: { backgroundColor: '#c8102e', borderRadius: '20px', padding: '30px', marginTop: '40px' },
    saleTitle: { color: 'white', margin: '0 0 20px 0', fontSize: '28px', fontWeight: 'bold' },
    discountBadge: { position: 'absolute', top: '10px', left: '10px', backgroundColor: '#e30613', color: 'white', padding: '5px 10px', borderRadius: '20px', fontWeight: 'bold', zIndex: 5 },
    oldPrice: { color: '#999', textDecoration: 'line-through', fontSize: '14px' },
    salePriceText: { color: '#e30613', fontWeight: 'bold', fontSize: '20px' },
    hotSection: { backgroundColor: '#1250dc', borderRadius: '20px', padding: '30px', marginTop: '40px' },
    productGrid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(210px, 1fr))', gap: '20px' },
    categoryGrid: { display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: '15px' },
    categoryCard: { backgroundColor: 'white', padding: '20px 10px', borderRadius: '12px', textAlign: 'center', boxShadow: '0 2px 8px rgba(0,0,0,0.05)', border: '1px solid #f0f0f0', cursor: 'pointer' },
    card: { backgroundColor: 'white', padding: '20px', borderRadius: '15px', textAlign: 'center', position: 'relative' },
    img: { width: '100%', height: '160px', objectFit: 'contain' },
    title: { fontSize: '14px', height: '40px', margin: '15px 0', overflow: 'hidden', color: '#333' },
    price: { color: '#1250dc', fontWeight: 'bold', fontSize: '18px' },
    btnBuy: { width: '100%', backgroundColor: '#1250dc', color: 'white', border: 'none', padding: '10px', borderRadius: '20px', fontWeight: 'bold', cursor: 'pointer' },
    healthCheckBanner: { background: 'linear-gradient(90deg, #1250dc 0%, #3b82f6 100%)', borderRadius: '20px', padding: '35px', position: 'relative', color: 'white', overflow: 'hidden', display: 'flex', flexDirection: 'column', gap: '25px' },
    checkCardContainer: { display: 'flex', gap: '15px', zIndex: 2 },
    checkCard: { backgroundColor: 'white', padding: '18px', borderRadius: '16px', boxShadow: '0 4px 10px rgba(0,0,0,0.1)' },
    checkIcon: { fontSize: '20px', backgroundColor: '#f0f4ff', padding: '8px', borderRadius: '10px', display: 'inline-block' },
    btnStart: { backgroundColor: 'transparent', border: 'none', color: '#1250dc', fontWeight: 'bold', cursor: 'pointer' },
    doctorWrapper: { position: 'absolute', right: '15px', bottom: 0, height: '95%', zIndex: 1 },
    doctorImg: { height: '100%', objectFit: 'contain' },
    mainBlogImg: { width: '100%', borderRadius: '15px', height: '350px', objectFit: 'cover' },
    mainBlogTitle: { fontSize: '22px', fontWeight: 'bold', color: '#333', lineHeight: '1.4' },
    subBlogImg: { width: '160px', height: '90px', borderRadius: '10px', objectFit: 'cover' },
    subBlogTitle: { fontSize: '14px', fontWeight: '600', color: '#333', lineHeight: '1.4' }
};

export default HomePage;