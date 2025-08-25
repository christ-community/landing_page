'use client';

import { Card, CardContent } from '@/components/ui/card';
import { BookOpen, Truck, Heart, Globe, Clock, Shield } from 'lucide-react';

export default function FreeBibleInfo() {
  const features = [
    {
      icon: <BookOpen className="w-8 h-8 text-blue-500" />,
      title: "Multiple Translations",
      description: "Choose from popular Bible translations including NIV, ESV, and NLT to find the version that speaks to you."
    },
    {
      icon: <Truck className="w-8 h-8 text-green-500" />,
      title: "Free Shipping",
      description: "We cover all shipping costs to get your Bible to you quickly and safely, anywhere in the country."
    },
    {
      icon: <Heart className="w-8 h-8 text-red-500" />,
      title: "No Strings Attached",
      description: "This is our gift to you with no expectations. We simply want to help you access God's Word."
    },
    {
      icon: <Globe className="w-8 h-8 text-purple-500" />,
      title: "Worldwide Reach",
      description: "We serve communities across the globe, sharing the love of Christ through His Word."
    },
    {
      icon: <Clock className="w-8 h-8 text-orange-500" />,
      title: "Quick Processing",
      description: "Most Bible requests are processed and shipped within 2-3 business days of receiving your request."
    },
    {
      icon: <Shield className="w-8 h-8 text-indigo-500" />,
      title: "Privacy Protected",
      description: "Your personal information is kept secure and will never be shared with third parties."
    }
  ];

  return (
    <section className="py-24 bg-muted/40">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-foreground mb-6">
            Why Request Your Free Bible?
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            We believe everyone should have access to God's Word. Our free Bible program is designed 
            to remove barriers and help you begin or continue your spiritual journey.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {features.map((feature, index) => (
            <Card key={index} className="bg-card border border-border/10 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardContent className="p-8 text-center">
                <div className="mb-6 flex justify-center">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-4">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950/30 dark:to-indigo-950/30 rounded-3xl p-12 text-center">
          <h3 className="text-3xl font-bold text-foreground mb-4">
            Start Your Journey Today
          </h3>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Join thousands of others who have discovered hope, purpose, and peace through God's Word. 
            Your free Bible is just one click away.
          </p>
          <div className="flex flex-wrap justify-center gap-8 text-sm text-muted-foreground">
            <div className="flex items-center">
              <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
              100% Free
            </div>
            <div className="flex items-center">
              <div className="w-2 h-2 bg-blue-500 rounded-full mr-2"></div>
              No Hidden Costs
            </div>
            <div className="flex items-center">
              <div className="w-2 h-2 bg-purple-500 rounded-full mr-2"></div>
              Secure & Private
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}