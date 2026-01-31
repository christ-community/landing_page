import { Metadata } from 'next';
import { Calendar } from 'lucide-react';
import EventsHero from './components/EventsHero';
import EventList from './components/EventList';
import type { EventsPageConfig, EventItem } from '@/types';
import { getPageHero, getUpcomingEvents } from '../../../../lib/contentful-api';
import { processAsset } from '../../../../lib/contentful-api';
import { getEventMedia } from '@/lib/event-media';
import EventMediaGallery from '@/components/EventMediaGallery';

export const dynamic = 'force-dynamic';

const pageConfig: Omit<EventsPageConfig, 'hero.brandIcon'> = {
  hero: {
    title: 'Connect, Grow, & Serve',
    subtitle: 'Our events are designed to help you connect with God and others, grow in your faith, and serve the world around you. Find your place here.',
    primaryCta: { text: 'View Calendar', href: '#' },
    mainImage: '/worship-conference.jpeg',
    previewImage: '/Church-Conference.jpg',
    previewLabel: 'Next: 10 WELSH CITIES FOR CHRIST, Carmarthen'
  },
  events: [],
};

export const metadata: Metadata = {
    title: 'Events & Outreaches | Christ Community',
    description: 'Stay up-to-date with all our upcoming conferences, workshops, webinars, and community outreach events. Find your place to connect, grow, and serve.',
    keywords: 'church events, Christian conference, outreach, community service, webinar, workshop',
};

export default async function EventsAndOutreachesPage() {
    const [pageHero, contentfulEvents, bigChurchMedia, tenCfcMedia] = await Promise.all([
        getPageHero('events-outreaches'),
        getUpcomingEvents(),
        getEventMedia('BigChurch'),
        getEventMedia('10CFC')
    ]);

    // Use Contentful hero data if available, otherwise fall back to hardcoded config
    const heroConfig = pageHero ? {
        title: pageHero.title,
        subtitle: pageHero.subtitle || pageConfig.hero.subtitle,
        primaryCta: { text: pageHero.ctaText || pageConfig.hero.primaryCta.text, href: pageHero.ctaUrl || pageConfig.hero.primaryCta.href },
        secondaryCta: pageConfig.hero.secondaryCta,
        mainImage: processAsset(pageHero.backgroundImage) || pageConfig.hero.mainImage,
        previewImage: pageConfig.hero.previewImage,
        previewLabel: pageConfig.hero.previewLabel
    } : pageConfig.hero;

    // Use Contentful events if available, otherwise fall back to dummy data
    const events = contentfulEvents.length > 0 ? contentfulEvents.map((event: any) => ({
        id: event.sys?.id || Math.random().toString(),
        title: event.title,
        category: event.category?.fields?.name || 'Event',
        description: event.description || '',
        image: processAsset(event.featuredImage) || '/Church-Conference.jpg',
        date: { 
            startDate: new Date(event.startDate || event.date).toLocaleDateString('en-US', { 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
            }), 
            time: new Date(event.startDate || event.date).toLocaleTimeString('en-US', { 
                hour: 'numeric', 
                minute: '2-digit' 
            })
        },
        location: event.location ? 
          (typeof event.location === 'object' ? event.location : { venue: event.location, address: '', city: '', country: '' }) 
          : 'Online',
        isFeatured: event.isFeatured || false,
        tags: event.tags || []
    })) : pageConfig.events;

    return (
        <main>
            <EventsHero 
                {...heroConfig}
                brandIconNode={
                    <div className="flex items-center gap-3 mb-6 bg-muted/40 p-2 rounded-[var(--radius)]">
                        <Calendar className="w-6 h-6 text-foreground" />
                        <span className="font-semibold text-foreground">Christ Community</span>
                    </div>
                }
            />
            <EventList
                events={events}
                featuredMedia={{
                    bigChurch: bigChurchMedia[0],
                    tenCfc: tenCfcMedia[0],
                }}
            />
            <EventMediaGallery
                title="Big Church Conference Gallery"
                subtitle="Every image and video currently in the BigChurch folder."
                items={bigChurchMedia}
            />
            <EventMediaGallery
                title="10 Welsh Cities for Christ Gallery"
                subtitle="Every image and video currently in the 10CFC folder."
                items={tenCfcMedia}
            />
        </main>
    );
}
