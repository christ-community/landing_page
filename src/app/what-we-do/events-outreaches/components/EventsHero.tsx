'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Download } from 'lucide-react';
import { motion } from 'framer-motion';
import React from 'react';

interface EventsHeroProps {
  brandIconNode?: React.ReactNode;
  title: string;
  subtitle: string;
  primaryCta: { text: string; href: string; };
  mainImage: string;
  previewImage: string;
  previewLabel: string;
}

export default function EventsHero({
  brandIconNode,
  title,
  subtitle,
  primaryCta,
  mainImage,
  previewImage,
  previewLabel,
}: EventsHeroProps) {
  return (
    <div className="bg-[#111] text-white overflow-x-hidden">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="grid lg:grid-cols-5 gap-12 items-center py-24 min-h-[80vh]">
          {/* Left Side: Text Content */}
          <motion.div 
            className="flex flex-col items-center lg:items-start text-center lg:text-left lg:col-span-2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            {brandIconNode}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter leading-tight mb-6">
              {title}
            </h1>
            <p className="text-lg md:text-xl text-white/70 max-w-xl mb-10">
              {subtitle}
            </p>
            <div className="flex items-center gap-4">
              <Button size="lg" asChild className="bg-white text-black hover:bg-gray-200 font-semibold px-8 py-6 rounded-lg">
                <Link href={primaryCta.href}>{primaryCta.text}</Link>
              </Button>
             
            </div>
          </motion.div>
          
          {/* Right Side: Image Content */}
          <motion.div 
            className="relative lg:col-span-3 h-[60vh]"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="relative w-full h-full rounded-2xl overflow-hidden shadow-2xl shadow-purple-500/10">
              <Image src={mainImage} alt={title} fill className="object-cover" priority />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <div 
                className="absolute -inset-40 opacity-40"
                style={{
                  background: 'radial-gradient(ellipse 80% 50% at 90% 110%, rgba(168, 85, 247, 0.4), transparent)'
                }}
              />
               <div 
                className="absolute -inset-40 opacity-50"
                style={{
                  background: 'linear-gradient(to right, rgba(168, 85, 247, 0.2) 0%, transparent 60%)'
                }}
              />
            </div>
            <motion.div 
              className="absolute -bottom-10 left-10 w-1/2 bg-black/50 backdrop-blur-md rounded-lg p-3 border border-white/10 shadow-xl"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              <div className="relative aspect-video rounded overflow-hidden">
                <Image src={previewImage} alt={previewLabel} fill className="object-cover" />
              </div>
              <p className="text-sm font-semibold mt-2 text-center text-orange-400">{previewLabel}</p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  );
} 