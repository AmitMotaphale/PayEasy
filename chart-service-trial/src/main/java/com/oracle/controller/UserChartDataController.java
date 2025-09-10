package com.oracle.controller;

import com.oracle.entity.UserChartData;
import com.oracle.service.UserChartDataService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/charts")
public class UserChartDataController {

    private final UserChartDataService service;

    public UserChartDataController(UserChartDataService service) {
        this.service = service;
    }

    // GET /api/charts/{username}  -- user-specific data
    @GetMapping("/{username}")
    public List<UserChartData> getUserCharts(@PathVariable String username) {
        return service.getDataForUser(username);
    }

    // (Optional) POST /api/charts/user  -- add entry for a user
    @PostMapping("/user")
    public UserChartData addUserChartData(@RequestBody UserChartData data) {
        return service.saveData(data);
    }

    // (Optional) GET /api/charts/user  -- get all user chart data
    @GetMapping("/user")
    public List<UserChartData> getAllUserCharts() {
        return service.getAll();
    }
}