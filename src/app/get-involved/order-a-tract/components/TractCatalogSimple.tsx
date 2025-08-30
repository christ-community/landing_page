'use client';

import React from 'react';
import type { ITract } from '../../../../../types/contentful';

interface TractCatalogProps {
  tracts?: any[];
  contentfulTracts?: ITract[];
}

export default function TractCatalogSimple({ tracts = [], contentfulTracts = [] }: TractCatalogProps) {
  console.log('TractCatalogSimple rendering');
  console.log('Tracts:', tracts.length);
  console.log('Contentful tracts:', contentfulTracts.length);

  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-6">
        <h2 className="text-4xl font-bold text-center mb-8">Tract Catalog (Test)</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {contentfulTracts.map((tract, index) => (
            <div key={index} className="border p-4 rounded">
              <h3 className="font-bold">{tract.title}</h3>
              <p className="text-sm text-gray-600">{tract.description}</p>
              <p className="text-xs">Price: ${(tract.pricePer100 / 100).toFixed(2)}</p>
              <p className="text-xs">Language: {tract.language}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}