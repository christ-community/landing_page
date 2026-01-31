'use client';

import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Mail, Phone, MapPin, ArrowRight } from 'lucide-react';
import type { IPageHero } from '../../../../types/contentful';

interface ContactHeroProps {
  config?: {
    title?: string;
    subtitle?: string;
    backgroundImage?: string;
  };
  pageHero?: IPageHero | null;
}

const defaultConfig = {
  title: "Let's Connect",
  subtitle: "We'd love to hear from you and explore how we can serve together.",
  backgroundImage: "/Church-Conference.jpg",
};

export default function ContactHero({ config, pageHero }: ContactHeroProps) {
  // Use Contentful data if available, otherwise fall back to config or default
  const heroConfig = pageHero ? {
    title: pageHero.title,
    subtitle: pageHero.subtitle || defaultConfig.subtitle,
    backgroundImage: pageHero.backgroundImage ? `https:${pageHero.backgroundImage.fields.file?.url}` : defaultConfig.backgroundImage
  } : { ...defaultConfig, ...config };
  const { title, subtitle, backgroundImage } = heroConfig;

  const handleScrollToForm = () => {
    const formSection = document.querySelector('[data-section="contact-form"]');
    formSection?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="section min-h-[70vh] bg-muted/20">
      <div className="section-inner">
        <div className="relative overflow-hidden rounded-[var(--radius)] border border-border/40 bg-card">
          <div className="absolute inset-0">
            <Image
              src={backgroundImage}
              alt="Church community background"
              fill
              className="object-cover opacity-15"
            />
            <div className="absolute inset-0 bg-card/80" />
          </div>

          <div className="relative z-10 px-8 py-16 sm:px-12 lg:px-16 text-center">
            <div className="max-w-3xl mx-auto stack-lg">
              <Badge className="bg-primary text-primary-foreground border-0 text-sm px-4 py-2 rounded-full">
                <Mail className="h-4 w-4" />
                Get in Touch
              </Badge>

              <div className="stack">
                <h1 className="section-title">{title}</h1>
                <p className="section-lead">{subtitle}</p>
              </div>

              <p className="text-muted-foreground max-w-2xl mx-auto">
                Whether you have questions about our ministry, want to get involved, or need prayer and support,
                we're here to listen and walk alongside you.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" onClick={handleScrollToForm}>
                  Send Us a Message
                  <ArrowRight className="h-5 w-5" />
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  onClick={() => window.open('https://calendly.com/christcommunityglobal/30min', '_blank')}
                >
                  Book a Visit
                </Button>
              </div>

              <div className="flex flex-wrap justify-center gap-6 text-muted-foreground">
                <div className="flex items-center gap-2">
                  <Mail className="h-5 w-5 text-primary" />
                  <span>Email Us</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="h-5 w-5 text-primary" />
                  <span>Call Us</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="h-5 w-5 text-primary" />
                  <span>Find Us</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
