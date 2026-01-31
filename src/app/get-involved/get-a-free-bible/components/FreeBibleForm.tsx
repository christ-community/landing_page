'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { BookOpen, Loader2, PartyPopper, Phone, MapPin } from 'lucide-react';

interface FreeBibleFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  translation: string;
  specialRequests: string;
}

const bibleTranslations = [
  { value: 'niv', label: 'New International Version (NIV)' },
  { value: 'esv', label: 'English Standard Version (ESV)' },
  { value: 'nlt', label: 'New Living Translation (NLT)' },
  { value: 'kjv', label: 'King James Version (KJV)' },
  { value: 'nasb', label: 'New American Standard Bible (NASB)' },
  { value: 'nkjv', label: 'New King James Version (NKJV)' },
];

export default function FreeBibleForm() {
  const [formData, setFormData] = useState<FreeBibleFormData>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'United States',
    translation: '',
    specialRequests: ''
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionStatus, setSubmissionStatus] = useState<'success' | 'error' | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmissionStatus(null);

    try {
      const response = await fetch('/api/free-bible', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSubmissionStatus('success');
        // Don't reset form data immediately - let the success state show the data
      } else {
        setSubmissionStatus('error');
      }
    } catch (error) {
      console.error('Free Bible form submission error:', error);
      setSubmissionStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submissionStatus === 'success') {
    return (
      <section className="section" id="bible-form">
        <div className="section-inner">
          <Card className="max-w-3xl mx-auto text-center p-8 border border-border/40 rounded-[var(--radius)] shadow-sm">
            <PartyPopper className="w-12 h-12 mx-auto text-primary mb-4" />
            <h3 className="text-2xl font-semibold text-foreground">Request Received!</h3>
            <p className="text-muted-foreground mt-3 mb-6">
              Thank you for your request! We'll process your free Bible order and send it to you within 2-3 business days.
            </p>
            <div className="bg-background rounded-[var(--radius)] p-6 mb-6 border border-border/40">
              <h4 className="font-semibold text-foreground mb-2">What happens next?</h4>
              <ul className="text-sm text-muted-foreground text-left space-y-2">
                <li>• Your Bible will be shipped to: {formData.address}, {formData.city}, {formData.state} {formData.zipCode}</li>
                <li>• Translation: {bibleTranslations.find(t => t.value === formData.translation)?.label}</li>
                <li>• You'll receive a tracking number via email once shipped</li>
                <li>• Delivery typically takes 5-7 business days</li>
              </ul>
            </div>
            <Button onClick={() => {
                setSubmissionStatus(null);
                setFormData({
                  firstName: '', lastName: '', email: '', phone: '', address: '',
                  city: '', state: '', zipCode: '', country: 'United States',
                  translation: '', specialRequests: ''
                });
            }}>
              Request Another Bible
            </Button>
          </Card>
        </div>
      </section>
    );
  }

  return (
    <section className="section bg-muted/20" id="bible-form">
      <div className="section-inner">
        <Card className="max-w-4xl mx-auto bg-card border border-border/40 rounded-[var(--radius)] shadow-sm overflow-hidden">
          <CardHeader className="text-center p-8 bg-muted/30">
            <CardTitle className="text-2xl font-semibold text-foreground flex items-center justify-center">
              <BookOpen className="w-6 h-6 mr-3 text-primary" />
              Request Your Free Bible
            </CardTitle>
            <CardDescription className="text-base">
              Fill out the form below and we'll send you a complimentary Bible at no cost to you.
            </CardDescription>
          </CardHeader>
          
          <CardContent className="p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Personal Information */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-foreground border-b border-border/20 pb-2">
                  Personal Information
                </h3>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="firstName">First Name *</Label>
                    <Input 
                      id="firstName" 
                      name="firstName" 
                      placeholder="John" 
                      onChange={handleInputChange} 
                      value={formData.firstName} 
                      required 
                    />
                  </div>
                  <div>
                    <Label htmlFor="lastName">Last Name *</Label>
                    <Input 
                      id="lastName" 
                      name="lastName" 
                      placeholder="Smith" 
                      onChange={handleInputChange} 
                      value={formData.lastName} 
                      required 
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="email">Email Address *</Label>
                    <Input 
                      id="email" 
                      name="email" 
                      type="email" 
                      placeholder="john.smith@example.com" 
                      onChange={handleInputChange} 
                      value={formData.email} 
                      required 
                    />
                  </div>
                  <div>
                    <Label htmlFor="phone">Phone Number (Optional)</Label>
                    <div className="relative">
                      <Phone className="w-4 h-4 absolute left-3 top-3 text-muted-foreground" />
                      <Input 
                        id="phone" 
                        name="phone" 
                        type="tel" 
                        placeholder="07428784005" 
                        className="pl-10"
                        onChange={handleInputChange} 
                        value={formData.phone}
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Shipping Address */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-foreground border-b border-border/20 pb-2 flex items-center">
                  <MapPin className="w-5 h-5 mr-2 text-primary" />
                  Shipping Address
                </h3>
                
                <div>
                  <Label htmlFor="address">Street Address *</Label>
                  <Input 
                    id="address" 
                    name="address" 
                    placeholder="123 Main Street" 
                    onChange={handleInputChange} 
                    value={formData.address} 
                    required 
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="city">City *</Label>
                    <Input 
                      id="city" 
                      name="city" 
                      placeholder="Anytown" 
                      onChange={handleInputChange} 
                      value={formData.city} 
                      required 
                    />
                  </div>
                  <div>
                    <Label htmlFor="state">State/Province *</Label>
                    <Input 
                      id="state" 
                      name="state" 
                      placeholder="CA" 
                      onChange={handleInputChange} 
                      value={formData.state} 
                      required 
                    />
                  </div>
                  <div>
                    <Label htmlFor="zipCode">ZIP/Postal Code *</Label>
                    <Input 
                      id="zipCode" 
                      name="zipCode" 
                      placeholder="12345" 
                      onChange={handleInputChange} 
                      value={formData.zipCode} 
                      required 
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="country">Country</Label>
                  <Input 
                    id="country" 
                    name="country" 
                    placeholder="United States" 
                    onChange={handleInputChange} 
                    value={formData.country} 
                    required 
                  />
                </div>
              </div>

              {/* Bible Preferences */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-foreground border-b border-border/20 pb-2">
                  Bible Preferences
                </h3>
                
                <div>
                  <Label htmlFor="translation">Bible Translation *</Label>
                  <Select onValueChange={(value) => handleSelectChange('translation', value)} value={formData.translation} required>
                    <SelectTrigger id="translation">
                      <SelectValue placeholder="Choose your preferred Bible translation" />
                    </SelectTrigger>
                    <SelectContent>
                      {bibleTranslations.map(translation => (
                        <SelectItem key={translation.value} value={translation.value}>
                          {translation.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="specialRequests">Special Requests (Optional)</Label>
                  <Textarea 
                    id="specialRequests" 
                    name="specialRequests" 
                    placeholder="Any special requests or preferences for your Bible (e.g., large print, study Bible, etc.)" 
                    onChange={handleInputChange} 
                    value={formData.specialRequests}
                    rows={3}
                  />
                </div>
              </div>

              {/* Privacy Notice */}
              <Card className="bg-muted/50 border-dashed">
                <CardContent className="p-4">
                  <p className="text-sm text-muted-foreground">
                    <strong>Privacy Promise:</strong> Your information will only be used to fulfill your Bible request 
                    and will never be shared with third parties. We may occasionally send you encouraging messages 
                    and updates, but you can unsubscribe at any time.
                  </p>
                </CardContent>
              </Card>

              {submissionStatus === 'error' && (
                <p className="text-sm text-muted-foreground">Please fill out all required fields marked with *</p>
              )}
              
              <Button 
                type="submit" 
                className="w-full" 
                size="lg"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    Processing Request...
                  </>
                ) : (
                  <>
                    <BookOpen className="mr-2 h-5 w-5" />
                    Request My Free Bible
                  </>
                )}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
