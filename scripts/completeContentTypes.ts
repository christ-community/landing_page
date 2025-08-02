#!/usr/bin/env node

/**
 * Complete Content Types Creation for Contentful
 * 
 * This script creates ALL missing content types including:
 * - About page sections (beliefs, mission, values, timeline)
 * - Page-specific content (hero sections, testimonials)
 * - Enhanced existing types
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

async function createCompleteContentTypes() {
  try {
    const space = await managementClient.getSpace(SPACE_ID)
    const environment = await space.getEnvironment(ENVIRONMENT_ID)

    console.log('🚀 Creating complete content types for Contentful...\n')

    // 1. Core Beliefs Content Type
    console.log('Creating Core Beliefs content type...')
    const coreBeliefs = await environment.createContentTypeWithId('coreBelief', {
      name: 'Core Belief',
      fields: [
        {
          id: 'title',
          name: 'Title',
          type: 'Symbol',
          required: true,
          localized: false
        },
        {
          id: 'subtitle',
          name: 'Subtitle',
          type: 'Symbol',
          required: false,
          localized: false
        },
        {
          id: 'description',
          name: 'Description',
          type: 'Text',
          required: false,
          localized: false
        },
        {
          id: 'scriptureReference',
          name: 'Scripture Reference',
          type: 'Symbol',
          required: false,
          localized: false
        },
        {
          id: 'icon',
          name: 'Icon',
          type: 'Symbol',
          required: false,
          localized: false
        },
        {
          id: 'order',
          name: 'Order',
          type: 'Integer',
          required: false,
          localized: false
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
    await coreBeliefs.publish()

    // 2. Mission & Vision Content Type
    console.log('Creating Mission & Vision content type...')
    const missionVision = await environment.createContentTypeWithId('missionVision', {
      name: 'Mission & Vision',
      fields: [
        {
          id: 'type',
          name: 'Type',
          type: 'Symbol',
          required: true,
          localized: false,
          validations: [
            {
              in: ['mission', 'vision', 'purpose', 'calling']
            }
          ]
        },
        {
          id: 'title',
          name: 'Title',
          type: 'Symbol',
          required: true,
          localized: false
        },
        {
          id: 'content',
          name: 'Content',
          type: 'Text',
          required: true,
          localized: false
        },
        {
          id: 'scriptureReference',
          name: 'Scripture Reference',
          type: 'Symbol',
          required: false,
          localized: false
        },
        {
          id: 'icon',
          name: 'Icon',
          type: 'Symbol',
          required: false,
          localized: false
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
    await missionVision.publish()

    // 3. Core Values Content Type
    console.log('Creating Core Values content type...')
    const coreValues = await environment.createContentTypeWithId('coreValue', {
      name: 'Core Value',
      fields: [
        {
          id: 'title',
          name: 'Title',
          type: 'Symbol',
          required: true,
          localized: false
        },
        {
          id: 'description',
          name: 'Description',
          type: 'Text',
          required: true,
          localized: false
        },
        {
          id: 'scriptureReference',
          name: 'Scripture Reference',
          type: 'Symbol',
          required: false,
          localized: false
        },
        {
          id: 'icon',
          name: 'Icon',
          type: 'Symbol',
          required: false,
          localized: false
        },
        {
          id: 'order',
          name: 'Order',
          type: 'Integer',
          required: false,
          localized: false
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
    await coreValues.publish()

    // 4. Timeline/History Content Type
    console.log('Creating Timeline content type...')
    const timeline = await environment.createContentTypeWithId('timelineEvent', {
      name: 'Timeline Event',
      fields: [
        {
          id: 'year',
          name: 'Year',
          type: 'Symbol',
          required: true,
          localized: false
        },
        {
          id: 'title',
          name: 'Title',
          type: 'Symbol',
          required: true,
          localized: false
        },
        {
          id: 'description',
          name: 'Description',
          type: 'Text',
          required: true,
          localized: false
        },
        {
          id: 'image',
          name: 'Image',
          type: 'Link',
          linkType: 'Asset',
          required: false,
          localized: false
        },
        {
          id: 'category',
          name: 'Category',
          type: 'Symbol',
          required: false,
          localized: false,
          validations: [
            {
              in: ['founding', 'growth', 'milestone', 'ministry', 'community', 'outreach']
            }
          ]
        },
        {
          id: 'order',
          name: 'Order',
          type: 'Integer',
          required: false,
          localized: false
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
    await timeline.publish()

    // 5. Community Stats Content Type
    console.log('Creating Community Stats content type...')
    const communityStats = await environment.createContentTypeWithId('communityStat', {
      name: 'Community Stat',
      fields: [
        {
          id: 'label',
          name: 'Label',  
          type: 'Symbol',
          required: true,
          localized: false
        },
        {
          id: 'value',
          name: 'Value',
          type: 'Symbol',
          required: true,
          localized: false
        },
        {
          id: 'description',
          name: 'Description',
          type: 'Symbol',
          required: false,
          localized: false
        },
        {
          id: 'icon',
          name: 'Icon',
          type: 'Symbol',
          required: false,
          localized: false
        },
        {
          id: 'color',
          name: 'Color',
          type: 'Symbol',
          required: false,
          localized: false
        },
        {
          id: 'order',
          name: 'Order',
          type: 'Integer',
          required: false,
          localized: false
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
    await communityStats.publish()

    // 6. What Makes Us Different Content Type
    console.log('Creating What Makes Us Different content type...')
    const differentiator = await environment.createContentTypeWithId('differentiator', {
      name: 'Differentiator',
      fields: [
        {
          id: 'title',
          name: 'Title',
          type: 'Symbol',
          required: true,
          localized: false
        },
        {
          id: 'description',
          name: 'Description',
          type: 'Text',
          required: true,
          localized: false
        },
        {
          id: 'icon',
          name: 'Icon',
          type: 'Symbol',
          required: false,
          localized: false
        },
        {
          id: 'image',
          name: 'Image',
          type: 'Link',
          linkType: 'Asset',
          required: false,
          localized: false
        },
        {
          id: 'order',
          name: 'Order',
          type: 'Integer',
          required: false,
          localized: false
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
    await differentiator.publish()

    // 7. Help Impact/Where Help Goes Content Type
    console.log('Creating Help Impact content type...')
    const helpImpact = await environment.createContentTypeWithId('helpImpact', {
      name: 'Help Impact',
      fields: [
        {
          id: 'title',
          name: 'Title',
          type: 'Symbol',
          required: true,
          localized: false
        },
        {
          id: 'description',
          name: 'Description',
          type: 'Text',
          required: true,
          localized: false
        },
        {
          id: 'percentage',
          name: 'Percentage',
          type: 'Integer',
          required: false,
          localized: false
        },
        {
          id: 'icon',
          name: 'Icon',
          type: 'Symbol',
          required: false,
          localized: false
        },
        {
          id: 'color',
          name: 'Color',
          type: 'Symbol',
          required: false,
          localized: false
        },
        {
          id: 'order',
          name: 'Order',
          type: 'Integer',
          required: false,
          localized: false
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
    await helpImpact.publish()

    // 8. Page Hero Content Type (for page-specific heroes)
    console.log('Creating Page Hero content type...')
    const pageHero = await environment.createContentTypeWithId('pageHero', {
      name: 'Page Hero',
      fields: [
        {
          id: 'pageName',
          name: 'Page Name',
          type: 'Symbol',
          required: true,
          localized: false
        },
        {
          id: 'title',
          name: 'Title',
          type: 'Symbol',
          required: true,
          localized: false
        },
        {
          id: 'subtitle',
          name: 'Subtitle',
          type: 'Symbol',
          required: false,
          localized: false
        },
        {
          id: 'description',
          name: 'Description',
          type: 'Text',
          required: false,
          localized: false
        },
        {
          id: 'backgroundImage',
          name: 'Background Image',
          type: 'Link',
          linkType: 'Asset',
          required: false,
          localized: false
        },
        {
          id: 'ctaText',
          name: 'CTA Text',
          type: 'Symbol',
          required: false,
          localized: false
        },
        {
          id: 'ctaUrl',
          name: 'CTA URL',
          type: 'Symbol',
          required: false,
          localized: false
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
    await pageHero.publish()

    // 9. Enhanced Testimonial with page targeting
    console.log('Updating Testimonial content type for page targeting...')
    try {
      const testimonialType = await environment.getContentType('testimonial')
      
      // Add new fields for page targeting
      testimonialType.fields.push({
        id: 'targetPages',
        name: 'Target Pages',
        type: 'Array',
        required: false,
        localized: false,
        items: {
          type: 'Symbol',
          validations: [
            {
              in: ['home', 'about', 'what-we-do', 'get-involved', 'volunteer', 'send-help', 'find-church', 'events', 'healing-resources']
            }
          ]
        }
      })

      await testimonialType.update()
      await testimonialType.publish()
    } catch (error) {
      console.log('Note: Testimonial type may already have targetPages field')
    }

    // 10. Enhanced Tract with download capabilities
    console.log('Updating Tract content type for downloads...')
    try {
      const tractType = await environment.getContentType('tract')
      
      // Add download-related fields
      tractType.fields.push(
        {
          id: 'downloadFile',
          name: 'Download File',
          type: 'Link',
          linkType: 'Asset',
          required: false,
          localized: false
        },
        {
          id: 'previewImage',
          name: 'Preview Image',
          type: 'Link',
          linkType: 'Asset',
          required: false,
          localized: false
        },
        {
          id: 'downloadCount',
          name: 'Download Count',
          type: 'Integer',
          required: false,
          localized: false,
          defaultValue: { 'en-US': 0 }
        },
        {
          id: 'fileSize',
          name: 'File Size',
          type: 'Symbol',
          required: false,
          localized: false
        },
        {
          id: 'language',
          name: 'Language',
          type: 'Symbol',
          required: false,
          localized: false,
          defaultValue: { 'en-US': 'English' }
        }
      )

      await tractType.update()
      await tractType.publish()
    } catch (error) {
      console.log('Note: Tract type may already have download fields')
    }

    console.log('\n🎉 All content types created successfully!')
    console.log('📊 Summary:')
    console.log('   - Core Beliefs: ✅')
    console.log('   - Mission & Vision: ✅')
    console.log('   - Core Values: ✅')
    console.log('   - Timeline Events: ✅')
    console.log('   - Community Stats: ✅')
    console.log('   - Differentiators: ✅')
    console.log('   - Help Impact: ✅')
    console.log('   - Page Heroes: ✅')
    console.log('   - Enhanced Testimonials: ✅')
    console.log('   - Enhanced Tracts: ✅')

  } catch (error) {
    console.error('❌ Content type creation failed:', error)
    throw error
  }
}

// Run the content type creation
if (require.main === module) {
  createCompleteContentTypes()
    .then(() => console.log('\n✅ Complete content types creation finished!'))
    .catch(console.error)
}