import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import type { HeroConfig } from "@/types";

// Default configuration - this will later come from Contentful
const defaultHeroConfig: HeroConfig = {
  content: {
    title: "Building community through Christ",
    description: "Join us as we gather to worship, grow in faith, and serve our community together. Experience God's love in a welcoming environment where everyone belongs.",
    buttons: [
      { label: "Join Us Sunday", variant: "primary" },
      { label: "Plan Your Visit", variant: "secondary" },
    ]
  },
  images: [
    {
      src: "/Church-Conference.jpg",
      alt: "Church conference with speaker and congregation"
    },
    {
      src: "/worship-conference.jpeg", 
      alt: "Worship service with band and congregation"
    }
  ],
  autoChangeInterval: 12000,
  connectButtonLabel: "Connect with us"
};

interface HeroSectionProps {
  config?: Partial<HeroConfig>;
}

const HeroSection = ({ config }: HeroSectionProps) => {
  const heroConfig = { ...defaultHeroConfig, ...config };
  const { content, images, autoChangeInterval, connectButtonLabel } = heroConfig;
  
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Auto-change images
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => 
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
      );
    }, autoChangeInterval);

    return () => clearInterval(interval);
  }, [images.length, autoChangeInterval]);

  return (
    <section className="relative h-[90vh] bg-secondary overflow-hidden">
      {/* Background with angled image layout */}
      <div className="absolute inset-0 flex">
        {/* Left area with gradient flowing from top */}
        <div className="w-[40%] bg-gradient-to-b from-tertiary/30 via-secondary to-primary/10"></div>
        
        {/* Right area with angled image - larger now */}
        <div className="w-[60%] relative">
          <div className="absolute inset-0 bg-gradient-to-l from-transparent to-secondary/60 z-10"></div>
          
          {images.map((image, index) => (
            <div
              key={index}
              className={`absolute inset-0 transition-all duration-2000 ease-in-out ${
                index === currentImageIndex ? 'opacity-100' : 'opacity-0'
              }`}
            >
              <img 
                src={image.src} 
                alt={image.alt}
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                  const parent = e.currentTarget.parentElement;
                  if (parent) {
                    parent.style.background = 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)';
                  }
                }}
              />
            </div>
          ))}
        </div>
              </div>
              
      {/* Content Container - Bottom left position */}
      <div className="relative z-20 h-full flex items-end">
        <div className="container mx-auto px-6 lg:px-12 pb-20">
          <div className="max-w-2xl">
            {/* Main Heading - Tighter spacing */}
            <h1 className="text-5xl lg:text-7xl font-bold text-primary leading-[0.85] mb-8 drop-shadow-lg">
              {content.title}
              {content.subtitle && (
                <>
                  <br />
                  <span className="text-primary">{content.subtitle}</span>
                </>
              )}
              </h1>
              
              {/* Description */}
            <p className="text-lg lg:text-xl text-primary/90 leading-relaxed mb-10 max-w-xl drop-shadow-md">
              {content.description}
              </p>
              
              {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              {content.buttons.map((button, index) => (
                <Button 
                  key={index}
                  size="lg"
                  className={
                    button.variant === 'primary'
                      ? "bg-primary text-primary-foreground hover:bg-primary/90 px-8 py-4 text-lg font-semibold rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl"
                      : "bg-tertiary hover:bg-tertiary/90 text-tertiary-foreground px-8 py-4 text-lg font-semibold rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl"
                  }
                  onClick={button.onClick}
                  asChild={!!button.href}
                >
                  {button.href ? (
                    <a href={button.href}>{button.label}</a>
                  ) : (
                    button.label
                  )}
                </Button>
              ))}
            </div>
          </div>
        </div>
              </div>
              
      {/* Connect Widget - Bottom Right */}
      {connectButtonLabel && (
        <div className="absolute bottom-6 right-6 z-30">
          <Button 
            variant="secondary"
            className="bg-primary/10 backdrop-blur-sm text-primary border border-primary/20 hover:bg-primary/20 px-5 py-2.5 text-sm rounded-full shadow-lg transition-all duration-300"
          >
            {connectButtonLabel}
          </Button>
        </div>
      )}

      {/* Image Indicators - Bottom Center */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 z-30 flex space-x-2">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentImageIndex(index)}
            className={`w-2.5 h-2.5 rounded-full transition-all duration-500 ${
              index === currentImageIndex 
                ? 'bg-primary shadow-lg' 
                : 'bg-primary/40 hover:bg-primary/60'
            }`}
          />
        ))}
      </div>
      
      {/* Enhanced vivid red line with multiple effects using tertiary color */}
      <div className="absolute bottom-0 left-0 right-0 z-25">
        {/* Glowing tertiary line with gradient effect */}
        <div className="h-1 bg-gradient-to-r from-tertiary/60 via-tertiary to-tertiary/60 shadow-lg"></div>
        {/* Subtle glow effect */}
        <div className="h-0.5 bg-gradient-to-r from-transparent via-tertiary/60 to-transparent blur-sm -mt-0.5"></div>
        {/* Animated shimmer effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-tertiary/30 to-transparent animate-pulse"></div>
      </div>
    </section>
  );
};

export default HeroSection; 