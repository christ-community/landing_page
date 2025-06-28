'use client';

import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import type { HeaderConfig } from "@/types";

// Default configuration - this will later come from Contentful
const defaultHeaderConfig: HeaderConfig = {
  logo: {
    src: "/Logo .PNG",
    alt: "Christ Community Logo",
    width: 120,
    height: 120,
  },
  navigationItems:  [
    { href: "#about", label: "About" },
    { href: "#messages", label: "Messages" },
    { href: "#events", label: "Events" },
    { href: "#ministries", label: "Ministries" },
    { href: "#contact", label: "Contact" },
  ],
  actionButtons: [
    { label: "Plan Visit", variant: "outline" },
    { label: "Give", variant: "default" },
  ],
  mobileMenuTitle: "Christ Community",
  mobileMenuDescription: "Building faith, strengthening community",
};

interface HeaderProps {
  config?: Partial<HeaderConfig>;
}

const Header = ({ config }: HeaderProps) => {
  const headerConfig = { ...defaultHeaderConfig, ...config };
  const { logo, navigationItems, actionButtons, mobileMenuTitle, mobileMenuDescription } = headerConfig;

  return (
    <header className="w-full bg-primary/95 backdrop-blur-sm border-b border-accent/20 sticky top-0 z-50">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo Section */}
          <div className="flex items-center">
            <Image
              src={logo.src}
              alt={logo.alt}
              width={logo.width}
              height={logo.height}
              className="drop-shadow-sm"
              priority
            />
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-6">
            <NavigationMenu>
              <NavigationMenuList className="space-x-2">
                {navigationItems.map((item) => (
                  <NavigationMenuItem key={item.href}>
                    <NavigationMenuLink
                      href={item.href}
                      className="px-4 py-2 text-secondary hover:text-tertiary hover:bg-accent/10 rounded-md transition-all duration-200 font-medium"
                      target={item.isExternal ? "_blank" : undefined}
                      rel={item.isExternal ? "noopener noreferrer" : undefined}
                    >
                      {item.label}
                    </NavigationMenuLink>
                  </NavigationMenuItem>
                ))}
              </NavigationMenuList>
            </NavigationMenu>
          </div>

          {/* Action Buttons & Mobile Menu */}
          <div className="flex items-center space-x-3">
            {/* Desktop Action Buttons */}
            <div className="hidden sm:flex items-center space-x-3">
              {actionButtons.map((button, index) => (
                <Button
                  key={index}
                  variant={button.variant === 'outline' ? 'outline' : 'default'}
                  size="default"
                  className={
                    button.variant === 'outline'
                      ? "border-tertiary text-tertiary hover:bg-tertiary hover:text-white transition-all duration-200"
                      : "bg-tertiary hover:bg-tertiary/90 text-white transition-all duration-200"
                  }
                  onClick={button.onClick}
                >
                  {button.label}
                </Button>
              ))}
            </div>

            {/* Mobile Menu */}
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="lg:hidden">
                  <Menu className="h-6 w-6 text-secondary" />
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
                    <span className="text-secondary">{mobileMenuTitle}</span>
                  </SheetTitle>
                  <SheetDescription className="text-muted-foreground">
                    {mobileMenuDescription}
                  </SheetDescription>
                </SheetHeader>
                
                <div className="flex flex-col space-y-3 mt-8">
                  {navigationItems.map((item) => (
                    <a
                      key={item.href}
                      href={item.href}
                      className="flex items-center py-3 px-4 text-secondary hover:text-tertiary hover:bg-accent/10 rounded-md transition-all duration-200 font-medium border border-transparent hover:border-accent/20"
                      target={item.isExternal ? "_blank" : undefined}
                      rel={item.isExternal ? "noopener noreferrer" : undefined}
                    >
                      {item.label}
                    </a>
                  ))}
                </div>
                
                <div className="absolute bottom-6 left-6 right-6 flex flex-col space-y-3">
                  {actionButtons.map((button, index) => (
                    <Button
                      key={index}
                      variant={button.variant === 'outline' ? 'outline' : 'default'}
                      className={
                        button.variant === 'outline'
                          ? "w-full border-tertiary text-tertiary hover:bg-tertiary hover:text-white"
                          : "w-full bg-tertiary hover:bg-tertiary/90 text-white"
                      }
                      onClick={button.onClick}
                    >
                      {button.label}
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

export default Header; 