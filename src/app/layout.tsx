import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ChatBot from "@/components/ChatBot";

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
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className="h-full">
      <head>
        <script
          crossOrigin="anonymous"
          src="//unpkg.com/react-scan/dist/auto.global.js"
        />
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" sizes="any" type="image/x-icon" />
        {/* React Scan will help monitor component performance and re-renders */}
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground flex flex-col h-screen`}
      >
        <div className="h-1 bg-gradient-to-r from-tertiary/80 via-primary/80 to-tertiary/80" />
        <Header />
        <main className="flex-grow bg-gradient-to-br from-background via-accent/20 to-background overflow-y-auto">
          {children}
          <Footer />
          <ChatBot />
        </main>
      </body>
    </html>
  );
}
