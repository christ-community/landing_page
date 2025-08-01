'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Clock, 
  Send, 
  MessageCircle,
  Calendar,
  Users
} from 'lucide-react';

interface ContactInfoProps {
  config?: {
    title?: string;
    subtitle?: string;
  };
}

const defaultConfig = {
  title: "Get in Touch",
  subtitle: "We're here to connect, serve, and walk alongside you in your journey of faith."
};

const contactMethods = [
  {
    icon: Mail,
    title: "Email Us",
    description: "Send us a message anytime",
    contact: "hello@christcommunity.org",
    action: "mailto:hello@christcommunity.org",
    actionText: "Send Email",
    color: "blue"
  },
  {
    icon: Phone,
    title: "Call Us",
    description: "Speak with our team directly",
    contact: "+1 (555) 123-4567",
    action: "tel:+15551234567",
    actionText: "Call Now",
    color: "green"
  },
  {
    icon: MapPin,
    title: "Visit Us",
    description: "Join us for Sunday service",
    contact: "123 Faith Street, Hope City, HC 12345",
    action: "https://maps.google.com/?q=123+Faith+Street+Hope+City",
    actionText: "Get Directions",
    color: "purple"
  },
  {
    icon: MessageCircle,
    title: "Live Chat",
    description: "Chat with our team online",
    contact: "Available Monday - Friday",
    action: "#",
    actionText: "Start Chat",
    color: "orange"
  }
];

const serviceInfo = [
  {
    icon: Calendar,
    title: "Sunday Services",
    time: "9:00 AM & 11:00 AM",
    description: "Join us for worship and fellowship"
  },
  {
    icon: Users,
    title: "Small Groups",
    time: "Wednesdays 7:00 PM",
    description: "Connect in smaller community groups"
  },
  {
    icon: Clock,
    title: "Office Hours",
    time: "Mon-Fri: 9:00 AM - 5:00 PM",
    description: "Drop by or schedule an appointment"
  }
];

export default function ContactInfo({ config }: ContactInfoProps) {
  const infoConfig = { ...defaultConfig, ...config };

  const getColorClasses = (color: string) => {
    const colorMap = {
      blue: {
        bg: "bg-blue-500",
        hoverBg: "hover:bg-blue-600",
        border: "border-blue-100 dark:border-blue-900/50"
      },
      green: {
        bg: "bg-green-500",
        hoverBg: "hover:bg-green-600",
        border: "border-green-100 dark:border-green-900/50"
      },
      purple: {
        bg: "bg-purple-500",
        hoverBg: "hover:bg-purple-600",
        border: "border-purple-100 dark:border-purple-900/50"
      },
      orange: {
        bg: "bg-orange-500",
        hoverBg: "hover:bg-orange-600",
        border: "border-orange-100 dark:border-orange-900/50"
      }
    };
    return colorMap[color as keyof typeof colorMap] || colorMap.blue;
  };

  return (
    <section className="py-24 bg-muted/30">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            {infoConfig.title}
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {infoConfig.subtitle}
          </p>
        </div>

        {/* Contact Methods */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {contactMethods.map((method, index) => {
            const colors = getColorClasses(method.color);
            const Icon = method.icon;
            
            return (
              <Card key={index} className={`border-2 ${colors.border} hover:shadow-lg transition-all duration-300`}>
                <CardHeader className="text-center pb-4">
                  <div className={`inline-flex p-3 rounded-full ${colors.bg} text-white mb-3`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <CardTitle className="text-xl font-semibold">{method.title}</CardTitle>
                  <p className="text-sm text-muted-foreground">{method.description}</p>
                </CardHeader>
                <CardContent className="text-center">
                  <p className="font-medium text-foreground mb-4">{method.contact}</p>
                  <Button 
                    size="sm"
                    className={`${colors.bg} ${colors.hoverBg} text-white`}
                    onClick={() => {
                      if (method.action.startsWith('http') || method.action.startsWith('mailto:') || method.action.startsWith('tel:')) {
                        window.open(method.action, '_blank');
                      }
                    }}
                  >
                    <Send className="w-4 h-4 mr-2" />
                    {method.actionText}
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Service Times & Info */}
        <div className="max-w-4xl mx-auto">
          <h3 className="text-2xl font-bold text-foreground text-center mb-8">
            When to Find Us
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {serviceInfo.map((info, index) => {
              const Icon = info.icon;
              return (
                <Card key={index} className="text-center border-2 border-border/10 hover:border-primary/30 transition-all duration-300">
                  <CardContent className="p-6">
                    <div className="inline-flex p-3 rounded-full bg-primary/10 text-primary mb-4">
                      <Icon className="w-6 h-6" />
                    </div>
                    <h4 className="text-lg font-semibold text-foreground mb-2">{info.title}</h4>
                    <p className="text-xl font-bold text-primary mb-2">{info.time}</p>
                    <p className="text-sm text-muted-foreground">{info.description}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Emergency Contact */}
        <div className="mt-12 text-center">
          <Card className="max-w-2xl mx-auto bg-gradient-to-r from-red-50 to-rose-50 dark:from-red-950/20 dark:to-rose-950/20 border-2 border-red-100 dark:border-red-900/50">
            <CardContent className="p-6">
              <h4 className="text-lg font-semibold text-foreground mb-2">Need Urgent Prayer or Support?</h4>
              <p className="text-muted-foreground mb-4">
                For urgent prayer requests or pastoral care, please call our emergency line.
              </p>
              <Button 
                className="bg-red-600 hover:bg-red-700 text-white"
                onClick={() => window.open('tel:+15551234567', '_blank')}
              >
                <Phone className="w-4 h-4 mr-2" />
                Emergency Prayer Line
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}