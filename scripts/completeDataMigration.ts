import { createClient } from 'contentful-management'
import * as fs from 'fs'
import * as path from 'path'

const managementClient = createClient({
  accessToken: process.env.CONTENTFUL_MANAGEMENT_TOKEN!
})

// ===== EXTRACTED DATA FROM ALL COMPONENTS =====

// Team Members (from TeamMembers.tsx)
const teamMembers = [
  {
    name: "Pastor Michael Johnson",
    role: "Senior Pastor", 
    department: "Leadership",
    bio: "Pastor Michael has been leading Christ Community for over 10 years with a heart for expository teaching and pastoral care. He is passionate about seeing people grow in their relationship with Christ and building authentic community.",
    specialties: ["Expository Preaching", "Pastoral Care", "Leadership Development"],
    yearsOfService: 10,
    education: "M.Div from Westminster Seminary",
    email: "pastor.michael@christcommunity.org",
    phone: "(555) 123-4567",
    favoriteVerse: "Ephesians 4:11-13",
    order: 1
  },
  {
    name: "Sarah Williams",
    role: "Associate Pastor",
    department: "Ministry",
    bio: "Pastor Sarah oversees our community outreach programs and women's ministry. Her passion for social justice and community engagement has helped expand our ministry impact throughout the city.",
    specialties: ["Community Outreach", "Women's Ministry", "Social Justice"],
    yearsOfService: 7,
    education: "M.A. in Ministry Leadership",
    email: "pastor.sarah@christcommunity.org",
    favoriteVerse: "Micah 6:8",
    order: 2
  },
  {
    name: "David Chen",
    role: "Youth Pastor",
    department: "Youth & Family",
    bio: "David brings energy and creativity to our youth ministry, helping young people navigate faith in today's world. He's known for his innovative teaching methods and genuine care for each student.",
    specialties: ["Youth Ministry", "Student Discipleship", "Creative Teaching"],
    yearsOfService: 5,
    education: "B.A. in Youth Ministry",
    email: "david@christcommunity.org",
    favoriteVerse: "1 Timothy 4:12",
    order: 3
  },
  {
    name: "Maria Rodriguez",
    role: "Worship Director",
    department: "Creative Arts",
    bio: "Maria leads our worship team with a heart for creating meaningful worship experiences. Her musical background and theological training help bridge the gap between artistry and worship.",
    specialties: ["Worship Leading", "Music Ministry", "Creative Arts"],
    yearsOfService: 6,
    education: "B.M. in Music Ministry",
    email: "maria@christcommunity.org",
    favoriteVerse: "Psalm 150:6",
    order: 4
  },
  {
    name: "James Thompson",
    role: "Family Pastor",
    department: "Family Ministry",
    bio: "James focuses on strengthening families and supporting parents in raising their children with biblical values. He coordinates our children's programs and family events.",
    specialties: ["Children's Ministry", "Family Counseling", "Parent Support"],
    yearsOfService: 8,
    education: "M.A. in Family Ministry",
    email: "james@christcommunity.org",
    favoriteVerse: "Deuteronomy 6:6-7",
    order: 5
  },
  {
    name: "Lisa Park",
    role: "Missions Coordinator",
    department: "Global Outreach",
    bio: "Lisa coordinates our global missions efforts and short-term mission trips. Her heart for the nations has helped our church develop partnerships with ministries around the world.",
    specialties: ["Global Missions", "Cross-Cultural Ministry", "Partnership Development"],
    yearsOfService: 4,
    education: "B.A. in Intercultural Studies",
    email: "lisa@christcommunity.org",
    favoriteVerse: "Matthew 28:19-20",
    order: 6
  }
]

// Ministry Activities (from WhatWeDoSection.tsx)
const ministryActivities = [
  {
    title: "Outreach & Evangelism",
    description: "Sharing the gospel through community events, street evangelism, and personal connections.",
    icon: "Megaphone",
    order: 1
  },
  {
    title: "Missionary Support (Help Code)",
    description: "Providing resources and assistance to missionaries serving locally and abroad.",
    icon: "Box", 
    order: 2
  },
  {
    title: "Healing & Lifting Resources",
    description: "Offering counseling, prayer, and practical support for spiritual and emotional healing.",
    icon: "HeartPulse",
    order: 3
  },
  {
    title: "Tract Distribution",
    description: "Equipping believers with gospel literature to spread the Good News in their circles.",
    icon: "BookOpen",
    order: 4
  },
  {
    title: "Blog & Teachings",
    description: "Publishing insightful articles and teachings to deepen understanding of God's Word.",
    icon: "PenLine",
    order: 5
  },
  {
    title: "Consultation Services",
    description: "Guidance and mentorship for churches and individuals seeking direction and growth.",
    icon: "Handshake",
    order: 6
  }
]

