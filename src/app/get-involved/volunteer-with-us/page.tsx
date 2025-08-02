import { Metadata } from 'next';
import VolunteerHero from './components/VolunteerHero';
import VolunteerOpportunities from './components/VolunteerOpportunities';
import VolunteerProcess from './components/VolunteerProcess';
import VolunteerImpact from './components/VolunteerImpact';
import NewsletterSection from '@/components/NewsletterSection';
import { getPageHero, getVolunteerOpportunities, processAsset } from '../../../../lib/contentful-api';

export const metadata: Metadata = {
  title: 'Volunteer With Us | Christ Community',
  description: 'Join our volunteer community and make a meaningful difference. Discover opportunities that match your skills and interests while connecting with others who share your passion for service.',
  keywords: 'volunteer, community service, make a difference, church volunteer, volunteer opportunities',
};

// Custom newsletter configuration for volunteer page
const volunteerNewsletterConfig = {
  title: 'Stay Connected with Volunteer Opportunities',
  subtitle: 'Be the first to know about new volunteer programs, special events, and ways to make an impact.',
  backgroundImage: '/worship-conference.jpeg',
  placeholder: 'Enter your email address',
  buttonLabel: 'Join Our Community',
};

export default async function VolunteerWithUsPage() {
  const [pageHero, volunteerOpportunities] = await Promise.all([
    getPageHero('volunteer'),
    getVolunteerOpportunities()
  ]);

  // Create config from pageHero if available
  const heroConfig = pageHero ? {
    title: pageHero.title,
    subtitle: pageHero.subtitle,
    description: pageHero.description,
    ctaText: pageHero.ctaText,
    backgroundImage: processAsset(pageHero.backgroundImage)
  } : undefined;

  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <VolunteerHero config={heroConfig} />
      
      {/* Volunteer Opportunities */}
      <VolunteerOpportunities opportunities={volunteerOpportunities.map((opp: any) => ({ ...opp, id: opp.sys?.id || Math.random().toString() }))} />
      
      {/* How to Get Started */}
      <VolunteerProcess />
      
      {/* Impact Stories & Testimonials */}
      <VolunteerImpact />
      
      {/* Newsletter Signup */}
      <NewsletterSection config={volunteerNewsletterConfig} />
    </main>
  );
} 