package com.oracle.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "user_chart_data")
public class UserChartData {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String username;
    private String category;
    private Double value;

    // Getters & Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getUsername() { return username; }
    public void setUsername(String username) { this.username = username; }

    public String getCategory() { return category; }
    public void setCategory(String category) { this.category = category; }

    public Double getValue() { return value; }
    public void setValue(Double value) { this.value = value; }
}