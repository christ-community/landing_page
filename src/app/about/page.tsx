import { Metadata } from 'next';
import AboutHero from '@/app/about/components/AboutHero';
import AboutOverview from '@/app/about/components/AboutOverview';

export const metadata: Metadata = {
  title: 'About Us | Christ Community',
  description: 'Learn about Christ Community - our story, mission, values, and the people who make this community special.',
};

export default function AboutPage() {
  return (
    <>
      <AboutHero />
      <AboutOverview />
    </>
  );
} 