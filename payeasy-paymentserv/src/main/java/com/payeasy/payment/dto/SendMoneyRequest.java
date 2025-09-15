package com.payeasy.payment.dto;
import java.math.BigDecimal;
import lombok.Data;

@Data
public class SendMoneyRequest {
    private Long fromWalletId;
    private Long toWalletId;
    private BigDecimal amount;
    // getters & setters
}

