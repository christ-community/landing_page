'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Users, Heart, Calendar, MapPin, Clock, ArrowRight, Sparkles } from 'lucide-react';
import Link from 'next/link';
import type { IMissionVision } from '../../../../../types/contentful';
import { useState, useEffect } from 'react';

interface WhoHeroProps {
  config?: {
    title?: string;
    subtitle?: string;
  };
  missionVision?: IMissionVision[];
}

const defaultConfig = {
  title: "Who We Are",
  subtitle: "Our story, our values, and the heart behind everything we do as a community of faith.",
};

const journeyMilestones = [
  { year: "2008", event: "Church Founded", emoji: "🌱" },
  { year: "2010", event: "First Building", emoji: "🏛️" },
  { year: "2013", event: "200+ Members", emoji: "👥" },
  { year: "2016", event: "Global Mission", emoji: "🌍" },
  { year: "2019", event: "Campus Expansion", emoji: "🏗️" },
  { year: "2024", event: "500+ Members", emoji: "⭐" }
];

export default function WhoHero({ config, missionVision }: WhoHeroProps) {
  const heroConfig = { ...defaultConfig, ...config };
  const { title, subtitle } = heroConfig;
  const [currentMilestone, setCurrentMilestone] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentMilestone((prev) => (prev + 1) % journeyMilestones.length);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative py-20 bg-gradient-to-br from-rose-50 via-pink-50 to-purple-50 dark:from-rose-950/30 dark:via-pink-950/30 dark:to-purple-950/30 overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-full h-full opacity-30">
          <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-rose-400 rounded-full animate-ping"></div>
          <div className="absolute top-3/4 right-1/4 w-1 h-1 bg-pink-400 rounded-full animate-ping delay-700"></div>
          <div className="absolute bottom-1/4 left-1/3 w-1.5 h-1.5 bg-purple-400 rounded-full animate-ping delay-1000"></div>
          <div className="absolute top-1/2 right-1/3 w-1 h-1 bg-rose-300 rounded-full animate-ping delay-500"></div>
        </div>
        
        {/* Floating shapes */}
        <div className="absolute top-40 left-10 w-20 h-20 bg-rose-200 dark:bg-rose-800 rounded-full opacity-20 animate-float"></div>
        <div className="absolute top-60 right-20 w-16 h-16 bg-pink-200 dark:bg-pink-800 rounded-full opacity-20 animate-float delay-1000"></div>
        <div className="absolute bottom-40 left-20 w-24 h-24 bg-purple-200 dark:bg-purple-800 rounded-full opacity-20 animate-float delay-500"></div>
      </div>

      <div className="relative z-10">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-16 items-center">
            {/* Left Content */}
            <div className="lg:col-span-3 space-y-8">
              <div className="space-y-6">
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-rose-100 dark:bg-rose-900/30 text-rose-700 dark:text-rose-300 rounded-full text-sm font-medium">
                  <Sparkles className="w-4 h-4" />
                  Our Story & Heritage
                </div>
                
                <h1 className="text-5xl lg:text-7xl font-bold leading-tight">
                  <span className="block text-slate-900 dark:text-slate-100">Who</span>
                  <span className="block bg-gradient-to-r from-rose-600 via-pink-600 to-purple-600 bg-clip-text text-transparent">
                    We Are
                  </span>
                </h1>
                
                <p className="text-xl text-slate-600 dark:text-slate-400 leading-relaxed">
                  {subtitle}
                </p>
              </div>

              <div className="space-y-4">
                <p className="text-lg text-slate-700 dark:text-slate-300 leading-relaxed">
                  Christ Community is more than just a church—we're a family united by faith, hope, and love. 
                  Our journey began with a simple dream: to create a place where everyone can encounter God's grace.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/about/meet-the-team">
                  <Button size="lg" className="bg-rose-600 hover:bg-rose-700 text-white px-6 py-3 text-lg rounded-lg shadow-lg">
                    <Users className="w-5 h-5 mr-2" />
                    Meet Our Team
                  </Button>
                </Link>
                <Link href="/contact">
                  <Button size="lg" variant="outline" className="border-2 border-rose-200 text-slate-700 dark:text-slate-300 hover:bg-rose-50 dark:hover:bg-rose-950/20 px-6 py-3 text-lg rounded-lg">
                    <Calendar className="w-5 h-5 mr-2" />
                    Visit Us Sunday
                  </Button>
                </Link>
              </div>

              {/* Featured Scripture */}
              <div className="p-6 bg-white/60 dark:bg-slate-800/60 backdrop-blur-sm rounded-2xl border border-rose-200 dark:border-rose-800/30">
                <blockquote className="text-lg font-medium text-slate-900 dark:text-slate-100 mb-2">
                  "For where two or three gather in my name, there am I with them."
                </blockquote>
                <cite className="text-sm text-rose-600 dark:text-rose-400 font-semibold">
                  Matthew 18:20
                </cite>
              </div>
            </div>

            {/* Right Content - Journey Timeline */}
            <div className="lg:col-span-2 space-y-6">
              <div className="text-center mb-8">
                <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-2">
                  Our Journey
                </h2>
                <p className="text-slate-600 dark:text-slate-400">
                  Key milestones in our story
                </p>
              </div>

              {/* Rotating Milestone Display */}
              <Card className="border-0 bg-white/70 dark:bg-slate-800/70 backdrop-blur-sm shadow-xl">
                <CardContent className="p-8 text-center">
                  <div className="text-6xl mb-4 transition-all duration-500">
                    {journeyMilestones[currentMilestone].emoji}
                  </div>
                  <div className="text-3xl font-bold bg-gradient-to-r from-rose-600 to-pink-600 bg-clip-text text-transparent mb-2">
                    {journeyMilestones[currentMilestone].year}
                  </div>
                  <div className="text-lg font-semibold text-slate-900 dark:text-slate-100">
                    {journeyMilestones[currentMilestone].event}
                  </div>
                  
                  {/* Progress indicators */}
                  <div className="flex justify-center mt-6 space-x-2">
                    {journeyMilestones.map((_, index) => (
                      <div
                        key={index}
                        className={`w-2 h-2 rounded-full transition-all duration-300 ${
                          index === currentMilestone ? 'bg-rose-600 w-8' : 'bg-slate-300 dark:bg-slate-600'
                        }`}
                      />
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Quick Info Cards */}
              <div className="space-y-4">
                <Card className="border-0 bg-rose-100/60 dark:bg-rose-900/30 backdrop-blur-sm">
                  <CardContent className="p-4 flex items-center gap-3">
                    <MapPin className="w-6 h-6 text-rose-600" />
                    <div>
                      <div className="font-semibold text-slate-900 dark:text-slate-100">Our Location</div>
                      <div className="text-sm text-slate-600 dark:text-slate-400">123 Faith Street, Hope City</div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-0 bg-pink-100/60 dark:bg-pink-900/30 backdrop-blur-sm">
                  <CardContent className="p-4 flex items-center gap-3">
                    <Clock className="w-6 h-6 text-pink-600" />
                    <div>
                      <div className="font-semibold text-slate-900 dark:text-slate-100">Service Times</div>
                      <div className="text-sm text-slate-600 dark:text-slate-400">Sundays 9:00 AM & 11:00 AM</div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-0 bg-purple-100/60 dark:bg-purple-900/30 backdrop-blur-sm">
                  <CardContent className="p-4 flex items-center gap-3">
                    <Heart className="w-6 h-6 text-purple-600" />
                    <div>
                      <div className="font-semibold text-slate-900 dark:text-slate-100">Community Size</div>
                      <div className="text-sm text-slate-600 dark:text-slate-400">500+ active members</div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Call to Action */}
              <div className="text-center mt-8">
                <Link href="/contact" className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-rose-500 to-pink-500 text-white rounded-full font-medium shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300">
                  Ready to be part of our story?
                  <ArrowRight className="w-4 h-4" />
                </Link>
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