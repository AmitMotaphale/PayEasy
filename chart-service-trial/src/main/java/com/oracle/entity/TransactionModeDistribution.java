package com.oracle.entity;
import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.*;

@Entity
@Table(name = "transaction_distribution")
public class TransactionModeDistribution {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @JsonProperty("username")
    private String username;

    @JsonProperty("payment_mode")
    private String paymentMode;

    @JsonProperty("txnValue")
    private Long txnValue;

    // Getters & Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getUsername() { return username; }
    public void setUsername(String username) { this.username = username; }

    public String getPaymentMode() { return paymentMode; }
    public void setPaymentMode(String paymentMode) { this.paymentMode = paymentMode; }

    public Long getTxnValue() { return txnValue; }
    public void setTxnValue(Long txnValue) { this.txnValue = txnValue; }
}
