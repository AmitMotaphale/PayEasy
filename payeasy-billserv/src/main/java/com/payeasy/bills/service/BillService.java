package com.payeasy.bills.service;

import java.sql.Timestamp;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.payeasy.bills.entity.Bill;
import com.payeasy.bills.repository.BillRepository;

@Service
public class BillService {
	@Autowired
	private BillRepository billRepository;
	
	
	public Bill addBill(Bill bill) {
		bill.setCreateAt(new Timestamp(System.currentTimeMillis()));
		bill.setStatus("PENDING");
		return billRepository.save(bill);
	}
	public List<Bill> getBillsByUser(Long userId){
		return billRepository.findByUserId(userId);
	}
	
	public List<Bill> getBillsbyUserAndStatus(Long userId , String status){
		return billRepository.findByUserIdAndStatus(userId , status);
	}
	
	public Optional<Bill> payBill(long BillId){
		Optional<Bill> billOpt = billRepository.findById(BillId);
		if (billOpt.isPresent()) {
            Bill bill = billOpt.get();
            bill.setStatus("PAID");
            billRepository.save(bill);
           return Optional.of(bill);
	}
		return Optional.empty();
	}
}
