package com.payeasy.notification.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.payeasy.notification.service.EmailService;

@RestController
@RequestMapping("/otp")
public class OtpController {

    private final EmailService emailService;

    public OtpController(EmailService emailService){
        this.emailService = emailService;
    }

    // Verify OTP
    @PostMapping("/verify")
    public ResponseEntity<?> verifyOtp(@RequestBody OtpRequest request){
        boolean valid = emailService.verifyOtp(request.getEmail(), request.getOtp());
        if(valid){
            return ResponseEntity.ok("OTP verified successfully!");
        } else {
            return ResponseEntity.status(400).body("Invalid OTP");
        }
    }

    // Request body class
    public static class OtpRequest {
        private String email;
        private String otp;

        public String getEmail() { return email; }
        public void setEmail(String email) { this.email = email; }
        public String getOtp() { return otp; }
        public void setOtp(String otp) { this.otp = otp; }
    }
}
