package com.payeasy.notification.service;

import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;
import java.util.Random;

@Service
public class EmailService {

    private final JavaMailSender mailSender;
    private final Map<String, String> otpStorage = new HashMap<>(); // email -> OTP

    public EmailService(JavaMailSender mailSender){
        this.mailSender = mailSender;
    }

    // Generate 6-digit OTP
    private String generateOtp() {
        return String.format("%06d", new Random().nextInt(999999));
    }

    // Send OTP email
    public void sendOtpEmail(String toEmail){
        String otp = generateOtp();
        otpStorage.put(toEmail, otp); // store OTP for verification

        String subject = "Your OTP Code";
        String body = "Your OTP is: " + otp;

        SimpleMailMessage message = new SimpleMailMessage();
        message.setFrom("annaban013@gmail.com");
        message.setTo(toEmail);
        message.setSubject(subject);
        message.setText(body);

        mailSender.send(message);

        System.out.println("📧 OTP Email sent to: " + toEmail + " | OTP: " + otp);
    }

    // Verify OTP
    public boolean verifyOtp(String email, String otp){
        String storedOtp = otpStorage.get(email);
        if(storedOtp != null && storedOtp.equals(otp)){
            otpStorage.remove(email); // remove OTP after successful verification
            return true;
        }
        return false;
    }
}
