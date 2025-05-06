package com.second.Eccormerce.service.impl;

import com.second.Eccormerce.entity.Comment;
import com.second.Eccormerce.entity.Review;
import com.second.Eccormerce.repository.CommentRepo;
import com.second.Eccormerce.service.interf.CommentService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class CommentServiceImpl implements CommentService {

    private final CommentRepo commentRepo;

    public List<Comment> getCommentsByReview(Review review) {
        return commentRepo.findByReview(review);
    }

    public Comment saveComment(Comment comment) {
        return commentRepo.save(comment);
    }
}
