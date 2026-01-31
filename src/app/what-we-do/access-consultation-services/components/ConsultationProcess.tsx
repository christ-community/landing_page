import type { ConsultationProcessStep } from "@/types";

interface ConsultationProcessProps {
    title: string;
    subtitle: string;
    steps: ConsultationProcessStep[];
}

export default function ConsultationProcess({ title, subtitle, steps }: ConsultationProcessProps) {
    return (
        <section className="section bg-muted/20">
            <div className="section-inner">
                <div className="text-center stack-lg mb-12">
                    <div className="stack">
                        <p className="eyebrow">Process</p>
                        <h2 className="section-title">{title}</h2>
                    </div>
                    <p className="section-lead max-w-3xl mx-auto">{subtitle}</p>
                </div>
                <div className="relative grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
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
                                    <div className="w-20 h-20 bg-background rounded-full flex items-center justify-center shadow-sm border-2 border-border/40">
                                        <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center text-foreground">
                                            <Icon className="w-8 h-8" />
                                        </div>
                                    </div>
                                    <div className="absolute -top-2 -right-2 w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-semibold">
                                      {step.step}
                                    </div>
                                </div>
                                <div className="flex-grow mt-6 text-center">
                                    <h3 className="text-lg font-semibold text-foreground">{step.title}</h3>
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
