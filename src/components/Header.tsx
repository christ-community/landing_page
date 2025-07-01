"use client";

import Image from "next/image";
import Link from "next/link";
import * as React from "react";
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
          href: "/what-we-do/healing-lifting-resources",
          label: "Healing Resources",
          icon: HeartPulse,
          description: "Support for your spiritual and emotional needs.",
        },
        {
          href: "/what-we-do/access-consultation-services",
          label: "Consultation Services",
          icon: Handshake,
          description: "Get guidance from our pastoral team.",
        },
        {
          href: "/what-we-do/blog",
          label: "Blog",
          icon: BookOpen,
          description: "Read our latest articles and insights.",
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
          href: "/get-involved/send-help",
          label: "Send Help (Help Code)",
          icon: HelpCircle,
          description: "Give or receive help from the church body.",
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
      "Learn about our foundational beliefs and the people leading our church.",
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

  return (
    <header className="w-full bg-background/95 backdrop-blur-sm border-b border-border/20 sticky top-0 z-50">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <Link href="/" className="flex items-center">
            <Image
              src={logo.src}
              alt={logo.alt}
              width={logo.width}
              height={logo.height}
              className="drop-shadow-sm"
              priority
            />
          </Link>

          <nav className="hidden lg:flex items-center space-x-1">
            <NavigationMenu>
              <NavigationMenuList>
                {navigationItems.map((item) => (
                  <NavigationMenuItem key={item.label}>
                    {item.children ? (
                      <>
                        <NavigationMenuTrigger className="text-base bg-transparent">
                          {item.label}
                        </NavigationMenuTrigger>
                        <NavigationMenuContent>
                          <div className="flex w-[600px] md:w-[700px] lg:w-[850px] shadow-lg">
                            <div className="relative overflow-hidden w-[300px] p-6 flex flex-col justify-center bg-gradient-to-b from-accent/60 via-background to-background rounded-l-md border-r border-border/20">
                              <div className="absolute top-0 left-0 w-40 h-40 bg-tertiary/10 rounded-full -translate-x-1/3 -translate-y-1/3 blur-sm" />
                              <div className="absolute bottom-0 right-0 w-56 h-56 bg-primary/10 rounded-full translate-x-1/4 translate-y-1/4 blur-sm" />
                              <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-secondary/5 -translate-x-1/2 -translate-y-1/2 rounded-full blur-md" />
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
                            <ul className="grid flex-1 gap-3 p-4 md:grid-cols-2">
                              <ListItem
                                key={`${item.label}-overview`}
                                title={`${item.label} Overview`}
                                href={item.href}
                                icon={LayoutGrid}
                                liClassName="md:col-span-2"
                                className="bg-accent/50 border border-border/30"
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
                                >
                                  {component.description}
                                </ListItem>
                              ))}
                            </ul>
                          </div>
                        </NavigationMenuContent>
                      </>
                    ) : (
                      <Link href={item.href} legacyBehavior passHref>
                        <NavigationMenuLink
                          className={cn(
                            navigationMenuTriggerStyle(),
                            "text-base bg-transparent"
                          )}
                        >
                          {item.label}
                        </NavigationMenuLink>
                      </Link>
                    )}
                  </NavigationMenuItem>
                ))}
              </NavigationMenuList>
            </NavigationMenu>
          </nav>

          <div className="flex items-center space-x-3">
            <div className="hidden sm:flex items-center space-x-3">
              {actionButtons.map((button) => (
                <Button
                  key={button.label}
                  asChild
                  size="lg"
                  className="bg-tertiary text-tertiary-foreground hover:bg-tertiary/90 shadow-md hover:shadow-lg transition-all"
                >
                  <Link href={button.href || "#"}>{button.label}</Link>
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
              <SheetContent side="right" className="w-[300px] sm:w-[400px]">
                <SheetHeader>
                  <SheetTitle className="flex items-center space-x-3">
                    <Image
                      src={logo.src}
                      alt={logo.alt}
                      width={40}
                      height={40}
                    />
                    <span className="text-foreground">{mobileMenuTitle}</span>
                  </SheetTitle>
                  <SheetDescription>{mobileMenuDescription}</SheetDescription>
                </SheetHeader>

                <div className="flex flex-col space-y-1 mt-8">
                  {navigationItems.map((item) => (
                    <div key={item.label} className="flex flex-col space-y-1">
                      <Link
                        href={item.href}
                        className="flex items-center justify-between py-3 px-4 text-foreground hover:text-tertiary hover:bg-accent rounded-md transition-all duration-200 font-medium border border-transparent"
                      >
                        <span>{item.label}</span>
                        {item.children && <ChevronDown className="h-4 w-4" />}
                      </Link>
                      {item.children && (
                        <div className="ml-4 flex flex-col space-y-1">
                          {item.children.map((child) => (
                            <Link
                              key={child.label}
                              href={child.href}
                              className="flex items-center py-2 px-3 text-sm text-muted-foreground hover:text-tertiary hover:bg-accent rounded-md transition-all duration-200"
                            >
                              {child.icon && (
                                <child.icon className="w-4 h-4 mr-2" />
                              )}
                              <span>{child.label}</span>
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>

                <div className="absolute bottom-6 left-6 right-6 flex flex-col space-y-3">
                  {actionButtons.map((button) => (
                    <Button
                      key={button.label}
                      asChild
                      className="w-full bg-tertiary text-tertiary-foreground hover:bg-tertiary/90"
                      size="lg"
                    >
                      <Link href={button.href || "#"}>{button.label}</Link>
                    </Button>
                  ))}
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
          <Link
            href={href || "#"}
            ref={ref}
            className={cn(
              "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
              className
            )}
            {...props}
          >
            <div className="flex items-start space-x-3">
              {Icon && (
                <div className="p-1.5 bg-tertiary/10 rounded-md mt-1 flex-shrink-0">
                  <Icon className="h-5 w-5 text-tertiary" />
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
          </Link>
        </NavigationMenuLink>
      </li>
    );
  }
);
ListItem.displayName = "ListItem";

export default Header;
