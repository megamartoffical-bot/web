# 📋 Koro Backend - Environment Setup Checklist

## Phase 1: Basic Setup (5 minutes)

- [ ] **`.env` ফাইল তৈরি** (✅ ইতিমধ্যে done)
  - `.env` file backend root directory এ আছে
  - Location: `d:\Mega Mart\backend\.env`

- [ ] **Dependencies Install**
  ```bash
  npm install
  ```
  - [ ] সব packages successfully installed
  - [ ] No critical errors
  - [ ] node_modules folder created

## Phase 2: Critical Secrets (10 minutes)

### Generate Secure Keys
আগে নিচের command দিয়ে secure random keys generate করুন:
```bash
node -e "console.log('Key 1:', require('crypto').randomBytes(32).toString('hex')); console.log('Key 2:', require('crypto').randomBytes(32).toString('hex'));"
```

- [ ] **JWT Keys**
  - [ ] `JWT_ACCESS_SECRET` - secure random string দিয়ে replace করুন
  - [ ] `JWT_REFRESH_SECRET` - ভিন্ন secure random string দিয়ে replace করুন
  - [ ] `JWT_ACCESS_EXPIRES=7d` - keep as is
  - [ ] `JWT_REFRESH_EXPIRES=30d` - keep as is

- [ ] **Express Session**
  - [ ] `EXPRESS_SESSION` - secure random string দিয়ে replace করুন

- [ ] **Bcrypt Salt**
  - [ ] `BCRYPT_SALT_ROUNDS=12` - development এ ঠিক আছে (production এ 14)

## Phase 3: Database Setup (10 minutes)

- [ ] **MongoDB Setup করুন**
  
  **Option 1: Local MongoDB**
  - [ ] MongoDB Community Edition ডাউনলোড করুন
    - https://www.mongodb.com/try/download/community
  - [ ] Install করুন Windows এ
  - [ ] mongod service চালু আছে কিনা verify করুন
  - [ ] `DATABASE_URL=mongodb://localhost:27017/mega-mart` ঠিক আছে
  
  **Option 2: MongoDB Atlas (Recommended for cloud)**
  - [ ] https://www.mongodb.com/cloud/atlas এ account বানান
  - [ ] নতুন cluster তৈরি করুন (Free tier available)
  - [ ] Connection string copy করুন
  - [ ] `.env` এ paste করুন:
    ```env
    DATABASE_URL=mongodb+srv://username:password@cluster.mongodb.net/mega-mart
    ```
  - [ ] Username এবং password correct আছে কিনা চেক করুন

- [ ] **Database Verification**
  ```bash
  # Command prompt এ (or your MongoDB client)
  mongosh
  > use mega-mart
  > db.version()
  # Output দেখা যাচ্ছে মানে ঠিক আছে
  ```

## Phase 4: Third-Party Services (20 minutes)

### 4.1 Google OAuth Setup
- [ ] Google Cloud Console এ যান: https://console.cloud.google.com
- [ ] নতুন project তৈরি করুন (or existing project এ)
  - Project name: `Mega Mart` (or similar)
- [ ] OAuth consent screen configure করুন
  - [ ] User type: External (for development)
  - [ ] Required fields fill করুন
- [ ] OAuth 2.0 credentials তৈর করুন
  - [ ] Type: Web application
  - [ ] Authorized JavaScript origins:
    - `http://localhost:5000`
    - `http://localhost:3000` (frontend)
    - `http://localhost:3001` (admin)
  - [ ] Authorized redirect URIs:
    - `http://localhost:5000/api/auth/google/callback`
- [ ] Copy credentials to `.env`:
  ```env
  GOOGLE_CLIENT_ID=xxxxx.apps.googleusercontent.com
  GOOGLE_CLIENT_SECRET=your_secret
  ```

### 4.2 Cloudinary Setup (Image Upload)
- [ ] https://cloudinary.com এ account বানান
  - [ ] Free plan নিয়ে sign up করুন
- [ ] Dashboard এ যান
- [ ] Settings > API Keys এ যান
- [ ] Copy करুন:
  ```env
  CLOUDINARY_CLOUD_NAME=your_cloud_name
  CLOUDINARY_API_KEY=your_api_key
  CLOUDINARY_API_SECRET=your_api_secret
  ```
- [ ] (Optional) CLOUDINARY_URL generate করুন:
  ```
  cloudinary://api_key:api_secret@cloud_name
  ```

