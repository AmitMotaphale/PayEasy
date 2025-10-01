package com.payeasy.merchantproduct.entity;

import java.sql.Timestamp;

import jakarta.persistence.*;

@Entity
@Table(name = "TRANSACTIONS")
public class Transaction {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long transactionId;

    private Long userId;     //fetched by DTO via Localstorage ~KG
    @Column(name = "USERNAME")
    private String userName;  //fetched by DTO via Localstorage ~KG
    @Column(name = "USER_EMAIL")
    private String userEmail; 

    private Long merchantId;
    private Long productId;

    private int quantityBought; // purchased
    @Column(name = "AMOUNT", nullable = false)
    private Double totalAmount; // totalAmount = price * qty
    private Timestamp createdAt;
	public Long getTransactionId() {
		return transactionId;
	}
	public void setTransactionId(Long transactionId) {
		this.transactionId = transactionId;
	}
	public Long getUserId() {
		return userId;
	}
	public void setUserId(Long userId) {
		this.userId = userId;
	}
	public String getUserName() {
		return userName;
	}
	public void setUserName(String userName) {
		this.userName = userName;
	}
	public String getUserEmail() {
		return userEmail;
	}
	public void setUserEmail(String userEmail) {
		this.userEmail = userEmail;
	}
	public Long getMerchantId() {
		return merchantId;
	}
	public void setMerchantId(Long merchantId) {
		this.merchantId = merchantId;
	}
	public Long getProductId() {
		return productId;
	}
	public void setProductId(Long productId) {
		this.productId = productId;
	}
	public int getQuantityBought() {
		return quantityBought;
	}
	public void setQuantityBought(int quantityBought) {
		this.quantityBought = quantityBought;
	}
	public Double getTotalAmount() {
		return totalAmount;
	}
	public void setTotalAmount(Double totalAmount) {
		this.totalAmount = totalAmount;
	}
	public Timestamp getCreatedAt() {
		return createdAt;
	}
	public void setCreatedAt(Timestamp createdAt) {
		this.createdAt = createdAt;
	}

    
}
