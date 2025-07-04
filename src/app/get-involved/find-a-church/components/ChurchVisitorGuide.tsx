'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Clock, 
  Shirt, 
  MessageCircle, 
  Coffee, 
  Users, 
  Heart,
  ArrowRight,
  CheckCircle2
} from 'lucide-react';

interface GuideStepProps {
  step: number;
  icon: React.ElementType;
  title: string;
  description: string;
  bgColor: string;
  iconColor: string;
  textColor: string;
}

interface ChurchVisitorGuideProps {
  title?: string;
  subtitle?: string;
}

const guideSteps: Omit<GuideStepProps, 'step'>[] = [
  {
    icon: Clock,
    title: "Arrive Early",
    description: "Come 10-15 minutes before service starts to find parking and get settled.",
    bgColor: "bg-gradient-to-br from-blue-400 to-blue-600",
    iconColor: "text-white",
    textColor: "text-white"
  },
  {
    icon: Shirt,
    title: "Dress Comfortably", 
    description: "Casual to business casual is perfect. Just be yourself and feel comfortable.",
    bgColor: "bg-gradient-to-br from-green-400 to-green-600",
    iconColor: "text-white",
    textColor: "text-white"
  },
  {
    icon: Users,
    title: "Find the Welcome Team",
    description: "Look for friendly greeters who can answer questions and show you around.",
    bgColor: "bg-gradient-to-br from-purple-400 to-purple-600",
    iconColor: "text-white",
    textColor: "text-white"
  },
  {
    icon: MessageCircle,
    title: "No Pressure to Participate",
    description: "Observe and join in as much or as little as you feel comfortable with.",
    bgColor: "bg-gradient-to-br from-orange-400 to-orange-600",
    iconColor: "text-white",
    textColor: "text-white"
  },
  {
    icon: Coffee,
    title: "Stay for Fellowship",
    description: "Join coffee time after service - it's the best way to meet people and connect.",
    bgColor: "bg-gradient-to-br from-pink-400 to-pink-600",
    iconColor: "text-white",
    textColor: "text-white"
  },
  {
    icon: Heart,
    title: "Come with an Open Heart",
    description: "Give yourself time to see if the community feels like the right fit for you.",
    bgColor: "bg-gradient-to-br from-red-400 to-red-600",
    iconColor: "text-white",
    textColor: "text-white"
  }
];

const quickFacts = [
  "Services typically last 60-90 minutes",
  "Offering is completely voluntary for visitors",
  "Most churches offer children's programs",
  "You can leave quietly anytime if needed"
];

export default function ChurchVisitorGuide({
  title = "First Time Visiting a Church?",
  subtitle = "Here's your simple 6-step guide to feeling welcome and confident"
}: ChurchVisitorGuideProps) {
  return (
    <section className="py-24 bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 dark:from-slate-900 dark:via-blue-950 dark:to-purple-950">
      <div className="container mx-auto px-6 lg:px-12">
        {/* Header */}
        <div className="text-center mb-16">
          <Badge className="mb-4 bg-gradient-to-r from-blue-500 to-purple-500 text-white border-0 text-sm px-4 py-2">
            ✨ Visitor Guide
          </Badge>
          <h2 className="text-4xl lg:text-5xl font-bold text-foreground mb-6">
            {title}
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            {subtitle}
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {guideSteps.map((step, index) => (
            <div
              key={index}
              className={`${step.bgColor} rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 relative overflow-hidden`}
            >
              {/* Step Number */}
              <div className="absolute -top-2 -right-2 bg-white/20 backdrop-blur-sm w-12 h-12 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-lg">{index + 1}</span>
              </div>
              
              {/* Content */}
              <div className="space-y-4">
                <step.icon className={`w-10 h-10 ${step.iconColor} mb-4`} />
                <h3 className={`text-xl font-bold ${step.textColor}`}>
                  {step.title}
                </h3>
                <p className={`${step.textColor} opacity-90 leading-relaxed`}>
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Quick Facts Section */}
        <div className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-gray-200/50 dark:border-gray-700/50">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            {/* Quick Facts */}
            <div>
              <h3 className="text-2xl font-bold text-foreground mb-6 flex items-center">
                <CheckCircle2 className="w-6 h-6 text-green-500 mr-3" />
                Good to Know
              </h3>
              <div className="grid grid-cols-1 gap-3">
                {quickFacts.map((fact, index) => (
                  <div key={index} className="flex items-center space-x-3 p-3 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
                    <div className="w-2 h-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"></div>
                    <span className="text-muted-foreground">{fact}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Encouragement Card */}
            <div className="bg-gradient-to-br from-green-100 to-blue-100 dark:from-green-900/30 dark:to-blue-900/30 rounded-2xl p-8 text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-green-400 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="w-8 h-8 text-white" />
              </div>
              <h4 className="text-xl font-bold text-foreground mb-3">You Belong Here</h4>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                Every church community started with someone walking through the doors for the first time. Your presence is a gift.
              </p>
              <Button className="bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white border-0">
                Find Your Church
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-12">
          <p className="text-lg text-muted-foreground mb-6">
            Still have questions? Most churches are happy to help before your visit.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              variant="outline" 
              size="lg"
              className="border-2 border-blue-500 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-950"
            >
              Contact Churches Directly
            </Button>
            <Button 
              size="lg"
              className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white border-0"
            >
              Browse Church Directory
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
} 