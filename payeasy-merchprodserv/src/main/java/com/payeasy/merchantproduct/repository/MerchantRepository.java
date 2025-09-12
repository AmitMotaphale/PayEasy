package com.payeasy.merchantproduct.repository;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.payeasy.merchantproduct.entity.Merchant;

@Repository
public interface MerchantRepository extends JpaRepository<Merchant, Long>{
	Optional<Merchant> findByEmail(String email);
}
