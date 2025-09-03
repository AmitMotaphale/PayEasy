package com.payeasy.user.kafka;

import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Service;

@Service
public class UserEmailProducer {

    private final KafkaTemplate<String, String> kafkaTemplate;

    public UserEmailProducer(KafkaTemplate<String, String> kafkaTemplate){
        this.kafkaTemplate = kafkaTemplate;
    }

    public void sendEmailToKafka(String email){
        kafkaTemplate.send("user-email-topic", email);
        System.out.println("📤 Sent user email to Kafka: " + email);
    }
}
