'use client';

import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-accent/20 to-background">
      {/* Header Component */}
      <Header />
      
      {/* Hero Section */}
      <HeroSection />
      
      {/* Main Content Area */}
      <main className="container mx-auto px-4 lg:px-8 py-12">
        {/* Additional content sections will be added here later */}
      </main>
    </div>
  );
}
