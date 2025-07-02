import React from 'react';
import ChurchCard from './ChurchCard';
import type { Church } from '@/types';
import { Button } from '@/components/ui/button';

interface ChurchListProps {
  churches: Church[];
  selectedChurch: Church | null;
  hasSearched: boolean;
  isSearching: boolean;
  onChurchSelect: (church: Church | null) => void;
  onGetDirections: (church: Church) => void;
  userLocationSource: 'geolocation' | 'search' | null;
}

export default function ChurchList({
  churches,
  selectedChurch,
  hasSearched,
  isSearching,
  onChurchSelect,
  onGetDirections,
  userLocationSource,
}: ChurchListProps) {
  if (isSearching || !hasSearched) return null;

  return (
    <div className="space-y-4">
      {churches.map((church) => {
        const churchWithDistance = {
          ...church,
          distance: userLocationSource === 'geolocation' ? church.distance : undefined
        };
        
        return (
          <ChurchCard
            key={church.id}
            church={churchWithDistance}
            isSelected={selectedChurch?.id === church.id}
            onClick={() => onChurchSelect(church)}
            onGetDirections={() => onGetDirections(church)}
          />
        )
      })}
    </div>
  );
} 