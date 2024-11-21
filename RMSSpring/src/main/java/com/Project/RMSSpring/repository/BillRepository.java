package com.Project.RMSSpring.repository;

import com.Project.RMSSpring.entity.Bill;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Optional;

public interface BillRepository extends JpaRepository<Bill, Long> {
    Optional<Bill> findByOrderId(Long orderId);
}
