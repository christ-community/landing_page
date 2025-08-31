'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Users, Calendar, Sparkles } from 'lucide-react';
import Link from 'next/link';
import type { IMissionVision, IPageHero } from '../../../../../types/contentful';

interface WhoHeroProps {
  config?: {
    title?: string;
    subtitle?: string;
  };
  missionVision?: IMissionVision[];
  pageHero?: IPageHero | null;
}

const defaultConfig = {
  title: "Who We Are",
  subtitle: "Our story, our values, and the heart behind everything we do as a community of faith.",
};

export default function WhoHero({ config, missionVision, pageHero }: WhoHeroProps) {
  // Use Contentful data if available, otherwise fall back to config or default
  const heroConfig = pageHero ? {
    title: pageHero.title,
    subtitle: pageHero.subtitle || defaultConfig.subtitle,
  } : { ...defaultConfig, ...config };
  const { title, subtitle } = heroConfig;

  return (
    <section className="relative py-20 bg-gradient-to-br from-rose-50 via-pink-50 to-purple-50 dark:from-rose-950/30 dark:via-pink-950/30 dark:to-purple-950/30 overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-32 h-32 bg-rose-200/20 rounded-full animate-float"></div>
        <div className="absolute top-40 right-32 w-24 h-24 bg-pink-200/20 rounded-full animate-float" style={{ animationDelay: '2s' }}></div>
        <div className="absolute bottom-20 left-1/3 w-28 h-28 bg-purple-200/20 rounded-full animate-float" style={{ animationDelay: '4s' }}></div>
      </div>

      <div className="relative z-10">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 gap-16 items-center">
            {/* Main Content */}
            <div className="space-y-8 text-center max-w-4xl mx-auto">
              <div className="space-y-6">
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-rose-100 dark:bg-rose-900/30 text-rose-700 dark:text-rose-300 rounded-full text-sm font-medium">
                  <Sparkles className="w-4 h-4" />
                  Our Story & Heritage
                </div>

                <h1 className="text-5xl lg:text-7xl font-bold leading-tight">
                  <span className="block text-slate-900 dark:text-slate-100">{title?.split(' ')[0]}</span>
                  <span className="block bg-gradient-to-r from-rose-600 via-pink-600 to-purple-600 bg-clip-text text-transparent">
                    {title?.split(' ').slice(1).join(' ')}
                  </span>
                </h1>

                <p className="text-xl text-slate-600 dark:text-slate-400 leading-relaxed">
                  {subtitle}
                </p>
              </div>

              <div className="space-y-4">
                <p className="text-lg text-slate-700 dark:text-slate-300 leading-relaxed">
                  {pageHero?.description || "Christ Community is more than just a church—we're a family united by faith, hope, and love. Our journey began with a simple dream: to create a place where everyone can encounter God's grace."}
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href={pageHero?.ctaButton1Link || "/about"}>
                  <Button size="lg" className="bg-rose-600 hover:bg-rose-700 text-white px-6 py-3 text-lg rounded-lg shadow-lg">
                    <Users className="w-5 h-5 mr-2" />
                    {pageHero?.ctaButton1Text || "Meet the Team"}
                  </Button>
                </Link>
                <Link href={pageHero?.ctaButton2Link || "https://calendly.com/christcommunityglobal/30min"} target="_blank" rel="noopener noreferrer">
                  <Button size="lg" variant="outline" className="border-2 border-rose-200 text-slate-700 dark:text-slate-300 hover:bg-rose-50 dark:hover:bg-rose-950/20 px-6 py-3 text-lg rounded-lg">
                    <Calendar className="w-5 h-5 mr-2" />
                    {pageHero?.ctaButton2Text || "Book a visit"}
                  </Button>
                </Link>
              </div>

              {/* Featured Scripture */}
              <div className="p-6 bg-white/60 dark:bg-slate-800/60 backdrop-blur-sm rounded-2xl border border-rose-200 dark:border-rose-800/30 max-w-2xl mx-auto">
                <blockquote className="text-lg font-medium text-slate-900 dark:text-slate-100 mb-2">
                  "For where two or three gather in my name, there am I with them."
                </blockquote>
                <cite className="text-sm text-rose-600 dark:text-rose-400 font-semibold">
                  Matthew 18:20
                </cite>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
}