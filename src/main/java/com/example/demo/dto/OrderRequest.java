package com.example.demo.dto;

import java.util.List;

public class OrderRequest {
    private Long userId;
    private Double totalPrice;
    private String status; // Thêm trường này để nhận trạng thái 'PENDING'
    private List<OrderItemRequest> items;

    // Getter và Setter đầy đủ
    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public Double getTotalPrice() {
        return totalPrice;
    }

    public void setTotalPrice(Double totalPrice) {
        this.totalPrice = totalPrice;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public List<OrderItemRequest> getItems() {
        return items;
    }

    public void setItems(List<OrderItemRequest> items) {
        this.items = items;
    }
}