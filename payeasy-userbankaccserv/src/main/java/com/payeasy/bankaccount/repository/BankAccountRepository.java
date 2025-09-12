package com.payeasy.bankaccount.repository;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import com.payeasy.bankaccount.entity.BankAccount;

public interface BankAccountRepository extends JpaRepository<BankAccount, Long> {
	List<BankAccount> findByUserId(Long UserId);

}