// Events (from UpcomingEventsSection.tsx)
const events = [
  {
    title: 'Sunday Worship',
    description: 'Weekly worship service',
    date: '2024-12-08',
    time: '10:00 AM',
    location: 'Main Sanctuary',
    category: 'Worship',
    attendees: 200,
    registrationUrl: '/contact',
    isRecurring: true,
    recurringPattern: 'Weekly on Sunday'
  },
  {
    title: 'Community Outreach',
    description: 'Serve the community',
    date: '2024-12-15',
    time: '9:00 AM',
    location: 'Community Center',
    category: 'Outreach',
    attendees: 75,
    registrationUrl: '/get-involved/volunteer-with-us'
  },
  {
    title: 'Youth Conference',
    description: 'Weekend for young people',
    date: '2024-12-20',
    time: 'All Day',
    location: 'Conference Hall',
    category: 'Conference',
    attendees: 150,
    registrationUrl: '/what-we-do/events-outreaches'
  },
  {
    title: 'Prayer Service',
    description: 'Prayer and healing service',
    date: '2024-12-08',
    time: '7:00 PM',
    location: 'Prayer Chapel',
    category: 'Prayer',
    attendees: 80,
    registrationUrl: '/what-we-do/healing-lifting-resources'
  }
]

// Event Categories (from UpcomingEventsSection.tsx)
const eventCategories = [
  { name: 'Worship Services', slug: 'worship', icon: 'Calendar', color: 'bg-orange-500' },
  { name: 'Community Outreach', slug: 'outreach', icon: 'Users', color: 'bg-purple-500' },
  { name: 'Special Events', slug: 'conference', icon: 'MapPin', color: 'bg-green-500' },
  { name: 'Prayer & Healing', slug: 'prayer', icon: 'Clock', color: 'bg-red-500' },
]

// Volunteer Opportunities (from VolunteerOpportunities.tsx)
const volunteerOpportunities = [
  {
    title: 'Community Outreach Coordinator',
    description: 'Help organize and lead community events, food drives, and outreach programs. Connect with local families and coordinate volunteer teams.',
    shortDescription: 'Lead community events and outreach programs',
    icon: 'Heart',
    timeCommitment: '4-6 hours/week',
    location: 'onsite',
    skillLevel: 'intermediate',
    category: 'outreach',
    requirements: ['Good communication skills', 'Leadership experience', 'Reliable transportation'],
    benefits: ['Leadership development', 'Community impact', 'Networking opportunities'],
    tags: ['Leadership', 'Community', 'Events'],
    isPopular: true
  },
  {
    title: 'Children\'s Ministry Assistant',
    description: 'Support Sunday school teachers, help with crafts and activities, and create a safe, fun environment for children to learn and grow.',
    shortDescription: 'Support children\'s programs and activities',
    icon: 'Users',
    timeCommitment: '2-3 hours/week',
    location: 'onsite',
    skillLevel: 'any',
    category: 'ministry',
    requirements: ['Love for children', 'Patience', 'Background check'],
    benefits: ['Work with kids', 'Flexible schedule', 'Training provided'],
    tags: ['Children', 'Teaching', 'Fun'],
    isPopular: true
  },
  {
    title: 'Event Planning Team',
    description: 'Plan and coordinate special events, conferences, and community gatherings. Handle logistics, vendor coordination, and volunteer management.',
    shortDescription: 'Plan and coordinate special events',
    icon: 'Calendar',
    timeCommitment: '5-8 hours/week',
    location: 'hybrid',
    skillLevel: 'intermediate',
    category: 'events',
    requirements: ['Organizational skills', 'Attention to detail', 'Event planning experience'],
    benefits: ['Event management experience', 'Creative outlet', 'Team collaboration'],
    tags: ['Planning', 'Organization', 'Creative'],
    isUrgent: true
  },
  {
    title: 'Tech Support Volunteer',
    description: 'Help maintain website, manage social media, assist with live streaming, and provide technical support for church services.',
    shortDescription: 'Provide technical support and digital assistance',
    icon: 'Computer',
    timeCommitment: '3-4 hours/week',
    location: 'remote',
    skillLevel: 'intermediate',
    category: 'technology',
    requirements: ['Basic tech skills', 'Problem-solving ability', 'Reliable internet'],
    benefits: ['Skill development', 'Remote flexibility', 'Tech experience'],
    tags: ['Technology', 'Remote', 'Support']
  },
  {
    title: 'Creative Arts Team',
    description: 'Design graphics, create promotional materials, assist with photography, and help with visual storytelling for various programs.',
    shortDescription: 'Create visual content and promotional materials',
    icon: 'Palette',
    timeCommitment: '2-4 hours/week',
    location: 'remote',
    skillLevel: 'intermediate',
    category: 'creative',
    requirements: ['Design software knowledge', 'Creative eye', 'Portfolio examples'],
    benefits: ['Portfolio building', 'Creative freedom', 'Skill development'],
    tags: ['Design', 'Creative', 'Visual']
  },
  {
    title: 'Administrative Assistant',
    description: 'Support office operations, help with data entry, answer phones, and assist with general administrative tasks.',
    shortDescription: 'Support daily office operations and administration',
    icon: 'Building',
    timeCommitment: '4-6 hours/week',
    location: 'onsite',
    skillLevel: 'beginner',
    category: 'administration',
    requirements: ['Basic computer skills', 'Good communication', 'Reliable schedule'],
    benefits: ['Office experience', 'Skill development', 'Professional references'],
    tags: ['Administration', 'Office', 'Support']
  }
]

