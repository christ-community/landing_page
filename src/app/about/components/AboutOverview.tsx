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

const values = [
  {
    icon: Heart,
    title: "Love & Compassion",
    description: "We believe in showing Christ's love through our actions and serving others with genuine compassion.",
    color: "text-red-500"
  },
  {
    icon: Users,
    title: "Community",
    description: "Building authentic relationships and supporting one another on our spiritual journeys.",
    color: "text-blue-500"
  },
  {
    icon: Globe,
    title: "Global Impact",
    description: "Reaching beyond our local community to share hope and resources worldwide.",
    color: "text-green-500"
  },
  {
    icon: BookOpen,
    title: "Biblical Truth",
    description: "Grounding everything we do in the unchanging truth of God's Word.",
    color: "text-purple-500"
  }
];

const stats = [
  {
    number: "15+",
    label: "Years of Ministry",
    description: "Serving our community"
  },
  {
    number: "500+",
    label: "Community Members",
    description: "Growing together in faith"
  },
  {
    number: "25+",
    label: "Ministries",
    description: "Ways to get involved"
  },
  {
    number: "12",
    label: "Countries Reached",
    description: "Through missions work"
  }
];

export default function AboutOverview() {
  return (
    <section className="py-24 bg-background" data-section="about-overview">
      <div className="container mx-auto px-6 lg:px-12">
        {/* Introduction */}
        <div className="max-w-4xl mx-auto text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            Our Story & Mission
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Christ Community began with a simple vision: to create a place where people could encounter 
            God's love, grow in their faith, and make a meaningful difference in the world. Today, we're 
            a thriving community of believers committed to living out the Gospel in practical, life-changing ways.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20">
          {stats.map((stat, index) => (
            <Card key={index} className="text-center border-2 border-border/10 hover:border-primary/30 transition-all duration-300">
              <CardContent className="p-6">
                <div className="text-3xl md:text-4xl font-bold text-primary mb-2">{stat.number}</div>
                <div className="text-lg font-semibold text-foreground mb-1">{stat.label}</div>
                <div className="text-sm text-muted-foreground">{stat.description}</div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Core Values */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-foreground mb-4">Our Core Values</h3>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              These values guide everything we do and shape who we are as a community.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <Card key={index} className="border-2 border-border/10 hover:border-primary/30 hover:shadow-lg transition-all duration-300 group">
                  <CardHeader className="text-center pb-4">
                    <div className={`inline-flex p-4 rounded-full bg-muted/50 mb-4 group-hover:scale-110 transition-transform`}>
                      <Icon className={`w-8 h-8 ${value.color}`} />
                    </div>
                    <CardTitle className="text-xl font-semibold">{value.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground text-center leading-relaxed">
                      {value.description}
                    </p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>

        {/* What Makes Us Different */}
        <div className="bg-gradient-to-r from-purple-50 to-indigo-50 dark:from-purple-950/20 dark:to-indigo-950/20 rounded-2xl p-8 md:p-12 mb-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-3xl font-bold text-foreground mb-6">What Makes Us Different</h3>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <Star className="w-5 h-5 text-yellow-500 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-foreground mb-1">Authentic Community</h4>
                    <p className="text-sm text-muted-foreground">Real relationships, genuine care, and transparent leadership.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Star className="w-5 h-5 text-yellow-500 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-foreground mb-1">Practical Faith</h4>
                    <p className="text-sm text-muted-foreground">We believe faith should impact every area of life in meaningful ways.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Star className="w-5 h-5 text-yellow-500 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-foreground mb-1">Inclusive Welcome</h4>
                    <p className="text-sm text-muted-foreground">Everyone is welcome, regardless of background or where they are in their journey.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Star className="w-5 h-5 text-yellow-500 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-foreground mb-1">Global Vision</h4>
                    <p className="text-sm text-muted-foreground">Local roots with a heart for worldwide impact and missions.</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="space-y-6">
              <Card className="border-2 border-primary/20">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <Calendar className="w-5 h-5 text-primary" />
                    <h4 className="font-semibold text-foreground">Join Us This Sunday</h4>
                  </div>
                  <p className="text-sm text-muted-foreground mb-4">
                    Experience our community firsthand. Services at 9:00 AM & 11:00 AM.
                  </p>
                  <Link href="/contact">
                    <Button className="w-full bg-primary hover:bg-primary/90">
                      Plan Your Visit
                    </Button>
                  </Link>
                </CardContent>
              </Card>

              <Card className="border-2 border-tertiary/20">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <Handshake className="w-5 h-5 text-tertiary" />
                    <h4 className="font-semibold text-foreground">Get Involved</h4>
                  </div>
                  <p className="text-sm text-muted-foreground mb-4">
                    Discover ways to connect, serve, and grow in your faith journey.
                  </p>
                  <Link href="/get-involved">
                    <Button variant="outline" className="w-full border-tertiary text-tertiary hover:bg-tertiary/10">
                      Explore Opportunities
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>

        {/* Navigation to other pages */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Link href="/about/who-we-are" className="group">
            <Card className="border-2 border-border/10 hover:border-purple-300 hover:shadow-lg transition-all duration-300 h-full">
              <CardContent className="p-8 text-center">
                <div className="inline-flex p-4 rounded-full bg-purple-100 dark:bg-purple-900/30 text-purple-600 mb-4 group-hover:scale-110 transition-transform">
                  <Heart className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-bold text-foreground mb-3">Who We Are</h3>
                <p className="text-muted-foreground mb-4">
                  Learn more about our history, beliefs, and the vision that drives our community forward.
                </p>
                <div className="flex items-center justify-center text-purple-600 group-hover:translate-x-2 transition-transform">
                  <span className="font-medium">Learn More</span>
                  <ArrowRight className="w-4 h-4 ml-2" />
                </div>
              </CardContent>
            </Card>
          </Link>

          <Link href="/about/meet-the-team" className="group">
            <Card className="border-2 border-border/10 hover:border-indigo-300 hover:shadow-lg transition-all duration-300 h-full">
              <CardContent className="p-8 text-center">
                <div className="inline-flex p-4 rounded-full bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 mb-4 group-hover:scale-110 transition-transform">
                  <Users className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-bold text-foreground mb-3">Meet the Team</h3>
                <p className="text-muted-foreground mb-4">
                  Get to know our pastoral staff and leadership team who guide and serve our community.
                </p>
                <div className="flex items-center justify-center text-indigo-600 group-hover:translate-x-2 transition-transform">
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