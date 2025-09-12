package com.payeasy.bankaccount.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.payeasy.bankaccount.entity.BankAccount;
import com.payeasy.bankaccount.service.BankAccountService;

@RestController
@RequestMapping("/api/bankaccounts")
public class BankAccountController {
	
	@Autowired
	private BankAccountService bankAccountService;
	
	@PostMapping
	public ResponseEntity<BankAccount> addBankAccount(@RequestBody BankAccount bankAccount) {
		BankAccount savedAccount = bankAccountService.addBankAccount(bankAccount);
		return ResponseEntity.ok(savedAccount);
	    }
	
	@GetMapping("/user/{userId}")
    public ResponseEntity<List<BankAccount>> getBankAccountsByUser(@PathVariable Long userId) {
        List<BankAccount> accounts = bankAccountService.getBankAccountsByUser(userId);
        return ResponseEntity.ok(accounts);
    }
	
	@GetMapping("/{bankId}")
	public ResponseEntity<?> getBankAccountById(@PathVariable Long bankId) {
	    Optional<BankAccount> bankAccountOpt = bankAccountService.getBankAccountById(bankId);
	    if (bankAccountOpt.isPresent()) {
	        return ResponseEntity.ok(bankAccountOpt.get());
	    } else {
	        return ResponseEntity.badRequest().body("Bank account not found");
	    }
	}
	
	@PutMapping("/{bankId}")
    public ResponseEntity<?> updateBankAccount(@PathVariable Long bankId, @RequestBody BankAccount bankAccountDetails) {
        BankAccount updatedAccount = bankAccountService.updateBankAccount(bankId, bankAccountDetails);
        if (updatedAccount != null) {
            return ResponseEntity.ok(updatedAccount);
        } else {
            return ResponseEntity.badRequest().body("Bank account not found");
        }
    }

    @DeleteMapping("/{bankId}")
    public ResponseEntity<?> deleteBankAccount(@PathVariable Long bankId) {
        boolean deleted = bankAccountService.deleteBankAccount(bankId);
        if (deleted) {
            return ResponseEntity.ok("Bank account deleted successfully");
        } else {
            return ResponseEntity.badRequest().body("Bank account not found");
        }
    }
    
    @PutMapping("/user/{userId}/primary/{bankId}")
    public ResponseEntity<?> setPrimaryBankAccount(@PathVariable Long userId, @PathVariable Long bankId) {
        boolean updated = bankAccountService.setPrimaryAccount(userId, bankId);
        if (updated) {
            return ResponseEntity.ok("Primary bank account updated successfully");
        } else {
            return ResponseEntity.badRequest().body("Failed to update primary bank account");
        }
    }

}