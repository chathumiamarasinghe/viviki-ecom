package com.second.Eccormerce.repository;

import com.second.Eccormerce.entity.Review;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ReviewRepo extends JpaRepository<Review, Long> {
    List<Review> findByProductId(Long productId);
}
