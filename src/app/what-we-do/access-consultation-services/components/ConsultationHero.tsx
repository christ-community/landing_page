'use client';

import Image from 'next/image';
import { Button } from '@/components/ui/button';

interface ConsultationHeroProps {
  title: string;
  subtitle: string;
  image: string;
}

export default function ConsultationHero({ title, subtitle, image }: ConsultationHeroProps) {
  return (
    <section className="section bg-muted/20">
        <div className="section-inner">
            <div className="grid lg:grid-cols-2 gap-10 items-center">
                <div className="text-center lg:text-left stack-lg">
                    <div className="stack">
                        <p className="eyebrow">Consultation</p>
                        <h1>{title}</h1>
                        <p className="section-lead max-w-xl mx-auto lg:mx-0">{subtitle}</p>
                    </div>
                    <Button size="lg">Book a Free Discovery Call</Button>
                </div>
                <div className="relative w-full h-80 lg:h-[500px]">
                    <Image
                        src={image}
                        alt={title}
                        fill
                        className="object-cover rounded-[var(--radius)] border border-border/40"
                    />
                </div>
            </div>
        </div>
    </section>
  )
}
