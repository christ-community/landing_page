import { Metadata } from 'next';
import { useState } from 'react';

export const metadata: Metadata = {
  title: 'Contact Us | Christ Community',
};

export default function ContactPage() {

  const [formData, setFormData] = useState({
    name: '', email: '', subject: '', message: '',
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e: any) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    const res = await fetch('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });
    const result = await res.json();
    alert(result.message);
    setLoading(false);
  };
  return (
    <div className="container mx-auto px-4 py-20 text-center">
       <div className="max-w-xl mx-auto mt-10 p-4">
      <h1 className="text-2xl font-bold mb-4">Contact Us</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input name="name" placeholder="Name" required className="w-full p-2 border rounded" onChange={handleChange} />
        <input name="email" placeholder="Email" type="email" required className="w-full p-2 border rounded" onChange={handleChange} />
        <input name="subject" placeholder="Subject" required className="w-full p-2 border rounded" onChange={handleChange} />
        <textarea name="message" placeholder="Message" required rows={5} className="w-full p-2 border rounded" onChange={handleChange}></textarea>
        <button type="submit" disabled={loading} className="bg-blue-600 text-white px-4 py-2 rounded">
          {loading ? 'Sending...' : 'Send'}
        </button>
      </form>
      </div>
    </div>
  
    </div>
  );
} 