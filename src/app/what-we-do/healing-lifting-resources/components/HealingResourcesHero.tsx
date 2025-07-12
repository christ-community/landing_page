'use client';

interface HealingResourcesHeroProps {
    title: string;
    subtitle: string;
}

export default function HealingResourcesHero({ title, subtitle }: HealingResourcesHeroProps) {
    return (
        <section className="bg-gradient-to-br from-gray-50 via-sky-100/40 to-blue-100/50 dark:from-gray-900 dark:via-sky-950/20 dark:to-blue-950/30 py-24">
            <div className="container mx-auto px-6 lg:px-12 text-center">
                <h1 className="text-4xl md:text-5xl font-extrabold text-foreground tracking-tight mb-4">
                    {title}
                </h1>
                <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
                    {subtitle}
                </p>
            </div>
        </section>
    )
} 