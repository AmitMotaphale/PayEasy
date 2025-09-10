package com.oracle.repository;

import com.oracle.entity.SpendingTrend;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface SpendingTrendRepository extends JpaRepository<SpendingTrend, Long> {
    List<SpendingTrend> findByUsername(String username);
}