'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Loader } from '@googlemaps/js-api-loader';
import SearchForm from './church-finder/SearchForm';
import ChurchList from './church-finder/ChurchList';
import ChurchMap from './church-finder/ChurchMap';
import type { ChurchFinderConfig, Church, UserLocation } from '@/types';
import type { IChurch } from '../../types/contentful';

// Google Maps integration
declare global {
  interface Window {
    google: typeof google;
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
    pastor: 'Greg Haslam',
    denomination: 'Independent Evangelical',
    image: '/Church-Conference.jpg'
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
  },
  {
    id: '7',
    name: 'Bethel Community Church',
    address: {
      street: '40 Stow Hill',
      city: 'Newport',
      state: 'Gwent',
      postcode: 'NP20 1JG',
      country: 'UK'
    },
    coordinates: { lat: 51.587, lng: -2.993 },
    contact: {
      phone: '+44 1633 221908',
      website: 'https://bethelnewport.co.uk'
    },
    services: {
      sunday: '11:00 AM & 6:00 PM'
    },
    denomination: 'Pentecostal',
    image: '/worship-conference.jpeg'
  },
  {
    id: '8',
    name: 'St. Mary\'s Church',
    address: {
      street: 'St Mary\'s Square',
      city: 'Swansea',
      state: 'West Glamorgan',
      postcode: 'SA1 3LP',
      country: 'UK'
    },
    coordinates: { lat: 51.6189, lng: -3.9437 },
    contact: {
      phone: '+44 1792 655489',
      website: 'https://www.swanseastmary.org.uk'
    },
    services: {
      sunday: '9:30 AM & 11:00 AM'
    },
    denomination: 'Church in Wales',
    image: '/Church-Conference.jpg'
  },
  {
    id: '9',
    name: 'Mount Pleasant Baptist Church',
    address: {
      street: 'The Kingsway',
      city: 'Swansea',
      state: 'West Glamorgan',
      postcode: 'SA1 5AZ',
      country: 'UK'
    },
    coordinates: { lat: 51.6214, lng: -3.9472 },
    contact: {
      phone: '+44 1792 654930',
      website: 'https://www.mountpleasantswansea.org.uk/'
    },
    services: {
      sunday: '10:30 AM & 6:00 PM'
    },
    denomination: 'Baptist',
    image: '/worship-conference.jpeg'
  }
];

const defaultConfig: ChurchFinderConfig = {
  title: 'Find a Church Near You',
  subtitle: 'Discover churches in your local area',
  description: 'Enter your location to find churches near you. Connect with a local congregation and join a community of faith.',
  searchPlaceholder: 'Enter postcode, town, or city (e.g., London)',
  searchButtonText: 'Find Churches',
  mapCenter: { lat: 51.5074, lng: -0.1278 }, // London center
  defaultZoom: 12,
  maxDistance: 25
};

