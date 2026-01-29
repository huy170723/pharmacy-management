package com.example.demo.entity;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "sale_products")
@Data
public class SaleProduct {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    @Column(name = "image_url")
    private String imageUrl;

    @Column(name = "old_price")
    private Double oldPrice;

    @Column(name = "sale_price")
    private Double salePrice;

    @Column(name = "discount_percent")
    private Integer discountPercent;

    // --- BỔ SUNG 3 TRƯỜNG NÀY ĐỂ HIỂN THỊ DỮ LIỆU CHI TIẾT ---

    @Column(name = "origin") // Khớp với cột origin trong MySQL
    private String origin;

    @Column(name = "specifications") // Khớp với cột specifications trong MySQL
    private String specifications;

    @Column(columnDefinition = "TEXT") // Khớp với cột description trong MySQL
    private String description;
}