'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Users, Mail, Heart, Star, Award } from 'lucide-react';
import Link from 'next/link';

interface TeamHeroProps {
  config?: {
    title?: string;
    subtitle?: string;
  };
}

const defaultConfig = {
  title: "Meet Our Team",
  subtitle: "Get to know the dedicated leaders and staff who serve our community with passion and purpose.",
};

const teamHighlights = [
  {
    icon: Award,
    title: "Experienced Leadership",
    description: "Combined 50+ years of ministry experience"
  },
  {
    icon: Heart,
    title: "Passionate Service",
    description: "Dedicated to serving with love and integrity"
  },
  {
    icon: Star,
    title: "Diverse Gifts",
    description: "Each bringing unique talents and perspectives"
  }
];

export default function TeamHero({ config }: TeamHeroProps) {
  const heroConfig = { ...defaultConfig, ...config };
  const { title, subtitle } = heroConfig;

  return (
    <section className="section bg-muted/20">
      <div className="section-inner">
        <div className="text-center stack-lg mb-12">
          <div className="stack">
            <p className="eyebrow">Leadership</p>
            <h1>Meet Our Team</h1>
          </div>
          <p className="section-lead max-w-3xl mx-auto">{subtitle}</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact">
              <Button size="lg">
                <Mail className="w-5 h-5 mr-2" />
                Contact Our Team
              </Button>
            </Link>
            <Link href="/about/who-we-are">
              <Button size="lg" variant="outline">
                <Heart className="w-5 h-5 mr-2" />
                Our Story
              </Button>
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {teamHighlights.map((highlight, index) => {
            const Icon = highlight.icon;
            return (
              <Card key={index} className="border-border/40 transition-all duration-300 hover:shadow-md">
                <CardContent className="p-6 text-center">
                  <div className="inline-flex p-3 rounded-[var(--radius)] bg-muted text-foreground mb-4">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">
                    {highlight.title}
                  </h3>
                  <p className="text-muted-foreground">{highlight.description}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
