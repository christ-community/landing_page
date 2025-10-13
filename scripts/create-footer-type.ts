#!/usr/bin/env node

/**
 * Create Footer Content Type for Contentful
 * 
 * This script creates the footer content type that was added to the codebase
 */

import * as dotenv from 'dotenv'
import * as path from 'path'
import { createClient } from 'contentful-management'

// Load environment variables
dotenv.config({ path: path.resolve(process.cwd(), '.env.local') })

const managementClient = createClient({
  accessToken: process.env.CONTENTFUL_MANAGEMENT_TOKEN!,
})

const SPACE_ID = process.env.CONTENTFUL_SPACE_ID!
const ENVIRONMENT_ID = 'master'

async function createFooterContentType() {
  try {
    const space = await managementClient.getSpace(SPACE_ID)
    const environment = await space.getEnvironment(ENVIRONMENT_ID)

    console.log('🚀 Creating Footer content type for Contentful...\n')

    // Footer Content Type
    console.log('Creating Footer content type...')
    const footer = await environment.createContentTypeWithId('footer', {
      name: 'Footer',
      fields: [
        {
          id: 'churchInfo',
          name: 'Community Information',
          type: 'Object',
          required: true,
          localized: false
        },
        {
          id: 'quickLinks',
          name: 'Quick Links',
          type: 'Array',
          required: false,
          localized: false,
          items: {
            type: 'Object'
          }
        },
        {
          id: 'contactInfo',
          name: 'Contact Information', 
          type: 'Object',
          required: true,
          localized: false
        },
        {
          id: 'serviceTimes',
          name: 'Service Times',
          type: 'Array',
          required: false,
          localized: false,
          items: {
            type: 'Object'
          }
        },
        {
          id: 'copyrightText',
          name: 'Copyright Text',
          type: 'Symbol',
          required: true,
          localized: false
        },
        {
          id: 'legalLinks',
          name: 'Legal Links',
          type: 'Array',
          required: false,
          localized: false,
          items: {
            type: 'Object'
          }
        },
        {
          id: 'isActive',
          name: 'Is Active',
          type: 'Boolean',
          required: false,
          localized: false,
          defaultValue: { 'en-US': true }
        }
      ]
    })
    await footer.publish()

    console.log('\n🎉 Footer content type created successfully!')
    console.log('📊 Summary:')
    console.log('   - Footer: ✅')
    console.log('\n💡 Next steps:')
    console.log('   1. Go to Contentful web app')
    console.log('   2. Create a Footer entry with your community information')
    console.log('   3. The website will automatically use this data')

  } catch (error: unknown) {
    if (error instanceof Error && error.message.includes('already exists')) {
      console.log('✅ Footer content type already exists!')
    } else {
      console.error('❌ Footer content type creation failed:', error)
      throw error
    }
  }
}

// Run the content type creation
if (require.main === module) {
  createFooterContentType()
    .then(() => console.log('\n✅ Footer content type creation finished!'))
    .catch(console.error)
}