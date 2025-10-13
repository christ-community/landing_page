#!/usr/bin/env node

/**
 * Complete Remaining Content Migration for Contentful
 * 
 * This script populates the remaining content types with comprehensive data
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

async function createRemainingContent() {
  try {
    const space = await managementClient.getSpace(SPACE_ID)
    const environment = await space.getEnvironment(ENVIRONMENT_ID)

    console.log('🚀 Creating remaining content for Contentful...\n')

    // 1. Core Values Data
    const coreValues = [
      {
        title: "Love Above All",
        description: "We believe love is the greatest commandment and the foundation of all we do. Love for God, love for one another, and love for our community drives every decision and action.",
        scriptureReference: "Matthew 22:37-39",
        icon: "heart",
        order: 1,
        isActive: true
      },
      {
        title: "Biblical Truth",
        description: "We are committed to teaching and living according to God's Word. Scripture is our ultimate authority and guide for faith, practice, and daily living.",
        scriptureReference: "2 Timothy 3:16-17",
        icon: "book-open",
        order: 2,
        isActive: true
      },
      {
        title: "Authentic Community",
        description: "We foster genuine relationships where people can be real, grow together, and support one another through life's joys and challenges.",
        scriptureReference: "Hebrews 10:24-25",
        icon: "users",
        order: 3,
        isActive: true
      },
      {
        title: "Generous Service",
        description: "We believe in serving others with open hearts and hands, following Christ's example of selfless love and sacrificial giving.",
        scriptureReference: "Mark 10:43-44",
        icon: "hand-heart",
        order: 4,
        isActive: true
      },
      {
        title: "Faithful Stewardship",
        description: "We recognize that everything we have belongs to God. We strive to be faithful stewards of our time, talents, and resources.",
        scriptureReference: "1 Corinthians 4:2",
        icon: "shield-check",
        order: 5,
        isActive: true
      }
    ]

    console.log('Creating Core Values...')
    for (const value of coreValues) {
      try {
        const entry = await environment.createEntry('coreValue', {
          fields: {
            title: { 'en-US': value.title },
            description: { 'en-US': value.description },
            scriptureReference: { 'en-US': value.scriptureReference },
            icon: { 'en-US': value.icon },
            order: { 'en-US': value.order },
            isActive: { 'en-US': value.isActive }
          }
        })
        await entry.publish()
        console.log(`✅ Created core value: ${value.title}`)
      } catch (error) {
        console.error(`❌ Failed to create core value ${value.title}:`, error)
      }
    }

    // 2. Timeline Events Data
    const timelineEvents = [
      {
        year: "1985",
        title: "Community Founded",
        description: "Christ Community was established with a vision to create an authentic, Bible-centered faith community where people could encounter God's love and grow in their faith.",
        category: "founding",
        order: 1,
        isActive: true
      },
      {
        year: "1992",
        title: "First Building Expansion",
        description: "As our congregation grew, we expanded our facilities to accommodate more worshippers and provide dedicated spaces for children's ministry and small groups.",
        category: "growth",
        order: 2,
        isActive: true
      },
      {
        year: "1998",
        title: "Community Outreach Program",
        description: "Launched our first organized community outreach programs, including a food pantry and after-school tutoring for local children.",
        category: "outreach",
        order: 3,
        isActive: true
      },
      {
        year: "2005",
        title: "Youth Ministry Launch",
        description: "Established a dedicated youth ministry program to serve teenagers in our community with engaging worship, biblical teaching, and life-changing relationships.",
        category: "ministry",
        order: 4,
        isActive: true
      },
      {
        year: "2012",
        title: "Missions Partnership",
        description: "Began long-term partnerships with international missions organizations, sending teams and supporting faith communities in developing countries.",
        category: "outreach",
        order: 5,
        isActive: true
      },
      {
        year: "2018",
        title: "New Worship Center",
        description: "Opened our new 500-seat worship center, complete with modern audio-visual equipment and dedicated prayer rooms.",
        category: "milestone",
        order: 6,
        isActive: true
      },
      {
        year: "2023",
        title: "Digital Ministry Expansion",
        description: "Launched comprehensive online ministry including live streaming, virtual small groups, and digital resources to reach people wherever they are.",
        category: "ministry",
        order: 7,
        isActive: true
      }
    ]

    console.log('Creating Timeline Events...')
    for (const event of timelineEvents) {
      try {
        const entry = await environment.createEntry('timelineEvent', {
          fields: {
            year: { 'en-US': event.year },
            title: { 'en-US': event.title },
            description: { 'en-US': event.description },
            category: { 'en-US': event.category },
            order: { 'en-US': event.order },
            isActive: { 'en-US': event.isActive }
          }
        })
        await entry.publish()
        console.log(`✅ Created timeline event: ${event.year} - ${event.title}`)
      } catch (error) {
        console.error(`❌ Failed to create timeline event ${event.title}:`, error)
      }
    }

    // 3. Community Stats Data
    const communityStats = [
      {
        label: "Active Members",
        value: "850+",
        description: "Growing community of believers",
        icon: "users",
        color: "blue",
        order: 1,
        isActive: true
      },
      {
        label: "Years of Ministry",
        value: "38",
        description: "Serving our community since 1985",
        icon: "calendar",
        color: "green",
        order: 2,
        isActive: true
      },
      {
        label: "Small Groups",
        value: "42",
        description: "Weekly gatherings for deeper connection",
        icon: "heart",
        color: "purple",
        order: 3,
        isActive: true
      },
      {
        label: "Volunteer Hours",
        value: "15,000+",
        description: "Annual community service hours",
        icon: "clock",
        color: "orange",
        order: 4,
        isActive: true
      },
      {
        label: "Countries Reached",
        value: "12",
        description: "International missions partnerships",
        icon: "globe",
        color: "teal",
        order: 5,
        isActive: true
      },
      {
        label: "Families Served",
        value: "500+",
        description: "Through our food pantry program",
        icon: "home",
        color: "red",
        order: 6,
        isActive: true
      }
    ]

    console.log('Creating Community Stats...')
    for (const stat of communityStats) {
      try {
        const entry = await environment.createEntry('communityStat', {
          fields: {
            label: { 'en-US': stat.label },
            value: { 'en-US': stat.value },
            description: { 'en-US': stat.description },
            icon: { 'en-US': stat.icon },
            color: { 'en-US': stat.color },
            order: { 'en-US': stat.order },
            isActive: { 'en-US': stat.isActive }
          }
        })
        await entry.publish()
        console.log(`✅ Created community stat: ${stat.label}`)
      } catch (error) {
        console.error(`❌ Failed to create community stat ${stat.label}:`, error)
      }
    }

    // 4. Differentiators Data
    const differentiators = [
      {
        title: "Expository Biblical Teaching",
        description: "We believe in verse-by-verse teaching through books of the Bible, helping people understand God's Word in context and apply it to their daily lives. Our pastors are committed to faithful exposition that honors the original meaning and intent of Scripture.",
        icon: "book-open",
        order: 1,
        isActive: true
      },
      {
        title: "Multigenerational Community",
        description: "From nursery to senior adults, we intentionally bring generations together. Our programs are designed to foster relationships across age groups, allowing wisdom to be shared and young faith to inspire seasoned believers.",
        icon: "users",
        order: 2,
        isActive: true
      },
      {
        title: "Global Missions Focus",
        description: "We actively support community planting and evangelism in unreached areas around the world. Every member is encouraged to participate in the Great Commission, whether through going, giving, or praying for global missions efforts.",
        icon: "globe",
        order: 3,
        isActive: true
      },
      {
        title: "Practical Life Application",
        description: "We don't just study the Bible—we help people live it out. Our teaching, small groups, and counseling ministries focus on practical application of biblical principles to real-life challenges and opportunities.",
        icon: "lightbulb",
        order: 4,
        isActive: true
      }
    ]

    console.log('Creating Differentiators...')
    for (const diff of differentiators) {
      try {
        const entry = await environment.createEntry('differentiator', {
          fields: {
            title: { 'en-US': diff.title },
            description: { 'en-US': diff.description },
            icon: { 'en-US': diff.icon },
            order: { 'en-US': diff.order },
            isActive: { 'en-US': diff.isActive }
          }
        })
        await entry.publish()
        console.log(`✅ Created differentiator: ${diff.title}`)
      } catch (error) {
        console.error(`❌ Failed to create differentiator ${diff.title}:`, error)
      }
    }

    // 5. Help Impact Data
    const helpImpacts = [
      {
        title: "Local Food Ministry",
        description: "Supporting families in our community through our weekly food pantry and emergency assistance programs.",
        percentage: 35,
        icon: "shopping-cart",
        color: "green",
        order: 1,
        isActive: true
      },
      {
        title: "Global Missions",
        description: "Supporting community planting, evangelism, and humanitarian aid in 12 countries around the world.",
        percentage: 25,
        icon: "globe",
        color: "blue",
        order: 2,
        isActive: true
      },
      {
        title: "Youth & Children's Ministry",
        description: "Investing in the next generation through programs, camps, and educational resources for young people.",
        percentage: 20,
        icon: "users",
        color: "purple",
        order: 3,
        isActive: true
      },
      {
        title: "Community Outreach",
        description: "Serving our neighbors through community events, disaster relief, and practical assistance programs.",
        percentage: 15,
        icon: "heart",
        color: "orange",
        order: 4,
        isActive: true
      },
      {
        title: "Facilities & Operations",
        description: "Maintaining our community facilities and supporting the infrastructure that enables ministry to happen.",
        percentage: 5,
        icon: "building",
        color: "gray",
        order: 5,
        isActive: true
      }
    ]

    console.log('Creating Help Impact data...')
    for (const impact of helpImpacts) {
      try {
        const entry = await environment.createEntry('helpImpact', {
          fields: {
            title: { 'en-US': impact.title },
            description: { 'en-US': impact.description },
            percentage: { 'en-US': impact.percentage },
            icon: { 'en-US': impact.icon },
            color: { 'en-US': impact.color },
            order: { 'en-US': impact.order },
            isActive: { 'en-US': impact.isActive }
          }
        })
        await entry.publish()
        console.log(`✅ Created help impact: ${impact.title}`)
      } catch (error) {
        console.error(`❌ Failed to create help impact ${impact.title}:`, error)
      }
    }

    console.log('\n🎉 All remaining content created successfully!')
    console.log('📊 Summary:')
    console.log(`   - Core Values: ${coreValues.length} entries`)
    console.log(`   - Timeline Events: ${timelineEvents.length} entries`)
    console.log(`   - Community Stats: ${communityStats.length} entries`)
    console.log(`   - Differentiators: ${differentiators.length} entries`)
    console.log(`   - Help Impact: ${helpImpacts.length} entries`)

  } catch (error) {
    console.error('❌ Content creation failed:', error)
    throw error
  }
}

// Run the content creation
if (require.main === module) {
  createRemainingContent()
    .then(() => console.log('\n✅ Remaining content migration finished!'))
    .catch(console.error)
}