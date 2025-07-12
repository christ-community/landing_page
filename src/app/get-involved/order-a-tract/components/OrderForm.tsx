'use client';

import { useState, useEffect, useMemo } from 'react';
import { useSearchParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { DollarSign, Loader2, PartyPopper, CheckCircle } from 'lucide-react';
import type { Tract, OrderFormConfig, OrderData } from '@/types';

// Dummy Data - should be consistent with TractCatalog
const allTracts: Tract[] = [
    { id: '1', title: "The Four Spiritual Laws", description: "A classic and effective presentation of the gospel message.", coverImage: "/Church-Conference.jpg", tags: ["Foundation", "Classic"], samplePages: [], pricePer100: 15.00, isPopular: true, language: "English" },
    { id: '2', title: "More Than a Carpenter", description: "Explores the claims of Jesus Christ and their validity.", coverImage: "/worship-conference.jpeg", tags: ["Apologetics", "Youth"], samplePages: [], pricePer100: 18.00, isPopular: true, language: "English" },
    { id: '3', title: "The Case for Christ", description: "A journalist's investigation into the evidence for Jesus.", coverImage: "/Church-Conference.jpg", tags: ["Apologetics", "Skeptics"], samplePages: [], pricePer100: 20.00, isPopular: false, language: "English" },
    { id: '4', title: "God's Love Story", description: "A simple, narrative-driven tract about God's love.", coverImage: "/worship-conference.jpeg", tags: ["Story", "Children"], samplePages: [], pricePer100: 12.00, isPopular: false, language: "English" },
    { id: '5', title: "Las Cuatro Leyes Espirituales", description: "A classic and effective presentation of the gospel message.", coverImage: "/Church-Conference.jpg", tags: ["Foundation", "Classic"], samplePages: [], pricePer100: 15.00, isPopular: false, language: "Spanish" },
    { id: '6', title: "Finding Hope", description: "A tract designed for those going through difficult times.", coverImage: "/worship-conference.jpeg", tags: ["Hope", "Outreach"], samplePages: [], pricePer100: 16.00, isPopular: true, language: "English" },
];

const defaultConfig: OrderFormConfig = {
  title: "Request Your Tracts",
  subtitle: "Fill out the form below to complete your request. Shipping is free for all orders.",
  fields: {
    name: { label: "Full Name", placeholder: "Your Name" },
    email: { label: "Email Address", placeholder: "your.email@example.com" },
    address: { label: "Shipping Address", placeholder: "123 Main St, Anytown, USA" },
    tract: { label: "Selected Tract", placeholder: "Select a tract from the catalog above" },
    quantity: { label: "Number of Tracts", placeholder: "e.g., 50" },
  },
  submitButtonText: "Submit Request"
};

export default function OrderForm() {
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
    return allTracts.find(t => t.id === formData.tractId);
  }, [formData.tractId]);

  const estimatedDonation = useMemo(() => {
    if (!selectedTract || !formData.quantity) return 0;
    const pricePerTract = selectedTract.pricePer100 / 100;
    return pricePerTract * formData.quantity;
  }, [selectedTract, formData.quantity]);


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmissionStatus(null);
    await new Promise(resolve => setTimeout(resolve, 1500));
    if (formData.tractId && formData.name && formData.email && formData.address && formData.quantity > 0) {
      console.log("Form Submitted:", { ...formData, estimatedDonation });
      setSubmissionStatus('success');
    } else {
      setSubmissionStatus('error');
    }
    setIsSubmitting(false);
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
                      {allTracts.map(tract => (
                        <SelectItem key={tract.id} value={tract.id}>{tract.title}</SelectItem>
                      ))}
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
              
              <Card className="bg-muted/50 border-dashed">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <DollarSign className="w-5 h-5 mr-2 text-green-500"/>
                    Optional Donation
                  </CardTitle>
                  <CardDescription>
                    Our tracts are free, but a suggested donation helps us cover printing and shipping costs to continue this ministry.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-medium">Suggested Donation:</span>
                    <span className="text-2xl font-bold text-foreground">
                      ${estimatedDonation.toFixed(2)}
                    </span>
                  </div>
                </CardContent>
              </Card>

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