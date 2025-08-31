'use client';

import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Heart, Users, ArrowRight, Sparkles } from 'lucide-react';
import type { VolunteerHeroConfig } from '@/types';

interface VolunteerHeroProps {
  config?: Partial<VolunteerHeroConfig>;
}

const defaultConfig: VolunteerHeroConfig = {
  title: "Make a Difference in Your Community",
  subtitle: "Join our volunteer family and be part of something greater",
  description: "Whether you have a few hours a week or a day a month, your time and talents can help transform lives and strengthen communities. Every volunteer makes a meaningful impact.",
  backgroundImage: "/Church-Conference.jpg",
  ctaText: "Start Volunteering Today",
  stats: {
    volunteers: 850,
    hoursServed: 12000,
    projectsCompleted: 150,
    communitiesImpacted: 25
  }
};

export default function VolunteerHero({ config }: VolunteerHeroProps) {
  const heroConfig = { ...defaultConfig, ...config };
  const { title, subtitle, description, backgroundImage, ctaText, stats } = heroConfig;





  return (
    <section className="relative min-h-[95vh] bg-gradient-to-br from-orange-50 via-rose-50 to-amber-50 dark:from-orange-950/30 dark:via-rose-950/30 dark:to-amber-950/30 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0">
        {/* Overlapping Circle Patterns */}
        <div className="absolute top-20 left-10 w-64 h-64 bg-gradient-to-br from-orange-200/30 to-rose-200/30 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-80 h-80 bg-gradient-to-br from-amber-200/30 to-yellow-200/30 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/3 w-48 h-48 bg-gradient-to-br from-rose-200/30 to-pink-200/30 rounded-full blur-2xl"></div>
      </div>

      {/* Main Content Grid */}
      <div className="relative z-10 min-h-[95vh] flex items-center">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            
            {/* Left Content */}
            <div className="space-y-8">
              {/* Badge */}
              <Badge className="bg-gradient-to-r from-orange-500 to-rose-500 text-white border-0 text-sm px-6 py-3 rounded-full shadow-lg">
                <Sparkles className="w-4 h-4 mr-2" />
                Join Our Mission
              </Badge>

              {/* Main Heading */}
              <div className="space-y-4">
                <h1 className="text-5xl lg:text-6xl font-bold text-foreground leading-tight">
                  <span className="bg-gradient-to-r from-orange-600 via-rose-600 to-amber-600 bg-clip-text text-transparent">
                    {title}
                  </span>
                </h1>
                
                <h2 className="text-2xl lg:text-3xl font-medium text-muted-foreground">
                  {subtitle}
                </h2>
              </div>
              
              {/* Description */}
              <p className="text-lg text-muted-foreground leading-relaxed max-w-2xl">
                {description}
              </p>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  size="lg"
                  asChild
                  className="bg-gradient-to-r from-orange-600 to-rose-600 hover:from-orange-700 hover:to-rose-700 text-white px-8 py-4 text-lg font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  <a href="/get-involved/volunteer-with-us#opportunities">
                    {ctaText}
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </a>
                </Button>
                
                <Button 
                  size="lg"
                  variant="outline"
                  asChild
                  className="border-2 border-orange-300 text-orange-700 hover:bg-orange-50 hover:text-orange-800 dark:border-orange-600 dark:text-orange-300 dark:hover:bg-orange-900/20 px-8 py-4 text-lg font-semibold rounded-lg transition-all duration-300 shadow-md hover:shadow-lg"
                >
                  <a href="/about">
                    Learn More About Us
                  </a>
                </Button>
              </div>


            </div>

            {/* Right Side - Image with Overlays */}
            <div className="relative">
              {/* Main Image Container */}
              <div className="relative rounded-3xl overflow-hidden shadow-2xl transform rotate-3 hover:rotate-0 transition-transform duration-500">
                <Image
                  src={backgroundImage}
                  alt="Volunteers making a difference"
                  width={600}
                  height={700}
                  className="object-cover w-full h-[500px] lg:h-[600px]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>
              </div>

              {/* Floating Elements */}
              <div className="absolute -top-4 -left-4 w-24 h-24 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center shadow-lg">
                <Heart className="w-12 h-12 text-white" />
              </div>
              
              <div className="absolute -bottom-4 -right-4 w-20 h-20 bg-gradient-to-br from-rose-400 to-pink-500 rounded-full flex items-center justify-center shadow-lg">
                <Users className="w-10 h-10 text-white" />
              </div>
            </div>
          </div>
        </div>
      </div>


    </section>
  );
} 