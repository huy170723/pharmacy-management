package com.example.demo.service;

import com.example.demo.dto.ProductDTO;
import com.example.demo.entity.Product;
import com.example.demo.repository.ProductRepository;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class ProductService {

    private final ProductRepository productRepository;

    public ProductService(ProductRepository productRepository) {
        this.productRepository = productRepository;
    }

    // =======================
    // 1️⃣ LẤY SẢN PHẨM THEO DANH MỤC (MỚI THÊM)
    // =======================
    public List<ProductDTO> getProductsByCategory(String categorySlug) {
        // Gọi hàm findByCategory_Slug vừa thêm vào Repository
        return productRepository.findByCategory_Slug(categorySlug)
                .stream()
                .map(this::toDTO)
                .toList();
    }

    // =======================
    // 2️⃣ CÁC HÀM CŨ (GIỮ NGUYÊN DỮ LIỆU)
    // =======================
    public List<ProductDTO> getAllProducts() {
        return productRepository.findAll()
                .stream()
                .map(this::toDTO)
                .toList();
    }

    public ProductDTO getProductById(Long id) {
        Product product = productRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Không tìm thấy sản phẩm"));
        return toDTO(product);
    }

    public List<ProductDTO> getRelatedProducts(Long id) {
        Product currentProduct = productRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Không tìm thấy sản phẩm"));

        if (currentProduct.getCategory() == null) {
            return List.of();
        }

        return productRepository.findByCategory_IdAndIdNot(
                currentProduct.getCategory().getId(), id)
                .stream()
                .map(this::toDTO)
                .toList();
    }

    // DTO MAPPER (GIỮ NGUYÊN)
    private ProductDTO toDTO(Product p) {
        return new ProductDTO(
                p.getId(),
                p.getName(),
                p.getPrice(),
                p.getImageUrl(),
                p.getStock(),
                p.getDescription(),
                p.getOrigin(),
                p.getSpecifications(),
                p.getCategory() != null ? p.getCategory().getId() : null,
                p.getCategory() != null ? p.getCategory().getName() : null);
    }
}