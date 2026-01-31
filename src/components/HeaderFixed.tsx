"use client";

import { useRef, useState } from "react";
import { usePathname } from "next/navigation";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import {
  Menu,
  Users,
  UserCheck,
  BookOpen,
  Calendar,
  HeartPulse,
  Handshake,
  HandHelping,
  ChevronDown,
  LayoutGrid,
} from "lucide-react";
import type { HeaderConfig } from "@/types";

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
          href: "/what-we-do/cardiff-outreach",
          label: "100 Believers to Cardiff",
          icon: Users,
          description: "Join the Easter evangelism outreach to Cardiff.",
        },
        {
          href: "/what-we-do/photizen",
          label: "Big Church Conference",
          icon: Users,
          description: "View past conference (November 2025).",
        },
        {
          href: "/what-we-do/10-cities-for-christ",
          label: "10 Welsh Cities for Christ",
          icon: HeartPulse,
          description: "Outreach across Wales to share the Gospel.",
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
  const pathname = usePathname();
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const closeTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const headerConfig = { ...defaultHeaderConfig, ...config };
  const {
    logo,
    navigationItems,
    actionButtons,
    mobileMenuTitle,
    mobileMenuDescription,
  } = headerConfig;
  const visibleActions = actionButtons.filter((button) => button.href);

  const normalizePath = (value?: string) => {
    if (!value) return "";
    if (value === "/") return "/";
    return value.replace(/\/+$/, "");
  };

  const normalizedPath = normalizePath(pathname || "/");

  const isActiveRoute = (href?: string) => {
    if (!href) return false;
    const normalizedHref = normalizePath(href);
    if (normalizedHref === "/") return normalizedPath === "/";
    return normalizedPath === normalizedHref || normalizedPath.startsWith(`${normalizedHref}/`);
  };

  const cancelClose = () => {
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
      closeTimeoutRef.current = null;
    }
  };

  const handleMouseEnter = (label: string) => {
    cancelClose();
    setOpenDropdown(label);
  };

  const handleMouseLeave = () => {
    cancelClose();
    closeTimeoutRef.current = setTimeout(() => {
      setOpenDropdown(null);
    }, 300);
  };

  return (
    <header className="w-full bg-background/95 backdrop-blur-sm border-b border-border/60 sticky top-0 z-50">
      <div className="section-inner">
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
          <nav className="hidden lg:flex items-center">
            {navigationItems.map((item) => {
              const isParentActive = isActiveRoute(item.href) || item.children?.some((child) => isActiveRoute(child.href));

              return (
              <div
                key={item.label}
                className="relative"
                onMouseEnter={() => item.children && handleMouseEnter(item.label)}
                onMouseLeave={handleMouseLeave}
              >
                {item.children ? (
                  <>
                    <button
                      className={`flex items-center gap-2 px-4 py-2 text-base bg-transparent hover:bg-accent rounded-[var(--radius)] transition-colors ${
                        isParentActive ? "bg-accent/60 text-primary" : ""
                      }`}
                      onMouseEnter={() => handleMouseEnter(item.label)}
                    >
                      <span>{item.label}</span>
                      <ChevronDown className="h-4 w-4" />
                    </button>
                    {openDropdown === item.label && (
                      <div 
                        className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 bg-card border border-border/40 rounded-[var(--radius)] shadow-lg overflow-hidden z-50 min-w-[800px]"
                        onMouseEnter={() => handleMouseEnter(item.label)}
                        onMouseLeave={handleMouseLeave}
                      >
                        <div className="flex">
                          <div className="w-[300px] p-6 bg-muted/60 border-r border-border/40">
                            <h3 className="text-xl font-bold text-foreground">
                              {menuHighlights[item.label as keyof typeof menuHighlights]?.title || item.label}
                            </h3>
                            <p className="text-sm text-muted-foreground mt-2">
                              {menuHighlights[item.label as keyof typeof menuHighlights]?.description ||
                                "Explore this section to learn more."}
                            </p>
                          </div>
                          <div className="flex-1 p-6">
                            <div className="grid gap-4 md:grid-cols-2">
                              <a
                                href={item.href}
                                className={`flex items-center p-4 rounded-[var(--radius)] hover:bg-accent transition-colors bg-accent/50 border border-border/40 md:col-span-2 ${
                                  isActiveRoute(item.href) ? "bg-accent text-accent-foreground" : ""
                                }`}
                                aria-current={isActiveRoute(item.href) ? "page" : undefined}
                              >
                                <div className="p-2 bg-accent rounded-[var(--radius)] mr-4">
                                  <LayoutGrid className="h-5 w-5 text-primary" />
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
                                  className={`flex items-center p-4 rounded-[var(--radius)] hover:bg-accent transition-colors ${
                                    isActiveRoute(child.href) ? "bg-accent text-accent-foreground" : ""
                                  }`}
                                  aria-current={isActiveRoute(child.href) ? "page" : undefined}
                                >
                                  <div className="p-2 bg-accent rounded-[var(--radius)] mr-4">
                                    {child.icon && <child.icon className="h-5 w-5 text-primary" />}
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
                    className={
                      `px-4 py-2 text-base bg-transparent hover:bg-accent rounded-[var(--radius)] transition-colors ${
                        isActiveRoute(item.href) ? "bg-accent/60 text-primary" : ""
                      }`
                    }
                    aria-current={isActiveRoute(item.href) ? "page" : undefined}
                  >
                    {item.label}
                  </a>
                )}
              </div>
            );
            })}
          </nav>

          <div className="flex items-center gap-4">
            <div className="hidden sm:flex items-center gap-4">
              {visibleActions.map((button) => (
                <Button key={button.label} asChild size="default">
                  <a href={button.href}>{button.label}</a>
                </Button>
              ))}
            </div>

            {/* Mobile Menu */}
            <Sheet>
              <SheetTrigger asChild>
                <button className="lg:hidden p-2 rounded-[var(--radius)] hover:bg-accent">
                  <Menu className="h-6 w-6 text-foreground" />
                  <span className="sr-only">Toggle menu</span>
                </button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] sm:w-[400px] flex flex-col">
                <SheetHeader className="flex-shrink-0">
                  <SheetTitle className="flex items-center gap-4">
                    <img src={logo.src} alt={logo.alt} width={40} height={40} />
                    <span className="text-foreground">{mobileMenuTitle}</span>
                  </SheetTitle>
                  <SheetDescription>{mobileMenuDescription}</SheetDescription>
                </SheetHeader>

                <div className="flex-1 overflow-y-auto py-4">
                  <div className="flex flex-col gap-2">
                    {navigationItems.map((item) => {
                      const isParentActive = isActiveRoute(item.href) || item.children?.some((child) => isActiveRoute(child.href));

                      return (
                      <div key={item.label} className="flex flex-col gap-2">
                        <a
                          href={item.href}
                          className={
                            `flex items-center justify-between py-2 px-4 text-foreground hover:text-primary hover:bg-accent rounded-[var(--radius)] transition-all duration-200 font-medium border border-transparent ${
                              isParentActive ? "bg-accent/60 text-primary" : ""
                            }`
                          }
                          aria-current={isParentActive ? "page" : undefined}
                        >
                          <span>{item.label}</span>
                          {item.children && <ChevronDown className="h-4 w-4" />}
                        </a>
                        {item.children && (
                          <div className="ml-4 flex flex-col gap-2">
                            {item.children.map((child) => (
                              <a
                                key={child.label}
                                href={child.href}
                                className={
                                  `flex items-center py-2 px-3 text-sm text-muted-foreground hover:text-primary hover:bg-accent rounded-[var(--radius)] transition-all duration-200 ${
                                    isActiveRoute(child.href) ? "bg-accent/50 text-primary" : ""
                                  }`
                                }
                                aria-current={isActiveRoute(child.href) ? "page" : undefined}
                              >
                                {child.icon && <child.icon className="w-4 h-4 mr-2" />}
                                <span>{child.label}</span>
                              </a>
                            ))}
                          </div>
                        )}
                      </div>
                    );
                    })}
                  </div>
                </div>

                <div className="flex-shrink-0 border-t pt-4">
                  <div className="flex flex-col gap-4">
                    {visibleActions.map((button) => (
                      <Button key={button.label} asChild size="lg">
                        <a href={button.href}>{button.label}</a>
                      </Button>
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
