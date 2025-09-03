package com.payeasy.user.controller;

import com.payeasy.user.entity.User;
import com.payeasy.user.kafka.UserEmailProducer;
import com.payeasy.user.service.UserService;
import com.payeasy.user.util.HashUtil;

import jakarta.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/users")
public class LoginController {

	@Autowired
    private final UserService userService;
    private final UserEmailProducer producer;

    public LoginController(UserService userService, UserEmailProducer producer){
        this.userService = userService;
        this.producer = producer;
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Map<String, String> payload){
    	 String email = payload.get("email");
	     String password = payload.get("password");
        
        //Exception Handling Manual tho not required as Spring Validation taking care 
        if (email == null || password == null) {
            return ResponseEntity.badRequest().body(Map.of("error", "Email and password are required"));
        }
        String hashedPass = HashUtil.md5Hash(password);
        Optional<User> userOpt = userService.login(email, hashedPass);
        
        
        if(userOpt.isPresent()){
            // Send email to Kafka topic
        	User user = userOpt.get();
            producer.sendEmailToKafka(user.getEmail());
            return ResponseEntity.ok("Login successful. OTP sent via notification service.");
        } else {
            return ResponseEntity.status(401).body("Invalid credentials");
        }
    }
    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody @Valid User user){
    try {
    	//not required as added spring-validation
        if (user.getPasswordHash() == null || user.getPasswordHash().isEmpty()) {
            return ResponseEntity.badRequest().body("Password is required");
        }
        String hashedPass = HashUtil.md5Hash(user.getPasswordHash());
        user.setPasswordHash(hashedPass);

        User savedUser = userService.register(user);
        return ResponseEntity.ok(savedUser);
    	} 
    catch (IllegalArgumentException ex) {
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
