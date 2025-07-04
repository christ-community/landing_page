import type { LucideIcon } from 'lucide-react';
import React from 'react';

export interface EventDate {
  startDate: string;
  endDate?: string;
  time: string;
}

export interface EventLocation {
  venue: string;
  address: string;
  city: string;
  country: string;
}

export type EventCategory = 'Conference' | 'Outreach' | 'Webinar' | 'Workshop' | 'Community';

export interface EventItem {
  id: string;
  title: string;
  category: EventCategory;
  description: string;
  image: string;
  date: EventDate;
  location: EventLocation | 'Online';
  isFeatured: boolean;
  tags: string[];
}

export interface EventsPageConfig {
  hero: {
    title: string;
    subtitle: string;
    primaryCta: {
      text: string;
      href: string;
    };
    secondaryCta: {
      text: string;
      href: string;
    };
    mainImage: string;
    previewImage: string;
    previewLabel: string;
  };
  events: EventItem[];
} 