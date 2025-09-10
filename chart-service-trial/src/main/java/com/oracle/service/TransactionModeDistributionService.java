package com.oracle.service;

import com.oracle.entity.TransactionModeDistribution;
import com.oracle.repository.TransactionModeDistributionRepository;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class TransactionModeDistributionService {

    private final TransactionModeDistributionRepository repository;

    public TransactionModeDistributionService(TransactionModeDistributionRepository repository) {
        this.repository = repository;
    }

    public List<TransactionModeDistribution> getModesForUser(String username) {
        return repository.findByUsername(username);
    }

    public TransactionModeDistribution saveMode(TransactionModeDistribution data) {
        return repository.save(data);
    }
}