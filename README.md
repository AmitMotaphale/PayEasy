# 📊 Analytics Microservice – API Endpoints

This document lists all REST endpoints for the three analytics modules.

---

## 1. User Chart Data

Category-wise spending data (bar charts).

### ➕ Insert Single Record
POST /api/charts/user  
Body:
{
  "username": "aks",
  "category": "Marketing",
  "value": 100.0
}

### ➕ Bulk Insert
POST /api/charts/user/bulk  
Body:
[
  { "username": "aks", "category": "Sales", "value": 120.5 },
  { "username": "chathur", "category": "Support", "value": 99.9 }
]

### 📥 Fetch User Data
GET /api/charts/{username}  
Response:
[
  { "id": 1, "username": "aks", "category": "Sales", "value": 120.5 }
]

---

## 2. Spending Trend

Quarterly or periodic spending trend (line/area charts).

### ➕ Insert Single Record
POST /api/spending-trend  
Body:
{
  "username": "aks",
  "series": "Card",
  "quarter": "Q1",
  "value": 210.0
}

### ➕ Bulk Insert
POST /api/spending-trend/bulk  
Body:
[
  { "username": "aks", "series": "Card", "quarter": "Q1", "value": 210.0 },
  { "username": "aks", "series": "Card", "quarter": "Q2", "value": 180.0 }
]

### 📥 Fetch User Data
GET /api/spending-trend/{username}  
Response:
[
  { "id": 1, "username": "aks", "series": "Card", "quarter": "Q1", "value": 210.0 }
]

---

## 3. Transaction Mode Distribution

Distribution of spending by mode (pie/donut charts).

### ➕ Insert Single Record
POST /api/transaction-modes  
Body:
{
  "username": "aks",
  "payment_mode": "UPI",
  "txnValue": 1200.0
}

### ➕ Bulk Insert
POST /api/transaction-modes/bulk  
Body:
[
  { "username": "aks", "payment_mode": "Debit Card", "txnValue": 500.0 },
  { "username": "chathur", "payment_mode": "Wallet", "txnValue": 120.0 }
]

### 📥 Fetch User Data
GET /api/transaction-modes/{username}  
Response:
[
  { "id": 1, "username": "aks", "payment_mode": "UPI", "txnValue": 1200.0 }
]
