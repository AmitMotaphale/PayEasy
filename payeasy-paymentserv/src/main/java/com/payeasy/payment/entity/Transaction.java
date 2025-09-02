package com.payeasy.payment.entity;

import java.sql.Timestamp;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Positive;
import jakarta.validation.constraints.Size;

@Entity
@Table(name = "TRANSACTIONS")
public class Transaction {
	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long txnId;
	
	@NotNull(message = "User ID is required")
	private Long userId;
	
	@NotNull(message = "Wallet ID is required")
	private Long walletId;
	
	@NotNull(message = "Bank ID is required")
	private Long bankId;
	
//	@NotNull(message = "Merchant ID is required")
    private Long merchantId;
	
	@NotNull(message = "Transaction type is required")
	@Size(min = 3, max = 20, message = "Transaction type must be between 3 and 20 characters")
    private String txnType;
	
	@NotNull(message = "Amount is required")
	@Positive(message = "Amount must be positive")
    private Double amount;
	
	@NotNull(message = "Status is required")
	@Pattern(regexp = "^(PENDING|SUCCESS|FAILED|CANCELLED)$", message = "Status must be one of PENDING, SUCCESS, FAILED, CANCELLED")
	private String status;
	
	@Size(max = 255, message = "Description can be at most 255 characters")
    private String description;
    private Timestamp createdAt;
    public Long getTxnId() {
		return txnId;
	}
	public void setTxnId(Long txnId) {
		this.txnId = txnId;
	}
	public Long getUserId() {
		return userId;
	}
	public void setUserId(Long userId) {
		this.userId = userId;
	}
	public Long getWalletId() {
		return walletId;
	}
	public void setWalletId(Long walletId) {
		this.walletId = walletId;
	}
	public Long getBankId() {
		return bankId;
	}
	public void setBankId(Long bankId) {
		this.bankId = bankId;
	}
	public Long getMerchantId() {
		return merchantId;
	}
	public void setMerchantId(Long merchantId) {
		this.merchantId = merchantId;
	}
	public String getTxnType() {
		return txnType;
	}
	public void setTxnType(String txnType) {
		this.txnType = txnType;
	}
	public Double getAmount() {
		return amount;
	}
	public void setAmount(Double amount) {
		this.amount = amount;
	}
	public String getStatus() {
		return status;
	}
	public void setStatus(String status) {
		this.status = status;
	}
	public String getDescription() {
		return description;
	}
	public void setDescription(String description) {
		this.description = description;
	}
	public Timestamp getCreatedAt() {
		return createdAt;
	}
	public void setCreatedAt(Timestamp createdAt) {
		this.createdAt = createdAt;
	}

}
