import { Metadata } from 'next';
import HealingResourcesHero from "./components/HealingResourcesHero";
import ResourceList from "./components/ResourceList";
import type { HealingResourcesPageConfig } from "@/types";
// Temporarily disabled Contentful API imports for deployment
// import { getPageHero, getResources } from '../../../../lib/contentful-api';
// import { processAsset } from '../../../../lib/contentful-api';

const pageConfig: HealingResourcesPageConfig = {
    hero: {
        title: "Healing & Lifting Resources",
        subtitle: "Explore our curated collection of articles, videos, and guides designed to support, strengthen, and uplift you on your spiritual journey.",
    },
    resources: [
        {
            id: '1',
            title: "Finding Peace in the Storm: A Guide to Overcoming Anxiety",
            description: "Learn practical, faith-based strategies to combat anxiety and find a steadfast peace that transcends circumstances.",
            image: "/Church-Conference.jpg",
            format: "Guide",
            tags: ["Mental Health", "Peace", "Anxiety"],
            href: "#"
        },
        {
            id: '2',
            title: "The Power of Forgiveness: A Video Testimony",
            description: "Watch a powerful story of reconciliation and discover the liberating power of forgiveness in your own life.",
            image: "/worship-conference.jpeg",
            format: "Video",
            tags: ["Forgiveness", "Testimony", "Relationships"],
            href: "#"
        },
        {
            id: '3',
            title: "Navigating Grief with Hope: A Podcast Series",
            description: "This series offers compassionate insights and biblical wisdom for anyone walking through a season of loss.",
            image: "/Church-Conference.jpg",
            format: "Podcast",
            tags: ["Grief", "Hope", "Loss"],
            href: "#"
        },
        {
            id: '4',
            title: "The Practice of Prayer: An In-depth Article",
            description: "Deepen your prayer life with this exploration of different prayer practices and their biblical foundations.",
            image: "/worship-conference.jpeg",
            format: "Article",
            tags: ["Prayer", "Spiritual Growth", "Discipline"],
            href: "#"
        }
    ]
}

export const metadata: Metadata = {
    title: "Healing & Lifting Resources | Christ Community",
    description: "Find articles, videos, podcasts, and guides on topics like mental health, forgiveness, prayer, and navigating grief. Your journey to healing starts here.",
};

export default async function HealingAndLiftingResourcesPage() {
    // Temporarily using static config only for deployment stability
    // TODO: Re-enable Contentful integration after investigating the undefined component issue
    
    return (
        <main>
            <HealingResourcesHero {...pageConfig.hero} />
            <ResourceList resources={pageConfig.resources} />
        </main>
    );
} 