import { Metadata } from 'next';
import ContactHero from '@/app/contact/components/ContactHero';
import ContactForm from '@/app/contact/components/ContactForm';
import ContactInfo from '@/app/contact/components/ContactInfo';

export const metadata: Metadata = {
  title: 'Contact Us | Christ Community',
  description: 'Get in touch with Christ Community. We\'d love to hear from you and explore how we can serve together.',
};

export default function ContactPage() {
  return (
    <>
      <ContactHero />
      <ContactInfo />
      <ContactForm />
    </>
  );
} 