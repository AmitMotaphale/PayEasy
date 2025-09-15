package com.payeasy.payment.dto;
import com.payeasy.payment.entity.Transaction;
import com.payeasy.payment.entity.Wallet;

public class WalletTransactionResponse {
	private Wallet wallet;
    private Transaction transaction;

    public WalletTransactionResponse(Wallet wallet, Transaction transaction) {
        this.wallet = wallet;
        this.transaction = transaction;
    }

	public Wallet getWallet() {
		return wallet;
	}

	public void setWallet(Wallet wallet) {
		this.wallet = wallet;
	}

	public Transaction getTransaction() {
		return transaction;
	}

	public void setTransaction(Transaction transaction) {
		this.transaction = transaction;
	}
    
    
}