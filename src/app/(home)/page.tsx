'use client';

import HeroSection from '@/components/HeroSection';
import WhatWeDoSection from '@/app/(home)/components/WhatWeDoSection';
import HealingResourcesSection from '@/app/(home)/components/HealingResourcesSection';
import NewsletterSection from '@/components/NewsletterSection';

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <WhatWeDoSection />
      <HealingResourcesSection />
      <NewsletterSection />
    </>
  );
} 