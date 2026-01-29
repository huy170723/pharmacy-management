package com.example.demo.controller.api;

import com.example.demo.entity.User;
import com.example.demo.service.UserService;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/auth")
@CrossOrigin(origins = "http://localhost:3000")
public class AuthController {

    private final UserService userService;

    public AuthController(UserService userService) {
        this.userService = userService;
    }

    // ===== REGISTER =====
    @PostMapping("/register")
    public Map<String, Object> register(@RequestBody Map<String, String> body) {

        User user = userService.register(
                body.get("name"),
                body.get("email"),
                body.get("password"));

        return Map.of(
                "success", true,
                "message", "Đăng ký thành công",
                "userId", user.getId(),
                "email", user.getEmail(),
                "name", user.getName());
    }

    // ===== LOGIN =====
    // ===== LOGIN =====
    @PostMapping("/login")
    public Map<String, Object> login(@RequestBody Map<String, String> body) {

        User user = userService.login(
                body.get("email"),
                body.get("password"));

        // Thay "userId" thành "id" để khớp với React (user.id)
        return Map.of(
                "success", true,
                "message", "Đăng nhập thành công",
                "id", user.getId(),
                "email", user.getEmail(),
                "name", user.getName());
    }
}
