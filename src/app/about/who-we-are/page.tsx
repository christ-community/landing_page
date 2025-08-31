import { Metadata } from 'next';
import WhoHero from '@/app/about/who-we-are/components/WhoHero';
import OurStory from '@/app/about/who-we-are/components/OurStory';
import { getTimelineEvents, getMissionVision, getCommunityStats, getPageHero } from '../../../../lib/contentful-api';

export const metadata: Metadata = {
  title: 'Who We Are | Christ Community',
  description: 'Learn about our story, values, and the heart behind everything we do as a community of faith at Christ Community.',
};

export default async function WhoWeArePage() {
  const [timelineEvents, missionVision, communityStats, heroData] = await Promise.all([
    getTimelineEvents(),
    getMissionVision(),
    getCommunityStats(),
    getPageHero('who-we-are')
  ]);

  return (
    <>
      <WhoHero missionVision={missionVision} pageHero={heroData} />
      <OurStory timelineEvents={timelineEvents} communityStats={communityStats} />
    </>
  );
} 