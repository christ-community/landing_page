import type { LucideIcon } from 'lucide-react';

export interface ServiceOffering {
    id: string;
    title: string;
    description: string;
    icon: LucideIcon;
    tags: string[];
}

export interface ConsultationProcessStep {
    step: number;
    title: string;
    description: string;
    icon: LucideIcon;
}

export interface ConsultationBookingData {
    fullName: string;
    email: string;
    churchName?: string;
    serviceId: string;
    message: string;
}

export interface ConsultationPageConfig {
    hero: {
        title: string;
        subtitle: string;
        image: string;
    };
    services: {
        title: string;
        subtitle: string;
        offerings: ServiceOffering[];
    };
    process: {
        title: string;
        subtitle: string;
        steps: ConsultationProcessStep[];
    };
    booking: {
        title: string;
        subtitle: string;
    }
} 