package com.payeasy.payment.service;

import java.sql.Timestamp;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.payeasy.payment.entity.Wallet;
import com.payeasy.payment.repository.WalletRepository;

@Service
public class WalletService {
	@Autowired
	private WalletRepository walletRepository;
	
	public Wallet createWallet(Long userId) {
		Wallet wallet= new Wallet();
		wallet.setUserId(userId);
		wallet.setBalance(0.0);
		wallet.setLastUpdated(new Timestamp(System.currentTimeMillis()));
		return walletRepository.save(wallet);
	}
	 public Optional<Wallet> getWalletByUserId(Long userId) {
	        return walletRepository.findByUserId(userId);
	    }

	    public Wallet addFunds(Long userId, Double amount) {
	        Optional<Wallet> walletOpt = walletRepository.findByUserId(userId);
	        if (walletOpt.isPresent()) {
	            Wallet wallet = walletOpt.get();
	            wallet.setBalance(wallet.getBalance() + amount);
	            wallet.setLastUpdated(new Timestamp(System.currentTimeMillis()));
	            return walletRepository.save(wallet);
	        }
	        return null;
	    }

	    public Wallet deductFunds(Long userId, Double amount) {
	        Optional<Wallet> walletOpt = walletRepository.findByUserId(userId);
	        if (walletOpt.isPresent()) {
	            Wallet wallet = walletOpt.get();
	            if (wallet.getBalance() >= amount) {
	                wallet.setBalance(wallet.getBalance() - amount);
	                wallet.setLastUpdated(new Timestamp(System.currentTimeMillis()));
	                return walletRepository.save(wallet);
	            }
	        }
	        return null;
	    }
	}