# PayEasy Merchant, Product & Transaction Service

## 📌 Overview

This microservice is part of the **PayEasy platform** and is responsible for:

* Managing **Merchants** (registration, login, CRUD).
* Managing **Products** (CRUD, linked to merchants).
* Handling **Transactions** (buying products, recording merchant & user transactions).

It runs independently on **port 8083** but is consumed through the **API Gateway (port 8085)**.

---

## 🚀 Features

* Merchant Registration & Login
* Merchant CRUD operations
* Product CRUD operations (per merchant)
* User product purchase with transaction recording
* Transaction history for **merchant** and **user**

---

## 🛠 Technology Stack

* **Java 17+**
* **Spring Boot 3.x**
* **Spring Data JPA**
* **Oracle 19c Database**
* **Maven**
* **Eclipse IDE / STS**

---

## ⚙️ Setup Instructions

### Prerequisites

* Oracle Database 19c running
* Java JDK 17+
* Port 8083 free for this service
* API Gateway running on 8085

### Configuration (`application.properties`)

```properties
spring.application.name=payeasy-mercprodserv
server.port=8083

spring.datasource.url=jdbc:oracle:thin:@localhost:1521:orcl
spring.datasource.username=payeasy
spring.datasource.password=payeasy

spring.jpa.hibernate.ddl-auto=create
spring.datasource.driver-class-name=oracle.jdbc.driver.OracleDriver
spring.jpa.properties.hibernate.dialect=org.hibernate.dialect.OracleDialect
```

---

## 🌐 API Documentation

### Base URL

All endpoints are available through the API Gateway:

```
http://localhost:8085/payeasy-merchprodserv/api
```

---

### 📍 Merchant Endpoints

#### 1. Register Merchant

**POST** `/merchants/register`

**Request Body**

```json
{
  "merchantName": "Some Trader",
  "contactNumber": "9876789543",
  "email": "contact@shopeasy.com",
  "password": "secret123"
}
```

**Response**

```json
{
    "merchantId": 1,
    "merchantName": "Some Trader",
    "contactNumber": "9876789543",
    "email": "contact@shopeasy.com",
    "password": "secret123",
    "createdAt": "2025-09-21T07:49:18.800+00:00"
}
```

---

#### 2. Login Merchant

**POST** `/merchants/login`

**Request Body**

```json
{
  "email": "contact@shopeasy.com",
  "password": "secret123"
}
```

**Success Response**

```json
{
    "merchantId": 1,
    "merchantName": "Some Trader",
    "email": "contact@shopeasy.com",
    "message": "Login successful"
}
```

**Failure Response**

```json
{
  "error": "Invalid credentials"
}
```

---

#### 3. Get All Merchants

**GET** `/merchants`

**Response**

```json
[
    {
        "merchantId": 1,
        "merchantName": "Some Trader",
        "contactNumber": "9876789543",
        "email": "contact@shopeasy.com",
        "password": "secret123",
        "createdAt": "2025-09-21T07:49:18.800+00:00"
    }
]
```

---

#### 4. Get Merchant by ID

**GET** `/merchants/{merchantId}`

**Response (Success)**

```json
{
    "merchantId": 1,
    "merchantName": "Some Trader",
    "contactNumber": "9876789543",
    "email": "contact@shopeasy.com",
    "password": "secret123",
    "createdAt": "2025-09-21T07:49:18.800+00:00"
}
```

**Response (Failure)**

```text
Merchant not found
```

---

#### 5. Update Merchant

**PUT** `/merchants/{merchantId}`

**Request Body**

```json
{
  "merchantName": "ShopEasy Updated",
  "contactNumber": "8976543256",
  "email": "support@shopeasy.com",
  "password": "something123"
}
```

**Response**

```json
{
    "merchantId": 1,
    "merchantName": "ShopEasy Updated",
    "contactNumber": "8976543256",
    "email": "support@shopeasy.com",
    "password": "something123",
    "createdAt": "2025-09-21T08:40:12.776+00:00"
}
```

---

#### 6. Delete Merchant

**DELETE** `/merchants/{merchantId}`

**Response**

```text
Merchant deleted successfully
```

---

### 📍 Product Endpoints

#### 1. Add Product

**POST** `/products`

**Request Body**

```json
{
  "merchantId": 1,
  "productName": "Wireless Headphones",
  "description": "Bluetooth over-ear headphones with noise cancellation",
  "price": 2999.99,
  "quantity": 10
}
```

