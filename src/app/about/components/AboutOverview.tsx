'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  Heart,
  Users,
  Globe,
  BookOpen,
  Handshake,
  Calendar,
  ArrowRight,
  Star
} from 'lucide-react';
import Link from 'next/link';
import type { ICoreValue, IDifferentiator, IMissionVision } from '../../../../types/contentful';

interface AboutOverviewProps {
  coreValues: ICoreValue[]
  differentiators: IDifferentiator[]
  missionVision: IMissionVision[]
}

// Icon mapping utility
const getIconComponent = (iconName?: string) => {
  switch (iconName) {
    case 'heart': return Heart;
    case 'book-open': return BookOpen;
    case 'users': return Users;
    case 'hand-heart': return Handshake;
    case 'shield-check': return Star;
    case 'globe': return Globe;
    case 'lightbulb': return Star;
    case 'calendar': return Calendar;
    case 'clock': return Calendar;
    case 'home': return Heart;
    default: return Heart;
  }
};

export default function AboutOverview({ coreValues, differentiators, missionVision }: AboutOverviewProps) {
  // Get mission for the intro text
  const mission = missionVision.find(item => item.type === 'mission')
  return (
    <section className="section" data-section="about-overview">
      <div className="section-inner">
        {/* Introduction */}
        <div className="max-w-4xl mx-auto text-center stack-lg mb-12">
          <div className="stack">
            <p className="eyebrow">Our Story</p>
            <h2 className="section-title">Our Story & Mission</h2>
          </div>
          <p className="section-lead">
            {mission?.content || "Christ Community began with a simple vision: to create a place where people could encounter God's love, grow in their faith, and make a meaningful difference in the world. Today, we're a thriving community of believers committed to living out the Gospel in practical, life-changing ways."}
          </p>
        </div>



        {/* Core Values */}
        <div className="mb-12">
          <div className="text-center stack-lg mb-12">
            <div className="stack">
              <p className="eyebrow">Values</p>
              <h3 className="text-2xl font-semibold text-foreground">Our Core Values</h3>
            </div>
            <p className="section-lead max-w-2xl mx-auto">
              These values guide everything we do and shape who we are as a community.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {coreValues.map((value, index) => {
              const Icon = getIconComponent(value.icon);
              return (
                <Card key={index} className="border border-border/40 transition-all duration-300 hover:shadow-md">
                  <CardHeader className="text-center pb-4">
                    <div className="inline-flex p-3 rounded-[var(--radius)] bg-muted mb-4">
                      <Icon className="w-6 h-6 text-foreground" />
                    </div>
                    <CardTitle className="text-xl font-semibold">{value.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground text-center leading-relaxed">
                      {value.description}
                    </p>
                    {value.scriptureReference && (
                      <p className="text-xs text-muted-foreground text-center mt-2 font-medium">
                        {value.scriptureReference}
                      </p>
                    )}
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>

        {/* What Makes Us Different */}
        <div className="bg-muted/30 rounded-[var(--radius)] p-8 md:p-12 mb-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <div>
              <h3 className="text-2xl font-semibold text-foreground mb-6">What Makes Us Different</h3>
              <div className="space-y-4">
                {differentiators.map((diff, index) => {
                  const Icon = getIconComponent(diff.icon);
                  
                  return (
                    <div key={index} className="flex items-start gap-3">
                      <Icon className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                      <div>
                        <h4 className="font-semibold text-foreground mb-1">{diff.title}</h4>
                        <p className="text-sm text-muted-foreground">{diff.description}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
            
            <div className="space-y-6">
              <Card className="border border-border/40">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <Calendar className="w-5 h-5 text-primary" />
                    <h4 className="font-semibold text-foreground">Book a Visit</h4>
                  </div>
                  <p className="text-sm text-muted-foreground mb-4">
                    Experience our community firsthand.
                  </p>
                   <Link href="https://calendly.com/christcommunityglobal/30min" target="_blank" rel="noopener noreferrer">
                     <Button className="w-full">
                        Book a Visit
                      </Button>
                    </Link>
                </CardContent>
              </Card>

              <Card className="border border-border/40">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <Handshake className="w-5 h-5 text-primary" />
                    <h4 className="font-semibold text-foreground">Get Involved</h4>
                  </div>
                  <p className="text-sm text-muted-foreground mb-4">
                    Discover ways to connect, serve, and grow in your faith journey.
                  </p>
                  <Link href="/get-involved">
                    <Button variant="outline" className="w-full">
                      Explore Opportunities
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>

        {/* Navigation to other pages */}
        <div className="grid grid-cols-1 gap-6">
          <Link href="/about/meet-the-team" className="group">
            <Card className="border border-border/40 transition-all duration-300 hover:shadow-md">
              <CardContent className="p-6 text-center">
                <div className="inline-flex p-3 rounded-[var(--radius)] bg-muted text-foreground mb-4">
                  <Users className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-3">Meet the Team</h3>
                <p className="text-muted-foreground mb-4">
                  Get to know our leadership team who guide and serve our community.
                </p>
                <div className="flex items-center justify-center text-foreground transition-transform group-hover:translate-x-1">
                  <span className="font-medium">Meet Our Team</span>
                  <ArrowRight className="w-4 h-4 ml-2" />
                </div>
              </CardContent>
            </Card>
          </Link>
        </div>
      </div>
    </section>
  );
}
