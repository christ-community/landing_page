import { Metadata } from 'next';
import ChurchFinderHero from './components/ChurchFinderHero';
import FeaturedChurches from './components/FeaturedChurches';
import ChurchFinderSection from '@/components/ChurchFinderSection';
import ChurchVisitorGuide from './components/ChurchVisitorGuide';
import NewsletterSection from '@/components/NewsletterSection';

// Custom configuration for the church finder on this page
const churchFinderConfig = {
  title: 'Find Churches in Your Area',
  subtitle: 'Search our comprehensive directory',
  description: 'Use our advanced search to find churches that match your preferences and location.',
  searchPlaceholder: 'Enter your postcode, town, or city',
  searchButtonText: 'Search Churches',
  maxDistance: 50 // Increased for dedicated page
};

// Custom newsletter configuration
const newsletterConfig = {
  title: 'Stay Connected with Church Communities',
  subtitle: 'Get updates about new churches, events, and resources in your area.',
  backgroundImage: '/worship-conference.jpeg',
  placeholder: 'Enter your email address',
  buttonLabel: 'Subscribe Now',
};

export const metadata: Metadata = {
  title: 'Find a Church | Christ Community',
  description: 'Discover welcoming churches in your area. Find your spiritual home with our comprehensive church directory and helpful visitor guides.',
  keywords: 'church finder, churches near me, find church, spiritual community, worship, faith',
};

export default function FindAChurchPage() {
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <ChurchFinderHero />
      
      {/* Featured Churches */}
      <FeaturedChurches />
      
      {/* Main Church Finder */}
      <ChurchFinderSection config={churchFinderConfig} />
      
      {/* Visitor Guide */}
      <ChurchVisitorGuide />
      
      {/* Newsletter */}
      <NewsletterSection config={newsletterConfig} />
    </main>
  );
} 