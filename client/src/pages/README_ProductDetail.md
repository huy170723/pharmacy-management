# ProductDetail.jsx - Trang Chi Tiết Sản Phẩm

## 📖 Mô Tả
`ProductDetail.jsx` là một component React dùng để hiển thị chi tiết thông tin của một sản phẩm cụ thể trong hệ thống bán hàng online. Người dùng có thể xem hình ảnh, giá, mô tả, trạng thái sản phẩm và thực hiện các hành động như thêm vào giỏ hàng hoặc mua ngay.

## 🔧 Công Nghệ Sử Dụng
- **React Hooks**: useState, useEffect
- **React Router**: useParams, Link, useNavigate
- **Axios**: Gọi API từ backend
- **Context API**: CartContext để quản lý giỏ hàng
- **LocalStorage**: Lưu thông tin người dùng

## 📦 Props & State

### State
| State | Kiểu | Mô Tả |
|-------|------|-------|
| `product` | Object / null | Thông tin chi tiết của sản phẩm hiện tại |
| `relatedProducts` | Array | Danh sách các sản phẩm liên quan (tối đa 4 sản phẩm) |
| `loading` | Boolean | Trạng thái đang tải dữ liệu |

### Hooks & Context
| Hook | Mô Tả |
|------|-------|
| `useParams()` | Lấy ID sản phẩm từ URL |
| `useNavigate()` | Điều hướng giữa các trang |
| `useCart()` | Lấy hàm `addToCart()` để thêm sản phẩm vào giỏ hàng |

## 🎯 Chức Năng Chính

### 1. Lấy Dữ Liệu Sản Phẩm
```javascript
// Cố gắng lấy từ bảng products, nếu không tìm thấy lấy từ sale_products
const fetchAllData = async () => {
    try {
        res = await axios.get(`http://localhost:8080/api/products/${id}`);
    } catch {
        res = await axios.get(`http://localhost:8080/api/sale_products/${id}`);
    }
    setProduct(res.data);
}
```
- Endpoint lấy sản phẩm từ bảng `products`
- Nếu thất bại, tìm kiếm trong bảng `sale_products` (sản phẩm khuyến mãi)

### 2. Lấy Sản Phẩm Liên Quan
```javascript
const relatedRes = await axios.get(`http://localhost:8080/api/products`);
const list = relatedRes.data?._embedded?.products || [];
setRelatedProducts(list.slice(0, 4));
```
- Gọi API lấy tất cả sản phẩm
- Lấy 4 sản phẩm đầu tiên làm sản phẩm liên quan
- Tuân theo cấu trúc Spring Data REST với `_embedded.products`

### 3. Thêm Vào Giỏ Hàng
```javascript
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
}
```
- Kiểm tra người dùng đã đăng nhập chưa
- Nếu chưa → Điều hướng tới trang login
- Nếu rồi → Thêm sản phẩm vào giỏ hàng với thông tin: ID, tên, giá, hình ảnh

### 4. Mua Ngay
```javascript
const handleBuyNow = () => {
    handleAddToCart();
    navigate('/cart');
}
```
- Thêm sản phẩm vào giỏ hàng rồi điều hướng ngay tới trang giỏ hàng

## 📱 Giao Diện & Layout

### Cấu Trúc HTML
```
┌─────────────────────────────────────┐
│  Breadcrumb (Trang chủ / Tên sản phẩm)
├──────────────┬──────────────────────┤
│              │ Tên sản phẩm        │
│   Hình ảnh   │ Giá / Giá gốc        │
│              │ Trạng thái / Mô tả   │
│              │ [Nút Giỏ] [Nút Mua] │
└──────────────┴──────────────────────┘
```

### Các Phần Tử Giao Diện
- **Breadcrumb**: Thanh điều hướng nhỏ
- **Hình ảnh sản phẩm**: Hiển thị lớn, center, có fallback nếu ảnh lỗi
- **Tiêu đề sản phẩm**: Font size 32px, màu đậm
- **Giá tiền**: Hiển thị giá bán (đỏ, lớn) và giá gốc (gạch ngang, xám)
- **Mô tả**: Thông tin chi tiết về sản phẩm
- **Nút Thêm Giỏ Hàng**: Nền trắng, viền xanh
- **Nút Mua Ngay**: Nền xanh, chữ trắng

## 🎨 Styling

### Color Scheme
| Màu | Hex | Dùng Cho |
|-----|-----|----------|
| Xanh chính | #1250dc | Giá, nút "Mua Ngay", liên kết |
| Đỏ | #ef4444 | Giá khuyến mãi |
| Xanh lá | #10b981 | Trạng thái "Còn hàng" |
| Đen/Xám | #1e293b | Tiêu đề, text chính |
| Xám nhạt | #94a3b8, #94a3b8 | Giá gốc, text phụ |
| Nền | #f8fafc | Background container |

### Responsive Design
- **Layout**: Flexbox, 2 cột (left: 1fr, right: 1.5fr)
- **Gap**: 50px giữa hình ảnh và nội dung
- **Max Width Hình**: 350px
- **Border Radius**: 15-20px cho các phần tử chính
- **Shadow**: `0 10px 25px rgba(0,0,0,0.05)`

## ⚙️ Các Hằng Số

```javascript
const DEFAULT_IMG = "https://via.placeholder.com/300?text=Pharmacy+Product";
```
- Hình ảnh mặc định khi sản phẩm không có ảnh
- Sử dụng Placeholder.com - dịch vụ tạo hình ảnh placeholder online

## 🔄 Lifecycle

### Khi Component Được Load
1. ✅ Kiểm tra URL có ID sản phẩm
2. ✅ Gọi API lấy thông tin sản phẩm
3. ✅ Gọi API lấy danh sách sản phẩm liên quan
4. ✅ Cuộn trang lên đầu (smooth scroll)

### Dependency Array
```javascript
useEffect(() => { ... }, [id]);
```
- **[id]**: Khi ID sản phẩm thay đổi (người dùng click vào sản phẩm liên quan), component sẽ tải lại toàn bộ dữ liệu

## 📡 API Endpoints

| Endpoint | Phương Thức | Mô Tả |
|----------|-------------|-------|
| `/api/products/{id}` | GET | Lấy chi tiết sản phẩm |
| `/api/sale_products/{id}` | GET | Lấy chi tiết sản phẩm khuyến mãi |
| `/api/products` | GET | Lấy danh sách tất cả sản phẩm |

**Base URL**: `http://localhost:8080`

