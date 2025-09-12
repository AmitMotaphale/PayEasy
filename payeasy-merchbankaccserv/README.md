```markdown
# PayEasy Bank Account Service

## Overview
The Bank Account Service is a Spring Boot microservice that manages user bank accounts within the PayEasy ecosystem. It allows users to link, update, retrieve, and manage multiple bank accounts, including marking a primary bank account.

## Features
- Add new bank accounts for users
- Retrieve bank accounts by user or by ID
- Update bank account details
- Delete bank accounts
- Set a primary bank account per user

## Technology Stack
- Java 17+
- Spring Boot 3.x
- Spring Data JPA with Oracle 19c
- RESTful APIs
- Maven for dependency management

## Setup Instructions

### Prerequisites
- Oracle Database 19c installed and running
- Java JDK 17 or above
- Eclipse IDE with Spring Boot support
- Port 8080 available

### Configuration

Ensure your `src/main/resources/application.properties` has the following:

```
spring.datasource.url=jdbc:oracle:thin:@localhost:1521:orcl
spring.datasource.username=payeasy
spring.datasource.password=payeasy
spring.jpa.hibernate.ddl-auto=create
spring.datasource.driver-class-name=oracle.jdbc.driver.OracleDriver
spring.jpa.properties.hibernate.dialect=org.hibernate.dialect.OracleDialect
spring.jpa.properties.hibernate.show_sql=true
spring.jpa.properties.hibernate.format_sql=false
```

> Note: `spring.jpa.hibernate.ddl-auto=create` will create database tables at startup. Change to `update` or `none` for production.

---

## API Documentation

### Base URL
`http://localhost:8080/api/bankaccounts`

### Endpoints and Requests

| Method | Endpoint                                      | Description                          | Request Body (if applicable)                       |
| ------ | ---------------------------------------------| ---------------------------------- | ------------------------------------------------- |
| POST   | `/`                                          | Add a new bank account              | JSON with bank account details (see sample below) |
| GET    | `/user/{userId}`                             | Retrieve all bank accounts for user | None                                              |
| GET    | `/{bankId}`                                  | Get bank account details by ID     | None                                              |
| PUT    | `/{bankId}`                                  | Update bank account details        | JSON with updated bank account fields             |
| DELETE | `/{bankId}`                                  | Delete a bank account               | None                                              |
| PUT    | `/user/{userId}/primary/{bankId}`            | Set primary bank account for user  | None                                              |

---

## Sample Requests

### Add Bank Account

```
POST http://localhost:8080/api/bankaccounts
Content-Type: application/json

{
  "userId": 1,
  "bankName": "State Bank of India",
  "accountNumber": "SBIN0001234",
  "ifscCode": "SBIN0001234",
  "upiId": "user@upi",
  "isPrimary": false
}
```

---

### Get All Bank Accounts for User

```
GET http://localhost:8080/api/bankaccounts/user/1
```

---

### Get Bank Account by ID

```
GET http://localhost:8080/api/bankaccounts/1
```

---

### Update Bank Account

```
PUT http://localhost:8080/api/bankaccounts/1
Content-Type: application/json

{
  "bankName": "State Bank of India",
  "accountNumber": "SBIN0001234",
  "ifscCode": "SBIN0001234",
  "upiId": "newupi@upi",
  "isPrimary": true
}
```

---

### Delete Bank Account

```
DELETE http://localhost:8080/api/bankaccounts/1
```

---

### Change Primary Bank Account for User

```
PUT http://localhost:8080/api/bankaccounts/user/1/primary/2
```

---

## Testing

Use Postman or any REST client to test the API endpoints as detailed above. Make sure Oracle DB is running and your application properties are correctly configured.

---

## Future Enhancements

- Add security and authentication mechanisms
- Integrate with bank APIs for verification and transaction initiation
- Enable notifications for bank account events
- Support multiple UPI IDs and payment methods per account

---
