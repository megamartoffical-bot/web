#!/usr/bin/env node

/**
 * Interactive Environment Setup Tool
 * এই tool আপনাকে সাহায্য করবে .env file configure করতে
 */

const fs = require('fs');
const path = require('path');
const readline = require('readline');

const envPath = path.join(__dirname, '.env');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  cyan: '\x1b[36m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  red: '\x1b[31m',
};

const questions = [
  {
    key: 'JWT_ACCESS_SECRET',
    label: 'JWT Access Secret',
    hint: '(Generate using: node -e "console.log(require(\'crypto\').randomBytes(32).toString(\'hex\'))")',
    required: true,
  },
  {
    key: 'JWT_REFRESH_SECRET',
    label: 'JWT Refresh Secret',
    hint: '(Generate using: node -e "console.log(require(\'crypto\').randomBytes(32).toString(\'hex\'))")',
    required: true,
  },
  {
    key: 'GOOGLE_CLIENT_ID',
    label: 'Google Client ID',
    hint: '(From Google Cloud Console)',
    required: false,
  },
  {
    key: 'GOOGLE_CLIENT_SECRET',
    label: 'Google Client Secret',
    hint: '(From Google Cloud Console)',
    required: false,
  },
  {
    key: 'CLOUDINARY_CLOUD_NAME',
    label: 'Cloudinary Cloud Name',
    hint: '(From Cloudinary Dashboard)',
    required: false,
  },
  {
    key: 'CLOUDINARY_API_KEY',
    label: 'Cloudinary API Key',
    hint: '(From Cloudinary Dashboard)',
    required: false,
  },
  {
    key: 'CLOUDINARY_API_SECRET',
    label: 'Cloudinary API Secret',
    hint: '(From Cloudinary Dashboard)',
    required: false,
  },
  {
    key: 'SMTP_USER',
    label: 'Gmail Email Address',
    hint: '(Your Gmail address)',
    required: false,
  },
  {
    key: 'SMTP_PASS',
    label: 'Gmail App Password',
    hint: '(16-character app password, NOT regular password)',
    required: false,
  },
  {
    key: 'EXPRESS_SESSION',
    label: 'Express Session Secret',
    hint: '(Generate using: node -e "console.log(require(\'crypto\').randomBytes(32).toString(\'hex\'))")',
    required: false,
  },
];

console.log(`
${colors.cyan}${colors.bright}
╔═══════════════════════════════════════════════╗
║   Koro Backend - Interactive Setup Tool      ║
╚═══════════════════════════════════════════════╝
${colors.reset}

This tool will help you configure your .env file.

`);

async function ask(question) {
  return new Promise((resolve) => {
    rl.question(question, (answer) => {
      resolve(answer.trim());
    });
  });
}

async function setupEnv() {
  let envContent = fs.readFileSync(envPath, 'utf-8');
  let updatedValues = {};

  for (const q of questions) {
    console.log(`\n${colors.bright}${q.label}${colors.reset}`);
    console.log(`${colors.yellow}${q.hint}${colors.reset}`);
    
    let answer = await ask(`Enter value ${q.required ? '(required)' : '(optional)'}: `);
    
    if (!answer && q.required) {
      console.log(`${colors.red}This field is required. Skipping...${colors.reset}`);
      continue;
    }
    
    if (answer) {
      updatedValues[q.key] = answer;
      envContent = envContent.replace(
        new RegExp(`^${q.key}=.*$`, 'm'),
        `${q.key}=${answer}`
      );
    }
  }

  // Save updated .env
  fs.writeFileSync(envPath, envContent);
  
  console.log(`\n${colors.green}${colors.bright}✓ Environment variables updated!${colors.reset}\n`);
  
  // Summary
  console.log(`${colors.bright}Updated values:${colors.reset}`);
  Object.entries(updatedValues).forEach(([key, value]) => {
    const displayValue = value.length > 20 ? value.substring(0, 20) + '...' : value;
    console.log(`  ${colors.green}✓${colors.reset} ${key} = ${displayValue}`);
  });

  console.log(`\n${colors.bright}Next steps:${colors.reset}`);
  console.log(`  1. Run: ${colors.cyan}node verify-env.js${colors.reset}`);
  console.log(`  2. Then: ${colors.cyan}npm run dev${colors.reset}\n`);

  rl.close();
}

setupEnv().catch((err) => {
  console.error(`${colors.red}Error: ${err.message}${colors.reset}`);
  rl.close();
  process.exit(1);
});
