package com.second.Eccormerce.controller;

import com.second.Eccormerce.entity.Comment;
import com.second.Eccormerce.entity.Review;
import com.second.Eccormerce.service.interf.CommentService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/comments")
@RequiredArgsConstructor
public class CommentController {

    private final CommentService commentService;

    @GetMapping("/review/{reviewId}")
    public List<Comment> getCommentsByReview(@PathVariable Long reviewId) {
        Review review = new Review();
        review.setId(reviewId);
        return commentService.getCommentsByReview(review);
    }

    @PostMapping
    public Comment saveComment(@RequestBody Comment comment) {
        return commentService.saveComment(comment);
    }
}
