export interface SocialMediaLink {
  platform: string;
  href: string;
  icon: React.ReactNode;
  ariaLabel: string;
}

export interface QuickLink {
  href: string;
  label: string;
  isExternal?: boolean;
}

export interface ContactInfo {
  address: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
  };
  phone: string;
  email: string;
}

export interface ServiceTime {
  name: string;
  time: string;
  day?: string;
}

export interface ChurchInfo {
  name: string;
  description: string;
  socialMediaLinks: SocialMediaLink[];
}

export interface LegalLink {
  href: string;
  label: string;
}

export interface FooterConfig {
  churchInfo: ChurchInfo;
  quickLinks: QuickLink[];
  contactInfo: ContactInfo;
  serviceTimes: ServiceTime[];
  copyrightText: string;
  legalLinks: LegalLink[];
} 