'use client';

import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import type { SendHelpPageConfig } from '@/types';
import type { IPageHero } from '../../../../../types/contentful';

interface SendHelpHeroProps {
  config?: Partial<SendHelpPageConfig['hero']>;
  pageHero?: IPageHero | null;
}

const defaultConfig: SendHelpPageConfig['hero'] = {
  title: "Your Support, Their Hope",
  subtitle: "Join us in making a tangible difference in the lives of individuals and communities.",
  backgroundImage: "/worship-conference.jpeg",
};

export default function SendHelpHero({ config, pageHero }: SendHelpHeroProps) {
  const heroConfig = { ...defaultConfig, ...config };
  const { title, subtitle, backgroundImage } = heroConfig;

  const handleScrollToOptions = () => {
    const optionsSection = document.querySelector('[data-section="help-options"]');
    optionsSection?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="section bg-muted/20">
      <div className="section-inner">
        <div className="relative overflow-hidden rounded-[var(--radius)] border border-border/40 bg-card">
          <div className="absolute inset-0">
            <Image
              src={backgroundImage}
              alt="Community support background"
              fill
              className="object-cover opacity-15"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-card via-card/70 to-transparent" />
          </div>
          <div className="relative z-10 px-8 py-16 sm:px-12 lg:px-16 text-center">
            <div className="max-w-3xl mx-auto stack-lg">
              <div className="stack">
                <p className="eyebrow">Send Help</p>
                <h1>{title}</h1>
                <p className="section-lead">{subtitle}</p>
              </div>
              <p className="text-muted-foreground">
                Every act of generosity, big or small, contributes to a wave of positive change. Discover how you can send help and be a beacon of light in someone's life today.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" onClick={handleScrollToOptions}>
                  Explore Ways to Give
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
                <Button size="lg" variant="outline">
                  Share Our Mission
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
