'use client';

import React, { useState, useEffect } from 'react';
import SearchForm from './church-finder/SearchForm';
import ChurchList from './church-finder/ChurchList';
import ChurchMap from './church-finder/ChurchMap';
import type { ChurchFinderConfig, Church, UserLocation } from '@/types';

// Google Maps integration
declare global {
  interface Window {
    google: any;
  }
}

// Real church data from various denominations
const realChurches: Church[] = [
  {
    id: '1',
    name: 'All Souls Church Langham Place',
    address: {
      street: '2 All Souls Pl',
      city: 'London',
      state: 'Greater London',
      postcode: 'W1B 3DA',
      country: 'UK'
    },
    coordinates: { lat: 51.5183, lng: -0.1431 },
    contact: {
      phone: '+44 20 7580 3522',
      email: 'info@allsouls.org',
      website: 'https://www.allsouls.org'
    },
    services: {
      sunday: '9:00 AM, 11:30 AM & 6:30 PM',
      other: ['Midweek service Wednesday 1:10 PM']
    },
    pastor: 'Hugh Palmer',
    denomination: 'Church of England',
    image: '/Church-Conference.jpg'
  },
  {
    id: '2',
    name: 'Holy Trinity Brompton',
    address: {
      street: 'Brompton Rd',
      city: 'London',
      state: 'Greater London',
      postcode: 'SW7 1JA',
      country: 'UK'
    },
    coordinates: { lat: 51.4994, lng: -0.1652 },
    contact: {
      phone: '+44 20 7581 8255',
      email: 'info@htb.org',
      website: 'https://www.htb.org'
    },
    services: {
      sunday: '9:00 AM, 11:00 AM & 6:30 PM',
      wednesday: '7:00 PM'
    },
    pastor: 'Nicky Gumbel',
    denomination: 'Church of England',
    image: '/worship-conference.jpeg'
  },
  {
    id: '3',
    name: 'Hillsong Church London',
    address: {
      street: 'Dominion Theatre, 268-269 Tottenham Court Rd',
      city: 'London',
      state: 'Greater London',
      postcode: 'W1T 7AQ',
      country: 'UK'
    },
    coordinates: { lat: 51.5205, lng: -0.1347 },
    contact: {
      phone: '+44 20 7907 0670',
      email: 'info@hillsong.com',
      website: 'https://hillsong.com/london'
    },
    services: {
      sunday: '10:00 AM & 6:00 PM',
      other: ['Hillsong Young & Free Sunday 6:00 PM']
    },
    pastor: 'Gary Clarke',
    denomination: 'Pentecostal',
    image: '/worship-conference.jpeg'
  },
  {
    id: '4',
    name: 'St Bartholomew\'s Church',
    address: {
      street: 'West Smithfield',
      city: 'London',
      state: 'Greater London',
      postcode: 'EC1A 9DS',
      country: 'UK'
    },
    coordinates: { lat: 51.5188, lng: -0.1005 },
    contact: {
      phone: '+44 20 7606 5171',
      website: 'https://www.greatstbarts.com'
    },
    services: {
      sunday: '9:00 AM, 11:00 AM & 6:30 PM',
      other: ['Evensong Sunday 6:30 PM']
    },
    pastor: 'Marcus Walker',
    denomination: 'Church of England',
    image: '/Church-Conference.jpg'
  },
  {
    id: '5',
    name: 'Kensington Temple',
    address: {
      street: '1 Kensington Park Rd',
      city: 'London',
      state: 'Greater London',
      postcode: 'W11 3BY',
      country: 'UK'
    },
    coordinates: { lat: 51.5130, lng: -0.1961 },
    contact: {
      phone: '+44 20 7792 7500',
      email: 'info@kt.org',
      website: 'https://www.kt.org'
    },
    services: {
      sunday: '8:30 AM, 10:30 AM & 6:30 PM',
      wednesday: '7:30 PM'
    },
    pastor: 'Colin Dye',
    denomination: 'Pentecostal',
    image: '/worship-conference.jpeg'
  },
  {
    id: '6',
    name: 'Westminster Chapel',
    address: {
      street: 'Buckingham Gate',
      city: 'London',
      state: 'Greater London',
      postcode: 'SW1E 6BS',
      country: 'UK'
    },
    coordinates: { lat: 51.4984, lng: -0.1377 },
    contact: {
      phone: '+44 20 7834 1731',
      email: 'office@westminsterchapel.org.uk',
      website: 'https://www.westminsterchapel.org.uk'
    },
    services: {
      sunday: '11:00 AM & 6:30 PM',
      other: ['Prayer Meeting Saturday 6:30 PM']
    },
    pastor: 'Greg Haslam',
    denomination: 'Independent Evangelical',
    image: '/Church-Conference.jpg'
  }
];

