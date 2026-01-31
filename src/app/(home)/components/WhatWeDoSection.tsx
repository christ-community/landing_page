import { Megaphone, Box, HeartPulse, BookOpen, PenLine, Handshake } from "lucide-react";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import type { IMinistryActivity } from "../../../../types/contentful";

// Icon mapping for ministry activities
const iconMap: Record<string, any> = {
  'megaphone': Megaphone,
  'box': Box,
  'heartpulse': HeartPulse,
  'bookopen': BookOpen,
  'penline': PenLine,
  'handshake': Handshake,
};

interface WhatWeDoSectionProps {
  activities: IMinistryActivity[];
}

export default function WhatWeDoSection({ activities }: WhatWeDoSectionProps) {
  return (
    <section className="section">
      <div className="section-inner">
        <div className="grid lg:grid-cols-2 gap-8 items-center mb-12">
          <div className="stack">
            <p className="eyebrow">What We Do</p>
            <h2 className="section-title">What we do</h2>
          </div>
          <p className="section-lead max-w-xl">
            Our ministry is multifaceted. Through the initiatives below, we aim to
            reach hearts, uplift spirits, and equip believers for impactful
            service.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {activities.map((activity) => {
            const Icon = iconMap[activity.icon?.toLowerCase()] || Megaphone;
            return (
              <Card
                key={activity.title}
                className={cn(
                  "group relative overflow-hidden border border-border/40 bg-card p-6 transition-all duration-300 hover:shadow-md"
                )}
              >
                <Icon className="h-8 w-8 text-primary mb-6" />
                <h3 className="text-xl font-semibold mb-4 text-foreground">
                  {activity.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {activity.description}
                </p>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
} 
