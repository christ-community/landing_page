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
        <section className="section min-h-[60vh] bg-muted/20">
            <div className="section-inner">
                <div className="relative overflow-hidden rounded-[var(--radius)] border border-border/40">
                    <Image
                        src={image}
                        alt={title}
                        fill
                        className="object-cover opacity-20"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-card via-card/70 to-transparent" />

                    <motion.div
                        className="relative z-10 flex flex-col items-center justify-center text-center px-8 py-16 min-h-[50vh]"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <div className="max-w-3xl stack-lg">
                            <div className="stack">
                                <p className="eyebrow">What We Do</p>
                                <h1>{title}</h1>
                            </div>
                            <p className="section-lead">
                                {subtitle}
                            </p>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    )
}
