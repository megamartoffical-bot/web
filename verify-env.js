#!/usr/bin/env node

/**
 * Environment Variables Verification Script
 * এই script .env file check করে যে সব necessary variables আছে কিনা
 */

const fs = require('fs');
const path = require('path');

const envPath = path.join(__dirname, '.env');
const requiredVars = [
  'NODE_ENV',
  'PORT',
  'DATABASE_URL',
  'JWT_ACCESS_SECRET',
  'JWT_REFRESH_SECRET',
  'BCRYPT_SALT_ROUNDS',
  'CLOUDINARY_CLOUD_NAME',
  'CLOUDINARY_API_KEY',
  'CLOUDINARY_API_SECRET',
  'GOOGLE_CLIENT_ID',
  'GOOGLE_CLIENT_SECRET',
  'GOOGLE_CALLBACK_URL',
  'FRONTEND_URL',
  'FRONTEND_URL_ADMIN',
  'SMTP_HOST',
  'SMTP_PORT',
  'SMTP_USER',
  'SMTP_PASS',
  'SMTP_FROM',
];

const optionalVars = [
  'SSL_STORE_ID',
  'SSL_STORE_PASS',
  'EXPRESS_SESSION',
];

console.log('\n🔍 Environment Variables Verification\n');
console.log('=====================================\n');

// Check if .env file exists
if (!fs.existsSync(envPath)) {
  console.log('❌ .env file not found!');
  console.log('   Please create .env file in the root directory');
  console.log('   You can copy from .env.example\n');
  process.exit(1);
}

// Read .env file
const envContent = fs.readFileSync(envPath, 'utf-8');
const envVariables = {};

envContent.split('\n').forEach(line => {
  line = line.trim();
  if (line && !line.startsWith('#')) {
    const [key, ...valueParts] = line.split('=');
    if (key) {
      envVariables[key.trim()] = valueParts.join('=').trim();
    }
  }
});

// Check required variables
console.log('Required Variables:');
console.log('-------------------');
let missingRequired = [];
requiredVars.forEach(varName => {
  if (envVariables[varName]) {
    const value = envVariables[varName];
    const displayValue = value.startsWith('your_') ? '⚠️  PLACEHOLDER' : '✓';
    console.log(`✓ ${varName.padEnd(25)} ${displayValue}`);
  } else {
    console.log(`✗ ${varName.padEnd(25)} NOT SET`);
    missingRequired.push(varName);
  }
});

// Check optional variables
console.log('\nOptional Variables:');
console.log('-------------------');
optionalVars.forEach(varName => {
  if (envVariables[varName]) {
    console.log(`✓ ${varName.padEnd(25)} SET`);
  } else {
    console.log(`○ ${varName.padEnd(25)} NOT SET (Optional)`);
  }
});

// Summary
console.log('\n=====================================\n');

if (missingRequired.length > 0) {
  console.log(`⚠️  Found ${missingRequired.length} missing required variable(s):\n`);
  missingRequired.forEach(varName => {
    console.log(`   - ${varName}`);
  });
  console.log('\nPlease set these variables in your .env file');
  process.exit(1);
} else {
  console.log('✅ All required variables are set!');
  
  // Check for placeholder values
  const placeholderVars = Object.entries(envVariables)
    .filter(([_, value]) => value.startsWith('your_'))
    .map(([key, _]) => key);
  
  if (placeholderVars.length > 0) {
    console.log(`\n⚠️  Warning: ${placeholderVars.length} variable(s) still have placeholder values:\n`);
    placeholderVars.forEach(varName => {
      console.log(`   - ${varName}`);
    });
    console.log('\nPlease update these with actual values before running in production');
  }
  
  console.log('\n✅ Environment setup is ready!\n');
}
