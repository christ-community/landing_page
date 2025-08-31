import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { MapPin, Phone, Globe, Clock, ChevronRight } from 'lucide-react';
import type { Church } from '@/types';

interface ChurchCardProps {
  church: Church;
  isSelected: boolean;
  onClick: () => void;
  onGetDirections: () => void;
}

export default function ChurchCard({ church, isSelected, onClick, onGetDirections }: ChurchCardProps) {
  return (
    <Card 
      className={`group cursor-pointer transition-all duration-300 hover:shadow-lg ${
        isSelected ? 'ring-2 ring-blue-500' : ''
      }`}
      onClick={onClick}
    >
      <CardHeader className="pb-3">
        <div className="flex justify-between items-start">
          <div className="flex-1">
            <CardTitle className="text-lg font-bold text-foreground group-hover:text-blue-600 transition-colors">
              {church.name}
            </CardTitle>
            <CardDescription className="text-sm text-muted-foreground mt-1">
              {church.denomination}{church.distance ? ` • ${church.distance.toFixed(1)} miles away` : ''}
            </CardDescription>
          </div>
          <ChevronRight className="w-5 h-5 text-muted-foreground group-hover:text-blue-600 transition-colors" />
        </div>
      </CardHeader>
      
      <CardContent className="space-y-3">
        <div className="flex items-start space-x-2">
          <MapPin className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
          <span className="text-sm text-muted-foreground">
            {church.address.street}, {church.address.city}, {church.address.postcode}
          </span>
        </div>
        
        {church.services.sunday && (
          <div className="flex items-center space-x-2">
            <Clock className="w-4 h-4 text-green-600 flex-shrink-0" />
            <span className="text-sm text-muted-foreground">
              Sunday: {church.services.sunday}
            </span>
          </div>
        )}
        
        {church.contact.phone && (
          <div className="flex items-center space-x-2">
            <Phone className="w-4 h-4 text-orange-600 flex-shrink-0" />
            <span className="text-sm text-muted-foreground">
              {church.contact.phone}
            </span>
          </div>
        )}
        
        <div className="flex gap-2 mt-4">
          <Button 
            size="sm" 
            className="bg-blue-600 hover:bg-blue-700 text-white"
            onClick={(e) => {
              e.stopPropagation();
              onGetDirections();
            }}
          >
            Get Directions
          </Button>
          {church.contact.website && (
            <Button size="sm" variant="outline" asChild>
              <Link href={church.contact.website} target="_blank" onClick={(e) => e.stopPropagation()}>
                <Globe className="w-4 h-4 mr-1" />
                Website
              </Link>
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
} 