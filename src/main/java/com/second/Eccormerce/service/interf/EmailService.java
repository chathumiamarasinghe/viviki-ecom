package com.second.Eccormerce.service.interf;

import java.util.List;

public interface EmailService {
    void sendNotification(List<String> toAddresses, String subject, String body);
}
