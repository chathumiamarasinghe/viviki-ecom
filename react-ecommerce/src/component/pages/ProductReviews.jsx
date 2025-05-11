import React, { useEffect, useState } from "react";
import ApiService from "../../service/ApiService";
import { Spinner } from "react-bootstrap"; 
import "bootstrap/dist/css/bootstrap.min.css";

const ProductReviews = ({ productId }) => {
    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchReviews = async () => {
            try {
                const data = await ApiService.getReviewsByProductId(productId);
                setReviews(data);
            } catch (err) {
                setError("Failed to fetch reviews");
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchReviews();
    }, [productId]);

    const renderStars = (rating) => {
        return (
            <span>
                {Array.from({ length: rating }, (_, i) => (
                    <span key={i} style={{ color: "#ffc107" }}>★</span>
                ))}
                {Array.from({ length: 5 - rating }, (_, i) => (
                    <span key={i + rating} style={{ color: "#e4e5e9" }}>☆</span>
                ))}
            </span>
        );
    };

    if (loading) {
        return (
            <div className="text-center my-4">
                <Spinner animation="border" variant="primary" />
                <p>Loading reviews...</p>
            </div>
        );
    }

    if (error) {
        return <div className="alert alert-danger">{error}</div>;
    }

    return (
        <div className="container my-4">
            <h4 className="mb-4">Customer Reviews</h4>
            {reviews.length === 0 ? (
                <p>No reviews yet.</p>
            ) : (
                <div className="row">
                    {reviews.map((review, index) => (
                        <div className="col-md-6 mb-3" key={index}>
                            <div className="card shadow-sm">
                                <div className="card-body">
                                    <h6 className="card-title">User {review.userId}</h6>
                                    <div className="mb-2">{renderStars(review.rating)}</div>
                                    <p className="card-text">{review.content}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default ProductReviews;
