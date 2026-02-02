package com.example.demo.controller.api;

import com.example.demo.dto.LoginRequest;
import com.example.demo.entity.User;
import com.example.demo.service.AdminService;
import com.example.demo.service.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/auth")
@CrossOrigin(origins = "http://localhost:3000")
public class AuthController {

    private final UserService userService;
    private final AdminService adminService;

    public AuthController(UserService userService, AdminService adminService) {
        this.userService = userService;
        this.adminService = adminService;
    }

    // ================= USER LOGIN (GIỮ NGUYÊN) =================
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest body) {

        User user = userService.login(
                body.getEmail(),
                body.getPassword());

        return ResponseEntity.ok(Map.of(
                "success", true,
                "id", user.getId(),
                "name", user.getName(),
                "email", user.getEmail(),
                "role", user.getRole()));
    }

    // ================= ADMIN LOGIN (CHỈ DÙNG MÃ 6 SỐ) =================
    @PostMapping("/admin/login")
    public ResponseEntity<?> adminLogin(@RequestBody Map<String, String> body) {

        String code = body.get("code");

        User admin = adminService.loginAdminByCode(code);

        return ResponseEntity.ok(Map.of(
                "success", true,
                "id", admin.getId(),
                "name", admin.getName(),
                "role", admin.getRole()));
    }
}
