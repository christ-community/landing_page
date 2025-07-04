'use client';

import Image from 'next/image';
import { MapPin, Users, Heart, Star, Search, Church, Compass, Globe } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

interface ChurchFinderHeroProps {
  title?: string;
  subtitle?: string;
  description?: string;
  backgroundImage?: string;
  stats?: {
    churches: number;
    members: number;
    cities: number;
  };
}

const defaultStats = {
  churches: 150,
  members: 25000,
  cities: 50
};

export default function ChurchFinderHero({
  title = "Find Your Spiritual Home",
  subtitle = "Connect with a community of faith near you",
  description = "Discover welcoming churches in your area where you can grow in faith, build meaningful relationships, and make a positive impact in your community.",
  backgroundImage = "/Church-Conference.jpg",
  stats = defaultStats
}: ChurchFinderHeroProps) {
  const statItems = [
    { 
      icon: Church, 
      label: "Churches", 
      value: `${stats.churches}+`,
      color: "from-blue-500 to-cyan-500"
    },
    { 
      icon: Users, 
      label: "Community Members", 
      value: `${stats.members.toLocaleString()}+`,
      color: "from-purple-500 to-blue-500"
    },
    { 
      icon: Globe, 
      label: "Cities Covered", 
      value: `${stats.cities}+`,
      color: "from-indigo-500 to-purple-500"
    }
  ];

  const handleScrollToSearch = () => {
    const searchSection = document.querySelector('[data-section="church-finder"]');
    searchSection?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0">
        <Image
          src={backgroundImage}
          alt="Church community"
          fill
          className="object-cover opacity-20"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900/90 via-blue-900/85 to-indigo-900/90"></div>
      </div>

      {/* Geometric Background Elements */}
      <div className="absolute inset-0">
        {/* Large Geometric Shapes */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-br from-blue-500/10 to-purple-500/10 transform -rotate-45 rounded-3xl blur-xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-to-br from-indigo-500/10 to-cyan-500/10 transform rotate-12 rounded-full blur-2xl"></div>
        
        {/* Floating Dots */}
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="absolute w-3 h-3 bg-blue-400/30 rounded-full animate-pulse"
            style={{
              left: `${15 + i * 10}%`,
              top: `${20 + (i % 3) * 20}%`,
              animationDelay: `${i * 0.5}s`,
              animationDuration: `${3 + i * 0.5}s`
            }}
          />
        ))}
      </div>

      {/* Main Content - Centered Layout */}
      <div className="relative z-10 min-h-screen flex items-center justify-center">
        <div className="container mx-auto px-6 lg:px-12 text-center">
          <div className="max-w-5xl mx-auto space-y-8">
            
            {/* Floating Badge */}
            <div className="animate-fadeInUp">
              <Badge className="bg-gradient-to-r from-blue-500/20 to-purple-500/20 backdrop-blur-md text-white border border-white/20 text-sm px-6 py-3 rounded-full shadow-2xl">
                <Star className="w-4 h-4 mr-2 text-yellow-400" />
                Trusted Church Directory
              </Badge>
            </div>

            {/* Main Heading with Layered Text */}
            <div className="space-y-6 animate-fadeInUp delay-200">
              <h1 className="text-6xl lg:text-8xl font-bold leading-tight">
                <span className="block bg-gradient-to-r from-white via-blue-100 to-cyan-100 bg-clip-text text-transparent mb-4">
                  {title}
                </span>
                <span className="block text-3xl lg:text-4xl font-light text-blue-200">
                  {subtitle}
                </span>
              </h1>
              
              <p className="text-xl lg:text-2xl text-white/80 max-w-4xl mx-auto leading-relaxed">
                {description}
              </p>
            </div>

            {/* Interactive Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-16 animate-fadeInUp delay-400">
              {statItems.map((stat, index) => (
                <div 
                  key={index}
                  className="group relative overflow-hidden rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 p-8 hover:bg-white/15 transition-all duration-500 hover:scale-105"
                >
                  {/* Animated Background */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}></div>
                  
                  {/* Content */}
                  <div className="relative z-10 space-y-4">
                    <div className="inline-flex p-4 rounded-2xl bg-white/10 backdrop-blur-sm">
                      <stat.icon className="w-8 h-8 text-white" />
                    </div>
                    
                    <div className="text-4xl lg:text-5xl font-bold text-white">
                      {stat.value}
                    </div>
                    
                    <div className="text-lg text-white/80 font-medium">
                      {stat.label}
                    </div>
                  </div>

                  {/* Hover Glow Effect */}
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                </div>
              ))}
            </div>

            {/* CTA Buttons with Enhanced Design */}
            <div className="space-y-6 animate-fadeInUp delay-600">
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <Button 
                  size="lg"
                  onClick={handleScrollToSearch}
                  className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 hover:from-blue-700 hover:via-purple-700 hover:to-indigo-700 text-white border-0 px-12 py-6 text-xl font-semibold rounded-full shadow-2xl hover:shadow-blue-500/25 transition-all duration-300 transform hover:scale-105"
                >
                  <Search className="w-6 h-6 mr-3" />
                  Start Your Search
                </Button>
                
                <Button 
                  size="lg"
                  variant="outline"
                  className="border-2 border-white/30 text-white hover:bg-white/10 px-12 py-6 text-xl font-semibold rounded-full backdrop-blur-sm transition-all duration-300"
                >
                  <Compass className="w-6 h-6 mr-3" />
                  Explore Churches
                </Button>
              </div>

              {/* Scroll Indicator */}
              <div className="mt-12">
                <button 
                  onClick={handleScrollToSearch}
                  className="text-white/60 hover:text-white transition-colors duration-300 animate-bounce"
                >
                  <div className="flex flex-col items-center space-y-2">
                    <div className="w-8 h-12 border-2 border-white/30 rounded-full flex justify-center">
                      <div className="w-1 h-3 bg-white/60 rounded-full mt-2 animate-pulse"></div>
                    </div>
                    <span className="text-sm">Scroll to search</span>
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Geometric Transition */}
      <div className="absolute bottom-0 left-0 w-full">
        <svg viewBox="0 0 1200 120" fill="none" className="w-full h-20">
          <path 
            d="M0,0 C300,80 600,40 900,80 C1000,100 1100,60 1200,80 L1200,120 L0,120 Z" 
            fill="url(#church-gradient)"
          />
          <defs>
            <linearGradient id="church-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#1e40af" />
              <stop offset="50%" stopColor="#7c3aed" />
              <stop offset="100%" stopColor="#0891b2" />
            </linearGradient>
          </defs>
        </svg>
      </div>
    </section>
  );
} 