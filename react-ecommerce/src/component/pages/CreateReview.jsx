import React, { useState } from "react"; 
import ApiService from "../../service/ApiService";
import { Button, Form, Row, Col, Card } from "react-bootstrap";

const AddReviewForm = ({ productId, userId }) => {
    const [rating, setRating] = useState(5);  
    const [content, setContent] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        const review = {
            rating,        
            content,       
            productId,     
            userId        
        };
    
        console.log("Submitting review:", review);  
    
        setLoading(true);
        setError(null);
    
        try {
            const response = await ApiService.createReview(review);  
            console.log("Review created:", response);
            setContent("");  
        } catch (err) {
            console.error("Error creating review:", err);
            setError("Failed to create review.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <Card className="shadow-sm p-4 mt-4">
            <Card.Body>
                <h4>Add a Review</h4>
                <Form onSubmit={handleSubmit}>
                    <Row>
                        <Col md={6}>
                            <Form.Group controlId="formRating">
                                <Form.Label>Rating</Form.Label>
                                <Form.Control
                                    as="select"
                                    value={rating} 
                                    onChange={(e) => setRating(parseInt(e.target.value))}
                                >
                                    {[1, 2, 3, 4, 5].map((star) => (
                                        <option key={star} value={star}>
                                            {star} Star{star > 1 ? "s" : ""}
                                        </option>
                                    ))}
                                </Form.Control>
                            </Form.Group>
                        </Col>

                        <Col md={6}>
                            <Form.Group controlId="formContent">
                                <Form.Label>Review Content</Form.Label>
                                <Form.Control
                                    as="textarea"
                                    rows={3}
                                    value={content}
                                    onChange={(e) => setContent(e.target.value)}
                                    placeholder="Write your review here..."
                                />
                            </Form.Group>
                        </Col>
                    </Row>

                    <div className="text-center mt-3">
                        {loading ? (
                            <Button variant="primary" disabled>
                                Submitting...
                            </Button>
                        ) : (
                            <Button variant="primary" type="submit">
                                Submit Review
                            </Button>
                        )}
                    </div>
                </Form>

                {error && <div className="alert alert-danger mt-3">{error}</div>}
            </Card.Body>
        </Card>
    );
};

export default AddReviewForm;
