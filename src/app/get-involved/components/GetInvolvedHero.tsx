'use client';

import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import type { IPageHero } from '../../../../types/contentful';

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
    <section className="section bg-muted/20">
      <div className="section-inner text-center">
        <div className="max-w-3xl mx-auto stack-lg">
          <div className="stack">
            <p className="eyebrow">Get Involved</p>
            <h1>Join the mission, make a difference</h1>
          </div>
          <p className="section-lead">
            There are many ways to contribute to our work. Your involvement strengthens our community and helps us serve with excellence.
          </p>
          <Button size="lg" onClick={handleScrollDown}>
            See How You Can Help
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
        </div>
      </div>
    </section>
  );
}
