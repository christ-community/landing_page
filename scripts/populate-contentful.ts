import { createClient } from 'contentful-management';
import * as dotenv from 'dotenv';
import * as path from 'path';

// Load environment variables
dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

const client = createClient({
  accessToken: process.env.CONTENTFUL_MANAGEMENT_TOKEN!,
});

const SPACE_ID = process.env.CONTENTFUL_SPACE_ID!;
const ENVIRONMENT_ID = process.env.CONTENTFUL_ENVIRONMENT || 'master';

// Page Hero entries data
const pageHeroesData = [
  {
    pageName: 'home',
    title: 'Welcome to Christ Community',
    subtitle: 'Building community through Christ. Join us as we gather to worship, grow in faith, and serve our community together.',
    isActive: true,
  },
  {
    pageName: 'about',
    title: 'About Christ Community',
    subtitle: 'Discover our heart, mission, and the people who make this community special.',
    isActive: true,
  },
  {
    pageName: 'what-we-do',
    title: 'Serving God by Serving Others',
    subtitle: 'We are committed to making a difference through practical ministry, compassionate outreach, and the sharing of life-changing resources.',
    isActive: true,
  },
  {
    pageName: 'get-involved',
    title: 'Join Our Mission',
    subtitle: 'Discover the many ways you can contribute, from finding a faith community and volunteering to ordering resources and providing support.',
    isActive: true,
  },
  {
    pageName: 'contact',
    title: 'Get in Touch',
    subtitle: 'We\'d love to hear from you and explore how we can serve together.',
    isActive: true,
  },
  {
    pageName: 'blog',
    title: 'Insights & Resources',
    subtitle: 'Explore our latest articles, case studies, and resources to help your community thrive.',
    isActive: true,
  },
  {
    pageName: 'donate',
    title: 'Support Our Ministry',
    subtitle: 'Your generous giving helps us make a difference in our community and beyond.',
    isActive: true,
  }
];

// Footer data
const footerData = {
  isActive: true,
  churchInfo: {
    name: 'Christ Community',
    description: 'Building community through Christ. Join us as we gather to worship, grow in faith, and serve our community together.',
    socialMediaLinks: [
      {
        platform: 'Facebook',
        href: 'https://facebook.com/christcommunity',
        ariaLabel: 'Follow us on Facebook'
      },
      {
        platform: 'Twitter',
        href: 'https://twitter.com/christcommunity',
        ariaLabel: 'Follow us on Twitter'
      },
      {
        platform: 'Pinterest',
        href: 'https://pinterest.com/christcommunity',
        ariaLabel: 'Follow us on Pinterest'
      }
    ]
  },
  quickLinks: [
    { href: '/about', label: 'About Us', isExternal: false },
    { href: '/what-we-do', label: 'What We Do', isExternal: false },
    { href: '/get-involved', label: 'Get Involved', isExternal: false },
    { href: '/get-involved/order-a-tract', label: 'Order Tracts', isExternal: false },
    { href: '/contact', label: 'Contact', isExternal: false }
  ],
  contactInfo: {
    address: {
      street: '123 Faith Street',
      city: 'Community City',
      state: 'CC',
      zipCode: '12345'
    },
    phone: '(555) 123-4567',
    email: 'info@christcommunity.org'
  },
  serviceTimes: [
    { name: 'Sunday Worship', time: '9:00 AM & 11:00 AM' },
    { name: 'Wednesday Bible Study', time: '7:00 PM' },
    { name: 'Youth Group', time: 'Friday 6:30 PM' }
  ],
  copyrightText: '©2025 Christ Community. All rights reserved.',
  legalLinks: [
    { href: '/privacy', label: 'Privacy Policy' },
    { href: '/terms', label: 'Terms of Service' }
  ]
};

