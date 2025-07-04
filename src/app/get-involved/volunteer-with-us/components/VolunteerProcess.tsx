'use client';

import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  UserPlus, 
  MessageSquare, 
  CheckCircle, 
  Heart,
  ArrowRight,
  Clock,
  Users
} from 'lucide-react';
import type { VolunteerProcess } from '@/types';
import { Card } from '@/components/ui/card';

interface VolunteerProcessProps {
  title?: string;
  subtitle?: string;
  processes?: VolunteerProcess[];
}

const defaultProcesses: VolunteerProcess[] = [
  {
    step: 1,
    title: "Express Interest",
    description: "Fill out our simple volunteer interest form or contact us directly to let us know you'd like to get involved.",
    icon: <UserPlus className="w-8 h-8" />,
    details: [
      "Complete online interest form",
      "Tell us about your skills and interests",
      "Indicate your availability preferences"
    ],
    estimatedTime: "5 minutes"
  },
  {
    step: 2,
    title: "Connect & Discuss",
    description: "Meet with our volunteer coordinator to discuss opportunities that match your interests, skills, and schedule.",
    icon: <MessageSquare className="w-8 h-8" />,
    details: [
      "Schedule a casual conversation",
      "Explore volunteer opportunities",
      "Ask questions about our community",
      "Learn about training and support"
    ],
    estimatedTime: "30 minutes"
  },
  {
    step: 3,
    title: "Complete Onboarding",
    description: "Complete any necessary background checks and attend orientation to learn about our mission and procedures.",
    icon: <CheckCircle className="w-8 h-8" />,
    details: [
      "Background check (if required)",
      "Attend volunteer orientation",
      "Review safety and child protection policies",
      "Receive volunteer handbook"
    ],
    estimatedTime: "1-2 hours"
  },
  {
    step: 4,
    title: "Start Making Impact",
    description: "Begin your volunteer journey with ongoing support from our team and connect with other volunteers.",
    icon: <Heart className="w-8 h-8" />,
    details: [
      "Start your volunteer role",
      "Receive mentor support",
      "Join volunteer community",
      "Participate in appreciation events"
    ],
    estimatedTime: "Ongoing"
  }
];

export default function VolunteerProcess({
  title = "How to Get Started",
  subtitle = "Your journey to making a difference starts with just four simple steps",
  processes = defaultProcesses
}: VolunteerProcessProps) {
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

        {/* Process Steps */}
        <div className="relative max-w-4xl mx-auto">
          {/* Connection Line */}
          <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-tertiary/30 via-tertiary/50 to-tertiary/30 transform -translate-x-1/2 hidden lg:block" />

          {processes.map((process, index) => (
            <div key={process.step} className="relative mb-16 last:mb-0">
              {/* Step Indicator */}
              <div className="absolute left-1/2 transform -translate-x-1/2 -translate-y-1/2 top-8 lg:top-16 z-10 hidden lg:block">
                <div className="w-16 h-16 bg-tertiary rounded-full flex items-center justify-center shadow-lg">
                  <span className="text-tertiary-foreground font-bold text-xl">{process.step}</span>
                </div>
              </div>

              {/* Content */}
              <div className={`grid grid-cols-1 lg:grid-cols-2 gap-8 items-center ${
                index % 2 === 0 ? '' : 'lg:flex-row-reverse'
              }`}>
                {/* Left Side (or Right for odd items) */}
                <div className={`${index % 2 === 0 ? 'lg:pr-16' : 'lg:pl-16 lg:order-2'}`}>
                  <Card className="border border-border/10 bg-card p-8 transition-all duration-300 hover:border-tertiary/40 hover:shadow-lg rounded-xl">
                    <div className="flex items-center mb-4 lg:hidden">
                      <div className="w-12 h-12 bg-tertiary rounded-full flex items-center justify-center mr-4">
                        <span className="text-tertiary-foreground font-bold">{process.step}</span>
                      </div>
                      <Badge variant="outline" className="text-xs border-border/20">
                        <Clock className="w-3 h-3 mr-1" />
                        {process.estimatedTime}
                      </Badge>
                    </div>
                    
                    <h3 className="text-2xl font-bold text-foreground mb-4">
                      {process.title}
                    </h3>
                    
                    <p className="text-muted-foreground text-lg leading-relaxed mb-6">
                      {process.description}
                    </p>

                    {process.details && (
                      <ul className="space-y-2 mb-6">
                        {process.details.map((detail, detailIndex) => (
                          <li key={detailIndex} className="flex items-start text-sm text-muted-foreground">
                            <CheckCircle className="w-4 h-4 text-tertiary mr-2 mt-0.5 flex-shrink-0" />
                            {detail}
                          </li>
                        ))}
                      </ul>
                    )}

                    <Badge variant="outline" className="text-xs hidden lg:inline-flex border-border/20">
                      <Clock className="w-3 h-3 mr-1" />
                      {process.estimatedTime}
                    </Badge>
                  </Card>
                </div>

                {/* Right Side (or Left for odd items) */}
                <div className={`flex justify-center ${index % 2 === 0 ? 'lg:pl-16' : 'lg:pr-16 lg:order-1'}`}>
                  <div className="w-32 h-32 bg-tertiary/10 rounded-full flex items-center justify-center shadow-lg">
                    <div className="text-tertiary">
                      {process.icon}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16 p-8 bg-tertiary rounded-xl text-tertiary-foreground">
          <h3 className="text-3xl font-bold mb-4">
            Ready to Take the First Step?
          </h3>
          <p className="text-xl mb-8 text-tertiary-foreground/90 max-w-2xl mx-auto">
            Join our community of volunteers and start making a meaningful difference today. 
            We're here to support you every step of the way.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              className="bg-background text-foreground hover:bg-background/90 px-8 py-4 text-lg font-semibold"
            >
              Express Interest Now
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
            <Button 
              size="lg" 
              variant="outline"
              className="border-2 border-tertiary-foreground/30 text-tertiary-foreground hover:bg-tertiary-foreground/10 px-8 py-4 text-lg font-semibold"
            >
              Contact Us First
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
} 