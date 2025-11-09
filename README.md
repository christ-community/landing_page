# Christ Community Landing Page

Landing page for Christ Community built with Next.js, Tailwind CSS, and shadcn/ui.

## Getting Started

### Environment Setup

Copy the environment file:
```bash
cp .env.example .env
```

Required environment variables:
- `CONTENTFUL_SPACE_ID` - Contentful space ID
- `CONTENTFUL_ACCESS_TOKEN` - Contentful access token
- `CONTENTFUL_MANAGEMENT_TOKEN` - Contentful management token
- `SMTP_HOST` - SMTP server host (default: smtp.gmail.com)
- `SMTP_PORT` - SMTP server port (default: 587)
- `SMTP_USER` - SMTP username/email
- `SMTP_PASS` - SMTP password
- `FROM_EMAIL` - Email sender address
- `CONTACT_EMAIL` - Email recipient for contact forms
- `STRIPE_SECRET_KEY` - Stripe secret key
- `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` - Stripe publishable key
- `GOOGLE_MAPS_API_KEY` - Google Maps API key
- `DASHBOARD_USERNAME` - Dashboard admin username
- `DASHBOARD_PASSWORD_HASH` - Dashboard admin password hash

### Installation & Running

```bash
# Install dependencies
npm install

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the site.

## Custom Colors

The project uses Christ Community's official colors:
- **Primary**: White (`bg-primary`, `text-primary`)
- **Secondary**: Black (`bg-secondary`, `text-secondary`) 
- **Tertiary**: Red (`bg-tertiary`, `text-tertiary`)

## Dashboard

The project includes an admin dashboard for sending bulk emails at `/dashboard`.

### Setup Dashboard Authentication

1. Generate a password hash:
```bash
node scripts/generate-password-hash.js your_secure_password
```

2. Add the credentials to your `.env` file:
```bash
DASHBOARD_USERNAME=admin
DASHBOARD_PASSWORD_HASH=<hash_from_step_1>
```

3. Access the dashboard at: `http://localhost:3000/dashboard`

### Dashboard Features

- **Bulk Email Sending**: Upload Excel files or manually enter recipient lists
- **Email Validation**: Comprehensive validation to prevent bounces
- **Preview Mode**: Dry run to preview emails before sending
- **Batch Processing**: Controlled email sending to prevent SMTP throttling
- **Results Tracking**: Detailed reports on email delivery

### Using the Bulk Email Feature

1. Log in to the dashboard with your credentials
2. Upload an Excel file (xlsx, xls, csv) with recipient data
3. Select which columns contain email addresses and names
4. Compose your email subject and message (use `{name}` for personalization)
5. Click "Preview & Validate" to check emails before sending
6. Review validation results and fix any invalid emails
7. Click "Send Emails" to send to all valid recipients

**Email Validation Features:**
- Syntax validation (RFC 5322 compliant)
- Domain structure validation
- Disposable email detection
- Role-based email detection
- Common typo suggestions

## Documentation

- [GitHub Copilot Instructions](.github/copilot-instructions.md) - Comprehensive guide for AI assistants
- [Agents Documentation](.github/agents.md) - Information about automation agents and workflows


