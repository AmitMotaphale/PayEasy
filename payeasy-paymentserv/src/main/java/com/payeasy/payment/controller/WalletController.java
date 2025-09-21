package com.payeasy.payment.controller;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.payeasy.payment.dto.SendMoneyRequest;
import com.payeasy.payment.dto.WalletRequest;
import com.payeasy.payment.dto.WalletTransactionResponse;
import com.payeasy.payment.entity.Wallet;
import com.payeasy.payment.service.WalletService;

@RestController
@RequestMapping("/api/wallets")
public class WalletController {

    @Autowired
    private WalletService walletService;

    @PostMapping("/create/{userId}")
    public ResponseEntity<Wallet> createWallet(@PathVariable Long userId) {
        Wallet wallet = walletService.createWallet(userId);
        return ResponseEntity.ok(wallet);
    }
    @GetMapping("/user/{userId}")
    public ResponseEntity<?> getWallet(@PathVariable Long userId) {
    	var walletOpt = walletService.getWalletByUserId(userId);
        if (walletOpt.isPresent()) {
            return ResponseEntity.ok(walletOpt.get());
        } else {
            return ResponseEntity.badRequest().body("Wallet not found");
        }
    }

    @PostMapping("/user/{userId}/add")
    public ResponseEntity<?> addFunds(@PathVariable Long userId, @RequestBody WalletRequest request) {
        WalletTransactionResponse response = walletService.addFunds(userId, request);
        if (response != null) return ResponseEntity.ok(response);
        return ResponseEntity.badRequest().body("Wallet not found");
    }
    

    @PostMapping("/user/{userId}/deduct")
    public ResponseEntity<?> deductFunds(@PathVariable Long userId, @RequestBody WalletRequest request) {
        WalletTransactionResponse response = walletService.deductFunds(userId, request);
        if (response != null) return ResponseEntity.ok(response);
        return ResponseEntity.badRequest().body("Insufficient balance or wallet not found");
    }
}
