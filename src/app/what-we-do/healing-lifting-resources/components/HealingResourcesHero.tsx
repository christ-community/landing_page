'use client';

interface HealingResourcesHeroProps {
    title: string;
    subtitle: string;
}

export default function HealingResourcesHero({ title, subtitle }: HealingResourcesHeroProps) {
    return (
        <section className="section bg-muted/20">
            <div className="section-inner text-center">
                <div className="max-w-3xl mx-auto stack-lg">
                    <div className="stack">
                        <p className="eyebrow">Resources</p>
                        <h1>{title}</h1>
                    </div>
                    <p className="section-lead">{subtitle}</p>
                </div>
            </div>
        </section>
    )
} 
