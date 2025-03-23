import React, { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';

const stripePromise = loadStripe('pk_test_51R20BrQuQy8aXxhAx1DlRKKigcryCTHcdVG6Re0qtmEb6Gzs0zf83Ibd5LE8IPy3qB3BDEaIH8mCXFc9hOwLIB4W0015O3VX9l');

const CheckoutForm = () => {
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setErrorMessage(null);
  
    const response = await fetch('http://localhost:2424/api/payment/create-checkout-session', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
    });
  
    if (!response.ok) {
      setLoading(false);
      setErrorMessage('Error creating checkout session');
      return;
    }
  
    const { sessionId } = await response.json();
  
    // ✅ Correct way to redirect
    const { error } = await stripe.redirectToCheckout({ sessionId });
  
    if (error) {
      setErrorMessage(error.message);
    }
    setLoading(false);
  };

  return (
    <div className="checkout-form-container">
      <h2>Checkout</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <CardElement />
        </div>
        {errorMessage && <div className="error-message">{errorMessage}</div>}
        <button type="submit" disabled={!stripe || loading}>
          {loading ? 'Processing...' : 'Pay Now'}
        </button>
      </form>
    </div>
  );
};

const CheckoutPage = () => (
  <Elements stripe={stripePromise}>
    <CheckoutForm />
  </Elements>
);

export default CheckoutPage;
