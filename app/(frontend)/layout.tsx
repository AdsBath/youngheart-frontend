"use client";
import { AppSidebar } from "@/components/AppSideBar";
import Footer from "@/components/frontend/footer";
import MobileNavbar from "@/components/frontend/mobile-navbar";
import Navbar from "@/components/frontend/navbar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { useEffect } from "react";

import TagManager from "react-gtm-module";
import SocialMediaButton from "./social-cahat/SocialMediaButton";
// import { lazy, useEffect } from "react";
// const Navbar = lazy(() => import("@/components/frontend/navbar"));
const tagManagerArgs = {
    gtmId: "GTM-NZ9CX3M2",
};

export default function RootLayout({
    children,
}: Readonly<{ children: React.ReactNode }>) {
    useEffect(() => {
        setTimeout(() => {
            TagManager.initialize(tagManagerArgs);
        }, 10000);
    }, []);
    return (
        <>
            <SidebarProvider className="flex-col">
                <AppSidebar />
                <Navbar />

                <main>
                    {children}

                    <SocialMediaButton />
                </main>

                <Footer />
                {/* <PhoneNav /> */}
                <MobileNavbar />
            </SidebarProvider>
        </>
    );
}
