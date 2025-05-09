package com.second.Eccormerce.service.interf;

public interface EmailService {
    void sendPaymentConfirmation(String toEmail, String subject, String body);
}
