package com.oracle.controller;

import com.oracle.entity.SpendingTrend;
import com.oracle.service.SpendingTrendService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/spending-trend")
public class SpendingTrendController {

    private final SpendingTrendService service;

    public SpendingTrendController(SpendingTrendService service) {
        this.service = service;
    }

    // GET /api/spending-trend/{username}
    @GetMapping("/{username}")
    public List<SpendingTrend> getUserSpendingTrend(@PathVariable String username) {
        return service.getDataForUser(username);
    }

    // POST /api/spending-trend
    @PostMapping
    public SpendingTrend addSpendingTrend(@RequestBody SpendingTrend data) {
        return service.saveData(data);
    }
    @PostMapping("/bulk")
    public List<SpendingTrend> addSpendingTrends(@RequestBody List<SpendingTrend> dataList) {
        return dataList.stream().map(service::saveData).toList();
    }
    // (Optional) GET /api/spending-trend
    @GetMapping
    public List<SpendingTrend> getAllSpendingTrends() {
        return service.getAll();
    }
}