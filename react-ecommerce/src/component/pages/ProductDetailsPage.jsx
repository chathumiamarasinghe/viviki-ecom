import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useCart } from "../context/CartContext";
import ApiService from "../../service/ApiService";
import AddReviewForm from "../pages/CreateReview"; 
import '../../style/productDetailsPage.css';
import ReviewSection from '../pages/ProductReviews';

const ProductDetailsPage = () => {
    const { productId } = useParams();
    const { cart, dispatch } = useCart();
    const [product, setProduct] = useState(null);
    const [userId, setUserId] = useState(1);

    useEffect(() => {
        fetchProduct();
    }, [productId]);

    const fetchProduct = async () => {
        try {
            const response = await ApiService.getProductById(productId);
            setProduct(response.product);
        } catch (error) {
            console.log(error.message || error);
        }
    };

    const cartItem = cart.find((item) => item.id === product?.id);
    const cartQuantity = cartItem?.quantity || 0;

    const addToCart = () => {
        if (product && cartQuantity < product.quantity) {
            dispatch({ type: 'ADD_ITEM', payload: product });
        }
    };

    const incrementItem = () => {
        if (product && cartQuantity < product.quantity) {
            dispatch({ type: 'INCREMENT_ITEM', payload: product });
        }
    };

    const decrementItem = () => {
        if (product) {
            if (cartQuantity > 1) {
                dispatch({ type: 'DECREMENT_ITEM', payload: product });
            } else {
                dispatch({ type: 'REMOVE_ITEM', payload: product });
            }
        }
    };

    if (!product) {
        return <p>Loading product details ...</p>;
    }

    return (
        <div className="product-detail-wrapper">
            <div className="product-detail">
                <img src={product?.imageUrl} alt={product?.name} />
                <h1>{product?.name}</h1>
                <p>{product?.description}</p>
                <span>Rs.{product.price.toFixed(2)}</span>
                <span className="stock-text">Only {product.quantity} item(s) left</span>

                {cartItem ? (
                    <div className="quantity-controls">
                        <button onClick={decrementItem}>-</button>
                        <span>{cartItem.quantity}</span>
                        <button
                            onClick={incrementItem}
                            disabled={cartQuantity >= product.quantity}
                            className={cartQuantity >= product.quantity ? "disabled" : ""}
                        >
                            +
                        </button>
                    </div>
                ) : (
                    <button onClick={addToCart} disabled={product.quantity === 0}>
                        {product.quantity === 0 ? "Out of Stock" : "Add To Cart"}
                    </button>
                )}
            </div>

            <div className="product-reviews">
                <ReviewSection productId={productId} />
                <AddReviewForm productId={productId} userId={userId} /> 
            </div>
        </div>
    );
};

export default ProductDetailsPage;
