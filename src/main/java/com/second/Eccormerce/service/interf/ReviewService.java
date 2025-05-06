package com.second.Eccormerce.service.interf;

import com.second.Eccormerce.dto.ReviewDto;

import java.util.List;

public interface ReviewService {
    ReviewDto createReview(ReviewDto reviewDto);
    List<ReviewDto> getReviewsByProductId(Long productId);
}
