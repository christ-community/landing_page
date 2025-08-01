'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Mail, Loader2, CheckCircle, AlertCircle } from 'lucide-react';

interface ContactFormProps {
  config?: {
    title?: string;
    subtitle?: string;
    submitButtonText?: string;
  };
}

const defaultConfig = {
  title: "Send Us a Message",
  subtitle: "Fill out the form below and we'll get back to you as soon as possible.",
  submitButtonText: "Send Message"
};

const inquiryTypes = [
  { value: 'general', label: 'General Inquiry' },
  { value: 'prayer', label: 'Prayer Request' },
  { value: 'volunteer', label: 'Volunteer Opportunities' },
  { value: 'partnership', label: 'Partnership' },
  { value: 'support', label: 'Support Request' },
  { value: 'consultation', label: 'Consultation Services' },
];

export default function ContactForm({ config }: ContactFormProps) {
  const formConfig = { ...defaultConfig, ...config };
  const [formData, setFormData] = useState({ 
    firstName: '', 
    lastName: '', 
    email: '', 
    phone: '',
    inquiryType: '',
    subject: '', 
    message: '' 
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionStatus, setSubmissionStatus] = useState<'success' | 'error' | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (value: string) => {
    setFormData(prev => ({ ...prev, inquiryType: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmissionStatus(null);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSubmissionStatus('success');
        setFormData({ 
          firstName: '', 
          lastName: '', 
          email: '', 
          phone: '',
          inquiryType: '',
          subject: '', 
          message: '' 
        });
      } else {
        setSubmissionStatus('error');
      }
    } catch (error) {
      console.error('Form submission error:', error);
      setSubmissionStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="py-24 bg-background" data-section="contact-form">
      <div className="container mx-auto px-6 lg:px-12">
        <Card className="max-w-4xl mx-auto bg-card border-2 border-blue-100 dark:border-blue-900/50 rounded-2xl shadow-xl overflow-hidden">
          <CardHeader className="text-center p-8 bg-muted/30">
            <div className="inline-flex p-4 rounded-full bg-gradient-to-r from-blue-500 to-sky-500 text-white mb-4">
              <Mail className="w-8 h-8" />
            </div>
            <CardTitle className="text-3xl font-bold text-foreground">{formConfig.title}</CardTitle>
            <CardDescription className="text-lg">{formConfig.subtitle}</CardDescription>
          </CardHeader>
          
          <CardContent className="p-8">
            {submissionStatus === 'success' ? (
              <div className="text-center py-8">
                <CheckCircle className="w-16 h-16 mx-auto text-green-500 mb-4" />
                <h3 className="text-2xl font-bold text-foreground">Message Sent Successfully!</h3>
                <p className="text-muted-foreground mt-2 max-w-md mx-auto">
                  Thank you for reaching out to us. We'll get back to you within 24-48 hours.
                </p>
                <Button 
                  onClick={() => setSubmissionStatus(null)} 
                  className="mt-6 bg-blue-600 hover:bg-blue-700 text-white"
                >
                  Send Another Message
                </Button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="firstName">First Name *</Label>
                    <Input 
                      id="firstName" 
                      name="firstName" 
                      placeholder="Your first name" 
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
                      placeholder="Your last name" 
                      onChange={handleInputChange} 
                      value={formData.lastName} 
                      required 
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="email">Email Address *</Label>
                    <Input 
                      id="email" 
                      name="email" 
                      type="email" 
                      placeholder="your.email@example.com" 
                      onChange={handleInputChange} 
                      value={formData.email} 
                      required 
                    />
                  </div>
                  <div>
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input 
                      id="phone" 
                      name="phone" 
                      type="tel" 
                      placeholder="+1 (555) 123-4567" 
                      onChange={handleInputChange} 
                      value={formData.phone} 
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="inquiryType">Inquiry Type *</Label>
                  <Select onValueChange={handleSelectChange} value={formData.inquiryType} required>
                    <SelectTrigger>
                      <SelectValue placeholder="Select the type of inquiry" />
                    </SelectTrigger>
                    <SelectContent>
                      {inquiryTypes.map((type) => (
                        <SelectItem key={type.value} value={type.value}>
                          {type.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="subject">Subject *</Label>
                  <Input 
                    id="subject" 
                    name="subject" 
                    placeholder="Brief description of your inquiry" 
                    onChange={handleInputChange} 
                    value={formData.subject} 
                    required 
                  />
                </div>

                <div>
                  <Label htmlFor="message">Message *</Label>
                  <Textarea 
                    id="message" 
                    name="message" 
                    placeholder="Please share more details about your inquiry..." 
                    onChange={handleInputChange} 
                    value={formData.message} 
                    required 
                    rows={6}
                    className="resize-none"
                  />
                </div>

                {submissionStatus === 'error' && (
                  <div className="flex items-center gap-2 p-4 bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-800 rounded-lg">
                    <AlertCircle className="w-5 h-5 text-red-500" />
                    <p className="text-sm text-red-700 dark:text-red-400">
                      There was an error sending your message. Please try again or contact us directly.
                    </p>
                  </div>
                )}

                <Button 
                  type="submit" 
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white text-lg py-6 shadow-lg hover:shadow-xl transition-all duration-300" 
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                      Sending Message...
                    </>
                  ) : (
                    <>
                      <Mail className="mr-2 h-5 w-5" />
                      {formConfig.submitButtonText}
                    </>
                  )}
                </Button>
              </form>
            )}
          </CardContent>
        </Card>
      </div>
    </section>
  );
}