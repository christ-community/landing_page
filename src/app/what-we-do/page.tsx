import { Metadata } from 'next';
import WhatWeDoHero from "./components/WhatWeDoHero";
import ActivityGrid from "./components/ActivityGrid";
import type { WhatWeDoPageConfig } from "@/types";
import NewsletterSection from "@/components/NewsletterSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import { getMinistryActivities, getDifferentiators, getTestimonials, getPageHero } from '../../../lib/contentful-api';

// Testimonials now loaded from Contentful

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
    description: "Discover our core ministries, including events, consultation services, and our blog. Learn how we are serving the community and building the kingdom.",
};

export default async function WhatWeDoPage() {
    const [ministryActivities, differentiators, testimonials, pageHero] = await Promise.all([
        getMinistryActivities(),
        getDifferentiators(),
        getTestimonials(),
        getPageHero('what-we-do')
    ]);

    // Use Contentful activities if available, otherwise fall back to hardcoded
    const activitiesConfig = ministryActivities.length > 0 ? {
        title: "Our Core Ministries",
        subtitle: "Each of our ministries is designed to meet specific needs within the church and the broader community.",
        items: ministryActivities.map(activity => ({
            title: activity.title,
            description: activity.description,
            href: activity.ctaUrl || `#${activity.title.toLowerCase().replace(/\s+/g, '-')}`,
            icon: activity.icon || "Heart",
            ctaText: activity.ctaText || "Learn More"
        }))
    } : pageConfig.activities;

    // Use Contentful hero if available, otherwise fall back to hardcoded
    const heroConfig = pageHero ? {
        title: pageHero.title,
        subtitle: pageHero.subtitle || pageConfig.hero.subtitle,
        image: pageHero.backgroundImage ? `https:${pageHero.backgroundImage.fields.file?.url}` : pageConfig.hero.image
    } : pageConfig.hero;

    return (
        <main>
            <WhatWeDoHero {...heroConfig} />
            <ActivityGrid {...activitiesConfig} />
            <TestimonialsSection 
                title="Stories of Transformation"
                subtitle="Hear from those who have been blessed by our ministries."
                testimonials={testimonials}
            />
            <NewsletterSection />
        </main>
    )
} 