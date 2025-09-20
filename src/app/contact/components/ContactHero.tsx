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
    <section className="relative min-h-[90vh] bg-gradient-to-br from-blue-50 via-sky-50 to-blue-100 dark:from-blue-950/40 dark:via-sky-950/40 dark:to-blue-900/40 overflow-hidden">
      {/* Background with layered images */}
      <div className="absolute inset-0">
        <Image
          src={backgroundImage}
          alt="Church community background"
          fill
          className="object-cover opacity-10"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent"></div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 min-h-[90vh] flex items-center justify-center">
        <div className="container mx-auto px-6 lg:px-12 text-center">
          <div className="max-w-4xl mx-auto space-y-8">
            <Badge className="bg-gradient-to-r from-blue-500 to-sky-500 text-white border-0 text-sm px-6 py-3 rounded-full shadow-lg">
              <Mail className="w-4 h-4 mr-2" />
              Get in Touch with Us
            </Badge>

            <div className="space-y-4">
              <h1 className="text-6xl lg:text-8xl font-bold text-foreground leading-tight">
                <span className="bg-gradient-to-r from-blue-600 via-sky-600 to-cyan-600 bg-clip-text text-transparent">
                  {title}
                </span>
              </h1>
              <h2 className="text-2xl lg:text-3xl font-medium text-muted-foreground">
                {subtitle}
              </h2>
            </div>
            
            <p className="text-lg text-muted-foreground leading-relaxed max-w-3xl mx-auto">
              Whether you have questions about our ministry, want to get involved, or need prayer and support, 
              we're here to listen and walk alongside you.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg"
                onClick={handleScrollToForm}
                className="bg-gradient-to-r from-blue-600 to-sky-600 hover:from-blue-700 hover:to-sky-700 text-white px-8 py-4 text-lg font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
              >
                Send Us a Message
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
              
              <Button 
                size="lg"
                variant="outline"
                className="border-2 border-blue-200 text-foreground hover:bg-blue-50 dark:border-blue-800 dark:hover:bg-blue-950 px-8 py-4 text-lg font-semibold rounded-lg transition-all duration-300"
                onClick={() => window.open('https://calendly.com/christcommunityglobal/30min', '_blank')}
              >
                Book a Visit
              </Button>
            </div>

            <div className="flex justify-center gap-8 pt-8 text-muted-foreground">
              <div className="flex items-center gap-2">
                <Mail className="w-5 h-5 text-blue-500" />
                <span>Email Us</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-5 h-5 text-sky-500" />
                <span>Call Us</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-5 h-5 text-cyan-500" />
                <span>Find Us</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}