### 4.3 Gmail SMTP Setup (Email)
- [ ] Gmail account দিয়ে https://myaccount.google.com এ login করুন
- [ ] Security settings এ যান
- [ ] **Enable 2-Step Verification** (if not already)
  - [ ] Phone verification করুন
  - [ ] Confirm করুন
- [ ] **App Passwords generate করুন**
  - [ ] Select app: Mail
  - [ ] Select device: Windows Computer (or your device)
  - [ ] Copy the 16-character password
- [ ] `.env` এ add করুন:
  ```env
  SMTP_HOST=smtp.gmail.com
  SMTP_PORT=587
  SMTP_USER=your_email@gmail.com
  SMTP_PASS=your_16_char_app_password
  SMTP_FROM=noreply@megamart.com
  ```

### 4.4 SSL Commerce (Payment Gateway - Optional for now)
- [ ] SSL Commerce account: https://www.sslcommerz.com/
- [ ] Test credentials নিন (sandbox)
- [ ] `.env` এ add করুন:
  ```env
  SSL_STORE_ID=your_test_store_id
  SSL_STORE_PASS=your_test_store_password
  SSL_PAYMENT_API=https://sandbox.sslcommerz.com/gwprocess/v4/api.php
  SSL_VALIDATION_API=https://sandbox.sslcommerz.com/validator/api/validationserverAPI.php
  ```

## Phase 5: Frontend URLs Configuration

- [ ] **Web Frontend**
  ```env
  FRONTEND_URL=http://localhost:3000
  ```

- [ ] **Admin Dashboard**
  ```env
  FRONTEND_URL_ADMIN=http://localhost:3001
  ```

- [ ] **Google OAuth Callback**
  ```env
  GOOGLE_CALLBACK_URL=http://localhost:5000/api/auth/google/callback
  ```

- [ ] **SSL Commerce Callbacks** (if needed)
  - Backend success URL: `http://localhost:5000/api/payment/ssl-success`
  - Frontend success URL: `http://localhost:3000/payment-success`

## Phase 6: Verification (5 minutes)

- [ ] **Run Verification Script**
  ```bash
  node verify-env.js
  ```
  - [ ] Output: "✅ All required variables are set!"
  - [ ] নোট করুন কোন variables এ "⚠️ PLACEHOLDER" আছে

- [ ] **.env File Check**
  - [ ] কোন `your_` placeholder values আছে কিনা চেক করুন
  - [ ] Production এর জন্য sensitive values এ actual credentials আছে

## Phase 7: Startup Test (5 minutes)

- [ ] **MongoDB Service চালু আছে কিনা verify করুন**
  ```bash
  mongosh --eval "db.version()"
  ```

- [ ] **Backend Server Start করুন**
  ```bash
  npm run dev
  ```
  - [ ] Expected output: `Example app listening on port 5000`
  - [ ] No connection errors
  - [ ] No JWT errors

- [ ] **Health Check API Test করুন**
  - Postman/Thunder Client এ:
    ```
    GET http://localhost:5000/api/health
    ```
  - [ ] Response: 200 OK

## Phase 8: Documentation & Knowledge Base

- [ ] Read করুন: [ENV_SETUP.md](./ENV_SETUP.md) - Detailed guide
- [ ] Read করুন: [QUICK_START.md](./QUICK_START.md) - Quick reference
- [ ] Read করুন: Backend readme.md
- [ ] Bookmark করুন: Troubleshooting section

## Summary

### ✅ Complete Checklist
সব items এ check mark দেওয়ার পর নিচের command দিন:

```bash
# Verify environment
node verify-env.js

# Start backend
npm run dev
```

### Expected Result
```
🔍 Environment Variables Verification
✅ All required variables are set!
✅ Environment setup is ready!

Example app listening on port 5000
```

---

## Troubleshooting Reference

| Problem | Solution |
|---------|----------|
| MongoDB connection failed | Check mongod service is running |
| JWT errors | Verify JWT secrets are set correctly |
| Cloudinary upload fails | Check cloud name and API keys |
| Email not sending | Verify Gmail app password (not regular password) |
| Google OAuth errors | Check client ID, secret, and callback URL |
| CORS errors | Check FRONTEND_URL matches client origin |

## Emergency Contacts

যদি কোন সমস্যা হয়:
1. এই checklist দেখুন
2. ENV_SETUP.md troubleshooting section দেখুন
3. Team lead এর সাথে যোগাযোগ করুন

---

**Last Updated:** July 2026
**Status:** ✅ Ready for Development
