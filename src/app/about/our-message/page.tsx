import { Metadata } from 'next';
import MessageHero from '@/app/about/our-message/components/MessageHero';
import CoreBeliefs from '@/app/about/our-message/components/CoreBeliefs';

export const metadata: Metadata = {
  title: 'Our Message | Christ Community',
  description: 'Discover the core beliefs and biblical truths that guide our community and shape our mission at Christ Community.',
};

export default function OurMessagePage() {
  return (
    <>
      <MessageHero />
      <CoreBeliefs />
    </>
  );
} 