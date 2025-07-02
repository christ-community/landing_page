"use client";

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const MailingList = () => {
  const [email, setEmail] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Submitted email for mailing list:', email);
    setEmail('');
  };

  return (
    <div className="bg-secondary">
      <div className="container mx-auto px-6 lg:px-12 py-12">
        <div className="flex flex-col lg:flex-row justify-between items-center gap-8">
          <div className="text-center lg:text-left">
            <h3 className="text-2xl font-bold text-primary mb-2">Join our mailing list</h3>
            <p className="text-primary/70">Stay up to date with our latest news and updates.</p>
          </div>
          <form onSubmit={handleSubmit} className="flex w-full max-w-md bg-background rounded-md overflow-hidden border border-border/20">
            <Input
              type="email"
              required
              placeholder="Enter your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-transparent border-none focus-visible:ring-0 text-foreground placeholder:text-muted-foreground flex-1 px-4"
            />
            <Button type="submit" className="rounded-l-none bg-black text-white hover:bg-black/80 px-6">
              Join now
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default MailingList; 