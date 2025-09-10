package com.oracle.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "spending_trend")
public class SpendingTrend {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String username;
    private String series;
    private String quarter; // you can use 'month' instead for months
    private Double value;

    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getUsername() { return username; }
    public void setUsername(String username) { this.username = username; }

    public String getSeries() { return series; }
    public void setSeries(String series) { this.series = series; }

    public String getQuarter() { return quarter; }
    public void setQuarter(String quarter) { this.quarter = quarter; }

    public Double getValue() { return value; }
    public void setValue(Double value) { this.value = value; }
}