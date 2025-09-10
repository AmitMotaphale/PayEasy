package com.oracle.controller;

import com.oracle.dto.LoginRequest;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

@Controller
public class AuthController {

    // Show the login form
    @GetMapping({"/", "/login"})
    public String showLoginForm(Model model) {
        model.addAttribute("loginRequest", new LoginRequest());
        return "login";
    }

    // Handle login POST
    @PostMapping("/login")
    public String doLogin(@ModelAttribute LoginRequest loginRequest, Model model) {
        // No validation, just echo username to dashboard
        model.addAttribute("username", loginRequest.getUsername());
        return "dashboard";
    }
}