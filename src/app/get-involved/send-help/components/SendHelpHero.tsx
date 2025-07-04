'use client';

import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Heart, Handshake, Gift, ArrowRight } from 'lucide-react';
import type { SendHelpPageConfig } from '@/types';

interface SendHelpHeroProps {
  config?: Partial<SendHelpPageConfig['hero']>;
}

const defaultConfig: SendHelpPageConfig['hero'] = {
  title: "Your Support, Their Hope",
  subtitle: "Join us in making a tangible difference in the lives of individuals and communities.",
  backgroundImage: "/worship-conference.jpeg",
};

export default function SendHelpHero({ config }: SendHelpHeroProps) {
  const heroConfig = { ...defaultConfig, ...config };
  const { title, subtitle, backgroundImage } = heroConfig;

  const handleScrollToOptions = () => {
    const optionsSection = document.querySelector('[data-section="help-options"]');
    optionsSection?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-[90vh] bg-gradient-to-br from-rose-50 via-red-50 to-pink-50 dark:from-rose-950/40 dark:via-red-950/40 dark:to-pink-950/40 overflow-hidden">
      {/* Background with layered images */}
      <div className="absolute inset-0">
        <Image
          src={backgroundImage}
          alt="Community support background"
          fill
          className="object-cover opacity-10"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent"></div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 min-h-[90vh] flex items-center justify-center">
        <div className="container mx-auto px-6 lg:px-12 text-center">
          <div className="max-w-4xl mx-auto space-y-8">
            <Badge className="bg-gradient-to-r from-rose-500 to-red-500 text-white border-0 text-sm px-6 py-3 rounded-full shadow-lg">
              <Heart className="w-4 h-4 mr-2" />
              Become a Partner in Hope
            </Badge>

            <div className="space-y-4">
              <h1 className="text-6xl lg:text-8xl font-bold text-foreground leading-tight">
                <span className="bg-gradient-to-r from-rose-600 via-red-600 to-pink-600 bg-clip-text text-transparent">
                  {title}
                </span>
              </h1>
              <h2 className="text-2xl lg:text-3xl font-medium text-muted-foreground">
                {subtitle}
              </h2>
            </div>
            
            <p className="text-lg text-muted-foreground leading-relaxed max-w-3xl mx-auto">
              Every act of generosity, big or small, contributes to a wave of positive change. Discover how you can send help and be a beacon of light in someone's life today.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg"
                onClick={handleScrollToOptions}
                className="bg-gradient-to-r from-rose-600 to-red-600 hover:from-rose-700 hover:to-red-700 text-white px-8 py-4 text-lg font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
              >
                Explore Ways to Give
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
              
              <Button 
                size="lg"
                variant="outline"
                className="border-2 border-rose-200 text-foreground hover:bg-rose-50 dark:border-rose-800 dark:hover:bg-rose-950 px-8 py-4 text-lg font-semibold rounded-lg transition-all duration-300"
              >
                Share Our Mission
              </Button>
            </div>

            <div className="flex justify-center gap-8 pt-8 text-muted-foreground">
              <div className="flex items-center gap-2">
                <Gift className="w-5 h-5 text-rose-500" />
                <span>Give Financially</span>
              </div>
              <div className="flex items-center gap-2">
                <Handshake className="w-5 h-5 text-red-500" />
                <span>Partner with Us</span>
              </div>
              <div className="flex items-center gap-2">
                <Heart className="w-5 h-5 text-pink-500" />
                <span>Support a Cause</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
} 