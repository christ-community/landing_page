'use client';

import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Calendar, MapPin, ArrowRight, Users } from 'lucide-react';

const defaultConfig = {
  title: "100 Believers to Cardiff",
  subtitle: "Easter Evangelism Outreach 2026",
};

export default function CardiffHero() {
  const { title, subtitle } = defaultConfig;

  const handleScrollToForm = () => {
    const formSection = document.querySelector('#registration-form');
    formSection?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="section bg-muted/20">
      <div className="section-inner">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          <div className="stack-lg text-center lg:text-left">
            <div className="stack">
              <p className="eyebrow">Cardiff Outreach</p>
              <h1>{title}</h1>
              <p className="section-lead">{subtitle}</p>
            </div>
            <div className="space-y-3 text-muted-foreground">
              <div className="flex items-center gap-3 justify-center lg:justify-start">
                <Calendar className="w-5 h-5 text-primary" />
                <span className="font-semibold">Saturday, April 4th, 2026</span>
              </div>
              <div className="flex items-center gap-3 justify-center lg:justify-start">
                <MapPin className="w-5 h-5 text-primary" />
                <span>Cardiff City Center</span>
              </div>
              <div className="flex items-center gap-3 justify-center lg:justify-start">
                <Users className="w-5 h-5 text-primary" />
                <span>Target: 100 Believers</span>
              </div>
            </div>
            <div className="bg-muted/30 rounded-[var(--radius)] p-6 border border-border/40">
              <p className="text-muted-foreground leading-relaxed">
                Join us for a powerful evangelism outreach as we witness Christ, pray, and worship
                at Cardiff City Center this Easter. Be part of this revival moment.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Button size="lg" onClick={handleScrollToForm}>
                Sign Up Now
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </div>
          </div>

          <div className="relative">
            <div className="relative rounded-[var(--radius)] overflow-hidden border border-border/40">
              <Image
                src="/Church-Conference.jpg"
                alt="Evangelism Outreach"
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
