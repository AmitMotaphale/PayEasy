package com.payeasy.payment.dto;

import lombok.Data;

@Data
public class DeductFundsRequest {
	private Double amount;
    private Long merchantId;
    private String description;
}
