package com.payeasy.bills.controller;

import com.payeasy.bills.entity.Bill;
import com.payeasy.bills.service.BillService;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;

import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/bills")
public class BillController {
@Autowired
private BillService billService;

	@PostMapping
	public ResponseEntity<Bill> createBill(@RequestBody Bill bill){
		Bill saved= billService.addBill(bill);
		return ResponseEntity.ok(saved);
	}
	
	@GetMapping("/user/{userId}")
    public ResponseEntity<List<Bill>> getUserBills(@PathVariable Long userId) {
        List<Bill> bills = billService.getBillsByUser(userId);
        return ResponseEntity.ok(bills);
    }

    @GetMapping("/user/{userId}/status/{status}")
    public ResponseEntity<List<Bill>> getUserBillsByStatus(@PathVariable Long userId, @PathVariable String status) {
        List<Bill> bills = billService.getBillsbyUserAndStatus(userId, status);
        return ResponseEntity.ok(bills);
    }
    
    //() -> ResponseEntity.badRequest().body("Bill not found")
    @PutMapping("/{billId}/pay")
    public ResponseEntity<?> payBill(@PathVariable Long billId) {
        Optional<Bill> billOpt = billService.payBill(billId);
        if (billOpt.isPresent()) {
            return ResponseEntity.ok(billOpt.get());
        } else {
            return ResponseEntity.badRequest().body("Bill not found");
        }
    }

}