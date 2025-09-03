```markdown
# PayEasy Notification Service

## Overview
The Notification Service is a Spring Boot microservice responsible for verifying OTPs and sending email notifications within the PayEasy platform. It consumes Kafka messages to dispatch emails and provides an API to verify OTPs sent to users.

## Features
- Verify OTP submitted by users
- Consume Kafka messages for email notifications
- SMTP email sending via Gmail SMTP server
- REST API for OTP verification

## Tech Stack
- Java 17+
- Spring Boot 3.x
- Apache Kafka (Consumer)
- Spring Mail
- Maven (build & dependency management)

## Setup Instructions

### Prerequisites
- Java JDK 17 or higher
- Apache Kafka running locally on default port (9092)
- Gmail account with SMTP enabled for sending emails
- Port 8086 free for application

### Installation

1. Clone and import the project into Eclipse as a Maven project.

2. Configure `src/main/resources/application.properties` with database, Kafka, SMTP, and server settings:

```
spring.application.name=payeasy-notifserv
server.port=8086

# Kafka Consumer Configuration
spring.kafka.bootstrap-servers=localhost:9092
spring.kafka.consumer.group-id=email-group
spring.kafka.consumer.auto-offset-reset=earliest
spring.kafka.consumer.key-deserializer=org.apache.kafka.common.serialization.StringDeserializer
spring.kafka.consumer.value-deserializer=org.apache.kafka.common.serialization.StringDeserializer

# Mail Configuration (Gmail SMTP)
spring.mail.host=smtp.gmail.com
spring.mail.port=587
spring.mail.username=your-email@gmail.com
spring.mail.password=your-app-password
spring.mail.properties.mail.smtp.auth=true
spring.mail.properties.mail.smtp.starttls.enable=true
```

> **Note:** For Gmail SMTP, it is recommended to use an App Password instead of your main Gmail password.

---

## API Documentation

### Base URL
`http://localhost:8086/otp`

### Endpoints

| Method | Endpoint    | Description                          |
| ------ | ----------- | ---------------------------------- |
| POST   | `/verify`   | Verify user OTP                    |

### Example: Verify OTP

**POST** `/otp/verify`  
Request Body:
```
{
  "email": "testmail@gmail.com",
  "otp": "714414"
}
```

Response on success:
```
OTP verified successfully!
```

Response on failure:
```
Invalid OTP
```

---

## How to Test

Use Postman or curl to test the OTP verification:

```
curl -X POST http://localhost:8086/otp/verify \
-H "Content-Type: application/json" \
-d '{"email":"krishguptaddn@gmail.com","otp":"714414"}'
```

---

## Future Improvements
- Add persistence for OTPs with expiration
- Implement rate limiting to prevent brute-force attacks
- Extend email templates with HTML formatting
- Add more notification channels (SMS, push notifications)
- Add logging and monitoring capabilities

---
