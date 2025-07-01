export interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  image: string;
  category: string;
  attendees?: number;
  registrationUrl?: string;
}

export interface EventsConfig {
  title: string;
  subtitle: string;
  description: string;
  ctaText: string;
  ctaUrl: string;
  events: Event[];
}

export interface EventCategory {
  id: string;
  name: string;
  icon: React.ReactNode;
  color: string;
} 