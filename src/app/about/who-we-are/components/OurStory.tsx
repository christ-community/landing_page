'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Calendar, 
  Users, 
  Heart, 
  Globe, 
  Lightbulb,
  Building,
  TreePine,
  Star,
  ArrowRight,
  Quote
} from 'lucide-react';
import Link from 'next/link';
import type { ITimelineEvent, ICommunityStat } from '../../../../../types/contentful';

const timeline = [
  {
    year: "2008",
    title: "The Beginning",
    description: "Christ Community was founded by a group of families with a vision to create an authentic Christian community.",
    icon: Lightbulb,
    milestone: "Church Founded"
  },
  {
    year: "2010",
    title: "First Building",
    description: "We moved into our first permanent location, a converted warehouse that became our spiritual home.",
    icon: Building,
    milestone: "Permanent Location"
  },
  {
    year: "2013",
    title: "Community Growth",
    description: "Our congregation grew to over 200 members, launching multiple ministries and small groups.",
    icon: Users,
    milestone: "200+ Members"
  },
  {
    year: "2016",
    title: "Global Mission",
    description: "We launched our first international mission partnership, extending our reach beyond our local community.",
    icon: Globe,
    milestone: "Global Outreach"
  },
  {
    year: "2019",
    title: "Campus Expansion",
    description: "We expanded our facilities to better serve our growing community and new ministries.",
    icon: TreePine,
    milestone: "Facility Expansion"
  },
  {
    year: "2024",
    title: "Continued Growth",
    description: "Today we're a thriving community of over 500 members, impacting lives locally and globally.",
    icon: Star,
    milestone: "500+ Members"
  }
];

const values = [
  {
    title: "Authentic Community",
    description: "We believe in building genuine relationships where people can be real about their struggles and victories.",
    icon: Users,
    color: "text-blue-500"
  },
  {
    title: "Biblical Truth",
    description: "God's Word is our foundation. We are committed to teaching and living by biblical principles.",
    icon: Quote,
    color: "text-green-500"
  },
  {
    title: "Compassionate Service",
    description: "We serve others with the same love and compassion that Christ has shown us.",
    icon: Heart,
    color: "text-red-500"
  },
  {
    title: "Global Vision",
    description: "Our heart extends beyond our local community to reach people around the world with the Gospel.",
    icon: Globe,
    color: "text-purple-500"
  }
];



interface OurStoryProps {
  timelineEvents?: ITimelineEvent[];
  communityStats?: ICommunityStat[];
}

