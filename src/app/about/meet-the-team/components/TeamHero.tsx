'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Users, Mail, Heart, Star, Award, Handshake } from 'lucide-react';
import Link from 'next/link';

interface TeamHeroProps {
  config?: {
    title?: string;
    subtitle?: string;
  };
}

const defaultConfig = {
  title: "Meet Our Team",
  subtitle: "Get to know the dedicated leaders and staff who serve our community with passion and purpose.",
};

const teamHighlights = [
  {
    icon: Award,
    title: "Experienced Leadership",
    description: "Combined 50+ years of ministry experience",
    color: "from-emerald-500 to-teal-500"
  },
  {
    icon: Heart,
    title: "Passionate Service",
    description: "Dedicated to serving with love and integrity",
    color: "from-blue-500 to-cyan-500"
  },
  {
    icon: Star,
    title: "Diverse Gifts",
    description: "Each bringing unique talents and perspectives",
    color: "from-purple-500 to-indigo-500"
  }
];

export default function TeamHero({ config }: TeamHeroProps) {
  const heroConfig = { ...defaultConfig, ...config };
  const { title, subtitle } = heroConfig;

  return (
    <section className="relative py-20 bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 dark:from-emerald-950/30 dark:via-teal-950/30 dark:to-cyan-950/30 overflow-hidden">
      {/* Geometric background pattern */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-full h-full">
          <svg className="w-full h-full opacity-5" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="team-pattern" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
                <circle cx="10" cy="10" r="2" fill="currentColor" />
              </pattern>
            </defs>
            <rect width="100" height="100" fill="url(#team-pattern)" />
          </svg>
        </div>
      </div>

      <div className="relative z-10">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300 rounded-full text-sm font-medium mb-8">
              <Users className="w-4 h-4" />
              Our Leadership Team
            </div>
            
            <h1 className="text-5xl lg:text-7xl font-bold mb-6">
              <span className="text-slate-900 dark:text-slate-100">Meet Our</span>
              <br />
              <span className="bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 bg-clip-text text-transparent">
                Amazing Team
              </span>
            </h1>
            
            <p className="text-xl text-slate-600 dark:text-slate-400 leading-relaxed max-w-3xl mx-auto mb-12">
              {subtitle}
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
              <Link href="/contact">
                <Button size="lg" className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-3 text-lg rounded-lg shadow-lg">
                  <Mail className="w-5 h-5 mr-2" />
                  Contact Our Team
                </Button>
              </Link>
              <Link href="/about/who-we-are">
                <Button size="lg" variant="outline" className="border-2 border-emerald-200 text-slate-700 dark:text-slate-300 hover:bg-emerald-50 dark:hover:bg-emerald-950/20 px-8 py-3 text-lg rounded-lg">
                  <Heart className="w-5 h-5 mr-2" />
                  Our Story
                </Button>
              </Link>
            </div>
          </div>

          {/* Team Highlights */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {teamHighlights.map((highlight, index) => {
              const Icon = highlight.icon;
              return (
                <Card key={index} className="border-0 bg-white/60 dark:bg-slate-800/60 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                  <CardContent className="p-8 text-center">
                    <div className={`inline-flex p-4 rounded-2xl bg-gradient-to-r ${highlight.color} text-white mb-6 shadow-lg`}>
                      <Icon className="w-8 h-8" />
                    </div>
                    <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-3">
                      {highlight.title}
                    </h3>
                    <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                      {highlight.description}
                    </p>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* Team Stats */}
          <div className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-sm rounded-3xl p-8 md:p-12 border border-white/20 dark:border-slate-700/20 shadow-xl">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              <div>
                <div className="text-4xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent mb-2">
                  6
                </div>
                <div className="text-sm text-slate-600 dark:text-slate-400 font-medium">
                  Team Members
                </div>
              </div>
              <div>
                <div className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent mb-2">
                  50+
                </div>
                <div className="text-sm text-slate-600 dark:text-slate-400 font-medium">
                  Years Combined Experience
                </div>
              </div>
              <div>
                <div className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent mb-2">
                  15+
                </div>
                <div className="text-sm text-slate-600 dark:text-slate-400 font-medium">
                  Ministry Areas Covered
                </div>
              </div>
              <div>
                <div className="text-4xl font-bold bg-gradient-to-r from-rose-500 to-pink-500 bg-clip-text text-transparent mb-2">
                  500+
                </div>
                <div className="text-sm text-slate-600 dark:text-slate-400 font-medium">
                  Lives Impacted
                </div>
              </div>
            </div>
          </div>

          {/* Call to Action */}
          <div className="text-center mt-16">
            <div className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-emerald-500 to-teal-500 text-white rounded-full text-lg font-medium shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300">
              <Handshake className="w-5 h-5" />
              Ready to meet our incredible team?
            </div>
            <p className="text-slate-600 dark:text-slate-400 mt-4 text-lg">
              Scroll down to learn about each member's unique story and ministry
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}