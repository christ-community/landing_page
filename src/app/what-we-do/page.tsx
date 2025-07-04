import { Metadata } from 'next';
import WhatWeDoHero from "./components/WhatWeDoHero";
import ActivityGrid from "./components/ActivityGrid";
import type { WhatWeDoPageConfig, VolunteerTestimonial } from "@/types";
import { 
    BookOpen, 
    CalendarCheck2, 
    Handshake, 
    HeartHandshake 
} from "lucide-react";
import NewsletterSection from "@/components/NewsletterSection";
import TestimonialsSection from "@/components/TestimonialsSection";

const testimonials: VolunteerTestimonial[] = [
    {
        id: "1",
        name: "Pastor John S.",
        role: "Lead Pastor, Grace Fellowship",
        quote: "The consultation services were a game-changer for our small church. We now have a clear vision and the tools to actually achieve it.",
        image: "/worship-conference.jpeg",
        volunteeredSince: "2023",
        favoriteActivity: "Leadership Consultation"
    },
    {
        id: "2",
        name: "Sarah L.",
        role: "Conference Attendee",
        quote: "After attending the youth conference, my faith feels more alive than ever. The speakers were inspiring, and the community I found was so welcoming.",
        image: "/Church-Conference.jpg",
        volunteeredSince: "2024",
        favoriteActivity: "Youth Conference"
    },
    {
        id: "3",
        name: "David M.",
        role: "Resource User",
        quote: "The resources on healing have been a balm to my soul during a very difficult season. Thank you for providing such practical and hope-filled content.",
        image: "/worship-conference.jpeg",
        volunteeredSince: "2024",
        favoriteActivity: "Healing Resources"
    }
];

const pageConfig: Omit<WhatWeDoPageConfig, 'activities.items.icon'> = {
    hero: {
        title: "Serving God by Serving Others",
        subtitle: "We are committed to making a difference through practical ministry, compassionate outreach, and the sharing of life-changing resources. Explore the ways we are actively building the kingdom.",
        image: "/worship-conference.jpeg",
    },
    activities: {
        title: "Our Core Ministries",
        subtitle: "Each of our ministries is designed to meet specific needs within the church and the broader community, from providing expert guidance to fostering spiritual growth and healing.",
        items: [
            {
                title: "Events & Outreaches",
                description: "Connect with us at our conferences, workshops, and community events designed to foster growth and fellowship.",
                href: "/what-we-do/events-outreaches",
                icon: "CalendarCheck2",
                ctaText: "View Upcoming Events",
            },
            {
                title: "Consultation Services",
                description: "We offer expert guidance to churches and ministries in areas like leadership, outreach, and digital strategy.",
                href: "/what-we-do/access-consultation-services",
                icon: "Handshake",
                ctaText: "Learn About Consultation"
            },
            {
                title: "Healing & Lifting Resources",
                description: "Access a wealth of articles, videos, and guides to support you on your journey of healing and spiritual growth.",
                href: "/what-we-do/healing-lifting-resources",
                icon: "HeartHandshake",
                ctaText: "Explore Resources"
            },
            {
                title: "Our Blog & Publications",
                description: "Read insightful articles on faith, culture, and ministry from our team and guest contributors.",
                href: "/what-we-do/blog",
                icon: "BookOpen",
                ctaText: "Read the Latest Posts"
            }
        ]
    }
}

export const metadata: Metadata = {
    title: "What We Do | Christ Community",
    description: "Discover our core ministries, including events, consultation services, healing resources, and our blog. Learn how we are serving the community and building the kingdom.",
};

export default function WhatWeDoPage() {
    return (
        <main>
            <WhatWeDoHero {...pageConfig.hero} />
            <ActivityGrid {...pageConfig.activities} />
            <TestimonialsSection 
                title="Stories of Transformation"
                subtitle="Hear from those who have been blessed by our ministries."
                testimonials={testimonials}
            />
            <NewsletterSection />
        </main>
    )
} 