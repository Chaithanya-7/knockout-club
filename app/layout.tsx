import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/ui/Navbar";
import { Space_Grotesk, JetBrains_Mono } from "next/font/google";
import { GoogleTagManager } from "@next/third-parties/google";

import Footer from "@/components/ui/Footer";
import BootScreen, { BOOT_SCRIPT } from "@/components/ui/BootScreen";
import CursorGlow from "@/components/ui/CursorGlow";
import ico from "@/public/favicon.ico";
import ReactLenis from "lenis/react";
import ScrollToTop from "@/components/ui/ScrollToTop";
import { Toaster } from "react-hot-toast";
import { safeJsonLd } from "@/lib/seo/jsonld";
import { SITE_NAME, DEFAULT_DESCRIPTION, SITE_URL, DEFAULT_OG_IMAGE } from "@/lib/seo/constants";

const bodyFont = Space_Grotesk({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});
// Headings use this via the --font-ko-heading variable (see globals.css).
const headingFont = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-ko-heading",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: SITE_NAME,
    template: `%s | ${SITE_NAME}`,
  },
  description: DEFAULT_DESCRIPTION,
  keywords: ["Knockout Club", "CTF team", "cybersecurity club", "student hacking community", "capture the flag"],
  authors:[{name: SITE_NAME}],
  icons: {
    icon: ico.src,
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: SITE_URL,
    title: SITE_NAME,
    description: DEFAULT_DESCRIPTION, 
    siteName: SITE_NAME,
    images: [DEFAULT_OG_IMAGE],
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_NAME,
    description: DEFAULT_DESCRIPTION,
    images: [DEFAULT_OG_IMAGE],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: SITE_URL,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const organizationJsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE_NAME,
    url: SITE_URL,
    logo: DEFAULT_OG_IMAGE.url,
    sameAs: [],
  };
  return (
    <html lang="en-IN" suppressHydrationWarning>
      {process.env.NEXT_PUBLIC_GTM_ID && (
        <GoogleTagManager gtmId={process.env.NEXT_PUBLIC_GTM_ID} />
      )}

      <body className={`bg-pbpages ${bodyFont.className} ${headingFont.variable}`}>
        <script dangerouslySetInnerHTML={{ __html: BOOT_SCRIPT }} />
        <BootScreen />
        <CursorGlow />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: safeJsonLd(organizationJsonLd) }}
        />
        <ReactLenis root>
          <ScrollToTop />
          {/* <DotWaveAnimation /> */}
          <div className="relative">
            <Navbar />
            {children}
            <Footer />
          </div>
          <Toaster position="top-center" />
        </ReactLenis>
      </body>
    </html>
  );
}
