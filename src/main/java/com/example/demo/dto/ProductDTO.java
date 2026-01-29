package com.example.demo.dto;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ProductDTO {
    private Long id;
    private String name;
    private Double price;
    private String imageUrl;
    private Integer stock;
    private String description;
    private String origin;
    private String specifications;
    private Long categoryId;
    private String categoryName;
}
