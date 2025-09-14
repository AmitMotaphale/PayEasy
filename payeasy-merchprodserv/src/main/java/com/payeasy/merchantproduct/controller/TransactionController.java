package com.payeasy.merchantproduct.controller;

import com.payeasy.merchantproduct.dto.BuyProductRequest;
import com.payeasy.merchantproduct.entity.Transaction;
import com.payeasy.merchantproduct.service.TransactionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/transactions")
public class TransactionController {

    @Autowired
    private TransactionService transactionService;

    // Buy Product
    @PostMapping("/buy")
    public ResponseEntity<?> buyProduct(@RequestBody BuyProductRequest request) {
        try {
            Transaction tx = transactionService.buyProduct(
                    request.getUserId(),
                    request.getUserName(),
                    request.getUserEmail(),
                    request.getProductId(),
                    request.getQuantity()
            );
            return ResponseEntity.ok(tx);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    // Get Merchant Transactions
    @GetMapping("/merchant/{merchantId}")
    public ResponseEntity<List<Transaction>> getMerchantTransactions(@PathVariable Long merchantId) {
        return ResponseEntity.ok(transactionService.getTransactionsByMerchant(merchantId));
    }

    // Get User Transactions
    @GetMapping("/user/{userId}")
    public ResponseEntity<List<Transaction>> getUserTransactions(@PathVariable Long userId) {
        return ResponseEntity.ok(transactionService.getTransactionsByUser(userId));
    }
}
