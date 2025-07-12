import { Megaphone, Box, HeartPulse, BookOpen, PenLine, Handshake } from "lucide-react";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import type { MinistryActivity } from "@/types";

const activities: MinistryActivity[] = [
  {
    title: "Outreach & Evangelism",
    description:
      "Sharing the gospel through community events, street evangelism, and personal connections.",
    icon: Megaphone,
  },
  {
    title: "Missionary Support (Help Code)",
    description:
      "Providing resources and assistance to missionaries serving locally and abroad.",
    icon: Box,
  },
  {
    title: "Healing & Lifting Resources",
    description:
      "Offering counseling, prayer, and practical support for spiritual and emotional healing.",
    icon: HeartPulse,
  },
  {
    title: "Tract Distribution",
    description:
      "Equipping believers with gospel literature to spread the Good News in their circles.",
    icon: BookOpen,
  },
  {
    title: "Blog & Teachings",
    description:
      "Publishing insightful articles and teachings to deepen understanding of God's Word.",
    icon: PenLine,
  },
  {
    title: "Consultation Services",
    description:
      "Guidance and mentorship for churches and individuals seeking direction and growth.",
    icon: Handshake,
  },
];

export default function WhatWeDoSection() {
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="mb-12 grid lg:grid-cols-2 gap-8 items-center">
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight leading-tight text-foreground">
            What we do
          </h2>
          <p className="text-lg text-muted-foreground max-w-xl">
            Our ministry is multifaceted. Through the initiatives below, we aim to
            reach hearts, uplift spirits, and equip believers for impactful
            service.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {activities.map(({ title, description, icon: Icon }) => (
            <Card
              key={title}
              className={cn(
                "group relative overflow-hidden border border-border/10 bg-card p-8 transition-all duration-300 hover:border-tertiary/40 hover:shadow-lg rounded-xl"
              )}
            >
              <Icon className="h-10 w-10 text-tertiary mb-6" />
              <h3 className="text-xl font-semibold mb-4 text-foreground">
                {title}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {description}
              </p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
} 