package com.example.demo.entity;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "products")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@JsonIgnoreProperties({ "hibernateLazyInitializer", "handler" })
public class Product extends BaseEntity {

    private String name;

    private Double price;

    @Column(name = "image_url", columnDefinition = "TEXT")
    private String imageUrl;

    private Integer stock;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "category_id")
    @JsonIgnoreProperties("products")
    private Category category;

    @Column(columnDefinition = "TEXT")
    private String description;

    private String origin;

    private String specifications;
}
