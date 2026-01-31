'use client';

import { Button } from '@/components/ui/button';
import { Users, Calendar } from 'lucide-react';
import Link from 'next/link';
import type { IMissionVision, IPageHero } from '../../../../../types/contentful';

interface WhoHeroProps {
  config?: {
    title?: string;
    subtitle?: string;
  };
  missionVision?: IMissionVision[];
  pageHero?: IPageHero | null;
}

const defaultConfig = {
  title: "Who We Are",
  subtitle: "Our story, our values, and the heart behind everything we do as a community of faith.",
};

export default function WhoHero({ config, missionVision, pageHero }: WhoHeroProps) {
  // Use Contentful data if available, otherwise fall back to config or default
  const heroConfig = pageHero ? {
    title: pageHero.title,
    subtitle: pageHero.subtitle || defaultConfig.subtitle,
  } : { ...defaultConfig, ...config };
  const { title, subtitle } = heroConfig;

  return (
    <section className="section bg-muted/20">
      <div className="section-inner">
        <div className="text-center max-w-4xl mx-auto stack-lg">
          <div className="stack">
            <p className="eyebrow">Who We Are</p>
            <h1>{title}</h1>
          </div>
          <p className="section-lead">
            {subtitle}
          </p>
          <p className="text-muted-foreground">
            {pageHero?.description || "Christ community is an interdenominational Christian organisation, we are bonded by our faith in Christ. Our journey began with a small group of believers who are passionate about sharing the life of God within communities."}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href={pageHero?.ctaButton1Link || "/about"}>
              <Button size="lg">
                <Users className="w-5 h-5 mr-2" />
                {pageHero?.ctaButton1Text || "Meet the Team"}
              </Button>
            </Link>
            <Link href={pageHero?.ctaButton2Link || "https://calendly.com/christcommunityglobal/30min"} target="_blank" rel="noopener noreferrer">
              <Button size="lg" variant="outline">
                <Calendar className="w-5 h-5 mr-2" />
                {pageHero?.ctaButton2Text || "Book a visit"}
              </Button>
            </Link>
          </div>
          <div className="p-6 bg-card rounded-[var(--radius)] border border-border/40 max-w-2xl mx-auto">
            <blockquote className="text-lg font-medium text-foreground mb-2">
              "For where two or three gather in my name, there am I with them."
            </blockquote>
            <cite className="text-sm text-muted-foreground font-semibold">
              Matthew 18:20
            </cite>
          </div>
        </div>
      </div>
    </section>
  );
}
