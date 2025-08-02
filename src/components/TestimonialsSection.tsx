'use client';

import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Quote, Star, Calendar, Heart } from 'lucide-react';
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
    <section className="py-24 bg-muted/30">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-foreground">
            {title}
          </h2>
          <p className="text-xl text-muted-foreground mt-4 max-w-3xl mx-auto">
            {subtitle}
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="relative overflow-hidden border border-border/10 bg-card transition-all duration-300 hover:shadow-lg rounded-xl flex flex-col">
              <div className="absolute top-6 right-6 text-gray-200 dark:text-gray-700">
                <Quote className="w-10 h-10" />
              </div>
              <CardContent className="p-8 flex flex-col flex-grow">
                <div className="flex items-center mb-6">
                  <div className="relative w-16 h-16 rounded-full overflow-hidden mr-4 border-2 border-white dark:border-gray-800 shadow-md">
                    <Image
                      src={typeof testimonial.image === 'string' ? testimonial.image : (processAsset(testimonial.image) || '/Church-Conference.jpg')}
                      alt={testimonial.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <h4 className="font-bold text-foreground text-lg">
                      {testimonial.name}
                    </h4>
                    <p className="text-sm text-primary font-medium">
                      {testimonial.role}
                    </p>
                  </div>
                </div>
                <blockquote className="text-muted-foreground leading-relaxed mb-6 italic flex-grow">
                  "{testimonial.quote}"
                </blockquote>
                <div className="flex flex-wrap gap-2 pt-4 border-t border-border/10">
                  {testimonial.volunteeredSince && (
                    <Badge variant="outline" className="text-xs">
                      <Calendar className="w-3 h-3 mr-1.5" />
                      {testimonial.volunteeredSince} volunteering
                    </Badge>
                  )}
                  {testimonial.favoriteActivity && (
                    <Badge variant="outline" className="text-xs">
                      <Heart className="w-3 h-3 mr-1.5" />
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