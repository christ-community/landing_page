'use client';

import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Quote,
  Heart,
  Users,
  Globe,
  Star,
  Calendar,
  Award
} from 'lucide-react';
import type { VolunteerTestimonial, VolunteerImpactStat } from '@/types';

interface VolunteerImpactProps {
  title?: string;
  subtitle?: string;
  testimonials?: VolunteerTestimonial[];
  impactStats?: VolunteerImpactStat[];
}

const defaultTestimonials: VolunteerTestimonial[] = [
  {
    id: '1',
    name: 'Sarah Mitchell',
    role: 'Community Outreach Volunteer',
    quote: 'Volunteering here has been life-changing. I\'ve met incredible people and seen firsthand how our efforts transform lives in the community. The support from the team makes every volunteer feel valued and empowered.',
    image: '/Church-Conference.jpg',
    volunteeredSince: '2 years',
    favoriteActivity: 'Food bank coordination'
  },
  {
    id: '2',
    name: 'David Chen',
    role: 'Tech Support Volunteer',
    quote: 'I love using my tech skills to support the church\'s mission. From managing live streams to helping with the website, I feel like I\'m making a real difference while growing professionally.',
    image: '/worship-conference.jpeg',
    volunteeredSince: '1.5 years',
    favoriteActivity: 'Live streaming services'
  },
  {
    id: '3',
    name: 'Maria Rodriguez',
    role: 'Children\'s Ministry Helper',
    quote: 'Working with the children brings me so much joy. Their enthusiasm and curiosity remind me why this work matters. Plus, the training and support I receive help me grow as a leader.',
    image: '/Church-Conference.jpg',
    volunteeredSince: '3 years',
    favoriteActivity: 'Sunday school teaching'
  }
];

const defaultImpactStats: VolunteerImpactStat[] = [
  {
    label: 'Families Helped',
    value: '2,500+',
    description: 'Local families supported through our programs',
    icon: <Heart className="w-6 h-6" />,
    color: 'text-red-500'
  },
  {
    label: 'Meals Served',
    value: '15,000+',
    description: 'Nutritious meals provided to those in need',
    icon: <Users className="w-6 h-6" />,
    color: 'text-green-500'
  },
  {
    label: 'Communities Reached',
    value: '50+',
    description: 'Neighborhoods and communities impacted',
    icon: <Globe className="w-6 h-6" />,
    color: 'text-blue-500'
  },
  {
    label: 'Programs Supported',
    value: '25+',
    description: 'Active programs run by volunteers',
    icon: <Award className="w-6 h-6" />,
    color: 'text-purple-500'
  }
];

export default function VolunteerImpact({
  title = "Real Stories, Real Impact",
  subtitle = "Hear from our volunteers and see the difference we're making together",
  testimonials = defaultTestimonials,
  impactStats = defaultImpactStats
}: VolunteerImpactProps) {
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

        {/* Impact Statistics */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 mb-20">
          {impactStats.map((stat, index) => (
            <Card key={index} className="text-center p-6 border border-border/10 bg-card transition-all duration-300 hover:border-tertiary/40 hover:shadow-lg rounded-xl">
              <CardContent className="p-0">
                <div className={`inline-flex p-3 rounded-full bg-tertiary/10 mb-4 ${stat.color}`}>
                  {stat.icon}
                </div>
                <div className="text-3xl lg:text-4xl font-bold text-foreground mb-2">
                  {stat.value}
                </div>
                <div className="text-lg font-semibold text-foreground mb-2">
                  {stat.label}
                </div>
                <div className="text-sm text-muted-foreground">
                  {stat.description}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Testimonials */}
        <div className="grid gap-6 sm:grid-cols-1 lg:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <Card key={testimonial.id} className="relative overflow-hidden border border-border/10 bg-card transition-all duration-300 hover:border-tertiary/40 hover:shadow-lg rounded-xl">
              {/* Quote Icon */}
              <div className="absolute top-4 right-4 text-tertiary/20">
                <Quote className="w-8 h-8" />
              </div>

              <CardContent className="p-8">
                {/* Profile */}
                <div className="flex items-center mb-6">
                  <div className="relative w-16 h-16 rounded-full overflow-hidden mr-4">
                    <Image
                      src={testimonial.image || '/Church-Conference.jpg'}
                      alt={testimonial.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <h4 className="font-bold text-foreground text-lg">
                      {testimonial.name}
                    </h4>
                    <p className="text-sm text-tertiary font-medium">
                      {testimonial.role}
                    </p>
                  </div>
                </div>

                {/* Quote */}
                <blockquote className="text-muted-foreground leading-relaxed mb-6 italic">
                  "{testimonial.quote}"
                </blockquote>

                {/* Details */}
                <div className="flex flex-wrap gap-2">
                  <Badge variant="outline" className="text-xs border-border/20">
                    <Calendar className="w-3 h-3 mr-1" />
                    {testimonial.volunteeredSince} volunteering
                  </Badge>
                  <Badge variant="outline" className="text-xs border-border/20">
                    <Heart className="w-3 h-3 mr-1" />
                    {testimonial.favoriteActivity}
                  </Badge>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Additional Impact Section */}
        <div className="mt-20 text-center">
          <div className="bg-tertiary rounded-xl p-12 text-tertiary-foreground">
            <h3 className="text-3xl lg:text-4xl font-bold mb-6">
              Every Volunteer Creates Ripple Effects
            </h3>
            <p className="text-xl text-tertiary-foreground/90 max-w-3xl mx-auto leading-relaxed mb-8">
              When you volunteer, you don't just impact the immediate recipients of our programs. 
              You inspire others, strengthen communities, and create positive change that spreads far beyond what we can measure.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
              <div className="text-center">
                <div className="text-4xl font-bold mb-2">100%</div>
                <div className="text-tertiary-foreground/80">of volunteers report personal growth</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold mb-2">95%</div>
                <div className="text-tertiary-foreground/80">feel more connected to community</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold mb-2">89%</div>
                <div className="text-tertiary-foreground/80">develop new friendships</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
} 