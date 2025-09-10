package com.oracle.service;

import com.oracle.entity.AppUser;
import com.oracle.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    public boolean authenticate(String username, String password) {
        AppUser user = userRepository.findByUsername(username);
        System.out.println("DB user: " + (user != null ? user.getUsername() : "null"));
        System.out.println("DB pass: [" + (user != null ? user.getPassword() : "null") + "]");
        System.out.println("Input user: [" + username + "]");
        System.out.println("Input pass: [" + password + "]");
        if (user != null && user.getPassword().equals(password)) {
            return true;
        }
        return false;
    }

    public AppUser registerUser(String username, String password) {
        if(userRepository.findByUsername(username) == null) {
            AppUser newUser = new AppUser();
            newUser.setUsername(username);
            newUser.setPassword(password); // Store hashed passwords in production!
            return userRepository.save(newUser);
        }
        return null;
    }
}