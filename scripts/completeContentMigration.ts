import { createClient } from 'contentful-management'
import * as fs from 'fs'
import * as path from 'path'
import * as dotenv from 'dotenv'

// Load environment variables
dotenv.config({ path: path.resolve(process.cwd(), '.env.local') })

const managementClient = createClient({
  accessToken: process.env.CONTENTFUL_MANAGEMENT_TOKEN!
})

// Migration data extracted from all components
const migrationData = {
  // Site Settings
  siteSettings: {
    siteName: "Christ Community",
    contactPhone: "+1 (555) 123-4567",
    contactEmail: "info@christcommunity.org",
    emergencyPhone: "+1 (555) 999-0000",
    address: "123 Faith Street, Your City, Your State 12345",
    socialMediaLinks: "Facebook: https://facebook.com/christcommunity | Instagram: https://instagram.com/christcommunity | YouTube: https://youtube.com/christcommunity",
    footerText: "© 2024 Christ Community. All rights reserved. Built with love and faith.",
    serviceTimes: "Sunday Morning Worship: 10:00 AM | Wednesday Bible Study: 7:00 PM",
    officeHours: "Monday - Friday: 9:00 AM - 5:00 PM",
    missionStatement: "Building community through Christ, growing in faith together, and serving others with God's love."
  },

  // Page Content
  pageContent: [
    {
      slug: "home",
      title: "Welcome to Christ Community",
      subtitle: "Building community through Christ",
      description: "Join us as we gather to worship, grow in faith, and serve our community together. Experience God's love in a welcoming environment where everyone belongs.",
      ctaText: "Join Us Sunday",
      ctaUrl: "/contact"
    },
    {
      slug: "about",
      title: "About Christ Community",
      subtitle: "Our Story and Mission",
      description: "Learn about our history, mission, and the values that guide our community of faith.",
      ctaText: "Meet Our Team",
      ctaUrl: "/about/meet-the-team"
    },
    {
      slug: "contact",
      title: "Get In Touch",
      subtitle: "We'd Love to Hear From You",
      description: "Connect with us for prayer requests, questions, or to learn more about our community.",
      ctaText: "Send Message",
      ctaUrl: "#contact-form"
    }
  ],

  // Team Members
  teamMembers: [
    {
      name: "Pastor John Smith",
      role: "Senior Pastor",
      department: "Leadership",
      bio: "Pastor John has been leading our community for over 15 years with passion for God's word and heart for people.",
      specialties: ["Pastoral Care", "Biblical Teaching", "Community Leadership"],
      yearsOfService: 15,
      education: "Master of Divinity, Seminary School",
      email: "pastor.john@christcommunity.org",
      favoriteVerse: "Jeremiah 29:11",
      order: 1,
      isActive: true
    },
    {
      name: "Sarah Johnson",
      role: "Worship Leader",
      department: "Music Ministry",
      bio: "Sarah leads our worship team with a heart for creating meaningful worship experiences that draw people closer to God.",
      specialties: ["Worship Leading", "Music Direction", "Team Development"],
      yearsOfService: 8,
      education: "Bachelor of Music, State University",
      email: "sarah@christcommunity.org",
      favoriteVerse: "Psalm 95:1",
      order: 2,
      isActive: true
    },
    {
      name: "Michael Davis",
      role: "Youth Pastor",
      department: "Youth Ministry",
      bio: "Michael is passionate about mentoring the next generation and helping young people discover their purpose in Christ.",
      specialties: ["Youth Ministry", "Mentoring", "Event Planning"],
      yearsOfService: 5,
      education: "Bachelor of Youth Ministry, Christian College",
      email: "michael@christcommunity.org",
      favoriteVerse: "1 Timothy 4:12",
      order: 3,
      isActive: true
    }
  ],

  // Ministry Activities
  ministryActivities: [
    {
      title: "Sunday Worship",
      description: "Join us every Sunday for inspiring worship, biblical teaching, and community fellowship.",
      icon: "church",
      ctaText: "Plan Your Visit",
      ctaUrl: "/contact",
      order: 1,
      isActive: true
    },
    {
      title: "Small Groups",
      description: "Connect with others in intimate study groups where you can grow in faith and build lasting friendships.",
      icon: "users",
      ctaText: "Find a Group",
      ctaUrl: "/get-involved",
      order: 2,
      isActive: true
    },
    {
      title: "Community Service",
      description: "Make a difference in our community through various outreach and service opportunities.",
      icon: "heart",
      ctaText: "Volunteer Today",
      ctaUrl: "/get-involved/volunteer-with-us",
      order: 3,
      isActive: true
    },
    {
      title: "Youth Ministry",
      description: "Engaging programs for teens and young adults to grow in faith and build meaningful relationships.",
      icon: "star",
      ctaText: "Join Youth Group",
      ctaUrl: "/contact",
      order: 4,
      isActive: true
    }
  ],

  // Testimonials
  testimonials: [
    {
      name: "Mary Thompson",
      role: "Community Volunteer",
      quote: "Being part of this community has transformed my life. The love and support I've received here is incredible, and I'm grateful to serve alongside such amazing people.",
      volunteeredSince: "3 years",
      favoriteActivity: "Food pantry ministry",
      isActive: true,
      order: 1,
      isHighlighted: true
    },
    {
      name: "Robert Wilson",
      role: "Small Group Leader",
      quote: "Leading a small group has been one of the most rewarding experiences of my faith journey. Watching people grow and connect with God is truly amazing.",
      volunteeredSince: "2 years",
      favoriteActivity: "Small group ministry",
      isActive: true,
      order: 2,
      isHighlighted: true
    },
    {
      name: "Jennifer Lee",
      role: "Youth Mentor",
      quote: "Working with the youth has shown me the power of investing in the next generation. These young people inspire me every day with their faith and passion.",
      volunteeredSince: "4 years",
      favoriteActivity: "Youth mentoring",
      isActive: true,
      order: 3,
      isHighlighted: true
    }
  ],

  // Volunteer Opportunities
  volunteerOpportunities: [
    {
      title: "Children's Ministry Helper",
      description: "Help create a fun and safe environment for children to learn about God's love through games, crafts, and stories.",
      shortDescription: "Support children's programs and activities",
      icon: "baby",
      timeCommitment: "2-3 hours per week",
      location: "onsite",
      skillLevel: "any",
      category: "Children & Youth",
      requirements: ["Background check", "Heart for children"],
      benefits: ["Training provided", "Flexible scheduling"],
      tags: ["children", "teaching", "creative"],
      isPopular: true,
      isUrgent: false,
      isActive: true,
      contactEmail: "children@christcommunity.org"
    },
    {
      title: "Worship Team Musician",
      description: "Join our worship team to lead our congregation in praise through music. We welcome musicians of all skill levels.",
      shortDescription: "Play instruments or sing for worship services",
      icon: "music",
      timeCommitment: "4-5 hours per week",
      location: "onsite",
      skillLevel: "intermediate",
      category: "Music & Arts",
      requirements: ["Musical ability", "Regular attendance"],
      benefits: ["Skill development", "Performance opportunities"],
      tags: ["music", "worship", "performance"],
      isPopular: true,
      isUrgent: false,
      isActive: true,
      contactEmail: "worship@christcommunity.org"
    },
    {
      title: "Food Pantry Volunteer",
      description: "Help organize and distribute food to families in need in our community. Make a direct impact on fighting hunger.",
      shortDescription: "Assist with food distribution to community",
      icon: "heart",
      timeCommitment: "3-4 hours per week",
      location: "onsite",
      skillLevel: "any",
      category: "Community Outreach",
      requirements: ["Physical ability to lift boxes"],
      benefits: ["Community impact", "Team building"],
      tags: ["service", "community", "outreach"],
      isPopular: false,
      isUrgent: true,
      isActive: true,
      contactEmail: "outreach@christcommunity.org"
    }
  ],

  // Involvement Options
  involvementOptions: [
    {
      title: "Join Our Worship",
      description: "Experience meaningful worship every Sunday morning with inspiring music and biblical teaching.",
      href: "/contact",
      icon: "church",
      bgColor: "bg-blue-500",
      textColor: "text-white",
      order: 1,
      isActive: true
    },
    {
      title: "Find a Small Group",
      description: "Connect with others in intimate study groups for spiritual growth and community.",
      href: "/get-involved",
      icon: "users",
      bgColor: "bg-green-500",
      textColor: "text-white",
      order: 2,
      isActive: true
    },
    {
      title: "Volunteer with Us",
      description: "Make a difference by serving in various ministry opportunities throughout our community.",
      href: "/get-involved/volunteer-with-us",
      icon: "heart",
      bgColor: "bg-red-500",
      textColor: "text-white",
      order: 3,
      isActive: true
    },
    {
      title: "Give & Support",
      description: "Partner with us in ministry through your generous financial support and prayers.",
      href: "/donate",
      icon: "gift",
      bgColor: "bg-purple-500",
      textColor: "text-white",
      order: 4,
      isActive: true
    }
  ],

  // Events
  events: [
    {
      title: "Sunday Morning Worship",
      description: "Join us for our weekly worship service with inspiring music, biblical teaching, and community fellowship.",
      date: "2024-12-08T10:00:00Z",
      time: "10:00 AM",
      location: "Main Sanctuary",
      isRecurring: true,
      recurringPattern: "weekly",
      isActive: true,
      attendees: 150
    },
    {
      title: "Christmas Eve Service",
      description: "Celebrate the birth of Jesus with our special Christmas Eve candlelight service.",
      date: "2024-12-24T19:00:00Z",
      time: "7:00 PM",
      location: "Main Sanctuary",
      isRecurring: false,
      isActive: true,
      attendees: 300
    },
    {
      title: "New Year Prayer & Worship",
      description: "Start the new year in prayer and worship as we seek God's guidance for the year ahead.",
      date: "2025-01-01T10:00:00Z",
      time: "10:00 AM",
      location: "Main Sanctuary",
      isRecurring: false,
      isActive: true,
      attendees: 200
    }
  ],

  // Categories
  categories: [
    {
      name: "Faith & Spirituality",
      slug: "faith-spirituality",
      description: "Content focused on spiritual growth and faith development",
      color: "#3B82F6",
      icon: "cross",
      order: 1
    },
    {
      name: "Community & Fellowship",
      slug: "community-fellowship", 
      description: "Content about community building and fellowship opportunities",
      color: "#10B981",
      icon: "users",
      order: 2
    },
    {
      name: "Service & Outreach",
      slug: "service-outreach",
      description: "Content about serving others and community outreach",
      color: "#F59E0B",
      icon: "heart",
      order: 3
    }
  ],

  // Event Categories
  eventCategories: [
    {
      name: "Worship Services",
      slug: "worship-services",
      icon: "church",
      color: "#3B82F6",
      description: "Regular and special worship services"
    },
    {
      name: "Community Events",
      slug: "community-events",
      icon: "calendar",
      color: "#10B981",
      description: "Community gatherings and fellowship events"
    },
    {
      name: "Special Occasions",
      slug: "special-occasions",
      icon: "star",
      color: "#F59E0B",
      description: "Holiday and special celebration services"
    }
  ],

  // Tracts
  tracts: [
    {
      title: "God's Plan of Salvation",
      description: "A clear explanation of how to receive God's gift of eternal life through Jesus Christ.",
      tags: ["salvation", "gospel", "evangelism"],
      pricePer100: 15.00,
      isPopular: true,
      language: "English",
      author: "Pastor John Smith",
      pages: 4,
      isActive: true
    },
    {
      title: "Finding Hope in Difficult Times",
      description: "Encouraging words for those facing challenges, with biblical promises of God's faithfulness.",
      tags: ["hope", "encouragement", "comfort"],
      pricePer100: 12.00,
      isPopular: false,
      language: "English",
      author: "Sarah Johnson",
      pages: 6,
      isActive: true
    },
    {
      title: "Building Strong Relationships",
      description: "Biblical principles for healthy relationships in marriage, family, and friendships.",
      tags: ["relationships", "family", "marriage"],
      pricePer100: 18.00,
      isPopular: true,
      language: "English",
      author: "Michael Davis",
      pages: 8,
      isActive: true
    }
  ],

  // Churches
  churches: [
    {
      name: "Faith Community Church",
      address: "456 Hope Avenue, Springfield, State 12346, USA",
      coordinates: "40.7128, -74.0060",
      contact: "Phone: +1 (555) 234-5678 | Email: info@faithcommunity.org | Website: https://faithcommunity.org",
      services: "Sunday: 9:00 AM & 11:00 AM | Wednesday: 7:00 PM | Saturday Prayer: 6:00 PM",
      pastor: "Pastor David Brown",
      denomination: "Non-denominational",
      description: "A welcoming community focused on growing in faith together.",
      isFeatured: true,
      isActive: true
    },
    {
      name: "Grace Baptist Church",
      address: "789 Grace Street, Riverside, State 12347, USA",
      coordinates: "40.7589, -73.9851",
      contact: "Phone: +1 (555) 345-6789 | Email: contact@gracebaptist.org | Website: https://gracebaptist.org",
      services: "Sunday: 10:30 AM | Wednesday: 7:30 PM",
      pastor: "Pastor Mary Williams",
      denomination: "Baptist",
      description: "Committed to biblical teaching and community service.",
      isFeatured: false,
      isActive: true
    }
  ],

  // Resources
  resources: [
    {
      title: "Daily Devotions for Spiritual Growth",
      description: "A collection of inspiring daily devotions to help you grow closer to God through prayer and scripture study.",
      format: "Guide",
      tags: ["devotions", "prayer", "spiritual growth"],
      publishDate: "2024-01-15",
      isPublic: true,
      isFeatured: true,
      duration: "365 days"
    },
    {
      title: "Understanding Biblical Prayer",
      description: "Learn the principles of effective prayer from biblical examples and teachings.",
      format: "Article",
      tags: ["prayer", "bible study", "teaching"],
      publishDate: "2024-02-01",
      isPublic: true,
      isFeatured: false
    },
    {
      title: "Worship Songs for Small Groups",
      description: "A playlist of contemporary worship songs perfect for small group gatherings and personal worship.",
      format: "Audio",
      tags: ["worship", "music", "small groups"],
      publishDate: "2024-02-15",
      isPublic: true,
      isFeatured: true,
      duration: "2 hours"
    }
  ],

  // Newsletter
  newsletter: {
    title: "Stay Connected",
    subtitle: "Get updates about our community, events, and resources delivered to your inbox.",
    placeholder: "Enter your email address",
    buttonLabel: "Subscribe Now",
    isActive: true
  },

  // FAQs
  faqs: [
    {
      question: "What time are your worship services?",
      answer: "Our main worship service is Sunday mornings at 10:00 AM. We also have Wednesday evening Bible study at 7:00 PM.",
      order: 1,
      isActive: true,
      relatedPages: ["/", "/contact"]
    },
    {
      question: "Do you have programs for children?",
      answer: "Yes! We have children's ministry programs during our Sunday service for ages 2-12, plus special events throughout the year.",
      order: 2,
      isActive: true,
      relatedPages: ["/get-involved"]
    },
    {
      question: "How can I get involved in serving?",
      answer: "There are many ways to serve! Visit our volunteer opportunities page or speak with one of our ministry leaders after service.",
      order: 3,
      isActive: true,
      relatedPages: ["/get-involved/volunteer-with-us"]
    },
    {
      question: "Do you offer small groups?",
      answer: "Absolutely! We have various small groups that meet throughout the week for Bible study, fellowship, and prayer.",
      order: 4,
      isActive: true,
      relatedPages: ["/get-involved"]
    }
  ]
}

