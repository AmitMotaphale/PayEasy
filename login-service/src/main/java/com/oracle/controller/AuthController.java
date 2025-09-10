package com.oracle.controller;

import com.oracle.dto.AuthResponse;
import com.oracle.dto.LoginRequest;
import com.oracle.dto.RegisterRequest;
import com.oracle.entity.AppUser;
import com.oracle.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private UserService userService;

    @PostMapping("/login")
    public ResponseEntity<AuthResponse> login(@RequestBody LoginRequest request) {
        boolean authenticated = userService.authenticate(request.getUsername(), request.getPassword());
        if (authenticated) {
            return ResponseEntity.ok(new AuthResponse("success", request.getUsername()));
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(new AuthResponse("Invalid credentials", null));
        }
    }

    @PostMapping("/register")
    public ResponseEntity<AuthResponse> register(@RequestBody RegisterRequest request) {
        AppUser user = userService.registerUser(request.getUsername(), request.getPassword());
        if(user != null) {
            return ResponseEntity.ok(new AuthResponse("Registration successful", user.getUsername()));
        }
        return ResponseEntity.status(HttpStatus.BAD_REQUEST)
            .body(new AuthResponse("Username already exists", null));
    }
}