'use client';

import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { ArrowRight, Download } from 'lucide-react';
import type { OrderTractPageConfig } from '@/types';

interface OrderTractHeroProps {
  config?: Partial<OrderTractPageConfig['hero']>;
}

const defaultConfig: OrderTractPageConfig['hero'] = {
  title: "Spread the Word, Share the Hope",
  subtitle: "Equip yourself with beautifully designed gospel tracts to share with your community.",
  backgroundImage: "/worship-conference.jpeg",
};

export default function OrderTractHero({ config }: OrderTractHeroProps) {
  const heroConfig = { ...defaultConfig, ...config };
  const { title, subtitle, backgroundImage } = heroConfig;

  const handleScrollToCatalog = () => {
    const catalogSection = document.querySelector('[data-section="tract-catalog"]');
    catalogSection?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="section bg-muted/20">
      <div className="section-inner">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          <div className="stack-lg text-center lg:text-left">
            <div className="stack">
              <p className="eyebrow">Resources</p>
              <h1>{title}</h1>
              <p className="section-lead">{subtitle}</p>
            </div>
            <p className="text-muted-foreground max-w-2xl mx-auto lg:mx-0">
              Our tracts are designed to start conversations and clearly present the message of the gospel. Browse our catalog and order yours today.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Button size="lg" onClick={handleScrollToCatalog}>
                Browse Tracts
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
              <Button size="lg" variant="outline">
                <Download className="w-5 h-5 mr-2" />
                Free Samples
              </Button>
            </div>
          </div>

          <div className="relative">
            <div className="relative rounded-[var(--radius)] overflow-hidden border border-border/40">
              <Image
                src={backgroundImage}
                alt={title}
                width={600}
                height={700}
                className="object-cover w-full h-[420px] lg:h-[520px]"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
