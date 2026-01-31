'use client';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { HelpOption } from '@/types';
import { HandHelping, Gift, BookOpen } from 'lucide-react';

const helpImages = [
  { src: '/Website photo 2.JPG', alt: 'Website Photo 2 - Community Worship' },
  { src: '/Website photo 4.jpg', alt: 'Website Photo 4 - Fellowship Event' },
  { src: '/Website photo use .jpg', alt: 'Website Photo Use - Community Gathering' },
  { src: '/Website photo used.jpg', alt: 'Website Photo Used - Service Event' },
];

const options: HelpOption[] = [
  { label: 'Volunteer', icon: <HandHelping className="w-6 h-6" />, image: '/Website photo 2.JPG', href: '/get-involved/volunteer-with-us' },
  { label: 'Order Tracts', icon: <BookOpen className="w-6 h-6" />, image: '/Website photo 4.jpg', href: '/get-involved/order-a-tract' },
  { label: 'Give Monthly', icon: <Gift className="w-6 h-6" />, image: '/Website photo use .jpg', href: '/donate' },
];

export default function HelpSection() {
  return (
    <section className="section bg-muted/30">
      <div className="section-inner">
        <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] items-center">
          <div className="grid grid-cols-2 gap-4">
            {helpImages.map((image, index) => (
              <div
                key={index}
                className="relative w-full h-48 overflow-hidden rounded-[var(--radius)] border border-border/40"
              >
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  className="object-cover"
                  loading={index < 2 ? "eager" : "lazy"}
                />
              </div>
            ))}
          </div>

          <div className="stack-lg">
            <div className="stack">
              <p className="eyebrow">Get Involved</p>
              <h2 className="section-title">Join the mission. Make a difference.</h2>
              <p className="section-lead">
                Whether it's giving, volunteering, or sharing, you can be part of changing lives through Christ. Every contribution helps lift, heal, and empower.
              </p>
            </div>

            <div className="flex flex-wrap gap-4">
              {options.map((option, index) => (
                <Button key={index} size="lg" variant="outline" asChild>
                  <Link href={option.href} className="flex items-center gap-2">
                    {option.icon}
                    {option.label}
                  </Link>
                </Button>
              ))}
            </div>

            <div className="grid grid-cols-2 gap-6 pt-6 border-t border-border/40">
              <div>
                <div className="text-3xl font-semibold text-foreground">50+</div>
                <div className="text-sm text-muted-foreground">Active Volunteers</div>
              </div>
              <div>
                <div className="text-3xl font-semibold text-foreground">25</div>
                <div className="text-sm text-muted-foreground">Missions Supported</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
