export interface Church {
  id: string;
  name: string;
  address: {
    street: string;
    city: string;
    state: string;
    postcode: string;
    country: string;
  };
  coordinates?: {
    lat: number;
    lng: number;
  };
  contact: {
    phone?: string;
    email?: string;
    website?: string;
  };
  services: {
    sunday?: string;
    wednesday?: string;
    other?: string[];
  };
  pastor?: string;
  denomination?: string;
  image?: string;
  distance?: number; // Distance from user location in miles/km
}

export interface ChurchFinderConfig {
  title: string;
  subtitle: string;
  description: string;
  searchPlaceholder: string;
  searchButtonText: string;
  mapCenter: {
    lat: number;
    lng: number;
  };
  defaultZoom: number;
  maxDistance: number; // Maximum search radius in miles
}

export interface UserLocation {
  postcode: string;
  coordinates?: {
    lat: number;
    lng: number;
  };
  locationName?: string; // Add location name for display
}

export interface SearchFilters {
  maxDistance: number;
  denomination?: string;
  hasServices?: boolean;
} 