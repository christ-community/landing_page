import { Metadata } from 'next';
import GiveToday from '@/components/GiveToday';
import { getHelpImpact, getCommunityStats, getPageHero } from '../../../lib/contentful-api';

export const metadata: Metadata = {
  title: 'Donate | Christ Community',
  description: 'Support our ministry and make a difference in our community through your generous giving.',
};

export default async function DonatePage() {
  const [helpImpact, communityStats, pageHero] = await Promise.all([
    getHelpImpact(),
    getCommunityStats(),
    getPageHero('donate')
  ]);

  return (
    <>
      <GiveToday helpImpact={helpImpact} communityStats={communityStats} pageHero={pageHero} />
    </>
  );
} 