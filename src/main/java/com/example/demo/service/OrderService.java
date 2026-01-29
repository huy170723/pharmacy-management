package com.example.demo.service;

import com.example.demo.dto.OrderRequest;
import com.example.demo.entity.Order;
import com.example.demo.entity.OrderItem;
import com.example.demo.repository.OrderRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class OrderService {

    @Autowired
    private OrderRepository orderRepository;

    // 1. DÀNH CHO ADMIN
    public List<Order> getAll() {
        return orderRepository.findAll();
    }

    // 2. DÀNH CHO CLIENT: Lấy lịch sử theo User ID
    public List<Order> getOrdersByUserId(Long userId) {
        return orderRepository.findByUserId(userId);
    }

    public Optional<Order> getById(Long id) {
        return orderRepository.findById(id);
    }

    // ✅ 3. HÀM LƯU ĐƠN HÀNG MỚI: Xử lý chuyển đổi từ DTO sang Entity
    @Transactional
    public Order saveOrder(OrderRequest request) {
        Order order = new Order();
        order.setUserId(request.getUserId());
        order.setTotalPrice(request.getTotalPrice());
        order.setStatus(request.getStatus() != null ? request.getStatus() : "PENDING");
        order.setCreatedAt(LocalDateTime.now());
        order.setOrderDate(LocalDateTime.now());

        // Ánh xạ danh sách items và thiết lập quan hệ cha-con (Để fix lỗi order_id bị
        // NULL)
        if (request.getItems() != null) {
            List<OrderItem> items = request.getItems().stream().map(dto -> {
                OrderItem item = new OrderItem();
                item.setProductId(dto.getProductId());
                item.setProductName(dto.getProductName());
                item.setPrice(dto.getPrice());
                item.setQuantity(dto.getQuantity());
                item.setOrder(order); // PHẢI có dòng này để MySQL nhận order_id
                return item;
            }).collect(Collectors.toList());

            order.setItems(items);
        }

        return orderRepository.save(order);
    }

    @Transactional
    public void delete(Long id) {
        if (orderRepository.existsById(id)) {
            orderRepository.deleteById(id);
        }
    }
}