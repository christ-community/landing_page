'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Eye, FileText, Languages, Search, Star, Download, ShoppingCart } from 'lucide-react';
import type { Tract } from '@/types';
import { useRouter } from 'next/navigation';

// Dummy Data
const allTracts: Tract[] = [
  { id: '1', title: "The Four Spiritual Laws", description: "A classic and effective presentation of the gospel message.", coverImage: "/Church-Conference.jpg", tags: ["Foundation", "Classic"], samplePages: [], pricePer100: 15.00, isPopular: true, language: "English" },
  { id: '2', title: "More Than a Carpenter", description: "Explores the claims of Jesus Christ and their validity.", coverImage: "/worship-conference.jpeg", tags: ["Apologetics", "Youth"], samplePages: [], pricePer100: 18.00, isPopular: true, language: "English" },
  { id: '3', title: "The Case for Christ", description: "A journalist's investigation into the evidence for Jesus.", coverImage: "/Church-Conference.jpg", tags: ["Apologetics", "Skeptics"], samplePages: [], pricePer100: 20.00, isPopular: false, language: "English" },
  { id: '4', title: "God's Love Story", description: "A simple, narrative-driven tract about God's love.", coverImage: "/worship-conference.jpeg", tags: ["Story", "Children"], samplePages: [], pricePer100: 12.00, isPopular: false, language: "English" },
  { id: '5', title: "Las Cuatro Leyes Espirituales", description: "A classic and effective presentation of the gospel message.", coverImage: "/Church-Conference.jpg", tags: ["Foundation", "Classic"], samplePages: [], pricePer100: 15.00, isPopular: false, language: "Spanish" },
  { id: '6', title: "Finding Hope", description: "A tract designed for those going through difficult times.", coverImage: "/worship-conference.jpeg", tags: ["Hope", "Outreach"], samplePages: [], pricePer100: 16.00, isPopular: true, language: "English" },
];

export default function TractCatalog() {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState('');
  const [languageFilter, setLanguageFilter] = useState('all');
  const [tagFilter, setTagFilter] = useState('all');

  const tags = ['all', 'Foundation', 'Classic', 'Apologetics', 'Youth', 'Skeptics', 'Story', 'Children', 'Hope', 'Outreach'];

  const filteredTracts = allTracts.filter(tract => {
    return (
      (tract.title.toLowerCase().includes(searchTerm.toLowerCase()) || tract.description.toLowerCase().includes(searchTerm.toLowerCase())) &&
      (languageFilter === 'all' || tract.language === languageFilter) &&
      (tagFilter === 'all' || tract.tags.includes(tagFilter))
    );
  });

  const handleSelectTract = (tractId: string) => {
    router.push(`/get-involved/order-a-tract?selectedTractId=${tractId}#order-form`);
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
                    <Button variant="outline" className="flex-1">
                      <Eye className="w-4 h-4 mr-2" />
                      Preview
                    </Button>
                    <Button variant="secondary" className="flex-1">
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
    </section>
  );
} 