import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import productApi from '../api/productApi';

const CATEGORIES = [
    { id: 1, name: 'Thần kinh não', slug: 'than-kinh-nao' },
    { id: 2, name: 'Vitamin & Khoáng chất', slug: 'vitamin-khoang-chat' },
    { id: 3, name: 'Sức khoẻ tim mạch', slug: 'suc-khoe-tim-mach' },
    { id: 4, name: 'Tăng sức đề kháng', slug: 'tang-suc-de-khang' },
    { id: 5, name: 'Hỗ trợ tiêu hoá', slug: 'ho-tro-tieu-hoa' },
    { id: 6, name: 'Sinh lý - Nội tiết tố', slug: 'sinh-ly-noi-tiet-to' },
    { id: 7, name: 'Dinh dưỡng', slug: 'dinh-duong' },
    { id: 8, name: 'Hỗ trợ điều trị', slug: 'ho-tro-dieu-tri' },
    { id: 9, name: 'Giải pháp làn da', slug: 'giai-phap-lan-da' },
    { id: 10, name: 'Chăm sóc da mặt', slug: 'cham-soc-da-mat' },
    { id: 11, name: 'Hỗ trợ làm đẹp', slug: 'ho-tro-lam-dep' },
    { id: 12, name: 'Hỗ trợ tình dục', slug: 'ho-tro-tinh-duc' }
];

const ProductPage = () => {
    const [allProducts, setAllProducts] = useState([]); // Lưu toàn bộ data từ server
    const [filteredProducts, setFilteredProducts] = useState([]); // Data hiển thị sau khi nhấn Áp dụng

    // State tạm thời để lưu lựa chọn của người dùng
    const [tempCategory, setTempCategory] = useState('');
    const [tempPrice, setTempPrice] = useState('');

    const location = useLocation();
    const navigate = useNavigate();
    const params = new URLSearchParams(location.search);
    const searchQuery = params.get('search');

    // 1. Chỉ load toàn bộ sản phẩm 1 lần duy nhất khi vào trang
    useEffect(() => {
        const fetchAll = async () => {
            try {
                const res = await productApi.getAll();
                const data = res.data?._embedded ? res.data._embedded.productList : res.data;
                setAllProducts(data);
                setFilteredProducts(data); // Ban đầu hiện tất cả
            } catch (err) {
                console.error('Lỗi lấy sản phẩm', err);
            }
        };
        fetchAll();
    }, []);

    // 2. Hàm xử lý khi bấm nút "ÁP DỤNG"
    const handleApplyFilters = () => {
        let result = [...allProducts];

        // Lọc theo search (nếu có)
        if (searchQuery) {
            result = result.filter(p => p.name?.toLowerCase().includes(searchQuery.toLowerCase()));
        }

        // Lọc theo danh mục đã chọn tạm thời
        if (tempCategory) {
            const category = CATEGORIES.find(c => c.slug === tempCategory);
            if (category) {
                result = result.filter(p => Number(p.categoryId) === Number(category.id));
            }
        }

        // Lọc theo khoảng giá đã chọn tạm thời
        if (tempPrice === 'under100') result = result.filter(p => p.price < 100000);
        else if (tempPrice === '100to500') result = result.filter(p => p.price >= 100000 && p.price <= 500000);
        else if (tempPrice === 'over500') result = result.filter(p => p.price > 500000);

        setFilteredProducts(result); // Cập nhật danh sách hiển thị
    };

    return (
        <div style={{ display: 'flex', padding: '30px 80px', gap: '30px', background: '#f4f7fe' }}>
            {/* SIDEBAR BỘ LỌC */}
            <div style={styles.filterSidebar}>
                <h3 style={styles.filterTitle}>Danh mục</h3>
                <div style={styles.categoryList}>
                    <label style={styles.radioLabel}>
                        <input
                            type="radio"
                            name="catFilter"
                            checked={tempCategory === ''}
                            onChange={() => setTempCategory('')}
                        />
                        Tất cả danh mục
                    </label>
                    {CATEGORIES.map(cat => (
                        <label key={cat.id} style={styles.radioLabel}>
                            <input
                                type="radio"
                                name="catFilter"
                                checked={tempCategory === cat.slug}
                                onChange={() => setTempCategory(cat.slug)}
                            />
                            {cat.name}
                        </label>
                    ))}
                </div>

                <hr style={{ margin: '20px 0', border: '0.5px solid #eee' }} />

                <h3 style={styles.filterTitle}>Khoảng giá</h3>
                {[
                    { id: 'under100', label: 'Dưới 100.000đ' },
                    { id: '100to500', label: '100.000đ - 500.000đ' },
                    { id: 'over500', label: 'Trên 500.000đ' }
                ].map(item => (
                    <label key={item.id} style={styles.radioLabel}>
                        <input
                            type="radio"
                            name="priceFilter"
                            checked={tempPrice === item.id}
                            onChange={() => setTempPrice(item.id)}
                        />
                        {item.label}
                    </label>
                ))}

                {/* NÚT ÁP DỤNG QUAN TRỌNG NHẤT */}
                <button onClick={handleApplyFilters} style={styles.btnFilter}>
                    ÁP DỤNG BỘ LỌC
                </button>
            </div>

            {/* DANH SÁCH SẢN PHẨM */}
            <div style={{ flex: 1 }}>
                <div style={styles.productGrid}>
                    {filteredProducts.length === 0 ? (
                        <p style={{ gridColumn: '1/-1', textAlign: 'center' }}>Không có sản phẩm nào.</p>
                    ) : (
                        filteredProducts.map(p => (
                            <div key={p.id} style={styles.productCard} onClick={() => navigate(`/product/${p.id}`)}>
                                <img src={p.imageUrl} alt={p.name} style={styles.img} />
                                <h4 style={styles.title}>{p.name}</h4>
                                <p style={styles.price}>{p.price?.toLocaleString()} đ</p>
                                <button style={styles.btnBuy}>Chọn mua</button>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
};

const styles = {
    filterSidebar: { width: 250, background: '#fff', padding: 20, borderRadius: 12, height: 'fit-content', boxShadow: '0 2px 10px rgba(0,0,0,0.05)' },
    filterTitle: { fontSize: '16px', fontWeight: 'bold', marginBottom: '15px' },
    categoryList: { display: 'flex', flexDirection: 'column', gap: '8px' },
    radioLabel: { display: 'flex', alignItems: 'center', gap: '10px', fontSize: '14px', cursor: 'pointer', marginBottom: '5px' },
    btnFilter: { width: '100%', background: '#1250dc', color: '#fff', padding: '12px', borderRadius: '8px', border: 'none', cursor: 'pointer', marginTop: '20px', fontWeight: 'bold' },
    productGrid: { display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px' },
    productCard: { background: '#fff', padding: 15, borderRadius: 12, textAlign: 'center', cursor: 'pointer', transition: '0.3s' },
    img: { width: '100%', height: 150, objectFit: 'contain' },
    title: { fontSize: '13px', minHeight: '40px', margin: '10px 0' },
    price: { color: '#1250dc', fontWeight: 'bold', marginBottom: '10px' },
    btnBuy: { background: '#1250dc', color: '#fff', padding: '8px', borderRadius: '20px', border: 'none', width: '100%' }
};

export default ProductPage;