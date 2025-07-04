'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { MapPin, Clock, Users, Star, Globe, Phone } from 'lucide-react';
import type { Church } from '@/types';

interface FeaturedChurchesProps {
  title?: string;
  subtitle?: string;
  churches?: Church[];
}

// Featured churches data
const defaultFeaturedChurches: Church[] = [
  {
    id: 'featured-1',
    name: 'All Souls Church Langham Place',
    address: {
      street: '2 All Souls Pl',
      city: 'London',
      state: 'Greater London',
      postcode: 'W1B 3DA',
      country: 'UK'
    },
    coordinates: { lat: 51.5183, lng: -0.1431 },
    contact: {
      phone: '+44 20 7580 3522',
      email: 'info@allsouls.org',
      website: 'https://www.allsouls.org'
    },
    services: {
      sunday: '9:00 AM, 11:30 AM & 6:30 PM',
      other: ['Midweek service Wednesday 1:10 PM']
    },
    pastor: 'Hugh Palmer',
    denomination: 'Church of England',
    image: '/Church-Conference.jpg'
  },
  {
    id: 'featured-2',
    name: 'Holy Trinity Brompton',
    address: {
      street: 'Brompton Rd',
      city: 'London',
      state: 'Greater London',
      postcode: 'SW7 1JA',
      country: 'UK'
    },
    coordinates: { lat: 51.4994, lng: -0.1652 },
    contact: {
      phone: '+44 20 7581 8255',
      email: 'info@htb.org',
      website: 'https://www.htb.org'
    },
    services: {
      sunday: '9:00 AM, 11:00 AM & 6:30 PM',
      wednesday: '7:00 PM'
    },
    pastor: 'Nicky Gumbel',
    denomination: 'Church of England',
    image: '/worship-conference.jpeg'
  },
  {
    id: 'featured-3',
    name: 'Kensington Temple',
    address: {
      street: '1 Kensington Park Rd',
      city: 'London',
      state: 'Greater London',
      postcode: 'W11 3BY',
      country: 'UK'
    },
    coordinates: { lat: 51.5130, lng: -0.1961 },
    contact: {
      phone: '+44 20 7792 7500',
      email: 'info@kt.org',
      website: 'https://www.kt.org'
    },
    services: {
      sunday: '8:30 AM, 10:30 AM & 6:30 PM',
      wednesday: '7:30 PM'
    },
    pastor: 'Colin Dye',
    denomination: 'Pentecostal',
    image: '/Church-Conference.jpg'
  }
];

export default function FeaturedChurches({
  title = "Featured Churches",
  subtitle = "Discover some of the amazing church communities in our directory",
  churches = defaultFeaturedChurches
}: FeaturedChurchesProps) {
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Header */}
        <div className="mb-12 grid lg:grid-cols-2 gap-8 items-center">
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight leading-tight text-foreground">
            {title}
          </h2>
          <p className="text-lg text-muted-foreground max-w-xl">
            {subtitle}
          </p>
        </div>

        {/* Churches Grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 mb-12">
          {churches.map((church) => (
            <Card key={church.id} className="group overflow-hidden border border-border/10 bg-card transition-all duration-300 hover:border-tertiary/40 hover:shadow-lg rounded-xl">
              {/* Church Image */}
              <div className="relative h-48 overflow-hidden">
                <Image
                  src={church.image || '/Church-Conference.jpg'}
                  alt={church.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                
                {/* Featured Badge */}
                <Badge className="absolute top-4 left-4 bg-tertiary text-tertiary-foreground">
                  <Star className="w-3 h-3 mr-1" />
                  Featured
                </Badge>
              </div>

              <CardHeader className="pb-3">
                <h3 className="text-xl font-bold text-foreground group-hover:text-tertiary transition-colors line-clamp-2">
                  {church.name}
                </h3>
                <div className="flex items-center space-x-2">
                  <Badge variant="secondary" className="text-xs">
                    {church.denomination}
                  </Badge>
                  {church.pastor && (
                    <span className="text-sm text-muted-foreground">
                      Pastor {church.pastor}
                    </span>
                  )}
                </div>
              </CardHeader>

              <CardContent className="space-y-4">
                {/* Address */}
                <div className="flex items-start space-x-2">
                  <MapPin className="w-4 h-4 text-tertiary mt-0.5 flex-shrink-0" />
                  <span className="text-sm text-muted-foreground line-clamp-2">
                    {church.address.street}, {church.address.city}
                  </span>
                </div>

                {/* Service Times */}
                {church.services.sunday && (
                  <div className="flex items-start space-x-2">
                    <Clock className="w-4 h-4 text-tertiary mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-muted-foreground">
                      Sunday: {church.services.sunday}
                    </span>
                  </div>
                )}

                {/* Contact Info */}
                <div className="flex items-center justify-between pt-2">
                  <div className="flex space-x-2">
                    {church.contact.website && (
                      <Button size="sm" variant="ghost" asChild className="p-1 h-8 w-8">
                        <Link href={church.contact.website} target="_blank">
                          <Globe className="w-4 h-4" />
                        </Link>
                      </Button>
                    )}
                    {church.contact.phone && (
                      <Button size="sm" variant="ghost" asChild className="p-1 h-8 w-8">
                        <Link href={`tel:${church.contact.phone}`}>
                          <Phone className="w-4 h-4" />
                        </Link>
                      </Button>
                    )}
                  </div>
                  
                  <Button size="sm" variant="outline" className="text-xs border-border/20">
                    <Users className="w-3 h-3 mr-1" />
                    Learn More
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center">
          <p className="text-lg text-muted-foreground mb-6">
            Ready to find churches in your area?
          </p>
          <Button 
            onClick={() => {
              const finderSection = document.querySelector('[data-section="church-finder"]');
              finderSection?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="bg-tertiary hover:bg-tertiary/90 text-tertiary-foreground px-8"
          >
            Start Your Search
          </Button>
        </div>
      </div>
    </section>
  );
} 