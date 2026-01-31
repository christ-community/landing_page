'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  Send,
  Calendar,
  Users
} from 'lucide-react';
import type { IFAQ } from '../../../../types/contentful';

interface ContactInfoProps {
  config?: {
    title?: string;
    subtitle?: string;
  };
  faqs?: IFAQ[];
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
    contact: "info@christcommunityglobal.org",
    action: "mailto:info@christcommunityglobal.org",
    actionText: "Send Email"
  },
  {
    icon: Phone,
    title: "Call Us",
    description: "Speak with our team directly",
    contact: "07428784005",
    action: "tel:07428784005",
    actionText: "Call Now"
  },
  {
    icon: MapPin,
    title: "Book a Visit",
    description: "Schedule a visit with us",
    contact: "47B Westbury Street, Swansea SA1 4JW",
    action: "https://calendly.com/christcommunityglobal/30min",
    actionText: "Book a Visit"
  },

];

const serviceInfo = [
  {
    icon: Calendar,
    title: "Wednesday Intercessory Prayers",
    time: "9:00 PM",
    description: "Join us for prayer and intercession"
  },
  {
    icon: Users,
    title: "Friday Night Prayers",
    time: "9:00 PM",
    description: "Evening prayers and fellowship"
  },
  {
    icon: Clock,
    title: "Sunday Night Bible Study",
    time: "7:00 PM",
    description: "Study God's word together"
  }
];

export default function ContactInfo({ config, faqs }: ContactInfoProps) {
  const infoConfig = { ...defaultConfig, ...config };

  return (
    <section className="section">
      <div className="section-inner">
        <div className="text-center stack-lg mb-12">
          <div className="stack">
            <p className="eyebrow">Contact</p>
            <h2 className="section-title">{infoConfig.title}</h2>
          </div>
          <p className="section-lead max-w-2xl mx-auto">{infoConfig.subtitle}</p>
        </div>

        {/* Contact Methods */}
        <div className="grid gap-6 mb-12 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {contactMethods.map((method, index) => {
            const Icon = method.icon;
            const isExternal = method.action.startsWith('http');

            return (
              <Card key={index} className="border-border/40 transition-all duration-300 min-h-[260px] flex flex-col">
                <CardHeader className="text-center pb-4 flex-shrink-0">
                  <div className="inline-flex p-3 rounded-full bg-muted text-foreground mb-3">
                    <Icon className="h-6 w-6" />
                  </div>
                  <CardTitle className="text-xl font-semibold">{method.title}</CardTitle>
                  <p className="text-sm text-muted-foreground">{method.description}</p>
                </CardHeader>
                <CardContent className="text-center flex-1 flex flex-col justify-between gap-4">
                  <p className="font-medium text-foreground break-words hyphens-auto leading-relaxed px-2 text-sm lg:text-base">
                    {method.contact}
                  </p>
                  <Button size="sm" variant="outline" asChild>
                    <a
                      href={method.action}
                      target={isExternal ? '_blank' : undefined}
                      rel={isExternal ? 'noopener noreferrer' : undefined}
                    >
                      <Send className="h-4 w-4" />
                      {method.actionText}
                    </a>
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Service Times & Info */}
        <div className="max-w-4xl mx-auto">
          <h3 className="text-2xl font-semibold text-foreground text-center mb-8">
            When to Find Us
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {serviceInfo.map((info, index) => {
              const Icon = info.icon;
              return (
                <Card key={index} className="text-center border-border/40 transition-all duration-300">
                  <CardContent className="p-6">
                    <div className="inline-flex p-3 rounded-full bg-muted text-foreground mb-4">
                      <Icon className="h-6 w-6" />
                    </div>
                    <h4 className="text-lg font-semibold text-foreground mb-2">{info.title}</h4>
                    <p className="text-lg font-semibold text-foreground mb-2">{info.time}</p>
                    <p className="text-sm text-muted-foreground">{info.description}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Emergency Contact */}
        <div className="mt-12 text-center">
          <Card className="max-w-2xl mx-auto border-border/40">
            <CardContent className="p-6 stack">
              <h4 className="text-lg font-semibold text-foreground">Need Urgent Prayer or Support?</h4>
              <p className="text-muted-foreground">
                For urgent prayer requests or pastoral care, please call our emergency line.
              </p>
              <Button asChild>
                <a href="tel:07428784005">
                  <Phone className="h-4 w-4" />
                  Emergency Prayer Line
                </a>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
