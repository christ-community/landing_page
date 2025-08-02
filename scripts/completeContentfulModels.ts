import { createClient } from 'contentful-management'
import * as fs from 'fs'
import * as dotenv from 'dotenv'
import * as path from 'path'

// Load environment variables
dotenv.config({ path: path.resolve(process.cwd(), '.env.local') })

const managementClient = createClient({
  accessToken: process.env.CONTENTFUL_MANAGEMENT_TOKEN!
})

// COMPLETE Content Type Definitions for ALL components
const contentTypes = {
  // Core Page Content
  pageContent: {
    name: 'Page Content',
    fields: [
      { id: 'title', name: 'Title', type: 'Symbol', required: true },
      { id: 'subtitle', name: 'Subtitle', type: 'Symbol' },
      { id: 'description', name: 'Description', type: 'Text' },
      { id: 'heroImage', name: 'Hero Image', type: 'Link', linkType: 'Asset' },
      { id: 'backgroundImage', name: 'Background Image', type: 'Link', linkType: 'Asset' },
      { id: 'slug', name: 'Slug', type: 'Symbol', required: true },
      { id: 'seoTitle', name: 'SEO Title', type: 'Symbol' },
      { id: 'seoDescription', name: 'SEO Description', type: 'Text' },
      { id: 'ctaText', name: 'CTA Text', type: 'Symbol' },
      { id: 'ctaUrl', name: 'CTA URL', type: 'Symbol' }
    ]
  },
  
  // Team Member
  teamMember: {
    name: 'Team Member',
    fields: [
      { id: 'name', name: 'Name', type: 'Symbol', required: true },
      { id: 'role', name: 'Role', type: 'Symbol', required: true },
      { id: 'department', name: 'Department', type: 'Symbol', required: true },
      { id: 'bio', name: 'Bio', type: 'Text', required: true },
      { id: 'specialties', name: 'Specialties', type: 'Array', items: { type: 'Symbol' } },
      { id: 'yearsOfService', name: 'Years of Service', type: 'Integer' },
      { id: 'education', name: 'Education', type: 'Symbol' },
      { id: 'email', name: 'Email', type: 'Symbol' },
      { id: 'phone', name: 'Phone', type: 'Symbol' },
      { id: 'profileImage', name: 'Profile Image', type: 'Link', linkType: 'Asset' },
      { id: 'favoriteVerse', name: 'Favorite Verse', type: 'Symbol' },
      { id: 'order', name: 'Display Order', type: 'Integer' },
      { id: 'isActive', name: 'Is Active', type: 'Boolean', defaultValue: { 'en-US': true } }
    ]
  },

  // Blog Post
  blogPost: {
    name: 'Blog Post',
    fields: [
      { id: 'title', name: 'Title', type: 'Symbol', required: true },
      { id: 'slug', name: 'Slug', type: 'Symbol', required: true },
      { id: 'excerpt', name: 'Excerpt', type: 'Text', required: true },
      { id: 'content', name: 'Content', type: 'RichText', required: true },
      { id: 'author', name: 'Author', type: 'Link', linkType: 'Entry', validations: [{ linkContentType: ['teamMember'] }] },
      { id: 'publishDate', name: 'Publish Date', type: 'Date', required: true },
      { id: 'category', name: 'Category', type: 'Link', linkType: 'Entry', validations: [{ linkContentType: ['category'] }] },
      { id: 'featuredImage', name: 'Featured Image', type: 'Link', linkType: 'Asset' },
      { id: 'tags', name: 'Tags', type: 'Array', items: { type: 'Symbol' } },
      { id: 'seoTitle', name: 'SEO Title', type: 'Symbol' },
      { id: 'seoDescription', name: 'SEO Description', type: 'Text' },
      { id: 'isPublished', name: 'Is Published', type: 'Boolean', defaultValue: { 'en-US': true } },
      { id: 'isFeatured', name: 'Is Featured', type: 'Boolean', defaultValue: { 'en-US': false } }
    ]
  },

  // Event
  event: {
    name: 'Event',
    fields: [
      { id: 'title', name: 'Title', type: 'Symbol', required: true },
      { id: 'description', name: 'Description', type: 'Text', required: true },
      { id: 'date', name: 'Date', type: 'Date', required: true },
      { id: 'time', name: 'Time', type: 'Symbol' },
      { id: 'location', name: 'Location', type: 'Symbol' },
      { id: 'category', name: 'Category', type: 'Link', linkType: 'Entry', validations: [{ linkContentType: ['eventCategory'] }] },
      { id: 'featuredImage', name: 'Featured Image', type: 'Link', linkType: 'Asset' },
      { id: 'registrationUrl', name: 'Registration URL', type: 'Symbol' },
      { id: 'maxAttendees', name: 'Max Attendees', type: 'Integer' },
      { id: 'isRecurring', name: 'Is Recurring', type: 'Boolean' },
      { id: 'recurringPattern', name: 'Recurring Pattern', type: 'Symbol' },
      { id: 'isActive', name: 'Is Active', type: 'Boolean', defaultValue: { 'en-US': true } },
      { id: 'attendees', name: 'Expected Attendees', type: 'Integer' }
    ]
  },

  // Ministry Activity
  ministryActivity: {
    name: 'Ministry Activity',
    fields: [
      { id: 'title', name: 'Title', type: 'Symbol', required: true },
      { id: 'description', name: 'Description', type: 'Text', required: true },
      { id: 'icon', name: 'Icon', type: 'Symbol', required: true },
      { id: 'ctaText', name: 'CTA Text', type: 'Symbol' },
      { id: 'ctaUrl', name: 'CTA URL', type: 'Symbol' },
      { id: 'order', name: 'Display Order', type: 'Integer' },
      { id: 'isActive', name: 'Is Active', type: 'Boolean', defaultValue: { 'en-US': true } },
      { id: 'featuredImage', name: 'Featured Image', type: 'Link', linkType: 'Asset' },
      { id: 'detailedDescription', name: 'Detailed Description', type: 'RichText' }
    ]
  },

  // Testimonial
  testimonial: {
    name: 'Testimonial', 
    fields: [
      { id: 'name', name: 'Name', type: 'Symbol', required: true },
      { id: 'role', name: 'Role', type: 'Symbol', required: true },
      { id: 'quote', name: 'Quote', type: 'Text', required: true },
      { id: 'image', name: 'Image', type: 'Link', linkType: 'Asset' },
      { id: 'volunteeredSince', name: 'Volunteered Since', type: 'Symbol' },
      { id: 'favoriteActivity', name: 'Favorite Activity', type: 'Symbol' },
      { id: 'isActive', name: 'Is Active', type: 'Boolean', defaultValue: { 'en-US': true } },
      { id: 'order', name: 'Display Order', type: 'Integer' },
      { id: 'isHighlighted', name: 'Is Highlighted', type: 'Boolean', defaultValue: { 'en-US': false } }
    ]
  },

  // Navigation Item
  navigationItem: {
    name: 'Navigation Item',
    fields: [
      { id: 'label', name: 'Label', type: 'Symbol', required: true },
      { id: 'href', name: 'URL', type: 'Symbol', required: true },
      { id: 'icon', name: 'Icon', type: 'Symbol' },
      { id: 'description', name: 'Description', type: 'Text' },
      { id: 'parentMenu', name: 'Parent Menu', type: 'Link', linkType: 'Entry', validations: [{ linkContentType: ['navigationItem'] }] },
      { id: 'children', name: 'Children', type: 'Array', items: { type: 'Link', linkType: 'Entry', validations: [{ linkContentType: ['navigationItem'] }] } },
      { id: 'order', name: 'Display Order', type: 'Integer' },
      { id: 'isActive', name: 'Is Active', type: 'Boolean', defaultValue: { 'en-US': true } },
      { id: 'isExternal', name: 'Is External Link', type: 'Boolean', defaultValue: { 'en-US': false } }
    ]
  },

  // Site Settings
  siteSettings: {
    name: 'Site Settings',
    fields: [
      { id: 'siteName', name: 'Site Name', type: 'Symbol', required: true },
      { id: 'logoImage', name: 'Logo Image', type: 'Link', linkType: 'Asset' },
      { id: 'contactPhone', name: 'Contact Phone', type: 'Symbol' },
      { id: 'contactEmail', name: 'Contact Email', type: 'Symbol' },
      { id: 'emergencyPhone', name: 'Emergency Phone', type: 'Symbol' },
      { id: 'address', name: 'Address', type: 'Text' },
      { id: 'socialMediaLinks', name: 'Social Media Links', type: 'Text' },
      { id: 'footerText', name: 'Footer Text', type: 'Text' },
      { id: 'serviceTimes', name: 'Service Times', type: 'Text' },
      { id: 'officeHours', name: 'Office Hours', type: 'Symbol' },
      { id: 'missionStatement', name: 'Mission Statement', type: 'Text' }
    ]
  },

  // Category (for blog posts, resources, etc.)
  category: {
    name: 'Category',
    fields: [
      { id: 'name', name: 'Name', type: 'Symbol', required: true },
      { id: 'slug', name: 'Slug', type: 'Symbol', required: true },
      { id: 'description', name: 'Description', type: 'Text' },
      { id: 'color', name: 'Color', type: 'Symbol' },
      { id: 'icon', name: 'Icon', type: 'Symbol' },
      { id: 'order', name: 'Display Order', type: 'Integer' }
    ]
  },

  // Event Category
  eventCategory: {
    name: 'Event Category',
    fields: [
      { id: 'name', name: 'Name', type: 'Symbol', required: true },
      { id: 'slug', name: 'Slug', type: 'Symbol', required: true },
      { id: 'icon', name: 'Icon', type: 'Symbol' },
      { id: 'color', name: 'Color', type: 'Symbol' },
      { id: 'description', name: 'Description', type: 'Text' }
    ]
  },

  // Volunteer Opportunity
  volunteerOpportunity: {
    name: 'Volunteer Opportunity',
    fields: [
      { id: 'title', name: 'Title', type: 'Symbol', required: true },
      { id: 'description', name: 'Description', type: 'Text', required: true },
      { id: 'shortDescription', name: 'Short Description', type: 'Symbol' },
      { id: 'icon', name: 'Icon', type: 'Symbol' },
      { id: 'timeCommitment', name: 'Time Commitment', type: 'Symbol' },
      { id: 'location', name: 'Location', type: 'Symbol' }, // remote, onsite, hybrid
      { id: 'skillLevel', name: 'Skill Level', type: 'Symbol' }, // beginner, intermediate, advanced, any
      { id: 'category', name: 'Category', type: 'Symbol' },
      { id: 'requirements', name: 'Requirements', type: 'Array', items: { type: 'Symbol' } },
      { id: 'benefits', name: 'Benefits', type: 'Array', items: { type: 'Symbol' } },
      { id: 'tags', name: 'Tags', type: 'Array', items: { type: 'Symbol' } },
      { id: 'isPopular', name: 'Is Popular', type: 'Boolean', defaultValue: { 'en-US': false } },
      { id: 'isUrgent', name: 'Is Urgent', type: 'Boolean', defaultValue: { 'en-US': false } },
      { id: 'isActive', name: 'Is Active', type: 'Boolean', defaultValue: { 'en-US': true } },
      { id: 'contactEmail', name: 'Contact Email', type: 'Symbol' }
    ]
  },

  // Involvement Option (Get Involved section)
  involvementOption: {
    name: 'Involvement Option',
    fields: [
      { id: 'title', name: 'Title', type: 'Symbol', required: true },
      { id: 'description', name: 'Description', type: 'Text', required: true },
      { id: 'href', name: 'URL', type: 'Symbol', required: true },
      { id: 'icon', name: 'Icon', type: 'Symbol' },
      { id: 'bgColor', name: 'Background Color', type: 'Symbol' },
      { id: 'textColor', name: 'Text Color', type: 'Symbol' },
      { id: 'order', name: 'Display Order', type: 'Integer' },
      { id: 'isActive', name: 'Is Active', type: 'Boolean', defaultValue: { 'en-US': true } },
      { id: 'featuredImage', name: 'Featured Image', type: 'Link', linkType: 'Asset' }
    ]
  },

  // Tract (for Order a Tract section)
  tract: {
    name: 'Tract',
    fields: [
      { id: 'title', name: 'Title', type: 'Symbol', required: true },
      { id: 'description', name: 'Description', type: 'Text', required: true },
      { id: 'coverImage', name: 'Cover Image', type: 'Link', linkType: 'Asset' },
      { id: 'tags', name: 'Tags', type: 'Array', items: { type: 'Symbol' } },
      { id: 'samplePages', name: 'Sample Pages', type: 'Array', items: { type: 'Link', linkType: 'Asset' } },
      { id: 'pricePer100', name: 'Price Per 100', type: 'Number' },
      { id: 'isPopular', name: 'Is Popular', type: 'Boolean', defaultValue: { 'en-US': false } },
      { id: 'language', name: 'Language', type: 'Symbol' },
      { id: 'author', name: 'Author', type: 'Symbol' },
      { id: 'pages', name: 'Number of Pages', type: 'Integer' },
      { id: 'isActive', name: 'Is Active', type: 'Boolean', defaultValue: { 'en-US': true } }
    ]
  },

  // Church (for Find a Church section)
  church: {
    name: 'Church',
    fields: [
      { id: 'name', name: 'Name', type: 'Symbol', required: true },
      { id: 'address', name: 'Address', type: 'Text', required: true },
      { id: 'coordinates', name: 'Coordinates', type: 'Text' },
      { id: 'contact', name: 'Contact', type: 'Text' },
      { id: 'services', name: 'Services', type: 'Text' },
      { id: 'pastor', name: 'Pastor', type: 'Symbol' },
      { id: 'denomination', name: 'Denomination', type: 'Symbol' },
      { id: 'image', name: 'Image', type: 'Link', linkType: 'Asset' },
      { id: 'description', name: 'Description', type: 'Text' },
      { id: 'website', name: 'Website', type: 'Symbol' },
      { id: 'isFeatured', name: 'Is Featured', type: 'Boolean', defaultValue: { 'en-US': false } },
      { id: 'isActive', name: 'Is Active', type: 'Boolean', defaultValue: { 'en-US': true } }
    ]
  },

  // Resource (for Healing Resources section)
  resource: {
    name: 'Resource',
    fields: [
      { id: 'title', name: 'Title', type: 'Symbol', required: true },
      { id: 'description', name: 'Description', type: 'Text', required: true },
      { id: 'format', name: 'Format', type: 'Symbol', required: true }, // Article, Video, Podcast, Guide
      { id: 'image', name: 'Image', type: 'Link', linkType: 'Asset' },
      { id: 'href', name: 'URL', type: 'Symbol' },
      { id: 'file', name: 'File', type: 'Link', linkType: 'Asset' },
      { id: 'tags', name: 'Tags', type: 'Array', items: { type: 'Symbol' } },
      { id: 'category', name: 'Category', type: 'Link', linkType: 'Entry', validations: [{ linkContentType: ['category'] }] },
      { id: 'author', name: 'Author', type: 'Link', linkType: 'Entry', validations: [{ linkContentType: ['teamMember'] }] },
      { id: 'publishDate', name: 'Publish Date', type: 'Date' },
      { id: 'isPublic', name: 'Is Public', type: 'Boolean', defaultValue: { 'en-US': true } },
      { id: 'isFeatured', name: 'Is Featured', type: 'Boolean', defaultValue: { 'en-US': false } },
      { id: 'duration', name: 'Duration (for videos/podcasts)', type: 'Symbol' }
    ]
  },

  // Newsletter
  newsletter: {
    name: 'Newsletter',
    fields: [
      { id: 'title', name: 'Title', type: 'Symbol', required: true },
      { id: 'subtitle', name: 'Subtitle', type: 'Text' },
      { id: 'backgroundImage', name: 'Background Image', type: 'Link', linkType: 'Asset' },
      { id: 'placeholder', name: 'Placeholder Text', type: 'Symbol' },
      { id: 'buttonLabel', name: 'Button Label', type: 'Symbol' },
      { id: 'isActive', name: 'Is Active', type: 'Boolean', defaultValue: { 'en-US': true } }
    ]
  },

  // FAQ
  faq: {
    name: 'FAQ',
    fields: [
      { id: 'question', name: 'Question', type: 'Symbol', required: true },
      { id: 'answer', name: 'Answer', type: 'RichText', required: true },
      { id: 'category', name: 'Category', type: 'Link', linkType: 'Entry', validations: [{ linkContentType: ['category'] }] },
      { id: 'order', name: 'Display Order', type: 'Integer' },
      { id: 'isActive', name: 'Is Active', type: 'Boolean', defaultValue: { 'en-US': true } },
      { id: 'relatedPages', name: 'Related Pages', type: 'Array', items: { type: 'Symbol' } }
    ]
  }
}

export async function createContentTypes() {
  const space = await managementClient.getSpace(process.env.CONTENTFUL_SPACE_ID!)
  const environment = await space.getEnvironment('master')

  for (const [id, contentType] of Object.entries(contentTypes)) {
    try {
      console.log(`Creating content type: ${contentType.name}`)
      
      const ct = await environment.createContentTypeWithId(id, {
        name: contentType.name,
        fields: contentType.fields.map((field: any) => ({
          id: field.id,
          name: field.name,
          type: field.type,
          required: field.required || false,
          localized: false,
          ...(field.unique && { unique: field.unique }),
          ...(field.linkType && { linkType: field.linkType }),
          ...(field.items && { items: field.items }),
          ...(field.validations && { validations: field.validations }),
          ...(field.defaultValue && { defaultValue: field.defaultValue })
        }))
      })

      await ct.publish()
      console.log(`✅ Created and published: ${contentType.name}`)
      
    } catch (error) {
      console.error(`❌ Error creating ${contentType.name}:`, error)
    }
  }
}

// Run the script
if (require.main === module) {
  createContentTypes()
    .then(() => console.log('🎉 All content types created successfully!'))
    .catch(console.error)
}