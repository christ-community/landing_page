"use client";

import * as React from "react";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
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
          description: "Find upcoming meetings and community events.",
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
          description: "Get guidance from our Leadership Team.",
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
    description:
      "Learn about our foundational beliefs and the people leading our mission.",
  },
  "What We Do": {
    title: "Serving & Healing",
    description:
      "See the various ways we minister to our congregation and community.",
  },
  "Get Involved": {
    title: "Join Our Cause",
    description:
      "Find your place to serve and connect with the heart of our mission.",
  },
};

interface HeaderProps {
  config?: Partial<HeaderConfig>;
}

const Header = ({ config }: HeaderProps) => {
  const headerConfig = { ...defaultHeaderConfig, ...config };
  const {
    logo,
    navigationItems,
    actionButtons,
    mobileMenuTitle,
    mobileMenuDescription,
  } = headerConfig;
  const visibleActions = actionButtons.filter((button) => button.href);

  const pathname = usePathname();
  const [openDropdown, setOpenDropdown] = React.useState<string | null>(null);
  const closeTimeoutRef = React.useRef<ReturnType<typeof setTimeout> | null>(null);

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

          <nav className="hidden lg:flex items-center">
            <NavigationMenu>
              <NavigationMenuList className="gap-2">
                {navigationItems.map((item) => {
                  const isParentActive = isActiveRoute(item.href) || item.children?.some((child) => isActiveRoute(child.href));

                  return (
                  <NavigationMenuItem
                    key={item.label}
                    onMouseEnter={() => item.children && handleMouseEnter(item.label)}
                    onMouseLeave={handleMouseLeave}
                  >
                    {item.children ? (
                      <>
                        <NavigationMenuTrigger
                          className={cn(
                            "text-base bg-transparent",
                            isParentActive
                              ? "text-primary bg-accent/60"
                              : ""
                          )}
                          onMouseEnter={() => handleMouseEnter(item.label)}
                          onFocus={() => handleMouseEnter(item.label)}
                        >
                          {item.label}
                        </NavigationMenuTrigger>
                        {openDropdown === item.label && (
                          <NavigationMenuContent
                            onMouseEnter={() => handleMouseEnter(item.label)}
                            onMouseLeave={handleMouseLeave}
                          >
                            <div className="flex w-[600px] md:w-[720px] lg:w-[840px] shadow-lg" style={{ marginLeft: '-50%' }}>
                              <div className="relative overflow-hidden w-[300px] p-6 flex flex-col justify-center bg-muted/60 rounded-l-[var(--radius)] border-r border-border/40">
                                <div className="relative z-10">
                                  <h3 className="text-xl font-bold text-foreground">
                                    {menuHighlights[
                                      item.label as keyof typeof menuHighlights
                                    ]?.title || item.label}
                                  </h3>
                                  <p className="text-sm text-muted-foreground mt-2">
                                    {menuHighlights[
                                      item.label as keyof typeof menuHighlights
                                    ]?.description ||
                                      "Explore this section to learn more."}
                                  </p>
                                </div>
                              </div>
                              <ul className="grid flex-1 gap-4 p-6 md:grid-cols-2">
                                <ListItem
                                  key={`${item.label}-overview`}
                                  title={`${item.label} Overview`}
                                  href={item.href}
                                  icon={LayoutGrid}
                                  liClassName="md:col-span-2"
                                  className={cn(
                                    "bg-accent/50 border border-border/40",
                                    isActiveRoute(item.href) ? "bg-accent text-accent-foreground" : ""
                                  )}
                                >
                                  Get a complete overview of the{" "}
                                  {item.label.toLowerCase()} section.
                                </ListItem>
                                {item.children.map((component) => (
                                  <ListItem
                                    key={component.label}
                                    title={component.label}
                                    href={component.href}
                                    icon={component.icon}
                                    className={cn(
                                      isActiveRoute(component.href) ? "bg-accent text-accent-foreground" : ""
                                    )}
                                  >
                                    {component.description}
                                  </ListItem>
                                ))}
                              </ul>
                            </div>
                          </NavigationMenuContent>
                        )}
                      </>
                    ) : (
                      <NavigationMenuLink asChild>
                        <a
                          href={item.href}
                          className={cn(
                            navigationMenuTriggerStyle(),
                            "text-base bg-transparent",
                            isParentActive ? "bg-accent/60 text-primary" : ""
                          )}
                          aria-current={isParentActive ? "page" : undefined}
                        >
                          {item.label}
                        </a>
                      </NavigationMenuLink>
                    )}
                  </NavigationMenuItem>
                );
                })}
              </NavigationMenuList>
            </NavigationMenu>
          </nav>

          <div className="flex items-center gap-4">
            <div className="hidden sm:flex items-center gap-4">
              {visibleActions.map((button) => (
                <Button key={button.label} asChild size="default">
                  <a href={button.href}>{button.label}</a>
                </Button>
              ))}
            </div>

            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="lg:hidden">
                  <Menu className="h-6 w-6 text-foreground" />
                  <span className="sr-only">Toggle menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[320px] sm:w-[400px] flex flex-col">
                <SheetHeader className="flex-shrink-0">
                  <SheetTitle className="flex items-center gap-4">
                    <img
                      src={logo.src}
                      alt={logo.alt}
                      width={40}
                      height={40}
                    />
                    <span className="text-foreground">{mobileMenuTitle}</span>
                  </SheetTitle>
                  <SheetDescription>{mobileMenuDescription}</SheetDescription>
                </SheetHeader>

                <div className="flex-1 overflow-y-auto py-4">
                  <div className="flex flex-col gap-2">
                    {navigationItems.map((item) => (
                      <div key={item.label} className="flex flex-col gap-2">
                        <a
                          href={item.href}
                          className={cn(
                            "flex items-center justify-between py-2 px-4 text-foreground hover:text-primary hover:bg-accent rounded-[var(--radius)] transition-all duration-200 font-medium border border-transparent",
                            isActiveRoute(item.href) || item.children?.some((child) => isActiveRoute(child.href))
                              ? "bg-accent/60 text-primary"
                              : ""
                          )}
                          aria-current={
                            isActiveRoute(item.href) || item.children?.some((child) => isActiveRoute(child.href))
                              ? "page"
                              : undefined
                          }
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
                                className={cn(
                                  "flex items-center py-2 px-3 text-sm text-muted-foreground hover:text-primary hover:bg-accent rounded-[var(--radius)] transition-all duration-200",
                                  isActiveRoute(child.href) ? "bg-accent/50 text-primary" : ""
                                )}
                                aria-current={isActiveRoute(child.href) ? "page" : undefined}
                              >
                                {child.icon && (
                                  <child.icon className="w-4 h-4 mr-2" />
                                )}
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
                  <div className="flex flex-col gap-4">
                    {visibleActions.map((button) => (
                      <Button
                        key={button.label}
                        asChild
                        size="lg"
                      >
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

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a"> & {
    icon?: React.ComponentType<{ className?: string }>;
    liClassName?: string;
  }
>(
  (
    { className, title, children, href, icon: Icon, liClassName, ...props },
    ref
  ) => {
    return (
        <li className={cn(liClassName)}>
          <NavigationMenuLink asChild>
            <a
              href={href || "#"}
              ref={ref}
              className={cn(
                "block select-none space-y-2 rounded-[var(--radius)] p-4 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
                className
              )}
              {...props}
            >
              <div className="flex items-start gap-4">
                {Icon && (
                  <div className="p-2 bg-accent rounded-[var(--radius)] mt-2 flex-shrink-0">
                    <Icon className="h-5 w-5 text-primary" />
                  </div>
                )}
                <div>
                  <div className="text-base font-medium text-foreground">
                    {title}
                  </div>
                  <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                    {children}
                  </p>
                </div>
              </div>
            </a>
        </NavigationMenuLink>
      </li>
    );
  }
);
ListItem.displayName = "ListItem";

export default Header;
