package com.payeasy.merchantproduct.entity;

import java.sql.Timestamp;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;

@Entity
@Table(name = "MERCHANTS")
public class Merchant {
	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long merchantId;
	
	@NotBlank(message="Merchant name is required")
	@Size(max=100 ,message="Merchant name must be at most 100 characters")
	private String merchantName;
	@NotBlank(message = "Contact number is required")
	@Pattern(
	    regexp = "^[6-9]\\d{9}$",
	    message = "Contact number must be a 10-digit number starting with 6-9"
	)
	private String contactNumber;
	
	@NotBlank(message = "Email is required")
	@Email(message = "Email should be valid")
	private String email;
	private Timestamp createdAt;
	public Long getMerchantId() {
		return merchantId;
	}
	public void setMerchantId(Long merchantId) {
		this.merchantId = merchantId;
	}
	public String getMerchantName() {
		return merchantName;
	}
	public void setMerchantName(String merchantName) {
		this.merchantName = merchantName;
	}
	public String getContactNumber() {
		return contactNumber;
	}
	public void setContactNumber(String contactNumber) {
		this.contactNumber = contactNumber;
	}
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	public Timestamp getCreatedAt() {
		return createdAt;
	}
	public void setCreatedAt(Timestamp createdAt) {
		this.createdAt = createdAt;
	}
	
	
	
}
