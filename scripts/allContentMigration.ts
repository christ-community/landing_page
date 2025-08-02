#!/usr/bin/env node

/**
 * Complete Data Migration for Contentful
 * 
 * This script populates ALL the new content types with comprehensive data
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

async function createCompleteData() {
  try {
    const space = await managementClient.getSpace(SPACE_ID)
    const environment = await space.getEnvironment(ENVIRONMENT_ID)

    console.log('🚀 Creating complete data for Contentful...\n')

    // 1. Core Beliefs Data
    const coreBeliefs = [
      {
        title: "The Authority of Scripture",
        subtitle: "God's Word is our foundation",
        description: "We believe the Bible is the inspired, infallible Word of God and our ultimate authority for faith and practice. Every word has been breathed out by God and is profitable for teaching, reproof, correction, and training in righteousness.",
        scriptureReference: "2 Timothy 3:16-17",
        icon: "book-open",
        order: 1,
        isActive: true
      },
      {
        title: "The Trinity",
        subtitle: "One God in three persons",
        description: "We believe in one God who eternally exists in three persons: the Father, the Son, and the Holy Spirit. Each person is fully God, yet there is only one God.",
        scriptureReference: "Matthew 28:19, 2 Corinthians 13:14",
        icon: "infinity",
        order: 2,
        isActive: true
      },
      {
        title: "Salvation by Grace",
        subtitle: "Saved by faith alone",
        description: "We believe that salvation is by grace alone through faith alone in Christ alone. It is not by works, but is a gift from God that no one can earn or deserve.",
        scriptureReference: "Ephesians 2:8-9",
        icon: "heart",
        order: 3,
        isActive: true
      },
      {
        title: "The Church",
        subtitle: "The body of Christ",
        description: "We believe the church is the body of Christ, made up of all who have been born again through faith in Jesus Christ. The local church exists to worship God, build up believers, and reach the lost.",
        scriptureReference: "Ephesians 4:11-16",
        icon: "users",
        order: 4,
        isActive: true
      },
      {
        title: "The Great Commission",
        subtitle: "Making disciples of all nations",
        description: "We believe every Christian is called to participate in the Great Commission - making disciples of all nations by going, baptizing, and teaching others to obey Christ's commands.",
        scriptureReference: "Matthew 28:18-20",
        icon: "globe",
        order: 5,
        isActive: true
      }
    ]

    console.log('Creating Core Beliefs...')
    for (const belief of coreBeliefs) {
      try {
        const entry = await environment.createEntry('coreBelief', {
          fields: {
            title: { 'en-US': belief.title },
            subtitle: { 'en-US': belief.subtitle },
            description: { 'en-US': belief.description },
            scriptureReference: { 'en-US': belief.scriptureReference },
            icon: { 'en-US': belief.icon },
            order: { 'en-US': belief.order },
            isActive: { 'en-US': belief.isActive }
          }
        })
        await entry.publish()
        console.log(`✅ Created core belief: ${belief.title}`)
      } catch (error) {
        console.error(`❌ Failed to create core belief ${belief.title}:`, error)
      }
    }

    // 2. Mission & Vision Data
    const missionVision = [
      {
        type: "mission",
        title: "Our Mission",
        content: "To glorify God by making disciples of Jesus Christ who love God, love others, and transform communities through the power of the Gospel.",
        scriptureReference: "Matthew 28:18-20",
        icon: "target",
        isActive: true
      },
      {
        type: "vision",
        title: "Our Vision",
        content: "To see lives transformed by the love of Christ, communities renewed by His grace, and the Gospel proclaimed to the ends of the earth.",
        scriptureReference: "Acts 1:8",
        icon: "eye",
        isActive: true
      },
      {
        type: "purpose",
        title: "Our Purpose",
        content: "We exist to worship God with all our hearts, build authentic community, grow in spiritual maturity, and serve others with Christ's love.",
        scriptureReference: "1 Peter 2:9",
        icon: "compass",
        isActive: true
      }
    ]

    console.log('Creating Mission & Vision...')
    for (const item of missionVision) {
      try {
        const entry = await environment.createEntry('missionVision', {
          fields: {
            type: { 'en-US': item.type },
            title: { 'en-US': item.title },
            content: { 'en-US': item.content },
            scriptureReference: { 'en-US': item.scriptureReference },
            icon: { 'en-US': item.icon },
            isActive: { 'en-US': item.isActive }
          }
        })
        await entry.publish()
        console.log(`✅ Created ${item.type}: ${item.title}`)
      } catch (error) {
        console.error(`❌ Failed to create ${item.type} ${item.title}:`, error)
      }
    }

    // 3. Page Heroes Data
    const pageHeros = [
      {
        pageName: "events-outreaches",
        title: "Join Us for Life-Changing Events",
        subtitle: "Experience community, growth, and transformation",
        description: "From weekly worship services to special outreach events, discover opportunities to connect with God and others in meaningful ways.",
        ctaText: "View All Events",
        ctaUrl: "#events-list",
        isActive: true
      },
      {
        pageName: "healing-resources",
        title: "Find Hope and Healing",
        subtitle: "Resources for life's difficult seasons",
        description: "Discover biblical resources designed to bring comfort, hope, and practical guidance during challenging times. You don't have to walk through difficulties alone.",
        ctaText: "Explore Resources",
        ctaUrl: "#resources-list",
        isActive: true
      },
      {
        pageName: "volunteer",
        title: "Make a Difference",
        subtitle: "Your gifts and talents can change lives",
        description: "Join our team of volunteers and discover the joy of serving others while making a real impact in our community and around the world.",
        ctaText: "Start Volunteering",
        ctaUrl: "#volunteer-opportunities",
        isActive: true
      },
      {
        pageName: "find-church",
        title: "Find Your Church Home",
        subtitle: "Discover a community of faith near you",
        description: "Whether you're new to faith or looking for a new church family, we can help you find a Bible-believing community where you can grow and belong.",
        ctaText: "Search Churches",
        ctaUrl: "#church-search",
        isActive: true
      }
    ]

    console.log('Creating Page Heroes...')
    for (const hero of pageHeros) {
      try {
        const entry = await environment.createEntry('pageHero', {
          fields: {
            pageName: { 'en-US': hero.pageName },
            title: { 'en-US': hero.title },
            subtitle: { 'en-US': hero.subtitle },
            description: { 'en-US': hero.description },
            ctaText: { 'en-US': hero.ctaText },
            ctaUrl: { 'en-US': hero.ctaUrl },
            isActive: { 'en-US': hero.isActive }
          }
        })
        await entry.publish()
        console.log(`✅ Created page hero: ${hero.pageName}`)
      } catch (error) {
        console.error(`❌ Failed to create page hero ${hero.pageName}:`, error)
      }
    }

    console.log('\n🎉 All content data created successfully!')
    console.log('📊 Summary:')
    console.log(`   - Core Beliefs: ${coreBeliefs.length} entries`)
    console.log(`   - Mission & Vision: ${missionVision.length} entries`)
    console.log(`   - Page Heroes: ${pageHeros.length} entries`)

  } catch (error) {
    console.error('❌ Content data creation failed:', error)
    throw error
  }
}

// Run the data migration
if (require.main === module) {
  createCompleteData()
    .then(() => console.log('\n✅ Complete data migration finished!'))
    .catch(console.error)
}