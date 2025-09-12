package com.payeasy.merchantproduct.controller;

import java.util.List;
import java.util.Map;
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

import com.payeasy.merchantproduct.dto.MerchantLoginResponse;
import com.payeasy.merchantproduct.entity.Merchant;
import com.payeasy.merchantproduct.service.MerchantService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/merchants")
public class MerchantController{
	@Autowired
	private MerchantService merchantService;
	
	@PostMapping("/register")
    public ResponseEntity<?> registerMerchant(@RequestBody @Valid Merchant merchant) {
        Merchant savedMerchant = merchantService.registerMerchant(merchant);
        return ResponseEntity.ok(savedMerchant);
    }

	@PostMapping("/login")
	public ResponseEntity<?> loginMerchant(@RequestBody Map<String, String> payload) {
	    String email = payload.get("email");
	    String password = payload.get("password");

	    if (email == null || password == null) {
	        return ResponseEntity.badRequest().body(Map.of("error", "Email and password are required"));
	    }

	    Optional<Merchant> optMerchant = merchantService.loginMerchant(email, password);

	    if (optMerchant.isPresent()) {
	        Merchant merchant = optMerchant.get();
	        MerchantLoginResponse response = new MerchantLoginResponse(
	            merchant.getMerchantId(),
	            merchant.getMerchantName(),
	            merchant.getEmail(),
	            "Login successful"
	        );
	        return ResponseEntity.ok(response);
	    } else {
	        return ResponseEntity.status(401).body(Map.of("error", "Invalid credentials"));
	    }
	}
	
	@PostMapping
    public ResponseEntity<Merchant> addMerchant(@RequestBody @Valid Merchant merchant) {
        Merchant savedMerchant = merchantService.addMerchant(merchant);
        return ResponseEntity.ok(savedMerchant);
    }
	
	@GetMapping
    public ResponseEntity<List<Merchant>> getAllMerchants() {
        return ResponseEntity.ok(merchantService.getAllMerchants());
    }

	@GetMapping("/{merchantId}")
	public ResponseEntity<?> getMerchantById(@PathVariable Long merchantId) {
	    Optional<Merchant> merchantOpt = merchantService.getMerchantById(merchantId);
	    if (merchantOpt.isPresent()) {
	        return ResponseEntity.ok(merchantOpt.get());
	    } else {
	        return ResponseEntity.badRequest().body("Merchant not found");
	    }
	}

    @PutMapping("/{merchantId}")
    public ResponseEntity<?> updateMerchant(@PathVariable Long merchantId, @RequestBody Merchant merchantDetails) {
        Merchant updatedMerchant = merchantService.updateMerchant(merchantId, merchantDetails);
        if (updatedMerchant != null) {
            return ResponseEntity.ok(updatedMerchant);
        } else {
            return ResponseEntity.badRequest().body("Merchant not found");
        }
    }

    @DeleteMapping("/{merchantId}")
    public ResponseEntity<?> deleteMerchant(@PathVariable Long merchantId) {
        boolean deleted = merchantService.deleteMerchant(merchantId);
        if (deleted) {
            return ResponseEntity.ok("Merchant deleted successfully");
        } else {
            return ResponseEntity.badRequest().body("Merchant not found");
        }
    }
}