package com.payeasy.merchantproduct.repository;

import com.payeasy.merchantproduct.entity.Transaction;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TransactionRepository extends JpaRepository<Transaction, Long> {
    List<Transaction> findByMerchantId(Long merchantId);
    List<Transaction> findByUserId(Long userId);
}
