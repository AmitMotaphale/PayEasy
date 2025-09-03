package com.payeasy.user.service;

import com.payeasy.user.entity.User;
import com.payeasy.user.repository.UserRepository;
import com.payeasy.user.util.HashUtil;
import org.springframework.stereotype.Service;
import java.sql.Timestamp;
import java.util.Optional;

@Service
public class UserService{

    private final UserRepository userRepository;

    public UserService(UserRepository userRepository){
        this.userRepository = userRepository;
    }

    public Optional<User> login(String email, String password){
    	Optional<User> userOpt=userRepository.findByEmail(email);
    	User user = userOpt.get();
    	String hashedPass = HashUtil.md5Hash(password);
    	if (!hashedPass.equals(user.getPasswordHash())) {
            return Optional.empty();
        }
    	 return Optional.of(user);
    }

    public User register(User user) {
    	 String hashedPass = HashUtil.md5Hash(user.getPasswordHash());
    	 user.setPasswordHash(hashedPass);
    	 user.setCreatedAt(new Timestamp(System.currentTimeMillis()));
         user.setUpdatedAt(new Timestamp(System.currentTimeMillis()));
        return userRepository.save(user);
    }
    public User updateProfile(Long userId, User updatedUser) {
        User user = userRepository.findById(userId)
            .orElseThrow(() -> new IllegalArgumentException("User not found"));
        if (updatedUser.getFullName() != null) user.setFullName(updatedUser.getFullName());
        if (updatedUser.getMobile() != null) user.setMobile(updatedUser.getMobile());
        user.setUpdatedAt(new Timestamp(System.currentTimeMillis()));
        return userRepository.save(user);
    }
    public Optional<User> findByEmail(String email) {
        return userRepository.findByEmail(email);
    }
	public Optional<User> findByMobile(String mobile) {
	        return userRepository.findByMobile(mobile);
	    }

}
