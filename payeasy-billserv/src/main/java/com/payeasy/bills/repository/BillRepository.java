package com.payeasy.bills.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.payeasy.bills.entity.Bill;

@Repository
public interface BillRepository extends JpaRepository<Bill, Long>{
	List<Bill> findByUserId(Long UserId);
	List<Bill> findByUserIdAndStatus(Long userId, String status);
}
