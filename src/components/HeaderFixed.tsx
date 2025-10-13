"use client";

import * as React from "react";
import { useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Menu,
  Users,
  UserCheck,
  BookOpen,
  Calendar,
  HeartPulse,
  Handshake,
  HelpCircle,
  Church,
  HandHelping,
  ChevronDown,
  LayoutGrid,
} from "lucide-react";
import type { HeaderConfig } from "@/types";
import { cn } from "@/lib/utils";

const defaultHeaderConfig: HeaderConfig = {
  logo: {
    src: "/Logo .PNG",
    alt: "Christ Community Logo",
    width: 120,
    height: 120,
  },
  navigationItems: [
    { href: "/", label: "Home" },
    {
      href: "/about",
      label: "About Us",
      children: [
        {
          href: "/about/who-we-are",
          label: "Who We Are",
          icon: Users,
          description: "Our mission, vision, and beliefs.",
        },
        {
          href: "/about/meet-the-team",
          label: "Meet the Team",
          icon: UserCheck,
          description: "Get to know our pastors and staff.",
        },
        {
          href: "/about/our-message",
          label: "Our Message",
          icon: BookOpen,
          description: "Explore the core of our teachings.",
        },
      ],
    },
    {
      href: "/what-we-do",
      label: "What We Do",
      children: [
        {
          href: "/what-we-do/events-outreaches",
          label: "Events & Outreaches",
          icon: Calendar,
          description: "Find upcoming church and community events.",
        },
        {
          href: "/what-we-do/photizen",
          label: "Big Church Conference",
          icon: Users,
          description: "Join us for The Big Church Conference Swansea.",
        },
        {
          href: "/what-we-do/access-consultation-services",
          label: "Consultation Services",
          icon: Handshake,
          description: "Get guidance from our pastoral team.",
        },
      ],
    },
    {
      href: "/get-involved",
      label: "Get Involved",
      children: [
        {
          href: "/get-involved/volunteer-with-us",
          label: "Volunteer With Us",
          icon: HandHelping,
          description: "Use your gifts to serve the community.",
        },

        {
          href: "/get-involved/order-a-tract",
          label: "Order a Tract",
          icon: BookOpen,
          description: "Share your faith with gospel literature.",
        },
        {
          href: "/get-involved/find-a-church",
          label: "Find a Church",
          icon: Church,
          description: "Locate a like-minded church in another area.",
        },
      ],
    },
    { href: "/blog", label: "Blog" },
    { href: "/contact", label: "Contact" },
  ],
  actionButtons: [{ label: "Donate", variant: "default", href: "/donate" }],
  mobileMenuTitle: "Christ Community",
  mobileMenuDescription: "Building faith, strengthening community",
};

const menuHighlights = {
  "About Us": {
    title: "Our Core Identity",
    description: "Learn about our foundational beliefs and the people leading our community.",
  },
  "What We Do": {
    title: "Serving & Healing",
    description: "See the various ways we minister to our congregation and community.",
  },
  "Get Involved": {
    title: "Join Our Cause",
    description: "Find your place to serve and connect with the heart of our mission.",
  },
};

interface HeaderProps {
  config?: Partial<HeaderConfig>;
}

