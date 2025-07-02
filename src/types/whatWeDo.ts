import type { ComponentType } from 'react';

export interface MinistryActivity {
  title: string;
  description: string;
  icon: ComponentType<{ className?: string }>;
}

export type ResourceFormat = 'PDF' | 'Video' | 'Audio' | 'Article';

export interface HealingResource {
  title: string;
  imageSrc: string;
  format: ResourceFormat;
  description: string;
  buttonLabel?: string;
} 