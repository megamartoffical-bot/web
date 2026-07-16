# Environment Setup Guide - Mega Mart Backend

এটি Koro backend এর জন্য সম্পূর্ণ environment setup গাইড।

## ১. `.env` ফাইল সেটআপ

### ফাইল তৈরি করা
Backend root directory তে `.env` ফাইল তৈরি করুন। আমরা ইতিমধ্যে `.env` ফাইল তৈরি করেছি।

### প্রয়োজনীয় Environment Variables

#### Application Configuration
```
NODE_ENV=development          # development/production
PORT=5000                     # Backend server port
```

#### Database Configuration
```
DATABASE_URL=mongodb://localhost:27017/mega-mart
# Production এর জন্য MongoDB Atlas: mongodb+srv://user:password@cluster.mongodb.net/database_name
```

#### JWT Authentication
```
JWT_ACCESS_SECRET=your_secure_random_key      # কমপক্ষে ৩২ characters
JWT_REFRESH_SECRET=your_secure_random_key     # ভিন্ন key ব্যবহার করুন
JWT_ACCESS_EXPIRES=7d                         # Access token expiry time
JWT_REFRESH_EXPIRES=30d                       # Refresh token expiry time
```

#### Bcrypt Configuration
```
BCRYPT_SALT_ROUNDS=12        # Password hashing এর জন্য salt rounds (production এ ১৪ ব্যবহার করুন)
```

#### Cloudinary Configuration (Image Upload)
```
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
CLOUDINARY_URL=cloudinary://key:secret@cloud_name
```
**কিভাবে পাবেন:**
1. https://cloudinary.com এ যান এবং account বানান
2. Dashboard এ গিয়ে API Keys দেখুন

#### Google OAuth Configuration
```
GOOGLE_CLIENT_ID=xxxxx.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=your_client_secret
GOOGLE_CALLBACK_URL=http://localhost:5000/api/auth/google/callback
```
**কিভাবে পাবেন:**
1. https://console.cloud.google.com এ যান
2. নতুন project তৈরি করুন
3. OAuth 2.0 credentials তৈরি করুন
4. Authorized redirect URLs এ callback URL add করুন

#### Frontend URLs
```
FRONTEND_URL=http://localhost:3000            # Web frontend
FRONTEND_URL_ADMIN=http://localhost:3001      # Admin dashboard
```

#### Express Session
```
EXPRESS_SESSION=your_secure_random_key        # Session secret key
```

#### SSL Commerce Payment Gateway (Optional - Development এ)
```
SSL_STORE_ID=your_ssl_store_id
SSL_STORE_PASS=your_ssl_store_password
SSL_PAYMENT_API=https://sandbox.sslcommerz.com/gwprocess/v4/api.php
SSL_VALIDATION_API=https://sandbox.sslcommerz.com/validator/api/validationserverAPI.php

# Redirect URLs - Backend
SSL_SUCCESS_BACKEND_URL=http://localhost:5000/api/payment/ssl-success
SSL_FAIL_BACKEND_URL=http://localhost:5000/api/payment/ssl-fail
SSL_CANCEL_BACKEND_URL=http://localhost:5000/api/payment/ssl-cancel
SSL_IPN_URL=http://localhost:5000/api/payment/ssl-ipn

# Redirect URLs - Frontend
SSL_SUCCESS_FRONTEND_URL=http://localhost:3000/payment-success
SSL_FAIL_FRONTEND_URL=http://localhost:3000/payment-fail
SSL_CANCEL_FRONTEND_URL=http://localhost:3000/payment-cancel
```

#### Email Configuration (SMTP)
```
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your_email@gmail.com
SMTP_PASS=your_app_password     # Gmail app password, regular password নয়
SMTP_FROM=noreply@megamart.com
```

**Gmail App Password পাওয়ার উপায়:**
1. https://myaccount.google.com এ লগইন করুন
2. Security settings এ যান
3. 2-Step Verification enable করুন
4. App passwords তৈরি করুন
5. ১৬ ক্যারেক্টারের password পাবেন

## ২. Secure Keys তৈরি করা

JWT এবং session secrets এর জন্য secure random keys তৈরি করুন:

```bash
# Node.js এ
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

এই command run করে output copy করে environment variables এ paste করুন।

## ৩. MongoDB Setup

### Local MongoDB
```bash
# Windows এ
# MongoDB Community Edition ডাউনলোড এবং install করুন
# https://www.mongodb.com/try/download/community

# Install করার পর mongod service চালু হবে
```

### MongoDB Atlas (Cloud)
```
DATABASE_URL=mongodb+srv://username:password@cluster.mongodb.net/database_name
```

## ৪. Backend শুরু করা

```bash
# Development
npm run dev

# Production build
npm run build
npm start:prod
```

## ৫. Environment Variables Checklist

### Development এ Minimum Required
- [ ] NODE_ENV = development
- [ ] PORT = 5000
- [ ] DATABASE_URL = ✓
- [ ] JWT_ACCESS_SECRET = ✓
- [ ] JWT_REFRESH_SECRET = ✓
- [ ] BCRYPT_SALT_ROUNDS = 12
- [ ] CLOUDINARY_CLOUD_NAME = ✓
- [ ] CLOUDINARY_API_KEY = ✓
- [ ] CLOUDINARY_API_SECRET = ✓
- [ ] GOOGLE_CLIENT_ID = ✓
- [ ] GOOGLE_CLIENT_SECRET = ✓
- [ ] GOOGLE_CALLBACK_URL = ✓
- [ ] FRONTEND_URL = ✓
- [ ] FRONTEND_URL_ADMIN = ✓
- [ ] SMTP_HOST = ✓
- [ ] SMTP_USER = ✓
- [ ] SMTP_PASS = ✓

### Production এ Additional
- [ ] NODE_ENV = production
- [ ] BCRYPT_SALT_ROUNDS = 14 (increased for security)
- [ ] SSL_STORE_ID = ✓ (live credentials)
- [ ] SSL_STORE_PASS = ✓ (live credentials)
- [ ] All URLs should use production domain

## ৬. Security Best Practices

1. **Never commit .env file** - `.gitignore` এ যোগ করা আছে
2. **Use strong secrets** - কমপক্ষে ৩২ characters
3. **Rotate secrets regularly** - especially in production
4. **Use different secrets** - development এবং production এ
5. **Keep .env.example updated** - কিন্তু actual values দেবেন না

## ৭. Troubleshooting

### Database Connection Failed
```
Error: connect ECONNREFUSED 127.0.0.1:27017
```
**Solution:** MongoDB service চালু আছে কিনা চেক করুন
```bash
# Windows
net start MongoDB

# Linux
sudo systemctl start mongod
```

### JWT Authentication Errors
```
Error: jwt malformed
```
**Solution:** JWT_ACCESS_SECRET এবং JWT_REFRESH_SECRET সঠিক আছে কিনা চেক করুন

### Cloudinary Upload Errors
```
Error: Invalid cloud name
```
**Solution:** CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY এবং CLOUDINARY_API_SECRET সঠিক আছে কিনা চেক করুন

### Email Configuration Issues
```
Error: Invalid login
```
**Solution:** Gmail app password ব্যবহার করছেন কিনা চেক করুন (regular password নয়)

## ৮. পরবর্তী ধাপ

1. `.env` ফাইল populate করুন actual values দিয়ে
2. MongoDB চালু করুন
3. `npm run dev` command দিয়ে backend start করুন
4. API endpoints test করুন Postman/Thunder Client এ

---

প্রশ্ন বা সমস্যার জন্য documentation চেক করুন বা team lead এর সাথে যোগাযোগ করুন।
