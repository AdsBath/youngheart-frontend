import type React from "react";
import { Toaster } from "@/components/ui/sonner";
import Providers from "@/lib/providers";
import { SheetProviderFrontend } from "@/lib/sheet-provider-frontend";
import AuthProvider from "@/provider/AuthProvider";
import type { Metadata, Viewport } from "next";
import Script from "next/script";
import GTMPageView from "@/components/analytics/GTM";
import { Fira_Sans, Manrope } from "next/font/google";
import "./globals.css";

// Font Imports with CSS variables
const firaSans = Fira_Sans({
  weight: ["400", "500", "700"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-sans",
});

const manrope = Manrope({
  weight: ["400", "600", "800"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-alt",
});

// Viewport Configuration (separate from metadata)
export const viewport: Viewport = {
  themeColor: "#f97316",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

// Site Metadata (without themeColor)
export const metadata: Metadata = {
  title: {
    default: "Young Heart | Bangladesh",
    template: "%s | Young Heart Bangladesh",
  },
  description: "Leather Goods, Fashion, and Lifestyle Products",
  authors: [
    {
      name: "AdsBath",
      url: "https://www.adsbath.com",
    },
  ],
  publisher: "NextFocus",
  keywords: [
    "leather goods",
    "fashion",
    "lifestyle",
    "bangladesh",
    "young heart",
    "bags",
    "accessories",
    "premium leather",
  ],
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  category: "Fashion, E-commerce, Lifestyle, Shopping, Leather Goods",
  metadataBase: new URL("https://youngheartbd.com"),
  openGraph: {
    type: "website",
    url: "https://youngheartbd.com/",
    title: "Young Heart | Bangladesh",
    description:
      "Explore Young Heart's extensive collection of leather goods, fashion, and lifestyle products. Discover quality craftsmanship and unique designs.",
    siteName: "YoungHeart",
    locale: "en_US",
    images: [
      {
        url: "/og-image.png",
        alt: "Young Heart - Leather Goods, Fashion, and Lifestyle Products",
        width: 1200,
        height: 630,
      },
      {
        url: "/og-image-2.png",
        alt: "Young Heart - Premium Leather Goods",
        width: 1200,
        height: 630,
      },
      {
        url: "/og-image-3.png",
        alt: "Young Heart - Fashion and Lifestyle",
        width: 1200,
        height: 630,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Young Heart | Bangladesh",
    description:
      "Explore Young Heart's extensive collection of leather goods, fashion, and lifestyle products. Discover quality craftsmanship and unique designs.",
    images: ["/og-image.png"],
    creator: "@youngheartbd",
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    shortcut: "/favicon.ico",
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
  alternates: {
    canonical: "/",
    languages: {
      "en-US": "/",
      "bn-BD": "/bn",
    },
  },
  manifest: "/site.webmanifest",
  verification: {
    google: "your-google-verification-code",
    // Add other verification codes as needed
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${firaSans.variable} ${manrope.variable}`}>
      <body className="font-sans antialiased">
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-KGZF6KQQ"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>
        {/* End Google Tag Manager (noscript) */}

        {/* Google Tag Manager base */}
        <Script id="gtm-base" strategy="afterInteractive">
          {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-KGZF6KQQ');`}
        </Script>
        {/* End Google Tag Manager base */}
        <Providers>
          <AuthProvider>
            <div id="fb-root" />
            <Script
              id="facebook-sdk"
              strategy="afterInteractive"
              dangerouslySetInnerHTML={{
                __html:
                  "window.fbAsyncInit=function(){FB.init({appId:'979499980533488',xfbml:true,version:'v20.0'});};(function(d,s,id){var js,fjs=d.getElementsByTagName(s)[0];if(d.getElementById(id))return;js=d.createElement(s);js.id=id;js.src='https://connect.facebook.net/en_US/sdk.js';fjs.parentNode.insertBefore(js,fjs);}(document,'script','facebook-jssdk'));",
              }}
            />
            <SheetProviderFrontend />
            {/* Push pageview on SPA route changes */}
            <GTMPageView />
            {children}
            <Toaster />
          </AuthProvider>
        </Providers>
      </body>
    </html>
  );
}
