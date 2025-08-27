***

```markdown
# PayEasy User Service

The **User Service** manages user registration, login, basic profile management, and Multi-Factor Authentication (MFA) for the **PayEasy Payment Platform**.  
It securely stores user data in **Oracle 19c**, with user passwords hashed using **MD5**, and exposes RESTful endpoints.

---

## 📌 Base URL
```
http://localhost:8080/api/users
```

---

## 🚀 API Endpoints

### 1. Register User
**Endpoint:** `POST /register`  
**Description:** Registers a new user with name, email, mobile, and password (stored as MD5 hash).  

#### Request Body
```
{
  "fullName": "John Doe",
  "email": "john@example.com",
  "mobile": "9876543210",
  "passwordHash": "password123"
}
```

#### Success Response
```
{
  "userId": 1,
  "fullName": "John Doe",
  "email": "john@example.com",
  "mobile": "9876543210",
  "passwordHash": "482c811da5d5b4bc6d497ffa98491e38",
  "mfaEnabled": false,
  "createdAt": "2025-08-27T09:53:43.703+00:00",
  "updatedAt": "2025-08-27T09:53:43.703+00:00"
}
```

#### Validation Error
```
{
  "error": "Email is required"
}
```

---

### 2. Login User
**Endpoint:** `POST /login`  
**Description:** Authenticates a user using email & password. If MFA is enabled, returns MFA-required status.  

#### Request Body
```
{
  "email": "john@example.com",
  "password": "password123"
}
```

#### Response (MFA Disabled)
```
{
  "userId": 1,
  "fullName": "John Doe",
  "email": "john@example.com",
  "mobile": "9876543210",
  "passwordHash": "482c811da5d5b4bc6d497ffa98491e38",
  "mfaEnabled": false,
  "createdAt": "2025-08-27T09:53:43.703+00:00",
  "updatedAt": "2025-08-27T09:53:43.703+00:00"
}
```

#### Response (MFA Enabled)
```
{
  "mfa_required": true,
  "message": "Enter OTP"
}
```

#### Error Response
```
{
  "error": "Invalid credentials"
}
```

---

### 3. Verify MFA OTP
**Endpoint:** `POST /mfa/verify`  
**Description:** Verifies Multi-Factor Authentication OTP (currently **static OTP: 1234** for testing).  

#### Request Body
```
{
  "otp": "1234"
}
```

#### Success Response
```
{
  "message": "MFA verified"
}
```

#### Failure Response
```
{
  "error": "Invalid OTP"
}
```

---

### 4. Enable/Disable MFA
**Endpoint:** `POST /mfa/enable/{userId}?enable=true|false`  
**Description:** Enable or disable MFA for a user based on their `userId`.  

#### Example URL
```
POST /mfa/enable/1?enable=true
```

#### Response
```
{
  "userId": 1,
  "mfaEnabled": true,
  ...
}
```

#### Validation Error
```
{
  "error": "User not found"
}
```

---

### 5. Update User Profile
**Endpoint:** `PUT /profile/{userId}`  
**Description:** Updates user profile details (e.g., name, mobile).  

#### Request Body
```
{
  "fullName": "John D",
  "mobile": "9123456780"
}
```

#### Success Response
```
{
  "userId": 1,
  "fullName": "John D",
  "mobile": "9123456780",
  ...
}
```

#### Validation Error
```
{
  "error": "User not found"
}
```

---

## 🔄 Data Flow Summary
- **User Registration:** Client sends user info + password → MD5 hash → stored in Oracle DB.  
- **User Login:** Client sends email & password → hash compared in DB → if MFA enabled → OTP required.  
- **MFA Verification:** Client submits OTP (`1234` for testing) → service validates → grants access.  
- **MFA Enable/Disable:** Flag stored in database toggled via endpoint.  
- **Profile Update:** Client updates profile fields → saved in Oracle DB.  

---

## ⚠️ Notes
- Passwords are hashed with **MD5** (not secure, **use stronger hashing like BCrypt in production**).  
- MFA currently uses **static OTP 1234** for **testing only** → should be replaced with time-based OTP (TOTP).  
- All timestamps use **ISO 8601** format.  
- User IDs are **auto-incremented** via Oracle 19c.  
- Error responses return relevant **HTTP status codes** (`400 / 401`) with JSON error messages.  

---
```

***
