package com.payeasy.user.controller;

import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.payeasy.user.entity.User;
import com.payeasy.user.service.UserService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/users")
public class UserController {
		
	 @Autowired
	    private UserService userService;

	 @PostMapping("/register")
	    public ResponseEntity<?> registerUser(@RequestBody @Valid User user) {
	        try {
	            User savedUser = userService.register(user);
	            return ResponseEntity.ok(savedUser);
	        } catch (IllegalArgumentException ex) {
	            return ResponseEntity.badRequest().body(Map.of("error", ex.getMessage()));
	        }
	    }
	 
	 @PostMapping("/login")
	    public ResponseEntity<?> loginUser(@RequestBody Map<String, String> payload) {
	        String email = payload.get("email");
	        String password = payload.get("password");
	        Optional<User> userOpt = userService.login(email, password);
	        if (userOpt.isEmpty()) {
	            return ResponseEntity.status(401).body(Map.of("error", "Invalid credentials"));
	        }
	        User user = userOpt.get();
	        // If MFA enabled, require OTP verification next (simulate with static OTP below)
	        if (Boolean.TRUE.equals(user.getMfaEnabled())) {
	            return ResponseEntity.ok(Map.of("mfa_required", true, "message", "Enter OTP"));
	        }
	        return ResponseEntity.ok(user);
	    }

	 @PostMapping("/mfa/verify")
	    public ResponseEntity<?> verifyMfaOtp(@RequestBody Map<String, String> payload) {
	        String otp = payload.get("otp");
	        if ("1234".equals(otp)) {
	            return ResponseEntity.ok(Map.of("message", "MFA verified"));
	        } else {
	            return ResponseEntity.status(401).body(Map.of("error", "Invalid OTP"));
	        }
	    }

	    @PostMapping("/mfa/enable/{userId}")
	    public ResponseEntity<?> enableMfa(@PathVariable Long userId, @RequestParam boolean enable) {
	        try {
	            User user = userService.enableMfa(userId, enable);
	            return ResponseEntity.ok(user);
	        } catch (IllegalArgumentException ex) {
	            return ResponseEntity.badRequest().body(Map.of("error", ex.getMessage()));
	        }
	    }

	    @PutMapping("/profile/{userId}")
	    public ResponseEntity<?> updateProfile(@PathVariable Long userId, @RequestBody User updatedUser) {
	        try {
	            User user = userService.updateProfile(userId, updatedUser);
	            return ResponseEntity.ok(user);
	        } catch (IllegalArgumentException ex) {
	            return ResponseEntity.badRequest().body(Map.of("error", ex.getMessage()));
	        }
	    }
	}