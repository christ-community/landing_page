'use client';

import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import type { ImpactStory } from '@/types';
import type { IHelpImpact } from '../../../../../types/contentful';

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
  helpImpact?: IHelpImpact[];
}

export default function ImpactSection({ stories = defaultStories, helpImpact }: ImpactSectionProps) {
  return (
    <section className="section bg-muted/20">
      <div className="section-inner">
        <div className="text-center stack-lg mb-12">
          <div className="stack">
            <p className="eyebrow">Impact</p>
            <h2 className="section-title">Where Your Help Goes</h2>
          </div>
          <p className="section-lead max-w-3xl mx-auto">
            Your generosity isn't just a number—it's a story of changed lives and transformed communities.
          </p>
        </div>

        {/* Impact Stories */}
        <div className="space-y-16">
          {stories.map((story, index) => (
            <div key={story.id} className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${index % 2 !== 0 ? 'lg:grid-flow-col-dense' : ''}`}>
              {/* Image Side */}
              <div className={`relative h-96 lg:h-[500px] ${index % 2 !== 0 ? 'lg:order-2' : ''}`}>
                <div className="relative w-full h-full rounded-[var(--radius)] overflow-hidden border border-border/40 shadow-sm">
                  <Image
                    src={story.image}
                    alt={story.title}
                    fill
                    className="object-cover"
                  />
                </div>
              </div>

              {/* Content Side */}
              <div className="space-y-6">
                <h3 className="text-2xl font-semibold text-foreground">{story.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{story.description}</p>
                <div className="flex items-center gap-6 pt-4">
                  <div className="text-center">
                    <div className="text-4xl font-semibold text-foreground">
                      {story.stat.value}
                    </div>
                    <div className="text-sm font-semibold text-muted-foreground tracking-wider uppercase">{story.stat.label}</div>
                  </div>
                  <Button variant="outline">Read Full Story</Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
} 