// Involvement Options (from InvolvementOptions.tsx)
const involvementOptions = [
  {
    title: "Find a Church",
    description: "Connect with a local congregation and find your spiritual home.",
    href: "/get-involved/find-a-church",
    icon: "Map",
    bgColor: "bg-sky-100 dark:bg-sky-950/30",
    textColor: "text-sky-600 dark:text-sky-400",
    order: 1
  },
  {
    title: "Volunteer With Us",
    description: "Use your skills and passion to serve the community and support our mission.",
    href: "/get-involved/volunteer-with-us",
    icon: "Handshake",
    bgColor: "bg-orange-100 dark:bg-orange-950/30",
    textColor: "text-orange-600 dark:text-orange-400",
    order: 2
  },
  {
    title: "Order a Tract",
    description: "Get equipped with beautifully designed tracts to share the gospel.",
    href: "/get-involved/order-a-tract",
    icon: "BookOpen",
    bgColor: "bg-teal-100 dark:bg-teal-950/30",
    textColor: "text-teal-600 dark:text-teal-400",
    order: 3
  },
  {
    title: "Send Help",
    description: "Your financial support empowers us to continue our work and expand our reach.",
    href: "/get-involved/send-help",
    icon: "Heart",
    bgColor: "bg-rose-100 dark:bg-rose-950/30",
    textColor: "text-rose-600 dark:text-rose-400",
    order: 4
  }
]

// Tracts (from TractCatalog.tsx)
const tracts = [
  { 
    title: "The Four Spiritual Laws", 
    description: "A classic and effective presentation of the gospel message.", 
    tags: ["Foundation", "Classic"], 
    pricePer100: 15.00, 
    isPopular: true, 
    language: "English",
    author: "Campus Crusade for Christ",
    pages: 8
  },
  { 
    title: "More Than a Carpenter", 
    description: "Explores the claims of Jesus Christ and their validity.", 
    tags: ["Apologetics", "Youth"], 
    pricePer100: 18.00, 
    isPopular: true, 
    language: "English",
    author: "Josh McDowell",
    pages: 12
  },
  { 
    title: "The Case for Christ", 
    description: "A journalist's investigation into the evidence for Jesus.", 
    tags: ["Apologetics", "Skeptics"], 
    pricePer100: 20.00, 
    isPopular: false, 
    language: "English",
    author: "Lee Strobel",
    pages: 16
  },
  { 
    title: "God's Love Story", 
    description: "A simple, narrative-driven tract about God's love.", 
    tags: ["Story", "Children"], 
    pricePer100: 12.00, 
    isPopular: false, 
    language: "English",
    author: "Various",
    pages: 4
  },
  { 
    title: "Las Cuatro Leyes Espirituales", 
    description: "A classic and effective presentation of the gospel message.", 
    tags: ["Foundation", "Classic"], 
    pricePer100: 15.00, 
    isPopular: false, 
    language: "Spanish",
    author: "Campus Crusade for Christ",
    pages: 8
  },
  { 
    title: "Finding Hope", 
    description: "A tract designed for those going through difficult times.", 
    tags: ["Hope", "Outreach"], 
    pricePer100: 16.00, 
    isPopular: true, 
    language: "English",
    author: "Hope Ministries",
    pages: 6
  }
]

