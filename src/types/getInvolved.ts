import type { LucideIcon } from 'lucide-react';

export interface InvolvementOption {
  title: string;
  description: string;
  href: string;
  icon: LucideIcon;
  bgColor: string;
  textColor: string;
}

export interface GetInvolvedPageConfig {
  hero: {
    title: string;
    subtitle: string;
    backgroundImage: string;
  };
  options: InvolvementOption[];
} 