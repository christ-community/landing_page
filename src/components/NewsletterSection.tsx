'use client';

import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import type { NewsletterConfig } from '@/types';
import { useState } from 'react';

interface NewsletterSectionProps {
  config?: Partial<NewsletterConfig>;
  onSubmit?: (email: string) => Promise<void> | void;
}

const defaultConfig: NewsletterConfig = {
  title: 'Stay Updated with Our Newsletter',
  subtitle: 'Get the latest news, updates, and exclusive offers delivered straight to your inbox.',
  backgroundImage: '/worship-conference.jpeg',
  placeholder: 'Enter your email address',
  buttonLabel: 'Join now',
};

export default function NewsletterSection({ config, onSubmit }: NewsletterSectionProps) {
  const { title, subtitle, backgroundImage, placeholder, buttonLabel } = {
    ...defaultConfig,
    ...config,
  };

  const [email, setEmail] = useState('');
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (onSubmit) await onSubmit(email);
    setEmail('');
  };

  return (
    <section className="py-16">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="relative rounded-2xl overflow-hidden shadow-xl">
          <Image
            src={backgroundImage}
            alt="newsletter background"
            fill
            className="object-cover"
            priority
          />
          {/* overlay gradient to ensure contrast */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-transparent" />
          <div className="relative z-10 p-8 sm:p-12 lg:p-16 max-w-xl text-white space-y-6">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight">
              {title}
            </h2>
            {subtitle && <p className="text-lg text-white/90">{subtitle}</p>}
            <form onSubmit={handleSubmit} className="flex w-full max-w-md">
              <Input
                type="email"
                required
                placeholder={placeholder}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="rounded-r-none bg-white text-foreground flex-1"
              />
              <Button type="submit" className="rounded-l-none bg-tertiary text-tertiary-foreground hover:bg-tertiary/90">
                {buttonLabel}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
} 