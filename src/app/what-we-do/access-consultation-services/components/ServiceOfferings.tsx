import { Card } from "@/components/ui/card";
import type { ServiceOffering } from "@/types";

// This component now receives all its data via props
interface ServiceOfferingsProps {
    title: string;
    subtitle: string;
    offerings: ServiceOffering[];
}

export default function ServiceOfferings({ title, subtitle, offerings }: ServiceOfferingsProps) {
    return (
        <section className="section">
            <div className="section-inner">
                <div className="text-center stack-lg mb-12">
                    <div className="stack">
                        <p className="eyebrow">Expertise</p>
                        <h2 className="section-title">{title}</h2>
                    </div>
                    <p className="section-lead max-w-3xl mx-auto">
                        {subtitle}
                    </p>
                </div>
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {offerings.map((service) => {
                        const Icon = service.icon;
                        return (
                            <Card key={service.id} className="p-6 text-left flex flex-col items-start border-border/40 rounded-[var(--radius)] hover:shadow-md transition-all duration-300 bg-card">
                                <div className="p-3 inline-flex bg-muted rounded-[var(--radius)] mb-4">
                                    <Icon className="w-6 h-6 text-foreground" />
                                </div>
                                <h3 className="text-lg font-semibold mb-3">{service.title}</h3>
                                <p className="text-muted-foreground flex-grow">{service.description}</p>
                            </Card>
                        )
                    })}
                </div>
            </div>
        </section>
    )
}
