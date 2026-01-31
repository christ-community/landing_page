'use client';

import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import Image from 'next/image';
import Link from 'next/link';
import { MapPin, Calendar, Search, Users } from 'lucide-react';
import type { EventItem } from '@/types';

interface FeaturedMedia {
  type: 'image' | 'video';
  src: string;
  alt: string;
  poster?: string;
}

interface EventListProps {
  events: EventItem[];
  featuredMedia?: {
    bigChurch?: FeaturedMedia;
    tenCfc?: FeaturedMedia;
  };
}

const categories = ['Community', 'Conference', 'Outreach', 'Webinar', 'Workshop'];

function EventCard({ event }: { event: EventItem }) {
  return (
    <Card className="group overflow-hidden flex flex-col transition-all duration-300 hover:shadow-md border-border/40">
      <div className="relative h-56">
        <Image src={event.image} alt={event.title} fill className="object-cover group-hover:scale-105 transition-transform"/>
        <Badge className="absolute top-4 left-4 bg-background/80 text-foreground border border-border/40">{event.category}</Badge>
      </div>
      <div className="p-6 flex flex-col flex-grow">
        <div className="flex justify-between items-start mb-2">
            <h3 className="text-xl font-bold text-foreground line-clamp-2">{event.title}</h3>
        </div>
        <div className="space-y-3 text-sm text-muted-foreground mb-6">
            <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4"/>
                <span>{event.date.startDate} @ {event.date.time}</span>
            </div>
            <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4"/>
                <span>{event.location === 'Online' ? 'Online Event' : event.location.venue}</span>
            </div>
        </div>
        <p className="text-muted-foreground text-sm line-clamp-3 mb-6 flex-grow">{event.description}</p>
        <Button asChild className="mt-auto w-full">
            <Link href="/contact">Join Event</Link>
        </Button>
      </div>
    </Card>
  )
}

export default function EventList({ events, featuredMedia }: EventListProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');

  const filteredEvents = events.filter(event => {
    return (
      (event.title.toLowerCase().includes(searchTerm.toLowerCase()) || event.description.toLowerCase().includes(searchTerm.toLowerCase())) &&
      (categoryFilter === 'all' || event.category === categoryFilter)
    );
  });

  return (
    <section className="section">
      <div className="section-inner">
        <div className="space-y-6 mb-12">
          <Card className="overflow-hidden bg-muted/30 border border-border/40">
            <div className="grid md:grid-cols-2 gap-6 p-8">
              <div className="flex flex-col justify-center">
                <Badge className="bg-background/80 text-foreground border border-border/40 w-fit mb-4">
                  Conference Highlights
                </Badge>
                <h3 className="text-3xl font-bold text-foreground mb-3">
                  The Big Church Conference
                </h3>
                <p className="text-muted-foreground mb-6">
                  A gathering of believers across South Wales. Explore photos and videos from worship, teaching, and fellowship.
                </p>
                <Button asChild variant="outline" className="w-fit">
                  <Link href="/what-we-do/photizen">View Gallery</Link>
                </Button>
              </div>
              <div className="relative h-64 md:h-auto rounded-[var(--radius)] overflow-hidden">
                {featuredMedia?.bigChurch?.type === 'video' ? (
                  <video
                    className="h-full w-full object-cover"
                    controls
                    preload="metadata"
                    poster={featuredMedia.bigChurch.poster}
                  >
                    <source src={featuredMedia.bigChurch.src} />
                  </video>
                ) : (
                  <Image
                    src={featuredMedia?.bigChurch?.src || "/Church-Conference.jpg"}
                    alt={featuredMedia?.bigChurch?.alt || "Big Church Conference"}
                    fill
                    className="object-cover"
                  />
                )}
              </div>
            </div>
          </Card>

          <Card className="overflow-hidden bg-muted/20 border border-border/40">
            <div className="grid md:grid-cols-2 gap-6 p-8">
              <div className="flex flex-col justify-center">
                <Badge className="bg-background/80 text-foreground border border-border/40 w-fit mb-4">
                  Outreach Highlights
                </Badge>
                <h3 className="text-3xl font-bold text-foreground mb-3">
                  10 Welsh Cities for Christ
                </h3>
                <p className="text-muted-foreground mb-6">
                  A multi-city outreach across Wales. See the moments from worship, prayer, and Gospel outreach.
                </p>
                <Button asChild variant="outline" className="w-fit">
                  <Link href="/what-we-do/10-cities-for-christ">View Gallery</Link>
                </Button>
              </div>
              <div className="relative h-64 md:h-auto rounded-[var(--radius)] overflow-hidden">
                {featuredMedia?.tenCfc?.type === 'video' ? (
                  <video
                    className="h-full w-full object-cover"
                    controls
                    preload="metadata"
                    poster={featuredMedia.tenCfc.poster}
                  >
                    <source src={featuredMedia.tenCfc.src} />
                  </video>
                ) : (
                  <Image
                    src={featuredMedia?.tenCfc?.src || "/Church-Conference.jpg"}
                    alt={featuredMedia?.tenCfc?.alt || "10 Welsh Cities for Christ"}
                    fill
                    className="object-cover"
                  />
                )}
              </div>
            </div>
          </Card>
        </div>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Filters - Left Sidebar */}
          <aside className="lg:col-span-1">
            <div className="p-6 bg-muted/30 rounded-[var(--radius)] sticky top-24 border border-border/40">
              <h3 className="text-lg font-semibold mb-6">Filter Events</h3>
              <div className="space-y-6">
                <div>
                  <label className="text-sm font-medium mb-2 block">Search</label>
                  <div className="relative">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                      <Input 
                          placeholder="Event name..." 
                          className="pl-10"
                          value={searchTerm}
                          onChange={(e) => setSearchTerm(e.target.value)}
                      />
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">Category</label>
                  <Select value={categoryFilter} onValueChange={(val) => setCategoryFilter(val)}>
                      <SelectTrigger>
                          <SelectValue placeholder="All Categories"/>
                      </SelectTrigger>
                      <SelectContent>
                          <SelectItem value="all">All Categories</SelectItem>
                          {categories.map(cat => <SelectItem key={cat} value={cat}>{cat}</SelectItem>)}
                      </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          </aside>

          {/* Event Grid - Right Side */}
            <main className="lg:col-span-3">
            {filteredEvents.length > 0 ? (
                <div className="grid md:grid-cols-2 gap-6">
                    {filteredEvents.map(event => (
                        <EventCard key={event.id} event={event} />
                    ))}
                </div>
            ) : (
                <div className="text-center py-20">
                    <Users className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
                    <h3 className="text-2xl font-bold text-foreground">No Events Found</h3>
                    <p className="text-muted-foreground mt-2">
                        Try adjusting your search or filters. New events are added regularly!
                    </p>
                </div>
            )}
          </main>
        </div>
      </div>
    </section>
  );
}
