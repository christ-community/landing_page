import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About Us | Christ Community',
};

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-20 text-center">
      <h1 className="text-4xl font-bold">This is the About Us page</h1>
    </div>
  );
} 