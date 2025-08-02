# Contentful Integration Setup Guide

This guide will help you set up Contentful CMS for your Christ Community landing page.

## Prerequisites

1. **Contentful Account**: Sign up at [contentful.com](https://www.contentful.com)
2. **Space**: Create a new space in your Contentful account
3. **API Keys**: Generate the required API keys (see below)

## Step 1: Create Contentful Space and Get API Keys

### 1.1 Create a Space
1. Log into your Contentful account
2. Click "Create space"
3. Choose "Free" plan
4. Name your space (e.g., "Christ Community Website")
5. Click "Create space"

### 1.2 Get API Keys
1. Go to **Settings** → **API keys**
2. Click **Add API key**
3. Name it (e.g., "Website Integration")
4. Copy the following values:

- **Space ID**: Found at the top of the API keys page
- **Content Delivery API - access token**: For fetching published content
- **Content Preview API - access token**: For fetching draft content
5. Go to **Settings** → **API keys** → **Content management tokens**
6. Click **Generate personal token**
7. Copy the **Content Management API - access token**: For creating/updating content

## Step 2: Environment Configuration

### 2.1 Create Environment File
1. Copy `.env.template` to `.env.local`
2. Fill in your Contentful API keys:

```bash
# Copy the template
cp .env.template .env.local
```

### 2.2 Update Environment Variables
Edit `.env.local` with your actual values:

```env
# Contentful Configuration
CONTENTFUL_SPACE_ID=your_actual_space_id
CONTENTFUL_ACCESS_TOKEN=your_actual_delivery_token
CONTENTFUL_PREVIEW_ACCESS_TOKEN=your_actual_preview_token
CONTENTFUL_MANAGEMENT_TOKEN=your_actual_management_token
```

## Step 3: Install Dependencies

Install the required packages:

```bash
npm install
```

## Step 4: Run Contentful Setup

### 4.1 Complete Setup (Recommended)
Run the complete setup script that will:
- Validate your environment
- Create all content types
- Migrate existing content
- Set up webhooks
- Validate the setup

```bash
npm run contentful:setup
```

### 4.2 Manual Setup (Advanced)
If you prefer to run steps individually:

#### Create Content Types
```bash
npm run contentful:create-models
```

#### Migrate Content
```bash
npm run contentful:migrate
```

#### Validate Setup
```bash
npm run contentful:validate
```

## Step 5: Verify Installation

### 5.1 Check Contentful Web App
1. Go to your Contentful space
2. Click on **Content model**
3. You should see 17 content types:
   - Page Content
   - Team Member
   - Blog Post
   - Event
   - Ministry Activity
   - Testimonial
   - Navigation Item
   - Site Settings
   - Category
   - Event Category
   - Volunteer Opportunity
   - Involvement Option
   - Tract
   - Church
   - Resource
   - Newsletter
   - FAQ

### 5.2 Check Content
1. Click on **Content**
2. You should see sample content entries for each content type

### 5.3 Test Your Application
```bash
npm run dev
```

Visit http://localhost:3000 to see your site pulling content from Contentful.

## Step 6: Managing Content

### 6.1 Editing Content
1. Go to your Contentful space
2. Click **Content**
3. Click on any entry to edit
4. Make changes and click **Publish**
5. Your website will automatically update

### 6.2 Adding New Content
1. Click **Add entry**
2. Choose a content type
3. Fill in the fields
4. Click **Publish**

## Advanced Features

### Environments
Create staging environments for testing:

```bash
# Create staging environment
npm run contentful:deploy create-env staging

# Deploy to production from staging
npm run contentful:deploy deploy --source staging
```

### Webhooks
The setup script can automatically configure webhooks to rebuild your site when content changes. Make sure to set:

```env
WEBHOOK_URL=https://your-app.vercel.app/api/revalidate
WEBHOOK_SECRET=your_webhook_secret
```

## Troubleshooting

### Common Issues

#### "Space not found" error
- Verify your `CONTENTFUL_SPACE_ID` is correct
- Make sure the space exists in your account

#### "Unauthorized" error
- Check your API tokens are correct
- Ensure the Management API token has the right permissions

#### "Content type already exists" error
- Content types might already exist
- Run with `--skip-content-types` flag: `npm run contentful:setup -- --skip-content-types`

#### Missing content
- Run the migration script: `npm run contentful:migrate`
- Or run full setup: `npm run contentful:setup`

### Getting Help

1. Check the [Contentful Documentation](https://www.contentful.com/developers/docs/)
2. Review the setup logs for specific error messages
3. Ensure all environment variables are correctly set

## Content Types Reference

### Core Content Types
- **Page Content**: General page information (titles, descriptions, CTAs)
- **Site Settings**: Global site configuration
- **Navigation Item**: Menu structure and navigation

### Team & Community
- **Team Member**: Staff and leadership information
- **Testimonial**: Community testimonials and stories

### Events & Activities  
- **Event**: Upcoming events and services
- **Ministry Activity**: Different ministry programs
- **Event Category**: Event categorization

### Resources & Content
- **Blog Post**: Blog articles and news
- **Resource**: Downloadable resources and materials
- **FAQ**: Frequently asked questions
- **Category**: Content categorization

### Get Involved
- **Volunteer Opportunity**: Ways to volunteer and serve
- **Involvement Option**: General involvement opportunities
- **Church**: Church directory for "Find a Church"
- **Tract**: Available tracts for ordering

### Utility
- **Newsletter**: Newsletter signup configuration

Each content type is designed to match the existing hardcoded content in your components, making the migration seamless.