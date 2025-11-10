#!/usr/bin/env node

/**
 * Password hash generator for dashboard authentication
 * Usage: node scripts/generate-password-hash.js [password]
 */

const bcrypt = require('bcryptjs');

const password = process.argv[2];

if (!password) {
  console.error('Usage: node scripts/generate-password-hash.js [password]');
  console.error('Example: node scripts/generate-password-hash.js mySecurePassword123');
  process.exit(1);
}

const saltRounds = 10;
const hash = bcrypt.hashSync(password, saltRounds);

console.log('\n=== Dashboard Password Hash ===');
console.log('\nAdd this to your .env file:');
console.log(`DASHBOARD_PASSWORD_HASH=${hash}`);
console.log('\nAlso set:');
console.log('DASHBOARD_USERNAME=your_username');
console.log('\n===============================\n');
