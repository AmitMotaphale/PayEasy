package com.payeasy.user.dto;

import lombok.Data;

@Data
public class UserLoginResponse {
	private Long userId;
    private String fullName;
    private String email;
    private String mobile;
    private String message;

    // Constructor
    public UserLoginResponse(Long userId, String fullName, String email, String mobile, String message ) {
        this.userId = userId;
        this.fullName = fullName;
        this.email = email;
        this.mobile = mobile;
        this.message =message;
	    }
	}