import { Metadata } from 'next';
import MessageHero from '@/app/about/our-message/components/MessageHero';
import CoreBeliefs from '@/app/about/our-message/components/CoreBeliefs';
import { getCoreBeliefs, getMissionVisionByType } from '../../../../lib/contentful-api';
import { ICoreBelief, IMissionVision } from '../../../../types/contentful';

export const metadata: Metadata = {
  title: 'Our Message | Christ Community',
  description: 'Discover the core beliefs and biblical truths that guide our community and shape our mission at Christ Community.',
};

export default async function OurMessagePage() {
  const [coreBeliefs, mission] = await Promise.all([
    getCoreBeliefs(),
    getMissionVisionByType('mission')
  ]);

  return (
    <>
      <MessageHero  />
      <CoreBeliefs />
    </>
  );
} 