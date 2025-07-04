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
        <section className="py-24 bg-background">
            <div className="container mx-auto px-6 lg:px-12">
                <div className="text-center mb-16 max-w-4xl mx-auto">
                    <h2 className="text-4xl lg:text-5xl font-bold text-foreground">
                        {title}
                    </h2>
                    <p className="text-xl text-muted-foreground mt-4">
                        {subtitle}
                    </p>
                </div>
                <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8">
                    {items.map((item, index) => {
                        const Icon = iconMap[item.icon as keyof typeof iconMap];
                        return (
                            <Card key={index} className="p-8 flex flex-col items-start rounded-2xl border-border/10 hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
                                <div className="p-3 bg-primary/10 rounded-lg mb-6">
                                    {Icon && <Icon className="w-7 h-7 text-primary"/>}
                                </div>
                                <h3 className="text-2xl font-bold mb-3">{item.title}</h3>
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