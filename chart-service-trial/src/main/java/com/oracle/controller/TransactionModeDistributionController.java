package com.oracle.controller;

import com.oracle.entity.TransactionModeDistribution;
import com.oracle.service.TransactionModeDistributionService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/transaction-modes")
public class TransactionModeDistributionController {

    private final TransactionModeDistributionService service;

    public TransactionModeDistributionController(TransactionModeDistributionService service) {
        this.service = service;
    }

    // GET /api/transaction-modes/{username}
    @GetMapping("/{username}")
    public List<TransactionModeDistribution> getModesForUser(@PathVariable String username) {
        return service.getModesForUser(username);
    }
 // Bulk insert: POST /api/transaction-modes/bulk
    @PostMapping("/bulk")
    public List<TransactionModeDistribution> addBulkModes(@RequestBody List<TransactionModeDistribution> dataList) {
        return dataList.stream().map(service::saveMode).toList();
    }
    // If you are using Java 8, use: .collect(Collectors.toList())

    // POST /api/transaction-modes
    @PostMapping
    public TransactionModeDistribution addMode(@RequestBody TransactionModeDistribution data) {
        return service.saveMode(data);
    }
}