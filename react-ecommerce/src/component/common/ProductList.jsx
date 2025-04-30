import React from "react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import '../../style/productList.css';
import { FiPlus, FiMinus, FiShoppingCart } from "react-icons/fi";

const ProductList = ({ products }) => {
    const { cart, dispatch } = useCart();

    const addToCart = (product) => {
        const cartItem = cart.find(item => item.id === product.id);
        if (!cartItem || cartItem.quantity < product.quantity) {
            dispatch({ type: "ADD_ITEM", payload: product });
        }
    };

    const incrementItem = (product) => {
        const cartItem = cart.find(item => item.id === product.id);
        if (cartItem.quantity < product.quantity) {
            dispatch({ type: "INCREMENT_ITEM", payload: product });
        }
    };

    const decrementItem = (product) => {
        const cartItem = cart.find((item) => item.id === product.id);
        if (cartItem && cartItem.quantity > 1) {
            dispatch({ type: "DECREMENT_ITEM", payload: product });
        } else {
            dispatch({ type: "REMOVE_ITEM", payload: product });
        }
    };

    return (
        <div className="product-list">
            {products.map((product) => {
                const cartItem = cart.find((item) => item.id === product.id);
                const cartQuantity = cartItem?.quantity || 0;
                return (
                    <div className="product-item" key={product.id}>
                        <Link to={`/product/${product.id}`}>
                            <img src={product.imageUrl} alt={product.name} className="product-image" />
                            <h3>{product.name}</h3>
                            <p>{product.description}</p>
                            <span className="price">Rs. {product.price.toFixed(2)}</span>
                            <span className="stock-text">Only {product.quantity} item(s) left</span>
                        </Link>
                        {cartItem ? (
                            <div className="quantity-controls">
                                <button onClick={() => decrementItem(product)} className="quantity-btn">
                                    <FiMinus />
                                </button>
                                <span>{cartItem.quantity}</span>
                                <button
                                    onClick={() => incrementItem(product)}
                                    className={`quantity-btn ${cartQuantity >= product.quantity ? 'disabled' : ''}`}
                                    disabled={cartQuantity >= product.quantity}
                                >
                                    <FiPlus />
                                </button>
                            </div>
                        ) : (
                            <button
                                onClick={() => addToCart(product)}
                                className="add-to-cart-btn"
                                disabled={product.quantity === 0}
                            >
                                <FiShoppingCart /> {product.quantity === 0 ? "Out of Stock" : "Add to Cart"}
                            </button>
                        )}
                    </div>
                );
            })}
        </div>
    );
};

export default ProductList;
