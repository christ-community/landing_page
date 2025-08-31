'use client';

import React from 'react';
import { Search, X } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface FilterBarProps {
  searchTerm: string;
  onSearchTermChange: (term: string) => void;
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
  categories: any[];
}

const FilterBar = ({
  searchTerm,
  onSearchTermChange,
  selectedCategory,
  onSelectCategory,
  categories,
}: FilterBarProps) => {
  return (
    <div className="mb-12">
      <div className="flex justify-center flex-wrap gap-2 mb-8">
        <button
          onClick={() => onSelectCategory('All')}
          className={`px-4 py-2 text-sm font-medium rounded-full transition-colors ${
            selectedCategory === 'All'
              ? 'bg-foreground text-background'
              : 'bg-background text-foreground hover:bg-muted'
          }`}
        >
          View all
        </button>
        {categories.map((category) => (
          <button
            key={category.id || category.sys?.id}
            onClick={() => onSelectCategory(category.name)}
            className={`px-4 py-2 text-sm font-medium rounded-full transition-colors ${
              selectedCategory === category.name
                ? 'bg-foreground text-background'
                : 'bg-background text-foreground hover:bg-muted'
            }`}
          >
            {category.name}
          </button>
        ))}
      </div>
      <div className="relative max-w-lg mx-auto">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
        <Input
          type="text"
          placeholder="Search articles..."
          value={searchTerm}
          onChange={(e) => onSearchTermChange(e.target.value)}
          className="pl-12 pr-10 py-3 text-base rounded-full"
        />
        {searchTerm && (
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8 rounded-full"
            onClick={() => onSearchTermChange('')}
          >
            <X className="w-4 h-4" />
          </Button>
        )}
      </div>
    </div>
  );
};

export default FilterBar; 