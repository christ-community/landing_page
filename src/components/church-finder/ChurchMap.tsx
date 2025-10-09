import React, { useRef, useEffect } from 'react';
import type { Church, UserLocation } from '@/types';

interface ChurchMapProps {
  churches: Church[];
  userLocation: UserLocation | null;
  selectedChurch: Church | null;
  mapCenter: { lat: number; lng: number };
  defaultZoom: number;
  mapLoaded: boolean;
  onChurchSelect: (church: Church) => void;
}

// Google Maps integration
declare global {
  interface Window {
    google: typeof google;
  }
}

export default function ChurchMap({
  churches,
  userLocation,
  selectedChurch,
  mapCenter,
  defaultZoom,
  mapLoaded,
  onChurchSelect
}: ChurchMapProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<any>(null);
  const markersRef = useRef<any[]>([]);

  // Initialize map
  useEffect(() => {
    if (mapLoaded && mapRef.current && !mapInstanceRef.current) {
      mapInstanceRef.current = new window.google.maps.Map(mapRef.current, {
        center: mapCenter,
        zoom: defaultZoom,
        styles: [
          {
            featureType: 'poi',
            elementType: 'labels',
            stylers: [{ visibility: 'off' }]
          }
        ]
      });
    }
  }, [mapLoaded, defaultZoom]);

  // Pan map when center changes and zoom on selection
  useEffect(() => {
    if (mapInstanceRef.current && mapCenter) {
      mapInstanceRef.current.panTo(mapCenter);
      if (selectedChurch) {
        mapInstanceRef.current.setZoom(18); // Zoom in on the selected church
      }
    }
  }, [mapCenter, selectedChurch]);

  // Update map markers
  useEffect(() => {
    if (!mapInstanceRef.current || !window.google) return;

    // Clear existing markers
    markersRef.current.forEach(marker => marker.setMap(null));
    markersRef.current = [];

    // Add user location marker
    if (userLocation?.coordinates) {
      const userMarker = new window.google.maps.Marker({
        position: userLocation.coordinates,
        map: mapInstanceRef.current,
        title: 'Your Location',
        icon: {
          url: 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(`
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="16" cy="16" r="8" fill="#ef4444"/>
              <circle cx="16" cy="16" r="12" fill="none" stroke="#ef4444" stroke-width="2" opacity="0.5"/>
            </svg>
          `),
          scaledSize: new window.google.maps.Size(32, 32),
          anchor: new window.google.maps.Point(16, 16)
        }
      });
      markersRef.current.push(userMarker);
    }

    // Add church markers (only for churches with coordinates)
    churches.forEach((church) => {
      if (!church.coordinates) return; // Skip churches without coordinates
      
      const marker = new window.google.maps.Marker({
        position: church.coordinates,
        map: mapInstanceRef.current,
        title: church.name,
        icon: {
          url: 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(`
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M16 2L18 8H24L19 12L21 18L16 14L11 18L13 12L8 8H14L16 2Z" fill="#2563eb"/>
              <circle cx="16" cy="24" r="4" fill="#2563eb"/>
              <rect x="14" y="20" width="4" height="8" fill="#2563eb"/>
            </svg>
          `),
          scaledSize: new window.google.maps.Size(32, 32),
          anchor: new window.google.maps.Point(16, 32)
        }
      });

      const infoWindow = new window.google.maps.InfoWindow({
        content: `
          <div style="max-width: 250px;">
            <h3 style="margin: 0 0 8px 0; font-size: 16px; font-weight: bold;">${church.name}</h3>
            <p style="margin: 0 0 4px 0; font-size: 14px; color: #666;">${church.address.street}</p>
            <p style="margin: 0 0 8px 0; font-size: 14px; color: #666;">${church.address.city}, ${church.address.postcode}</p>
            ${church.services.sunday ? `<p style="margin: 0 0 4px 0; font-size: 12px;"><strong>Sunday:</strong> ${church.services.sunday}</p>` : ''}
            ${church.distance ? `<p style="margin: 0; font-size: 12px; color: #2563eb;"><strong>${church.distance.toFixed(1)} miles away</strong></p>` : ''}
          </div>
        `
      });

      marker.addListener('click', () => {
        onChurchSelect(church);
        infoWindow.open(mapInstanceRef.current, marker);
      });

      markersRef.current.push(marker);
    });

    // Fit map to show all markers only when there is no selected church
    if (markersRef.current.length > 0 && !selectedChurch) {
      const bounds = new window.google.maps.LatLngBounds();
      markersRef.current.forEach(marker => bounds.extend(marker.getPosition()));
      mapInstanceRef.current.fitBounds(bounds);
      
      // Set minimum zoom level
      const listener = window.google.maps.event.addListener(mapInstanceRef.current, 'idle', () => {
        if (mapInstanceRef.current.getZoom() > 15) {
          mapInstanceRef.current.setZoom(15);
        }
        window.google.maps.event.removeListener(listener);
      });
    }
  }, [churches, userLocation, onChurchSelect, selectedChurch]);

  return (
    <div className="bg-white/80 dark:bg-black/20 backdrop-blur-md border border-border/30 rounded-2xl p-6 shadow-xl">
      {/* <h3 className="text-xl font-bold text-foreground mb-4">Map View</h3> */}
      
      {/* <div 
        ref={mapRef}
        className="w-full h-[600px] rounded-xl overflow-hidden"
        style={{ minHeight: '600px' }}
      /> */}
      
      {selectedChurch && (
        <div className="mt-4 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
          <h4 className="font-semibold text-foreground">{selectedChurch.name}</h4>
          <p className="text-sm text-muted-foreground mt-1">
            {selectedChurch.address.street}, {selectedChurch.address.city}
          </p>
          <p className="text-sm text-blue-600 font-medium mt-2">
            {selectedChurch.denomination}{selectedChurch.distance ? ` • ${selectedChurch.distance.toFixed(1)} miles away` : ''}
          </p>
        </div>
      )}
    </div>
  );
} 