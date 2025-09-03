Here’s a comprehensive root `README.md` for your PayEasy Spring Boot microservices architecture. This covers port details, endpoints, dependencies, discovery setup, and cross-links to service documentation:

```markdown
# PayEasy Microservices Architecture

## Overview

PayEasy is a distributed fintech platform built on Spring Boot microservices. Each domain concern (users, payments, bills, merchants, etc.) is handled by an isolated microservice, with centralized service discovery and API gateway routing provided by Eureka and Spring Cloud Gateway.

---

## Microservice Port Map

| Service                     | Port   | Description                             | ReadMe Link               |
|-----------------------------|--------|-----------------------------------------|---------------------------|
| User Service                | 8080   | User registration, authentication, profile | [User Service](./user-service/README.md) |
| Bank Account Service        | 8081   | Link/manage bank accounts for users     | [Bank Account Service](./bank-account-service/README.md) |
| Bill Service                | 8082   | Manage bills and billers                | [Bill Service](./bill-service/README.md) |
| Merchant/Product Service    | 8083   | Merchant onboarding, product catalog    | [Merchant/Product Service](./merchant-product-service/README.md) |
| Payment Service             | 8084   | Payment initiation and tracking         | [Payment Service](./payment-service/README.md) |
| API Gateway                 | 8085   | Routes HTTP requests to microservices   | [API Gateway](./api-gateway/README.md) |
| Eureka Discovery Server     | 8761   | Service registry for dynamic discovery  | [Eureka Server](./eureka-server/README.md) |

---

## Service Discovery and Gateway

- **Eureka Server** (port 8761) provides dynamic registration/discovery of all PayEasy services.
- **API Gateway** (port 8085) is the single entry-point for clients; routes requests using Eureka service registry.
- All microservices are enabled as Eureka clients and registered automatically at startup.


### Eureka application.properties
spring.application.name=payeasy-eureka-server
server.port=8761
spring.config.import=optional:configserver:
spring.cloud.config.import-check.enabled=false


### Eureka Client Configuration (in all microservices):

```
spring.application.name=your-service-name
server.port=your-service-port
```

### API Gateway Dependency:

```
<dependency>
    <groupId>org.springframework.cloud</groupId>
    <artifactId>spring-cloud-starter-gateway</artifactId>
</dependency>
```

### API Gateway application.properties
```
spring.application.name=payeasy-api-gateway
server.port=8085
spring.cloud.gateway.discovery.locator.enabled=true
spring.cloud.gateway.discovery.locator.lower-case-service-id=true
```

### API Gateway Routing

Requests to services are routed via gateway:

Example:
```
http://localhost:8085/payeasy-userserv/api/users/register
```
is forwarded to User Service’s `/api/users/register` endpoint.

---

## Endpoints Overview

### User Service

- `POST /api/users/register` – Register new user
- `POST /api/users/login` – User login
- `PUT /api/users/profile/{userId}` – Update user profile

### Bank Account Service

- `POST /api/bankaccounts` – Add bank account
- `GET /api/bankaccounts/user/{userId}` – List accounts for user
- `PUT /api/bankaccounts/{bankId}` – Update bank account

### Bill Service

- `POST /api/bills` – Add new bill
- `GET /api/bills/user/{userId}` – Get bills for user
- `PUT /api/bills/{billId}` – Update bill

### Merchant/Product Service

- `POST /api/merchants` – Register merchant
- `GET /api/merchants` – List merchants
- `PUT /api/merchants/{merchantId}` – Update merchant
- `POST /api/products` – Add product
- `GET /api/products/merchant/{merchantId}` – List products for merchant
- `PUT /api/products/{productId}` – Update product

### Payment Service

- `POST /api/payments` – Initiate payment
- `GET /api/payments/user/{userId}` – Payment history for user

---
## Service Documentation Links

See individual service READMEs for full API details, request/response examples, and configuration:
- [User Service](./payeasy-userserv/README.md)
- [Notification Service](./payeasy-notificationserv/README.md)
- [Bank Account Service](./payeasy-bankaccserv/README.md)
- [Bill Service](./payeasy-billserv/README.md)
- [Merchant/Product Service](./payeasy-merchprodserv/README.md)
- [Payment Service](./payeasy-paymentserv/README.md)
- [API Gateway](./payeasy-api-gateway/README.md)
- [Eureka Server](./payeasy-eureka-server/README.md)

---
## Additional Setup

- All microservices should include:
    - Eureka client dependency in `pom.xml`:
      ```
      <dependencyManagement>
            <dependencies>
                <dependency>
                    <groupId>org.springframework.cloud</groupId>
                    <artifactId>spring-cloud-dependencies</artifactId>
                    <version>${spring-cloud.version}</version>
                    <type>pom</type>
                    <scope>import</scope>
                </dependency>
            </dependencies>
      </dependencyManagement>
      ```
      ```
      <dependency>
        <groupId>org.springframework.cloud</groupId>
        <artifactId>spring-cloud-starter-netflix-eureka-client</artifactId>
      </dependency>
      
      ```    
      ```
        <spring-cloud.version>2025.0.0</spring-cloud.version>
      
      ```    
    - `@EnableDiscoveryClient` on the main Spring Boot class.

- Start Eureka (`8761`) and API Gateway (`8085`) first, then the rest of the services in any order.

---
