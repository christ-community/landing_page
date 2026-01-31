'use client';

import { useEffect, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle } from 'lucide-react';
import Link from 'next/link';

function DonationSuccessContent() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get('session_id');
  const [sessionData, setSessionData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (sessionId) {
      // In a real implementation, you would fetch session details from Stripe
      // For now, we'll simulate success data
      setTimeout(() => {
        setSessionData({
          amount: 50,
          currency: 'GBP',
          frequency: 'monthly',
          isDedicated: false,
        });
        setLoading(false);
      }, 1000);
    } else {
      setLoading(false);
    }
  }, [sessionId]);

  if (loading) {
    return (
      <div className="min-h-screen bg-muted/10 flex items-center justify-center">
        <div className="text-center stack">
          <div className="animate-spin rounded-full h-12 w-12 border-2 border-muted border-t-primary mx-auto"></div>
          <p className="text-muted-foreground">Confirming your donation...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-muted/10">
      <div className="section">
        <div className="section-inner">
        <div className="max-w-2xl mx-auto">
          <Card className="border-border/40 shadow-sm">
            <CardHeader className="text-center pb-6 border-b border-border/40">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-primary/10">
                <CheckCircle className="h-8 w-8 text-primary" />
              </div>
              <CardTitle className="text-3xl">Thank You!</CardTitle>
              <p className="text-muted-foreground">Your donation has been processed successfully</p>
            </CardHeader>
            
            <CardContent className="p-8">
              {sessionData ? (
                <div className="space-y-6">
                  <div className="text-center">
                    <h3 className="text-2xl font-semibold text-foreground mb-2">
                      Donation Confirmed
                    </h3>
                    <p className="text-muted-foreground">
                      Your generosity makes a real difference in our community and beyond.
                    </p>
                  </div>

                  <div className="bg-muted/30 rounded-[var(--radius)] p-6 space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="font-medium">Amount:</span>
                      <span className="text-xl font-semibold text-foreground">
                        £{sessionData.amount} {sessionData.frequency === 'monthly' ? '/ month' : ''}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="font-medium">Type:</span>
                      <span>{sessionData.frequency === 'monthly' ? 'Monthly Giving' : 'One-time Gift'}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="font-medium">Status:</span>
                      <span className="text-primary font-medium">✓ Confirmed</span>
                    </div>
                  </div>


                  <div className="bg-background border border-border/40 rounded-[var(--radius)] p-6 border-l-4 border-primary/70">
                    <p className="text-foreground font-medium text-center">
                      "Give, and it will be given to you. A good measure, pressed down, shaken together and running over, 
                      will be poured into your lap. For with the measure you use, it will be measured to you."
                    </p>
                    <p className="text-sm text-muted-foreground text-center mt-2">- Luke 6:38</p>
                  </div>

                  <div className="text-center">
                    <p className="text-muted-foreground">
                      Your donation will be put to work immediately in our mission to shine the light of Christ to all Nations, Tribes and Tongues. 
                      May God bless you abundantly for your faithfulness.
                    </p>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Button asChild size="lg">
                      <Link href="/">
                        Return to Home
                      </Link>
                    </Button>
                    <Button asChild variant="outline" size="lg">
                      <Link href="/what-we-do">
                        See Our Impact
                      </Link>
                    </Button>
                  </div>

                  <div className="text-center pt-6 border-t border-border/40">
                    <p className="text-sm text-muted-foreground">
                      Questions about your donation? Contact us at{' '}
                      <a href="mailto:info@christcommunityglobal.org" className="text-primary hover:underline">
                        info@christcommunityglobal.org
                      </a>{' '}
                      or call{' '}
                      <a href="tel:07428784005" className="text-primary hover:underline">
                        07428784005
                      </a>
                    </p>
                  </div>
                </div>
              ) : (
                <div className="text-center py-8">
                  <p className="text-muted-foreground mb-4">
                    We couldn't find details for this donation session.
                  </p>
                  <Link href="/donate">
                    <Button>
                      Make a Donation
                    </Button>
                  </Link>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
        </div>
      </div>
    </div>
  );
}

function LoadingFallback() {
  return (
    <div className="min-h-screen bg-muted/10 flex items-center justify-center">
      <div className="text-center stack">
        <div className="animate-spin rounded-full h-12 w-12 border-2 border-muted border-t-primary mx-auto"></div>
        <p className="text-muted-foreground">Loading...</p>
      </div>
    </div>
  );
}

export default function DonationSuccessPage() {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <DonationSuccessContent />
    </Suspense>
  );
}
