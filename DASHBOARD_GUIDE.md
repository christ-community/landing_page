# Dashboard Usage Guide

## Overview
The Christ Community Dashboard provides a secure interface for sending bulk emails to community members. The system includes robust email validation to prevent bounces and ensure successful delivery.

## Setup

### 1. Generate Password Hash
First, generate a secure password hash for dashboard authentication:

```bash
node scripts/generate-password-hash.js your_secure_password
```

This will output a bcrypt hash. Copy this hash for the next step.

### 2. Configure Environment Variables
Add these variables to your `.env` file:

```bash
# Dashboard Authentication
DASHBOARD_USERNAME=admin
DASHBOARD_PASSWORD_HASH=<paste_hash_from_step_1>

# Email Configuration (if not already set)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your_email@gmail.com
SMTP_PASS=your_app_password
FROM_EMAIL=your_email@gmail.com
```

**Important**: For Gmail, you'll need to create an "App Password" rather than using your regular password:
1. Go to Google Account Settings
2. Security → 2-Step Verification
3. App passwords → Generate new app password
4. Use this password in `SMTP_PASS`

### 3. Access Dashboard
Navigate to: `http://localhost:3000/dashboard` (or your production URL)

## Using the Dashboard

### Login
1. Enter your username and password
2. Click "Login"
3. You'll be redirected to the main dashboard

### Sending Bulk Emails

#### Method 1: Upload Excel File

1. **Prepare Your Excel File**
   - Supported formats: `.xlsx`, `.xls`, `.csv`
   - Include columns for email addresses and recipient names
   - Example:
     ```
     Email                 | Name
     john@example.com      | John Doe
     jane@example.com      | Jane Smith
     ```

2. **Upload File**
   - Click "Choose File" and select your Excel file
   - The system will automatically detect column names

3. **Select Columns**
   - Choose which column contains email addresses
   - Choose which column contains recipient names
   - Click "Extract Recipients"

4. **Review Recipients**
   - You'll see a preview table showing first 10 recipients
   - Total count is displayed
   - Click "Clear Recipients" if you need to start over

#### Method 2: Manual Entry

1. **Paste Email List**
   - Format: `email, name` (one per line)
   - Example:
     ```
     john@example.com, John Doe
     jane@example.com, Jane Smith
     bob@example.com, Bob Johnson
     ```

2. **Click "Add Manual Entries"**
   - Recipients will be added to the list
   - You can combine manual entry with Excel upload

### Composing Your Email

1. **Subject Line**
   - Enter a clear, descriptive subject

2. **Message Body**
   - Write your message
   - Use `{name}` placeholder to personalize emails
   - Example:
     ```
     Dear {name},

     We hope this message finds you well...
     ```

3. **Personalization**
   - `{name}` will be replaced with each recipient's name
   - `{email}` is also available if needed

### Preview & Validation (Dry Run)

**Before sending, always run a preview:**

1. Click "Preview & Validate"
2. The system will check all email addresses for:
   - Syntax errors
   - Invalid domains
   - Disposable email addresses
   - Role-based addresses (admin@, info@, etc.)

3. **Review Results:**
   - **Valid Emails**: Ready to send
   - **Invalid Emails**: Syntax or domain errors (shown with reasons)
   - **Unsafe Emails**: Disposable or role-based (may have low engagement)

4. **Fix Issues:**
   - Remove or correct invalid emails
   - Consider removing unsafe emails
   - Re-run preview after corrections

### Sending Emails

1. **After Successful Preview:**
   - Click "Send Emails"
   - Emails are sent in batches of 10
   - 2-second delay between batches

2. **Monitor Progress:**
   - Watch the progress indicator
   - Don't close the browser window during sending

3. **Review Results:**
   - **Sent**: Successfully delivered
   - **Failed**: Delivery issues (shown with error messages)
   - Total statistics displayed

## Email Validation Rules

### Valid Emails
- ✅ Correct syntax (RFC 5322 compliant)
- ✅ Valid domain structure
- ✅ Not disposable
- ✅ Not role-based (or acceptable for your use case)

