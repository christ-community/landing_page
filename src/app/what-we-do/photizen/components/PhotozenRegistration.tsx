'use client';

import { Card, CardContent } from '@/components/ui/card';
import { Mail, Phone } from 'lucide-react';

export default function PhotozenRegistration() {
  return (
    <section id="registration-form" className="section bg-muted/20 scroll-mt-20">
      <div className="section-inner">
        <div className="text-center stack-lg mb-12">
          <div className="stack">
            <p className="eyebrow">Conference</p>
            <h2 className="section-title">Event Concluded</h2>
          </div>
          <p className="section-lead max-w-3xl mx-auto">
            Thank you to everyone who joined us at The Big Church Conference Swansea on November 15th, 2025.
            Stay connected for future events and gatherings.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <Card className="bg-card border border-border/40 rounded-[var(--radius)] shadow-sm overflow-hidden">
            <CardContent className="p-0">
              {/* Past Event Message */}
              <div className="bg-muted/30 p-8 lg:p-12 text-center">
                <div className="max-w-2xl mx-auto">
                  <h3 className="text-2xl font-semibold text-foreground mb-4">
                    This Event Has Ended
                  </h3>
                  <p className="text-muted-foreground mb-6">
                    We hope you were able to join us for this powerful gathering. Check out our upcoming events 
                    to stay connected with the Christ Community.
                  </p>
                  <a 
                    href="/what-we-do/events-outreaches"
                    className="inline-block bg-primary text-primary-foreground px-8 py-3 text-lg font-semibold rounded-[var(--radius)]"
                  >
                    View Upcoming Events
                  </a>
                </div>
              </div>

              {/* Contact Information */}
              <div className="bg-background p-8 lg:p-12">
                <h3 className="text-2xl font-semibold text-foreground mb-6 text-center">
                  Need Help or Have Questions?
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl mx-auto">
                  <div className="flex items-center gap-4 p-4 bg-muted/30 rounded-[var(--radius)]">
                    <Mail className="w-6 h-6 text-primary" />
                    <div>
                      <p className="text-sm text-muted-foreground">Email</p>
                      <a 
                        href="mailto:info@christcommunityglobal.org" 
                        className="text-foreground font-medium hover:text-primary transition-colors"
                      >
                        info@christcommunityglobal.org
                      </a>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 p-4 bg-muted/30 rounded-[var(--radius)]">
                    <Phone className="w-6 h-6 text-primary" />
                    <div>
                      <p className="text-sm text-muted-foreground">Phone</p>
                      <a 
                        href="tel:07428784005" 
                        className="text-foreground font-medium hover:text-primary transition-colors"
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
                      className="text-foreground underline"
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
