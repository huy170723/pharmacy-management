package com.example.demo.service;

import com.example.demo.entity.Product;
import com.example.demo.entity.User;
import com.example.demo.repository.OrderRepository;
import com.example.demo.repository.ProductRepository;
import com.example.demo.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
public class AdminService {

    private final ProductRepository productRepository;
    private final OrderRepository orderRepository;
    private final UserRepository userRepository;

    // ===================================
    // ADMIN LOGIN CODE (6 SỐ - HARDCODE)
    // ===================================
    private static final String ADMIN_LOGIN_CODE = "123456";

    public AdminService(ProductRepository productRepository,
            OrderRepository orderRepository,
            UserRepository userRepository) {
        this.productRepository = productRepository;
        this.orderRepository = orderRepository;
        this.userRepository = userRepository;
    }

    // ===================================
    // 1️⃣ ĐĂNG NHẬP ADMIN BẰNG MÃ 6 SỐ
    // ===================================
    public User loginAdminByCode(String code) {

        if (ADMIN_LOGIN_CODE.equals(code)) {
            User admin = new User();
            admin.setId(0L); // ID giả
            admin.setName("System Admin");
            admin.setRole("ADMIN");
            return admin;
        }

        throw new RuntimeException("Mã đăng nhập Admin không hợp lệ!");
    }

    // ===================================
    // 2️⃣ QUẢN LÝ DOANH THU & SẢN PHẨM
    // (GIỮ NGUYÊN – KHÔNG ĐỘNG)
    // ===================================
    public Double getMonthlyRevenue() {
        LocalDate now = LocalDate.now();
        Double revenue = orderRepository.calculateMonthlyRevenue(
                now.getMonthValue(),
                now.getYear());
        return revenue != null ? revenue : 0.0;
    }

    public List<Product> getAllProducts() {
        return productRepository.findAll();
    }

    public Product createProduct(Product product) {
        if (product.getImageUrl() == null || product.getImageUrl().isEmpty()) {
            product.setImageUrl("https://picsum.photos/200");
        }
        return productRepository.save(product);
    }

    public Product updateProduct(Long id, Product product) {
        product.setId(id);
        return productRepository.save(product);
    }

    public void deleteProduct(Long id) {
        productRepository.deleteById(id);
    }
}
