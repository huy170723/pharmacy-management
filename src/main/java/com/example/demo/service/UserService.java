package com.example.demo.service;

import com.example.demo.entity.User;
import com.example.demo.repository.UserRepository;
import java.util.List;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    private final UserRepository userRepository;
    private final BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    // ===== LOGIN (Cập nhật Admin cứng) =====
    public User login(String email, String password) {
        // 1. KIỂM TRA ADMIN CỨNG TRƯỚC
        if ("admin@gmail.com".equals(email) && "admin123".equals(password)) {
            User admin = new User();
            admin.setId(0L); // ID ảo để phân biệt với DB
            admin.setName("Nguyễn Đức Huy Admin");
            admin.setEmail("admin@gmail.com");
            admin.setPassword("NON_HASHED_ADMIN_PWD"); // Không cần check BCrypt cho admin cứng
            admin.setRole("ADMIN"); // Gán quyền Admin
            admin.setActive(1);
            return admin;
        }

        // 2. NẾU KHÔNG PHẢI ADMIN CỨNG THÌ MỚI CHECK DATABASE NHƯ CŨ
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Email không tồn tại"));

        if (!passwordEncoder.matches(password, user.getPassword())) {
            throw new RuntimeException("Sai mật khẩu");
        }
        return user;
    }

    // ===== REGISTER (Giữ nguyên của Huy) =====
    public User register(String name, String email, String password) {
        if (userRepository.existsByEmail(email)) {
            throw new RuntimeException("Email đã tồn tại");
        }
        User user = new User();
        user.setName(name);
        user.setEmail(email);
        user.setPassword(passwordEncoder.encode(password));
        user.setActive(1);
        user.setRole("USER"); // Mặc định là khách hàng
        return userRepository.save(user);
    }

    public List<User> findAll() {
        return userRepository.findAll();
    }

    public void delete(Long id) {
        userRepository.deleteById(id);
    }
}