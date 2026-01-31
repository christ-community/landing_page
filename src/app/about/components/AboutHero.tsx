'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Heart, Users, BookOpen } from 'lucide-react';
import Link from 'next/link';

import type { IPageHero } from '../../../../types/contentful';

interface AboutHeroProps {
  config?: {
    title?: string;
    subtitle?: string;
  };
  pageHero?: IPageHero | null;
}

const defaultConfig = {
  title: "About Christ Community",
  subtitle: "Discover our heart, mission, and the people who make this community special.",
};



export default function AboutHero({ config, pageHero }: AboutHeroProps) {
  // Use Contentful data if available, otherwise fall back to config or default
  const heroConfig = pageHero ? {
    title: pageHero.title,
    subtitle: pageHero.subtitle
  } : { ...defaultConfig, ...config };
  const { title, subtitle } = heroConfig;

  const handleScrollToContent = () => {
    const overviewSection = document.querySelector('[data-section="about-overview"]');
    overviewSection?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="section bg-muted/20">
      <div className="section-inner">
        <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-10 items-start">
          <div className="stack-lg">
            <div className="stack">
              <p className="eyebrow">About</p>
              <h1>{title}</h1>
              <p className="section-lead max-w-xl">{subtitle}</p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" asChild>
                <Link href="/about/who-we-are">Our Story</Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/about/meet-the-team">Meet Our Team</Link>
              </Button>
            </div>
            <Button variant="ghost" size="sm" onClick={handleScrollToContent}>
              Explore Our Mission
            </Button>
          </div>

          <div className="stack">
            <Link href="/about/who-we-are" className="block">
              <Card className="border-border/40 transition-all duration-300 hover:shadow-md">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-muted rounded-[var(--radius)]">
                      <Heart className="w-6 h-6 text-foreground" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-foreground">Who We Are</h3>
                      <p className="text-muted-foreground">
                        Discover our journey, values, and the vision that drives our community.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>

            <Link href="/about/meet-the-team" className="block">
              <Card className="border-border/40 transition-all duration-300 hover:shadow-md">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-muted rounded-[var(--radius)]">
                      <Users className="w-6 h-6 text-foreground" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-foreground">Meet the Team</h3>
                      <p className="text-muted-foreground">
                        Get to know the leaders and staff who serve our community.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>

            <Link href="/about/our-message" className="block">
              <Card className="border-border/40 transition-all duration-300 hover:shadow-md">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-muted rounded-[var(--radius)]">
                      <BookOpen className="w-6 h-6 text-foreground" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-foreground">Our Message</h3>
                      <p className="text-muted-foreground">
                        Explore the core beliefs and biblical truths that guide our ministry.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
