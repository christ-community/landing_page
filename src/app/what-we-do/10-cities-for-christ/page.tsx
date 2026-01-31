import { Metadata } from 'next';
import { Badge } from '@/components/ui/badge';
import EventMediaGallery from '@/components/EventMediaGallery';
import NewsletterSection from '@/components/NewsletterSection';
import { getEventMedia } from '@/lib/event-media';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: '10 Welsh Cities for Christ | Christ Community',
  description:
    'A multi-city outreach across Wales sharing the Gospel through worship, prayer, and community engagement.',
};

export default async function TenCitiesForChristPage() {
  const mediaItems = await getEventMedia('10CFC');

  return (
    <main>
      <section className="section bg-muted/20">
        <div className="section-inner">
          <div className="max-w-3xl mx-auto text-center stack-lg">
            <Badge className="bg-background/80 text-foreground border border-border/40 w-fit mx-auto">
              Outreach
            </Badge>
            <div className="stack">
              <h1 className="section-title">10 Welsh Cities for Christ</h1>
              <p className="section-lead">
                A multi-city outreach across Wales to proclaim the Gospel through worship, prayer, and compassionate witness.
              </p>
            </div>
            <p className="text-muted-foreground">
              This mission brings believers together across towns and cities to serve communities, share testimonies,
              and lift the name of Jesus in public spaces. Explore moments from the outreach below.
            </p>
          </div>
        </div>
      </section>

      <EventMediaGallery
        title="10 Welsh Cities for Christ Gallery"
        subtitle="Images and videos from outreach moments across Wales."
        items={mediaItems}
      />

      <NewsletterSection
        config={{
          title: 'Stay Updated on Outreach Opportunities',
          subtitle: 'Receive news about upcoming city outreaches and community missions.',
          backgroundImage: '/worship-conference.jpeg',
        }}
      />
    </main>
  );
}
