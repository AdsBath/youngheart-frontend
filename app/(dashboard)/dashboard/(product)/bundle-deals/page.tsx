import Breadcrumbs from "@/components/breadcrumb";
import { Layout, LayoutBody, LayoutHeader } from "@/components/custom/layout";
import { ThemeSwitch } from "@/components/theme-switch";
import { ScrollArea } from "@/components/ui/scroll-area";
import { UserNav } from "@/components/user-nav";
import { Metadata } from "next";
import BundleDealList from "./_components/bundleDealList";
import { NotificationShow } from "@/components/dashboard/notification-show";

export const metadata: Metadata = {
  title: "Shipping Rule| Manage Products",
  description: "Manage Products Page Description |Shipping Rules",
};

export default function BundleDeals() {
  return (
    <Layout>
      <ScrollArea className="h-[100vh]">
        {/* ===== Top Heading ===== */}
        <LayoutHeader>
          {/* <Search /> */}
          <Breadcrumbs
            items={[
              {
                label: "Manage Products",
                href: "/products",
              },
              { label: "Bundle Deals" },
            ]}
          />
          <div className="ml-auto flex items-center space-x-4">
            <NotificationShow />
            
            <UserNav />
          </div>
        </LayoutHeader>
        <LayoutBody>
          <BundleDealList />
        </LayoutBody>
      </ScrollArea>
    </Layout>
  );
}
