import { Metadata } from 'next';
import { Suspense } from 'react';
import OrderTractHero from './components/OrderTractHero';
import TractCatalog from './components/TractCatalog';
import HowItWorks from './components/HowItWorks';
import OrderForm from './components/OrderForm';
import NewsletterSection from '@/components/NewsletterSection';
import { getTracts, processAsset } from '../../../../lib/contentful-api';
import { Tract } from '@/types';

export const metadata: Metadata = {
    title: 'Order Gospel Tracts | Christ Community',
    description: 'Browse our catalog of gospel tracts and place your order today. Equip yourself to share the good news with high-quality, engaging materials.',
    keywords: 'order tracts, gospel tracts, evangelism resources, share faith',
};

export default async function OrderATractPage() {
    const tracts = await getTracts();
    console.log('Raw tracts from Contentful:', tracts);
    console.log('Number of tracts:', tracts.length);
    
    // Process tract assets on server side with proper error handling
    const processedTracts = tracts.map((tract: any) => {
        try {
            return {
                ...tract,
                id: tract.sys?.id || Math.random().toString(), // Ensure each tract has an ID
                processedCoverImage: tract.coverImage ? processAsset(tract.coverImage) : '/Church-Conference.jpg',
                processedSamplePages: tract.samplePages ? tract.samplePages.map((page: any) => {
                    try {
                        return processAsset(page);
                    } catch (error) {
                        console.error('Error processing sample page:', error);
                        return null;
                    }
                }).filter(Boolean) : []
            };
        } catch (error) {
            console.error('Error processing tract:', tract.title, error);
            return {
                ...tract,
                id: tract.sys?.id || Math.random().toString(),
                processedCoverImage: '/Church-Conference.jpg',
                processedSamplePages: []
            };
        }
    });
    
 
    return (
        <main>
            <OrderTractHero />
            <TractCatalog contentfulTracts={processedTracts} />
            <HowItWorks />
            <div id="order-form" className="scroll-mt-20">
                <Suspense fallback={<div>Loading...</div>}>
                    <OrderForm tracts={processedTracts} />
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