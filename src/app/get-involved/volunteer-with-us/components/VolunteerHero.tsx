'use client';

import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import type { VolunteerHeroConfig } from '@/types';

interface VolunteerHeroProps {
  config?: Partial<VolunteerHeroConfig>;
}

const defaultConfig: VolunteerHeroConfig = {
  title: "Make a Difference in Your Community",
  subtitle: "Join our volunteer family and be part of something greater",
  description: "Whether you have a few hours a week or a day a month, your time and talents can help transform lives and strengthen communities. Every volunteer makes a meaningful impact.",
  backgroundImage: "/Church-Conference.jpg",
  ctaText: "Start Volunteering Today",
  stats: {
    volunteers: 850,
    hoursServed: 12000,
    projectsCompleted: 150,
    communitiesImpacted: 25
  }
};

export default function VolunteerHero({ config }: VolunteerHeroProps) {
  const heroConfig = { ...defaultConfig, ...config };
  const { title, subtitle, description, backgroundImage, ctaText, stats } = heroConfig;





  return (
    <section className="section bg-muted/20">
      <div className="section-inner">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          <div className="stack-lg">
            <div className="stack">
              <p className="eyebrow">Volunteer</p>
              <h1>{title}</h1>
              <p className="section-lead">{subtitle}</p>
            </div>
            <p className="text-muted-foreground max-w-2xl">
              {description}
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" asChild>
                <a href="/get-involved/volunteer-with-us#opportunities">
                  {ctaText}
                  <ArrowRight className="w-5 h-5 ml-2" />
                </a>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <a href="/about">Learn More About Us</a>
              </Button>
            </div>
          </div>

          <div className="relative">
            <div className="relative rounded-[var(--radius)] overflow-hidden border border-border/40">
              <Image
                src={backgroundImage}
                alt="Volunteers making a difference"
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
