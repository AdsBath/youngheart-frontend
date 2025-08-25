
import { AppSidebar } from "@/components/AppSideBar";
import Footer from "@/components/frontend/footer";
import MobileNavbar from "@/components/frontend/mobile-navbar";
import Navbar from "@/components/frontend/navbar";
import { SidebarProvider } from "@/components/ui/sidebar";

//! import TagManager from "react-gtm-module"; Todo:  remove
// import SocialMediaButton from "./social-cahat/SocialMediaButton";

export default function RootLayout({
    children,
}: Readonly<{ children: React.ReactNode }>) {
    return (
        <>
            <SidebarProvider className="flex-col">
                <AppSidebar />
                <Navbar />
                <main>
                    {children}
                    {/* <SocialMediaButton /> */}
                </main>
                <Footer />
                {/* <PhoneNav /> */}
                <MobileNavbar />
            </SidebarProvider>
        </>
    );
}
