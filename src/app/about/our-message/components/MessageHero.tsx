'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { BookOpen, Heart, Cross, Scroll, MessageCircle, Lightbulb } from 'lucide-react';
import Link from 'next/link';

interface MessageHeroProps {
  config?: {
    title?: string;
    subtitle?: string;
  };
}

const defaultConfig = {
  title: "Our Message",
  subtitle: "Discover the core beliefs and biblical truths that guide our community and shape our mission.",
};

const pillars = [
  {
    icon: Cross,
    title: "Gospel Centered",
    description: "Christ's sacrifice and resurrection is the foundation of our faith",
  },
  {
    icon: BookOpen,
    title: "Scripture Based",
    description: "God's Word is our ultimate authority for faith and practice",
  },
  {
    icon: Heart,
    title: "Love Driven",
    description: "We are motivated by God's love to serve others compassionately",
  }
];

export default function MessageHero({ config }: MessageHeroProps) {
  const heroConfig = { ...defaultConfig, ...config };
  const { title, subtitle } = heroConfig;

  return (
    <section className="relative py-24 bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50 dark:from-amber-950/30 dark:via-orange-950/30 dark:to-yellow-950/30 overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 right-20 w-64 h-64 bg-gradient-to-r from-amber-200 to-orange-200 dark:from-amber-800 dark:to-orange-800 rounded-full opacity-20 blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 left-20 w-80 h-80 bg-gradient-to-r from-orange-200 to-red-200 dark:from-orange-800 dark:to-red-800 rounded-full opacity-20 blur-3xl animate-pulse delay-1000"></div>
      </div>

      <div className="relative z-10">
        <div className="container mx-auto px-6 lg:px-12">
          {/* Main Content */}
          <div className="text-center mb-20">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300 rounded-full text-sm font-medium mb-8">
              <Scroll className="w-4 h-4" />
              Core Beliefs & Biblical Truth
            </div>
            
            <h1 className="text-6xl lg:text-8xl font-bold mb-8">
              <span className="text-slate-900 dark:text-slate-100 block">Our</span>
              <span className="bg-gradient-to-r from-amber-600 via-orange-600 to-red-600 bg-clip-text text-transparent block">
                Message
              </span>
            </h1>
            
            <p className="text-xl text-slate-600 dark:text-slate-400 leading-relaxed max-w-4xl mx-auto mb-12">
              {subtitle}
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/what-we-do/blog">
                <Button size="lg" className="bg-amber-600 hover:bg-amber-700 text-white px-8 py-3 text-lg rounded-lg shadow-lg">
                  <BookOpen className="w-5 h-5 mr-2" />
                  Read Our Teachings
                </Button>
              </Link>
              <Link href="/contact">
                <Button size="lg" variant="outline" className="border-2 border-amber-200 text-slate-700 dark:text-slate-300 hover:bg-amber-50 dark:hover:bg-amber-950/20 px-8 py-3 text-lg rounded-lg">
                  <MessageCircle className="w-5 h-5 mr-2" />
                  Ask Questions
                </Button>
              </Link>
            </div>
          </div>

          {/* Featured Scripture */}
          <div className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-sm rounded-3xl p-8 md:p-12 border border-amber-200 dark:border-amber-800/30 shadow-2xl mb-20">
            <div className="text-center">
              <div className="inline-flex p-4 bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-2xl mb-6">
                <BookOpen className="w-8 h-8" />
              </div>
              <blockquote className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-slate-100 mb-4 leading-relaxed">
                "For I am not ashamed of the gospel, because it is the power of God that brings salvation to everyone who believes"
              </blockquote>
              <cite className="text-lg text-amber-600 dark:text-amber-400 font-semibold">
                Romans 1:16 NIV
              </cite>
            </div>
          </div>

          {/* Core Pillars */}
          <div className="mb-20">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-slate-900 dark:text-slate-100 mb-4">
                Our Foundation
              </h2>
              <p className="text-xl text-slate-600 dark:text-slate-400">
                Three pillars that anchor everything we believe and teach
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {pillars.map((pillar, index) => {
                const Icon = pillar.icon;
                return (
                  <Card key={index} className="border-0 bg-white/60 dark:bg-slate-800/60 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 group">
                    <CardContent className="p-8 text-center">
                      <div className="inline-flex p-6 bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-3xl mb-6 shadow-lg group-hover:scale-110 transition-transform">
                        <Icon className="w-10 h-10" />
                      </div>
                      <h3 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-4">
                        {pillar.title}
                      </h3>
                      <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-lg">
                        {pillar.description}
                      </p>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>

          {/* Call to Action */}
          <div className="text-center">
            <div className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-amber-500 via-orange-500 to-red-500 text-white rounded-full text-xl font-semibold shadow-xl hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300">
              <Lightbulb className="w-6 h-6" />
              Explore Our Core Beliefs Below
            </div>
            <p className="text-slate-600 dark:text-slate-400 mt-6 text-lg">
              Dive deeper into the biblical truths that shape our community
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}