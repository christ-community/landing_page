'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import React from 'react';

interface EventsHeroProps {
  brandIconNode?: React.ReactNode;
  title: string;
  subtitle: string;
  primaryCta: { text: string; href: string; };
  mainImage: string;
  previewImage: string;
  previewLabel: string;
}

export default function EventsHero({
  brandIconNode,
  title,
  subtitle,
  primaryCta,
  mainImage,
  previewImage,
  previewLabel,
}: EventsHeroProps) {
  return (
    <section className="section bg-muted/20">
      <div className="section-inner">
        <div className="grid lg:grid-cols-[1.2fr_0.8fr] gap-10 items-center">
          <div className="flex flex-col text-center lg:text-left stack-lg">
            {brandIconNode}
            <h1>{title}</h1>
            <p className="section-lead max-w-xl">{subtitle}</p>
            <div className="flex items-center justify-center lg:justify-start gap-4">
              <Button size="lg" asChild>
                <Link href={primaryCta.href}>{primaryCta.text}</Link>
              </Button>
            </div>
          </div>

          <div className="relative">
            <div className="relative w-full h-[420px] rounded-[var(--radius)] overflow-hidden border border-border/40">
              <Image src={mainImage} alt={title} fill className="object-cover" priority />
            </div>
            <div className="mt-4 rounded-[var(--radius)] border border-border/40 bg-card p-3">
              <div className="relative aspect-video rounded-[var(--radius)] overflow-hidden">
                <Image src={previewImage} alt={previewLabel} fill className="object-cover" />
              </div>
              <p className="text-sm font-semibold mt-2 text-center text-muted-foreground">{previewLabel}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
