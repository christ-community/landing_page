import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Who We Are | Christ Community',
};

export default function WhoWeArePage() {
  return (
    <div className="container mx-auto px-4 py-20 text-center">
      <h1 className="text-4xl font-bold">This is the Who We Are page</h1>
    </div>
  );
} 