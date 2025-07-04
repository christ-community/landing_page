'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Mail, Loader2 } from 'lucide-react';
import type { SendHelpFormConfig } from '@/types';

const defaultConfig: SendHelpFormConfig = {
  title: "Get in Touch",
  subtitle: "Have questions or want to discuss a partnership? Send us a message, and we'll get back to you soon.",
  fields: {
    name: { label: "Full Name", placeholder: "Your Name" },
    email: { label: "Email Address", placeholder: "your.email@example.com" },
    subject: { label: "Subject", placeholder: "e.g., Partnership Inquiry" },
    message: { label: "Your Message", placeholder: "Tell us how you'd like to help..." },
  },
  submitButtonText: "Send Message"
};

interface SendHelpFormProps {
  config?: Partial<SendHelpFormConfig>;
}

export default function SendHelpForm({ config }: SendHelpFormProps) {
  const formConfig = { ...defaultConfig, ...config };
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionStatus, setSubmissionStatus] = useState<'success' | 'error' | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmissionStatus(null);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    if (formData.name && formData.email && formData.subject && formData.message) {
      console.log("Form Submitted:", formData);
      setSubmissionStatus('success');
      setFormData({ name: '', email: '', subject: '', message: '' });
    } else {
      setSubmissionStatus('error');
    }
    setIsSubmitting(false);
  };

  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-6 lg:px-12">
        <Card className="max-w-3xl mx-auto bg-card border-2 border-red-100 dark:border-red-900/50 rounded-2xl shadow-xl overflow-hidden">
          <CardHeader className="text-center p-8 bg-muted/30">
            <div className="inline-flex p-4 rounded-full bg-gradient-to-r from-red-500 to-rose-500 text-white mb-4">
              <Mail className="w-8 h-8" />
            </div>
            <CardTitle className="text-3xl font-bold text-foreground">{formConfig.title}</CardTitle>
            <CardDescription className="text-lg">{formConfig.subtitle}</CardDescription>
          </CardHeader>
          <CardContent className="p-8">
            {submissionStatus === 'success' ? (
              <div className="text-center py-8">
                <Mail className="w-16 h-16 mx-auto text-green-500 mb-4" />
                <h3 className="text-2xl font-bold text-foreground">Message Sent!</h3>
                <p className="text-muted-foreground mt-2">Thank you for reaching out. We'll be in touch soon.</p>
                <Button onClick={() => setSubmissionStatus(null)} className="mt-6 bg-red-600 hover:bg-red-700 text-white">Send Another Message</Button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="name">{formConfig.fields.name.label}</Label>
                    <Input id="name" name="name" placeholder={formConfig.fields.name.placeholder} onChange={handleInputChange} value={formData.name} required />
                  </div>
                  <div>
                    <Label htmlFor="email">{formConfig.fields.email.label}</Label>
                    <Input id="email" name="email" type="email" placeholder={formConfig.fields.email.placeholder} onChange={handleInputChange} value={formData.email} required />
                  </div>
                </div>
                <div>
                  <Label htmlFor="subject">{formConfig.fields.subject.label}</Label>
                  <Input id="subject" name="subject" placeholder={formConfig.fields.subject.placeholder} onChange={handleInputChange} value={formData.subject} required />
                </div>
                <div>
                  <Label htmlFor="message">{formConfig.fields.message.label}</Label>
                  <Textarea id="message" name="message" placeholder={formConfig.fields.message.placeholder} onChange={handleInputChange} value={formData.message} required rows={5} />
                </div>
                {submissionStatus === 'error' && <p className="text-sm text-red-500">Please fill out all required fields.</p>}
                <Button type="submit" className="w-full bg-red-600 hover:bg-red-700 text-white text-lg py-6" disabled={isSubmitting}>
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                      Sending...
                    </>
                  ) : (
                    formConfig.submitButtonText
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