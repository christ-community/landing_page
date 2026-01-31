'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { BookOpen, Heart, Cross, MessageCircle } from 'lucide-react';
import Link from 'next/link';
import type { IMissionVision } from '../../../../../types/contentful';

interface MessageHeroProps {
  config?: {
    title?: string;
    subtitle?: string;
  };
  mission?: IMissionVision | null;
}

const defaultConfig = {
  title: "Our Message",
  subtitle: "Discover the core beliefs and biblical truths that guide our community and shape our mission.",
};

const pillars = [
  {
    icon: Cross,
    title: "Gospel Centered",
    description: "Christ's sacrifice and resurrection is the foundation of our faith",
  },
  {
    icon: BookOpen,
    title: "Scripture Based",
    description: "God's Word is our ultimate authority for faith and practice",
  },
  {
    icon: Heart,
    title: "Love Driven",
    description: "We are motivated by God's love to serve others compassionately",
  }
];

export default function MessageHero({ config, mission }: MessageHeroProps) {
  const heroConfig = { ...defaultConfig, ...config };
  const { title, subtitle } = heroConfig;

  return (
    <section className="section bg-muted/20">
      <div className="section-inner">
        <div className="text-center stack-lg mb-12">
          <div className="stack">
            <p className="eyebrow">Our Message</p>
            <h1>{title}</h1>
          </div>
          <p className="section-lead max-w-4xl mx-auto">{subtitle}</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/what-we-do/blog">
              <Button size="lg">
                <BookOpen className="w-5 h-5 mr-2" />
                Read Our Teachings
              </Button>
            </Link>
            <Link href="/contact">
              <Button size="lg" variant="outline">
                <MessageCircle className="w-5 h-5 mr-2" />
                Ask Questions
              </Button>
            </Link>
          </div>
        </div>

        <div className="bg-card rounded-[var(--radius)] p-8 md:p-12 border border-border/40 shadow-sm mb-12 text-center">
          <div className="inline-flex p-3 bg-muted text-foreground rounded-[var(--radius)] mb-6">
            <BookOpen className="w-6 h-6" />
          </div>
          <blockquote className="text-2xl font-semibold text-foreground mb-4 leading-relaxed">
            "For I am not ashamed of the gospel, because it is the power of God that brings salvation to everyone who believes"
          </blockquote>
          <cite className="text-sm text-muted-foreground font-semibold">
            Romans 1:16 NIV
          </cite>
        </div>

        <div>
          <div className="text-center stack-lg mb-8">
            <div className="stack">
              <p className="eyebrow">Foundation</p>
              <h2 className="section-title">Our Foundation</h2>
            </div>
            <p className="section-lead">Three pillars that anchor everything we believe and teach</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {pillars.map((pillar, index) => {
              const Icon = pillar.icon;
              return (
                <Card key={index} className="border-border/40 transition-all duration-300 hover:shadow-md">
                  <CardContent className="p-6 text-center">
                    <div className="inline-flex p-3 bg-muted text-foreground rounded-[var(--radius)] mb-4">
                      <Icon className="w-6 h-6" />
                    </div>
                    <h3 className="text-lg font-semibold text-foreground mb-3">
                      {pillar.title}
                    </h3>
                    <p className="text-muted-foreground">
                      {pillar.description}
                    </p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
