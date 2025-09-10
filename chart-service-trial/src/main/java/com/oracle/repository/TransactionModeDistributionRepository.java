package com.oracle.repository;

import com.oracle.entity.TransactionModeDistribution;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface TransactionModeDistributionRepository extends JpaRepository<TransactionModeDistribution, Long> {
    List<TransactionModeDistribution> findByUsername(String username);
}