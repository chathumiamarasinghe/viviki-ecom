package com.second.Eccormerce.dto;

import lombok.Data;

@Data
public class ReviewDto {
    private Long id;
    private String content;
    private Integer rating;
    private Long productId;
    private Long userId;
}