export default function OurStory({ timelineEvents, communityStats }: OurStoryProps) {
  console.log('timelineEvents, ', timelineEvents);
  console.log('communityStats, ', communityStats);
  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-6 lg:px-12">
        {/* Introduction */}
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            Our Journey Together
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Every great story has humble beginnings. Ours started with a small group of believers who shared 
            a common dream: to create a community where faith flourishes, relationships thrive, and lives are transformed.
          </p>
        </div>

        {/* Timeline */}
        <div className="mb-24">
          <h3 className="text-3xl font-bold text-foreground text-center mb-12">Our Timeline</h3>
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-4 md:left-1/2 md:-translate-x-0.5 top-0 bottom-0 w-0.5 bg-gradient-to-b from-rose-300 to-pink-300"></div>
            
            <div className="space-y-12">
              {timelineEvents?.map((item, index) => {
                const Icon =  Lightbulb;
                const isEven = index % 2 === 0;
                
                return (
                  <div key={index} className={`relative flex items-center ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
                    {/* Timeline dot */}
                    <div className="absolute left-2 md:left-1/2 md:-translate-x-1/2 w-4 h-4 bg-rose-500 rounded-full border-4 border-background shadow-lg z-10"></div>
                    
                    {/* Content */}
                    <div className={`ml-12 md:ml-0 w-full md:w-5/12 ${isEven ? 'md:pr-8' : 'md:pl-8'}`}>
                      <Card className="border-2 border-border/10 hover:border-rose-300 hover:shadow-lg transition-all duration-300">
                        <CardHeader className="pb-4">
                          <div className="flex items-center gap-3 mb-2">
                            <div className="p-2 rounded-full bg-rose-100 dark:bg-rose-900/30">
                              <Icon className="w-5 h-5 text-rose-600" />
                            </div>
                            <Badge variant="secondary" className="text-xs">
                              {item.year}
                            </Badge>
                          </div>
                          <CardTitle className="text-xl">{item.title}</CardTitle>
                        
                        </CardHeader>
                        <CardContent>
                          <p className="text-sm text-muted-foreground leading-relaxed">
                            {item.description}
                          </p>
                        </CardContent>
                      </Card>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Core Values */}
        <div className="mb-24">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-foreground mb-4">Our Core Values</h3>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              These values aren't just words on a wall—they're the principles that guide our decisions, 
              shape our character, and define who we are as a community.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <Card key={index} className="border-2 border-border/10 hover:border-primary/30 hover:shadow-lg transition-all duration-300 group text-center">
                  <CardHeader className="pb-4">
                    <div className="inline-flex p-4 rounded-full bg-muted/50 mb-4 group-hover:scale-110 transition-transform">
                      <Icon className={`w-8 h-8 ${value.color}`} />
                    </div>
                    <CardTitle className="text-lg">{value.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {value.description}
                    </p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>



        {/* What Makes Us Different */}
        <div className="mb-24">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-foreground mb-4">What Makes Us Different</h3>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              While we share the same core beliefs as Christians everywhere, our approach to community and ministry 
              has some distinctive characteristics.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="border-2 border-blue-100 dark:border-blue-900/50">
              <CardContent className="p-8 text-center">
                <Users className="w-12 h-12 text-blue-500 mx-auto mb-4" />
                <h4 className="text-xl font-semibold text-foreground mb-3">Family Atmosphere</h4>
                <p className="text-muted-foreground">
                  We prioritize building genuine relationships over just attending services. 
                  Everyone is family here.
                </p>
              </CardContent>
            </Card>

            <Card className="border-2 border-green-100 dark:border-green-900/50">
              <CardContent className="p-8 text-center">
                <Quote className="w-12 h-12 text-green-500 mx-auto mb-4" />
                <h4 className="text-xl font-semibold text-foreground mb-3">Practical Teaching</h4>
                <p className="text-muted-foreground">
                  Our messages are grounded in Scripture but applied to real-life situations 
                  you face every day.
                </p>
              </CardContent>
            </Card>

            <Card className="border-2 border-purple-100 dark:border-purple-900/50">
              <CardContent className="p-8 text-center">
                <Globe className="w-12 h-12 text-purple-500 mx-auto mb-4" />
                <h4 className="text-xl font-semibold text-foreground mb-3">Global Impact</h4>
                <p className="text-muted-foreground">
                  We think beyond our walls, actively supporting missions and 
                  community outreach worldwide.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center bg-gradient-to-r from-pink-50 to-red-50 dark:from-pink-950/20 dark:to-red-950/20 rounded-2xl p-8 md:p-12">
          <h3 className="text-3xl font-bold text-foreground mb-4">
            Ready to Be Part of Our Story?
          </h3>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Your story can become part of ours. Whether you're exploring faith for the first time 
            or looking for a church home, we'd love to welcome you into our community.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact">
              <Button 
                size="lg"
                className="bg-rose-600 hover:bg-rose-700 text-white"
              >
                <Calendar className="w-5 h-5 mr-2" />
                Plan Your Visit
              </Button>
            </Link>
            <Link href="/get-involved">
              <Button 
                size="lg" 
                variant="outline"
                className="border-rose-200 text-foreground hover:bg-rose-50 dark:border-rose-800 dark:hover:bg-rose-950"
              >
                Get Involved
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}