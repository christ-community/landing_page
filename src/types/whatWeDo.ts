import type { ComponentType } from 'react';

export interface MinistryActivity {
  title: string;
  description: string;
  image: string;
}

export type ResourceFormat = 'Article' | 'Video' | 'Podcast' | 'Guide';

export interface HealingResource {
  id: string;
  title: string;
  description: string;
  image: string;
  format: ResourceFormat;
  tags: string[];
  href: string;
  isFeatured?: boolean;
}

export interface HealingResourcesPageConfig {
  hero: {
    title: string;
    subtitle: string;
  },
  resources: HealingResource[];
} 