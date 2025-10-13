'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Calendar, Clock, MapPin, Users, ArrowRight } from 'lucide-react';
import type { IEvent } from '../../types/contentful';
import { processAsset } from '@/lib/contentful-utils';

const defaultEventsConfig = {
  title: "Join Us for Amazing Events!",
  subtitle: "Experience community, growth, and spiritual transformation",
  description: "You can have confidence in your experience. Our community offers fully-engaging, transformative events along with community support, fellowship and spiritual growth opportunities. What do you have to lose?",
  ctaText: "View All Events",
  ctaUrl: "/what-we-do/events-outreaches",
  events: [
    {
      id: '1',
      title: 'Sunday Worship',
      description: 'Weekly worship service',
      date: 'Every Sunday',
      time: '10:00 AM',
      location: 'Main Sanctuary',
      image: '/worship-conference.jpeg',
      category: 'Worship',
      attendees: 200,
      registrationUrl: '/contact'
    },
    {
      id: '2',
      title: 'Community Outreach',
      description: 'Serve the community',
      date: 'March 15, 2024',
      time: '9:00 AM',
      location: 'Community Center',
      image: '/Church-Conference.jpg',
      category: 'Outreach',
      attendees: 75,
      registrationUrl: '/get-involved/volunteer-with-us'
    },
    {
      id: '3',
      title: 'Youth Conference',
      description: 'Weekend for young people',
      date: 'April 20-21, 2024',
      time: 'All Day',
      location: 'Conference Hall',
      image: '/worship-conference.jpeg',
      category: 'Conference',
      attendees: 150,
      registrationUrl: '/what-we-do/events-outreaches'
    },
    {
      id: '4',
      title: 'Prayer Service',
      description: 'Prayer and healing service',
      date: 'March 8, 2024',
      time: '7:00 PM',
      location: 'Prayer Chapel',
      image: '/Church-Conference.jpg',
      category: 'Prayer',
      attendees: 80,
      registrationUrl: '/what-we-do/healing-lifting-resources'
    }
  ]
};

const eventCategories = [
  { id: 'worship', name: 'Weekly Services', icon: <Calendar className="w-5 h-5" />, color: 'bg-orange-500' },
  { id: 'outreach', name: 'Community Outreach', icon: <Users className="w-5 h-5" />, color: 'bg-purple-500' },
  { id: 'conference', name: 'Special Events', icon: <MapPin className="w-5 h-5" />, color: 'bg-green-500' },
  { id: 'prayer', name: 'Prayer & Healing', icon: <Clock className="w-5 h-5" />, color: 'bg-red-500' },
];

interface UpcomingEventsSectionProps {
  config?: Partial<any>;
  events?: IEvent[];
}

export default function UpcomingEventsSection({ config, events }: UpcomingEventsSectionProps) {
  const eventsConfig = { ...defaultEventsConfig, ...config };
  const { title, subtitle, description, ctaText, ctaUrl } = eventsConfig;

  return (
    <section className="relative py-24 bg-gradient-to-br from-orange-50/30 via-amber-50/20 to-red-50/30 dark:from-orange-950/20 dark:via-amber-950/10 dark:to-red-950/20 overflow-hidden">
      {/* Lighter gradient background */}
      <div className="absolute inset-0 bg-gradient-to-r from-orange-100/20 via-amber-100/15 to-red-100/20 dark:from-orange-900/10 dark:via-amber-900/5 dark:to-red-900/10" />
      
      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-16 min-h-[70vh]">
          
          {/* Left Side - Text Content */}
          <div className="w-full lg:w-1/2 space-y-8">
            <div className="space-y-6">
              <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight text-foreground">
                {title}
              </h2>
              <p className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-2xl">
                {subtitle}
              </p>
              <p className="text-base text-muted-foreground/80 leading-relaxed max-w-2xl">
                {description}
              </p>
            </div>
            
            <div className="space-y-4">
              <p className="text-sm font-medium text-foreground">
                Click below to learn more & join:
              </p>
              <Button 
                size="lg" 
                className="bg-orange-500 hover:bg-orange-600 text-white shadow-lg hover:shadow-xl transition-all duration-300 px-8 py-4"
                asChild
              >
                <Link href={ctaUrl} className="flex items-center space-x-2">
                  <span>{ctaText}</span>
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </Button>
            </div>
          </div>

          {/* Right Side - Simple Visual Design */}
          <div className="w-full lg:w-1/2 relative">
            <div className="relative w-full max-w-2xl mx-auto h-[500px]">
              
              {/* Simple card-based design */}
              <div className="absolute top-0 right-0 w-80 h-80 bg-gradient-to-br from-orange-400 to-orange-600 rounded-2xl shadow-2xl flex items-center justify-center">
                <div className="text-center text-white">
                  <Calendar className="w-16 h-16 mx-auto mb-4" />
                  <h3 className="text-xl font-bold">Join Our Events</h3>
                  <p className="text-orange-100">Experience community & growth</p>
                </div>
              </div>

              {/* Simple accent elements */}
              <div className="absolute bottom-10 left-10 w-32 h-32 bg-gradient-to-br from-amber-400 to-orange-500 rounded-xl shadow-xl flex items-center justify-center">
                <Users className="w-8 h-8 text-white" />
              </div>

              <div className="absolute top-20 left-20 w-20 h-20 bg-gradient-to-br from-red-400 to-orange-500 rounded-lg shadow-lg flex items-center justify-center">
                <Clock className="w-6 h-6 text-white" />
              </div>
            </div>
          </div>
        </div>

        {/* Featured Conference Banner */}
        <div className="mt-16">
          <Link 
            href="/what-we-do/photizen"
            className="block bg-gradient-to-r from-blue-600 to-indigo-700 rounded-2xl p-8 shadow-2xl hover:shadow-3xl transition-all duration-300 group"
          >
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="flex-1 text-white space-y-3">
                <div className="flex items-center gap-2">
                  <Calendar className="w-5 h-5" />
                  <span className="text-sm font-semibold uppercase tracking-wider">Featured Event</span>
                </div>
                <h3 className="text-3xl font-bold">The Big Church Conference Swansea</h3>
                <p className="text-blue-100 text-sm md:text-base">
                  November 15, 2025 • 4:00 PM - 7:00 PM • 47B Westbury Street, Swansea
                </p>
              </div>
              <Button 
                size="lg" 
                className="bg-white text-blue-600 hover:bg-blue-50 shadow-lg group-hover:scale-105 transition-all duration-300"
              >
                Register Now
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </div>
          </Link>
        </div>

        {/* Bottom Event Categories - Single Horizontal Card */}
        <div className="mt-8">
          <div className="bg-gradient-to-r from-gray-500 to-gray-900 rounded-2xl p-8 shadow-2xl">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {eventCategories.map((category) => (
                <Link
                  key={category.id}
                  href="/what-we-do/events-outreaches"
                  className="flex flex-col items-center space-y-3 p-4 hover:bg-white/10 rounded-xl transition-all duration-300 group cursor-pointer"
                >
                  <div className={`${category.color} p-3 rounded-lg text-white group-hover:scale-110 transition-transform duration-300`}>
                    {category.icon}
                  </div>
                  <span className="text-sm font-semibold text-white text-center group-hover:text-orange-300 transition-colors duration-300">
                    {category.name}
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
} 