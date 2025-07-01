'use client';

import HeroSection from "@/components/HeroSection";

export default function Home() {
  return (
    <>
      <HeroSection />
      
      <div className="container mx-auto px-4 lg:px-8 py-12">
        {/* Additional content sections will be added here later */}
        <h2 className="text-2xl font-bold">Main Content Area</h2>
      </div>
    </>
  );
}
