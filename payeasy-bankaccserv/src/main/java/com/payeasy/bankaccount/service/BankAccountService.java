package com.payeasy.bankaccount.service;

import java.sql.Timestamp;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.payeasy.bankaccount.entity.BankAccount;
import com.payeasy.bankaccount.repository.BankAccountRepository;

@Service
public class BankAccountService {

	@Autowired
	private BankAccountRepository bankAccountRepository;
	
	public BankAccount addBankAccount(BankAccount bankAccount) {
        bankAccount.setCreatedAt(new Timestamp(System.currentTimeMillis()));
        return bankAccountRepository.save(bankAccount);
    }

    public List<BankAccount> getBankAccountsByUser(Long userId) {
        return bankAccountRepository.findByUserId(userId);
    }

    public Optional<BankAccount> getBankAccountById(Long bankId) {
        return bankAccountRepository.findById(bankId);
    }

    public BankAccount updateBankAccount(Long bankId, BankAccount bankAccountDetails) {
        Optional<BankAccount> optBankAccount = bankAccountRepository.findById(bankId);
        if (optBankAccount.isPresent()) {
            BankAccount bankAccount = optBankAccount.get();
            bankAccount.setBankName(bankAccountDetails.getBankName());
            bankAccount.setAccountNumber(bankAccountDetails.getAccountNumber());
            bankAccount.setIfscCode(bankAccountDetails.getIfscCode());
            bankAccount.setUpiId(bankAccountDetails.getUpiId());
            bankAccount.setIsPrimary(bankAccountDetails.getIsPrimary());
            return bankAccountRepository.save(bankAccount);
        }
        return null;
    }

    public boolean deleteBankAccount(Long bankId) {
        Optional<BankAccount> optBankAccount = bankAccountRepository.findById(bankId);
        if (optBankAccount.isPresent()) {
            bankAccountRepository.deleteById(bankId);
            return true;
        }
        return false;
    }

    public boolean setPrimaryAccount(Long userId, Long bankId) {
        List<BankAccount> accounts = bankAccountRepository.findByUserId(userId);
        if (accounts.isEmpty()) {
            return false;  // No accounts for user
        }
        boolean found = false;
        for (BankAccount account : accounts) {
            if (account.getBankId().equals(bankId)) {
                account.setIsPrimary(true);
                found = true;
            } else {
                account.setIsPrimary(false);
            }
        }
        if (!found) {
            return false; // bankId not found for user
        }
        bankAccountRepository.saveAll(accounts);
        return true;
    }

}