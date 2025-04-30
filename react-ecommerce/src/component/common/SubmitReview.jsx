import ApiService from "../../service/ApiService";
import { useState } from "react";

const SubmitReview = ({ productId }) => {
    const [content, setContent] = useState("");
    const [rating, setRating] = useState(5);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const review = {
            productId,
            content,
            rating
        };

        try {
            const result = await ApiService.createReview(review);
            console.log("Review submitted:", result);
            // optionally reset form
            setContent("");
            setRating(5);
        } catch (error) {
            console.error("Error submitting review", error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <textarea value={content} onChange={(e) => setContent(e.target.value)} required />
            <input type="number" min="1" max="5" value={rating} onChange={(e) => setRating(e.target.value)} required />
            <button type="submit">Submit Review</button>
        </form>
    );
};

export default SubmitReview;
