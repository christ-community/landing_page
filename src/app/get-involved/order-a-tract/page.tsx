import { Metadata } from 'next';
import OrderTractHero from './components/OrderTractHero';
import TractCatalog from './components/TractCatalog';
import HowItWorks from './components/HowItWorks';
import OrderForm from './components/OrderForm';
import NewsletterSection from '@/components/NewsletterSection';

export const metadata: Metadata = {
    title: 'Order Gospel Tracts | Christ Community',
    description: 'Browse our catalog of gospel tracts and place your order today. Equip yourself to share the good news with high-quality, engaging materials.',
    keywords: 'order tracts, gospel tracts, evangelism resources, share faith',
};

export default function OrderATractPage() {
    return (
        <main>
            <OrderTractHero />
            <TractCatalog />
            <HowItWorks />
            <div id="order-form" className="scroll-mt-20">
                <OrderForm />
            </div>
            <NewsletterSection config={{
                title: 'Get Updates on New Tracts & Resources',
                subtitle: 'Be the first to know about new designs, special offers, and evangelism tips.',
                backgroundImage: '/worship-conference.jpeg'
            }} />
        </main>
    );
} 