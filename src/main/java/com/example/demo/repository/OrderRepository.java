package com.example.demo.repository;

import com.example.demo.entity.Order;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import java.util.List;

public interface OrderRepository extends JpaRepository<Order, Long> {
    List<Order> findByUserId(Long userId);

    // Sử dụng JPQL để tính tổng doanh thu
    @Query("SELECT SUM(o.totalPrice) FROM Order o WHERE MONTH(o.createdAt) = :month AND YEAR(o.createdAt) = :year")
    Double calculateMonthlyRevenue(@Param("month") int month, @Param("year") int year);
}