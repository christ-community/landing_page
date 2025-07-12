import { Metadata } from 'next';
import GetInvolvedHero from './components/GetInvolvedHero';
import InvolvementOptions from './components/InvolvementOptions';
import WhyInvolvementMatters from './components/WhyInvolvementMatters';
import TestimonialsSection from '@/components/TestimonialsSection';
import type { VolunteerTestimonial } from '@/types';

const testimonials: VolunteerTestimonial[] = [
  {
    id: '1',
    name: "Sarah L.",
    role: "Volunteer",
    quote: "Volunteering has been an incredibly rewarding experience. It's about connecting with people and seeing the tangible impact of our collective efforts. I've grown so much in my faith.",
    image: "/worship-conference.jpeg",
    volunteeredSince: '2 years',
    favoriteActivity: 'Community Events'
  },
  {
    id: '2',
    name: "Michael B.",
    role: "Church Partner",
    quote: "Partnering with this ministry has allowed our church to extend its reach far beyond our local community. The resources and support have been invaluable.",
    image: "/Church-Conference.jpg",
    volunteeredSince: '3 years',
    favoriteActivity: 'Missionary Support'
  },
  {
    id: '3',
    name: "Emily R.",
    role: "Tract Recipient",
    quote: "I received a tract during a very difficult time in my life. The simple message of hope it contained was a light in the darkness and started me on my journey to faith.",
    image: "/worship-conference.jpeg",
    volunteeredSince: '1 year',
    favoriteActivity: 'Sharing Hope'
  },
];

export const metadata: Metadata = {
  title: 'Get Involved | Christ Community',
  description: 'Join our mission. Discover the many ways you can contribute, from finding a church and volunteering to ordering resources and providing support.',
  keywords: 'get involved, volunteer, find a church, donate, support ministry, Christian community',
};

export default function GetInvolvedPage() {
  return (
    <main>
      <GetInvolvedHero />
      <WhyInvolvementMatters />
      <InvolvementOptions />
      <TestimonialsSection 
        title="Voices of Our Community"
        subtitle="See what others are saying about their experience being part of the mission."
        testimonials={testimonials}
      />
    </main>
  );
} 