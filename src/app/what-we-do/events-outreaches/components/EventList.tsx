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

interface EventListProps {
  events: EventItem[];
}

const categories = ['Community', 'Conference', 'Outreach', 'Webinar', 'Workshop'];

function EventCard({ event }: { event: EventItem }) {
  return (
    <Card className="group overflow-hidden flex flex-col transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
      <div className="relative h-56">
        <Image src={event.image} alt={event.title} fill className="object-cover group-hover:scale-105 transition-transform"/>
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
        <Badge className="absolute top-4 left-4">{event.category}</Badge>
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

export default function EventList({ events }: EventListProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');

  const filteredEvents = events.filter(event => {
    return (
      (event.title.toLowerCase().includes(searchTerm.toLowerCase()) || event.description.toLowerCase().includes(searchTerm.toLowerCase())) &&
      (categoryFilter === 'all' || event.category === categoryFilter)
    );
  });

  return (
    <div className="py-24 bg-background">
      <div className="container mx-auto px-6 lg:px-12">
        {/* Featured Conference Banner */}
        <Card className="mb-12 overflow-hidden bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950/30 dark:to-indigo-950/30 border-2 border-blue-200 dark:border-blue-800">
          <div className="grid md:grid-cols-2 gap-6 p-8">
            <div className="flex flex-col justify-center">
              <Badge className="bg-blue-600 text-white border-0 w-fit mb-4">
                Featured Conference
              </Badge>
              <h3 className="text-3xl font-bold text-foreground mb-3">
                The Big Church Conference Swansea
              </h3>
              <p className="text-muted-foreground mb-4">
                A gathering of churches in South Wales to meet and pray together for the salvation of the region. 
                Join us for worship, panel discussions, and networking.
              </p>
              <div className="space-y-2 text-sm text-muted-foreground mb-6">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-blue-600" />
                  <span>Saturday, November 15th, 2025 • 5:00 PM - 8:00 PM</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-blue-600" />
                  <span>47B Westbury Street, Swansea, SA1 4JW</span>
                </div>
              </div>
              <Button asChild className="w-fit bg-blue-600 hover:bg-blue-700">
                <Link href="/what-we-do/photizen">Learn More & Register</Link>
              </Button>
            </div>
            <div className="relative h-64 md:h-auto rounded-xl overflow-hidden">
              <Image 
                src="/Church-Conference.jpg" 
                alt="Big Church Conference" 
                fill 
                className="object-cover"
              />
            </div>
          </div>
        </Card>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Filters - Left Sidebar */}
          <aside className="lg:col-span-1">
            <div className="p-6 bg-muted/40 rounded-xl sticky top-24">
              <h3 className="text-xl font-bold mb-6">Filter Events</h3>
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
                <div className="grid md:grid-cols-2 gap-8">
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
    </div>
  );
} 