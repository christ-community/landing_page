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
    icon: Users
  },
  {
    title: "Biblical Truth",
    description: "God's Word is our foundation. We are committed to teaching and living by biblical principles.",
    icon: Quote
  },
  {
    title: "Compassionate Service",
    description: "We serve others with the same love and compassion that Christ has shown us.",
    icon: Heart
  },
  {
    title: "Global Vision",
    description: "Our heart extends beyond our local community to reach people around the world with the Gospel.",
    icon: Globe
  }
];



interface OurStoryProps {
  timelineEvents?: ITimelineEvent[];
  communityStats?: ICommunityStat[];
}

export default function OurStory({ timelineEvents, communityStats }: OurStoryProps) {
  return (
    <section className="section">
      <div className="section-inner">
        {/* Introduction */}
        <div className="text-center stack-lg mb-12">
          <div className="stack">
            <p className="eyebrow">Our Journey</p>
            <h2 className="section-title">Our Journey Together</h2>
          </div>
          <p className="section-lead max-w-3xl mx-auto">
            Every great story has humble beginnings. Ours started with a small group of believers who shared 
            a common dream: to create a community where faith flourishes, relationships thrive, and lives are transformed.
          </p>
        </div>

        {/* Timeline */}
        <div className="mb-16">
          <h3 className="text-2xl font-semibold text-foreground text-center mb-8">Our Timeline</h3>
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-4 md:left-1/2 md:-translate-x-0.5 top-0 bottom-0 w-0.5 bg-border"></div>
            
            <div className="space-y-12">
              {timelineEvents?.map((item, index) => {
                const Icon =  Lightbulb;
                const isEven = index % 2 === 0;
                
                return (
                  <div key={index} className={`relative flex items-center ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
                    {/* Timeline dot */}
                    <div className="absolute left-2 md:left-1/2 md:-translate-x-1/2 w-3 h-3 bg-primary rounded-full border-4 border-background shadow-sm z-10"></div>
                    
                    {/* Content */}
                    <div className={`ml-12 md:ml-0 w-full md:w-5/12 ${isEven ? 'md:pr-8' : 'md:pl-8'}`}>
                      <Card className="border border-border/40 transition-all duration-300 hover:shadow-md">
                        <CardHeader className="pb-4">
                          <div className="flex items-center gap-3 mb-2">
                            <div className="p-2 rounded-[var(--radius)] bg-muted">
                              <Icon className="w-5 h-5 text-foreground" />
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
        <div className="mb-16">
          <div className="text-center stack-lg mb-8">
            <div className="stack">
              <p className="eyebrow">Values</p>
              <h3 className="text-2xl font-semibold text-foreground">Our Core Values</h3>
            </div>
            <p className="section-lead max-w-2xl mx-auto">
              These values aren't just words on a wall—they're the principles that guide our decisions, 
              shape our character, and define who we are as a community.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <Card key={index} className="border border-border/40 transition-all duration-300 hover:shadow-md group text-center">
                  <CardHeader className="pb-4">
                    <div className="inline-flex p-3 rounded-[var(--radius)] bg-muted mb-4">
                      <Icon className="w-6 h-6 text-foreground" />
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
        <div className="mb-16">
          <div className="text-center stack-lg mb-8">
            <div className="stack">
              <p className="eyebrow">Distinctives</p>
              <h3 className="text-2xl font-semibold text-foreground">What Makes Us Different</h3>
            </div>
            <p className="section-lead max-w-2xl mx-auto">
              While we share the same core beliefs as Christians everywhere, our approach to community and ministry 
              has some distinctive characteristics.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="border border-border/40">
              <CardContent className="p-6 text-center">
                <Users className="w-10 h-10 text-primary mx-auto mb-4" />
                <h4 className="text-lg font-semibold text-foreground mb-3">Family Atmosphere</h4>
                <p className="text-muted-foreground">
                  We prioritize building genuine relationships over just attending services.
                </p>
              </CardContent>
            </Card>

            <Card className="border border-border/40">
              <CardContent className="p-6 text-center">
                <Quote className="w-10 h-10 text-primary mx-auto mb-4" />
                <h4 className="text-lg font-semibold text-foreground mb-3">Practical Teaching</h4>
                <p className="text-muted-foreground">
                  Our messages are grounded in Scripture and applied to real life.
                </p>
              </CardContent>
            </Card>

            <Card className="border border-border/40">
              <CardContent className="p-6 text-center">
                <Globe className="w-10 h-10 text-primary mx-auto mb-4" />
                <h4 className="text-lg font-semibold text-foreground mb-3">Global Impact</h4>
                <p className="text-muted-foreground">
                  We think beyond our walls, supporting missions and outreach worldwide.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="text-center bg-muted/30 rounded-[var(--radius)] p-8 md:p-12">
          <h3 className="text-2xl font-semibold text-foreground mb-4">
            Ready to Be Part of Our Story?
          </h3>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            Your story can become part of ours. Whether you're exploring faith for the first time
            or looking for a church home, we'd love to welcome you into our community.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact">
              <Button size="lg">
                <Calendar className="w-5 h-5 mr-2" />
                Plan Your Visit
              </Button>
            </Link>
            <Link href="/get-involved">
              <Button size="lg" variant="outline">
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
