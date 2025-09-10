package com.oracle.service;

import com.oracle.entity.SpendingTrend;
import com.oracle.repository.SpendingTrendRepository;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class SpendingTrendService {
    private final SpendingTrendRepository repository;

    public SpendingTrendService(SpendingTrendRepository repository) {
        this.repository = repository;
    }

    public List<SpendingTrend> getDataForUser(String username) {
        return repository.findByUsername(username);
    }

    public SpendingTrend saveData(SpendingTrend data) {
        return repository.save(data);
    }

    public List<SpendingTrend> getAll() {
        return repository.findAll();
    }
}