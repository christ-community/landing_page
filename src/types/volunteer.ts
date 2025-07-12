export interface VolunteerOpportunity {
  id: string;
  title: string;
  description: string;
  shortDescription: string;
  icon: React.ReactNode;
  image?: string;
  timeCommitment: string;
  location: 'remote' | 'onsite' | 'hybrid';
  skillLevel: 'beginner' | 'intermediate' | 'advanced' | 'any';
  category: 'ministry' | 'events' | 'administration' | 'outreach' | 'technology' | 'creative';
  requirements?: string[];
  benefits?: string[];
  contactEmail?: string;
  tags?: string[];
  isUrgent?: boolean;
  isPopular?: boolean;
}

export interface VolunteerHeroConfig {
  title: string;
  subtitle: string;
  description: string;
  backgroundImage: string;
  ctaText: string;
  stats?: {
    volunteers: number;
    hoursServed: number;
    projectsCompleted: number;
    communitiesImpacted: number;
  };
}

export interface VolunteerProcess {
  step: number;
  title: string;
  description: string;
  icon: React.ReactNode;
  details?: string[];
  estimatedTime?: string;
}

export interface VolunteerTestimonial {
  id: string;
  name: string;
  role: string;
  quote: string;
  image?: string;
  volunteeredSince: string;
  favoriteActivity: string;
}

export interface VolunteerImpactStat {
  label: string;
  value: string;
  description: string;
  icon: React.ReactNode;
  color: string;
}

export interface VolunteerApplicationData {
  fullName: string;
  email: string;
  phone: string;
  address: {
    street: string;
    city: string;
    postcode: string;
    country: string;
  };
  preferredOpportunities: string[];
  availability: {
    weekdays: boolean;
    weekends: boolean;
    evenings: boolean;
  };
  skills: string[];
  experience: string;
  motivation: string;
  references?: {
    name: string;
    relationship: string;
    contact: string;
  }[];
  backgroundCheck?: boolean;
  agreesToTerms: boolean;
}

export interface VolunteerPageConfig {
  hero: VolunteerHeroConfig;
  opportunities: VolunteerOpportunity[];
  process: VolunteerProcess[];
  testimonials: VolunteerTestimonial[];
  impactStats: VolunteerImpactStat[];
} 