package com.example.demo.controller.api;

import com.example.demo.dto.ProductDTO;
import com.example.demo.entity.Product;
import com.example.demo.repository.ProductRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/products")
public class ProductApiController {

        private final ProductRepository productRepository;

        public ProductApiController(ProductRepository productRepository) {
                this.productRepository = productRepository;
        }

        // =======================
        // 1️⃣ LẤY TẤT CẢ SẢN PHẨM
        // =======================
        @GetMapping
        public List<ProductDTO> getAll() {
                return productRepository.findAll()
                                .stream()
                                .map(this::toDTO)
                                .toList();
        }

        // =======================
        // 2️⃣ CHI TIẾT SẢN PHẨM
        // =======================
        @GetMapping("/{id}")
        public ProductDTO getOne(@PathVariable Long id) {
                Product product = productRepository.findById(id)
                                .orElseThrow(() -> new RuntimeException("Không tìm thấy sản phẩm"));

                return toDTO(product);
        }

        // =======================
        // 3️⃣ SẢN PHẨM LIÊN QUAN
        // =======================
        @GetMapping("/{id}/related")
        public List<ProductDTO> getRelatedProducts(@PathVariable Long id) {

                Product currentProduct = productRepository.findById(id)
                                .orElseThrow(() -> new RuntimeException("Không tìm thấy sản phẩm"));

                if (currentProduct.getCategory() == null) {
                        return List.of();
                }

                return productRepository
                                .findByCategory_IdAndIdNot(
                                                currentProduct.getCategory().getId(),
                                                id)
                                .stream()
                                .map(this::toDTO)
                                .toList();
        }

        // =======================
        // DTO MAPPER
        // =======================
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
