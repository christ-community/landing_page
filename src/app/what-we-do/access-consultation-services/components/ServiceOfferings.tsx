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
        <section className="py-24 bg-background">
            <div className="container mx-auto px-6 lg:px-12">
                <div className="text-center mb-16">
                    <h2 className="text-4xl lg:text-5xl font-bold text-foreground">
                        {title}
                    </h2>
                    <p className="text-xl text-muted-foreground mt-4 max-w-3xl mx-auto">
                        {subtitle}
                    </p>
                </div>
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {offerings.map((service) => {
                        const Icon = service.icon;
                        return (
                            <Card key={service.id} className="p-8 text-left flex flex-col items-start border-border/20 rounded-2xl hover:shadow-primary/10 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 bg-white dark:bg-gray-900/20 group">
                                <div className="p-4 inline-flex bg-primary/10 rounded-xl mb-6 group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                                    <Icon className="w-8 h-8 text-primary group-hover:text-white transition-colors duration-300" />
                                </div>
                                <h3 className="text-xl font-bold mb-3">{service.title}</h3>
                                <p className="text-muted-foreground flex-grow text-base">{service.description}</p>
                            </Card>
                        )
                    })}
                </div>
            </div>
        </section>
    )
} 