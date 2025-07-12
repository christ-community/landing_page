export interface HeroImage {
  src: string;
  alt: string;
}

export interface HeroButton {
  label: string;
  variant: 'primary' | 'secondary';
  href?: string;
  onClick?: () => void;
}

export interface HeroContent {
  title: string;
  subtitle?: string;
  description: string;
  buttons: HeroButton[];
}

export interface HeroConfig {
  content: HeroContent;
  images: HeroImage[];
  autoChangeInterval?: number;
  connectButtonLabel?: string;
} 