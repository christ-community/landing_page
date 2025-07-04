'use client';

import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Package, ClipboardList, Truck, Smile } from 'lucide-react';
import type { HowItWorksStep } from '@/types';

const defaultSteps: HowItWorksStep[] = [
  { step: 1, title: "Browse & Select", description: "Explore our catalog and choose the tracts that best fit your needs.", icon: Package },
  { step: 2, title: "Place Your Order", description: "Fill out the simple order form with your details and desired quantity.", icon: ClipboardList },
  { step: 3, title: "Fast Shipping", description: "We process and ship your order quickly so you can start sharing.", icon: Truck },
  { step: 4, title: "Share with Confidence", description: "Receive your high-quality tracts and begin making an impact.", icon: Smile },
];

interface HowItWorksProps {
  title?: string;
  subtitle?: string;
  steps?: HowItWorksStep[];
}

export default function HowItWorks({
  title = "Ordering is Easy",
  subtitle = "Follow these simple steps to get your gospel tracts delivered to your door.",
  steps = defaultSteps
}: HowItWorksProps) {
  return (
    <section className="py-24 bg-muted/30">
      <div className="container mx-auto px-6 lg:px-12">
        {/* Header */}
        <div className="text-center mb-16">
          <Badge className="mb-4 bg-gradient-to-r from-sky-500 to-blue-500 text-white border-0 text-sm px-4 py-2">
            How It Works
          </Badge>
          <h2 className="text-4xl lg:text-5xl font-bold text-foreground">{title}</h2>
          <p className="text-xl text-muted-foreground mt-4 max-w-3xl mx-auto">{subtitle}</p>
        </div>

        {/* Steps Grid */}
        <div className="relative grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Connecting Line */}
          <div className="absolute top-1/2 -translate-y-1/2 left-0 right-0 h-1 hidden md:block">
            <svg width="100%" height="100%">
              <line x1="0" y1="50%" x2="100%" y2="50%" strokeWidth="2" strokeDasharray="8 8" className="stroke-border" />
            </svg>
          </div>

          {steps.map((step, index) => (
            <div key={index} className="relative z-10 text-center space-y-4">
              <div className="relative inline-flex">
                <div className="w-24 h-24 bg-background rounded-full flex items-center justify-center shadow-lg border-4 border-muted/30">
                  <div className="w-20 h-20 bg-gradient-to-br from-red-500 to-orange-500 rounded-full flex items-center justify-center text-white">
                    <step.icon className="w-10 h-10" />
                  </div>
                </div>
                <div className="absolute -top-2 -right-2 w-10 h-10 bg-teal-600 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-md border-2 border-background">
                  {step.step}
                </div>
              </div>
              <h3 className="text-xl font-bold text-foreground pt-2 group-hover:text-red-600 transition-colors">{step.title}</h3>
              <p className="text-muted-foreground">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
} 