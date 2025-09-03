import Breadcrumbs from "@/components/breadcrumb";
import { Layout, LayoutBody, LayoutHeader } from "@/components/custom/layout";
import { ThemeSwitch } from "@/components/theme-switch";
import { ScrollArea } from "@/components/ui/scroll-area";
import { UserNav } from "@/components/user-nav";
import { Metadata } from "next";
import BannerAdList from "./_components/banner-ad-list";
import { NotificationShow } from "@/components/dashboard/notification-show";

export const metadata: Metadata = {
  title: "Banner | Manage banner",
  description: "Manage banners Page Description | banner",
};

export default function BannerAd() {
  return (
    <Layout>
      <ScrollArea className="h-[100vh]">
        {/* ===== Top Heading ===== */}
        <LayoutHeader>
          {/* <Search /> */}
          <Breadcrumbs
            items={[
              {
                label: "Manage Banners",
                href: "/dashboard/banner",
              },
              { label: "Banner List" },
            ]}
          />
          <div className="ml-auto flex items-center space-x-4">
            <NotificationShow />

            <UserNav />
          </div>
        </LayoutHeader>

        <LayoutBody className="flex flex-col" fixedHeight>
          <BannerAdList />
        </LayoutBody>
      </ScrollArea>
    </Layout>
  );
}
