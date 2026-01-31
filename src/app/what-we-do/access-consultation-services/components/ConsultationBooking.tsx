'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';

interface SimpleOffering {
    id: string;
    title: string;
}

interface ConsultationBookingProps {
    title: string;
    subtitle: string;
    offerings: SimpleOffering[];
}

export default function ConsultationBooking({ title, subtitle, offerings }: ConsultationBookingProps) {
    const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setStatus('submitting');
        // Simulate API call
        await new Promise(res => setTimeout(res, 1500));
        // Randomly succeed or fail for demo purposes
        Math.random() > 0.2 ? setStatus('success') : setStatus('error');
    };

    return (
        <section className="section">
            <div className="section-inner">
                <Card className="grid lg:grid-cols-2 gap-0 overflow-hidden border border-border/40 shadow-sm">
                    <div className="p-10 lg:p-16 flex flex-col justify-center">
                        <h2 className="text-2xl font-semibold text-foreground mb-4">{title}</h2>
                        <p className="text-muted-foreground mb-8">{subtitle}</p>

                        {status === 'success' ? (
                            <div className="text-center bg-muted/30 p-8 rounded-[var(--radius)] border border-border/40">
                                <h3 className="text-xl font-semibold text-foreground">Thank You!</h3>
                                <p className="text-muted-foreground mt-2">Your consultation request has been sent. We'll be in touch within 24 hours.</p>
                            </div>
                        ) : (
                             <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="grid sm:grid-cols-2 gap-6">
                                    <div>
                                        <Label htmlFor="fullName">Full Name</Label>
                                        <Input id="fullName" type="text" placeholder="John Doe" required />
                                    </div>
                                    <div>
                                        <Label htmlFor="email">Email Address</Label>
                                        <Input id="email" type="email" placeholder="you@example.com" required />
                                    </div>
                                </div>
                                 <div>
                                    <Label htmlFor="churchName">Church/Organization Name (Optional)</Label>
                                    <Input id="churchName" type="text" placeholder="Christ Community Church" />
                                </div>
                                <div>
                                    <Label htmlFor="service">Service of Interest</Label>
                                    <Select required>
                                        <SelectTrigger id="service">
                                            <SelectValue placeholder="Select a service..."/>
                                        </SelectTrigger>
                                        <SelectContent>
                                            {offerings.map(s => <SelectItem key={s.id} value={s.id}>{s.title}</SelectItem>)}
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div>
                                    <Label htmlFor="message">Your Message</Label>
                                    <Textarea id="message" placeholder="Tell us a bit about your needs..." required rows={4}/>
                                </div>
                                {status === 'error' && <p className="text-muted-foreground text-sm">Something went wrong. Please try again.</p>}
                                <Button type="submit" className="w-full" size="lg" disabled={status === 'submitting'}>
                                    {status === 'submitting' ? 'Sending...' : 'Request Consultation'}
                                </Button>
                            </form>
                        )}
                    </div>
                    <div className="hidden lg:block relative bg-muted/30" />
                </Card>
            </div>
        </section>
    )
} 
