package com.example.demo.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class StatisticDTO {
    private long totalProducts;
    private long totalOrders;
    private double totalRevenue;
}