async function createContentTypes() {
  const space = await client.getSpace(SPACE_ID);
  const environment = await space.getEnvironment(ENVIRONMENT_ID);

  // Create PageHero content type
  try {
    const pageHeroContentType = await environment.createContentTypeWithId('pageHero', {
      name: 'Page Hero',
      description: 'Hero sections for different pages',
      displayField: 'title',
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
          type: 'Text',
          required: false,
          localized: false
        },
        {
          id: 'pageName',
          name: 'Page Name',
          type: 'Symbol',
          required: true,
          localized: false,
          validations: [{
            in: ['home', 'about', 'what-we-do', 'get-involved', 'contact', 'blog', 'donate']
          }]
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
          required: true,
          localized: false
        }
      ]
    });

    await pageHeroContentType.publish();
    console.log('✅ PageHero content type created and published');
  } catch (error: any) {
    if (error.sys?.id === 'ValidationFailed' && error.message?.includes('already exists')) {
      console.log('ℹ️  PageHero content type already exists');
    } else {
      console.error('❌ Error creating PageHero content type:', error);
    }
  }

  // Create Footer content type
  try {
    const footerContentType = await environment.createContentTypeWithId('footer', {
      name: 'Footer',
      description: 'Footer configuration',
      fields: [
        {
          id: 'isActive',
          name: 'Is Active',
          type: 'Boolean',
          required: true,
          localized: false
        },
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
          required: false,
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
          required: false,
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
        }
      ]
    });

    await footerContentType.publish();
    console.log('✅ Footer content type created and published');
  } catch (error: any) {
    if (error.sys?.id === 'ValidationFailed' && error.message?.includes('already exists')) {
      console.log('ℹ️  Footer content type already exists');
    } else {
      console.error('❌ Error creating Footer content type:', error);
    }
  }
}

async function createPageHeroEntries() {
  const space = await client.getSpace(SPACE_ID);
  const environment = await space.getEnvironment(ENVIRONMENT_ID);

  console.log('\n📄 Creating Page Hero entries...');

  for (const heroData of pageHeroesData) {
    try {
      const entry = await environment.createEntry('pageHero', {
        fields: {
          title: { 'en-US': heroData.title },
          subtitle: { 'en-US': heroData.subtitle },
          pageName: { 'en-US': heroData.pageName },
          isActive: { 'en-US': heroData.isActive }
        }
      });

      await entry.publish();
      console.log(`✅ Created and published page hero: ${heroData.pageName}`);
    } catch (error: any) {
      console.error(`❌ Error creating page hero for ${heroData.pageName}:`, error.message);
    }
  }
}

async function createFooterEntry() {
  const space = await client.getSpace(SPACE_ID);
  const environment = await space.getEnvironment(ENVIRONMENT_ID);

  console.log('\n🦶 Creating Footer entry...');

  try {
    const entry = await environment.createEntry('footer', {
      fields: {
        isActive: { 'en-US': footerData.isActive },
        churchInfo: { 'en-US': footerData.churchInfo },
        quickLinks: { 'en-US': footerData.quickLinks },
        contactInfo: { 'en-US': footerData.contactInfo },
        serviceTimes: { 'en-US': footerData.serviceTimes },
        copyrightText: { 'en-US': footerData.copyrightText },
        legalLinks: { 'en-US': footerData.legalLinks }
      }
    });

    await entry.publish();
    console.log('✅ Created and published footer entry');
  } catch (error: any) {
    console.error('❌ Error creating footer entry:', error.message);
  }
}

async function main() {
  try {
    console.log('🚀 Starting Contentful population...');
    console.log(`Space: ${SPACE_ID}`);
    console.log(`Environment: ${ENVIRONMENT_ID}`);

    // Create content types first
    await createContentTypes();

    // Wait a moment for content types to be fully available
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Create entries
    await createPageHeroEntries();
    await createFooterEntry();

    console.log('\n🎉 Contentful population completed successfully!');
    console.log('👉 You can now view your content in the Contentful web app');

  } catch (error) {
    console.error('❌ Error during Contentful population:', error);
    process.exit(1);
  }
}

// Run if called directly
if (require.main === module) {
  main();
}

export { main as populateContentful };