package com.payeasy.merchbankaccount.repository;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

import com.payeasy.merchbankaccount.entity.BankAccount;

public interface BankAccountRepository extends JpaRepository<BankAccount, Long> {
	List<BankAccount> findByMerchId(Long MerchId);

}
