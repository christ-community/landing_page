import HeroSection from '@/components/HeroSection';
import WhatWeDoSection from '@/app/(home)/components/WhatWeDoSection';
import UpcomingEventsSection from '@/components/UpcomingEventsSection';
import NewsletterSection from '@/components/NewsletterSection';
import HelpSection from '@/components/HelpSection';
import GiveToday from '@/components/GiveToday';
import TestimonialsSection from '@/components/TestimonialsSection';
import { getHighlightedTestimonials, getMinistryActivities, getPageContent, getUpcomingEvents, getPageHero, getChurches, processAsset } from '../../../lib/contentful-api';
import { unstable_cache } from 'next/cache';

// Cache the data fetching with tags for revalidation
const getCachedHomeData = unstable_cache(
  async () => {
    return await Promise.all([
      getHighlightedTestimonials(),
      getMinistryActivities(),
      getPageHero('home'),
      getUpcomingEvents(),
      getChurches()
    ]);
  },
  ['home-page-data'],
  { tags: ['testimonial', 'ministryActivity', 'pageHero', 'event', 'church'] }
);

export default async function HomePage() {
  const [testimonials, ministryActivities, heroData, upcomingEvents, churches] = await getCachedHomeData();

  // Process hero background image on server side if available
  const processedHeroData = heroData && heroData.backgroundImage ? {
    ...heroData,
    processedBackgroundImage: processAsset(heroData.backgroundImage)
  } : heroData;

  // Process church images on server side
  const processedChurches = churches.map(church => ({
    ...church,
    processedImage: church.image ? processAsset(church.image) : undefined
  }));

  return (
    <>
      <HeroSection pageHero={processedHeroData || undefined} />
      <WhatWeDoSection activities={ministryActivities} />
      <GiveToday />
      <TestimonialsSection testimonials={testimonials} />
      <UpcomingEventsSection events={upcomingEvents} />
      <NewsletterSection />
      <HelpSection />
    </>
  );
} 