// Featured Churches (from FeaturedChurches.tsx)
const featuredChurches = [
  {
    name: 'All Souls Church Langham Place',
    address: {
      street: '2 All Souls Pl',
      city: 'London',
      state: 'Greater London',
      postcode: 'W1B 3DA',
      country: 'UK'
    },
    coordinates: { lat: 51.5183, lng: -0.1431 },
    contact: {
      phone: '+44 20 7580 3522',
      email: 'info@allsouls.org',
      website: 'https://www.allsouls.org'
    },
    services: {
      sunday: '9:00 AM, 11:30 AM & 6:30 PM',
      other: ['Midweek service Wednesday 1:10 PM']
    },
    pastor: 'Hugh Palmer',
    denomination: 'Church of England',
    isFeatured: true
  },
  {
    name: 'Holy Trinity Brompton',
    address: {
      street: 'Brompton Rd',
      city: 'London',
      state: 'Greater London',
      postcode: 'SW7 1JA',
      country: 'UK'
    },
    coordinates: { lat: 51.4994, lng: -0.1652 },
    contact: {
      phone: '+44 20 7581 8255',
      email: 'info@htb.org',
      website: 'https://www.htb.org'
    },
    services: {
      sunday: '9:00 AM, 11:00 AM & 6:30 PM',
      wednesday: '7:00 PM'
    },
    pastor: 'Nicky Gumbel',
    denomination: 'Church of England',
    isFeatured: true
  },
  {
    name: 'Kensington Temple',
    address: {
      street: '1 Kensington Park Rd',
      city: 'London',
      state: 'Greater London',
      postcode: 'W11 3BY',
      country: 'UK'
    },
    coordinates: { lat: 51.5130, lng: -0.1961 },
    contact: {
      phone: '+44 20 7792 7500',
      email: 'info@kt.org',
      website: 'https://www.kt.org'
    },
    services: {
      sunday: '8:30 AM, 10:30 AM & 6:30 PM',
      wednesday: '7:30 PM'
    },
    pastor: 'Colin Dye',
    denomination: 'Pentecostal',
    isFeatured: true
  }
]

// Blog Categories (from posts.ts)
const blogCategories = [
  { name: 'Faith & Doctrine', slug: 'faith-doctrine', description: 'Articles about Christian beliefs and theology' },
  { name: 'Community & Outreach', slug: 'community-outreach', description: 'Stories from our community and outreach programs' },
  { name: 'Sermons & Series', slug: 'sermons-series', description: 'Sermon transcripts and series announcements' },
  { name: 'Church Life', slug: 'church-life', description: 'News and updates about church activities' },
  { name: 'Testimonies', slug: 'testimonies', description: 'Personal stories of faith and transformation' }
]

// Testimonials (from various components)
const testimonials = [
  {
    name: "Sarah L.",
    role: "Volunteer",
    quote: "Volunteering has been an incredibly rewarding experience. It's about connecting with people and seeing the tangible impact of our collective efforts. I've grown so much in my faith.",
    volunteeredSince: '2 years',
    favoriteActivity: 'Community Events',
    order: 1
  },
  {
    name: "Michael B.",
    role: "Church Partner",
    quote: "Partnering with this ministry has allowed our church to extend its reach far beyond our local community. The resources and support have been invaluable.",
    volunteeredSince: '3 years',
    favoriteActivity: 'Missionary Support',
    order: 2
  },
  {
    name: "Emily R.",
    role: "Tract Recipient",
    quote: "I received a tract during a very difficult time in my life. The simple message of hope it contained was a light in the darkness and started me on my journey to faith.",
    volunteeredSince: '1 year',
    favoriteActivity: 'Sharing Hope',
    order: 3
  },
  {
    name: "Pastor John S.",
    role: "Lead Pastor, Grace Fellowship",
    quote: "The consultation services were a game-changer for our small church. We now have a clear vision and the tools to actually achieve it.",
    volunteeredSince: "2023",
    favoriteActivity: "Leadership Consultation",
    order: 4
  },
  {
    name: "David M.",
    role: "Resource User",
    quote: "The resources on healing have been a balm to my soul during a very difficult season. Thank you for providing such practical and hope-filled content.",
    volunteeredSince: "2024",
    favoriteActivity: "Healing Resources",
    order: 5
  }
]

