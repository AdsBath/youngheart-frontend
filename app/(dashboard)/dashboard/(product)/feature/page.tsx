import Breadcrumbs from "@/components/breadcrumb";
import { Layout, LayoutBody, LayoutHeader } from "@/components/custom/layout";
import { NotificationShow } from "@/components/dashboard/notification-show";
import { ScrollArea } from "@/components/ui/scroll-area";
import { UserNav } from "@/components/user-nav";
import { Metadata } from "next";
import FeatureList from "./_components/FeatureList";

export const metadata: Metadata = {
  title: "Feature| Manage Products",
  description: "Manage Products Page Description | Feature",
};
export default function Feature() {
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
                href: "/dashboard/products",
              },
              { label: "Features", href: "/dashboard/feauters" },
            ]}
          />
          <div className="ml-auto flex items-center space-x-4">
            <NotificationShow />

            <UserNav />
          </div>
        </LayoutHeader>
        <LayoutBody>
          <FeatureList />
        </LayoutBody>
      </ScrollArea>
    </Layout>
  );
}
