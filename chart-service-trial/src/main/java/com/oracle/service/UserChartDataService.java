package com.oracle.service;

import com.oracle.entity.UserChartData;
import com.oracle.repository.UserChartDataRepository;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class UserChartDataService {
    private final UserChartDataRepository repository;

    public UserChartDataService(UserChartDataRepository repository) {
        this.repository = repository;
    }

    public List<UserChartData> getDataForUser(String username) {
        return repository.findByUsername(username);
    }

    public UserChartData saveData(UserChartData data) {
        return repository.save(data);
    }

    public List<UserChartData> getAll() {
        return repository.findAll();
    }
}