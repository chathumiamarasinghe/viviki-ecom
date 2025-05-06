import React, { useEffect, useState } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { useLocation, useNavigate } from "react-router-dom";
import ApiService from "../../service/ApiService";
import '../../style/checkout.css';

const CheckoutButton = () => {
    const stripe = useStripe();
    const elements = useElements();
    const location = useLocation();
    const navigate = useNavigate();
    const [clientSecret, setClientSecret] = useState("");
    const [amount, setAmount] = useState(0);

    useEffect(() => {
        const total = location.state?.totalAmount || 0;
        setAmount(total);

        if (total > 0) {
            ApiService.createPaymentIntent(Math.round(total * 100))
                .then(data => setClientSecret(data.clientSecret))
                .catch(err => console.error("Payment Intent Error:", err));
        }
    }, [location.state]);

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
            alert("Payment successful!");
            navigate("/");
        }
    };

    return (
        <div className="container d-flex justify-content-center align-items-center vh-100">
            <div className="card shadow-lg p-4 checkout-card">
                <h2 className="text-center mb-4">Checkout</h2>
                <h5 className="text-muted mb-4 text-center">Total: Rs. {amount.toFixed(2)}</h5>
                <form onSubmit={handleSubmit}>
                    <div className="form-group mb-4">
                        <label className="mb-2">Card Information</label>
                        <div className="card-element-wrapper border rounded p-3">
                            <CardElement />
                        </div>
                    </div>
                    <button 
                        type="submit" 
                        className="btn btn-primary w-100" 
                        disabled={!stripe || !clientSecret}
                    >
                        Pay Rs. {amount.toFixed(2)}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default CheckoutButton;
