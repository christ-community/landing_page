import HeroSection from '@/components/HeroSection';
import WhatWeDoSection from '@/app/(home)/components/WhatWeDoSection';
import HealingResourcesSection from '@/app//(home)/components/HealingResourcesSection';
import UpcomingEventsSection from '@/components/UpcomingEventsSection';
import NewsletterSection from '@/components/NewsletterSection';
import HelpSection from '@/components/HelpSection';
import ChurchFinderSection from '@/components/ChurchFinderSection';
import GiveToday from '@/components/GiveToday';
import TestimonialsSection from '@/components/TestimonialsSection';
import { getHighlightedTestimonials, getMinistryActivities, getPageContent, getUpcomingEvents } from '../../../lib/contentful-api';

export default async function HomePage() {
  const [testimonials, ministryActivities, heroContent, upcomingEvents] = await Promise.all([
    getHighlightedTestimonials(),
    getMinistryActivities(),
    getPageContent('home'),
    getUpcomingEvents()
  ]);

  return (
    <>
      <HeroSection pageContent={heroContent || undefined} />
      <WhatWeDoSection activities={ministryActivities} />
      <GiveToday />
      <TestimonialsSection testimonials={testimonials} />
      <UpcomingEventsSection events={upcomingEvents} />
      <NewsletterSection />
      <ChurchFinderSection />
      <HealingResourcesSection />
      <HelpSection />
    </>
  );
} 