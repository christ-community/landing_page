'use client';

import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Loader2 } from 'lucide-react';
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
  const [isSubmitting, setIsSubmitting] = useState(false);
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      if (onSubmit) {
        await onSubmit(email);
      } else {
        const response = await fetch('/api/newsletter', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email }),
        });

        if (response.ok) {
          console.log('Newsletter subscription successful');
        } else {
          console.error('Newsletter subscription failed');
        }
      }
      setEmail('');
    } catch (error) {
      console.error('Newsletter subscription error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="section">
      <div className="section-inner">
        <div className="relative rounded-[var(--radius)] overflow-hidden border border-border/40 bg-card shadow-sm">
          <Image
            src={backgroundImage}
            alt="newsletter background"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-secondary/70" />
          <div className="relative z-10 p-8 sm:p-12 lg:p-16 max-w-xl text-secondary-foreground space-y-6">
            <h2 className="section-title">
              {title}
            </h2>
            {subtitle && <p className="section-lead text-secondary-foreground/80">{subtitle}</p>}
            <form onSubmit={handleSubmit} className="flex w-full max-w-md">
              <Input
                type="email"
                required
                placeholder={placeholder}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="rounded-none rounded-l-[var(--radius)] bg-white text-foreground flex-1"
              />
              <Button type="submit" className="rounded-none rounded-r-[var(--radius)]" disabled={isSubmitting}>
                {isSubmitting ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Joining
                  </>
                ) : (
                  buttonLabel
                )}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
} 
