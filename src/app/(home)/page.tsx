'use client';

import HeroSection from '@/components/HeroSection';
import WhatWeDoSection from '@/app/(home)/components/WhatWeDoSection';
import HealingResourcesSection from '@/app/(home)/components/HealingResourcesSection';
import UpcomingEventsSection from '@/components/UpcomingEventsSection';
import NewsletterSection from '@/components/NewsletterSection';
import HelpSection from '@/components/HelpSection';
import ChurchFinderSection from '@/components/ChurchFinderSection';
import GiveToday from '@/components/GiveToday';
import BlogSection from "@/components/BlogSection";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <WhatWeDoSection />
      <GiveToday />
      <UpcomingEventsSection />
      <NewsletterSection />
      <ChurchFinderSection />
      <HealingResourcesSection />
      <HelpSection />
      <BlogSection />
    </>
  );
} 