const defaultConfig: ChurchFinderConfig = {
  title: 'Find a Church Near You',
  subtitle: 'Discover churches in your local area',
  description: 'Enter your postcode to find churches near you. Connect with a local congregation and join a community of faith.',
  searchPlaceholder: 'Enter your postcode (e.g., SW1A 1AA)',
  searchButtonText: 'Find Churches',
  mapCenter: { lat: 51.5074, lng: -0.1278 }, // London center
  defaultZoom: 12,
  maxDistance: 25
};

interface ChurchFinderSectionProps {
  config?: Partial<ChurchFinderConfig>;
}

// Simple distance calculation (Haversine formula)
const calculateDistance = (lat1: number, lon1: number, lat2: number, lon2: number): number => {
  const R = 3959; // Earth's radius in miles
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
    Math.sin(dLon/2) * Math.sin(dLon/2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  return R * c;
};

// Real geocoding using Google Maps API
const geocodePostcode = async (postcode: string): Promise<{ lat: number; lng: number } | null> => {
  if (!window.google) {
    throw new Error('Google Maps API not loaded');
  }

  return new Promise((resolve) => {
    const geocoder = new window.google.maps.Geocoder();
    geocoder.geocode({ address: postcode }, (results: any, status: any) => {
      if (status === 'OK' && results && results[0]) {
        const location = results[0].geometry.location;
        resolve({ lat: location.lat(), lng: location.lng() });
      } else {
        resolve(null);
      }
    });
  });
};

export default function ChurchFinderSection({ config }: ChurchFinderSectionProps) {
  const finderConfig = { ...defaultConfig, ...config };
  const [searchValue, setSearchValue] = useState('');

  const [churches] = useState<Church[]>(realChurches);
  const [filteredChurches, setFilteredChurches] = useState<Church[]>([]);
  const [selectedChurch, setSelectedChurch] = useState<Church | null>(null);
  const [userLocation, setUserLocation] = useState<UserLocation | null>(null);
  const [isSearching, setIsSearching] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const [searchError, setSearchError] = useState<string | null>(null);
  const [mapLoaded, setMapLoaded] = useState(false);



  // Load Google Maps
  useEffect(() => {
    const loadGoogleMaps = () => {
      if (window.google) {
        setMapLoaded(true);
        return;
      }

      const script = document.createElement('script');
      script.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}&libraries=places`;
      script.async = true;
      script.defer = true;
      script.onload = () => setMapLoaded(true);
      script.onerror = () => setSearchError('Failed to load Google Maps');
      document.head.appendChild(script);
    };

    loadGoogleMaps();
  }, []);

  // Search for churches
  const handleSearch = async () => {
    if (!searchValue.trim() || !mapLoaded) return;
    
    setIsSearching(true);
    setSearchError(null);
    setHasSearched(true);
    
    try {
      const coordinates = await geocodePostcode(searchValue);
      
      if (!coordinates) {
        throw new Error('Location not found');
      }
      
      setUserLocation({
        postcode: searchValue,
        coordinates
      });

      // Calculate distances and filter churches
      let churchesWithDistance = churches.map(church => ({
        ...church,
        distance: calculateDistance(
          coordinates.lat,
          coordinates.lng,
          church.coordinates.lat,
          church.coordinates.lng
        )
      }));

      // Filter by maximum distance
      churchesWithDistance = churchesWithDistance.filter(
        church => (church.distance || 0) <= finderConfig.maxDistance
      );

      // Sort by distance
      churchesWithDistance.sort((a, b) => (a.distance || 0) - (b.distance || 0));

      setFilteredChurches(churchesWithDistance);
      
    } catch (error) {
      setSearchError('Unable to find location. Please check your postcode and try again.');
      setFilteredChurches([]);
    } finally {
      setIsSearching(false);
    }
  };

  // Handle directions
  const handleGetDirections = (church: Church) => {
    const destination = `${church.address.street}, ${church.address.city}, ${church.address.postcode}`;
    const url = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(destination)}`;
    window.open(url, '_blank');
  };

  return (
    <section className="py-24 bg-gradient-to-br from-blue-100/60 via-sky-50/40 to-blue-200/50 dark:from-blue-950/30 dark:via-blue-900/20 dark:to-blue-800/30">
      <div className="container mx-auto px-6 lg:px-12">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-foreground mb-6">
            {finderConfig.title}
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            {finderConfig.subtitle}
          </p>
        </div>

        {/* Search Form */}
        <div className="max-w-4xl mx-auto mb-16">
          <SearchForm
          searchValue={searchValue}
          isSearching={isSearching}
          mapLoaded={mapLoaded}
          searchError={searchError}
          searchPlaceholder={finderConfig.searchPlaceholder}
          searchButtonText={finderConfig.searchButtonText}
          onSearchValueChange={setSearchValue}
          onSearch={handleSearch}
          onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
        />
        </div>

        {/* Church Results - Only show after search */}
        {hasSearched && !isSearching && (
          <div className="max-w-8xl mx-auto mb-16">
            {filteredChurches.length > 0 ? (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Church List - Left Side */}
                <div className="space-y-4">
                  <h3 className="text-2xl font-bold text-foreground mb-6">
                    Found {filteredChurches.length} church{filteredChurches.length !== 1 ? 'es' : ''} near you
                  </h3>
                  <div className="space-y-4 max-h-[600px] overflow-y-auto pr-2">
                    <ChurchList
                      churches={filteredChurches}
                      selectedChurch={selectedChurch}
                      hasSearched={hasSearched}
                      isSearching={isSearching}
                      onChurchSelect={setSelectedChurch}
                      onGetDirections={handleGetDirections}
                    />
                  </div>
                </div>

                {/* Map - Right Side */}
                <div className="lg:sticky lg:top-24 h-fit">
                  <ChurchMap
                    churches={filteredChurches}
                    userLocation={userLocation}
                    selectedChurch={selectedChurch}
                    mapCenter={finderConfig.mapCenter}
                    defaultZoom={finderConfig.defaultZoom}
                    mapLoaded={mapLoaded}
                    onChurchSelect={setSelectedChurch}
                  />
                </div>
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="bg-white/80 dark:bg-black/20 backdrop-blur-md border border-border/30 rounded-2xl p-8 shadow-xl">
                  <h3 className="text-xl font-bold text-foreground mb-4">No Churches Found</h3>
                  <p className="text-muted-foreground">
                    We couldn't find any churches matching your search criteria. Try searching with a different location.
                  </p>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Loading State */}
        {isSearching && (
          <div className="max-w-4xl mx-auto mb-16">
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4" />
              <p className="text-lg text-muted-foreground">Searching for churches...</p>
            </div>
          </div>
        )}

        {/* Default Map - Show when no search has been performed */}
        {!hasSearched && !isSearching && (
          <div className="max-w-8xl mx-auto">
            <ChurchMap
              churches={[]}
              userLocation={userLocation}
              selectedChurch={selectedChurch}
              mapCenter={finderConfig.mapCenter}
              defaultZoom={finderConfig.defaultZoom}
              mapLoaded={mapLoaded}
              onChurchSelect={setSelectedChurch}
            />
          </div>
        )}
      </div>
    </section>
  );
} 