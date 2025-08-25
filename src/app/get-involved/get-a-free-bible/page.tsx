import { Metadata } from 'next';
import { Suspense } from 'react';
import FreeBibleHero from './components/FreeBibleHero';
import FreeBibleForm from './components/FreeBibleForm';
import FreeBibleInfo from './components/FreeBibleInfo';
import NewsletterSection from '@/components/NewsletterSection';

export const metadata: Metadata = {
    title: 'Get a Free Bible | Christ Community',
    description: 'Request your free Bible today. We will send you a complimentary Bible to help you on your spiritual journey.',
    keywords: 'free bible, request bible, spiritual journey, gospel',
};

export default function GetAFreeBiblePage() {
    return (
        <main>
            <FreeBibleHero />
            <FreeBibleInfo />
            <div id="bible-form" className="scroll-mt-20">
                <Suspense fallback={<div>Loading...</div>}>
                    <FreeBibleForm />
                </Suspense>
            </div>
            <NewsletterSection config={{
                title: 'Stay Connected on Your Spiritual Journey',
                subtitle: 'Receive encouraging messages and updates to help you grow in faith.',
                backgroundImage: '/worship-conference.jpeg'
            }} />
        </main>
    );
}