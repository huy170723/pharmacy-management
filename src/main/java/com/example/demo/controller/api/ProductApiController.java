package com.example.demo.controller.api;

import com.example.demo.dto.ProductDTO;
import com.example.demo.service.ProductService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/products")
@CrossOrigin(origins = "http://localhost:3000") // Đảm bảo React có thể gọi API
public class ProductApiController {

        private final ProductService productService;

        public ProductApiController(ProductService productService) {
                this.productService = productService;
        }

        // =======================
        // 1️⃣ LẤY DANH SÁCH SẢN PHẨM (Cập nhật để Lọc)
        // =======================
        @GetMapping
        public List<ProductDTO> getAll(@RequestParam(required = false) String category) {
                // Nếu URL có tham số ?category=slug-danh-muc
                if (category != null && !category.isEmpty()) {
                        return productService.getProductsByCategory(category);
                }
                // Mặc định trả về tất cả sản phẩm (giữ nguyên dữ liệu cũ)
                return productService.getAllProducts();
        }

        // =======================
        // 2️⃣ CHI TIẾT SẢN PHẨM (Giữ nguyên)
        // =======================
        @GetMapping("/{id}")
        public ProductDTO getOne(@PathVariable Long id) {
                return productService.getProductById(id);
        }

        // =======================
        // 3️⃣ SẢN PHẨM LIÊN QUAN (Giữ nguyên)
        // =======================
        @GetMapping("/{id}/related")
        public List<ProductDTO> getRelated(@PathVariable Long id) {
                return productService.getRelatedProducts(id);
        }
}