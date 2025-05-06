package com.second.Eccormerce.repository;

import com.second.Eccormerce.entity.Comment;
import com.second.Eccormerce.entity.Review;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CommentRepo extends JpaRepository<Comment, Long> {
    List<Comment> findByReview(Review review);
}
