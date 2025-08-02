#!/usr/bin/env node

/**
 * Comprehensive Content Entry Check
 * 
 * This script checks all content types to see which have entries and which are empty
 */

import * as dotenv from 'dotenv'
import * as path from 'path'

// Load environment variables
dotenv.config({ path: path.resolve(process.cwd(), '.env.local') })

import {
  // Existing content types
  getAllPageContent,
  getTeamMembers,
  getBlogPosts,
  getEvents,
  getMinistryActivities,
  getTestimonials,
  getVolunteerOpportunities,
  getInvolvementOptions,
  getTracts,
  getChurches,
  getResources,
  getCategories,
  getFAQs,
  getNewsletterConfig,
  getSiteSettings,
  
  // New content types
  getCoreBeliefs,
  getMissionVision,
  getCoreValues,
  getTimelineEvents,
  getCommunityStats,
  getDifferentiators,
  getHelpImpact,
  getAllPageHeroes
} from '../lib/contentful-api'

async function checkAllContentEntries() {
  try {
    console.log('🔍 Checking all Contentful content entries...\n')

    const results: { [key: string]: { count: number; hasEntries: boolean; contentType: string } } = {}

    // Check existing content types
    console.log('📋 Checking Existing Content Types:')
    console.log('=====================================')

    const siteSettings = await getSiteSettings()
    results['Site Settings'] = { count: siteSettings ? 1 : 0, hasEntries: !!siteSettings, contentType: 'siteSettings' }

    const pageContent = await getAllPageContent()
    results['Page Content'] = { count: pageContent.length, hasEntries: pageContent.length > 0, contentType: 'pageContent' }

    const teamMembers = await getTeamMembers()
    results['Team Members'] = { count: teamMembers.length, hasEntries: teamMembers.length > 0, contentType: 'teamMember' }

    const blogPosts = await getBlogPosts()
    results['Blog Posts'] = { count: blogPosts.length, hasEntries: blogPosts.length > 0, contentType: 'blogPost' }

    const events = await getEvents()
    results['Events'] = { count: events.length, hasEntries: events.length > 0, contentType: 'event' }

    const ministryActivities = await getMinistryActivities()
    results['Ministry Activities'] = { count: ministryActivities.length, hasEntries: ministryActivities.length > 0, contentType: 'ministryActivity' }

    const testimonials = await getTestimonials()
    results['Testimonials'] = { count: testimonials.length, hasEntries: testimonials.length > 0, contentType: 'testimonial' }

    const volunteerOpportunities = await getVolunteerOpportunities()
    results['Volunteer Opportunities'] = { count: volunteerOpportunities.length, hasEntries: volunteerOpportunities.length > 0, contentType: 'volunteerOpportunity' }

    const involvementOptions = await getInvolvementOptions()
    results['Involvement Options'] = { count: involvementOptions.length, hasEntries: involvementOptions.length > 0, contentType: 'involvementOption' }

    const tracts = await getTracts()
    results['Tracts'] = { count: tracts.length, hasEntries: tracts.length > 0, contentType: 'tract' }

    const churches = await getChurches()
    results['Churches'] = { count: churches.length, hasEntries: churches.length > 0, contentType: 'church' }

    const resources = await getResources()
    results['Resources'] = { count: resources.length, hasEntries: resources.length > 0, contentType: 'resource' }

    const categories = await getCategories()
    results['Categories'] = { count: categories.length, hasEntries: categories.length > 0, contentType: 'category' }

    const faqs = await getFAQs()
    results['FAQs'] = { count: faqs.length, hasEntries: faqs.length > 0, contentType: 'faq' }

    const newsletter = await getNewsletterConfig()
    results['Newsletter'] = { count: newsletter ? 1 : 0, hasEntries: !!newsletter, contentType: 'newsletter' }

    // Print existing content types
    Object.entries(results).forEach(([name, data]) => {
      const status = data.hasEntries ? '✅' : '❌'
      const countText = data.count === 1 ? '1 entry' : `${data.count} entries`
      console.log(`${status} ${name}: ${countText}`)
    })

    console.log('\n📋 Checking NEW Content Types:')
    console.log('===============================')

    // Check new content types
    const coreBeliefs = await getCoreBeliefs()
    results['Core Beliefs'] = { count: coreBeliefs.length, hasEntries: coreBeliefs.length > 0, contentType: 'coreBelief' }

    const missionVision = await getMissionVision()
    results['Mission & Vision'] = { count: missionVision.length, hasEntries: missionVision.length > 0, contentType: 'missionVision' }

    const coreValues = await getCoreValues()
    results['Core Values'] = { count: coreValues.length, hasEntries: coreValues.length > 0, contentType: 'coreValue' }

    const timelineEvents = await getTimelineEvents()
    results['Timeline Events'] = { count: timelineEvents.length, hasEntries: timelineEvents.length > 0, contentType: 'timelineEvent' }

    const communityStats = await getCommunityStats()
    results['Community Stats'] = { count: communityStats.length, hasEntries: communityStats.length > 0, contentType: 'communityStat' }

    const differentiators = await getDifferentiators()
    results['Differentiators'] = { count: differentiators.length, hasEntries: differentiators.length > 0, contentType: 'differentiator' }

    const helpImpact = await getHelpImpact()
    results['Help Impact'] = { count: helpImpact.length, hasEntries: helpImpact.length > 0, contentType: 'helpImpact' }

    const pageHeroes = await getAllPageHeroes()
    results['Page Heroes'] = { count: pageHeroes.length, hasEntries: pageHeroes.length > 0, contentType: 'pageHero' }

    // Print new content types
    const newContentTypes = ['Core Beliefs', 'Mission & Vision', 'Core Values', 'Timeline Events', 'Community Stats', 'Differentiators', 'Help Impact', 'Page Heroes']
    newContentTypes.forEach(name => {
      const data = results[name]
      const status = data.hasEntries ? '✅' : '❌'
      const countText = data.count === 1 ? '1 entry' : `${data.count} entries`
      console.log(`${status} ${name}: ${countText}`)
    })

    console.log('\n📊 SUMMARY:')
    console.log('===========')
    
    const totalContentTypes = Object.keys(results).length
    const contentTypesWithEntries = Object.values(results).filter(data => data.hasEntries).length
    const contentTypesEmpty = totalContentTypes - contentTypesWithEntries
    const totalEntries = Object.values(results).reduce((sum, data) => sum + data.count, 0)

    console.log(`📋 Total Content Types: ${totalContentTypes}`)
    console.log(`✅ Content Types with Entries: ${contentTypesWithEntries}`)
    console.log(`❌ Empty Content Types: ${contentTypesEmpty}`)
    console.log(`📝 Total Entries: ${totalEntries}`)

    if (contentTypesEmpty > 0) {
      console.log('\n❌ Empty Content Types:')
      Object.entries(results).forEach(([name, data]) => {
        if (!data.hasEntries) {
          console.log(`   - ${name} (${data.contentType})`)
        }
      })
    }

    console.log('\n🎯 Content Types by Category:')
    console.log('=============================')
    console.log('📄 Page Content & Navigation:', results['Page Content'].count + results['Site Settings'].count)
    console.log('👥 People & Community:', results['Team Members'].count + results['Testimonials'].count)
    console.log('📝 Content & Resources:', results['Blog Posts'].count + results['Resources'].count + results['FAQs'].count)
    console.log('📅 Events & Activities:', results['Events'].count + results['Ministry Activities'].count)
    console.log('🤝 Engagement & Involvement:', results['Volunteer Opportunities'].count + results['Involvement Options'].count + results['Churches'].count + results['Tracts'].count)
    console.log('✨ New About Page Content:', (results['Core Beliefs']?.count || 0) + (results['Mission & Vision']?.count || 0) + (results['Core Values']?.count || 0) + (results['Timeline Events']?.count || 0) + (results['Community Stats']?.count || 0) + (results['Differentiators']?.count || 0) + (results['Help Impact']?.count || 0))
    console.log('🦸 Page Heroes:', results['Page Heroes']?.count || 0)

  } catch (error) {
    console.error('❌ Content entry check failed:', error)
    throw error
  }
}

// Run the check
if (require.main === module) {
  checkAllContentEntries()
    .then(() => console.log('\n✅ Content entry check completed!'))
    .catch(console.error)
}