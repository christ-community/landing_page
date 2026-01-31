'use client';

import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

const defaultConfig = {
  title: "Get Your Free Bible Today",
  subtitle: "Begin or deepen your spiritual journey with a complimentary Bible delivered to your doorstep.",
  backgroundImage: "/worship-conference.jpeg",
};

export default function FreeBibleHero() {
  const { title, subtitle } = defaultConfig;

  const handleScrollToForm = () => {
    const formSection = document.querySelector('#bible-form');
    formSection?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="section bg-muted/20">
      <div className="section-inner">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          <div className="stack-lg text-center lg:text-left">
            <div className="stack">
              <p className="eyebrow">Free Bible</p>
              <h1>{title}</h1>
              <p className="section-lead">{subtitle}</p>
            </div>
            <p className="text-muted-foreground max-w-2xl mx-auto lg:mx-0">
              Whether you're new to faith or seeking a fresh copy of God's Word, we're delighted to send you a free Bible. No strings attached—just our desire to help you connect with God's love and truth.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Button size="lg" onClick={handleScrollToForm}>
                Request Your Free Bible
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </div>
          </div>

          <div className="relative">
            <div className="relative rounded-[var(--radius)] overflow-hidden border border-border/40">
              <Image
                src={defaultConfig.backgroundImage}
                alt="Bible Reading"
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