### Invalid Emails (Rejected)
- ❌ Syntax errors (missing @, invalid characters)
- ❌ Invalid domain structure
- ❌ Domain without TLD (e.g., user@domain)

### Unsafe Emails (Warning)
- ⚠️ Disposable domains (10minutemail.com, tempmail.com, etc.)
- ⚠️ Role-based addresses (admin@, noreply@, support@)
- These may have lower engagement rates

### Typo Suggestions
The system detects common typos and suggests corrections:
- gmail.con → gmail.com
- gmial.com → gmail.com
- yahooo.com → yahoo.com
- hotmial.com → hotmail.com

## Best Practices

### Before Sending

1. **Test with Small Group First**
   - Send to 5-10 addresses first
   - Verify formatting and delivery
   - Check spam folder placement

2. **Always Run Preview**
   - Never skip the validation step
   - Fix all invalid emails
   - Consider removing unsafe emails

3. **Personalization**
   - Use recipient names for better engagement
   - Keep messages personal and relevant

### Email Content

1. **Subject Lines**
   - Clear and descriptive
   - Avoid spam trigger words (FREE, URGENT, etc.)
   - Keep under 50 characters

2. **Message Body**
   - Keep it concise and relevant
   - Include clear call-to-action
   - Add unsubscribe information

3. **Timing**
   - Avoid sending during odd hours
   - Consider time zones
   - Don't send too frequently

### SMTP Considerations

1. **Rate Limits**
   - Gmail: ~100-500 emails per day (varies)
   - Consider professional SMTP for larger volumes
   - System batches automatically to help

2. **Sender Reputation**
   - High bounce rates hurt sender reputation
   - Always validate emails first
   - Monitor bounce rates

3. **Email Authentication**
   - Ensure SPF, DKIM, DMARC are configured
   - Use matching FROM_EMAIL domain
   - Verify sender domain ownership

## Troubleshooting

### Login Issues
- **"Invalid credentials"**: Check DASHBOARD_USERNAME and DASHBOARD_PASSWORD_HASH
- **"Authentication not configured"**: Ensure environment variables are set
- **Session expired**: Log in again (24-hour session timeout)

### Email Sending Issues

**"No valid email addresses found"**
- All emails failed validation
- Check email format
- Run preview to see specific issues

**"Email sending failed"**
- Check SMTP credentials
- Verify SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS
- Check SMTP server status
- Review daily sending limits

**Some emails failed**
- Normal for large batches
- Check individual error messages
- May be temporary SMTP issues
- Can retry failed emails

### File Upload Issues

**"Error reading file"**
- Ensure file is valid Excel format (.xlsx, .xls, .csv)
- Check file isn't corrupted
- Try saving in different format

**Columns not showing**
- Ensure first row contains headers
- Check file isn't empty
- Verify data format

## Security Notes

1. **Password Security**
   - Use strong, unique password
   - Password is hashed with bcrypt
   - Never share credentials

2. **Session Management**
   - Sessions expire after 24 hours
   - Logout when finished
   - Sessions are cookie-based

3. **Access Control**
   - Dashboard requires authentication
   - No public access to email features
   - One admin user per deployment

4. **Data Privacy**
   - Email data is not stored permanently
   - Recipients list cleared after sending
   - No logging of email content

## Support

For issues or questions:
- Review this guide
- Check environment variables
- Verify SMTP configuration
- Contact technical team if issues persist

## Advanced Tips

### Large Email Lists
For lists over 100 recipients:
1. Split into smaller batches
2. Send in multiple sessions
3. Consider professional SMTP service
4. Monitor deliverability closely

### Email Templates
Create reusable templates:
1. Save template text in a file
2. Copy/paste into message field
3. Customize as needed
4. Remember to use {name} placeholder

### Tracking Success
Monitor email campaign success:
- Track bounce rates
- Monitor spam complaints
- Check engagement metrics
- Adjust content based on feedback

---

**Remember**: Always test first, validate thoroughly, and send responsibly!
