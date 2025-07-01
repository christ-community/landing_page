import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'What We Do | Christ Community',
};

export default function WhatWeDoPage() {
  return (
    <div className="container mx-auto px-4 py-20 text-center">
      <h1 className="text-4xl font-bold">This is the What We Do page</h1>
    </div>
  );
} 