package com.second.Eccormerce.service.interf;

import com.second.Eccormerce.entity.Comment;
import com.second.Eccormerce.entity.Review;

import java.util.List;

public interface CommentService {
    List<Comment> getCommentsByReview(Review review);
    Comment saveComment(Comment comment);
}
