import { useEffect, useState } from "react";
import ApiService from "../../service/ApiService";

const ProductReviews = ({ productId }) => {
    const [reviews, setReviews] = useState([]);

    useEffect(() => {
        ApiService.getReviewsByProductId(productId)
            .then(setReviews)
            .catch(console.error);
    }, [productId]);

    return (
        <div>
            <h4>Customer Reviews</h4>
            {reviews.map((r, i) => (
                <div key={i}>
                    <p>Rating: {r.rating}</p>
                    <p>{r.content}</p>
                </div>
            ))}
        </div>
    );
};

export default ProductReviews;