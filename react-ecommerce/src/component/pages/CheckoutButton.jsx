import React, { useEffect, useState } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { useLocation, useNavigate } from "react-router-dom";
import ApiService from "../../service/ApiService";
import '../../style/checkout.css';
import Visa from "../../assets/common/visa.png";
import Paypal from "../../assets/common/paypal.png";
import Mastercard from "../../assets/common/mastercard.png";
import Amex from "../../assets/common/amex.png";
import { useCart } from "../context/CartContext";

const CheckoutButton = () => {
    const stripe = useStripe();
    const elements = useElements();
    const location = useLocation();
    const navigate = useNavigate();
    const { dispatch } = useCart();
    const [clientSecret, setClientSecret] = useState("");
    const [amount, setAmount] = useState(0);
    const [userAddress, setUserAddress] = useState(null);

    useEffect(() => {
        const total = location.state?.totalAmount || 0;
        setAmount(total);

        
        ApiService.getLoggedInUserInfo()
            .then(response => {
                if (response.user.address) {
                    setUserAddress(response.user.address);
                } else {
                    
                    navigate("/add-address");
                }
            })
            .catch(err => {
                console.error("Error fetching user info:", err);
            });

        if (total > 0) {
            ApiService.createPaymentIntent(Math.round(total * 100))
                .then(data => setClientSecret(data.clientSecret))
                .catch(err => console.error("Payment Intent Error:", err));
        }
    }, [location.state, navigate]);

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!stripe || !elements) return;

        const cardElement = elements.getElement(CardElement);

        const { paymentIntent, error } = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: cardElement,
            },
        });

        if (error) {
            console.error("Payment error:", error.message);
            alert("Payment failed: " + error.message);
        } else if (paymentIntent && paymentIntent.status === "succeeded") {
            dispatch({ type: 'CLEAR_CART' });
            alert("Payment successful!");
            navigate("/");
        }

    };

    const handleEditAddress = () => {
        navigate("/edit-address", { state: { fromCheckout: true } });
    };

    return (
        <div className="container vh-100 d-flex justify-content-center align-items-center">
            <div className="row checkout-container shadow-lg p-0 rounded">
                <div className="col-md-6 p-4 payment-methods">
                    <h5 className="mb-3">How would you like to pay?</h5>
                    <div className="payment-icons mb-4">
                        <img src={Visa} alt="Visa" />
                        <img src={Mastercard} alt="MasterCard" />
                        <img src={Paypal} alt="PayPal" />
                        <img src={Amex} alt="Amex" />
                    </div>
                    <form onSubmit={handleSubmit}>
                        <label className="form-label mb-2">Card Information</label>
                        <div className="card-element-wrapper border rounded p-3 mb-4">
                            <CardElement />
                        </div>
                        <button 
                            type="submit" 
                            className="btn btn-success w-100" 
                            disabled={!stripe || !clientSecret}
                        >
                            Continue to secure payment
                        </button>
                    </form>
                </div>
                <div className="col-md-6 p-4 bg-light border-start">
                    <h5>Order Summary</h5>
                    {userAddress ? (
                        <div className="address-summary">
                            <h6>Shipping Address</h6>
                            <p>{userAddress.street}</p>
                            <p>{userAddress.city}, {userAddress.state} {userAddress.zipCode}</p>
                            <p>{userAddress.country}</p>
                            <button 
                                className="btn btn-primary mt-2" 
                                onClick={handleEditAddress}
                            >
                                Edit Address
                            </button>
                        </div>
                    ) : (
                        <p>Please add a shipping address to proceed with checkout.</p>
                    )}
                    <div className="summary-item d-flex justify-content-between mt-3">
                        <span>Items total:</span><span>Rs. {amount.toFixed(2)}</span>
                    </div>
                    <div className="summary-item d-flex justify-content-between">
                        <span>Shipping:</span><span>Free</span>
                    </div>
                    <div className="summary-item d-flex justify-content-between">
                        <span>Taxes:</span><span>Rs. 0.00</span>
                    </div>
                    <hr />
                    <div className="summary-total d-flex justify-content-between fw-bold">
                        <span>Total:</span><span>Rs. {amount.toFixed(2)}</span>
                    </div>
                    <button 
                        className="btn btn-outline-danger w-100 mt-3" 
                        onClick={() => navigate("/cart")}
                    >
                        Cancel payment
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CheckoutButton;
