# 🚀 Koro Backend - Quick Start Guide

## Step 1: Environment Setup (✅ সম্পন্ন)

`.env` ফাইল ইতিমধ্যে তৈরি করা হয়েছে। নিম্নলিখিত values গুলি update করুন:

### Critical (অত্যাবশ্যক)
```env
JWT_ACCESS_SECRET=<generate using: node -e "console.log(require('crypto').randomBytes(32).toString('hex'))">
JWT_REFRESH_SECRET=<generate using: node -e "console.log(require('crypto').randomBytes(32).toString('hex'))">
GOOGLE_CLIENT_ID=<from Google Cloud Console>
GOOGLE_CLIENT_SECRET=<from Google Cloud Console>
CLOUDINARY_CLOUD_NAME=<from Cloudinary Dashboard>
CLOUDINARY_API_KEY=<from Cloudinary Dashboard>
CLOUDINARY_API_SECRET=<from Cloudinary Dashboard>
SMTP_USER=<your Gmail>
SMTP_PASS=<Gmail App Password>
```

### Optional (Development এ)
- `SSL_STORE_ID` - Payment gateway এর জন্য
- `SSL_STORE_PASS` - Payment gateway এর জন্য

## Step 2: Dependencies Install

```bash
npm install
```

## Step 3: MongoDB Setup

### Option A: Local MongoDB
```bash
# Windows এ MongoDB Community Edition ডাউনলোড করুন
# https://www.mongodb.com/try/download/community
# Install এর পর mongod service automatically চালু হয়

# Verify
mongosh
# এবং exit করুন (Ctrl+C)
```

### Option B: MongoDB Atlas (Cloud)
```bash
# প্রথমে MongoDB Atlas account তৈরি করুন
# তারপর connection string copy করে .env এ paste করুন
DATABASE_URL=mongodb+srv://username:password@cluster.mongodb.net/mega-mart
```

## Step 4: Verify Environment Variables

```bash
node verify-env.js
```

Output এ সবকিছু সবুজ আছে কিনা চেক করুন।

## Step 5: Start Development Server

```bash
npm run dev
```

Expected output:
```
Example app listening on port 5000
```

## Step 6: Test API

### Health Check
```bash
curl http://localhost:5000/api/health
# বা Postman এ
GET http://localhost:5000/api/health
```

## Useful Commands

```bash
# Development mode
npm run dev

# Build
npm run build

# Production mode
npm start:prod

# Linting
npm run lint

# Format code
npm run prettier

# Verify environment
node verify-env.js
```

## Common Issues

### Issue: MongoDB Connection Failed
```
Error: connect ECONNREFUSED 127.0.0.1:27017
```
**Fix:**
- MongoDB service চালু আছে কিনা চেক করুন
- Windows এ: Services app খুলে MongoDB check করুন

### Issue: JWT Errors
```
Error: jwt malformed
```
**Fix:**
- JWT secrets সঠিক আছে কিনা চেক করুন
- `node verify-env.js` দিয়ে verify করুন

### Issue: Cloudinary Upload Errors
```
Error: Invalid cloud name
```
**Fix:**
- Cloudinary credentials correct আছে কিনা চেক করুন
- Cloudinary Dashboard থেকে re-copy করুন

### Issue: Email Not Sending
```
Error: Invalid login
```
**Fix:**
- Gmail App Password ব্যবহার করছেন কিনা চেক করুন
- 2-Step Verification enable আছে কিনা চেক করুন

## Next Steps

1. **Frontend Setup** - web এবং admin frontend setup করুন
2. **API Testing** - Postman collection import করুন
3. **Database Seeding** - Sample data add করুন (if needed)
4. **Documentation** - API documentation check করুন

## Resources

- 📖 [Detailed Setup Guide](./ENV_SETUP.md)
- 🔧 [Backend Architecture](./readme.md)
- 🐛 [Troubleshooting](./ENV_SETUP.md#৭-troubleshooting)

---

**Questions?** Team lead এর সাথে contact করুন বা documentation check করুন।
