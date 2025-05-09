package com.second.Eccormerce.service.interf;

import com.stripe.exception.StripeException;
import com.stripe.model.PaymentIntent;

public interface PaymentService {
    PaymentIntent createPaymentIntent(Long amount, String currency) throws StripeException;
}