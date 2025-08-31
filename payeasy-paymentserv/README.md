```markdown
# PayEasy Payment Service

## Overview
The Payment Service is a Spring Boot microservice managing user wallets and transactions within the PayEasy platform. It handles wallet creation, balance updates, and transaction tracking, enabling users to securely manage their funds.

## Features
- Create wallets for users with initial zero balance
- Add or deduct funds from wallets with balance validation
- Log all wallet and bank transactions
- Retrieve transactions by wallet or by user

## Technology Stack
- Java 17+
- Spring Boot 3.x
- Spring Data JPA with Oracle 19c
- RESTful API design
- Maven for dependency management

## Setup Instructions

### Prerequisites
- Oracle Database 19c installed and running
- Java JDK 17 or above
- Eclipse IDE with Spring Boot support
- Port 8080 available for the service {WIll change it to something else}

### Installation

1. Clone the repository:
   ```
   git clone <your-payment-service-repo-url>
   cd payment-service
   ```

2. Configure Oracle connection in `src/main/resources/application.properties`:
   ```
   spring.datasource.url=jdbc:oracle:thin:@localhost:1521:orcl
   spring.datasource.username=payeasy
   spring.datasource.password=payeasy
   spring.jpa.hibernate.ddl-auto=create
   spring.datasource.driver-class-name=oracle.jdbc.driver.OracleDriver
spring.jpa.properties.hibernate.dialect = org.hibernate.dialect.OracleDialect
   ```

3. Import the Maven project into Eclipse as a Maven project.

4. Run the microservice using Eclipse’s Spring Boot run configuration:
   - Right-click project → Run As → Spring Boot App

---

## Database Tables

### WALLETS Table
- `wallet_id` (PK, auto-generated)
- `user_id` (foreign key to USERS)
- `balance` (decimal, current wallet balance)
- `last_updated` (timestamp)

### TRANSACTIONS Table
- `txn_id` (PK, auto-generated)
- `user_id` (foreign key)
- `wallet_id` (foreign key)
- `bank_id` (foreign key, nullable)
- `merchant_id` (foreign key, nullable)
- `txn_type` (string)
- `amount` (decimal)
- `status` (string, e.g. SUCCESS, FAILED)
- `description` (string)
- `created_at` (timestamp)

---

## API Documentation

### Base URL
`http://localhost:8080/api`

### Wallet Endpoints

| Method | Endpoint                    | Description                  |
| ------ | ---------------------------| ----------------------------|
| POST   | `/wallets/create/{userId}`  | Create a wallet for user     |
| GET    | `/wallets/user/{userId}`    | Get wallet details by user   |
| PUT    | `/wallets/user/{userId}/add?amount={amount}`    | Add funds to wallet          |
| PUT    | `/wallets/user/{userId}/deduct?amount={amount}` | Deduct funds from wallet     |

### Transaction Endpoints

| Method | Endpoint                     | Description                   |
| ------ | ----------------------------| -----------------------------|
| POST   | `/transactions`              | Create a new transaction      |
| GET    | `/transactions/wallet/{walletId}` | List transactions for wallet  |
| GET    | `/transactions/user/{userId}`| List transactions for user    |

---

## Sample Requests

### Create Wallet
```
POST http://localhost:8080/api/wallets/create/1
```

### Add Funds
```
PUT http://localhost:8080/api/wallets/user/1/add?amount=500.0
```

### Create Transaction
```
POST http://localhost:8080/api/transactions
Content-Type: application/json

{
  "userId": 1,
  "walletId": 1,
  "bankId": 2,
  "merchantId": null,
  "txnType": "WALLET_TOPUP",
  "amount": 500.0,
  "status": "SUCCESS",
  "description": "Wallet top-up from bank"
}
```

---

## Testing

Use Postman or any REST client to test and interact with the APIs as per the endpoints above.

---

## Future Enhancements

- Integrate with Bank Account Service for real-time bank-to-wallet transfers
- Add transaction rollback and error handling mechanisms
- Implement wallet transaction limits and alerts
- Support for refunds and merchant payments

---