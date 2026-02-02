package com.example.demo.repository;

import com.example.demo.entity.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {

    // 1. Tìm sản phẩm cùng Category, loại trừ sản phẩm hiện tại (Dùng cho trang Chi
    // tiết)
    List<Product> findByCategory_IdAndIdNot(Long categoryId, Long productId);

    // 2. Tìm tất cả sản phẩm thuộc một Category cụ thể (Dùng để lọc từ Trang chủ)
    // Spring Data JPA sẽ tự động hiểu việc join bảng Category để lọc theo ID
    List<Product> findByCategory_Id(Long categoryId);

    // 3. (Tùy chọn) Tìm sản phẩm theo Slug của Category nếu bạn dùng đường dẫn thân
    // thiện
    // Ví dụ: /products?category=than-kinh-nao
    List<Product> findByCategory_Slug(String slug);
}