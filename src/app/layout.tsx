import type { Metadata } from "next";
import { Fraunces, Source_Sans_3 } from "next/font/google";
import "./globals.css";
import HeaderFixed from "@/components/HeaderFixed";
import Footer from "@/components/Footer";
import { ChatIntegration } from "@/components/chat";
import { getFooter } from "../../lib/contentful-api";

const bodyFont = Source_Sans_3({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

const headingFont = Fraunces({
  variable: "--font-heading",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: {
    default: "Christ Community",
    template: "%s | Christ Community",
  },
  description:
    "Christ Community is a church family serving Swansea and beyond through worship, outreach, and practical support.",
  openGraph: {
    title: "Christ Community",
    description:
      "Christ Community is a church family serving Swansea and beyond through worship, outreach, and practical support.",
    type: "website",
    images: [
      {
        url: "/Church-Conference.jpg",
        alt: "Christ Community",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Christ Community",
    description:
      "Christ Community is a church family serving Swansea and beyond through worship, outreach, and practical support.",
    images: ["/Church-Conference.jpg"],
  },
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
        {['production', 'staging'].includes(process.env.NODE_ENV || '') && (
          <script
            type="text/javascript"
            dangerouslySetInnerHTML={{
              __html: `
                (function(c,l,a,r,i,t,y){
                    c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                    t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
                    y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
                })(window, document, "clarity", "script", "t2ib2l969p");
              `
            }}
          />
        )}
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" sizes="any" type="image/x-icon" />
      </head>
      <body
        className={`${bodyFont.variable} ${headingFont.variable} antialiased bg-background text-foreground`}
      >
        <HeaderFixed />
        <main className="bg-background">
          {children}
          <ChatIntegration className="site-chat" />
        </main>
        <Footer contentfulData={footerData || undefined} />
      </body>
    </html>
  );
}
