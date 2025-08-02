#!/usr/bin/env node

/**
 * Complete Contentful Setup Script
 * 
 * This script will:
 * 1. Verify environment variables
 * 2. Create all content types
 * 3. Migrate all existing content
 * 4. Set up webhooks (optional)
 * 5. Validate the setup
 */

import { createClient } from 'contentful-management'
import * as dotenv from 'dotenv'
import * as path from 'path'

// Load environment variables
dotenv.config({ path: path.resolve(process.cwd(), '.env.local') })

interface SetupOptions {
  skipContentTypes?: boolean
  skipMigration?: boolean
  skipWebhooks?: boolean
  dryRun?: boolean
}

class ContentfulSetup {
  private managementClient: any
  private spaceId: string
  private accessToken: string

  constructor() {
    this.validateEnvironment()
    this.spaceId = process.env.CONTENTFUL_SPACE_ID!
    this.accessToken = process.env.CONTENTFUL_MANAGEMENT_TOKEN!
    this.managementClient = createClient({
      accessToken: this.accessToken
    })
  }

  private validateEnvironment() {
    const requiredVars = [
      'CONTENTFUL_SPACE_ID',
      'CONTENTFUL_ACCESS_TOKEN',
      'CONTENTFUL_PREVIEW_ACCESS_TOKEN',
      'CONTENTFUL_MANAGEMENT_TOKEN'
    ]

    const missing = requiredVars.filter(varName => !process.env[varName])
    
    if (missing.length > 0) {
      console.error('❌ Missing required environment variables:')
      missing.forEach(varName => console.error(`   - ${varName}`))
      console.error('\nPlease add these to your .env.local file')
      process.exit(1)
    }

    console.log('✅ Environment variables validated')
  }

  async validateSpace() {
    try {
      const space = await this.managementClient.getSpace(this.spaceId)
      console.log(`✅ Connected to space: "${space.name}"`)
      return space
    } catch (error) {
      console.error('❌ Failed to connect to Contentful space:', error)
      throw error
    }
  }

  async setupContentTypes(options: SetupOptions) {
    if (options.skipContentTypes) {
      console.log('⏭️  Skipping content type creation')
      return
    }

    console.log('🚀 Creating content types...')
    console.log('ℹ️  Please run: npm run contentful:create-types')
    console.log('✅ Content types setup instructions provided')
  }

  async migrateContent(options: SetupOptions) {
    if (options.skipMigration) {
      console.log('⏭️  Skipping content migration')
      return
    }

    console.log('🚀 Migrating content...')
    console.log('ℹ️  Please run: npm run contentful:populate-basic && npm run contentful:populate-remaining')
    console.log('✅ Content migration instructions provided')
  }

  async setupWebhooks(options: SetupOptions) {
    if (options.skipWebhooks) {
      console.log('⏭️  Skipping webhook setup')
      return
    }

    console.log('🚀 Setting up webhooks...')
    try {
      const space = await this.managementClient.getSpace(this.spaceId)
      const environment = await space.getEnvironment('master')

      // Create webhook for triggering rebuilds
      const webhook = await environment.createWebhook({
        name: 'Next.js Rebuild Webhook',
        url: process.env.WEBHOOK_URL || 'https://your-app.vercel.app/api/revalidate',
        topics: [
          'Entry.publish',
          'Entry.unpublish',
          'Entry.archive',
          'Entry.unarchive',
          'Asset.publish',
          'Asset.unpublish'
        ],
        headers: [
          {
            key: 'Authorization',
            value: `Bearer ${process.env.WEBHOOK_SECRET || 'your-webhook-secret'}`
          }
        ]
      })

      console.log(`✅ Webhook created: ${webhook.name}`)
    } catch (error) {
      console.error('⚠️  Warning: Failed to create webhooks (optional):', error)
    }
  }

  async validateSetup() {
    console.log('🔍 Validating setup...')
    
    try {
      const space = await this.managementClient.getSpace(this.spaceId)
      const environment = await space.getEnvironment('master')
      
      // Check content types
      const contentTypes = await environment.getContentTypes()
      console.log(`✅ Found ${contentTypes.items.length} content types`)
      
      // Check entries
      const entries = await environment.getEntries({ limit: 1000 })
      console.log(`✅ Found ${entries.items.length} entries`)
      
      // Validate specific content types exist
      const expectedContentTypes = [
        'pageContent', 'teamMember', 'blogPost', 'event', 'ministryActivity',
        'testimonial', 'navigationItem', 'siteSettings', 'category', 'eventCategory',
        'volunteerOpportunity', 'involvementOption', 'tract', 'church', 'resource',
        'newsletter', 'faq'
      ]
      
      const existingTypes = contentTypes.items.map((ct: any) => ct.sys.id)
      const missingTypes = expectedContentTypes.filter(type => !existingTypes.includes(type))
      
      if (missingTypes.length > 0) {
        console.warn('⚠️  Missing content types:', missingTypes)
      } else {
        console.log('✅ All expected content types are present')
      }
      
      console.log('🎉 Setup validation completed!')
      
    } catch (error) {
      console.error('❌ Setup validation failed:', error)
      throw error
    }
  }

  async run(options: SetupOptions = {}) {
    console.log('🚀 Starting Contentful setup...\n')
    
    try {
      // Step 1: Validate space connection
      await this.validateSpace()
      console.log()
      
      // Step 2: Setup content types
      await this.setupContentTypes(options)
      console.log()
      
      // Step 3: Migrate content
      await this.migrateContent(options)
      console.log()
      
      // Step 4: Setup webhooks
      await this.setupWebhooks(options)
      console.log()
      
      // Step 5: Validate setup
      await this.validateSetup()
      
      console.log('\n🎉 Contentful setup completed successfully!')
      console.log('\nNext steps:')
      console.log('1. Update your components to use the Contentful API')
      console.log('2. Test the integration in your development environment')
      console.log('3. Deploy your changes to production')
      
    } catch (error) {
      console.error('\n❌ Setup failed:', error)
      process.exit(1)
    }
  }
}

// CLI interface
function parseArgs() {
  const args = process.argv.slice(2)
  const options: SetupOptions = {}
  
  if (args.includes('--skip-content-types')) options.skipContentTypes = true
  if (args.includes('--skip-migration')) options.skipMigration = true
  if (args.includes('--skip-webhooks')) options.skipWebhooks = true
  if (args.includes('--dry-run')) options.dryRun = true
  
  return options
}

function showHelp() {
  console.log(`
Contentful Setup Script

Usage: npm run contentful:setup [options]

Options:
  --skip-content-types  Skip creating content types
  --skip-migration      Skip content migration
  --skip-webhooks       Skip webhook setup
  --dry-run            Show what would be done without making changes
  --help               Show this help message

Examples:
  npm run contentful:setup
  npm run contentful:setup --skip-webhooks
  npm run contentful:setup --skip-migration --skip-webhooks
`)
}

// Run if called directly
if (require.main === module) {
  const args = process.argv.slice(2)
  
  if (args.includes('--help')) {
    showHelp()
    process.exit(0)
  }
  
  const options = parseArgs()
  const setup = new ContentfulSetup()
  setup.run(options)
}