import React, { forwardRef } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, LocateFixed } from 'lucide-react';

interface SearchFormProps {
  searchValue: string;
  isSearching: boolean;
  mapLoaded: boolean;
  searchError: string | null;
  searchPlaceholder: string;
  searchButtonText: string;
  onSearchValueChange: (value: string) => void;
  onSearch: () => void;
  onKeyDown: (e: React.KeyboardEvent) => void;
  onUseMyLocation: () => void;
}

const SearchForm = forwardRef<HTMLInputElement, SearchFormProps>(({
  searchValue,
  isSearching,
  mapLoaded,
  searchError,
  searchPlaceholder,
  searchButtonText,
  onSearchValueChange,
  onSearch,
  onKeyDown,
  onUseMyLocation
}, ref) => {
  return (
    <div className="bg-white/80 dark:bg-black/20 backdrop-blur-md border border-border/30 rounded-2xl p-8 shadow-xl">
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="relative flex-1">
            <Input
              ref={ref}
              type="text"
              placeholder={searchPlaceholder}
              value={searchValue}
              onChange={(e) => onSearchValueChange(e.target.value)}
              onKeyDown={onKeyDown}
              className="h-12 text-lg pl-4 pr-12"
              disabled={isSearching || !mapLoaded}
            />
            <Button 
              variant="ghost" 
              size="icon" 
              className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-primary hover:bg-primary/10 rounded-full"
              onClick={onUseMyLocation}
              disabled={isSearching || !mapLoaded}
              aria-label="Use my location"
              title="Find churches near me"
            >
              <LocateFixed className="h-5 w-5" />
            </Button>
          </div>
          <div className="flex justify-center">
            <Button
              size="lg"
              onClick={onSearch}
              disabled={isSearching || !searchValue.trim() || !mapLoaded}
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 h-12"
            >
              {isSearching ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                  Searching...
                </>
              ) : (
                <>
                  <Search className="w-5 h-5 mr-2" />
                  {searchButtonText}
                </>
              )}
            </Button>
          </div>
        </div>
        
        {searchError && (
          <div className="mt-4 p-3 bg-red-100 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
            <p className="text-red-700 dark:text-red-300 text-sm">{searchError}</p>
          </div>
        )}

        {!mapLoaded && (
          <div className="mt-4 p-3 bg-blue-100 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
            <p className="text-blue-700 dark:text-blue-300 text-sm">Loading Google Maps...</p>
          </div>
        )}

        <div className="mt-4 p-3 bg-green-100 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg">
          <p className="text-green-700 dark:text-green-300 text-sm">
            💡 <strong>Search Tip:</strong> Enter a town, city, or postcode to find churches. Churches without exact coordinates will still be shown in the list.
          </p>
        </div>
    </div>
  );
});

SearchForm.displayName = 'SearchForm';

export default SearchForm; 