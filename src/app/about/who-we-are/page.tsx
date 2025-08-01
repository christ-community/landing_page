import { Metadata } from 'next';
import WhoHero from '@/app/about/who-we-are/components/WhoHero';
import OurStory from '@/app/about/who-we-are/components/OurStory';

export const metadata: Metadata = {
  title: 'Who We Are | Christ Community',
  description: 'Learn about our story, values, and the heart behind everything we do as a community of faith at Christ Community.',
};

export default function WhoWeArePage() {
  return (
    <>
      <WhoHero />
      <OurStory />
    </>
  );
} 