```markdown
# PayEasy Merchant and Product Service

## Overview
The Merchant and Product Service is a Spring Boot microservice managing merchants and their product catalogs within the PayEasy platform. Merchants can register and manage their details independently, while products are linked to merchants for listing and purchase by users.

## Features
- Register, update, retrieve, and delete merchants
- Add, update, retrieve, and delete products linked to merchants
- Fetch product catalogs per merchant

## Technology Stack
- Java 17+
- Spring Boot 3.x
- Spring Data JPA with Oracle 19c
- RESTful API design
- Managed via Maven in Eclipse IDE

## Setup Instructions

### Prerequisites
- Oracle Database 19c installed and running
- Java JDK 17 or above
- Eclipse IDE with Spring Boot support
- Port 8080 available

### Configuration

Configure your `src/main/resources/application.properties` file as below:

```
spring.datasource.url=jdbc:oracle:thin:@localhost:1521:orcl
spring.datasource.username=payeasy
spring.datasource.password=payeasy

# Hibernate settings
spring.jpa.hibernate.ddl-auto=create
spring.datasource.driver-class-name=oracle.jdbc.driver.OracleDriver
spring.jpa.properties.hibernate.dialect=org.hibernate.dialect.OracleDialect
spring.jpa.properties.hibernate.show_sql=true
spring.jpa.properties.hibernate.format_sql=false
```

> Note: `spring.jpa.hibernate.ddl-auto=create` recreates tables on each startup. Change to `update` or `none` in production.

---

## API Documentation

### Base URL
`http://localhost:8080/api`

### Merchant Endpoints

| Method | Endpoint           | Description               |
| ------ | ------------------ | -------------------------|
| POST   | `/merchants`       | Register new merchant     |
| GET    | `/merchants`       | Get all merchants         |
| GET    | `/merchants/{id}`  | Get merchant by ID        |
| PUT    | `/merchants/{id}`  | Update merchant details   |
| DELETE | `/merchants/{id}`  | Delete merchant           |

### Product Endpoints

| Method | Endpoint                      | Description              |
| ------ | -----------------------------| ------------------------|
| POST   | `/products`                  | Add new product          |
| GET    | `/products/merchant/{id}`    | Get products by merchant |
| GET    | `/products/{id}`             | Get product by ID        |
| PUT    | `/products/{id}`             | Update product details   |
| DELETE | `/products/{id}`             | Delete product           |

---

## Sample Requests

### Add Merchant

```
POST http://localhost:8080/api/merchants
Content-Type: application/json

{
  "merchantName": "ShopEasy",
  "contactNumber": "9876543210",
  "email": "contact@shopeasy.com"
}
```

### Add Product

```
POST http://localhost:8080/api/products
Content-Type: application/json

{
  "merchantId": 1,
  "productName": "Wireless Headphones",
  "description": "Bluetooth over-ear headphones with noise cancellation",
  "price": 2999.99
}
```

---

## Testing

Use Postman or any REST client to test APIs with above endpoints. Ensure Oracle DB is running and configured properly.

---

## Future Enhancements

- Authentication and authorization for merchants
- Product categorization and search features
- Integration with payment and order services
- Notifications on product updates

---