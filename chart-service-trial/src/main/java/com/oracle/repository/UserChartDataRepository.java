package com.oracle.repository;

import com.oracle.entity.UserChartData;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface UserChartDataRepository extends JpaRepository<UserChartData, Long> {
    // Custom query to fetch data by username
    List<UserChartData> findByUsername(String username);
}