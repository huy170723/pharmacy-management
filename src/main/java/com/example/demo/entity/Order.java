package com.example.demo.entity;

import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDateTime;
import java.util.List;
import com.fasterxml.jackson.annotation.JsonManagedReference;

@Entity
@Table(name = "orders")
@Data
public class Order {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "user_id")
    private Long userId;

    @Column(name = "total_price")
    private Double totalPrice;

    private String status;

    @Column(name = "created_at")
    private LocalDateTime createdAt = LocalDateTime.now(); // Gán mặc định thời gian hiện tại
    @Column(name = "order_date")
    private LocalDateTime orderDate;
    // XÓA trường orderDate vì Database không có cột này, hoặc thêm cột vào SQL

    @OneToMany(mappedBy = "order", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonManagedReference
    private List<OrderItem> items;
}