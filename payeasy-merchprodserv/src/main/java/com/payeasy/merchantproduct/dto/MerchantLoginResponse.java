package com.payeasy.merchantproduct.dto;

import lombok.Data;

@Data
public class MerchantLoginResponse {
    private Long merchantId;
    private String merchantName;
    private String email;
    private String message;

    // Constructor
    public MerchantLoginResponse(Long merchantId, String merchantName, String email, String message) {
        this.merchantId = merchantId;
        this.merchantName = merchantName;
        this.email = email;
        this.message = message;
    }
}
    