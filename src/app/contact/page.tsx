import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact Us | Christ Community',
};

export default function ContactPage() {
  return (
    <div className="container mx-auto px-4 py-20 text-center">
      <h1 className="text-4xl font-bold">This is the Contact page</h1>
    </div>
  );
} 