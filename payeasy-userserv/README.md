```markdown
# PayEasy User Service

## Overview
The User Service is a Spring Boot microservice that handles user registration, login, and profile management for the PayEasy payment platform. User information is securely stored in an Oracle 19c database, and RESTful APIs are exposed for client applications. The login process integrates with the Notification Service via Kafka to handle OTP delivery for multi-factor authentication.

## Features
- User registration with password hashing (MD5)
- User login with password verification, triggering OTP delivery via Notification Service
- Update user profile (full name and mobile)
- Integration with Kafka to send login notification emails via Notification Service
- Error handling and input validations

## Tech Stack
- Java 17+
- Spring Boot 3.3.2
- Spring Data JPA
- Oracle Database 19c
- Apache Kafka for messaging (Kafka Producer)

## Setup Instructions

### Prerequisites
- Oracle Database 19c installed and running
- Java JDK 17 or higher
- Eclipse IDE with Spring Tools (STS) plugin installed
- Apache Kafka running locally on default port
- Port 8080 for user service
- Port 8086 for Notification

### Installation

1. Clone the repository:
   ```
   git clone <your-repo-url>
   cd user-service
   ```

2. Import the project into Eclipse as an existing Maven project:
   - Open Eclipse IDE
   - Go to **File > Import**
   - Select **Maven > Existing Maven Projects**
   - Browse to the project folder and click **Finish**

3. Configure Oracle datasource and Kafka producer in `src/main/resources/application.properties`:
   ```
   # Oracle DB config
   spring.datasource.url=jdbc:oracle:thin:@localhost:1521:XE
   spring.datasource.username=YOUR_DB_USERNAME
   spring.datasource.password=YOUR_DB_PASSWORD
   spring.jpa.hibernate.ddl-auto=update
   spring.jpa.database-platform=org.hibernate.dialect.Oracle12cDialect
   spring.datasource.driver-class-name=oracle.jdbc.driver.OracleDriver

   # Kafka Producer config
   spring.kafka.bootstrap-servers=localhost:9092
   spring.kafka.producer.key-serializer=org.apache.kafka.common.serialization.StringSerializer
   spring.kafka.producer.value-serializer=org.apache.kafka.common.serialization.StringSerializer
   ```

4. Run the application inside Eclipse:
   - Right-click the main application class (with `@SpringBootApplication`)
   - Select **Run As > Java Application**

---

## API Documentation

### Base URL
`http://localhost:8085/payeasy-userserv/api/users/`

### Endpoints

| Method | Endpoint            | Description                                      |
| ------ | ------------------- | ------------------------------------------------|
| POST   | `/register`         | Register a new user                             |
| POST   | `/login`            | Login user; triggers OTP sent via Notification Service |
| PUT    | `/profile/{userId}` | Update user profile (full name and mobile)     |

---

## How to Test

Use Postman, curl, or similar tools for testing API endpoints:

- Register user:  
  `POST /api/users/register`    
  Body example:
  ```
  {
    "fullName": "John Doe",
    "email": "john@example.com",
    "mobile": "9876543210",
    "passwordHash": "password123"
  }
  ```

- Login user:  
  `POST /api/users/login`    
  Body example:
  ```
  {
    "email": "john@example.com",
    "password": "password123"
  }


  ### Login Flow Update
- When logging in (`POST /login`) with valid `email` and `password`, the response will be:
  ```
  {
    "message": "Login successful. OTP sent via notification service."
  }
  ```
- The OTP will be sent asynchronously by the Notification Service.
- OTP verification is done via the Notification Service endpoint separately.

  ```

## For OTP Verification
- [Notification Service](./payeasy-notificationserv/README.md)

  ```
- Update profile:  
  `PUT /api/users/profile/{userId}`    
  Body example:
  ```
  {
    "fullName": "John S. Doe",
    "mobile": "1234567890"
  }
  ```
  
---

## Future Improvements
- Use stronger password hashing algorithms like bcrypt/scrypt
- Add JWT-based authentication and authorization
- Complete MFA flow with dynamic OTP generation and expiration
- Add centralized logging and advanced error handling
- Dockerize for container deployment and orchestration
- Extend API documentation using Swagger/OpenAPI

---

