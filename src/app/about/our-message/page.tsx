import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Our Message | Christ Community',
};

export default function OurMessagePage() {
  return (
    <div className="container mx-auto px-4 py-20 text-center">
      <h1 className="text-4xl font-bold">This is the Our Message page</h1>
    </div>
  );
} 