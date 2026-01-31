'use client';

import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Quote, Calendar, Heart } from 'lucide-react';
import type { ITestimonial } from '../../types/contentful';
import { processAsset } from '@/lib/contentful-utils';

interface TestimonialsSectionProps {
  title?: string;
  subtitle?: string;
  testimonials: ITestimonial[];
}

export default function TestimonialsSection({ 
  title = "Community Voices", 
  subtitle = "Hear from our amazing community members",
  testimonials 
}: TestimonialsSectionProps) {
  return (
    <section className="section">
      <div className="section-inner">
        <div className="text-center stack-lg mb-12">
          <div className="stack">
            <p className="eyebrow">Stories</p>
            <h2 className="section-title">{title}</h2>
          </div>
          <p className="section-lead max-w-3xl mx-auto">{subtitle}</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="relative overflow-hidden border-border/40 bg-card transition-all duration-300 hover:shadow-md flex flex-col">
              <div className="absolute top-6 right-6 text-muted-foreground/20">
                <Quote className="w-10 h-10" />
              </div>
              <CardContent className="p-6 flex flex-col flex-grow gap-6">
                <div className="flex items-center gap-4">
                  <div className="relative w-16 h-16 rounded-full overflow-hidden border border-border/40 shadow-sm">
                    <Image
                      src={typeof testimonial.image === 'string' ? testimonial.image : (processAsset(testimonial.image) || '/Church-Conference.jpg')}
                      alt={testimonial.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-foreground">{testimonial.name}</h4>
                    <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                  </div>
                </div>
                <blockquote className="text-muted-foreground italic flex-grow">
                  "{testimonial.quote}"
                </blockquote>
                <div className="flex flex-wrap gap-2 pt-4 border-t border-border/20">
                  {testimonial.volunteeredSince && (
                    <Badge variant="outline" className="text-xs">
                      <Calendar className="w-3 h-3 mr-2" />
                      {testimonial.volunteeredSince} volunteering
                    </Badge>
                  )}
                  {testimonial.favoriteActivity && (
                    <Badge variant="outline" className="text-xs">
                      <Heart className="w-3 h-3 mr-2" />
                      {testimonial.favoriteActivity}
                    </Badge>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
