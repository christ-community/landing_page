'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogClose } from '@/components/ui/dialog';
import { Eye, FileText, Languages, Search, Star, Download, ShoppingCart, X, ChevronLeft, ChevronRight } from 'lucide-react';
import type { Tract } from '@/types';
import type { ITract } from '../../../../../types/contentful';
import { useRouter } from 'next/navigation';


interface TractCatalogProps {
  tracts?: Tract[];
  contentfulTracts?: ITract[];
}

export default function TractCatalog({ tracts = [], contentfulTracts = [] }: TractCatalogProps) {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState('');
  const [languageFilter, setLanguageFilter] = useState('all');
  const [tagFilter, setTagFilter] = useState('all');
  const [previewTract, setPreviewTract] = useState<any>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const tags = ['all', 'Foundation', 'Classic', 'Apologetics', 'Youth', 'Skeptics', 'Story', 'Children', 'Hope', 'Outreach'];

  // Convert Contentful tracts to local format for display
  const allTracts = React.useMemo(() => [
    ...tracts,
    ...contentfulTracts.map(tract => ({
      id: (tract as any).sys?.id || Math.random().toString(),
      title: tract.title,
      description: tract.description,
      coverImage: (tract as any).processedCoverImage || '/Church-Conference.jpg',
      tags: tract.tags || [],
      samplePages: (tract as any).processedSamplePages || [],
      pricePer100: tract.pricePer100,
      isPopular: tract.isPopular,
      language: tract.language
    }))
  ], [tracts, contentfulTracts]);

  const filteredTracts = React.useMemo(() => {
    return allTracts.filter(tract => {
      return (
        (tract.title.toLowerCase().includes(searchTerm.toLowerCase()) || tract.description.toLowerCase().includes(searchTerm.toLowerCase())) &&
        (languageFilter === 'all' || tract.language === languageFilter) &&
        (tagFilter === 'all' || tract.tags.includes(tagFilter))
      );
    });
  }, [allTracts, searchTerm, languageFilter, tagFilter]);

  const handleSelectTract = (tractId: string) => {
    router.push(`/get-involved/order-a-tract?selectedTractId=${tractId}#order-form`);
  };

  const handlePreview = (tract: any) => {
    console.log('Preview clicked for tract:', tract.title);
    console.log('Sample pages:', tract.samplePages);
    setPreviewTract(tract);
    setCurrentImageIndex(0);
  };

  const handleDownload = async (tract: any) => {
    console.log('Download clicked for tract:', tract.title);
    console.log('Sample pages:', tract.samplePages);
    
    // Get all images (cover + sample pages)
    const allImages = [tract.coverImage, ...(tract.samplePages || [])].filter(Boolean);
    
    if (allImages.length === 0) {
      alert('No images available for download');
      return;
    }

    // Download all images
    for (let i = 0; i < allImages.length; i++) {
      const imageUrl = allImages[i];
      if (imageUrl) {
        try {
          const response = await fetch(imageUrl);
          const blob = await response.blob();
          const url = window.URL.createObjectURL(blob);
          const link = document.createElement('a');
          link.href = url;
          link.download = `${tract.title}-${i === 0 ? 'cover' : `page-${i}`}.${blob.type.split('/')[1] || 'jpg'}`;
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
          window.URL.revokeObjectURL(url);
          
          // Small delay between downloads to avoid overwhelming the browser
          if (i < allImages.length - 1) {
            await new Promise(resolve => setTimeout(resolve, 500));
          }
        } catch (error) {
          console.error(`Failed to download image ${i + 1}:`, error);
        }
      }
    }
  };

  return (
    <section className="py-24 bg-background" data-section="tract-catalog">
      <div className="container mx-auto px-6 lg:px-12">
        {/* Header and Filters */}
        <div className="mb-12">
          <div className="text-center mb-8">
            <h2 className="text-4xl lg:text-5xl font-bold text-foreground">Our Tract Catalog</h2>
            <p className="text-xl text-muted-foreground mt-4 max-w-3xl mx-auto">
              Browse our collection of gospel tracts. Use the filters to find the perfect one for your ministry needs.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 bg-muted/50 rounded-xl border border-border/10">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search by keyword..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={languageFilter} onValueChange={setLanguageFilter}>
              <SelectTrigger>
                <Languages className="w-5 h-5 mr-2 text-muted-foreground" />
                <SelectValue placeholder="Filter by language" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Languages</SelectItem>
                <SelectItem value="English">English</SelectItem>
                <SelectItem value="Spanish">Spanish</SelectItem>
              </SelectContent>
            </Select>
            <Select value={tagFilter} onValueChange={setTagFilter}>
              <SelectTrigger>
                <FileText className="w-5 h-5 mr-2 text-muted-foreground" />
                <SelectValue placeholder="Filter by tag" />
              </SelectTrigger>
              <SelectContent>
                {tags.map(tag => (
                  <SelectItem key={tag} value={tag}>{tag === 'all' ? 'All Tags' : tag}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Tracts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredTracts.map((tract) => (
            <Card key={tract.id} className="group overflow-hidden flex flex-col justify-between hover:shadow-xl transition-all duration-300 bg-card border border-border/10 rounded-xl">
              <div>
                <CardHeader className="p-0">
                  <div className="relative h-56">
                    <Image
                      src={tract.coverImage}
                      alt={tract.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                    {tract.isPopular && (
                      <Badge className="absolute top-4 left-4 bg-gradient-to-r from-amber-500 to-yellow-400 text-white">
                        <Star className="w-4 h-4 mr-2" />
                        Popular
                      </Badge>
                    )}
                  </div>
                </CardHeader>
                <CardContent className="p-6 space-y-4">
                  <CardTitle className="text-xl font-bold text-foreground group-hover:text-red-600 transition-colors">
                    {tract.title}
                  </CardTitle>
                  <CardDescription className="leading-relaxed line-clamp-3">
                    {tract.description}
                  </CardDescription>
                  <div className="flex flex-wrap gap-2">
                    {tract.tags.map(tag => (
                      <Badge key={tag} variant="secondary">{tag}</Badge>
                    ))}
                    <Badge variant="outline">{tract.language}</Badge>
                  </div>
                  <div className="text-2xl font-bold text-foreground pt-2">
                    ${(tract.pricePer100 / 100).toFixed(2)}
                    <span className="text-sm font-normal text-muted-foreground ml-1">/ tract</span>
                  </div>
                </CardContent>
              </div>
              <div className="p-6 pt-0 flex flex-col gap-2">
                <Button className="w-full bg-red-600 hover:bg-red-700 text-white" onClick={() => handleSelectTract(tract.id)}>
                  <ShoppingCart className="w-4 h-4 mr-2" />
                  Request This Tract
                </Button>
                <div className="flex gap-2">
                    <Button variant="outline" className="flex-1" onClick={() => handlePreview(tract)}>
                      <Eye className="w-4 h-4 mr-2" />
                      Preview
                    </Button>
                    <Button variant="secondary" className="flex-1" onClick={() => handleDownload(tract)}>
                        <Download className="w-4 h-4 mr-2" />
                        Download
                    </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {filteredTracts.length === 0 && (
          <div className="text-center py-20 col-span-full">
            <Search className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
            <h3 className="text-2xl font-bold text-foreground">No Tracts Found</h3>
            <p className="text-muted-foreground mt-2">
              Try adjusting your search or filters to find what you're looking for.
            </p>
          </div>
        )}
      </div>

      {/* Custom Full-Screen Tract Preview */}
      {previewTract && (
        <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center">
          {/* Close button at top right */}
          <Button 
            variant="ghost" 
            size="icon" 
            className="absolute top-4 right-4 z-10 bg-white/90 hover:bg-white shadow-md rounded-full w-10 h-10"
            onClick={() => setPreviewTract(null)}
          >
            <X className="h-5 w-5" />
          </Button>
          
          {/* Main content container */}
          <div className="w-[75vw] h-[80vh] bg-white rounded-lg shadow-2xl relative overflow-hidden">
            {/* Header */}
            <div className="p-6 pb-2 bg-white border-b">
              <h2 className="text-2xl font-bold pr-12">{previewTract.title}</h2>
              <p className="text-muted-foreground">{previewTract.description}</p>
            </div>
            
            {/* Tract content area */}
            <div className="flex-1 relative bg-gray-100 flex items-center justify-center overflow-hidden" style={{ width: '100%', height: 'calc(100% - 140px)' }}>
              <div className="bg-transparent rounded-lg shadow-xl p-4 max-w-[80%] max-h-[80%] flex items-center justify-center relative">
                {(() => {
                  const allImages = [...(previewTract.samplePages || [])].filter(Boolean);
                  if (allImages.length === 0) {
                    return (
                      <div className="text-center p-8">
                        <FileText className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
                        <p className="text-muted-foreground">No images available for preview</p>
                      </div>
                    );
                  }
                  
                  return (
                    <>
                      <img
                        src={allImages[currentImageIndex]}
                        alt={`${previewTract.title} - Page ${currentImageIndex + 1}`}
                        className="max-w-full max-h-[70vh] object-contain"
                      />
                      
                      {allImages.length > 1 && (
                        <>
                          <Button
                            variant="outline"
                            size="icon"
                            className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white shadow-md w-8 h-8"
                            onClick={() => setCurrentImageIndex(prev => prev === 0 ? allImages.length - 1 : prev - 1)}
                            disabled={allImages.length <= 1}
                          >
                            <ChevronLeft className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="outline"
                            size="icon"
                            className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white shadow-md w-8 h-8"
                            onClick={() => setCurrentImageIndex(prev => prev === allImages.length - 1 ? 0 : prev + 1)}
                            disabled={allImages.length <= 1}
                          >
                            <ChevronRight className="h-4 w-4" />
                          </Button>
                        </>
                      )}
                    </>
                  );
                })()}
              </div>
            </div>
            
            {/* Footer */}
            <div className="p-6 border-t bg-gray-100 relative min-h-[80px] z-10">
              {(() => {
                const allImages = [...(previewTract.samplePages || [])].filter(Boolean);
                return (
                  <>
                    {allImages.length > 1 && (
                      <div className="flex items-center justify-center gap-4 mb-4">
                        <span className="text-sm text-muted-foreground">
                          {currentImageIndex + 1} of {allImages.length}
                        </span>
                        <div className="flex gap-1">
                          {allImages.map((_, index) => (
                            <button
                              key={index}
                              className={`w-2 h-2 rounded-full transition-colors ${
                                index === currentImageIndex ? 'bg-primary' : 'bg-muted-foreground/30'
                              }`}
                              onClick={() => setCurrentImageIndex(index)}
                            />
                          ))}
                        </div>
                      </div>
                    )}
                  </>
                );
              })()}
            </div>
          </div>
        </div>
      )}
    </section>
  );
} 