**Response**

```json
{
    "productId": 1,
    "merchantId": 1,
    "productName": "Wireless Headphones",
    "description": "Bluetooth over-ear headphones with noise cancellation",
    "price": 2999.99,
    "quantity": 10,
    "createdAt": "2025-09-21T08:44:06.361+00:00"
}
```

---

#### 2. Get All Products

**GET** `/products`

**Response**

```json
[
    {
        "productId": 1,
        "merchantId": 1,
        "productName": "Wireless Headphones",
        "description": "Bluetooth over-ear headphones with noise cancellation",
        "price": 2999.99,
        "quantity": 10,
        "createdAt": "2025-09-21T08:44:06.361+00:00"
    }
]
```

---

#### 3. Get Products by Merchant

**GET** `/products/merchant/{merchantId}`

**Response**

```json
[
    {
        "productId": 1,
        "merchantId": 1,
        "productName": "Wireless Headphones",
        "description": "Bluetooth over-ear headphones with noise cancellation",
        "price": 2999.99,
        "quantity": 10,
        "createdAt": "2025-09-21T08:44:06.361+00:00"
    }
]
```

---

#### 4. Update Product

**PUT** `/products/{productId}`

**Request Body**

```json
{
  "productName": "Noise Cancelling Headphones",
  "description": "Updated description",
  "price": 2799.99,
  "quantity": 8
}
```

**Response**

```json
{
    "productId": 1,
    "merchantId": 1,
    "productName": "Noise Cancelling Headphones",
    "description": "Updated description",
    "price": 2799.99,
    "quantity": 8,
    "createdAt": "2025-09-21T08:44:06.361+00:00"
}
```

---

#### 5. Delete Product

**DELETE** `/products/{productId}`

**Response**

```text
Product deleted successfully
```

---

### 📍 Transaction Endpoints

#### 1. Buy Product

**POST** `/transactions/buy`

**Request Body**

```json
{
  "userId": 201,
  "userName": "John Doe",
  "userEmail": "john@example.com",
  "productId": 2,
  "quantity": 2
}
```

**Response (Success)**

```json
{
    "transactionId": 1,
    "userId": 201,
    "userName": "John Doe",
    "userEmail": "john@example.com",
    "merchantId": 1,
    "productId": 2,
    "quantityBought": 2,
    "totalAmount": 5999.98,
    "createdAt": "2025-09-21T08:49:04.725+00:00"
}
```

**Response (Failure)**

```text
Product not found
```

---

#### 2. Get Transactions by Merchant

**GET** `/transactions/merchant/{merchantId}`

**Response**

```json
[
    {
        "transactionId": 1,
        "userId": 201,
        "userName": "John Doe",
        "userEmail": "john@example.com",
        "merchantId": 1,
        "productId": 2,
        "quantityBought": 2,
        "totalAmount": 5999.98,
        "createdAt": "2025-09-21T08:49:04.725+00:00"
    },
    {
        "transactionId": 2,
        "userId": 201,
        "userName": "John Doe",
        "userEmail": "john@example.com",
        "merchantId": 1,
        "productId": 2,
        "quantityBought": 2,
        "totalAmount": 5999.98,
        "createdAt": "2025-09-21T08:49:52.821+00:00"
    }
]
```

---

#### 3. Get Transactions by User

**GET** `/transactions/user/{userId}`
Example: `payeasy-mercprodserv/api/transactions/user/201`
**Response**

```json
[
    {
        "transactionId": 1,
        "userId": 201,
        "userName": "John Doe",
        "userEmail": "john@example.com",
        "merchantId": 1,
        "productId": 2,
        "quantityBought": 2,
        "totalAmount": 5999.98,
        "createdAt": "2025-09-21T08:49:04.725+00:00"
    },
    {
        "transactionId": 2,
        "userId": 201,
        "userName": "John Doe",
        "userEmail": "john@example.com",
        "merchantId": 1,
        "productId": 2,
        "quantityBought": 2,
        "totalAmount": 5999.98,
        "createdAt": "2025-09-21T08:49:52.821+00:00"
    }
]
```

---

## 🧪 Testing

* Use **Postman / cURL** with the API Gateway base URL.
* Verify Oracle DB is running with correct schema.
* Check logs in case of errors (Spring Boot auto logs stack traces).

---
