package com.second.Eccormerce.service.impl;

import com.second.Eccormerce.dto.ReviewDto;
import com.second.Eccormerce.entity.Product;
import com.second.Eccormerce.entity.Review;
import com.second.Eccormerce.entity.User;
import com.second.Eccormerce.repository.ProductRepo;
import com.second.Eccormerce.repository.ReviewRepo;
import com.second.Eccormerce.repository.UserRepo;
import com.second.Eccormerce.service.interf.ReviewService;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional
public class ReviewServiceImpl implements ReviewService {

    private final ReviewRepo reviewRepo;
    private final ProductRepo productRepo;
    private final UserRepo userRepo;

    @Override
    public ReviewDto createReview(ReviewDto reviewDto) {
        Review review = new Review();
        review.setContent(reviewDto.getContent());
        review.setRating(reviewDto.getRating());
        review.setCreatedAt(LocalDateTime.now());

        Product product = productRepo.findById(reviewDto.getProductId())
                .orElseThrow(() -> new RuntimeException("Product not found with id: " + reviewDto.getProductId()));

        User user = userRepo.findById(reviewDto.getUserId())
                .orElseThrow(() -> new RuntimeException("User not found with id: " + reviewDto.getUserId()));

        review.setProduct(product);
        review.setUser(user);

        Review savedReview = reviewRepo.save(review);

        return mapToDto(savedReview);
    }

    @Override
    public List<ReviewDto> getReviewsByProductId(Long productId) {
        List<Review> reviews = reviewRepo.findByProductId(productId);

        return reviews.stream()
                .map(this::mapToDto)
                .collect(Collectors.toList());
    }

    private ReviewDto mapToDto(Review review) {
        ReviewDto dto = new ReviewDto();
        dto.setId(review.getId());
        dto.setContent(review.getContent());
        dto.setRating(review.getRating());
        dto.setProductId(review.getProduct().getId());
        dto.setUserId(review.getUser().getId());
        return dto;
    }
}
