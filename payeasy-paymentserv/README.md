# PayEasy Payment Service

## Overview
The PayEasy Payment Service is a Spring Boot microservice designed to manage user wallets and track all associated transactions within the PayEasy platform. It enables creating wallets for users, adding or deducting funds with balance validations, and maintaining a detailed transaction history for auditing and reconciliation purposes.

## Key Features
- Create wallets per user with zero initial balance.
- Add funds to wallets validating input amounts.
- Deduct funds from wallets ensuring sufficient balance.
- Record all wallet-related transactions with status and descriptions.
- Retrieve transaction records filtered by wallet ID or user ID.
- Enforce input validations on transaction parameters (amount positivity, status constraints).
- Clean separation between wallet operations and transaction logging.
- RESTful API endpoints for integration with frontends or other microservices.

## Technology Stack
- Java 17+
- Spring Boot 3.x with Spring Data JPA and Jakarta Validation
- Oracle Database 19c
- Maven for project build and dependencies
- Spring Tool Suite (STS) for development environment

## Prerequisites
- Oracle Database 19c up and running with schema permissions.
- Java JDK 17 or above installed.
- Spring Tool Suite installed and configured.
- Available port (default 8080) for running the service.

## Setup Instructions

### Clone Repository
```bash
git clone https://github.com/Kr1sh-gupta/PayEasy/tree/backend/payeasy-paymentserv
cd payeasy-paymentserv
```

## API Gateway Integration

The PayEasy Payment Service is configured to operate behind the API Gateway which routes requests to the service using the context path `/payeasy-paymentserv`. The gateway URL for accessing this service is:

```
http://localhost:8085/payeasy-paymentserv/
```

All service endpoints should be prefixed by this gateway URL. For example, to create a wallet for a user:

```
POST http://localhost:8085/payeasy-paymentserv/api/wallets/create/{userId}
```

### Service Configuration

The service itself runs internally on port **8084**, configured via:

```properties
spring.application.name=payeasy-paymentserv
server.port=8084
spring.datasource.url=jdbc:oracle:thin:@localhost:1521:orcl
spring.datasource.username=payeasy
spring.datasource.password=payeasy
spring.jpa.hibernate.ddl-auto=create
spring.datasource.driver-class-name=oracle.jdbc.driver.OracleDriver
spring.jpa.properties.hibernate.dialect=org.hibernate.dialect.OracleDialect
spring.jpa.properties.hibernate.show_sql=true
spring.jpa.properties.hibernate.format_sql=false
```

The API Gateway forwards incoming requests on port 8085 to this service running on port 8084 using service discovery with the name `payeasy-paymentserv`.

***

### Import Project in STS
- Open Spring Tool Suite
- Import as Maven project (`File > Import > Maven > Existing Maven Projects`)
- Point to the cloned project folder
- Wait for dependency resolution

### Run the Microservice
- Right-click the project
- Select `Run As > Spring Boot App`
- The service will start on the configured port (default 8080)

***

## Database Schema Overview

### Table: WALLETS
| Column       | Type      | Constraints                | Description                     |
|--------------|-----------|----------------------------|--------------------------------|
| wallet_id    | NUMBER    | Primary Key, Auto-generated| Unique wallet identifier        |
| user_id      | NUMBER    | Not Null                   | User linked to this wallet      |
| balance      | DOUBLE    | Not Null                   | Current balance in the wallet   |
| last_updated | TIMESTAMP |                            | Timestamp of last balance update|
| created_at   | TIMESTAMP | Not Null                   | Timestamp of wallet creation    |

### Table: TRANSACTIONS
| Column       | Type       | Constraints                         | Description                                    |
|--------------|------------|------------------------------------|-----------------------------------------------|
| txn_id       | NUMBER     | Primary Key, Auto-generated         | Unique transaction identifier                  |
| user_id      | NUMBER     | Not Null                          | User who made this transaction                  |
| wallet_id    | NUMBER     | Not Null                          | Wallet associated with transaction             |
| bank_id      | NUMBER     | Nullable                         | Bank involved in transaction (if any)          |
| merchant_id  | NUMBER     | Nullable                         | Merchant involved (if payment)                  |
| txn_type     | VARCHAR(20)| Not Null, length 3-20              | Transaction type, e.g., CREDIT, DEBIT           |
| amount       | DOUBLE     | Not Null, positive                 | Transaction amount                              |
| status       | VARCHAR(20)| Not Null, enum: PENDING,SUCCESS,FAILED,CANCELLED | Current status of transaction                    |
| description  | VARCHAR(255)| Nullable                        | Additional notes                                |
| created_at   | TIMESTAMP  | Not Null                         | Transaction creation timestamp                   |

***

## API Endpoints

### Wallet APIs

| HTTP Method | Endpoint                              | Request Body           | Description                          |
|-------------|-------------------------------------|-----------------------|------------------------------------|
| POST        | `/api/wallets/create/{userId}`      | None                  | Create new wallet for user          |
| GET         | `/api/wallets/user/{userId}`        | None                  | Retrieve wallet details for user    |
| POST        | `/api/wallets/user/{userId}/add`    | WalletRequest (JSON)   | Add funds to user’s wallet          |
| POST        | `/api/wallets/user/{userId}/deduct` | WalletRequest (JSON)   | Deduct funds from user’s wallet     |

