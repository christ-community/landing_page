'use client';

import { Card, CardContent } from '@/components/ui/card';
import { BookOpen, Truck, Heart, Globe, Clock, Shield } from 'lucide-react';

export default function FreeBibleInfo() {
  const features = [
    {
      icon: <BookOpen className="w-6 h-6 text-foreground" />,
      title: "Multiple Translations",
      description: "Choose from popular Bible translations including NIV, ESV, and NLT to find the version that speaks to you."
    },
    {
      icon: <Truck className="w-6 h-6 text-foreground" />,
      title: "Free Shipping",
      description: "We cover all shipping costs to get your Bible to you quickly and safely, anywhere in the country."
    },
    {
      icon: <Heart className="w-6 h-6 text-foreground" />,
      title: "No Strings Attached",
      description: "This is our gift to you with no expectations. We simply want to help you access God's Word."
    },
    {
      icon: <Globe className="w-6 h-6 text-foreground" />,
      title: "Worldwide Reach",
      description: "We serve communities across the globe, sharing the love of Christ through His Word."
    },
    {
      icon: <Clock className="w-6 h-6 text-foreground" />,
      title: "Quick Processing",
      description: "Most Bible requests are processed and shipped within 2-3 business days of receiving your request."
    },
    {
      icon: <Shield className="w-6 h-6 text-foreground" />,
      title: "Privacy Protected",
      description: "Your personal information is kept secure and will never be shared with third parties."
    }
  ];

  return (
    <section className="section bg-muted/20">
      <div className="section-inner">
        <div className="text-center stack-lg mb-12">
          <div className="stack">
            <p className="eyebrow">Why It Matters</p>
            <h2 className="section-title">Why Request Your Free Bible?</h2>
          </div>
          <p className="section-lead max-w-3xl mx-auto">
            We believe everyone should have access to God's Word. Our free Bible program is designed
            to remove barriers and help you begin or continue your spiritual journey.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {features.map((feature, index) => (
            <Card key={index} className="bg-card border border-border/40 rounded-[var(--radius)] shadow-sm">
              <CardContent className="p-6 text-center">
                <div className="mb-6 flex justify-center">
                  {feature.icon}
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-3">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground">
                  {feature.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="bg-muted/30 rounded-[var(--radius)] p-8 text-center">
          <h3 className="text-2xl font-semibold text-foreground mb-4">
            Start Your Journey Today
          </h3>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            Join thousands of others who have discovered hope, purpose, and peace through God's Word.
            Your free Bible is just one click away.
          </p>
          <div className="flex flex-wrap justify-center gap-6 text-sm text-muted-foreground">
            <div className="flex items-center">
              <div className="w-2 h-2 bg-primary rounded-full mr-2"></div>
              100% Free
            </div>
            <div className="flex items-center">
              <div className="w-2 h-2 bg-primary rounded-full mr-2"></div>
              No Hidden Costs
            </div>
            <div className="flex items-center">
              <div className="w-2 h-2 bg-primary rounded-full mr-2"></div>
              Secure & Private
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
