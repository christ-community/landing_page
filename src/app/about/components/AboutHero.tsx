'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Heart, Users, BookOpen, ChevronDown } from 'lucide-react';
import Link from 'next/link';
import { useState, useEffect } from 'react';

interface AboutHeroProps {
  config?: {
    title?: string;
    subtitle?: string;
  };
}

const defaultConfig = {
  title: "About Christ Community",
  subtitle: "Discover our heart, mission, and the people who make this community special.",
};

const stats = [
  { number: "15+", label: "Years Serving", icon: "🏛️" },
  { number: "500+", label: "Community Members", icon: "👥" },
  { number: "25+", label: "Active Ministries", icon: "🤝" },
  { number: "12", label: "Countries Reached", icon: "🌍" }
];

export default function AboutHero({ config }: AboutHeroProps) {
  const heroConfig = { ...defaultConfig, ...config };
  const { title, subtitle } = heroConfig;
  const [currentStat, setCurrentStat] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStat((prev) => (prev + 1) % stats.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const handleScrollToContent = () => {
    const overviewSection = document.querySelector('[data-section="about-overview"]');
    overviewSection?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-slate-900 dark:via-blue-950 dark:to-indigo-950 overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-200 dark:bg-blue-800 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute top-40 right-10 w-72 h-72 bg-purple-200 dark:bg-purple-800 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse delay-1000"></div>
        <div className="absolute -bottom-8 left-20 w-72 h-72 bg-indigo-200 dark:bg-indigo-800 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse delay-500"></div>
      </div>

      <div className="relative z-10 min-h-screen flex items-center justify-center">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Left Content */}
            <div className="space-y-8">
              <div className="space-y-6">
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-full text-sm font-medium">
                  <Heart className="w-4 h-4" />
                  Welcome to Our Story
                </div>
                
                <h1 className="text-5xl lg:text-7xl font-bold leading-tight">
                  <span className="block text-slate-900 dark:text-slate-100">About</span>
                  <span className="block bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
                    Christ Community
                  </span>
                </h1>
                
                <p className="text-xl text-slate-600 dark:text-slate-400 leading-relaxed max-w-lg">
                  {subtitle}
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/about/who-we-are">
                  <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 text-lg rounded-lg shadow-lg">
                    Our Story
                  </Button>
                </Link>
                <Link href="/about/meet-the-team">
                  <Button size="lg" variant="outline" className="border-2 border-blue-200 text-slate-700 dark:text-slate-300 hover:bg-blue-50 dark:hover:bg-blue-950/20 px-6 py-3 text-lg rounded-lg">
                    <Users className="w-5 h-5 mr-2" />
                    Meet Our Team
                  </Button>
                </Link>
              </div>

              {/* Rotating Stats Display */}
              <div className="p-6 bg-white/60 dark:bg-slate-800/60 backdrop-blur-sm rounded-2xl border border-white/20 dark:border-slate-700/20">
                <div className="text-center transition-all duration-500">
                  <div className="text-4xl mb-2">{stats[currentStat].icon}</div>
                  <div className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-1">
                    {stats[currentStat].number}
                  </div>
                  <div className="text-sm text-slate-600 dark:text-slate-400 font-medium">
                    {stats[currentStat].label}
                  </div>
                </div>
                <div className="flex justify-center mt-4 space-x-2">
                  {stats.map((_, index) => (
                    <div
                      key={index}
                      className={`w-2 h-2 rounded-full transition-all duration-300 ${
                        index === currentStat ? 'bg-blue-600' : 'bg-slate-300 dark:bg-slate-600'
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Right Content - Feature Cards */}
            <div className="space-y-6">
              <Link href="/about/who-we-are" className="block group">
                <Card className="border-2 border-blue-100 dark:border-blue-900/50 hover:border-blue-300 dark:hover:border-blue-700 transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
                  <CardContent className="p-8">
                    <div className="flex items-start gap-4">
                      <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-xl group-hover:scale-110 transition-transform">
                        <Heart className="w-8 h-8 text-blue-600 dark:text-blue-400" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-2">Who We Are</h3>
                        <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                          Discover our journey, values, and the vision that drives our community forward.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>

              <Link href="/about/meet-the-team" className="block group">
                <Card className="border-2 border-purple-100 dark:border-purple-900/50 hover:border-purple-300 dark:hover:border-purple-700 transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
                  <CardContent className="p-8">
                    <div className="flex items-start gap-4">
                      <div className="p-3 bg-purple-100 dark:bg-purple-900/30 rounded-xl group-hover:scale-110 transition-transform">
                        <Users className="w-8 h-8 text-purple-600 dark:text-purple-400" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-2">Meet the Team</h3>
                        <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                          Get to know our dedicated leaders and staff who serve with passion.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>

              <Link href="/about/our-message" className="block group">
                <Card className="border-2 border-indigo-100 dark:border-indigo-900/50 hover:border-indigo-300 dark:hover:border-indigo-700 transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
                  <CardContent className="p-8">
                    <div className="flex items-start gap-4">
                      <div className="p-3 bg-indigo-100 dark:bg-indigo-900/30 rounded-xl group-hover:scale-110 transition-transform">
                        <BookOpen className="w-8 h-8 text-indigo-600 dark:text-indigo-400" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-2">Our Message</h3>
                        <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                          Explore the core beliefs and biblical truths that guide our ministry.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
        <Button
          variant="ghost"
          size="sm"
          className="text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 animate-bounce"
          onClick={handleScrollToContent}
        >
          <ChevronDown className="w-6 h-6" />
        </Button>
      </div>
    </section>
  );
}