// Navigation Items (from Header.tsx)
const navigationItems = [
  { label: "Home", href: "/", order: 1, isActive: true },
  {
    label: "About Us",
    href: "/about",
    icon: "Users",
    description: "Learn about our church",
    order: 2,
    children: [
      {
        label: "Who We Are",
        href: "/about/who-we-are",
        icon: "Users",
        description: "Our mission, vision, and beliefs.",
        order: 1
      },
      {
        label: "Meet the Team",
        href: "/about/meet-the-team",
        icon: "UserCheck",
        description: "Get to know our pastors and staff.",
        order: 2
      },
      {
        label: "Our Message",
        href: "/about/our-message",
        icon: "BookOpen",
        description: "Explore the core of our teachings.",
        order: 3
      }
    ]
  },
  {
    label: "What We Do",
    href: "/what-we-do",
    icon: "Activity",
    description: "Our ministries and services",
    order: 3,
    children: [
      {
        label: "Events & Outreaches",
        href: "/what-we-do/events-outreaches",
        icon: "Calendar",
        description: "Find upcoming church and community events.",
        order: 1
      },
      {
        label: "Healing Resources",
        href: "/what-we-do/healing-lifting-resources",
        icon: "HeartPulse",
        description: "Support for your spiritual and emotional needs.",
        order: 2
      },
      {
        label: "Consultation Services",
        href: "/what-we-do/access-consultation-services",
        icon: "Handshake",
        description: "Get guidance from our pastoral team.",
        order: 3
      }
    ]
  },
  {
    label: "Get Involved",
    href: "/get-involved",
    icon: "Heart",
    description: "Ways to participate",
    order: 4,
    children: [
      {
        label: "Volunteer With Us",
        href: "/get-involved/volunteer-with-us",
        icon: "HandHelping",
        description: "Use your gifts to serve the community.",
        order: 1
      },
      {
        label: "Send Help (Help Code)",
        href: "/get-involved/send-help",
        icon: "HelpCircle",
        description: "Give or receive help from the church body.",
        order: 2
      },
      {
        label: "Order a Tract",
        href: "/get-involved/order-a-tract",
        icon: "BookOpen",
        description: "Share your faith with gospel literature.",
        order: 3
      },
      {
        label: "Find a Church",
        href: "/get-involved/find-a-church",
        icon: "Church",
        description: "Locate a like-minded church in another area.",
        order: 4
      }
    ]
  },
  { label: "Blog", href: "/blog", order: 5, isActive: true },
  { label: "Contact", href: "/contact", order: 6, isActive: true }
]

// Site Settings
const siteSettings = {
  siteName: 'Christ Community',
  contactPhone: '(555) 123-4567',
  contactEmail: 'info@christcommunity.org',
  emergencyPhone: '+15551234567',
  footerText: '©2025 Christ Community. All rights reserved.',
  address: {
    street: '123 Faith Street',
    city: 'Community City',
    state: 'CC',
    zipCode: '12345'
  },
  serviceTimes: [
    { name: 'Sunday Worship', time: '9:00 AM & 11:00 AM' },
    { name: 'Wednesday Bible Study', time: '7:00 PM' },
    { name: 'Youth Group', time: 'Friday 6:30 PM' }
  ],
  officeHours: 'Mon-Fri: 9:00 AM - 5:00 PM',
  missionStatement: 'Building community through Christ. Join us as we gather to worship, grow in faith, and serve our community together.',
  socialMediaLinks: [
    {
      platform: "Facebook",
      href: "#",
      ariaLabel: "Follow us on Facebook"
    },
    {
      platform: "Twitter",
      href: "#",
      ariaLabel: "Follow us on Twitter"
    },
    {
      platform: "Pinterest",
      href: "#",
      ariaLabel: "Follow us on Pinterest"
    }
  ]
}

// Page Content (Hero sections and page-specific content)
const pageContents = [
  {
    slug: 'home',
    title: 'Building community through Christ',
    subtitle: '',
    description: 'Join us as we gather to worship, grow in faith, and serve our community together. Experience God\'s love in a welcoming environment where everyone belongs.',
    seoTitle: 'Christ Community - Building Faith Together',
    seoDescription: 'Join Christ Community for worship, fellowship, and spiritual growth. Everyone is welcome in our caring Christian community.'
  },
  {
    slug: 'about',
    title: 'About Christ Community',
    subtitle: 'Discover our heart, mission, and the people who make this community special.',
    description: 'Learn about our journey, values, and the vision that drives our community forward.',
    seoTitle: 'About Us | Christ Community',
    seoDescription: 'Learn about Christ Community - our story, mission, values, and the people who make this community special.'
  },
  {
    slug: 'contact',
    title: 'Get in Touch',
    subtitle: 'We\'re here to connect, serve, and walk alongside you in your journey of faith.',
    description: 'Contact Christ Community for prayer, support, or to learn more about our ministries.',
    seoTitle: 'Contact Us | Christ Community',
    seoDescription: 'Get in touch with Christ Community. We\'d love to hear from you and explore how we can serve together.'
  },
  {
    slug: 'get-involved',
    title: 'Get Involved',
    subtitle: 'Join our mission and discover the many ways you can contribute to our community.',
    description: 'Find your place to serve and connect with the heart of our mission.',
    seoTitle: 'Get Involved | Christ Community',
    seoDescription: 'Join our mission. Discover the many ways you can contribute, from finding a church and volunteering to ordering resources and providing support.'
  },
  {
    slug: 'what-we-do',
    title: 'Serving God by Serving Others',
    subtitle: 'We are committed to making a difference through practical ministry, compassionate outreach, and the sharing of life-changing resources.',
    description: 'Explore the ways we are actively building the kingdom through our core ministries.',
    seoTitle: 'What We Do | Christ Community',
    seoDescription: 'Discover our core ministries, including events, consultation services, healing resources, and our blog. Learn how we are serving the community and building the kingdom.'
  }
]

