'use client'; // 👈 Necessary for using useState in Next.js App Router

import { Button } from '@/components/ui/button';
import { useState } from 'react';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '', email: '', subject: '', message: '',
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const result = await res.json();
      alert(result.message);
    } catch (error) {
      alert('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-20 text-center">
      <div className="max-w-xl mx-auto mt-10 p-4">
        <h1 className="text-2xl font-bold mb-4">Contact Us</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            name="name"
            placeholder="Name"
            required
            className="w-full p-2 border rounded"
            onChange={handleChange}
          />
          <input
            name="email"
            placeholder="Email"
            type="email"
            required
            className="w-full p-2 border rounded"
            onChange={handleChange}
          />
          <input
            name="subject"
            placeholder="Subject"
            required
            className="w-full p-2 border rounded"
            onChange={handleChange}
          />
          <textarea
            name="message"
            placeholder="Message"
            required
            rows={5}
            className="w-full p-2 border rounded"
            onChange={handleChange}
          ></textarea>
          <Button
            type="submit"
            disabled={loading}
              className="w-full bg-tertiary text-tertiary-foreground hover:bg-tertiary/90"
                      size="lg"
          >
            {loading ? 'Sending...' : 'Send'}
          </Button>
        </form>
      </div>
    </div>
  );
}
