import React from 'react';
import ChurchCard from './ChurchCard';
import type { Church } from '@/types';

interface ChurchListProps {
  churches: Church[];
  selectedChurch: Church | null;
  hasSearched: boolean;
  isSearching: boolean;
  onChurchSelect: (church: Church) => void;
  onGetDirections: (church: Church) => void;
}

export default function ChurchList({
  churches,
  selectedChurch,
  onChurchSelect,
  onGetDirections
}: ChurchListProps) {
  return (
    <div className="space-y-4">
      {churches.map((church) => (
        <ChurchCard
          key={church.id}
          church={church}
          isSelected={selectedChurch?.id === church.id}
          onClick={() => onChurchSelect(church)}
          onGetDirections={() => onGetDirections(church)}
        />
      ))}
    </div>
  );
} 