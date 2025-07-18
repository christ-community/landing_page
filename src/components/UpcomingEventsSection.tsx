import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Calendar, Clock, MapPin, Users, ArrowRight } from 'lucide-react';
import type { EventsConfig, EventCategory } from '@/types';

const defaultEventsConfig: EventsConfig = {
  title: "Join Us for Amazing Events!",
  subtitle: "Experience community, growth, and spiritual transformation",
  description: "You can have confidence in your experience. Our church offers fully-engaging, transformative events along with community support, fellowship and spiritual growth opportunities. What do you have to lose?",
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

const eventCategories: EventCategory[] = [
  { id: 'worship', name: 'Worship Services', icon: <Calendar className="w-5 h-5" />, color: 'bg-orange-500' },
  { id: 'outreach', name: 'Community Outreach', icon: <Users className="w-5 h-5" />, color: 'bg-purple-500' },
  { id: 'conference', name: 'Special Events', icon: <MapPin className="w-5 h-5" />, color: 'bg-green-500' },
  { id: 'prayer', name: 'Prayer & Healing', icon: <Clock className="w-5 h-5" />, color: 'bg-red-500' },
];

interface UpcomingEventsSectionProps {
  config?: Partial<EventsConfig>;
}

export default function UpcomingEventsSection({ config }: UpcomingEventsSectionProps) {
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

          {/* Right Side - 3D Geometric Structure */}
          <div className="w-full lg:w-1/2 relative">
            {/* Main 3D Container */}
            <div className="relative w-full max-w-2xl mx-auto h-[500px] perspective-1000">
              
              {/* 3D Orange Structure */}
              <div className="absolute inset-0 transform-gpu">
                {/* Main geometric shape */}
                <div className="absolute top-0 right-0 w-80 h-80 bg-gradient-to-br from-orange-400 to-orange-600 transform rotate-12 skew-y-6 rounded-2xl shadow-2xl">
                  {/* Inner geometric patterns */}
                  <div className="absolute inset-4 bg-gradient-to-br from-orange-300 to-orange-500 rounded-xl">
                    <div className="absolute inset-4 bg-gradient-to-br from-orange-200 to-orange-400 rounded-lg">
                      {/* Central content area */}
                      <div className="absolute inset-4 bg-gradient-to-br from-orange-100 to-orange-300 rounded-md flex items-center justify-center">
                        <div className="w-32 h-20 bg-white/20 rounded backdrop-blur-sm flex items-center justify-center">
                          <Calendar className="w-8 h-8 text-white" />
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Vertical lines pattern */}
                  <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-b from-orange-500 to-orange-700 opacity-80">
                    {Array.from({ length: 20 }).map((_, i) => (
                      <div 
                        key={i} 
                        className="h-1 bg-orange-600 mb-1 opacity-60" 
                        style={{ width: `${Math.random() * 100}%` }}
                      />
                    ))}
                  </div>
                </div>

                {/* Secondary geometric elements */}
                <div className="absolute bottom-10 left-10 w-32 h-32 bg-gradient-to-br from-amber-400 to-orange-500 transform -rotate-12 rounded-xl shadow-xl opacity-90">
                  <div className="absolute inset-2 bg-gradient-to-br from-amber-300 to-orange-400 rounded-lg">
                    <div className="absolute inset-2 bg-gradient-to-br from-amber-200 to-orange-300 rounded flex items-center justify-center">
                      <Users className="w-6 h-6 text-white" />
                    </div>
                  </div>
                </div>

                {/* Floating accent shapes */}
                <div className="absolute top-20 left-20 w-20 h-20 bg-gradient-to-br from-red-400 to-orange-500 transform rotate-45 rounded-lg shadow-lg opacity-70">
                  <div className="absolute inset-2 bg-gradient-to-br from-red-300 to-orange-400 rounded">
                    <div className="absolute inset-2 bg-gradient-to-br from-red-200 to-orange-300 rounded flex items-center justify-center">
                      <Clock className="w-4 h-4 text-white" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Event Categories - Single Horizontal Card */}
        <div className="mt-20">
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

      {/* CSS for 3D perspective */}
      <style jsx>{`
        .perspective-1000 {
          perspective: 1000px;
        }
      `}</style>
    </section>
  );
} 