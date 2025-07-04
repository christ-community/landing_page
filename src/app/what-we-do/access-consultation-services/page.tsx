import { Metadata } from 'next';
import ConsultationHero from './components/ConsultationHero';
import ServiceOfferings from './components/ServiceOfferings';
import ConsultationProcess from './components/ConsultationProcess';
import ConsultationBooking from './components/ConsultationBooking';
import type { ConsultationPageConfig } from '@/types';
import { HeartHandshake, Megaphone, Presentation, HandCoins, PenSquare, Calendar, Video, Lightbulb } from 'lucide-react';

const pageConfig: ConsultationPageConfig = {
    hero: {
        title: 'Expert Consultation for Your Ministry',
        subtitle: 'Partner with us to amplify your impact. We provide tailored guidance in leadership, outreach, digital presence, and stewardship to help your church thrive.',
        image: '/Church-Conference.jpg'
    },
    services: {
        title: 'Our Areas of Expertise',
        subtitle: 'From nurturing leaders to expanding your digital footprint, our consultation services are designed to address the unique challenges and opportunities your ministry faces.',
        offerings: [
            { id: '1', title: 'Leadership Development', description: 'Equipping pastors and leaders with the skills to lead with vision and integrity.', icon: HeartHandshake, tags: [] },
            { id: '2', title: 'Community Outreach Strategy', description: 'Developing effective strategies to connect with and serve your local community.', icon: Megaphone, tags: [] },
            { id: '3', title: 'Digital Ministry Growth', description: 'Enhancing your online presence to reach a wider audience and engage your congregation.', icon: Presentation, tags: [] },
            { id: '4', title: 'Stewardship & Generosity', description: 'Fostering a culture of generosity and managing church resources wisely.', icon: HandCoins, tags: [] },
        ]
    },
    process: {
        title: 'How It Works',
        subtitle: "Our process is simple, collaborative, and focused on your ministry's specific goals. Here's how we get started.",
        steps: [
            { step: 1, title: 'Submit Inquiry', description: 'Fill out our form to tell us about your needs and goals.', icon: PenSquare },
            { step: 2, title: 'Discovery Call', description: "We'll schedule a free 30-minute call to explore how we can help.", icon: Calendar },
            { step: 3, title: 'Tailored Proposal', description: 'Receive a customized proposal with a clear action plan and pricing.', icon: Video },
            { step: 4, title: 'Begin Partnership', description: "Once approved, we'll begin our journey to strengthen your ministry.", icon: Lightbulb },
        ]
    },
    booking: {
        title: 'Ready to Grow?',
        subtitle: "Let's start the conversation. Fill out the form below, and our team will be in touch to schedule your complimentary discovery call."
    }
};

export const metadata: Metadata = {
    title: 'Consultation Services | Christ Community',
    description: 'Elevate your ministry with expert consultation in leadership, outreach, digital strategy, and stewardship. Partner with us to thrive.',
    keywords: 'church consultation, ministry consulting, leadership development, church growth, digital ministry',
};

export default function AccessConsultationServicesPage() {
    const simpleOfferings = pageConfig.services.offerings.map(({ id, title }) => ({ id, title }));
    return (
        <main>
            <ConsultationHero {...pageConfig.hero} />
            <ServiceOfferings {...pageConfig.services} />
            <ConsultationProcess {...pageConfig.process} />
            <ConsultationBooking title={pageConfig.booking.title} subtitle={pageConfig.booking.subtitle} offerings={simpleOfferings} />
        </main>
    );
}