### Transaction APIs

| HTTP Method | Endpoint                             | Request Body           | Description                        |
|-------------|------------------------------------|-----------------------|----------------------------------|
| POST        | `/api/transactions`                 | Transaction (JSON)     | Create a new transaction          |
| GET         | `/api/transactions/wallet/{walletId}` | None                  | Get transactions by wallet ID     |
| GET         | `/api/transactions/user/{userId}` | None                  | Get transactions by user ID       |

***

Here is your updated README section "Sample Payloads" replaced with actual API request bodies and example responses for clarity:

***

## Sample Payloads with Example Requests and Responses

### Wallet Creation

**Request:**  
```
POST http://localhost:8085/payeasy-paymentserv/api/wallets/create/1
```
_No request body needed_

**Response:**  
```json
{
  "walletId": 101,
  "userId": 1,
  "balance": 0.0,
  "lastUpdated": null,
  "createdAt": "2025-09-21T09:15:30.000+00:00"
}
```

***

### Add Funds to Wallet

**Request:**  
```
POST http://localhost:8085/payeasy-paymentserv/api/wallets/user/1/add
Content-Type: application/json
```
```json
{
  "amount": 100.0,
  "bankId": 1,
  "merchantId": null,
  "description": "Adding funds to wallet"
}
```

**Response:**  
```json
{
    "wallet": {
        "walletId": 1,
        "userId": 1,
        "balance": 100.0,
        "lastUpdated": "2025-09-21T09:22:34.037+00:00",
        "createdAt": "2025-09-21T09:11:41.927+00:00"
    },
    "transaction": {
        "txnId": 1,
        "userId": 1,
        "walletId": 1,
        "bankId": 1,
        "merchantId": null,
        "txnType": "CREDIT",
        "amount": 100.0,
        "status": "SUCCESS",
        "description": "Adding funds to wallet",
        "createdAt": "2025-09-21T09:22:34.048+00:00"
    }
}
```

***

### Deduct Funds from Wallet

**Request:**  
```
POST http://localhost:8085/payeasy-paymentserv/api/wallets/user/1/deduct
Content-Type: application/json
```
```json
{
  "amount": 50.0,
  "bankId": 1,
  "merchantId": 10,
  "description": "Payment for order #1234"
}
```

**Response:**  
```json
{
    "wallet": {
        "walletId": 1,
        "userId": 1,
        "balance": 50.0,
        "lastUpdated": "2025-09-21T09:23:32.784+00:00",
        "createdAt": "2025-09-21T09:11:41.927+00:00"
    },
    "transaction": {
        "txnId": 2,
        "userId": 1,
        "walletId": 1,
        "bankId": 1,
        "merchantId": 10,
        "txnType": "DEBIT",
        "amount": 50.0,
        "status": "SUCCESS",
        "description": "Payment for order #1234",
        "createdAt": "2025-09-21T09:23:32.812+00:00"
    }
}
```

***

### Create a Transaction (Direct)

**Request:**  
```
POST http://localhost:8085/payeasy-paymentserv/api/transactions
Content-Type: application/json
```
```json
{
  "userId": 1,
  "walletId": 101,
  "bankId": 2,
  "merchantId": null,
  "txnType": "WALLET_TOPUP",
  "amount": 200.0,
  "status": "SUCCESS",
  "description": "Wallet top-up from bank"
}
```

**Response:**  
```json
{
    "txnId": 3,
    "userId": 1,
    "walletId": 101,
    "bankId": 2,
    "merchantId": null,
    "txnType": "WALLET_TOPUP",
    "amount": 200.0,
    "status": "SUCCESS",
    "description": "Wallet top-up from bank",
    "createdAt": "2025-09-21T09:24:26.404+00:00"
}
```
### Get Transaction by WalletID (Direct)

**Request:**  
```
GET http://localhost:8085/payeasy-paymentserv/api/transactions/wallet/1
```

**Response:**  
```json
[
    {
        "txnId": 1,
        "userId": 1,
        "walletId": 1,
        "bankId": 1,
        "merchantId": null,
        "txnType": "CREDIT",
        "amount": 100.0,
        "status": "SUCCESS",
        "description": "Adding funds to wallet",
        "createdAt": "2025-09-21T09:22:34.048+00:00"
    },
    {
        "txnId": 2,
        "userId": 1,
        "walletId": 1,
        "bankId": 1,
        "merchantId": 10,
        "txnType": "DEBIT",
        "amount": 50.0,
        "status": "SUCCESS",
        "description": "Payment for order #1234",
        "createdAt": "2025-09-21T09:23:32.812+00:00"
    }
]
```

## Error Handling
- Returns HTTP 400 with relevant messages for:
  - Wallet not found
  - Insufficient balance on deduction
  - Validation errors on input fields

***

## Testing
- Use Postman or similar REST clients.
- Test wallet creation, balance modification, and transaction queries.
- Validate error responses by submitting invalid data or operations exceeding balance.

***

## Future Improvements
- Add transaction rollback with distributed transaction support (Saga pattern).
- Integrate with external Bank Account microservice for automated fund transfers.
- Add notification mechanism for wallet changes.
- Implement transaction filtering with pagination and sorting.
- Add caching for wallet balance queries to improve performance.

***