const HeaderFixed = ({ config }: HeaderProps) => {
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const headerConfig = { ...defaultHeaderConfig, ...config };
  const {
    logo,
    navigationItems,
    actionButtons,
    mobileMenuTitle,
    mobileMenuDescription,
  } = headerConfig;

  const handleMouseEnter = (label: string) => {
    setOpenDropdown(label);
  };

  const handleMouseLeave = () => {
    setOpenDropdown(null);
  };

  return (
    <header className="w-full bg-background/95 backdrop-blur-sm border-b border-border/20 sticky top-0 z-50">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <a href="/" className="flex items-center">
            <img
              src={logo.src}
              alt={logo.alt}
              width={logo.width}
              height={logo.height}
              className="drop-shadow-sm"
            />
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-1">
            {navigationItems.map((item) => (
              <div
                key={item.label}
                className="relative"
                onMouseEnter={() => item.children && setOpenDropdown(item.label)}
                onMouseLeave={() => setOpenDropdown(null)}
              >
                {item.children ? (
                  <>
                    <button className="flex items-center space-x-1 px-4 py-2 text-base bg-transparent hover:bg-accent rounded-md transition-colors">
                      <span>{item.label}</span>
                      <ChevronDown className="h-4 w-4" />
                    </button>
                    {openDropdown === item.label && (
                      <div 
                        className="absolute top-full left-1/2 transform -translate-x-1/2 mt-1 bg-white border border-border/20 rounded-xl shadow-xl overflow-hidden z-50 min-w-[800px]"
                        onMouseEnter={() => handleMouseEnter(item.label)}
                        onMouseLeave={handleMouseLeave}
                      >
                        <div className="flex">
                          <div className="w-[300px] p-6 bg-gradient-to-b from-accent/60 via-background to-background border-r border-border/20">
                            <h3 className="text-xl font-bold text-foreground">
                              {menuHighlights[item.label as keyof typeof menuHighlights]?.title || item.label}
                            </h3>
                            <p className="text-sm text-muted-foreground mt-2">
                              {menuHighlights[item.label as keyof typeof menuHighlights]?.description ||
                                "Explore this section to learn more."}
                            </p>
                          </div>
                          <div className="flex-1 p-4">
                            <div className="grid gap-3 md:grid-cols-2">
                              <a
                                href={item.href}
                                className="flex items-center p-3 rounded-md hover:bg-accent transition-colors bg-accent/50 border border-border/30 md:col-span-2"
                              >
                                <div className="p-1.5 bg-tertiary/10 rounded-md mr-3">
                                  <LayoutGrid className="h-5 w-5 text-tertiary" />
                                </div>
                                <div>
                                  <div className="font-medium">{item.label} Overview</div>
                                  <div className="text-sm text-muted-foreground">
                                    Get a complete overview of the {item.label.toLowerCase()} section.
                                  </div>
                                </div>
                              </a>
                              {item.children.map((child) => (
                                <a
                                  key={child.label}
                                  href={child.href}
                                  className="flex items-center p-3 rounded-md hover:bg-accent transition-colors"
                                >
                                  <div className="p-1.5 bg-tertiary/10 rounded-md mr-3">
                                    {child.icon && <child.icon className="h-5 w-5 text-tertiary" />}
                                  </div>
                                  <div>
                                    <div className="font-medium">{child.label}</div>
                                    <div className="text-sm text-muted-foreground">{child.description}</div>
                                  </div>
                                </a>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </>
                ) : (
                  <a
                    href={item.href}
                    className="px-4 py-2 text-base bg-transparent hover:bg-accent rounded-md transition-colors"
                  >
                    {item.label}
                  </a>
                )}
              </div>
            ))}
          </nav>

          <div className="flex items-center space-x-3">
            <div className="hidden sm:flex items-center space-x-3">
              {actionButtons.map((button) => (
                <a
                  key={button.label}
                  href={button.href || "#"}
                  className="inline-flex items-center justify-center px-6 py-2 bg-tertiary text-tertiary-foreground hover:bg-tertiary/90 shadow-md hover:shadow-lg transition-all rounded-md font-medium text-sm"
                >
                  {button.label}
                </a>
              ))}
            </div>

            {/* Mobile Menu */}
            <Sheet>
              <SheetTrigger asChild>
                <button className="lg:hidden p-2 rounded-md hover:bg-accent">
                  <Menu className="h-6 w-6 text-foreground" />
                  <span className="sr-only">Toggle menu</span>
                </button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] sm:w-[400px] flex flex-col">
                <SheetHeader className="flex-shrink-0">
                  <SheetTitle className="flex items-center space-x-3">
                    <img src={logo.src} alt={logo.alt} width={40} height={40} />
                    <span className="text-foreground">{mobileMenuTitle}</span>
                  </SheetTitle>
                  <SheetDescription>{mobileMenuDescription}</SheetDescription>
                </SheetHeader>

                <div className="flex-1 overflow-y-auto py-4">
                  <div className="flex flex-col space-y-1">
                    {navigationItems.map((item) => (
                      <div key={item.label} className="flex flex-col space-y-1">
                        <a
                          href={item.href}
                          className="flex items-center justify-between py-3 px-4 text-foreground hover:text-tertiary hover:bg-accent rounded-md transition-all duration-200 font-medium border border-transparent"
                        >
                          <span>{item.label}</span>
                          {item.children && <ChevronDown className="h-4 w-4" />}
                        </a>
                        {item.children && (
                          <div className="ml-4 flex flex-col space-y-1">
                            {item.children.map((child) => (
                              <a
                                key={child.label}
                                href={child.href}
                                className="flex items-center py-2 px-3 text-sm text-muted-foreground hover:text-tertiary hover:bg-accent rounded-md transition-all duration-200"
                              >
                                {child.icon && <child.icon className="w-4 h-4 mr-2" />}
                                <span>{child.label}</span>
                              </a>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex-shrink-0 border-t pt-4">
                  <div className="flex flex-col space-y-3">
                    {actionButtons.map((button) => (
                      <a
                        key={button.label}
                        href={button.href || "#"}
                        className="w-full inline-flex items-center justify-center px-6 py-3 bg-tertiary text-tertiary-foreground hover:bg-tertiary/90 rounded-md font-medium transition-colors"
                      >
                        {button.label}
                      </a>
                    ))}
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
};

export default HeaderFixed;