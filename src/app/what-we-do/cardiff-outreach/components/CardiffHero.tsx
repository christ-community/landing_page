'use client';

import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Calendar, MapPin, ArrowRight, Clock, Users } from 'lucide-react';

const defaultConfig = {
  title: "100 Believers to Cardiff",
  subtitle: "Easter Evangelism Outreach 2026",
};

export default function CardiffHero() {
  const { title, subtitle } = defaultConfig;

  const handleScrollToForm = () => {
    const formSection = document.querySelector('#registration-form');
    formSection?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-[90vh] bg-gradient-to-br from-tertiary/10 via-white to-tertiary/5 dark:from-tertiary/20 dark:via-background dark:to-tertiary/10 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-50">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,_rgba(255,255,255,0.05)_0,_rgba(255,255,255,0.05)_1px,_transparent_1px)] bg-[length:2rem_2rem]"></div>
        <div className="absolute top-20 -left-20 w-80 h-80 bg-gradient-to-br from-tertiary/30 to-tertiary/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 -right-20 w-96 h-96 bg-gradient-to-br from-tertiary/20 to-tertiary/30 rounded-full blur-3xl"></div>
      </div>
      
      {/* Main Content */}
      <div className="relative z-10 min-h-[90vh] flex items-center">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            
            {/* Left Content */}
            <div className="space-y-8 text-center lg:text-left">
              <Badge className="bg-gradient-to-r from-tertiary to-red-600 text-white border-0 text-sm px-6 py-3 rounded-full shadow-lg">
                <Calendar className="w-4 h-4 mr-2" />
                Easter Outreach 2026
              </Badge>

              <div className="space-y-4">
                <h1 className="text-5xl lg:text-7xl font-bold text-foreground leading-tight">
                  <span className="bg-gradient-to-r from-tertiary via-red-600 to-red-700 bg-clip-text text-transparent">
                    {title}
                  </span>
                </h1>
                <h2 className="text-2xl lg:text-3xl font-medium text-muted-foreground">
                  {subtitle}
                </h2>
              </div>
              
              <div className="space-y-4 text-lg text-muted-foreground">
                <div className="flex items-center gap-3 justify-center lg:justify-start">
                  <Calendar className="w-5 h-5 text-tertiary" />
                  <span className="font-semibold">Saturday, April 4th, 2026</span>
                </div>
                <div className="flex items-center gap-3 justify-center lg:justify-start">
                  <MapPin className="w-5 h-5 text-tertiary" />
                  <span>Cardiff City Center</span>
                </div>
                <div className="flex items-center gap-3 justify-center lg:justify-start">
                  <Users className="w-5 h-5 text-tertiary" />
                  <span>Target: 100 Believers</span>
                </div>
              </div>

              <div className="bg-gradient-to-r from-tertiary/10 to-red-50 dark:from-tertiary/20 dark:to-red-950/30 rounded-2xl p-6 border-l-4 border-tertiary">
                <p className="text-lg text-foreground leading-relaxed">
                  Join us for a powerful evangelism outreach as we witness Christ, pray, and worship 
                  at Cardiff City Center this Easter. Be part of this revival moment!
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Button 
                  size="lg"
                  onClick={handleScrollToForm}
                  className="bg-gradient-to-r from-tertiary to-red-600 hover:from-red-700 hover:to-red-700 text-white px-8 py-4 text-lg font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  Sign Up Now
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </div>
            </div>

            {/* Right Side - Image Showcase */}
            <div className="relative h-[400px] lg:h-[600px]">
              {/* Image 1 */}
              <div className="absolute top-0 left-0 w-[60%] h-[70%] rounded-3xl overflow-hidden shadow-2xl transform -rotate-12 hover:rotate-0 hover:scale-105 transition-transform duration-500 z-10">
                <Image
                  src="/Church-Conference.jpg"
                  alt="Evangelism Outreach"
                  fill
                  className="object-cover"
                />
              </div>
              
              {/* Image 2 */}
              <div className="absolute bottom-0 right-0 w-[70%] h-[60%] rounded-3xl overflow-hidden shadow-2xl transform rotate-6 hover:rotate-0 hover:scale-105 transition-transform duration-500">
                <Image
                  src="/worship-conference.jpeg"
                  alt="Worship and Prayer"
                  fill
                  className="object-cover"
                />
              </div>

              {/* Decorative Element */}
              <div className="absolute top-1/2 left-1/2 w-32 h-32 bg-gradient-to-br from-tertiary to-red-600 rounded-full flex items-center justify-center shadow-lg transform -translate-x-1/2 -translate-y-1/2">
                <Users className="w-16 h-16 text-white" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
