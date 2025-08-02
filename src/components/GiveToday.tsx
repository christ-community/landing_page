'use client';
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { Heart, Loader2, CreditCard } from 'lucide-react';
import getStripe from '@/lib/stripe';
import type { IHelpImpact, ICommunityStat } from '../../types/contentful';

const presetAmounts = [5, 10, 25, 50, 100, 250];
const currencies = [
  { value: 'GBP', label: '£' },
  { value: 'USD', label: '$' },
  { value: 'EUR', label: '€' },
];

type Frequency = 'once' | 'monthly';

interface GiveTodayProps {
  helpImpact?: IHelpImpact[];
  communityStats?: ICommunityStat[];
}

const GiveToday = ({ helpImpact, communityStats }: GiveTodayProps) => {
  const [amount, setAmount] = useState<number | string>(50);
  const [currency, setCurrency] = useState('GBP');
  const [frequency, setFrequency] = useState<Frequency>('monthly');
  const [isDedicated, setIsDedicated] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  const [selectedPreset, setSelectedPreset] = useState<number | null>(50);

  const handleAmountClick = (presetAmount: number) => {
    setAmount(presetAmount);
    setSelectedPreset(presetAmount);
  };

  const handleCustomAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSelectedPreset(null);
    if (value === '' || /^[0-9]*\.?[0-9]*$/.test(value)) {
      setAmount(value);
    }
  };

  const currentCurrency = currencies.find(c => c.value === currency) || currencies[0];
  const displayAmount = amount || 0;

  const handleDonate = async () => {
    if (!displayAmount || Number(displayAmount) <= 0) return;

    setIsProcessing(true);

    try {
      const response = await fetch('/api/create-payment-intent', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount: Number(displayAmount),
          currency: currency,
          frequency: frequency,
          isDedicated: isDedicated,
          dedicationMessage: isDedicated ? 'Dedicated donation' : undefined,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to create payment session');
      }

      const { url, sessionId } = await response.json();

      if (url) {
        // Redirect to Stripe Checkout
        window.location.href = url;
      } else {
        console.error('No checkout URL received');
      }
    } catch (error) {
      console.error('Payment processing error:', error);
      alert('There was an error processing your donation. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <section className="relative py-24 bg-gradient-to-br from-blue-50/30 via-sky-50/30 to-blue-100/40 dark:from-blue-950/30 dark:via-sky-950/20 dark:to-blue-900/30 overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-0 left-0 -translate-x-1/3 -translate-y-1/3 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-0 translate-x-1/3 translate-y-1/3 w-96 h-96 bg-tertiary/10 rounded-full blur-3xl" />

      <div className="container mx-auto px-6 lg:px-12 relative">
        <div className="max-w-4xl mx-auto grid lg:grid-cols-2 gap-x-24 gap-y-12 items-center">
          
          <div className="text-center lg:text-left">
            <h2 className="text-4xl lg:text-5xl font-bold text-foreground mb-6 leading-tight">
              Serving our communities
            </h2>
            <p className="text-lg text-muted-foreground max-w-md mx-auto lg:mx-0">
              Your generosity enables us to support our ministries, reach out to those in need, and share the hope of the gospel with the world.
            </p>
          </div>

          <div className="w-full max-w-md mx-auto bg-background/80 backdrop-blur-md rounded-2xl p-6 sm:p-8 shadow-2xl border border-border/10">
            <div className="grid grid-cols-2 gap-2 bg-muted/60 p-1.5 rounded-xl mb-6">
              <Button
                variant="ghost"
                onClick={() => setFrequency('once')}
                className={cn(
                  'py-3 text-base rounded-lg transition-all',
                  frequency === 'once' ? 'bg-background shadow-sm' : 'text-muted-foreground hover:bg-background/50'
                )}
              >
                Give Once
              </Button>
              <Button
                variant="ghost"
                onClick={() => setFrequency('monthly')}
                className={cn(
                  'py-3 text-base rounded-lg transition-all flex items-center gap-2',
                  frequency === 'monthly' ? 'bg-primary/90 text-primary-foreground shadow-sm' : 'text-muted-foreground hover:bg-background/50'
                )}
              >
                <Heart className={cn('w-4 h-4', frequency === 'monthly' ? 'text-tertiary' : '')} />
                Monthly
              </Button>
            </div>
            
            <p className="text-sm font-medium text-muted-foreground text-center mb-4">Your most generous donation</p>
            
            <div className="grid grid-cols-2 gap-3 mb-6">
              {presetAmounts.map(preset => (
                <Button
                  key={preset}
                  variant="outline"
                  className={cn(
                    'h-14 text-lg font-semibold transition-all duration-300 border-2 rounded-lg',
                    selectedPreset === preset
                      ? 'bg-tertiary border-tertiary text-tertiary-foreground'
                      : 'border-border/20 hover:border-primary/50 hover:bg-accent/50'
                  )}
                  onClick={() => handleAmountClick(preset)}
                >
                  {currentCurrency.label}{preset}
                </Button>
              ))}
            </div>

            <div className="flex items-center h-16 w-full text-lg font-bold bg-muted/50 rounded-lg border-2 border-border/20 focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/20 transition-all px-4 mb-6">
                <span className="text-2xl font-bold text-muted-foreground pr-3">
                    {currentCurrency.label}
                </span>
                <Input
                    type="text"
                    inputMode="decimal"
                    placeholder="50"
                    value={amount}
                    onChange={handleCustomAmountChange}
                    className="h-auto w-full text-left text-2xl font-bold bg-transparent p-0 border-none focus:ring-0"
                />
                <select
                    value={currency}
                    onChange={(e) => setCurrency(e.target.value)}
                    className="bg-transparent text-lg font-semibold text-muted-foreground border-none focus:ring-0 appearance-none pr-6 -mr-2"
                    style={{ backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e")`, backgroundPosition: 'right 0.2rem center', backgroundRepeat: 'no-repeat', backgroundSize: '1.5em 1.5em' }}
                >
                    {currencies.map(c => (
                        <option key={c.value} value={c.value} className="bg-background text-foreground">
                            {c.value}
                        </option>
                    ))}
                </select>
            </div>
            
            <div className="flex items-center gap-3 mb-6">
              <input 
                type="checkbox"
                id="dedicate-donation"
                checked={isDedicated}
                onChange={(e) => setIsDedicated(e.target.checked)}
                className="h-5 w-5 rounded border-2 border-muted-foreground/50 text-primary focus:ring-primary/50 bg-muted/50"
              />
              <label htmlFor="dedicate-donation" className="text-sm font-medium text-foreground cursor-pointer">
                Dedicate this donation
              </label>
            </div>

            <Button 
              size="lg"
              onClick={handleDonate}
              className="w-full h-14 text-lg font-bold bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg hover:shadow-xl transition-all"
              disabled={!displayAmount || Number(displayAmount) <= 0 || isProcessing}
            >
              {isProcessing ? (
                <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  Processing...
                </>
              ) : (
                <>
                  <CreditCard className="mr-2 h-5 w-5" />
                  Donate {currentCurrency.label}{displayAmount} {frequency === 'monthly' ? 'Monthly' : ''}
                </>
              )}
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GiveToday; 