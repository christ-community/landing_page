'use client';
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { Heart, Loader2, CreditCard } from 'lucide-react';
import getStripe from '@/lib/stripe';
import type { IHelpImpact, ICommunityStat, IPageHero } from '../../types/contentful';

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
  pageHero?: IPageHero | null;
}

const GiveToday = ({ helpImpact, communityStats, pageHero }: GiveTodayProps) => {
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

      const data = await response.json();

      if (data.url) {
        window.location.href = data.url;
      } else {
        console.error('No payment URL received');
      }
    } catch (error) {
      console.error('Payment processing error:', error);
      alert('There was an error processing your donation. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <section className="section bg-muted/20">
      <div className="section-inner">
        <div className="max-w-5xl mx-auto grid lg:grid-cols-2 gap-10 items-start">
          <div className="stack-lg text-center lg:text-left">
            <div className="stack">
              <p className="eyebrow">Give Today</p>
              <h2 className="section-title">Serving our communities</h2>
              <p className="section-lead max-w-md mx-auto lg:mx-0">
                Your generosity enables us to support our ministries, reach out to those in need, and share the hope of the gospel with the world.
              </p>
            </div>
          </div>

          <div className="w-full max-w-md mx-auto bg-card rounded-[var(--radius)] p-6 shadow-sm border border-border/40">
            <div className="grid grid-cols-2 gap-4 bg-muted/60 p-2 rounded-[var(--radius)] mb-6">
              <Button
                variant={frequency === 'once' ? 'default' : 'ghost'}
                onClick={() => setFrequency('once')}
                className="h-10"
              >
                Give Once
              </Button>
              <Button
                variant={frequency === 'monthly' ? 'default' : 'ghost'}
                onClick={() => setFrequency('monthly')}
                className="h-10 flex items-center gap-2"
              >
                <Heart className={cn('w-4 h-4', frequency === 'monthly' ? 'text-primary-foreground' : '')} />
                Monthly
              </Button>
            </div>

            <p className="text-sm font-medium text-muted-foreground text-center mb-4">Choose an amount</p>

            <div className="grid grid-cols-2 gap-4 mb-6">
              {presetAmounts.map(preset => (
                <Button
                  key={preset}
                  variant={selectedPreset === preset ? 'default' : 'outline'}
                  className="h-12 text-base font-semibold"
                  onClick={() => handleAmountClick(preset)}
                >
                  {currentCurrency.label}{preset}
                </Button>
              ))}
            </div>

            <div className="flex items-center h-12 w-full text-base font-semibold bg-muted/40 rounded-[var(--radius)] border border-border/40 focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/20 transition-all px-4 mb-6">
              <span className="text-lg font-semibold text-muted-foreground pr-3">
                {currentCurrency.label}
              </span>
              <Input
                type="text"
                inputMode="decimal"
                placeholder="50"
                value={amount}
                onChange={handleCustomAmountChange}
                className="h-auto w-full text-left text-lg font-semibold bg-transparent p-0 border-none focus:ring-0"
              />
              <select
                value={currency}
                onChange={(e) => setCurrency(e.target.value)}
                className="bg-transparent text-sm font-semibold text-muted-foreground border-none focus:ring-0 appearance-none pr-6 -mr-2"
                style={{ backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e")`, backgroundPosition: 'right 0.2rem center', backgroundRepeat: 'no-repeat', backgroundSize: '1.5em 1.5em' }}
              >
                {currencies.map(c => (
                  <option key={c.value} value={c.value} className="bg-background text-foreground">
                    {c.value}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex items-center gap-4 mb-6">
              <input
                type="checkbox"
                id="dedicate-donation"
                checked={isDedicated}
                onChange={(e) => setIsDedicated(e.target.checked)}
                className="h-5 w-5 rounded border border-muted-foreground/40 text-primary focus:ring-primary/50 bg-muted/40"
              />
              <label htmlFor="dedicate-donation" className="text-sm font-medium text-foreground cursor-pointer">
                Dedicate this donation
              </label>
            </div>

            <Button
              size="lg"
              onClick={handleDonate}
              className="w-full"
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