interface ChurchFinderSectionProps {
  config?: Partial<ChurchFinderConfig>;
  contentfulChurches?: IChurch[];
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
const geocodeLocation = async (location: string): Promise<{ lat: number; lng: number } | null> => {
  if (!window.google) {
    // This function will likely not be called if loader is used properly,
    // but it's a good fallback.
    console.error('Google Maps API not loaded');
    return null;
  }

  return new Promise((resolve, reject) => {
    const geocoder = new window.google.maps.Geocoder();
    geocoder.geocode(
      { address: location, componentRestrictions: { country: 'GB' } },
      (
        results: google.maps.GeocoderResult[] | null,
        status: google.maps.GeocoderStatus
      ) => {
        if (status === 'OK' && results && results[0]) {
          const location = results[0].geometry.location;
          resolve({ lat: location.lat(), lng: location.lng() });
        } else {
          console.error(`Geocode was not successful for the following reason: ${status}`);
          reject(new Error('Location not found'));
        }
      }
    );
  });
};

const reverseGeocode = async (coords: { lat: number; lng: number }): Promise<string> => {
  if (!window.google) {
    console.error('Google Maps API not loaded');
    return 'Current Location';
  }
  return new Promise((resolve) => {
    const geocoder = new window.google.maps.Geocoder();
    geocoder.geocode({ location: coords }, (
      results: google.maps.GeocoderResult[] | null,
      status: google.maps.GeocoderStatus
    ) => {
      if (status === 'OK' && results && results[0]) {
        // Find a suitable address component, like postal town or locality
        const town = results[0].address_components.find(
          (c: google.maps.GeocoderAddressComponent) => c.types.includes('postal_town') || c.types.includes('locality')
        );
        resolve(town ? town.long_name : results[0].formatted_address);
      } else {
        resolve('Current Location');
      }
    });
  });
};

export default function ChurchFinderSection({ config, contentfulChurches = [] }: ChurchFinderSectionProps) {
  const finderConfig = { ...defaultConfig, ...config };
  const [searchValue, setSearchValue] = useState('');
  const searchInputRef = useRef<HTMLInputElement>(null);
  const autocompleteRef = useRef<google.maps.places.Autocomplete | null>(null);

  // Convert Contentful churches to local format
  const convertedChurches: Church[] = contentfulChurches.map(church => ({
    id: (church as any).sys?.id || Math.random().toString(),
    name: church.name,
    address: {
      ...church.address,
      postcode: church.address.postcode || ''
    },
    coordinates: church.coordinates || { lat: 0, lng: 0 },
    contact: church.contact || {},
    services: church.services || {},
    pastor: church.pastor || '',
    denomination: church.denomination || '',
    image: (church as any).processedImage || '/Church-Conference.jpg'
  }));

  // Use Contentful churches if available, otherwise fall back to real churches
  const initialChurches = convertedChurches.length > 0 ? convertedChurches : realChurches;
  const [churches, setChurches] = useState<Church[]>(initialChurches);
  const [filteredChurches, setFilteredChurches] = useState<Church[]>([]);
  const [selectedChurch, setSelectedChurch] = useState<Church | null>(null);
  const [userLocation, setUserLocation] = useState<UserLocation | null>(null);
  const [isSearching, setIsSearching] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const [searchError, setSearchError] = useState<string | null>(null);
  const [mapLoaded, setMapLoaded] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState<string | null>(null);
  const [userLocationSource, setUserLocationSource] = useState<'geolocation' | 'search' | null>(null);
  const [mapCenter, setMapCenter] = useState(finderConfig.mapCenter);
  const mapContainerRef = useRef<HTMLDivElement>(null);

  // Geocode church addresses on load (only for churches without coordinates)
  useEffect(() => {
    if (mapLoaded) {
      const geocodeChurches = async () => {
        const geocodedChurches = await Promise.all(
          initialChurches.map(async (church) => {
            // Only geocode if coordinates are missing or invalid
            if (!church.coordinates || (church.coordinates.lat === 0 && church.coordinates.lng === 0)) {
              try {
                const address = `${church.address.street}, ${church.address.city}, ${church.address.postcode || church.address.state}`;
                const coords = await geocodeLocation(address);
                if (coords) {
                  return { ...church, coordinates: coords };
                }
              } catch (error) {
                console.error(`Could not geocode address for ${church.name}:`, error);
              }
            }
            return church; // return original church if geocoding fails or not needed
          })
        );
        setChurches(geocodedChurches);
      };
      geocodeChurches();
    }
  }, [mapLoaded, initialChurches]);

  // Load Google Maps and initialize Autocomplete
  useEffect(() => {
    const loader = new Loader({
      apiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || '',
      version: 'weekly',
      libraries: ['places'],
    });

    loader.load().then(() => {
      setMapLoaded(true);
      if (searchInputRef.current) {
        const autocomplete = new window.google.maps.places.Autocomplete(
          searchInputRef.current,
          {
            types: ['(regions)'], // Search for cities, towns, postcodes
            componentRestrictions: { country: 'gb' },
            fields: ['geometry', 'name'],
          }
        );
        autocompleteRef.current = autocomplete;
        autocomplete.addListener('place_changed', handlePlaceSelect);
      }
    }).catch(e => {
      console.error('Failed to load Google Maps', e);
      setSearchError('Failed to load Google Maps');
    });

    return () => {
      // Clean up listeners
      if (autocompleteRef.current) {
        window.google.maps.event.clearInstanceListeners(autocompleteRef.current);
      }
    };
  }, []);

  const handlePlaceSelect = async () => {
    const place = autocompleteRef.current?.getPlace();
    if (place && place.geometry && place.geometry.location) {
      const location = place.geometry.location;
      const coords = { lat: location.lat(), lng: location.lng() };
      setSearchValue(place.name || '');
      await handleSearch(coords, place.name, 'search');
    }
  };

  const handleUseMyLocation = () => {
    if (navigator.geolocation) {
      setIsSearching(true);
      setSearchError(null);
      setLoadingMessage('Retrieving your location...');
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const coords = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };
          const locationName = await reverseGeocode(coords);
          setSearchValue(locationName);
          await handleSearch(coords, locationName, 'geolocation');
        },
        () => {
          setSearchError('Unable to retrieve your location. Please enable location services in your browser.');
          setIsSearching(false);
          setLoadingMessage(null);
        }
      );
    } else {
      setSearchError('Geolocation is not supported by your browser.');
    }
  };

  // Search for churches
  const handleSearch = async (coords?: { lat: number; lng: number }, locationName?: string, source: 'search' | 'geolocation' = 'search') => {
    if ((!searchValue.trim() && !coords) || !mapLoaded) {
      setIsSearching(false);
      return;
    };
    
    setLoadingMessage('Searching for churches...');
    setIsSearching(true);
    setSearchError(null);
    setHasSearched(true);
    
    try {
      let coordinates = coords;
      if (!coordinates) {
        const geocodedCoords = await geocodeLocation(searchValue);
        if (geocodedCoords) {
          coordinates = geocodedCoords;
        } else {
          throw new Error('Location not found');
        }
      }
      
      setUserLocation({
        postcode: locationName || searchValue,
        coordinates
      });
      setUserLocationSource(source);
      setMapCenter(coordinates);

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
      setSearchError('Unable to find location. Please check your search term and try again.');
      setFilteredChurches([]);
    } finally {
      setIsSearching(false);
      setLoadingMessage(null);
    }
  };

  // Handle directions
  const handleGetDirections = (church: Church) => {
    const destination = `${church.address.street}, ${church.address.city}, ${church.address.postcode}`;
    const origin = userLocation?.coordinates ? `${userLocation.coordinates.lat},${userLocation.coordinates.lng}` : '';
    const url = `https://www.google.com/maps/dir/?api=1&origin=${origin}&destination=${encodeURIComponent(destination)}`;
    window.open(url, '_blank');
  };

  const handleChurchSelect = (church: Church | null) => {
    setSelectedChurch(church);
    if (church) {
      setMapCenter(church.coordinates);
      // On small screens, scroll to the map
      if (window.innerWidth < 1024 && mapContainerRef.current) {
        mapContainerRef.current.scrollIntoView({ behavior: 'smooth' });
      }
    }
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
          ref={searchInputRef}
          searchValue={searchValue}
          isSearching={isSearching}
          mapLoaded={mapLoaded}
          searchError={searchError}
          searchPlaceholder={finderConfig.searchPlaceholder}
          searchButtonText={finderConfig.searchButtonText}
          onSearchValueChange={setSearchValue}
          onSearch={() => handleSearch()}
          onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
          onUseMyLocation={handleUseMyLocation}
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
                      onChurchSelect={handleChurchSelect}
                      onGetDirections={handleGetDirections}
                      userLocationSource={userLocationSource}
                    />
                  </div>
                </div>

                {/* Map - Right Side */}
                <div ref={mapContainerRef} className="lg:sticky lg:top-24 h-fit">
                  <ChurchMap
                    churches={filteredChurches}
                    userLocation={userLocation}
                    selectedChurch={selectedChurch}
                    mapCenter={mapCenter}
                    defaultZoom={finderConfig.defaultZoom}
                    mapLoaded={mapLoaded}
                    onChurchSelect={handleChurchSelect}
                  />
                </div>
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="bg-white/80 dark:bg-black/20 backdrop-blur-md border border-border/30 rounded-2xl p-8 shadow-xl">
                  <h3 className="text-xl font-bold text-foreground mb-4">No Church Recommendations Found</h3>
                  <p className="text-muted-foreground">
                    We couldn't find any recommended churches matching your search. Please try a different location.
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
              <p className="text-lg text-muted-foreground">{loadingMessage}</p>
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
              onChurchSelect={handleChurchSelect}
            />
          </div>
        )}
      </div>
    </section>
  );
} 