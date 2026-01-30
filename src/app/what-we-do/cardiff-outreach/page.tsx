import { Metadata } from 'next';
import CardiffHero from './components/CardiffHero';
import CardiffInfo from './components/CardiffInfo';
import CardiffRegistration from './components/CardiffRegistration';
import NewsletterSection from '@/components/NewsletterSection';

export const metadata: Metadata = {
    title: '100 Believers to Cardiff - Easter Outreach 2026 | Christ Community',
    description: 'Join 100 believers for an evangelism outreach to Cardiff City Center this Easter. Witness Christ, pray, and worship on Saturday, April 4th, 2026. Sign up now to be part of this revival moment.',
    keywords: '100 believers, cardiff, easter outreach, evangelism, cardiff city center, worship, prayer, revival, christ community, easter 2026, cardiff evangelism, gospel outreach',
    openGraph: {
        title: '100 Believers to Cardiff - Easter Outreach 2026',
        description: 'Join us for a powerful evangelism outreach as we witness Christ, pray, and worship at Cardiff City Center this Easter.',
        type: 'website',
        locale: 'en_GB',
    },
    twitter: {
        card: 'summary_large_image',
        title: '100 Believers to Cardiff - Easter Outreach 2026',
        description: 'Join 100 believers for evangelism, worship, and prayer at Cardiff City Center this Easter.',
    },
    robots: {
        index: true,
        follow: true,
    },
};

export default function CardiffOutreachPage() {
    return (
        <main>
            <CardiffHero />
            <CardiffInfo />
            <div id="registration-section" className="scroll-mt-20">
                <CardiffRegistration />
            </div>
            <NewsletterSection config={{
                title: 'Stay Updated on Revival Moments',
                subtitle: 'Receive updates and notifications about the Cardiff outreach and other Christ Community events.',
                backgroundImage: '/worship-conference.jpeg'
            }} />
        </main>
    );
}
