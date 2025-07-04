'use client';

import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

interface ConsultationHeroProps {
  title: string;
  subtitle: string;
  image: string;
}

export default function ConsultationHero({ title, subtitle, image }: ConsultationHeroProps) {
  return (
    <section className="bg-gradient-to-br from-gray-50 via-sky-100/40 to-blue-100/50 dark:from-gray-900 dark:via-sky-950/20 dark:to-blue-950/30">
        <div className="container mx-auto px-6 lg:px-12 py-24">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
                <motion.div 
                    className="text-center lg:text-left"
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-foreground tracking-tight mb-6">
                        {title}
                    </h1>
                    <p className="text-lg md:text-xl text-muted-foreground max-w-xl mx-auto lg:mx-0 mb-10">
                        {subtitle}
                    </p>
                    <Button size="lg" className="px-8 py-6 text-lg">
                        Book a Free Discovery Call
                    </Button>
                </motion.div>
                <motion.div
                    className="relative w-full h-80 lg:h-[500px]"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                >
                    <Image
                        src={image}
                        alt={title}
                        fill
                        className="object-cover rounded-2xl shadow-2xl"
                    />
                </motion.div>
            </div>
        </div>
    </section>
  )
} 