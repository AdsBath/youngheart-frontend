import { Toaster } from "@/components/ui/sonner";
import Providers from "@/lib/providers";
import { SheetProviderFrontend } from "@/lib/sheet-provider-frontend";
import AuthProvider from "@/provider/AuthProvider";
import type { Metadata } from "next";
import { Sorts_Mill_Goudy, Fira_Sans } from "next/font/google";
// import Script from "next/script";
import "./globals.css";

const font = Sorts_Mill_Goudy({
    weight: "400",
    style: ["normal", "italic"],
    subsets: ["latin"],
    display: "swap",
});


export const metadata: Metadata = {
    title: "Young Heart | Bangladesh ",
    description: "Leather Goods, Fashion, and Lifestyle Products",
    authors: {
        name: "AdsBath",
        url: "https://www.adsbath.com",
    },
    publisher: "NextFocus",
    keywords: [],
    robots: "index, follow",
    category: "Fashion, E-commerce, Lifestyle, Shopping, Leather Goods",
    openGraph: {
        type: "website",
        url: "https://youngheartbd.com/",
        title: "Young Heart | Bangladesh",
        description:
            "Explore Young Heart's extensive collection of leather goods, fashion, and lifestyle products. Discover quality craftsmanship and unique designs.",
        siteName: "YoungHeart",

        images: [
            {
                url: "https://youngheartbd.com/og-image.png",
                alt: "Young Heart - Leather Goods, Fashion, and Lifestyle Products",
                width: 1200,
                height: 630,
            },
            {
                url: "https://youngheartbd.com/og-image-2.png",
                alt: "Young Heart - Premium Leather Goods",
                width: 1200,
                height: 630,
            },
            {
                url: "https://youngheartbd.com/og-image-3.png",
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
        images: "https://youngheartbd.com/og-image.png",
    },

    themeColor: "#f81818", // Use your brand's color
    icons: {
        icon: "/favicon.ico",
        shortcut: "/favicon.ico",
        apple: "/favicon.ico",
    },
    alternates: {
        canonical: "https://youngheartbd.com/",
        languages: {
            "en-US": "https://youngheartbd.com/",
        },
    },
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            {/* Google Tag Manager Script in Head */}
            <head>
                {/* <Script id="gtm-head" strategy="beforeInteractive">
                    {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-NZ9CX3M2');`}
                </Script> */}
            </head>
            <body className={font.className}>
                {/* Google Tag Manager (noscript) after opening <body> tag */}
                {/* <noscript>
                    <iframe
                        src="https://www.googletagmanager.com/ns.html?id=GTM-NZ9CX3M2"
                        height="0"
                        width="0"
                        style={{ display: "none", visibility: "hidden" }}
                    ></iframe>
                </noscript> */}
                <Providers>
                    <AuthProvider>
                        <SheetProviderFrontend />
                        {children}
                    </AuthProvider>
                </Providers>
                <Toaster />
            </body>
        </html>
    );
}
