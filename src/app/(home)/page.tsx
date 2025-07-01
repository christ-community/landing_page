'use client';

import HeroSection from '@/components/HeroSection';
import WhatWeDoSection from '@/app/(home)/components/WhatWeDoSection';
import HealingResourcesSection from '@/app/(home)/components/HealingResourcesSection';

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <WhatWeDoSection />
      <HealingResourcesSection />
    </>
  );
} 