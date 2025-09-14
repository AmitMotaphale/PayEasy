package com.payeasy.merchantproduct.dto;

import lombok.Data;

@Data
public class BuyProductRequest {
    private Long userId;
    private String userName;
    private String userEmail;
    private Long productId;
    private int quantity;

    // getters & setters
}
