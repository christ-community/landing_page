'use client';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { HelpOption } from '@/types';
import { HandHelping, Gift, BookOpen } from 'lucide-react';

const helpImages = [
  { src: '/worship-conference.jpeg', alt: 'Worship Conference' },
  { src: '/Church-Conference.jpg', alt: 'Church Conference' },
  { src: '/worship-conference.jpeg', alt: 'Community Worship' },
  { src: '/Church-Conference.jpg', alt: 'Faith Gathering' },
];

const options: HelpOption[] = [
  { label: 'Volunteer', icon: <HandHelping className="w-6 h-6" />, image: '/worship-conference.jpeg', href: '/get-involved/volunteer-with-us' },
  { label: 'Order Tracts', icon: <BookOpen className="w-6 h-6" />, image: '/worship-conference.jpeg', href: '/get-involved/order-a-tract' },
  { label: 'Give Monthly', icon: <Gift className="w-6 h-6" />, image: '/worship-conference.jpeg', href: '/donate' },
];

export default function HelpSection() {
  return (
    <section className="relative py-32 bg-gradient-to-br from-orange-500/20 via-amber-400/10 to-red-500/20 text-foreground overflow-hidden min-h-[80vh]">
      {/* Enhanced orange gradient background */}
      <div className="absolute inset-0 bg-gradient-to-r from-orange-400/30 via-amber-300/20 to-orange-500/30" />
      <div className="absolute inset-0 bg-gradient-to-bl from-transparent via-orange-300/10 to-amber-400/20" />
      
      <div className="container mx-auto px-4 lg:px-8 relative z-10 h-full">
        <div className="flex flex-col lg:flex-row gap-20 items-center min-h-[60vh]">
          
          {/* Visual Grid - Left Side - Simplified */}
          <div className="w-full lg:w-[55%] max-w-4xl">
            <div className="grid grid-cols-2 gap-4">
              {helpImages.map((image, index) => (
                <div 
                  key={index} 
                  className="relative w-full h-48 overflow-hidden rounded-lg shadow-lg"
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
            
            {/* Floating action indicators */}
            <div className="flex justify-center mt-12 space-x-6">
              {options.map((option, index) => (
                <Link
                  key={index}
                  href={option.href}
                  className="flex flex-col items-center space-y-3 p-4 rounded-xl bg-white/20 backdrop-blur-md border border-white/30 hover:bg-white/30 hover:border-white/50 transition-all duration-300 group cursor-pointer shadow-lg hover:shadow-xl"
                >
                  <div className="text-tertiary group-hover:text-orange-600 transition-colors duration-300">
                    {option.icon}
                  </div>
                  <span className="text-sm font-semibold text-foreground group-hover:text-orange-600 transition-colors duration-300">
                    {option.label}
                  </span>
                </Link>
              ))}
            </div>
          </div>

          {/* Text Content - Right Side */}
          <div className="w-full lg:w-[45%] max-w-2xl space-y-10 lg:pl-8">
            <div className="space-y-8">
              <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-[0.9] bg-gradient-to-r from-foreground via-orange-600 to-foreground bg-clip-text text-transparent">
                Join the Mission. Make a Difference.
              </h2>
              <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed">
                Whether it's giving, volunteering, or sharing, you can be part of changing lives through Christ. Every contribution helps lift, heal, and empower.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-6">
              <Button 
                size="lg" 
                className="bg-tertiary text-tertiary-foreground hover:bg-orange-600 hover:text-white shadow-xl hover:shadow-2xl transition-all duration-300 px-10 py-6 text-lg font-semibold"
                asChild
              >
                <Link href="/get-involved/volunteer-with-us">Volunteer Now</Link>
              </Button>

            </div>
            
            {/* Stats or additional info */}
            <div className="pt-10 border-t border-orange-200/30 dark:border-orange-700/30">
              <div className="grid grid-cols-2 gap-8 text-center">
                <div>
                  <div className="text-4xl font-bold text-orange-600">50+</div>
                  <div className="text-base text-muted-foreground font-medium">Active Volunteers</div>
                </div>
                <div>
                  <div className="text-4xl font-bold text-orange-600">25</div>
                  <div className="text-base text-muted-foreground font-medium">Missions Supported</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}