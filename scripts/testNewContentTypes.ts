#!/usr/bin/env node

/**
 * Test New Content Types API
 * 
 * This script tests all the new content types we've added
 */

import * as dotenv from 'dotenv'
import * as path from 'path'

// Load environment variables
dotenv.config({ path: path.resolve(process.cwd(), '.env.local') })

import {
  getCoreBeliefs,
  getMissionVision,
  getCoreValues,
  getTimelineEvents,
  getCommunityStats,
  getDifferentiators,
  getHelpImpact,
  getPageHero,
  getAllPageHeroes,
  getMissionVisionByType
} from '../lib/contentful-api'

async function testNewContentTypes() {
  try {
    console.log('🧪 Testing new Contentful content types...\n')

    // Test Core Beliefs
    console.log('📖 Testing Core Beliefs...')
    const coreBeliefs = await getCoreBeliefs()
    console.log(`✅ Core Beliefs: Found ${coreBeliefs.length} beliefs`)
    coreBeliefs.forEach(belief => {
      console.log(`   - ${belief.title} (${belief.scriptureReference})`)
    })
    console.log()

    // Test Mission & Vision
    console.log('🎯 Testing Mission & Vision...')
    const missionVision = await getMissionVision()
    console.log(`✅ Mission & Vision: Found ${missionVision.length} entries`)
    missionVision.forEach(item => {
      console.log(`   - ${item.type}: ${item.title}`)
    })
    
    // Test specific mission
    const mission = await getMissionVisionByType('mission')
    console.log(`✅ Specific Mission: ${mission ? mission.title : 'Not found'}`)
    console.log()

    // Test Core Values
    console.log('💎 Testing Core Values...')
    const coreValues = await getCoreValues()
    console.log(`✅ Core Values: Found ${coreValues.length} values`)
    coreValues.forEach(value => {
      console.log(`   - ${value.title}`)
    })
    console.log()

    // Test Timeline Events
    console.log('📅 Testing Timeline Events...')
    const timelineEvents = await getTimelineEvents()
    console.log(`✅ Timeline Events: Found ${timelineEvents.length} events`)
    timelineEvents.forEach(event => {
      console.log(`   - ${event.year}: ${event.title} (${event.category})`)
    })
    console.log()

    // Test Community Stats
    console.log('📊 Testing Community Stats...')
    const communityStats = await getCommunityStats()
    console.log(`✅ Community Stats: Found ${communityStats.length} stats`)
    communityStats.forEach(stat => {
      console.log(`   - ${stat.label}: ${stat.value}`)
    })
    console.log()

    // Test Differentiators
    console.log('⭐ Testing Differentiators...')
    const differentiators = await getDifferentiators()
    console.log(`✅ Differentiators: Found ${differentiators.length} differentiators`)
    differentiators.forEach(diff => {
      console.log(`   - ${diff.title}`)
    })
    console.log()

    // Test Help Impact
    console.log('🤝 Testing Help Impact...')
    const helpImpact = await getHelpImpact()
    console.log(`✅ Help Impact: Found ${helpImpact.length} impact areas`)
    helpImpact.forEach(impact => {
      console.log(`   - ${impact.title}: ${impact.percentage}%`)
    })
    console.log()

    // Test Page Heroes
    console.log('🦸 Testing Page Heroes...')
    const pageHeroes = await getAllPageHeroes()
    console.log(`✅ Page Heroes: Found ${pageHeroes.length} heroes`)
    pageHeroes.forEach(hero => {
      console.log(`   - ${hero.pageName}: ${hero.title}`)
    })

    // Test specific page hero
    const volunteerHero = await getPageHero('volunteer')
    console.log(`✅ Volunteer Hero: ${volunteerHero ? volunteerHero.title : 'Not found'}`)
    console.log()

    console.log('🎉 All new content types tested successfully!')
    console.log('📊 Summary:')
    console.log(`   - Core Beliefs: ${coreBeliefs.length} entries`)
    console.log(`   - Mission & Vision: ${missionVision.length} entries`)
    console.log(`   - Core Values: ${coreValues.length} entries`)
    console.log(`   - Timeline Events: ${timelineEvents.length} entries`)
    console.log(`   - Community Stats: ${communityStats.length} entries`)
    console.log(`   - Differentiators: ${differentiators.length} entries`)
    console.log(`   - Help Impact: ${helpImpact.length} entries`)
    console.log(`   - Page Heroes: ${pageHeroes.length} entries`)

  } catch (error) {
    console.error('❌ Testing failed:', error)
    throw error
  }
}

// Run the test
if (require.main === module) {
  testNewContentTypes()
    .then(() => console.log('\n✅ Content types testing completed!'))
    .catch(console.error)
}