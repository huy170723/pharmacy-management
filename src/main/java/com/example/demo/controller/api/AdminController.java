package com.example.demo.controller.api;

import com.example.demo.entity.Product;
import com.example.demo.service.AdminService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/admin")
@CrossOrigin(origins = "http://localhost:3000")
public class AdminController {

    private final AdminService adminService;

    // Inject AdminService thông qua Constructor
    public AdminController(AdminService adminService) {
        this.adminService = adminService;
    }

    @GetMapping("/revenue")
    public Double getRevenue() {
        return adminService.getMonthlyRevenue();
    }

    @GetMapping("/products")
    public List<Product> getAllProducts() {
        return adminService.getAllProducts();
    }

    @PostMapping("/products")
    public Product createProduct(@RequestBody Product product) {
        return adminService.createProduct(product);
    }

    @PutMapping("/products/{id}")
    public Product updateProduct(@PathVariable Long id, @RequestBody Product product) {
        return adminService.updateProduct(id, product);
    }

    @DeleteMapping("/products/{id}")
    public ResponseEntity<?> deleteProduct(@PathVariable Long id) {
        try {
            adminService.deleteProduct(id);
            return ResponseEntity.ok().build();
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.CONFLICT)
                    .body("Không thể xóa sản phẩm do ràng buộc dữ liệu tại database.");
        }
    }
}