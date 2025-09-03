package com.payeasy.notification.kafka;

import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Service;

import com.payeasy.notification.service.EmailService;

@Service
public class UserEmailConsumer {

    private final EmailService emailService;

    public UserEmailConsumer(EmailService emailService){
        this.emailService = emailService;
    }

    @KafkaListener(topics = "user-email-topic", groupId = "email-group")
    public void listen(String email){
        System.out.println("📥 Received email from Kafka: " + email);
        emailService.sendOtpEmail(email);
    }
}
