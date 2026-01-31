'use client';

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import type { ActivityCardItem } from "@/types";
import Link from "next/link";
import { ArrowRight, BookOpen, CalendarCheck2, Handshake, HeartHandshake } from "lucide-react";

interface ActivityGridProps {
    title: string;
    subtitle: string;
    items: ActivityCardItem[];
}

const iconMap = {
    BookOpen,
    CalendarCheck2,
    Handshake,
    HeartHandshake
};

export default function ActivityGrid({ title, subtitle, items }: ActivityGridProps) {
    return (
        <section className="section">
            <div className="section-inner">
                <div className="text-center stack-lg mb-12 max-w-4xl mx-auto">
                    <div className="stack">
                        <p className="eyebrow">Our Ministries</p>
                        <h2 className="section-title">{title}</h2>
                    </div>
                    <p className="section-lead">{subtitle}</p>
                </div>
                <div className="grid md:grid-cols-2 gap-6">
                    {items.map((item, index) => {
                        const Icon = iconMap[item.icon as keyof typeof iconMap];
                        return (
                            <Card key={index} className="p-6 flex flex-col items-start border-border/40 transition-all duration-300 hover:shadow-md">
                                <div className="p-3 bg-muted rounded-[var(--radius)] mb-6">
                                    {Icon && <Icon className="w-6 h-6 text-foreground" />}
                                </div>
                                <h3 className="text-xl font-semibold mb-3">{item.title}</h3>
                                <p className="text-muted-foreground flex-grow mb-6">{item.description}</p>
                                <Button asChild variant="ghost" className="mt-auto group">
                                    <Link href={item.href}>
                                        {item.ctaText}
                                        <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                                    </Link>
                                </Button>
                            </Card>
                        )
                    })}
                </div>
            </div>
        </section>
    );
}
