package com.example.demo.repository;

import com.example.demo.entity.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {

    // LẤY SẢN PHẨM CÙNG CATEGORY, LOẠI TRỪ SẢN PHẨM HIỆN TẠI
    List<Product> findByCategory_IdAndIdNot(Long categoryId, Long productId);
}
