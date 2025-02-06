package com.ecom.viviki.repository;

import com.ecom.viviki.entity.Order;
import org.springframework.data.jpa.repository.JpaRepository;

public interface OrderRepo extends JpaRepository<Order, Long> {
}
