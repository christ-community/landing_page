/**
 * Test email validator functionality
 * Run with: node tests/email-validator.test.js
 */

const { EmailValidator } = require('../src/lib/email-validator.ts');

console.log('Testing Email Validator...\n');

async function runTests() {
  let passed = 0;
  let failed = 0;

  // Test 1: Valid email
  console.log('Test 1: Valid email');
  const result1 = await EmailValidator.validate('john.doe@example.com');
  if (result1.isValid && result1.isSafe) {
    console.log('✓ PASS: Valid email recognized\n');
    passed++;
  } else {
    console.log('✗ FAIL: Valid email not recognized\n');
    failed++;
  }

  // Test 2: Invalid syntax
  console.log('Test 2: Invalid email syntax');
  const result2 = await EmailValidator.validate('invalid.email@');
  if (!result2.isValid) {
    console.log('✓ PASS: Invalid syntax detected\n');
    passed++;
  } else {
    console.log('✗ FAIL: Invalid syntax not detected\n');
    failed++;
  }

  // Test 3: Disposable email
  console.log('Test 3: Disposable email detection');
  const result3 = await EmailValidator.validate('test@10minutemail.com');
  if (result3.isValid && !result3.isSafe) {
    console.log('✓ PASS: Disposable email detected\n');
    passed++;
  } else {
    console.log('✗ FAIL: Disposable email not detected\n');
    failed++;
  }

  // Test 4: Role-based email
  console.log('Test 4: Role-based email detection');
  const result4 = await EmailValidator.validate('admin@example.com');
  if (result4.isValid && result4.reason) {
    console.log('✓ PASS: Role-based email detected\n');
    passed++;
  } else {
    console.log('✗ FAIL: Role-based email not detected\n');
    failed++;
  }

  // Test 5: Typo suggestion
  console.log('Test 5: Typo suggestion');
  const result5 = await EmailValidator.validate('john@gmail.con');
  if (result5.suggestion === 'john@gmail.com') {
    console.log('✓ PASS: Typo suggestion provided\n');
    passed++;
  } else {
    console.log('✗ FAIL: Typo suggestion not provided\n');
    failed++;
  }

  // Test 6: Batch validation
  console.log('Test 6: Batch validation');
  const emails = [
    'valid1@example.com',
    'valid2@example.com',
    'invalid@',
    'test@tempmail.com'
  ];
  const batchResults = await EmailValidator.validateBatch(emails);
  if (batchResults.length === 4) {
    console.log('✓ PASS: Batch validation completed\n');
    passed++;
  } else {
    console.log('✗ FAIL: Batch validation failed\n');
    failed++;
  }

  // Test 7: Email extraction
  console.log('Test 7: Email extraction from text');
  const text = 'Contact us at john@example.com or jane@example.org for more info';
  const extracted = EmailValidator.extractEmails(text);
  if (extracted.length === 2) {
    console.log('✓ PASS: Emails extracted from text\n');
    passed++;
  } else {
    console.log('✗ FAIL: Email extraction failed\n');
    failed++;
  }

  console.log('='.repeat(50));
  console.log(`Total Tests: ${passed + failed}`);
  console.log(`Passed: ${passed}`);
  console.log(`Failed: ${failed}`);
  console.log('='.repeat(50));
}

runTests().catch(console.error);
