#!/usr/bin/env node

/**
 * Test Contentful API Integration
 * 
 * This script tests all the API functions to ensure they work correctly
 */

import * as dotenv from 'dotenv'
import * as path from 'path'

// Load environment variables
dotenv.config({ path: path.resolve(process.cwd(), '.env.local') })

// Import our API functions
import {
  getSiteSettings,
  getTeamMembers,
  getTestimonials,
  getHighlightedTestimonials,
  getMinistryActivities,
  getPageContent,
  getAllPageContent,
  getVolunteerOpportunities,
  getInvolvementOptions,
  getEvents,
  getUpcomingEvents,
  getTracts,
  getChurches,
  getResources,
  getCategories,
  getFAQs,
  getNewsletterConfig,
  getBlogPosts,
  getFeaturedBlogPosts
} from '../lib/contentful-api'

async function testAPI() {
  console.log('🧪 Testing Contentful API integration...\n')
  
  try {
    // Test Site Settings
    console.log('📋 Testing Site Settings...')
    const siteSettings = await getSiteSettings()
    console.log(`✅ Site Settings: ${siteSettings?.siteName || 'Not found'}`)
    
    // Test Team Members
    console.log('\n👥 Testing Team Members...')
    const teamMembers = await getTeamMembers()
    console.log(`✅ Team Members: Found ${teamMembers.length} members`)
    teamMembers.forEach(member => {
      console.log(`   - ${member.name} (${member.role})`)
    })
    
    // Test Testimonials
    console.log('\n💬 Testing Testimonials...')
    const testimonials = await getTestimonials()
    const highlighted = await getHighlightedTestimonials()
    console.log(`✅ Testimonials: Found ${testimonials.length} total, ${highlighted.length} highlighted`)
    highlighted.forEach(testimonial => {
      console.log(`   - ${testimonial.name}: "${testimonial.quote.substring(0, 50)}..."`)
    })
    
    // Test Ministry Activities
    console.log('\n⛪ Testing Ministry Activities...')
    const activities = await getMinistryActivities()
    console.log(`✅ Ministry Activities: Found ${activities.length} activities`)
    activities.forEach(activity => {
      console.log(`   - ${activity.title}`)
    })
    
    // Test Page Content
    console.log('\n📄 Testing Page Content...')
    const homeContent = await getPageContent('home')
    const allPages = await getAllPageContent()
    console.log(`✅ Page Content: Home page - ${homeContent?.title || 'Not found'}`)
    console.log(`✅ All Pages: Found ${allPages.length} pages`)
    
    // Test Blog Posts
    console.log('\n📝 Testing Blog Posts...')
    const blogPosts = await getBlogPosts()
    const featuredPosts = await getFeaturedBlogPosts()
    console.log(`✅ Blog Posts: Found ${blogPosts.length} total, ${featuredPosts.length} featured`)
    blogPosts.forEach(post => {
      console.log(`   - ${post.title} (${post.publishDate})`)
    })
    
    // Test Volunteer Opportunities
    console.log('\n🤝 Testing Volunteer Opportunities...')
    const volunteers = await getVolunteerOpportunities()
    console.log(`✅ Volunteer Opportunities: Found ${volunteers.length} opportunities`)
    volunteers.forEach(vol => {
      console.log(`   - ${vol.title} (${vol.location})`)
    })
    
    // Test Involvement Options
    console.log('\n🌟 Testing Involvement Options...')
    const involvement = await getInvolvementOptions()
    console.log(`✅ Involvement Options: Found ${involvement.length} options`)
    involvement.forEach(option => {
      console.log(`   - ${option.title}`)
    })
    
    // Test Events
    console.log('\n📅 Testing Events...')
    const events = await getEvents()
    const upcoming = await getUpcomingEvents()
    console.log(`✅ Events: Found ${events.length} total, ${upcoming.length} upcoming`)
    
    // Test Tracts
    console.log('\n📖 Testing Tracts...')
    const tracts = await getTracts()
    console.log(`✅ Tracts: Found ${tracts.length} tracts`)
    tracts.forEach(tract => {
      console.log(`   - ${tract.title} ($${tract.pricePer100}/100)`)
    })
    
    // Test Churches
    console.log('\n🏛️  Testing Churches...')
    const churches = await getChurches()
    console.log(`✅ Churches: Found ${churches.length} churches`)
    churches.forEach(church => {
      console.log(`   - ${church.name} (${church.denomination})`)
    })
    
    // Test Resources
    console.log('\n📚 Testing Resources...')
    const resources = await getResources()
    console.log(`✅ Resources: Found ${resources.length} resources`)
    resources.forEach(resource => {
      console.log(`   - ${resource.title} (${resource.format})`)
    })
    
    // Test Categories
    console.log('\n🏷️  Testing Categories...')
    const categories = await getCategories()
    console.log(`✅ Categories: Found ${categories.length} categories`)
    categories.forEach(cat => {
      console.log(`   - ${cat.name}`)
    })
    
    // Test FAQs
    console.log('\n❓ Testing FAQs...')
    const faqs = await getFAQs()
    console.log(`✅ FAQs: Found ${faqs.length} FAQs`)
    faqs.forEach(faq => {
      console.log(`   - ${faq.question}`)
    })
    
    // Test Newsletter
    console.log('\n📧 Testing Newsletter...')
    const newsletter = await getNewsletterConfig()
    console.log(`✅ Newsletter: ${newsletter?.title || 'Not found'}`)
    
    console.log('\n🎉 All API tests completed successfully!')
    console.log('\n📊 Summary:')
    console.log(`   - Site Settings: ${siteSettings ? '✅' : '❌'}`)
    console.log(`   - Team Members: ${teamMembers.length} entries`)
    console.log(`   - Testimonials: ${testimonials.length} entries`)
    console.log(`   - Ministry Activities: ${activities.length} entries`)
    console.log(`   - Page Content: ${allPages.length} entries`)
    console.log(`   - Blog Posts: ${blogPosts.length} entries`)
    console.log(`   - Volunteer Opportunities: ${volunteers.length} entries`)
    console.log(`   - Involvement Options: ${involvement.length} entries`)
    console.log(`   - Events: ${events.length} entries`)
    console.log(`   - Tracts: ${tracts.length} entries`)
    console.log(`   - Churches: ${churches.length} entries`)
    console.log(`   - Resources: ${resources.length} entries`)
    console.log(`   - Categories: ${categories.length} entries`)
    console.log(`   - FAQs: ${faqs.length} entries`)
    console.log(`   - Newsletter: ${newsletter ? '✅' : '❌'}`)
    
  } catch (error) {
    console.error('❌ API test failed:', error)
    throw error
  }
}

// Run the API test
if (require.main === module) {
  testAPI()
    .then(() => console.log('\n✅ API testing completed successfully!'))
    .catch(console.error)
}