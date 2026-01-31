'use client';

import Image from 'next/image';
import { Badge } from '@/components/ui/badge';
import { Calendar, MapPin, Clock } from 'lucide-react';

const defaultConfig = {
  title: "The Big Church Conference Swansea",
  subtitle: "The gathering of Christians from different denominations in South Wales",
};

export default function PhotozenHero() {
  const { title, subtitle } = defaultConfig;

  return (
    <section className="section bg-muted/20">
      <div className="section-inner">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          <div className="stack-lg text-center lg:text-left">
            <Badge className="bg-background/80 text-foreground border border-border/40 w-fit">Past Event - November 2025</Badge>
            <div className="stack">
              <h1>{title}</h1>
              <p className="section-lead">{subtitle}</p>
            </div>
            <div className="space-y-3 text-muted-foreground">
              <div className="flex items-center gap-3 justify-center lg:justify-start">
                <Calendar className="w-5 h-5 text-primary" />
                <span>Saturday, November 15th, 2025</span>
              </div>
              <div className="flex items-center gap-3 justify-center lg:justify-start">
                <Clock className="w-5 h-5 text-primary" />
                <span>5:00 PM - 8:00 PM</span>
              </div>
              <div className="flex items-center gap-3 justify-center lg:justify-start">
                <MapPin className="w-5 h-5 text-primary" />
                <span>47B Westbury Street, Swansea, SA1 4JW</span>
              </div>
            </div>
            <Badge className="bg-muted text-foreground border border-border/40 w-fit">Event Concluded</Badge>
          </div>

          <div className="relative">
            <div className="relative rounded-[var(--radius)] overflow-hidden border border-border/40">
              <Image
                src="/Church-Conference.jpg"
                alt="Church Conference"
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