export async function createAllContentEntries() {
  const space = await managementClient.getSpace(process.env.CONTENTFUL_SPACE_ID!)
  const environment = await space.getEnvironment('master')

  console.log('🚀 Starting complete content migration...')

  try {
    // Create Site Settings
    console.log('Creating site settings...')
    const siteSettingsEntry = await environment.createEntry('siteSettings', {
      fields: {
        siteName: { 'en-US': migrationData.siteSettings.siteName },
        contactPhone: { 'en-US': migrationData.siteSettings.contactPhone },
        contactEmail: { 'en-US': migrationData.siteSettings.contactEmail },
        emergencyPhone: { 'en-US': migrationData.siteSettings.emergencyPhone },
        address: { 'en-US': migrationData.siteSettings.address },
        socialMediaLinks: { 'en-US': migrationData.siteSettings.socialMediaLinks },
        footerText: { 'en-US': migrationData.siteSettings.footerText },
        serviceTimes: { 'en-US': migrationData.siteSettings.serviceTimes },
        officeHours: { 'en-US': migrationData.siteSettings.officeHours },
        missionStatement: { 'en-US': migrationData.siteSettings.missionStatement }
      }
    })
    await siteSettingsEntry.publish()
    console.log('✅ Site settings created')

    // Create Categories
    console.log('Creating categories...')
    const categoryEntries = []
    for (const category of migrationData.categories) {
      const entry = await environment.createEntry('category', {
        fields: {
          name: { 'en-US': category.name },
          slug: { 'en-US': category.slug },
          description: { 'en-US': category.description },
          color: { 'en-US': category.color },
          icon: { 'en-US': category.icon },
          order: { 'en-US': category.order }
        }
      })
      await entry.publish()
      categoryEntries.push(entry)
    }
    console.log('✅ Categories created')

    // Create Event Categories
    console.log('Creating event categories...')
    const eventCategoryEntries = []
    for (const eventCategory of migrationData.eventCategories) {
      const entry = await environment.createEntry('eventCategory', {
        fields: {
          name: { 'en-US': eventCategory.name },
          slug: { 'en-US': eventCategory.slug },
          icon: { 'en-US': eventCategory.icon },
          color: { 'en-US': eventCategory.color },
          description: { 'en-US': eventCategory.description }
        }
      })
      await entry.publish()
      eventCategoryEntries.push(entry)
    }
    console.log('✅ Event categories created')

    // Create Team Members
    console.log('Creating team members...')
    const teamMemberEntries = []
    for (const member of migrationData.teamMembers) {
      const entry = await environment.createEntry('teamMember', {
        fields: {
          name: { 'en-US': member.name },
          role: { 'en-US': member.role },
          department: { 'en-US': member.department },
          bio: { 'en-US': member.bio },
          specialties: { 'en-US': member.specialties },
          yearsOfService: { 'en-US': member.yearsOfService },
          education: { 'en-US': member.education },
          email: { 'en-US': member.email },
          favoriteVerse: { 'en-US': member.favoriteVerse },
          order: { 'en-US': member.order },
          isActive: { 'en-US': member.isActive }
        }
      })
      await entry.publish()
      teamMemberEntries.push(entry)
    }
    console.log('✅ Team members created')

    // Create Page Content
    console.log('Creating page content...')
    for (const page of migrationData.pageContent) {
      const entry = await environment.createEntry('pageContent', {
        fields: {
          title: { 'en-US': page.title },
          subtitle: { 'en-US': page.subtitle },
          description: { 'en-US': page.description },
          slug: { 'en-US': page.slug },
          ctaText: { 'en-US': page.ctaText },
          ctaUrl: { 'en-US': page.ctaUrl }
        }
      })
      await entry.publish()
    }
    console.log('✅ Page content created')

    // Create Ministry Activities
    console.log('Creating ministry activities...')
    for (const activity of migrationData.ministryActivities) {
      const entry = await environment.createEntry('ministryActivity', {
        fields: {
          title: { 'en-US': activity.title },
          description: { 'en-US': activity.description },
          icon: { 'en-US': activity.icon },
          ctaText: { 'en-US': activity.ctaText },
          ctaUrl: { 'en-US': activity.ctaUrl },
          order: { 'en-US': activity.order },
          isActive: { 'en-US': activity.isActive }
        }
      })
      await entry.publish()
    }
    console.log('✅ Ministry activities created')

    // Create Testimonials
    console.log('Creating testimonials...')
    for (const testimonial of migrationData.testimonials) {
      const entry = await environment.createEntry('testimonial', {
        fields: {
          name: { 'en-US': testimonial.name },
          role: { 'en-US': testimonial.role },
          quote: { 'en-US': testimonial.quote },
          volunteeredSince: { 'en-US': testimonial.volunteeredSince },
          favoriteActivity: { 'en-US': testimonial.favoriteActivity },
          isActive: { 'en-US': testimonial.isActive },
          order: { 'en-US': testimonial.order },
          isHighlighted: { 'en-US': testimonial.isHighlighted }
        }
      })
      await entry.publish()
    }
    console.log('✅ Testimonials created')

    // Create Volunteer Opportunities
    console.log('Creating volunteer opportunities...')
    for (const opportunity of migrationData.volunteerOpportunities) {
      const entry = await environment.createEntry('volunteerOpportunity', {
        fields: {
          title: { 'en-US': opportunity.title },
          description: { 'en-US': opportunity.description },
          shortDescription: { 'en-US': opportunity.shortDescription },
          icon: { 'en-US': opportunity.icon },
          timeCommitment: { 'en-US': opportunity.timeCommitment },
          location: { 'en-US': opportunity.location },
          skillLevel: { 'en-US': opportunity.skillLevel },
          category: { 'en-US': opportunity.category },
          requirements: { 'en-US': opportunity.requirements },
          benefits: { 'en-US': opportunity.benefits },
          tags: { 'en-US': opportunity.tags },
          isPopular: { 'en-US': opportunity.isPopular },
          isUrgent: { 'en-US': opportunity.isUrgent },
          isActive: { 'en-US': opportunity.isActive },
          contactEmail: { 'en-US': opportunity.contactEmail }
        }
      })
      await entry.publish()
    }
    console.log('✅ Volunteer opportunities created')

    // Create Involvement Options
    console.log('Creating involvement options...')
    for (const option of migrationData.involvementOptions) {
      const entry = await environment.createEntry('involvementOption', {
        fields: {
          title: { 'en-US': option.title },
          description: { 'en-US': option.description },
          href: { 'en-US': option.href },
          icon: { 'en-US': option.icon },
          bgColor: { 'en-US': option.bgColor },
          textColor: { 'en-US': option.textColor },
          order: { 'en-US': option.order },
          isActive: { 'en-US': option.isActive }
        }
      })
      await entry.publish()
    }
    console.log('✅ Involvement options created')

    // Create Events
    console.log('Creating events...')
    for (const event of migrationData.events) {
      const entry = await environment.createEntry('event', {
        fields: {
          title: { 'en-US': event.title },
          description: { 'en-US': event.description },
          date: { 'en-US': event.date },
          time: { 'en-US': event.time },
          location: { 'en-US': event.location },
          isRecurring: { 'en-US': event.isRecurring },
          recurringPattern: { 'en-US': event.recurringPattern },
          isActive: { 'en-US': event.isActive },
          attendees: { 'en-US': event.attendees }
        }
      })
      await entry.publish()
    }
    console.log('✅ Events created')

    // Create Tracts
    console.log('Creating tracts...')
    for (const tract of migrationData.tracts) {
      const entry = await environment.createEntry('tract', {
        fields: {
          title: { 'en-US': tract.title },
          description: { 'en-US': tract.description },
          tags: { 'en-US': tract.tags },
          pricePer100: { 'en-US': tract.pricePer100 },
          isPopular: { 'en-US': tract.isPopular },
          language: { 'en-US': tract.language },
          author: { 'en-US': tract.author },
          pages: { 'en-US': tract.pages },
          isActive: { 'en-US': tract.isActive }
        }
      })
      await entry.publish()
    }
    console.log('✅ Tracts created')

    // Create Churches
    console.log('Creating churches...')
    for (const church of migrationData.churches) {
      const entry = await environment.createEntry('church', {
        fields: {
          name: { 'en-US': church.name },
          address: { 'en-US': church.address },
          coordinates: { 'en-US': church.coordinates },
          contact: { 'en-US': church.contact },
          services: { 'en-US': church.services },
          pastor: { 'en-US': church.pastor },
          denomination: { 'en-US': church.denomination },
          description: { 'en-US': church.description },
          isFeatured: { 'en-US': church.isFeatured },
          isActive: { 'en-US': church.isActive }
        }
      })
      await entry.publish()
    }
    console.log('✅ Churches created')

    // Create Resources
    console.log('Creating resources...')
    for (const resource of migrationData.resources) {
      const entry = await environment.createEntry('resource', {
        fields: {
          title: { 'en-US': resource.title },
          description: { 'en-US': resource.description },
          format: { 'en-US': resource.format },
          tags: { 'en-US': resource.tags },
          publishDate: { 'en-US': resource.publishDate },
          isPublic: { 'en-US': resource.isPublic },
          isFeatured: { 'en-US': resource.isFeatured },
          duration: { 'en-US': resource.duration }
        }
      })
      await entry.publish()
    }
    console.log('✅ Resources created')

    // Create Newsletter
    console.log('Creating newsletter...')
    const newsletterEntry = await environment.createEntry('newsletter', {
      fields: {
        title: { 'en-US': migrationData.newsletter.title },
        subtitle: { 'en-US': migrationData.newsletter.subtitle },
        placeholder: { 'en-US': migrationData.newsletter.placeholder },
        buttonLabel: { 'en-US': migrationData.newsletter.buttonLabel },
        isActive: { 'en-US': migrationData.newsletter.isActive }
      }
    })
    await newsletterEntry.publish()
    console.log('✅ Newsletter created')

    // Create FAQs
    console.log('Creating FAQs...')
    for (const faq of migrationData.faqs) {
      const entry = await environment.createEntry('faq', {
        fields: {
          question: { 'en-US': faq.question },
          answer: { 
            'en-US': {
              nodeType: 'document',
              data: {},
              content: [
                {
                  nodeType: 'paragraph',
                  data: {},
                  content: [
                    {
                      nodeType: 'text',
                      value: faq.answer,
                      marks: [],
                      data: {}
                    }
                  ]
                }
              ]
            }
          },
          order: { 'en-US': faq.order },
          isActive: { 'en-US': faq.isActive },
          relatedPages: { 'en-US': faq.relatedPages }
        }
      })
      await entry.publish()
    }
    console.log('✅ FAQs created')

    console.log('🎉 Complete content migration finished successfully!')
    
  } catch (error) {
    console.error('❌ Error during content migration:', error)
    throw error
  }
}

// Run the migration
if (require.main === module) {
  createAllContentEntries()
    .then(() => console.log('Migration completed!'))
    .catch(console.error)
}