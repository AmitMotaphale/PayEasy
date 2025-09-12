package com.payeasy.bills.entity;

import java.sql.Timestamp;
import java.util.Date;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name="BILLS")
@Data
public class Bill {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long billId;
	
	private long userId;            // From localStorage
    private String userName;        // Optional: to show in UI
    private String billType;        // Electricity, Gas, Phone, DTH
    private String customerId;      // User provided (account/customer id for provider)
    private Double amount;
    private String status;          // PENDING → SUBMITTED
    private Timestamp createdAt;
    
    //getters and setters is from @data lombok 
}