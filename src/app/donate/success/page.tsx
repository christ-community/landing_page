'use client';

import { useEffect, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle, Heart, Download, Share2, ArrowLeft } from 'lucide-react';
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
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950/20 dark:to-emerald-950/20 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500 mx-auto mb-4"></div>
          <p className="text-muted-foreground">Confirming your donation...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950/20 dark:to-emerald-950/20 py-20">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="max-w-2xl mx-auto">
          <Card className="border-2 border-green-200 dark:border-green-800 shadow-2xl">
            <CardHeader className="text-center pb-6 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-t-lg">
              <div className="inline-flex p-4 rounded-full bg-white/20 mb-4">
                <CheckCircle className="w-12 h-12" />
              </div>
              <CardTitle className="text-3xl font-bold">Thank You!</CardTitle>
              <p className="text-green-100 text-lg">Your donation has been processed successfully</p>
            </CardHeader>
            
            <CardContent className="p-8">
              {sessionData ? (
                <div className="space-y-6">
                  <div className="text-center">
                    <h3 className="text-2xl font-bold text-foreground mb-2">
                      Donation Confirmed
                    </h3>
                    <p className="text-muted-foreground">
                      Your generosity makes a real difference in our community and beyond.
                    </p>
                  </div>

                  <div className="bg-muted/50 rounded-lg p-6 space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="font-medium">Amount:</span>
                      <span className="text-xl font-bold text-green-600">
                        £{sessionData.amount} {sessionData.frequency === 'monthly' ? '/ month' : ''}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="font-medium">Type:</span>
                      <span>{sessionData.frequency === 'monthly' ? 'Monthly Giving' : 'One-time Gift'}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="font-medium">Status:</span>
                      <span className="text-green-600 font-medium">✓ Confirmed</span>
                    </div>
                  </div>


                  <div className="bg-gradient-to-r from-blue-50 to-green-50 dark:from-blue-950/30 dark:to-green-950/30 rounded-lg p-6 border-l-4 border-green-500">
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
                    <Button asChild size="lg" className="bg-primary hover:bg-primary/90">
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

                  <div className="text-center pt-6 border-t border-border/20">
                    <p className="text-sm text-muted-foreground">
                      Questions about your donation? Contact us at{' '}
                      <a href="mailto:christcommunityglobal@gmail.com" className="text-primary hover:underline">
                        christcommunityglobal@gmail.com
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
                    <Button className="bg-primary hover:bg-primary/90">
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
  );
}

function LoadingFallback() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950/20 dark:to-emerald-950/20 flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500 mx-auto mb-4"></div>
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