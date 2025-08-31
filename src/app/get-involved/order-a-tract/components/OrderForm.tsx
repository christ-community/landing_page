'use client';

import { useState, useEffect, useMemo } from 'react';
import { useSearchParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Loader2, PartyPopper } from 'lucide-react';
import type { Tract, OrderFormConfig, OrderData } from '@/types';

interface OrderFormProps {
  tracts?: any[];
}

const defaultConfig: OrderFormConfig = {
  title: "Order Your Tracts",
  subtitle: "Fill out the form below to complete your payment and order. Shipping is free for all orders.",
  fields: {
    name: { label: "Full Name", placeholder: "Your Name" },
    email: { label: "Email Address", placeholder: "your.email@example.com" },
    address: { label: "Shipping Address", placeholder: "123 Main St, Anytown, UK" },
    tract: { label: "Selected Tract", placeholder: "Select a tract from the catalog above" },
    quantity: { label: "Number of Tracts", placeholder: "e.g., 50" },
  },
  submitButtonText: "Proceed to Payment"
};

export default function OrderForm({ tracts = [] }: OrderFormProps) {
  const searchParams = useSearchParams();
  const selectedTractId = searchParams.get('selectedTractId');
  const formConfig = { ...defaultConfig };
  const [formData, setFormData] = useState<OrderData>({
    name: '', email: '', address: '', tractId: '', quantity: 100
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionStatus, setSubmissionStatus] = useState<'success' | 'error' | null>(null);



  useEffect(() => {
    if (selectedTractId) {
      setFormData(prev => ({ ...prev, tractId: selectedTractId }));
    }
  }, [selectedTractId]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: name === 'quantity' ? Number(value) : value }));
  };

  const handleTractChange = (tractId: string) => {
    setFormData(prev => ({ ...prev, tractId }));
  };

  const selectedTract = useMemo(() => {
    return tracts.find(t => {
      const tractId = t.id || t.sys?.id;
      return tractId === formData.tractId;
    });
  }, [formData.tractId, tracts]);

  const totalPrice = useMemo(() => {
    if (!selectedTract || !formData.quantity) return 0;
    // Contentful has pricePer100 in pence, convert to pounds per tract
    const pricePer100 = selectedTract.pricePer100 || 1500; // Default £15 per 100
    const pricePerTract = pricePer100 / 100; // Convert pence to pounds per tract
    // Calculate total price: price per tract × quantity
    return pricePerTract * formData.quantity;
  }, [selectedTract, formData.quantity]);


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmissionStatus(null);

    try {
      // Create Stripe checkout session
      const response = await fetch('/api/create-tract-checkout-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          tractTitle: selectedTract?.title,
          totalPrice: totalPrice,
          currency: 'gbp'
        }),
      });

      if (response.ok) {
        const data = await response.json();

        if (data.url) {
          window.location.href = data.url;
        } else {
          console.error('No payment URL received');
          setSubmissionStatus('error');
        }
      } else {
        setSubmissionStatus('error');
      }
    } catch (error) {
      console.error('Tract order submission error:', error);
      setSubmissionStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submissionStatus === 'success') {
    return (
      <section className="py-24" id="order-form">
        <div className="container mx-auto px-6 lg:px-12">
            <Card className="max-w-3xl mx-auto text-center p-8 bg-teal-50 dark:bg-teal-950/30 border-2 border-teal-200 dark:border-teal-800/50 rounded-2xl shadow-xl">
              <PartyPopper className="w-16 h-16 mx-auto text-teal-500 mb-4" />
              <h3 className="text-3xl font-bold text-foreground">Request Received!</h3>
              <p className="text-muted-foreground text-lg mt-3">Thank you for your request. We'll process it and get your tracts to you shortly.</p>
              <Button onClick={() => {
                  setSubmissionStatus(null);
                  setFormData({ name: '', email: '', address: '', tractId: '', quantity: 100 });
              }} className="mt-8 bg-teal-600 hover:bg-teal-700 text-white">
                Make Another Request
              </Button>
            </Card>
        </div>
      </section>
    );
  }

  return (
    <section className="py-24 bg-muted/40" id="order-form">
      <div className="container mx-auto px-6 lg:px-12">
        <Card className="max-w-3xl mx-auto bg-card border border-border/10 rounded-2xl shadow-xl overflow-hidden">
          <CardHeader className="text-center p-8">
            <CardTitle className="text-3xl font-bold text-foreground">{formConfig.title}</CardTitle>
            <CardDescription className="text-lg">{formConfig.subtitle}</CardDescription>
          </CardHeader>
          <CardContent className="p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="tract">{formConfig.fields.tract.label}</Label>
                  <Select onValueChange={handleTractChange} value={formData.tractId} required>
                    <SelectTrigger id="tract">
                      <SelectValue placeholder={formConfig.fields.tract.placeholder} />
                    </SelectTrigger>
                    <SelectContent>
                      {tracts.map(tract => {
                        const tractId = tract.id || tract.sys?.id;
                        const pricePer100 = tract.pricePer100 || 1500;
                        const pricePerTract = (pricePer100 / 100).toFixed(2);
                        return (
                          <SelectItem key={tractId} value={tractId}>
                            {tract.title} - £{pricePerTract} per tract
                          </SelectItem>
                        );
                      })}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="quantity">{formConfig.fields.quantity.label}</Label>
                  <Input id="quantity" name="quantity" type="number" min="1" placeholder={formConfig.fields.quantity.placeholder} onChange={handleInputChange} value={formData.quantity} required />
                </div>
              </div>
              <div>
                <Label htmlFor="name">{formConfig.fields.name.label}</Label>
                <Input id="name" name="name" placeholder={formConfig.fields.name.placeholder} onChange={handleInputChange} value={formData.name} required />
              </div>
              <div>
                <Label htmlFor="email">{formConfig.fields.email.label}</Label>
                <Input id="email" name="email" type="email" placeholder={formConfig.fields.email.placeholder} onChange={handleInputChange} value={formData.email} required />
              </div>
              <div>
                <Label htmlFor="address">{formConfig.fields.address.label}</Label>
                <Textarea id="address" name="address" placeholder={formConfig.fields.address.placeholder} onChange={handleInputChange} value={formData.address} required />
                             </div>
               
               <div className="bg-muted/20 p-4 rounded-lg border">
                 <div className="flex justify-between items-center">
                   <span className="text-lg font-medium text-foreground">Total Price:</span>
                   <span className="text-3xl font-bold text-foreground">
                     £{totalPrice.toFixed(2)}
                   </span>
                 </div>
                 {selectedTract && formData.quantity > 0 && (
                   <p className="text-sm text-muted-foreground mt-2">
                     {formData.quantity} × {selectedTract.title}
                   </p>
                 )}
               </div>
                                            

              {submissionStatus === 'error' && <p className="text-sm text-red-500">Please fill out all required fields.</p>}
              
              <Button type="submit" className="w-full bg-red-600 hover:bg-red-700 text-white text-lg py-6" disabled={isSubmitting}>
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    Submitting...
                  </>
                ) : (
                  formConfig.submitButtonText
                )}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </section>
  );
} 