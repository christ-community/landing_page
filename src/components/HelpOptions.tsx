'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { ArrowRight, Gift, Handshake, ShieldCheck } from 'lucide-react';
import type { SupportOption } from '@/types';

const iconMap = {
  Gift,
  Handshake,
  ShieldCheck,
};

interface HelpOptionsProps {
  title: string;
  subtitle: string;
  options: SupportOption[];
}

export default function HelpOptions({ title, subtitle, options }: HelpOptionsProps) {
  return (
    <section className="py-24 bg-background" data-section="help-options">
      <div className="container mx-auto px-6 lg:px-12">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-foreground">{title}</h2>
          <p className="text-xl text-muted-foreground mt-4 max-w-3xl mx-auto">
            {subtitle}
          </p>
        </div>

        {/* Options Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {options.map((option) => {
            const Icon = iconMap[option.icon as keyof typeof iconMap];
            return (
              <Card key={option.id} className="group flex flex-col justify-between overflow-hidden hover:shadow-2xl transition-all duration-300 bg-card border border-border/10 rounded-2xl hover:-translate-y-2">
                <CardHeader>
                  <div className={`inline-flex p-4 rounded-xl mb-6 ${option.bgColor}`}>
                    {Icon && <Icon className={`w-8 h-8 ${option.color}`} />}
                  </div>
                  <CardTitle className="text-2xl font-bold text-foreground">{option.title}</CardTitle>
                  <CardDescription className="text-base leading-relaxed pt-2">
                    {option.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button className="w-full bg-red-600 hover:bg-red-700 text-white">
                    {option.ctaText}
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>
    </section>
  );
} 