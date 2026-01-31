import { Metadata } from 'next';
import GetInvolvedHero from './components/GetInvolvedHero';
import InvolvementOptions from './components/InvolvementOptions';
import WhyInvolvementMatters from './components/WhyInvolvementMatters';
import TestimonialsSection from '@/components/TestimonialsSection';
import { getInvolvementOptions, getTestimonials, getPageHero } from '../../../lib/contentful-api';

// Testimonials now loaded from Contentful

export const metadata: Metadata = {
  title: 'Get Involved | Christ Community',
  description: 'Join our mission. Discover the many ways you can contribute, from volunteering to ordering resources and providing support.',
  keywords: 'get involved, volunteer, donate, support ministry, Christian community',
};

export default async function GetInvolvedPage() {
  const [involvementOptions, testimonials, pageHero] = await Promise.all([
    getInvolvementOptions(),
    getTestimonials(),
    getPageHero('get-involved')
  ]);

  return (
    <main>
      <GetInvolvedHero pageHero={pageHero} />
      <WhyInvolvementMatters />
      <InvolvementOptions involvementOptions={involvementOptions} />
      <TestimonialsSection 
        title="Voices of Our Community"
        subtitle="See what others are saying about their experience being part of the mission."
        testimonials={testimonials}
      />
    </main>
  );
} 
