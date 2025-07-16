import { Toaster } from "@/components/ui/sonner";
import Providers from "@/lib/providers";
import { SheetProviderFrontend } from "@/lib/sheet-provider-frontend";
import AuthProvider from "@/provider/AuthProvider";
import type { Metadata } from "next";
import { Noto_Serif } from "next/font/google";
import Script from "next/script";
import "./globals.css";

const font = Noto_Serif({
    weight: ["400", "500", "600", "700", "500"],
    style: ["normal", "italic"],
    subsets: ["latin"],
    display: "swap",
});

export const metadata: Metadata = {
    title: "Babukhushi | Extensive Collection Exceptional Care",
    description:
        "Welcome to Babukushi, one-stop shop for kids' essentials! Browse our selection of must-have products that help your child grow and thrive. Shop easily from the comfort of your home!",

    authors: {
        name: "AdsBath",
        url: "https://www.adsbath.com",
    },
    publisher: "NextFocus",
    keywords: [
        "Babukhusi",
        "premium babu products",
        "custom babu products",
        "babu bags",
        "babu wallets",
        "babu shoes",
        "babu belts",
        "custom babu bags",
        "babu jackets",
        "khushidesh babu goods",
        "customizable babu accessories",
        "sustainable babu",
        "ethical babu",
        "luxury babu goods",
        "handmade babu products",
        "babu handbags",
        "personalized babu gifts",
        "bespoke babu products",
        "babu backpacks",
        "genuine babu products",
        "babu accessories",
        "babu crafting",
        "artisanal babu goods",
        "custom babu wallets",
        "men's babu shoes",
        "women's babu bags",
        "babu duffel bags",
        "babu messenger bags",
        "high-quality babu goods",
        "vegetable-tanned babu",
        "khushideshi babu craftsmanship",
        "custom babu shoes",
        "babu gloves",
        "babu furniture accessories",
        "babu iPad cases",
        "babu laptop bags",
    ],
    robots: "index, follow",
    category: "babu Goods, Custom babu Products, Fashion, E-commerce",
    openGraph: {
        type: "website",
        url: "https://www.babukhusi.com/",
        title: "Babukhushi | Extensive Collection Exceptional Care",
        description:
            "Discover Babukhusi's range of premium babu goods, including customizable babu products, ethically sourced and handcrafted by skilled artisans.",
        siteName: "Babukhusi",

        images: [
            {
                url: "https://www.babukhusi.com/babu-khushi-logo.png",
                width: 1200,
                height: 630,
                alt: "Babukhusi Logo",
            },
            {
                url: "https://www.babukhusi.com/custom-babu-bag.png",
                width: 1200,
                height: 630,
                alt: "Custom babu Bag by Babukhusi",
            },
            {
                url: "https://www.babukhusi.com/babu-wallet.png",
                width: 1200,
                height: 630,
                alt: "babu Wallet",
            },
        ],
    },
    twitter: {
        card: "summary_large_image",
        title: "Babukhushi | Extensive Collection Exceptional Care",
        description:
            "Explore customizable, premium babu products from Babukhusi, ethically crafted by khushideshi artisans.",
        images: "https://www.babukhusi.com/babu-khushi-logo.png",
    },

    themeColor: "#e4002b", // Use your brand's color
    icons: {
        icon: "/favicon.ico",
        shortcut: "/favicon.ico",
        apple: "/favicon.ico",
    },
    alternates: {
        canonical: "https://www.babukhusi.com/",
        languages: {
            "en-US": "https://www.babukhusi.com/",
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
                <Script id="gtm-head" strategy="beforeInteractive">
                    {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-NZ9CX3M2');`}
                </Script>
            </head>
            <body className={font.className}>
                {/* Google Tag Manager (noscript) after opening <body> tag */}
                <noscript>
                    <iframe
                        src="https://www.googletagmanager.com/ns.html?id=GTM-NZ9CX3M2"
                        height="0"
                        width="0"
                        style={{ display: "none", visibility: "hidden" }}
                    ></iframe>
                </noscript>
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
