import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Donate | Christ Community',
};

export default function DonatePage() {
  return (
    <div className="container mx-auto px-4 py-20 text-center">
      <h1 className="text-4xl font-bold">This is the Donate page</h1>
    </div>
  );
} 