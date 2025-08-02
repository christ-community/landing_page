import { Metadata } from 'next';
import SendHelpHero from './components/SendHelpHero';
import HelpOptions from '@/components/HelpOptions';
import ImpactSection from './components/ImpactSection';
import SendHelpForm from './components/SendHelpForm';
import NewsletterSection from '@/components/NewsletterSection';
import type { SupportOption } from '@/types';
import { getHelpImpact, getPageHero } from '../../../../lib/contentful-api';

const helpOptionsConfig: SupportOption[] = [
  {
    id: 'financial',
    title: "Give Financially",
    description: "Your one-time or recurring donation provides critical support for our ongoing ministry and outreach programs.",
    icon: 'Gift',
    ctaText: "Donate Now",
    color: "text-green-600 dark:text-green-400",
    bgColor: "bg-green-50 dark:bg-green-950/30"
  },
  {
    id: 'partner',
    title: "Become a Partner",
    description: "Commit to regular support and become a partner in our mission to spread the gospel and help those in need.",
    icon: 'Handshake',
    ctaText: "Learn About Partnership",
    color: "text-blue-600 dark:text-blue-400",
    bgColor: "bg-blue-50 dark:bg-blue-950/30"
  },
  {
    id: 'sponsor',
    title: "Sponsor a Project",
    description: "Fund a specific project, such as a missionary journey, community outreach event, or resource publication.",
    icon: 'ShieldCheck',
    ctaText: "View Projects",
    color: "text-purple-600 dark:text-purple-400",
    bgColor: "bg-purple-50 dark:bg-purple-950/30"
  },
];

export const metadata: Metadata = {
    title: 'Send Help & Support Our Mission | Christ Community',
    description: 'Discover how you can make a difference. Your support helps us spread hope and provide essential resources to communities in need. Give financially, become a partner, or sponsor a project today.',
    keywords: 'send help, support ministry, donate, Christian charity, missionary support',
};

export default async function SendHelpPage() {
    const [helpImpact, pageHero] = await Promise.all([
        getHelpImpact(),
        getPageHero('send-help')
    ]);

    return (
        <main className="min-h-screen">
            <SendHelpHero />
            <HelpOptions 
              title="Ways You Can Help"
              subtitle="Choose the way of giving that best suits you. Every contribution makes a difference."
              options={helpOptionsConfig} 
            />
            <ImpactSection />
            <SendHelpForm />
            <NewsletterSection config={{
                title: 'Stay Updated on Our Impact',
                subtitle: 'See how your support is changing lives. Get the latest stories, project updates, and needs delivered to your inbox.',
                backgroundImage: '/worship-conference.jpeg'
            }} />
        </main>
    );
} 