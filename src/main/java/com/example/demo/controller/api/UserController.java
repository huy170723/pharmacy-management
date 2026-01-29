package com.example.demo.controller.api;

import com.example.demo.entity.User;
import com.example.demo.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
// QUAN TRỌNG: Phải khớp 100% với log lỗi (/api/admin/users)
@RequestMapping("/admin/users")
@CrossOrigin(origins = "http://localhost:3000")
public class UserController {

    @Autowired
    private UserService userService;

    @GetMapping
    public List<User> getAll() {
        // Gọi hàm findAll() mà bạn đã thêm vào UserService
        return userService.findAll();
    }
}