// Import blog posts from existing data
import { posts } from '../src/lib/posts'

export async function migrateAllContent() {
  const space = await managementClient.getSpace(process.env.CONTENTFUL_SPACE_ID!)
  const environment = await space.getEnvironment('master')

  try {
    console.log('🚀 Starting complete content migration...')

    // 1. Create Categories first (referenced by other content)
    console.log('📁 Creating categories...')
    const categoryEntries: any = {}
    
    for (const category of blogCategories) {
      const entry = await environment.createEntry('category', {
        fields: {
          name: { 'en-US': category.name },
          slug: { 'en-US': category.slug },
          description: { 'en-US': category.description }
        }
      })
      await entry.publish()
      categoryEntries[category.name] = entry
      console.log(`✅ Created category: ${category.name}`)
    }

    // 2. Create Event Categories
    console.log('📅 Creating event categories...')
    const eventCategoryEntries: any = {}
    
    for (const eventCat of eventCategories) {
      const entry = await environment.createEntry('eventCategory', {
        fields: {
          name: { 'en-US': eventCat.name },
          slug: { 'en-US': eventCat.slug },
          icon: { 'en-US': eventCat.icon },
          color: { 'en-US': eventCat.color }
        }
      })
      await entry.publish()
      eventCategoryEntries[eventCat.slug] = entry
      console.log(`✅ Created event category: ${eventCat.name}`)
    }

    // 3. Create Team Members
    console.log('👥 Creating team members...')
    const teamMemberEntries: any = {}
    
    for (const member of teamMembers) {
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
          phone: { 'en-US': member.phone },
          favoriteVerse: { 'en-US': member.favoriteVerse },
          order: { 'en-US': member.order },
          isActive: { 'en-US': true }
        }
      })
      await entry.publish()
      teamMemberEntries[member.name] = entry
      console.log(`✅ Created team member: ${member.name}`)
    }

    // 4. Create Blog Posts
    console.log('📝 Creating blog posts...')
    
    for (const post of posts) {
      const categoryEntry = categoryEntries[post.category]
      const authorEntry = teamMemberEntries['Pastor Michael Johnson'] // Default author
      
      const entry = await environment.createEntry('blogPost', {
        fields: {
          title: { 'en-US': post.title },
          slug: { 'en-US': post.href.replace('/blog/', '') },
          excerpt: { 'en-US': post.excerpt },
          content: { 
            'en-US': {
              nodeType: 'document',
              data: {},
              content: [{
                nodeType: 'paragraph',
                data: {},
                content: [{
                  nodeType: 'text',
                  value: post.content,
                  marks: [],
                  data: {}
                }]
              }]
            }
          },
          author: { 'en-US': { sys: { type: 'Link', linkType: 'Entry', id: authorEntry.sys.id } } },
          publishDate: { 'en-US': new Date(post.date).toISOString() },
          category: { 'en-US': { sys: { type: 'Link', linkType: 'Entry', id: categoryEntry.sys.id } } },
          isPublished: { 'en-US': true },
          isFeatured: { 'en-US': false }
        }
      })
      await entry.publish()
      console.log(`✅ Created blog post: ${post.title}`)
    }

    // 5. Create Ministry Activities
    console.log('🛠️ Creating ministry activities...')
    
    for (const activity of ministryActivities) {
      const entry = await environment.createEntry('ministryActivity', {
        fields: {
          title: { 'en-US': activity.title },
          description: { 'en-US': activity.description },
          icon: { 'en-US': activity.icon },
          order: { 'en-US': activity.order },
          isActive: { 'en-US': true }
        }
      })
      await entry.publish()
      console.log(`✅ Created ministry activity: ${activity.title}`)
    }

    // 6. Create Events
    console.log('📅 Creating events...')
    
    for (const event of events) {
      const categoryEntry = eventCategoryEntries[event.category.toLowerCase()]
      
      const entry = await environment.createEntry('event', {
        fields: {
          title: { 'en-US': event.title },
          description: { 'en-US': event.description },
          date: { 'en-US': event.date },
          time: { 'en-US': event.time },
          location: { 'en-US': event.location },
          category: categoryEntry ? { 'en-US': { sys: { type: 'Link', linkType: 'Entry', id: categoryEntry.sys.id } } } : undefined,
          registrationUrl: { 'en-US': event.registrationUrl },
          attendees: { 'en-US': event.attendees },
          isRecurring: { 'en-US': event.isRecurring || false },
          recurringPattern: { 'en-US': event.recurringPattern || '' },
          isActive: { 'en-US': true }
        }
      })
      await entry.publish()
      console.log(`✅ Created event: ${event.title}`)
    }

    // 7. Create Volunteer Opportunities
    console.log('🤝 Creating volunteer opportunities...')
    
    for (const opportunity of volunteerOpportunities) {
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
          isPopular: { 'en-US': opportunity.isPopular || false },
          isUrgent: { 'en-US': opportunity.isUrgent || false },
          isActive: { 'en-US': true }
        }
      })
      await entry.publish()
      console.log(`✅ Created volunteer opportunity: ${opportunity.title}`)
    }

    // 8. Create Involvement Options
    console.log('🎯 Creating involvement options...')
    
    for (const option of involvementOptions) {
      const entry = await environment.createEntry('involvementOption', {
        fields: {
          title: { 'en-US': option.title },
          description: { 'en-US': option.description },
          href: { 'en-US': option.href },
          icon: { 'en-US': option.icon },
          bgColor: { 'en-US': option.bgColor },
          textColor: { 'en-US': option.textColor },
          order: { 'en-US': option.order },
          isActive: { 'en-US': true }
        }
      })
      await entry.publish()
      console.log(`✅ Created involvement option: ${option.title}`)
    }

    // 9. Create Tracts
    console.log('📖 Creating tracts...')
    
    for (const tract of tracts) {
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
          isActive: { 'en-US': true }
        }
      })
      await entry.publish()
      console.log(`✅ Created tract: ${tract.title}`)
    }

    // 10. Create Churches
    console.log('⛪ Creating churches...')
    
    for (const church of featuredChurches) {
      const entry = await environment.createEntry('church', {
        fields: {
          name: { 'en-US': church.name },
          address: { 'en-US': church.address },
          coordinates: { 'en-US': church.coordinates },
          contact: { 'en-US': church.contact },
          services: { 'en-US': church.services },
          pastor: { 'en-US': church.pastor },
          denomination: { 'en-US': church.denomination },
          isFeatured: { 'en-US': church.isFeatured },
          isActive: { 'en-US': true }
        }
      })
      await entry.publish()
      console.log(`✅ Created church: ${church.name}`)
    }

    // 11. Create Testimonials
    console.log('💬 Creating testimonials...')
    
    for (const testimonial of testimonials) {
      const entry = await environment.createEntry('testimonial', {
        fields: {
          name: { 'en-US': testimonial.name },
          role: { 'en-US': testimonial.role },
          quote: { 'en-US': testimonial.quote },
          volunteeredSince: { 'en-US': testimonial.volunteeredSince },
          favoriteActivity: { 'en-US': testimonial.favoriteActivity },
          order: { 'en-US': testimonial.order },
          isActive: { 'en-US': true },
          isHighlighted: { 'en-US': false }
        }
      })
      await entry.publish()
      console.log(`✅ Created testimonial: ${testimonial.name}`)
    }

    // 12. Create Navigation Items
    console.log('🧭 Creating navigation...')
    
    const navigationEntries: any = {}
    
    // Create parent navigation items first
    for (const item of navigationItems) {
      if (!item.children) {
        const entry = await environment.createEntry('navigationItem', {
          fields: {
            label: { 'en-US': item.label },
            href: { 'en-US': item.href },
            icon: { 'en-US': item.icon || '' },
            description: { 'en-US': item.description || '' },
            order: { 'en-US': item.order },
            isActive: { 'en-US': item.isActive !== false }
          }
        })
        await entry.publish()
        navigationEntries[item.label] = entry
        console.log(`✅ Created navigation item: ${item.label}`)
      }
    }

    // Create parent items with children
    for (const item of navigationItems) {
      if (item.children) {
        const childEntries = []
        
        // Create child items first
        for (const child of item.children) {
          const childEntry = await environment.createEntry('navigationItem', {
            fields: {
              label: { 'en-US': child.label },
              href: { 'en-US': child.href },
              icon: { 'en-US': child.icon || '' },
              description: { 'en-US': child.description || '' },
              order: { 'en-US': child.order },
              isActive: { 'en-US': true }
            }
          })
          await childEntry.publish()
          childEntries.push({ sys: { type: 'Link', linkType: 'Entry', id: childEntry.sys.id } })
        }

        // Create parent with children references
        const parentEntry = await environment.createEntry('navigationItem', {
          fields: {
            label: { 'en-US': item.label },
            href: { 'en-US': item.href },
            icon: { 'en-US': item.icon || '' },
            description: { 'en-US': item.description || '' },
            children: { 'en-US': childEntries },
            order: { 'en-US': item.order },
            isActive: { 'en-US': true }
          }
        })
        await parentEntry.publish()
        navigationEntries[item.label] = parentEntry
        console.log(`✅ Created navigation item with children: ${item.label}`)
      }
    }

    // 13. Create Page Contents
    console.log('📄 Creating page contents...')
    
    for (const page of pageContents) {
      const entry = await environment.createEntry('pageContent', {
        fields: {
          title: { 'en-US': page.title },
          subtitle: { 'en-US': page.subtitle },
          description: { 'en-US': page.description },
          slug: { 'en-US': page.slug },
          seoTitle: { 'en-US': page.seoTitle },
          seoDescription: { 'en-US': page.seoDescription }
        }
      })
      await entry.publish()
      console.log(`✅ Created page content: ${page.title}`)
    }

    // 14. Create Site Settings
    console.log('⚙️ Creating site settings...')
    
    const siteSettingsEntry = await environment.createEntry('siteSettings', {
      fields: {
        siteName: { 'en-US': siteSettings.siteName },
        contactPhone: { 'en-US': siteSettings.contactPhone },
        contactEmail: { 'en-US': siteSettings.contactEmail },
        emergencyPhone: { 'en-US': siteSettings.emergencyPhone },
        footerText: { 'en-US': siteSettings.footerText },
        address: { 'en-US': siteSettings.address },
        serviceTimes: { 'en-US': siteSettings.serviceTimes },
        officeHours: { 'en-US': siteSettings.officeHours },
        missionStatement: { 'en-US': siteSettings.missionStatement },
        socialMediaLinks: { 'en-US': siteSettings.socialMediaLinks }
      }
    })
    await siteSettingsEntry.publish()
    console.log('✅ Created site settings')

    // 15. Create Newsletter Settings
    console.log('📧 Creating newsletter settings...')
    
    const newsletterEntry = await environment.createEntry('newsletter', {
      fields: {
        title: { 'en-US': 'Stay Updated with Our Newsletter' },
        subtitle: { 'en-US': 'Get the latest news, updates, and exclusive offers delivered straight to your inbox.' },
        placeholder: { 'en-US': 'Enter your email address' },
        buttonLabel: { 'en-US': 'Join now' },
        isActive: { 'en-US': true }
      }
    })
    await newsletterEntry.publish()
    console.log('✅ Created newsletter settings')

    console.log('🎉 Complete content migration finished successfully!')
    console.log(`
📊 Migration Summary:
- ${blogCategories.length} Categories
- ${eventCategories.length} Event Categories  
- ${teamMembers.length} Team Members
- ${posts.length} Blog Posts
- ${ministryActivities.length} Ministry Activities
- ${events.length} Events
- ${volunteerOpportunities.length} Volunteer Opportunities
- ${involvementOptions.length} Involvement Options
- ${tracts.length} Tracts
- ${featuredChurches.length} Churches
- ${testimonials.length} Testimonials
- ${navigationItems.length} Navigation Items
- ${pageContents.length} Page Contents
- 1 Site Settings
- 1 Newsletter Settings

🚀 Total: ${blogCategories.length + eventCategories.length + teamMembers.length + posts.length + ministryActivities.length + events.length + volunteerOpportunities.length + involvementOptions.length + tracts.length + featuredChurches.length + testimonials.length + navigationItems.length + pageContents.length + 2} Content Entries Created!
    `)
    
  } catch (error) {
    console.error('❌ Migration failed:', error)
  }
}

// Run the migration
if (require.main === module) {
  migrateAllContent()
    .then(() => console.log('Migration completed'))
    .catch(console.error)
}