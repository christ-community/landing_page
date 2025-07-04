'use client';

import Image from 'next/image';
import { MapPin, Users, Heart, Star } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

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
    { icon: MapPin, label: "Churches", value: `${stats.churches}+`, color: "text-blue-600" },
    { icon: Users, label: "Community Members", value: `${stats.members.toLocaleString()}+`, color: "text-green-600" },
    { icon: Heart, label: "Cities Covered", value: `${stats.cities}+`, color: "text-purple-600" }
  ];

  return (
    <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src={backgroundImage}
          alt="Church community"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/90 via-blue-800/70 to-purple-900/80" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-6 lg:px-12 text-center text-white">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Badge */}
          <Badge variant="secondary" className="bg-white/20 text-white border-white/30 text-sm px-4 py-2">
            <Star className="w-4 h-4 mr-2" />
            Trusted Church Directory
          </Badge>

          {/* Main Heading */}
          <h1 className="text-5xl lg:text-7xl font-bold leading-tight">
            {title}
          </h1>

          {/* Subtitle */}
          <h2 className="text-2xl lg:text-3xl font-medium text-blue-100">
            {subtitle}
          </h2>

          {/* Description */}
          <p className="text-xl lg:text-2xl text-white/90 max-w-3xl mx-auto leading-relaxed">
            {description}
          </p>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
            {statItems.map((stat, index) => (
              <div key={index} className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
                <stat.icon className={`w-8 h-8 mx-auto mb-4 ${stat.color}`} />
                <div className="text-3xl font-bold mb-2">{stat.value}</div>
                <div className="text-lg text-white/80">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-white/10 to-transparent" />
    </section>
  );
} 