# PayEasy Merchant Bank Account Service

## Overview
The Merchant Bank Account Service is a Spring Boot microservice that manages merchants bank accounts within the PayEasy ecosystem. It allows merchants to link, update, retrieve, and manage multiple bank accounts, including marking a primary bank account.

## Features
- Add new bank accounts for merchants
- Retrieve bank accounts by merchants or by ID
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
- Spring Tool Suite IDE with Spring Boot support
- Port 8087 available

### Configuration

Ensure your `src/main/resources/application.properties` has the following:

```
spring.application.name=payeasy-merchbankaccserv
server.port=8087
#add 8087 for Merchant bank
spring.datasource.url=jdbc:oracle:thin:@localhost:1521:orcl
spring.datasource.username=payeasy
spring.datasource.password=payeasy
 #create,create-drop,update, none
spring.jpa.hibernate.ddl-auto=create
spring.datasource.driver-class-name=oracle.jdbc.driver.OracleDriver
spring.jpa.properties.hibernate.dialect = org.hibernate.dialect.OracleDialect
spring.jpa.properties.hibernate.show_sql=true
spring.jpa.properties.hibernate.format_sql=false
```

> Note: `spring.jpa.hibernate.ddl-auto=create` will create database tables at startup. Change to `update` or `none` for production.

---

## API Documentation

### Base URL (via API Gateway)
`http://localhost:8085/payeasy-merchbankaccserv/api/merchbankaccounts`

### Endpoints and Requests

| Method | Endpoint                                      | Description                          | Request Body (if applicable)                       |
| ------ | ---------------------------------------------| ---------------------------------- | ------------------------------------------------- |
| POST   | `/`                                          | Add a new bank account              | JSON with bank account details (see sample below) |
| GET    | `/merchant/{merchId}`                        | Retrieve all bank accounts for merchant | None                                         |
| GET    | `/{bankId}`                                  | Get bank account details by ID     | None                                              |
| PUT    | `/{bankId}`                                  | Update bank account details        | JSON with updated bank account fields             |
| DELETE | `/{bankId}`                                  | Delete a bank account               | None                                              |
| PUT    | `/merchant/{merchId}/primary/{bankId}`       | Set primary bank account for user  | None                                              |

---

## Sample Requests

### Add Bank Account

```
POST http://localhost:8085/payeasy-merchbankaccserv/api/merchbankaccounts
Content-Type: application/json

{
  "merchId": 1, //Local Storage will extract
  "bankName": "State Bank of India",
  "accountNumber": "SBIN0001234",
  "ifscCode": "SBIN0001234",
  "isPrimary": false
}
```

### Get All Bank Accounts for User

```
GET http://localhost:8085/payeasy-merchbankaccserv/api/merchbankaccounts/merchant/1

```
Response: 
```
   {
        "bankId": 1,
        "merchId": 1,
        "bankName": "State Bank of India",
        "accountNumber": "SBIN0001234",
        "ifscCode": "SBIN0001234",
        "isPrimary": false,
        "createdAt": "2025-09-21T04:14:54.498+00:00"
    }
```


### Get Bank Account by Bank ID

```
GET http://localhost:8085/payeasy-merchbankaccserv/api/merchbankaccounts/1
```
Response
```
{
    "bankId": 1,
    "merchId": 1,
    "bankName": "State Bank of India",
    "accountNumber": "SBIN0001234",
    "ifscCode": "SBIN0001234",
    "isPrimary": false,
    "createdAt": "2025-09-21T04:14:54.498+00:00"
}
```

### Update Bank Account

```
PUT http://localhost:8085/payeasy-merchbankaccserv/api/merchbankaccounts/1
Content-Type: application/json

```
Body: 
```
{
  "bankName": "State Bank of India",
  "accountNumber": "SBIN0001234",
  "ifscCode": "SBIN0001234",
  "isPrimary": true
}
```

---

### Delete Bank Account

```
DELETE http://localhost:8085/payeasy-merchbankaccserv/api/merchbankaccounts/1
```
Response:
  ```
    Bank account deleted successfully
  ```

### Set Primary Bank Account for Merchant

```
PUT http://localhost:8085/payeasy-merchbankaccserv/api/merchbankaccounts/merchant/1/primary/2
```
Response: 
```
Primary bank account updated successfully
```

## Testing

Use Postman or any REST client to test the API endpoints as detailed above. Make sure Oracle DB is running and your application properties are correctly configured.

---

## Future Enhancements

- Add security and authentication mechanisms
- Integrate with bank APIs for verification and transaction initiation
- Enable notifications for bank account events
- Support multiple UPI IDs and payment methods per account

---
