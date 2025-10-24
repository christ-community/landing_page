import { Metadata } from 'next';
import { Suspense } from 'react';
import PhotozenHero from './components/PhotozenHero';
import PhotozenInfo from './components/PhotozenInfo';
import PhotozenRegistration from './components/PhotozenRegistration';
import NewsletterSection from '@/components/NewsletterSection';

export const metadata: Metadata = {
    title: 'The Big Church Conference Swansea | Christ Community',
    description: 'Join us for The Big Church Conference Swansea on November 15th, 2025. The gathering of Christians from different denominations in South Wales.',
    keywords: 'big church conference, swansea, interdenominational, christian conference, south wales, church unity, gospel',
};

export default function PhotozenPage() {
    return (
        <main>
            <PhotozenHero />
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
