'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Calendar, Clock, MapPin, ArrowRight } from 'lucide-react';
import type { IEvent } from '../../types/contentful';
import { processAsset } from '@/lib/contentful-utils';

const defaultEventsConfig = {
  title: "Upcoming Events",
  subtitle: "Join gatherings designed for worship, formation, and community impact.",
  description: "We host regular services, outreach moments, and seasonal events across Swansea and beyond.",
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

interface UpcomingEventsSectionProps {
  config?: Partial<any>;
  events?: IEvent[];
}

export default function UpcomingEventsSection({ config, events }: UpcomingEventsSectionProps) {
  const eventsConfig = { ...defaultEventsConfig, ...config };
  const { title, subtitle, description, ctaText, ctaUrl } = eventsConfig;
  const eventList = events && events.length > 0 ? events : eventsConfig.events;
  const featuredEvents = eventList.slice(0, 3);

  return (
    <section className="section bg-muted/30">
      <div className="section-inner">
        <div className="grid gap-10 lg:grid-cols-[1fr_1.2fr] items-start">
          <div className="stack-lg">
            <div className="stack">
              <p className="eyebrow">Events & Outreaches</p>
              <h2 className="section-title">{title}</h2>
              <p className="section-lead max-w-xl">{subtitle}</p>
              <p className="text-muted-foreground max-w-xl">{description}</p>
            </div>
            <Button size="lg" asChild>
              <Link href={ctaUrl} className="flex items-center gap-2">
                <span>{ctaText}</span>
                <ArrowRight className="w-5 h-5" />
              </Link>
            </Button>
          </div>

          <div className="grid gap-6">
            {featuredEvents.map((event, index) => {
              const image = "image" in event ? event.image : event.featuredImage;
              const imageUrl = typeof image === "string" ? image : image ? processAsset(image as any) : undefined;
              const eventDate = "startDate" in event && event.startDate ? event.startDate : event.date;
              return (
                <div key={`${event.title}-${index}`} className="flex flex-col sm:flex-row gap-6 rounded-[var(--radius)] border border-border/40 bg-card p-6 shadow-sm">
                  <div className="relative h-48 w-full sm:w-48 sm:h-40 overflow-hidden rounded-[var(--radius)] bg-muted">
                    {imageUrl && (
                      <img src={imageUrl} alt={event.title} className="h-full w-full object-cover" />
                    )}
                  </div>
                  <div className="flex-1 stack">
                    <div className="stack">
                      <h3 className="text-xl font-semibold text-foreground">{event.title}</h3>
                      <p className="text-muted-foreground">{event.description}</p>
                    </div>
                    <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                      <span className="flex items-center gap-2">
                        <Calendar className="h-4 w-4" />
                        {eventDate}
                      </span>
                      {event.time && (
                        <span className="flex items-center gap-2">
                          <Clock className="h-4 w-4" />
                          {event.time}
                        </span>
                      )}
                      {event.location && (
                        <span className="flex items-center gap-2">
                          <MapPin className="h-4 w-4" />
                          {event.location}
                        </span>
                      )}
                    </div>
                    {event.registrationUrl && (
                      <Button asChild variant="outline" size="sm">
                        <Link href={event.registrationUrl}>Register</Link>
                      </Button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
