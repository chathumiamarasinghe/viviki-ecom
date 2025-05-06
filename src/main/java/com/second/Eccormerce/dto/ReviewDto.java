package com.second.Eccormerce.dto;

import lombok.Data;

@Data
public class ReviewDto {
    private Long id;
    private String content;     // instead of comment
    private Integer rating;
    private Long productId;
    private Long userId;         // include user ID
}
