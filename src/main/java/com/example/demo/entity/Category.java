package com.example.demo.entity;

import jakarta.persistence.*;
import lombok.Data;
import java.util.List;
import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
@Table(name = "categories")
@Data
public class Category {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    private String description;

    // Thêm dòng này để xóa "bỏ qua ràng buộc" một cách chuyên nghiệp
    // orphanRemoval = true sẽ xóa các sản phẩm "mồ côi" khi danh mục bị xóa
    @OneToMany(mappedBy = "category", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonIgnore // Tránh lỗi vòng lặp vô hạn khi trả về JSON
    private List<Product> products;
}