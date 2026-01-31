import { Button } from "@/components/ui/button";
import type { ReactNode } from "react";
import type { FooterConfig } from "@/types";
import type { IFooter } from "../../types/contentful";
import MailingList from "./MailingList";

const socialIconMap: Record<string, ReactNode> = {
  Twitter: (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
      <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
    </svg>
  ),
  Facebook: (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
      <path d="M22.46 6c-.77.35-1.6.58-2.46.69.88-.53 1.56-1.37 1.88-2.38-.83.5-1.75.85-2.72 1.05C18.37 4.5 17.26 4 16 4c-2.35 0-4.27 1.92-4.27 4.29 0 .34.04.67.11.98C8.28 9.09 5.11 7.38 3 4.79c-.37.63-.58 1.37-.58 2.15 0 1.49.75 2.81 1.91 3.56-.71 0-1.37-.2-1.95-.5v.03c0 2.08 1.48 3.82 3.44 4.21a4.22 4.22 0 0 1-1.93.07 4.28 4.28 0 0 0 4 2.98 8.521 8.521 0 0 1-5.33 1.84c-.34 0-.68-.02-1.02-.06C3.44 20.29 5.7 21 8.12 21 16 21 20.33 14.46 20.33 8.79c0-.19 0-.37-.01-.56.84-.6 1.56-1.36 2.14-2.23z"/>
    </svg>
  ),
  Pinterest: (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
      <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.174-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.099.12.112.225.085.345-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.402.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.357-.629-2.736-1.378 0 0-.599 2.283-.744 2.845-.282 1.084-1.04 2.441-1.549 3.271C9.394 23.77 10.681 24.001 12.017 24.001c6.624 0 11.99-5.367 11.99-11.988C24.007 5.367 18.641.001 12.017.001z"/>
    </svg>
  ),
};

// Default configuration - this will later come from Contentful
const defaultFooterConfig: FooterConfig = {
  churchInfo: {
    name: "Christ Community",
    description: "Join a community dedicated to shining the light of Christ to all nations, tribes, and tongues through practical service and lasting relationships.",
    socialMediaLinks: []
  },
  quickLinks: [
    { href: "/about", label: "About Us" },
    { href: "/what-we-do", label: "What We Do" },
    { href: "/get-involved", label: "Get Involved" },
    { href: "/get-involved/order-a-tract", label: "Order Tracts" },
    { href: "/contact", label: "Contact" },
  ],
  contactInfo: {
    address: {
      street: "47B Westbury Street",
      city: "Swansea",
      state: "United Kingdom",
      zipCode: "SA1 4JW"
    },
    phone: "07428784005",
    email: "info@christcommunityglobal.org"
  },
  serviceTimes: [
    { name: "Wednesday Intercessory Prayers", time: "9:00 PM" },
    { name: "Friday Night Prayers", time: "9:00 PM" },
    { name: "Sunday Night Bible Study", time: "7:00 PM" },
  ],
  copyrightText: "©2025 Christ Community. All rights reserved.",
  legalLinks: []
};

interface FooterProps {
  config?: Partial<FooterConfig>;
  contentfulData?: IFooter;
}

const Footer = ({ config, contentfulData }: FooterProps) => {
  // Use Contentful data if available, otherwise fall back to config or default
  const footerData = contentfulData ? {
    ...contentfulData,
    churchInfo: {
      ...contentfulData.churchInfo,
      socialMediaLinks: contentfulData.churchInfo.socialMediaLinks.map(link => ({
        ...link,
        icon: socialIconMap[link.platform] || undefined
      }))
    }
  } : { ...defaultFooterConfig, ...config };
  const { churchInfo, quickLinks, contactInfo, serviceTimes, copyrightText, legalLinks } = footerData;

  const socialLinks = churchInfo.socialMediaLinks.filter(
    (link) => typeof link.href === "string" && /^https?:\/\//.test(link.href) && link.icon
  );

  return (
    <footer className="bg-secondary text-secondary-foreground">
      <MailingList />
      <div className="border-t border-secondary-foreground/10">
        <div className="section-inner py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            
            {/* Church Info Section */}
            <div className="stack">
              <h3 className="text-xl font-semibold text-secondary-foreground">{churchInfo.name}</h3>
              <p className="text-secondary-foreground/70">
                {churchInfo.description}
              </p>
              {socialLinks.length > 0 && (
                <div className="flex items-center gap-4">
                  {socialLinks.map((link) => (
                    <a
                      key={link.platform}
                      href={link.href}
                      aria-label={link.ariaLabel}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-secondary-foreground/70 hover:text-secondary-foreground transition-colors"
                    >
                      {link.icon}
                    </a>
                  ))}
                </div>
              )}
            </div>

            {/* Quick Links */}
            <div className="stack">
              <h4 className="text-lg font-semibold text-secondary-foreground">Quick Links</h4>
              <ul className="stack">
                {quickLinks.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-secondary-foreground/70 hover:text-secondary-foreground transition-colors"
                      target={link.isExternal ? "_blank" : undefined}
                      rel={link.isExternal ? "noopener noreferrer" : undefined}
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact Info */}
            <div className="stack">
              <h4 className="text-lg font-semibold text-secondary-foreground">Contact</h4>
              <div className="stack">
                <div className="flex items-start gap-4">
                  <svg className="w-5 h-5 text-primary mt-1 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                  </svg>
                  <p className="text-secondary-foreground/70">
                    {contactInfo.address.street}<br />
                    {contactInfo.address.city}, {contactInfo.address.state} {contactInfo.address.zipCode}
                  </p>
                </div>
                <div className="flex items-center gap-4">
                  <svg className="w-5 h-5 text-primary flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
                  </svg>
                  <p className="text-secondary-foreground/70">{contactInfo.phone}</p>
                </div>
                <div className="flex items-start gap-4">
                  <svg className="w-5 h-5 text-primary flex-shrink-0 mt-1" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
                  </svg>
                  <p className="text-secondary-foreground/70 break-words hyphens-auto leading-relaxed">{contactInfo.email}</p>
                </div>
              </div>
            </div>

            {/* Service Times */}
            <div className="stack">
              <h4 className="text-lg font-semibold text-secondary-foreground">Service Times</h4>
              <div className="stack">
                {serviceTimes.map((service, index) => (
                  <div key={`${service.name}-${index}`} className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                    <div>
                      <p className="text-secondary-foreground font-medium">{service.name}</p>
                      <p className="text-secondary-foreground/70 text-sm">{service.time}</p>
                      {service.day && <p className="text-secondary-foreground/70 text-sm">{service.day}</p>}
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-secondary-foreground/10">
        <div className="section-inner py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-secondary-foreground/60 text-sm">
              {copyrightText}
            </p>
            {legalLinks.length > 0 && (
              <div className="flex gap-6 text-sm">
                {legalLinks.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    className="text-secondary-foreground/60 hover:text-secondary-foreground transition-colors"
                  >
                    {link.label}
                  </a>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 
