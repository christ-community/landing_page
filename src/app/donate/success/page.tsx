'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle, Heart, Download, Share2, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function DonationSuccessPage() {
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

                  <div className="bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 rounded-lg p-6">
                    <h4 className="font-semibold text-foreground mb-2 flex items-center">
                      <Heart className="w-5 h-5 text-red-500 mr-2" />
                      What's Next?
                    </h4>
                    <ul className="text-sm text-muted-foreground space-y-2">
                      <li>• You'll receive an email confirmation shortly</li>
                      <li>• Tax receipts will be sent at year-end</li>
                      {sessionData.frequency === 'monthly' && (
                        <li>• Your monthly donation will process automatically</li>
                      )}
                      <li>• You can manage your giving anytime from your account</li>
                    </ul>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-4">
                    <Button 
                      className="flex-1 bg-green-600 hover:bg-green-700 text-white"
                      onClick={() => window.print()}
                    >
                      <Download className="w-4 h-4 mr-2" />
                      Download Receipt
                    </Button>
                    
                    <Button 
                      variant="outline" 
                      className="flex-1 border-green-200 text-green-700 hover:bg-green-50"
                      onClick={() => {
                        if (navigator.share) {
                          navigator.share({
                            title: 'I just donated to Christ Community',
                            text: 'Join me in supporting this amazing ministry!',
                            url: window.location.origin + '/donate'
                          });
                        }
                      }}
                    >
                      <Share2 className="w-4 h-4 mr-2" />
                      Share Impact
                    </Button>
                  </div>

                  <div className="text-center pt-6 border-t">
                    <Link href="/">
                      <Button variant="ghost" className="text-muted-foreground hover:text-foreground">
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        Return to Home
                      </Button>
                    </Link>
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