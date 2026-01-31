import { Metadata } from 'next';
import { Suspense } from 'react';
import PhotozenHero from './components/PhotozenHero';
import PhotozenInfo from './components/PhotozenInfo';
import PhotozenRegistration from './components/PhotozenRegistration';
import NewsletterSection from '@/components/NewsletterSection';
import EventMediaGallery from '@/components/EventMediaGallery';
import { getEventMedia } from '@/lib/event-media';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
    title: 'The Big Church Conference Swansea (Past Event) | Christ Community',
    description: 'The Big Church Conference Swansea took place on November 15th, 2025. A gathering of Christians from different denominations in South Wales.',
    keywords: 'big church conference, swansea, interdenominational, christian conference, south wales, church unity, gospel, past event',
};

export default async function PhotozenPage() {
  const mediaItems = await getEventMedia('BigChurch');

    return (
        <main>
            <PhotozenHero />
            <EventMediaGallery
                title="The Big Church Conference Highlights"
                subtitle="Moments from worship, teaching, and fellowship across the conference."
                items={mediaItems}
            />
            <PhotozenInfo />
            <div id="registration-section" className="scroll-mt-20">
                <Suspense fallback={<div>Loading...</div>}>
                    <PhotozenRegistration />
                </Suspense>
            </div>
            <NewsletterSection config={{
                title: 'Stay Updated on Conference Details',
                subtitle: 'Receive updates and notifications about The Big Church Conference and other Christ Community events.',
                backgroundImage: '/worship-conference.jpeg'
            }} />
        </main>
    );
}
