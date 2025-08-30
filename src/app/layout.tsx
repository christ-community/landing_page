import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import HeaderFixed from "@/components/HeaderFixed";
import Footer from "@/components/Footer";
import { ChatIntegration } from "@/components/chat";
import { getFooter } from "../../lib/contentful-api";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Christ Community",
  description: "Welcome to Christ Community Church",
  icons: {
    icon: "/Logo .PNG",
    shortcut: "/Logo .PNG",
    apple: "/Logo .PNG",
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Try to get footer data, but don't let it block page rendering
  let footerData = null;
  try {
    footerData = await getFooter();
  } catch (error) {
    // Silently fail and use default footer
    console.log('Using default footer configuration');
  }

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {process.env.NODE_ENV === 'development' && (
          <script
            crossOrigin="anonymous"
            src="//unpkg.com/react-scan/dist/auto.global.js"
          />
        )}
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" sizes="any" type="image/x-icon" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
      >
        <div className="h-1 bg-gradient-to-r from-tertiary/80 via-primary/80 to-tertiary/80" />
        <HeaderFixed />
        <main className="bg-gradient-to-br from-background via-accent/20 to-background">
          {children}
          <ChatIntegration />
        </main>
        <Footer contentfulData={footerData || undefined} />
      </body>
    </html>
  );
}
