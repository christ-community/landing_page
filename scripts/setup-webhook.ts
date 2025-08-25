#!/usr/bin/env ts-node

import { createClient } from 'contentful-management'
import * as dotenv from 'dotenv'
import * as path from 'path'

dotenv.config({ path: path.resolve(process.cwd(), '.env.local') })

const WEBHOOK_SECRET = process.env.WEBHOOK_SECRET!
const WEBHOOK_URL = process.env.WEBHOOK_URL!
const SPACE_ID = process.env.CONTENTFUL_SPACE_ID!
const MANAGEMENT_TOKEN = process.env.CONTENTFUL_MANAGEMENT_TOKEN!

if (!process.env.WEBHOOK_SECRET || !process.env.WEBHOOK_URL || !process.env.CONTENTFUL_SPACE_ID || !process.env.CONTENTFUL_MANAGEMENT_TOKEN) {
  console.log('⚠️  Skipping webhook setup - missing required environment variables:')
  if (!process.env.WEBHOOK_SECRET) console.log('  - WEBHOOK_SECRET')
  if (!process.env.WEBHOOK_URL) console.log('  - WEBHOOK_URL') 
  if (!process.env.CONTENTFUL_SPACE_ID) console.log('  - CONTENTFUL_SPACE_ID')
  if (!process.env.CONTENTFUL_MANAGEMENT_TOKEN) console.log('  - CONTENTFUL_MANAGEMENT_TOKEN')
  console.log('')
  console.log('💡 To enable automatic webhook setup during deployment:')
  console.log('   1. Add these environment variables to your deployment platform')
  console.log('   2. Redeploy your application')
  console.log('   3. Webhook will be configured automatically')
  process.exit(0)
}

async function setupWebhook() {
  try {
    console.log('🚀 Setting up Contentful webhook...')
    
    // Check if URL is localhost (not supported by Contentful)
    if (WEBHOOK_URL.includes('localhost') || WEBHOOK_URL.includes('127.0.0.1')) {
      console.log('⚠️  Skipping webhook setup - localhost URLs are not supported by Contentful')
      console.log('💡 This will work automatically when you deploy to production')
      return
    }

    const client = createClient({
      accessToken: MANAGEMENT_TOKEN
    })

    const space = await client.getSpace(SPACE_ID)

    // Check if webhook already exists
    const webhooks = await space.getWebhooks()
    const existingWebhook = webhooks.items.find(
      webhook => webhook.url === WEBHOOK_URL
    )

    if (existingWebhook) {
      console.log('📝 Updating existing webhook...')
      
      existingWebhook.url = WEBHOOK_URL
      existingWebhook.name = 'Next.js ISR Revalidation'
      existingWebhook.topics = [
        'Entry.publish',
        'Entry.unpublish',
        'Entry.archive',
        'Entry.unarchive',
        'Entry.save',
        'Entry.auto_save',
        'Entry.create',
        'Entry.delete',
        'Asset.publish',
        'Asset.unpublish',
        'Asset.archive',
        'Asset.unarchive',
        'Asset.create',
        'Asset.save',
        'Asset.auto_save',
        'Asset.delete'
      ]
      existingWebhook.headers = [
        {
          key: 'Authorization',
          value: `Bearer ${WEBHOOK_SECRET}`
        }
      ]
      
      const updated = await existingWebhook.update()
      console.log('✅ Webhook updated successfully!')
      console.log(`   URL: ${updated.url}`)
      console.log(`   ID: ${updated.sys.id}`)
    } else {
      console.log('🆕 Creating new webhook...')
      
      const webhook = await space.createWebhook({
        name: 'Next.js ISR Revalidation',
        url: WEBHOOK_URL,
        topics: [
          'Entry.publish',
          'Entry.unpublish', 
          'Entry.archive',
          'Entry.unarchive',
          'Entry.save',
          'Entry.auto_save',
          'Entry.create',
          'Entry.delete',
          'Asset.publish',
          'Asset.unpublish',
          'Asset.archive', 
          'Asset.unarchive',
          'Asset.create',
          'Asset.save',
          'Asset.auto_save',
          'Asset.delete'
        ],
        headers: [
          {
            key: 'Authorization',
            value: `Bearer ${WEBHOOK_SECRET}`
          }
        ]
      })
      
      console.log('✅ Webhook created successfully!')
      console.log(`   URL: ${webhook.url}`)
      console.log(`   ID: ${webhook.sys.id}`)
    }
    
    console.log('\n🎉 Webhook setup complete!')
    console.log('\n📋 Next steps:')
    console.log('1. Deploy your application to production')
    console.log('2. Update WEBHOOK_URL in your production environment variables')
    console.log('3. Re-run this script with production URL if needed')
    console.log('4. Test by making changes in Contentful')
    
  } catch (error) {
    console.error('❌ Error setting up webhook:', error)
    process.exit(1)
  }
}

// Run the setup
setupWebhook()