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

// Who We Are Hero data
const whoWeAreHeroData = {
  pageName: 'who-we-are',
  title: 'Who We Are',
  subtitle: 'Our story, our values, and the heart behind everything we do as a community of faith.',
  description: 'Christ Community is more than just a church—we\'re a family united by faith, hope, and love. Our journey began with a simple dream: to create a place where everyone can encounter God\'s grace.',
  ctaText: 'Meet Our Team',
  ctaUrl: '/about/meet-the-team',
  isActive: true,
};

async function createWhoWeAreHeroEntry() {
  const space = await client.getSpace(SPACE_ID);
  const environment = await space.getEnvironment(ENVIRONMENT_ID);

  console.log('\n📄 Creating Who We Are Page Hero entry...');

  try {
    // Check if entry already exists
    const existingEntries = await environment.getEntries({
      content_type: 'pageHero',
      'fields.pageName': 'who-we-are',
      limit: 1
    });

    if (existingEntries.items.length > 0) {
      console.log('✅ Who We Are page hero already exists');
      return;
    }

    // Create new entry
    const entry = await environment.createEntry('pageHero', {
      fields: {
        pageName: { 'en-US': whoWeAreHeroData.pageName },
        title: { 'en-US': whoWeAreHeroData.title },
        subtitle: { 'en-US': whoWeAreHeroData.subtitle },
        description: { 'en-US': whoWeAreHeroData.description },
        ctaText: { 'en-US': whoWeAreHeroData.ctaText },
        ctaUrl: { 'en-US': whoWeAreHeroData.ctaUrl },
        isActive: { 'en-US': whoWeAreHeroData.isActive }
      }
    });

    await entry.publish();
    console.log('✅ Created and published Who We Are page hero');
    console.log('Entry ID:', entry.sys.id);
  } catch (error: any) {
    console.error('❌ Error creating Who We Are page hero:', error.message);
    if (error.details?.errors) {
      console.error('Validation errors:', error.details.errors);
    }
  }
}

async function main() {
  try {
    console.log('🚀 Starting Who We Are Hero creation...');
    console.log('Space ID:', SPACE_ID);
    console.log('Environment ID:', ENVIRONMENT_ID);
    
    await createWhoWeAreHeroEntry();
    
    console.log('\n✅ Who We Are Hero setup completed!');
  } catch (error) {
    console.error('❌ Script failed:', error);
    process.exit(1);
  }
}

main();
