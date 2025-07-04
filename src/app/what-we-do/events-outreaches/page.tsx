import { Metadata } from 'next';
import { Calendar } from 'lucide-react';
import EventsHero from './components/EventsHero';
import EventList from './components/EventList';
import type { EventsPageConfig, EventItem } from '@/types';

// Dummy Data
const dummyEvents: EventItem[] = [
  {
    id: '1',
    title: 'Global Youth Conference 2024',
    category: 'Conference',
    description: 'Join thousands of young adults from around the world for a weekend of powerful worship, inspiring speakers, and community building. This year\'s theme is "Fearless Generation".',
    image: '/worship-conference.jpeg',
    date: { startDate: 'October 25, 2024', time: '7:00 PM' },
    location: { venue: 'International Convention Centre', address: '123 Main St', city: 'London', country: 'UK' },
    isFeatured: true,
    tags: ['Youth', 'Worship', 'Global'],
  },
  {
    id: '2',
    title: 'City-Wide Outreach Day',
    category: 'Outreach',
    description: 'Be the hands and feet of Jesus in our city. We\'ll be partnering with local shelters and organizations to serve our community through various projects.',
    image: '/Church-Conference.jpg',
    date: { startDate: 'November 9, 2024', time: '9:00 AM' },
    location: { venue: 'Central Park', address: '456 Park Ave', city: 'New York', country: 'USA' },
    isFeatured: false,
    tags: ['Community', 'Service', 'Local'],
  },
  {
    id: '3',
    title: 'Digital Ministry Masterclass',
    category: 'Webinar',
    description: 'Learn the latest strategies and tools for effective online ministry. This webinar is perfect for church leaders, social media managers, and volunteers.',
    image: '/worship-conference.jpeg',
    date: { startDate: 'November 15, 2024', time: '2:00 PM EST' },
    location: 'Online',
    isFeatured: false,
    tags: ['Digital', 'Training', 'Leadership'],
  },
    {
    id: '4',
    title: 'Worship Team Workshop',
    category: 'Workshop',
    description: 'A hands-on workshop for worship leaders and team members looking to grow in their craft and calling. Led by renowned worship leaders.',
    image: '/Church-Conference.jpg',
    date: { startDate: 'December 2, 2024', time: '10:00 AM' },
    location: { venue: 'Hope Community Church', address: '789 Faith Rd', city: 'Manchester', country: 'UK' },
    isFeatured: false,
    tags: ['Worship', 'Music', 'Training'],
  },
];


const pageConfig: Omit<EventsPageConfig, 'hero.brandIcon'> = {
  hero: {
    title: 'Connect, Grow, & Serve',
    subtitle: 'Our events are designed to help you connect with God and others, grow in your faith, and serve the world around you. Find your place here.',
    primaryCta: { text: 'View Calendar', href: '#' },
    secondaryCta: { text: 'Get Event Pack', href: '#' },
    mainImage: '/worship-conference.jpeg',
    previewImage: '/Church-Conference.jpg',
    previewLabel: 'Next: Global Youth Conference'
  },
  events: dummyEvents,
};

export const metadata: Metadata = {
    title: 'Events & Outreaches | Christ Community',
    description: 'Stay up-to-date with all our upcoming conferences, workshops, webinars, and community outreach events. Find your place to connect, grow, and serve.',
    keywords: 'church events, Christian conference, outreach, community service, webinar, workshop',
};

export default function EventsAndOutreachesPage() {
    return (
        <main>
            <EventsHero 
                {...pageConfig.hero}
                brandIconNode={
                    <div className="flex items-center gap-3 mb-6 bg-white/5 p-2 rounded-lg">
                        <Calendar className="w-7 h-7" />
                        <span className="font-semibold text-lg">Christ Community</span>
                    </div>
                }
            />
            <EventList events={pageConfig.events} />
        </main>
    );
} 