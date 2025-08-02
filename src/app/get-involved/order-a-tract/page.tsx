import { Metadata } from 'next';
import { Suspense } from 'react';
import OrderTractHero from './components/OrderTractHero';
import TractCatalog from './components/TractCatalog';
import HowItWorks from './components/HowItWorks';
import OrderForm from './components/OrderForm';
import NewsletterSection from '@/components/NewsletterSection';
import { getTracts } from '../../../../lib/contentful-api';
import { Tract } from '@/types';

export const metadata: Metadata = {
    title: 'Order Gospel Tracts | Christ Community',
    description: 'Browse our catalog of gospel tracts and place your order today. Equip yourself to share the good news with high-quality, engaging materials.',
    keywords: 'order tracts, gospel tracts, evangelism resources, share faith',
};

export default async function OrderATractPage() {
    const tracts = await getTracts();
    console.log('tracts, ', tracts);
    
    return (
        <main>
            <OrderTractHero />
            <TractCatalog tracts={tracts as unknown as Tract[]} />
            <HowItWorks />
            <div id="order-form" className="scroll-mt-20">
                <Suspense fallback={<div>Loading...</div>}>
                    <OrderForm />
                </Suspense>
            </div>
            <NewsletterSection config={{
                title: 'Get Updates on New Tracts & Resources',
                subtitle: 'Be the first to know about new designs, special offers, and evangelism tips.',
                backgroundImage: '/worship-conference.jpeg'
            }} />
        </main>
    );
} 