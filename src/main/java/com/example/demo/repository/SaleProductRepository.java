package com.example.demo.repository;

import com.example.demo.entity.SaleProduct;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.web.bind.annotation.CrossOrigin;

@CrossOrigin("http://localhost:3000")
@RepositoryRestResource(collectionResourceRel = "saleProducts", path = "sale_products")
public interface SaleProductRepository extends JpaRepository<SaleProduct, Long> {
}