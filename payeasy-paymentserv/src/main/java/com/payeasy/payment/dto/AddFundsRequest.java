package com.payeasy.payment.dto;
import lombok.Data;

@Data
public class AddFundsRequest {
	    private Double amount;
	    private Long bankId;
	    private String description;
	    // getters and setters
}
