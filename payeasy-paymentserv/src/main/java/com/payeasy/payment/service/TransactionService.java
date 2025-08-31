package com.payeasy.payment.service;

import java.sql.Timestamp;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.payeasy.payment.entity.Transaction;
import com.payeasy.payment.repository.TransactionRepository;

@Service
public class TransactionService {
	@Autowired
	private TransactionRepository transactionRepository;
	
	public Transaction createTransaction(Transaction txn) {
		txn.setCreatedAt(new Timestamp(System.currentTimeMillis()));
		return transactionRepository.save(txn);
	}
	
  public List<Transaction> getTransactionsByWalletId(Long walletId) {
        return transactionRepository.findByWalletId(walletId);
    }
  public List<Transaction> getTransactionsByUserId(Long userId) {
        return transactionRepository.findByUserId(userId);
    }
}
