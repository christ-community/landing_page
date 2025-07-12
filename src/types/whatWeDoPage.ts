

export interface ActivityCardItem {
  title: string;
  description: string;
  href: string;
  icon: string;
  ctaText: string;
}

export interface WhatWeDoPageConfig {
  hero: {
    title: string;
    subtitle: string;
    image: string;
  };
  activities: {
    title: string;
    subtitle: string;
    items: ActivityCardItem[];
  };
} 