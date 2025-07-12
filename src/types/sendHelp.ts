import type { LucideIcon } from 'lucide-react';

export interface SupportOption {
  id: string;
  title: string;
  description: string;
  icon: string;
  ctaText: string;
  color: string;
  bgColor: string;
}

export interface ImpactStory {
  id: string;
  title: string;
  description: string;
  image: string;
  stat: {
    value: string;
    label: string;
  };
}

export interface SendHelpFormConfig {
  title: string;
  subtitle: string;
  fields: {
    name: { label: string; placeholder: string; };
    email: { label: string; placeholder: string; };
    subject: { label: string; placeholder: string; };
    message: { label: string; placeholder: string; };
  };
  submitButtonText: string;
}

export interface SendHelpPageConfig {
  hero: {
    title: string;
    subtitle: string;
    backgroundImage: string;
  };
  helpOptions: {
    title: string;
    subtitle: string;
    options: SupportOption[];
  };
  impact: {
    title: string;
    subtitle: string;
    stories: ImpactStory[];
  };
  form: SendHelpFormConfig;
} 