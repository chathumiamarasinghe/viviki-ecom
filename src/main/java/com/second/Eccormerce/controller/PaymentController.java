package com.second.Eccormerce.controller;

import com.second.Eccormerce.service.interf.PaymentService;
import com.stripe.exception.StripeException;
import com.stripe.model.PaymentIntent;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/payment")
@CrossOrigin(origins = "*")
public class PaymentController {

    @Autowired
    private PaymentService paymentService;

    @PostMapping("/create-payment-intent")
    public ResponseEntity<Map<String, String>> createPaymentIntent(@RequestBody Map<String, Object> data) throws StripeException {
        Long amount = ((Number) data.get("amount")).longValue();
        String currency = (String) data.get("currency");

        PaymentIntent intent = paymentService.createPaymentIntent(amount, currency);
        Map<String, String> response = new HashMap<>();
        response.put("clientSecret", intent.getClientSecret());

        return ResponseEntity.ok(response);
    }
}
