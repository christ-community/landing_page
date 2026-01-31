
'use client';

import { Button } from "@/components/ui/button";
import { useState, useEffect, useCallback } from "react";
import type { HeroConfig } from "@/types";
import type { IPageContent, IPageHero } from "../../types/contentful";

// Default configuration - this will later come from Contentful
const defaultHeroConfig: HeroConfig = {
  content: {
    title: "A church serving Swansea and beyond",
    description: "Weekly worship, prayer, and practical outreach across the city. Join a community committed to discipleship and tangible care.",
    buttons: [
      { label: "Join missions", variant: "primary", href: "/contact" },
      { label: "Plan a visit", variant: "secondary", href: "https://calendly.com/christcommunityglobal/30min" },
    ]
  },
  images: [
    {
      src: "/Church-Conference.jpg",
      alt: "Church conference with speaker and congregation"
    },
    {
      src: "/Website photo use .jpg", 
      alt: "Website photo use - Community gathering"
    }
  ],
  autoChangeInterval: 12000,
  connectButtonLabel: "Connect with us"
};

interface HeroSectionProps {
  config?: Partial<HeroConfig>;
  pageContent?: IPageContent;
  pageHero?: IPageHero;
}

const HeroSection = ({ config, pageContent, pageHero }: HeroSectionProps) => {
  // Use pageHero first, then pageContent, finally config or default
  const heroConfig = pageHero ? {
    content: {
      title: pageHero.title,
      subtitle: undefined, // Don't use subtitle as part of title
      description: pageHero.subtitle || defaultHeroConfig.content.description, // Use pageHero.subtitle as description
      buttons: defaultHeroConfig.content.buttons // Keep default buttons for now
    },
    images: (pageHero as any).processedBackgroundImage ? [
      {
        src: (pageHero as any).processedBackgroundImage,
        alt: pageHero.title
      },
      ...defaultHeroConfig.images.slice(1)
    ] : defaultHeroConfig.images,
    autoChangeInterval: defaultHeroConfig.autoChangeInterval,
    connectButtonLabel: defaultHeroConfig.connectButtonLabel
  } : pageContent ? {
    content: {
      title: pageContent.title,
      subtitle: pageContent.subtitle,
      description: pageContent.description,
      buttons: defaultHeroConfig.content.buttons
    },
    images: defaultHeroConfig.images,
    autoChangeInterval: defaultHeroConfig.autoChangeInterval,
    connectButtonLabel: defaultHeroConfig.connectButtonLabel
  } : { ...defaultHeroConfig, ...config };
  
  const { content, images, autoChangeInterval, connectButtonLabel } = heroConfig;
  
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Optimized auto-change images with useCallback
  const changeImage = useCallback(() => {
    setCurrentImageIndex((prevIndex) => 
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  }, [images.length]);

  // Auto-change images with cleanup
  useEffect(() => {
    if (images.length <= 1) return; // Don't set interval for single image
    
    const interval = setInterval(changeImage, autoChangeInterval);
    return () => clearInterval(interval);
  }, [autoChangeInterval, changeImage, images.length]);

  // Preload next image for better performance
  useEffect(() => {
    if (images.length > 1) {
      const nextIndex = (currentImageIndex + 1) % images.length;
      const img = new Image();
      img.src = images[nextIndex].src;
    }
  }, [currentImageIndex, images]);

  return (
    <section className="section min-h-[80vh] bg-background">
      <div className="section-inner">
        <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] items-center">
          <div className="stack-lg max-w-2xl">
            <div className="stack">
              <p className="eyebrow">Christ Community</p>
              <h1>
                {content.title}
                {content.subtitle && (
                  <>
                    <br />
                    <span>{content.subtitle}</span>
                  </>
                )}
              </h1>
              <p className="section-lead max-w-xl">{content.description}</p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              {content.buttons.map((button, index) => (
                <Button
                  key={index}
                  size="lg"
                  variant={button.variant === 'secondary' ? 'outline' : 'default'}
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
              {connectButtonLabel && (
                <Button variant="ghost" size="lg">
                  {connectButtonLabel}
                </Button>
              )}
            </div>
          </div>

          <div className="relative">
            <div className="relative aspect-[4/5] overflow-hidden rounded-[var(--radius)] border border-border/40 bg-muted">
              {images.map((image, index) => (
                <div
                  key={index}
                  className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
                    index === currentImageIndex ? 'opacity-100' : 'opacity-0'
                  }`}
                >
                  <img
                    src={image.src}
                    alt={image.alt}
                    className="h-full w-full object-cover"
                    loading={index === 0 ? "eager" : "lazy"}
                    onError={(e) => {
                      e.currentTarget.style.display = 'none';
                    }}
                  />
                </div>
              ))}
              <div className="absolute inset-0 bg-gradient-to-t from-secondary/60 via-transparent to-transparent" />
            </div>

            {images.length > 1 && (
              <div className="mt-4 flex items-center justify-center gap-2">
                {images.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`h-2 w-2 rounded-full transition-all duration-300 ${
                      index === currentImageIndex
                        ? 'bg-primary'
                        : 'bg-muted-foreground/40 hover:bg-muted-foreground/60'
                    }`}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection; 
