import React, { useState, useEffect } from 'react';
import ApiService from "../../service/ApiService";

const CommentComponent = ({ reviewId }) => {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState({
    message: '',
    reviewId: reviewId,
  });

  useEffect(() => {
    ApiService.getCommentsByReviewId(reviewId)
      .then((response) => {
        setComments(response);
      })
      .catch((error) => {
        console.error("Error fetching comments", error);
      });
  }, [reviewId]);

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    ApiService.addComment(newComment)
      .then((response) => {
        setComments([...comments, response]);
        setNewComment({ message: '', reviewId: reviewId });
      })
      .catch((error) => {
        console.error("Error submitting comment", error);
      });
  };

  return (
    <div>
      <h3>Comments</h3>
      <form onSubmit={handleCommentSubmit}>
        <textarea 
          value={newComment.message} 
          onChange={(e) => setNewComment({ ...newComment, message: e.target.value })}
          placeholder="Write your comment"
        />
        <button type="submit">Submit Comment</button>
      </form>
      <div>
        {comments.map((comment) => (
          <div key={comment.id}>
            <p>{comment.message}</p>
            <p>{comment.createdAt}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CommentComponent;
