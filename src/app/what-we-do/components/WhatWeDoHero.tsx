'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';

interface WhatWeDoHeroProps {
  title: string;
  subtitle: string;
  image: string;
}

export default function WhatWeDoHero({ title, subtitle, image }: WhatWeDoHeroProps) {
    return (
        <section className="relative h-[60vh] bg-black">
            <Image 
                src={image}
                alt={title}
                fill
                className="object-cover opacity-40"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/20" />

            <motion.div 
                className="relative z-10 flex flex-col items-center justify-center h-full text-center text-white px-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
            >
                <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight">
                    {title}
                </h1>
                <p className="mt-6 text-lg md:text-xl max-w-3xl text-white/80">
                    {subtitle}
                </p>
            </motion.div>
        </section>
    )
} 