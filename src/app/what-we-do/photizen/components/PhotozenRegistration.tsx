'use client';

import { Card, CardContent } from '@/components/ui/card';
import { UserPlus, Mail, Phone } from 'lucide-react';

export default function PhotozenRegistration() {
  return (
    <section id="registration-form" className="py-24 bg-gradient-to-br from-blue-50 via-white to-indigo-50 dark:from-blue-950/20 dark:via-background dark:to-indigo-950/20 scroll-mt-20">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="text-center mb-12">
          <h2 className="text-4xl lg:text-5xl font-bold text-foreground mb-6">
            Register for the Conference
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Join us at The Big Church Conference Swansea. Fill out the form below to secure your spot.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <Card className="bg-card border border-border/10 rounded-3xl shadow-2xl overflow-hidden">
            <CardContent className="p-0">
              {/* Google Form Embed */}
              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950/30 dark:to-indigo-950/30 p-8 lg:p-12">
                <div className="flex justify-center">
                  <iframe 
                    src="https://docs.google.com/forms/d/e/1FAIpQLSf0RSQ5QlFszXVUdZ9lgf0ILPEB9vKnC-Y5wtTsAThutIWAsw/viewform?embedded=true" 
                    width="100%" 
                    height="800" 
                    className="rounded-xl shadow-lg border-0"
                    title="Big Church Conference Registration Form"
                  >
                    Loading…
                  </iframe>
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
                        href="mailto:christcommunityglobal@gmail.com" 
                        className="text-foreground font-medium hover:text-blue-600 transition-colors"
                      >
                        christcommunityglobal@gmail.com
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
