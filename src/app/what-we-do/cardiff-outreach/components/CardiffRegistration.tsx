'use client';

import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Mail, Phone, ExternalLink, AlertCircle } from 'lucide-react';

export default function CardiffRegistration() {
  const [formError, setFormError] = useState(false);
  // Official Cardiff outreach registration form
  const formUrl = "https://docs.google.com/forms/d/e/1FAIpQLSdZv-rvVEVuRhXuPZDAq06qdIztuZ-B39Y4tA84vso6ztmcRQ/viewform";

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
    <section id="registration-form" className="section bg-muted/10 scroll-mt-20">
      <div className="section-inner">
        <div className="text-center stack-lg mb-12">
          <div className="stack">
            <p className="eyebrow">Registration</p>
            <h2 className="section-title">Sign Up for the Outreach</h2>
          </div>
          <p className="section-lead max-w-3xl mx-auto">
            Join us at 100 Believers to Cardiff. Fill out the form below to sign up and be part of this revival moment.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <Card className="border-border/40 shadow-sm overflow-hidden">
            <CardContent className="p-0">
              {/* Google Form Embed */}
              <div className="bg-muted/20 p-8 lg:p-12">
                {!formError ? (
                  <div className="space-y-6">
                    {/* Fallback CTA for accessibility */}
                    <div className="bg-background border border-border/40 rounded-[var(--radius)] p-6 border-l-4 border-primary/70">
                      <div className="flex items-start gap-4">
                        <AlertCircle className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                        <div>
                          <h3 className="text-lg font-semibold text-foreground mb-2">
                            Can&apos;t see the form?
                          </h3>
                          <p className="text-muted-foreground mb-4">
                            If the form doesn&apos;t load below, you can open it in a new tab for better accessibility.
                          </p>
                          <Button onClick={handleOpenForm}>
                            Open Form in New Tab
                            <ExternalLink className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>

                    {/* Embedded Form */}
                    <div className="flex justify-center">
                      <iframe 
                        src={`${formUrl}?embedded=true`}
                        width="100%" 
                        height="520"
                        style={{ maxWidth: '700px', minHeight: '520px' }}
                        className="rounded-[var(--radius)] border border-border/30 shadow-sm mx-auto"
                        title="100 Believers to Cardiff Registration Form"
                        aria-label="Registration form for 100 Believers to Cardiff Easter Outreach 2026"
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
                    <AlertCircle className="h-16 w-16 text-primary mx-auto mb-6" />
                    <h3 className="text-2xl font-semibold text-foreground mb-4">
                      Unable to Load Form
                    </h3>
                    <p className="text-muted-foreground mb-6 max-w-md mx-auto">
                      The registration form couldn&apos;t be displayed in your browser. This may be due to browser settings, 
                      extensions, or privacy settings that block embedded forms. Please click the button below to open it in a new tab.
                    </p>
                    <Button onClick={handleOpenForm} size="lg">
                      Open Registration Form
                      <ExternalLink className="h-5 w-5" />
                    </Button>
                  </div>
                )}
              </div>

              {/* Contact Information */}
              <div className="bg-background p-8 lg:p-12">
                <h3 className="text-2xl font-semibold text-foreground mb-6 text-center">
                  Need Help or Have Questions?
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl mx-auto">
                  <div className="flex items-center gap-4 p-4 bg-muted/30 border border-border/40 rounded-[var(--radius)]">
                    <Mail className="h-6 w-6 text-primary" />
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
                  <div className="flex items-center gap-4 p-4 bg-muted/30 border border-border/40 rounded-[var(--radius)]">
                    <Phone className="h-6 w-6 text-primary" />
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
