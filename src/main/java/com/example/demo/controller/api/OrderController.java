package com.example.demo.controller.api;

import com.example.demo.dto.OrderRequest;
import com.example.demo.entity.Order;
import com.example.demo.service.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/orders") // Đã thêm /api để khớp với Frontend
@CrossOrigin(origins = "http://localhost:3000")
public class OrderController {

    @Autowired
    private OrderService orderService;

    @GetMapping("/all")
    public List<Order> getAllForAdmin() {
        return orderService.getAll();
    }

    @GetMapping("/client/{userId}")
    public List<Order> getHistoryForClient(@PathVariable Long userId) {
        return orderService.getOrdersByUserId(userId);
    }

    // ✅ ĐÃ SỬA: Dùng OrderRequest thay vì Order để nhận dữ liệu từ React
    @PostMapping("/checkout")
    public Order checkout(@RequestBody OrderRequest orderRequest) {
        // Huy gọi hàm save từ Service, nơi sẽ xử lý chuyển DTO sang Entity
        return orderService.saveOrder(orderRequest);
    }
}