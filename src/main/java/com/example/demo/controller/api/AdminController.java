package com.example.demo.controller.api;

import com.example.demo.entity.Product;
import com.example.demo.repository.OrderRepository;
import com.example.demo.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/admin") // Bỏ /api vì context-path đã tự động thêm nó thành /api/admin
@CrossOrigin(origins = "http://localhost:3000") // FIX LỖI CORS: Cho phép React port 3000
public class AdminController {

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private OrderRepository orderRepository;

    @GetMapping("/revenue")
    public Double getRevenue() {
        LocalDate now = LocalDate.now();
        // Repository cần nhận tháng và năm để tính doanh thu
        Double revenue = orderRepository.calculateMonthlyRevenue(now.getMonthValue(), now.getYear());
        return revenue != null ? revenue : 0.0;
    }

    @GetMapping("/products")
    public List<Product> getAllProducts() {
        return productRepository.findAll();
    }

    // Đảm bảo mapping khớp chính xác với id
    @PutMapping("/products/{id}")
    public Product updateProduct(@PathVariable Long id, @RequestBody Product product) {
        // Quan trọng: Gán id từ đường dẫn vào object trước khi save
        product.setId(id);
        return productRepository.save(product);
    }

    @DeleteMapping("/products/{id}") // Đảm bảo cho phép xóa từ React
    public ResponseEntity<?> deleteProduct(@PathVariable Long id) {
        try {
            // Xóa trực tiếp bằng Repository
            productRepository.deleteById(id);
            return ResponseEntity.ok().build();
        } catch (Exception e) {
            // Nếu vẫn bị ràng buộc DB, nó sẽ trả về lỗi 409
            return ResponseEntity.status(HttpStatus.CONFLICT)
                    .body("Không thể xóa sản phẩm do ràng buộc dữ liệu tại database.");
        }
    }

    @PostMapping("/products")
    public Product createProduct(@RequestBody Product product) {
        // Nếu image_url gửi lên trống, có thể thiết lập một ảnh mặc định tại đây
        if (product.getImageUrl() == null || product.getImageUrl().isEmpty()) {
            product.setImageUrl("https://picsum.photos/200"); // Ảnh tạm thời
        }
        return productRepository.save(product);
    }
}