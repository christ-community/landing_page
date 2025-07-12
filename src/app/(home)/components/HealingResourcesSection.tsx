"use client"

import React, { useCallback, useEffect, useState } from 'react'
import Image from 'next/image';
import useEmblaCarousel from 'embla-carousel-react'
import Autoplay from 'embla-carousel-autoplay'
import { Button } from '@/components/ui/button'

import type { HealingResource } from '@/types';

const resources: HealingResource[] = [
  {
    id: '1',
    title: 'Peace in the Storm',
    image: '/worship-conference.jpeg',
    format: 'Guide',
    description: 'A devotional guide to finding God\'s peace amid life\'s hardest moments.',
    tags: ['devotional', 'peace', 'comfort'],
    href: '/resources/peace-in-the-storm',
    isFeatured: true,
  },
  {
    id: '2',
    title: 'Healing Scriptures',
    image: '/Church-Conference.jpg',
    format: 'Podcast',
    description: 'Soak in curated Bible verses read aloud to strengthen your faith for healing.',
    tags: ['scripture', 'healing', 'faith'],
    href: '/resources/healing-scriptures',
    isFeatured: true,
  },
  {
    id: '3',
    title: 'Restoration Series',
    image: '/worship-conference.jpeg',
    format: 'Video',
    description: 'Teaching series focused on emotional and spiritual restoration through Christ.',
    tags: ['restoration', 'teaching', 'healing'],
    href: '/resources/restoration-series',
    isFeatured: false,
  },
  {
    id: '4',
    title: 'Finding Joy',
    image: '/Church-Conference.jpg',
    format: 'Article',
    description: 'An encouraging article on cultivating joy even in difficult seasons.',
    tags: ['joy', 'encouragement', 'article'],
    href: '/resources/finding-joy',
    isFeatured: false,
  },
];


const PrevButton = (props: React.ComponentProps<typeof Button>) => {
  return (
    <Button variant="outline" size="icon" {...props} className="h-12 w-12 rounded-full bg-background/80 backdrop-blur-sm hover:bg-background">
      <svg width="24" height="24" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M8.84182 3.14182C9.03708 3.33708 9.03708 3.66301 8.84182 3.85827L4.69995 8.00014L8.84182 12.142C9.03708 12.3373 9.03708 12.6632 8.84182 12.8585C8.64656 13.0537 8.32063 13.0537 8.12537 12.8585L3.64182 8.35853C3.54424 8.26095 3.49545 8.13283 3.49545 8.00014C3.49545 7.86745 3.54424 7.73933 3.64182 7.64175L8.12537 3.14182C8.32063 2.94656 8.64656 2.94656 8.84182 3.14182Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path></svg>
      <span className="sr-only">Previous slide</span>
    </Button>
  )
}

const NextButton = (props: React.ComponentProps<typeof Button>) => {
  return (
    <Button variant="outline" size="icon" {...props} className="h-12 w-12 rounded-full bg-background/80 backdrop-blur-sm hover:bg-background">
      <svg width="24" height="24" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M6.15818 3.14182C6.35344 2.94656 6.67937 2.94656 6.87463 3.14182L11.3582 7.64175C11.4558 7.73933 11.5045 7.86745 11.5045 8.00014C11.5045 8.13283 11.4558 8.26095 11.3582 8.35853L6.87463 12.8585C6.67937 13.0537 6.35344 13.0537 6.15818 12.8585C5.96292 12.6632 5.96292 12.3373 6.15818 12.142L10.3001 8.00014L6.15818 3.85827C5.96292 3.66301 5.96292 3.33708 6.15818 3.14182Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path></svg>
      <span className="sr-only">Next slide</span>
    </Button>
  )
}

export default function HealingResourcesSection() {
    const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: 'start' }, [
        Autoplay({ playOnInit: true, delay: 5000, stopOnInteraction: false })
    ])
    const [prevBtnEnabled, setPrevBtnEnabled] = useState(false)
    const [nextBtnEnabled, setNextBtnEnabled] = useState(false)

    const scrollPrev = useCallback(() => emblaApi && emblaApi.scrollPrev(), [emblaApi])
    const scrollNext = useCallback(() => emblaApi && emblaApi.scrollNext(), [emblaApi])

    const onSelect = useCallback(() => {
        if (!emblaApi) return
        setPrevBtnEnabled(emblaApi.canScrollPrev())
        setNextBtnEnabled(emblaApi.canScrollNext())
    }, [emblaApi])

    useEffect(() => {
        if (!emblaApi) return
        onSelect()
        emblaApi.on('reInit', onSelect)
        emblaApi.on('select', onSelect)
    }, [emblaApi, onSelect])

    return (
        <section className="py-20 bg-background w-full">
            <div className="container mx-auto px-4 lg:px-8">
                <div className="flex flex-col md:flex-row justify-between items-center gap-8 mb-12">
                    <div className="text-center md:text-left">
                        <h2 className="text-4xl md:text-5xl font-bold tracking-tight leading-tight text-foreground">
                            Healing Resources
                        </h2>
                        <p className="text-lg text-muted-foreground mt-2">
                            Find encouragement, scripture-based tools, and practical help for your journey.
                        </p>
                    </div>
                     <div className="hidden md:flex justify-end items-center gap-4">
                        <PrevButton onClick={scrollPrev} disabled={!prevBtnEnabled} />
                        <NextButton onClick={scrollNext} disabled={!nextBtnEnabled} />
                    </div>
                </div>

                <div className="overflow-hidden" ref={emblaRef}>
                    <div className="flex -ml-4">
                        {resources.map(({ title, image, format, description }, index) => (
                            <div key={index} className="flex-[0_0_100%] md:flex-[0_0_50%] lg:flex-[0_0_33.33%] pl-4">
                                <div className="relative block h-96 overflow-hidden rounded-xl group cursor-pointer shadow-lg">
                                    <Image
                                        src={image}
                                        alt={title}
                                        fill
                                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent"></div>
                                    <div className="absolute bottom-0 left-0 p-6 text-white">
                                        <span className="px-2 py-0.5 text-xs font-medium uppercase rounded bg-tertiary text-tertiary-foreground mb-2 inline-block">
                                            {format}
                                        </span>
                                        <h3 className="text-xl font-bold">{title}</h3>
                                        <p className="text-sm text-white/90 opacity-0 group-hover:opacity-100 transition-opacity duration-300 max-w-xs">
                                            {description}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
} 