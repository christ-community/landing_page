'use client';

import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import Image from 'next/image';
import Link from 'next/link';
import { Search, ArrowRight, BookOpen, Video as VideoIcon, Mic, FileText, Library } from 'lucide-react';
import type { HealingResource, ResourceFormat } from '@/types';

interface ResourceListProps {
  resources: HealingResource[];
}

const formats: ResourceFormat[] = ['Article', 'Video', 'Podcast', 'Guide'];
const formatIcons = {
    Article: BookOpen,
    Video: VideoIcon,
    Podcast: Mic,
    Guide: FileText
};

function ResourceCard({ resource }: { resource: HealingResource }) {
  const FormatIcon = formatIcons[resource.format];
  return (
    <Card className="group overflow-hidden flex flex-col transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
      <div className="relative h-56">
        <Image src={resource.image} alt={resource.title} fill className="object-cover group-hover:scale-105 transition-transform"/>
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
        <Badge className="absolute top-4 left-4 flex items-center gap-2">
            <FormatIcon className="w-4 h-4" />
            {resource.format}
        </Badge>
      </div>
      <div className="p-6 flex flex-col flex-grow">
        <h3 className="text-xl font-bold text-foreground line-clamp-2 mb-2">{resource.title}</h3>
        <p className="text-muted-foreground text-sm line-clamp-3 mb-6 flex-grow">{resource.description}</p>
        <div className="flex flex-wrap gap-2 mb-6">
            {resource.tags.map(tag => <Badge key={tag} variant="secondary">{tag}</Badge>)}
        </div>
        <Button asChild className="mt-auto w-full group/btn">
            <Link href={resource.href}>
                Read More <ArrowRight className="w-4 h-4 ml-2 group-hover/btn:translate-x-1 transition-transform" />
            </Link>
        </Button>
      </div>
    </Card>
  )
}

export default function ResourceList({ resources }: ResourceListProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [formatFilter, setFormatFilter] = useState<ResourceFormat | 'all'>('all');

  const filteredResources = resources.filter(resource => {
    return (
      (resource.title.toLowerCase().includes(searchTerm.toLowerCase()) || resource.description.toLowerCase().includes(searchTerm.toLowerCase())) &&
      (formatFilter === 'all' || resource.format === formatFilter)
    );
  });

  return (
    <div className="py-24 bg-background">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="grid lg:grid-cols-4 gap-8 items-start">
          {/* Filters - Left Sidebar */}
          <aside className="lg:col-span-1">
            <div className="p-6 bg-muted/40 rounded-xl sticky top-24">
              <h3 className="text-xl font-bold mb-6">Filter Resources</h3>
              <div className="space-y-6">
                <div>
                  <label className="text-sm font-medium mb-2 block">Search</label>
                  <div className="relative">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                      <Input 
                          placeholder="Resource name..." 
                          className="pl-10"
                          value={searchTerm}
                          onChange={(e) => setSearchTerm(e.target.value)}
                      />
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">Format</label>
                  <Select value={formatFilter} onValueChange={(val) => setFormatFilter(val as any)}>
                      <SelectTrigger>
                          <SelectValue placeholder="All Formats"/>
                      </SelectTrigger>
                      <SelectContent>
                          <SelectItem value="all">All Formats</SelectItem>
                          {formats.map(format => <SelectItem key={format} value={format}>{format}</SelectItem>)}
                      </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          </aside>

          {/* Resource Grid - Right Side */}
          <main className="lg:col-span-3">
            {filteredResources.length > 0 ? (
                <div className="grid md:grid-cols-2 gap-8">
                    {filteredResources.map(resource => (
                        <ResourceCard key={resource.id} resource={resource} />
                    ))}
                </div>
            ) : (
                <div className="text-center py-20 bg-muted/20 rounded-xl">
                    <Library className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
                    <h3 className="text-2xl font-bold text-foreground">No Resources Found</h3>
                    <p className="text-muted-foreground mt-2">
                        Try adjusting your search or filters. New resources are added regularly!
                    </p>
                </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
} 