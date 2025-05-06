package com.second.Eccormerce.repository;

import com.second.Eccormerce.entity.Discount;
import com.second.Eccormerce.entity.Product;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface DiscountRepo extends JpaRepository<Discount, Long> {
    Optional<Discount> findByProduct(Product product);
}
