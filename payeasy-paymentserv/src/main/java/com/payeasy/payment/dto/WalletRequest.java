package com.payeasy.payment.dto;

import lombok.Data;

@Data
public class WalletRequest {
    private Double amount;
    private Long bankId;
    private Long merchantId; // optional, only for deduction
    private String description;
}