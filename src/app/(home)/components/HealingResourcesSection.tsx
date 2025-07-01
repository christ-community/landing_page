import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import type { HealingResource } from '@/types';

const resources: HealingResource[] = [
  {
    title: 'Peace in the Storm',
    imageSrc: '/worship-conference.jpeg',
    format: 'PDF',
    description: 'A devotional guide to finding God\'s peace amid life\'s hardest moments.',
  },
  {
    title: 'Healing Scriptures',
    imageSrc: '/Church-Conference.jpg',
    format: 'Audio',
    description: 'Soak in curated Bible verses read aloud to strengthen your faith for healing.',
  },
  {
    title: 'Restoration Series',
    imageSrc: '/worship-conference.jpeg',
    format: 'Video',
    description: 'Teaching series focused on emotional and spiritual restoration through Christ.',
  },
];

export default function HealingResourcesSection() {
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="mb-12 text-center max-w-2xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight leading-tight mb-4 text-foreground">
            Healing Resources for Your Journey
          </h2>
          <p className="text-lg text-muted-foreground">
            Find encouragement, scripture-based tools, and practical help.
          </p>
        </div>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {resources.map(({ title, imageSrc, format, description }) => (
            <Card
              key={title}
              className="relative min-h-[26rem] overflow-hidden rounded-xl group cursor-pointer shadow-xl"
            >
              {/* Background image fills card */}
              <Image
                src={imageSrc}
                alt={title}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-110"
              />

              {/* Sliding panel */}
              <div className="absolute inset-0 flex flex-col justify-end translate-y-full group-hover:translate-y-0 transition-transform duration-500">
                <div className="bg-white/60 dark:bg-black/50 backdrop-blur-md ring-1 ring-white/40 dark:ring-black/40 p-6 flex flex-col gap-4 min-h-[55%]">
                  <span className="px-2 py-0.5 w-max text-xs font-medium uppercase rounded bg-tertiary text-tertiary-foreground">
                    {format}
                  </span>
                  <h3 className="text-lg font-semibold text-foreground">
                    {title}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {description}
                  </p>
                  <Button
                    size="sm"
                    className="w-fit bg-tertiary text-tertiary-foreground hover:bg-tertiary/90 mt-1"
                  >
                    View Resource
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
} 