## 🛡️ Xử Lý Lỗi

### 1. Ảnh Lỗi
```javascript
<img
    src={product.imageUrl || DEFAULT_IMG}
    alt={product.name}
    onError={(e) => e.target.src = DEFAULT_IMG}
/>
```
- Nếu `imageUrl` không tồn tại → dùng `DEFAULT_IMG`
- Nếu ảnh load thất bại → thay bằng ảnh placeholder

### 2. Dữ Liệu Lỗi
```javascript
const list = relatedRes.data?._embedded?.products || [];
```
- Dùng optional chaining (`?.`) để tránh lỗi null/undefined
- Fallback về array rỗng nếu không có dữ liệu

### 3. Loading State
```javascript
if (loading) return <div>Đang tải dữ liệu...</div>;
if (!product) return <div>Không tìm thấy sản phẩm!</div>;
```

## 🔐 Xác Thực Người Dùng

```javascript
const user = JSON.parse(localStorage.getItem("user"));
```
- Lấy thông tin người dùng từ localStorage
- Dùng để kiểm tra xem người dùng đã đăng nhập hay chưa
- Nếu chưa đăng nhập và click "Thêm Giỏ Hàng" → yêu cầu đăng nhập

## 💡 Ghi Chú Quan Trọng

1. **Dependency [id]**: Rất quan trọng vì khi user click vào sản phẩm liên quan, URL thay đổi → cần reload component
2. **Smooth Scroll**: Tự động cuộn lên đầu trang khi chuyển sản phẩm
3. **Graceful Fallback**: Có fallback cho ảnh, giá gốc, mô tả
4. **Spring Data REST Format**: Dữ liệu từ API Spring trả về trong object `_embedded`

## 🚀 Cách Sử Dụng

```jsx
import ProductDetail from './ProductDetail';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

<Routes>
    <Route path="/product/:id" element={<ProductDetail />} />
</Routes>
```

Người dùng sẽ truy cập trang này thông qua URL: `/product/123`

## 📝 Ví Dụ Dữ Liệu

### Cấu Trúc Object Sản Phẩm
```json
{
    "id": 1,
    "name": "Vitamin C 1000mg",
    "description": "Vitamin C cao cấp hỗ trợ miễn dịch",
    "price": 150000,
    "salePrice": 99000,
    "imageUrl": "https://example.com/vitamin-c.jpg"
}
```

---

**Tác giả**: Duc Huy  
**Cập nhật**: 2026-01-29  
**Phiên bản**: 1.0
