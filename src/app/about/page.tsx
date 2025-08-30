import { Metadata } from 'next';
import AboutHero from '@/app/about/components/AboutHero';
import AboutOverview from '@/app/about/components/AboutOverview';
import { getCoreValues, getCommunityStats, getDifferentiators, getMissionVision, getPageHero } from '../../../lib/contentful-api';

export const metadata: Metadata = {
  title: 'About Us | Christ Community',
  description: 'Learn about Christ Community - our story, mission, values, and the people who make this community special.',
};

export default async function AboutPage() {
  const [coreValues, communityStats, differentiators, missionVision, pageHero] = await Promise.all([
    getCoreValues(),
    getCommunityStats(),
    getDifferentiators(),
    getMissionVision(),
    getPageHero('about')
  ]);

  return (
    <>
      <AboutHero pageHero={pageHero} />
      <AboutOverview 
        coreValues={coreValues}
        communityStats={communityStats}
        differentiators={differentiators}
        missionVision={missionVision}
      />
    </>
  );
} 