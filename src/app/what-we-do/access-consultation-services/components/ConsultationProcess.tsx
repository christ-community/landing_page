import type { ConsultationProcessStep } from "@/types";
import { Badge } from "@/components/ui/badge";

interface ConsultationProcessProps {
    title: string;
    subtitle: string;
    steps: ConsultationProcessStep[];
}

export default function ConsultationProcess({ title, subtitle, steps }: ConsultationProcessProps) {
    return (
        <section className="py-24 bg-muted/30">
            <div className="container mx-auto px-6 lg:px-12">
                <div className="text-center mb-16">
                    <h2 className="text-4xl lg:text-5xl font-bold text-foreground">{title}</h2>
                    <p className="text-xl text-muted-foreground mt-4 max-w-3xl mx-auto">{subtitle}</p>
                </div>
                <div className="relative grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {/* Connecting Line */}
                    <div className="absolute top-12 left-0 right-0 h-1 hidden md:block -translate-y-1/2">
                        <svg width="100%" height="100%">
                            <line x1="0" y1="50%" x2="100%" y2="50%" strokeWidth="2" strokeDasharray="8 8" className="stroke-border" />
                        </svg>
                    </div>

                    {steps.map((step) => {
                        const Icon = step.icon;
                        return (
                            <div key={step.step} className="relative z-10 text-center flex flex-col items-center">
                                <div className="relative inline-flex">
                                    <div className="w-24 h-24 bg-background rounded-full flex items-center justify-center shadow-lg border-4 border-muted/30">
                                        <div className="w-20 h-20 bg-gradient-to-br from-primary to-blue-500 rounded-full flex items-center justify-center text-white">
                                            <Icon className="w-10 h-10" />
                                        </div>
                                    </div>
                                    <Badge className="absolute -top-2 -right-2">{step.step}</Badge>
                                </div>
                                <div className="flex-grow mt-6 text-center">
                                    <h3 className="text-xl font-bold text-foreground">{step.title}</h3>
                                    <p className="text-muted-foreground mt-2">{step.description}</p>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
        </section>
    )
} 