"use client";

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Loader2 } from 'lucide-react';

const MailingList = () => {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const response = await fetch('/api/newsletter', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      if (response.ok) {
        console.log('Mailing list subscription successful');
        // You might want to show a success message here
      } else {
        console.error('Mailing list subscription failed');
      }
    } catch (error) {
      console.error('Mailing list subscription error:', error);
    } finally {
      setIsSubmitting(false);
    }
    
    setEmail('');
  };

  return (
    <div className="bg-secondary text-secondary-foreground">
      <div className="section-inner py-8">
        <div className="flex flex-col lg:flex-row justify-between items-center gap-6">
          <div className="text-center lg:text-left">
            <h3 className="text-2xl font-semibold">Join our mailing list</h3>
            <p className="text-secondary-foreground/70">Stay up to date with our latest news and updates.</p>
          </div>
          <form onSubmit={handleSubmit} className="flex w-full max-w-md bg-background rounded-[var(--radius)] overflow-hidden border border-border/40">
            <Input
              type="email"
              required
              placeholder="Enter your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-transparent border-none focus-visible:ring-0 text-foreground placeholder:text-muted-foreground flex-1 rounded-l-[var(--radius)] rounded-r-none"
            />
            <Button type="submit" className="rounded-r-[var(--radius)] rounded-l-none px-6" disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Joining
                </>
              ) : (
                "Join now"
              )}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default MailingList; 
