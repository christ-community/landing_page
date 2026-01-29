'use client';

import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Mail, Phone, ExternalLink, AlertCircle } from 'lucide-react';

export default function CardiffRegistration() {
  const [formError, setFormError] = useState(false);
  // TODO: Replace with actual Cardiff outreach registration form URL
  // This is currently using a placeholder form URL
  const formUrl = "https://docs.google.com/forms/d/e/1FAIpQLSf0RSQ5QlFszXVUdZ9lgf0ILPEB9vKnC-Y5wtTsAThutIWAsw/viewform";

  const handleFormError = () => {
    setFormError(true);
  };

  const handleOpenForm = () => {
    const link = document.createElement('a');
    link.href = formUrl;
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
    link.click();
  };

  return (
    <section id="registration-form" className="py-24 bg-gradient-to-br from-tertiary/10 via-white to-red-50 dark:from-tertiary/20 dark:via-background dark:to-red-950/20 scroll-mt-20">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="text-center mb-12">
          <h2 className="text-4xl lg:text-5xl font-bold text-foreground mb-6">
            Sign Up for the Outreach
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Join us at 100 Believers to Cardiff. Fill out the form below to sign up and be part of this revival moment.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <Card className="bg-card border border-border/10 rounded-3xl shadow-2xl overflow-hidden">
            <CardContent className="p-0">
              {/* Google Form Embed */}
              <div className="bg-gradient-to-br from-tertiary/10 to-red-50 dark:from-tertiary/20 dark:to-red-950/30 p-8 lg:p-12">
                {!formError ? (
                  <div className="space-y-6">
                    {/* Fallback CTA for accessibility */}
                    <div className="bg-gradient-to-r from-tertiary/20 to-red-100 dark:from-tertiary/30 dark:to-red-950/40 rounded-xl p-6 border-l-4 border-tertiary">
                      <div className="flex items-start gap-4">
                        <AlertCircle className="w-6 h-6 text-tertiary flex-shrink-0 mt-1" />
                        <div>
                          <h3 className="text-lg font-semibold text-foreground mb-2">
                            Can&apos;t see the form?
                          </h3>
                          <p className="text-muted-foreground mb-4">
                            If the form doesn&apos;t load below, you can open it in a new tab for better accessibility.
                          </p>
                          <Button 
                            onClick={handleOpenForm}
                            className="bg-gradient-to-r from-tertiary to-red-600 hover:from-red-700 hover:to-red-700 text-white"
                          >
                            Open Form in New Tab
                            <ExternalLink className="w-4 h-4 ml-2" />
                          </Button>
                        </div>
                      </div>
                    </div>

                    {/* Embedded Form */}
                    <div className="flex justify-center">
                      <iframe 
                        src={`${formUrl}?embedded=true`}
                        width="100%" 
                        height="800" 
                        className="rounded-xl shadow-lg border-0"
                        title="100 Believers to Cardiff Registration Form"
                        onError={handleFormError}
                        loading="lazy"
                      >
                        Loading form...
                      </iframe>
                    </div>
                  </div>
                ) : (
                  // Fallback if iframe fails to load
                  <div className="text-center py-12">
                    <AlertCircle className="w-16 h-16 text-tertiary mx-auto mb-6" />
                    <h3 className="text-2xl font-bold text-foreground mb-4">
                      Unable to Load Form
                    </h3>
                    <p className="text-muted-foreground mb-6 max-w-md mx-auto">
                      The registration form couldn&apos;t be displayed in your browser. This may be due to browser settings, 
                      extensions, or privacy settings that block embedded forms. Please click the button below to open it in a new tab.
                    </p>
                    <Button 
                      onClick={handleOpenForm}
                      size="lg"
                      className="bg-gradient-to-r from-tertiary to-red-600 hover:from-red-700 hover:to-red-700 text-white"
                    >
                      Open Registration Form
                      <ExternalLink className="w-5 h-5 ml-2" />
                    </Button>
                  </div>
                )}
              </div>

              {/* Contact Information */}
              <div className="bg-muted/30 p-8 lg:p-12">
                <h3 className="text-2xl font-bold text-foreground mb-6 text-center">
                  Need Help or Have Questions?
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl mx-auto">
                  <div className="flex items-center gap-4 p-4 bg-background/50 rounded-xl">
                    <Mail className="w-6 h-6 text-tertiary" />
                    <div>
                      <p className="text-sm text-muted-foreground">Email</p>
                      <a 
                        href="mailto:info@christcommunityglobal.org" 
                        className="text-foreground font-medium hover:text-tertiary transition-colors"
                      >
                        info@christcommunityglobal.org
                      </a>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 p-4 bg-background/50 rounded-xl">
                    <Phone className="w-6 h-6 text-tertiary" />
                    <div>
                      <p className="text-sm text-muted-foreground">Phone</p>
                      <a 
                        href="tel:07428784005" 
                        className="text-foreground font-medium hover:text-tertiary transition-colors"
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
                      className="text-tertiary hover:text-red-700 underline"
                    >
                      christcommunityglobal.org
                    </a>
                    {' '}to find out more about Christ Community.
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
