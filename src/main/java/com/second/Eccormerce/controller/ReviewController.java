package com.second.Eccormerce.controller;

import com.second.Eccormerce.dto.ReviewDto;
import com.second.Eccormerce.service.interf.ReviewService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/reviews")
@RequiredArgsConstructor
public class ReviewController {

    private final ReviewService reviewService;

    @PostMapping
    public ReviewDto createReview(@RequestBody ReviewDto reviewDto) {
        return reviewService.createReview(reviewDto);
    }

    @GetMapping("/product/{productId}")
    public List<ReviewDto> getReviewsByProductId(@PathVariable Long productId) {
        return reviewService.getReviewsByProductId(productId);
    }
}
