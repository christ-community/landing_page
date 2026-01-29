'use client';

import { Card, CardContent } from '@/components/ui/card';
import { Mail, Phone } from 'lucide-react';

export default function PhotozenRegistration() {
  return (
    <section id="registration-form" className="py-24 bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-gray-950/20 dark:via-background dark:to-gray-900/20 scroll-mt-20">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="text-center mb-12">
          <h2 className="text-4xl lg:text-5xl font-bold text-foreground mb-6">
            Event Concluded
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Thank you to everyone who joined us at The Big Church Conference Swansea on November 15th, 2025. 
            Stay connected for future events and gatherings.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <Card className="bg-card border border-border/10 rounded-3xl shadow-2xl overflow-hidden">
            <CardContent className="p-0">
              {/* Past Event Message */}
              <div className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-950/30 dark:to-gray-900/30 p-8 lg:p-12 text-center">
                <div className="max-w-2xl mx-auto">
                  <h3 className="text-2xl font-bold text-foreground mb-4">
                    This Event Has Ended
                  </h3>
                  <p className="text-muted-foreground mb-6">
                    We hope you were able to join us for this powerful gathering. Check out our upcoming events 
                    to stay connected with the Christ Community.
                  </p>
                  <a 
                    href="/what-we-do/events-outreaches"
                    className="inline-block bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-8 py-3 text-lg font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
                  >
                    View Upcoming Events
                  </a>
                </div>
              </div>

              {/* Contact Information */}
              <div className="bg-muted/30 p-8 lg:p-12">
                <h3 className="text-2xl font-bold text-foreground mb-6 text-center">
                  Need Help or Have Questions?
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl mx-auto">
                  <div className="flex items-center gap-4 p-4 bg-background/50 rounded-xl">
                    <Mail className="w-6 h-6 text-blue-600" />
                    <div>
                      <p className="text-sm text-muted-foreground">Email</p>
                      <a 
                        href="mailto:info@christcommunityglobal.org" 
                        className="text-foreground font-medium hover:text-blue-600 transition-colors"
                      >
                        info@christcommunityglobal.org
                      </a>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 p-4 bg-background/50 rounded-xl">
                    <Phone className="w-6 h-6 text-blue-600" />
                    <div>
                      <p className="text-sm text-muted-foreground">Phone</p>
                      <a 
                        href="tel:07428784005" 
                        className="text-foreground font-medium hover:text-blue-600 transition-colors"
                      >
                        07428 784005
                      </a>
                    </div>
                  </div>
                </div>
                <div className="mt-6 text-center">
                  <p className="text-sm text-muted-foreground">
                    Or visit{' '}
                    <a 
                      href="https://christcommunityglobal.org" 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="text-blue-600 hover:text-blue-700 underline"
                    >
                      christcommunityglobal.org
                    </a>
                    {' '}to find out more or book a visit to the office.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
