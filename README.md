# 🔐 Authentication System Practice

A complete Authentication and Authorization backend project built using Node.js, Express.js, MongoDB, and JWT. This project demonstrates industry-standard authentication workflows including user registration, login, logout, password management, email verification, and refresh token handling.

---

## 🚀 Features

### User Authentication
- User Registration
- User Login
- User Logout
- Access Token Generation
- Refresh Token Generation
- Refresh Token Rotation

### Password Management
- Change Password
- Forgot Password
- Reset Password
- Password Hashing using bcrypt

### User Verification
- Email Verification
- Resend Verification Email
- Temporary Token Generation
- Token Expiry Handling

### Security Features
- JWT Authentication
- Protected Routes
- HTTP-Only Cookies
- Refresh Token Storage
- Secure Password Hashing
- Input Validation
- Error Handling Middleware

---

## 🛠️ Tech Stack

### Backend
- Node.js
- Express.js

### Database
- MongoDB
- Mongoose

### Authentication
- JWT (JSON Web Token)
- bcrypt

### Utilities
- Cookie Parser
- Dotenv
- Nodemailer / Mailtrap
- Crypto

---

## 📂 Project Structure

```bash
src/
│
├── controllers/
│   └── user.controller.js
│
├── models/
│   └── user.model.js
│
├── routes/
│   └── user.routes.js
│
├── middlewares/
│   ├── auth.middleware.js
│   └── error.middleware.js
│
├── utils/
│   ├── ApiError.js
│   ├── ApiResponse.js
│   ├── asyncHandler.js
│   └── sendEmail.js
│
├── db/
│   └── index.js
│
├── app.js
├── index.js
└── constants.js
```

---

## 📋 Authentication Flow

### 1. User Registration
- Receive user data
- Validate input fields
- Check existing user
- Hash password
- Create user
- Generate verification token
- Send verification email
- Return success response

### 2. User Login
- Verify email
- Validate credentials
- Generate Access Token
- Generate Refresh Token
- Store Refresh Token
- Send tokens to client

### 3. Access Protected Routes
- Verify Access Token
- Attach user to request
- Allow authorized access

### 4. Refresh Token
- Validate Refresh Token
- Generate new Access Token
- Generate new Refresh Token
- Update stored token

### 5. Logout
- Remove Refresh Token
- Clear cookies
- End session

### 6. Forgot Password
- Generate temporary token
- Store hashed token
- Set token expiry
- Send reset link via email

### 7. Reset Password
- Verify token
- Check token expiry
- Update password
- Remove reset token

### 8. Change Password
- Verify old password
- Hash new password
- Save updated password

---

## 🔑 Environment Variables

Create a `.env` file:

```env
PORT=8000

MONGODB_URI=your_mongodb_connection_string

ACCESS_TOKEN_SECRET=your_access_token_secret
ACCESS_TOKEN_EXPIRY=15m

REFRESH_TOKEN_SECRET=your_refresh_token_secret
REFRESH_TOKEN_EXPIRY=7d

MAILTRAP_HOST=
MAILTRAP_PORT=
MAILTRAP_USERNAME=
MAILTRAP_PASSWORD=

FRONTEND_URL=http://localhost:3000
```

---

## 📡 API Endpoints

### Authentication Routes

| Method | Endpoint | Description |
|----------|----------|----------|
| POST | /api/v1/users/register | Register User |
| POST | /api/v1/users/login | Login User |
| POST | /api/v1/users/logout | Logout User |
| POST | /api/v1/users/refresh-token | Generate New Access Token |
| POST | /api/v1/users/change-password | Change Password |

### Password Routes

| Method | Endpoint | Description |
|----------|----------|----------|
| POST | /api/v1/users/forgot-password | Send Reset Link |
| POST | /api/v1/users/reset-password/:token | Reset Password |

### Verification Routes

| Method | Endpoint | Description |
|----------|----------|----------|
| GET | /api/v1/users/verify-email/:token | Verify Email |
| POST | /api/v1/users/resend-verification | Resend Verification Email |

---

## 🧪 Testing

Use:
- Postman
- Thunder Client
- Insomnia

Test the complete authentication cycle:

- Register User
- Verify Email
- Login
- Access Protected Route
- Refresh Token
- Change Password
- Forgot Password
- Reset Password
- Logout

---

## 📚 Learning Objectives

This project helped me understand:

- JWT Authentication
- Access & Refresh Tokens
- Password Hashing
- Authentication Middleware
- Email Verification Flow
- Forgot Password Flow
- Token Expiry Handling
- MongoDB User Management
- Secure Backend Practices

---

## 👨‍💻 Author

Ayush Rawat

- GitHub: https://github.com/AyushRawat10
- LinkedIn: Add Your LinkedIn Profile

---

## ⭐ Future Improvements

- Role Based Access Control (RBAC)
- Google OAuth
- GitHub OAuth
- Two Factor Authentication (2FA)
- Rate Limiting
- Account Lockout Mechanism
- Session Management
- Audit Logs