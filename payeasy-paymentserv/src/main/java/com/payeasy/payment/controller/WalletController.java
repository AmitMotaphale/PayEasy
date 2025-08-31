package com.payeasy.payment.controller;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import com.payeasy.payment.PayeasyPaymentservApplication;
import com.payeasy.payment.entity.Wallet;
import com.payeasy.payment.service.WalletService;

@RestController
@RequestMapping("/api/wallets")
public class WalletController {

    private final PayeasyPaymentservApplication payeasyPaymentservApplication;
	@Autowired
	private WalletService walletService;

    WalletController(PayeasyPaymentservApplication payeasyPaymentservApplication) {
        this.payeasyPaymentservApplication = payeasyPaymentservApplication;
    }
	
	@PostMapping("/create/{userId}")
	public ResponseEntity<Wallet> createWallet(@PathVariable Long userId) {
        Wallet wallet = walletService.createWallet(userId);
        return ResponseEntity.ok(wallet);
    }
	
	@GetMapping("/user/{userId}")
	public ResponseEntity<?> getWallet(@PathVariable Long userId){
		Optional<Wallet> walletOpt = walletService.getWalletByUserId(userId);
	    if(walletOpt.isPresent()) {
	        return ResponseEntity.ok(walletOpt.get());
	    } else {
	        return ResponseEntity.badRequest().body("Wallet not found");
	    }
	}
	@PutMapping("/user/{userId}/add")
    public ResponseEntity<?> addFunds(@PathVariable Long userId, @RequestParam Double amount) {
        Wallet wallet = walletService.addFunds(userId, amount);
        if (wallet != null) return ResponseEntity.ok(wallet);
        else return ResponseEntity.badRequest().body("Wallet not found");
    }

    @PutMapping("/user/{userId}/deduct")
    public ResponseEntity<?> deductFunds(@PathVariable Long userId, @RequestParam Double amount) {
        Wallet wallet = walletService.deductFunds(userId, amount);
        if (wallet != null) return ResponseEntity.ok(wallet);
        else return ResponseEntity.badRequest().body("Insufficient balance or wallet not found");
    }
}