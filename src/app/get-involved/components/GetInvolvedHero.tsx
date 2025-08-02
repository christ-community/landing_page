'use client';

import { Button } from '@/components/ui/button';
import { ArrowRight, Waves } from 'lucide-react';
import type { IPageHero } from '../../../../types/contentful';

const Shape = ({ className }: { className?: string }) => (
  <div className={`absolute rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob ${className}`} />
);

interface GetInvolvedHeroProps {
  pageHero?: IPageHero | null;
}

export default function GetInvolvedHero({ pageHero }: GetInvolvedHeroProps) {
  const handleScrollDown = () => {
    const nextSection = document.querySelector('[data-section="involvement-options"]');
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative bg-gray-50 dark:bg-gray-900 overflow-hidden">
      <div className="relative container mx-auto px-6 lg:px-12 py-32 text-center z-10">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-foreground tracking-tight mb-6">
          Join the Mission, Make a Difference
        </h1>
        <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto mb-10">
          There are many ways to contribute to our work. From finding a local church to volunteering your time, your involvement is crucial. Discover how you can take part in spreading hope and changing lives.
        </p>
        <Button
          size="lg"
          className="bg-red-600 text-white hover:bg-red-700 text-lg font-semibold px-8 py-6 rounded-full transition-transform duration-300 hover:scale-105"
          onClick={handleScrollDown}
        >
          See How You Can Help
          <ArrowRight className="w-5 h-5 ml-2" />
        </Button>
      </div>

      {/* Animated Blob Shapes */}
      <div className="absolute top-0 left-0 w-full h-full z-0">
        <Shape className="w-72 h-72 bg-red-300 top-10 left-10" />
        <Shape className="w-72 h-72 bg-sky-300 bottom-10 right-10 animation-delay-2000" />
        <Shape className="w-56 h-56 bg-orange-300 bottom-24 left-1/3 animation-delay-4000" />
      </div>

      {/* Optional: Add a subtle pattern */}
      <div
        className="absolute inset-0 z-0 opacity-10 dark:opacity-[0.03]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%239C92AC' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />
    </section>
  );
} 