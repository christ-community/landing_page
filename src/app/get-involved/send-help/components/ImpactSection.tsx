'use client';

import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import type { ImpactStory } from '@/types';

const defaultStories: ImpactStory[] = [
  {
    id: '1',
    title: "Missionary Support in South Asia",
    description: "Our partners' contributions enabled us to fully fund a missionary family for a year, providing them with housing, resources, and educational materials. This support led to the establishment of three new house churches in unreached villages.",
    image: "/Church-Conference.jpg",
    stat: { value: "3", label: "New House Churches" }
  },
  {
    id: '2',
    title: "Local Community Food Bank",
    description: "With the help of generous donors, we launched a weekly food bank that now serves over 200 families in our local community, providing essential groceries and a message of hope. It has become a vital resource for many.",
    image: "/worship-conference.jpeg",
    stat: { value: "10,000+", label: "Meals Served Monthly" }
  },
];

interface ImpactSectionProps {
  stories?: ImpactStory[];
}

export default function ImpactSection({ stories = defaultStories }: ImpactSectionProps) {
  return (
    <section className="py-24 bg-muted/30">
      <div className="container mx-auto px-6 lg:px-12">
        {/* Header */}
        <div className="text-center mb-16">
          <Badge className="mb-4 bg-gradient-to-r from-pink-500 to-purple-500 text-white border-0 text-sm px-4 py-2">
            Real-Life Impact
          </Badge>
          <h2 className="text-4xl lg:text-5xl font-bold text-foreground">Where Your Help Goes</h2>
          <p className="text-xl text-muted-foreground mt-4 max-w-3xl mx-auto">
            Your generosity isn't just a number—it's a story of changed lives and transformed communities.
          </p>
        </div>

        {/* Impact Stories */}
        <div className="space-y-20">
          {stories.map((story, index) => (
            <div key={story.id} className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${index % 2 !== 0 ? 'lg:grid-flow-col-dense' : ''}`}>
              {/* Image Side */}
              <div className={`relative h-96 lg:h-[500px] ${index % 2 !== 0 ? 'lg:order-2' : ''}`}>
                <div className="absolute inset-0 bg-gradient-to-br from-red-200 to-pink-200 dark:from-red-900/30 dark:to-pink-900/30 rounded-3xl transform -rotate-3"></div>
                <div className="relative w-full h-full rounded-3xl overflow-hidden shadow-2xl transform rotate-2">
                  <Image
                    src={story.image}
                    alt={story.title}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent"></div>
                </div>
              </div>

              {/* Content Side */}
              <div className="space-y-6">
                <h3 className="text-3xl font-bold text-foreground">{story.title}</h3>
                <p className="text-lg text-muted-foreground leading-relaxed">{story.description}</p>
                <div className="flex items-center gap-6 pt-4">
                  <div className="text-center">
                    <div className="text-5xl font-extrabold bg-gradient-to-r from-rose-600 via-red-600 to-pink-600 bg-clip-text text-transparent">
                      {story.stat.value}
                    </div>
                    <div className="text-sm font-semibold text-muted-foreground tracking-wider uppercase">{story.stat.label}</div>
                  </div>
                  <Button variant="outline" className="border-2 border-rose-200 dark:border-rose-800">Read Full Story</Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
} 