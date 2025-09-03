import Breadcrumbs from "@/components/breadcrumb";
import { Layout, LayoutBody, LayoutHeader } from "@/components/custom/layout";
import { ScrollArea } from "@/components/ui/scroll-area";
import { UserNav } from "@/components/user-nav";
import { Metadata } from "next";

import { NotificationShow } from "@/components/dashboard/notification-show";
import BrandList from "./_components/brandLists";

export const metadata: Metadata = {
  title: "Shipping Rule| Manage Products",
  description: "Manage Products Page Description |Shipping Rules",
};
const Brand = () => {
  return (
    <Layout>
      <ScrollArea className="h-[100vh]">
        {/* ===== Top Heading ===== */}
        <LayoutHeader>
          {/* <Search /> */}
          <Breadcrumbs
            items={[
              {
                label: "All Brands",
                href: "/dashboard/brands",
              },
              { label: "List" },
            ]}
          />
          <div className="ml-auto flex items-center space-x-4">
            <NotificationShow />

            <UserNav />
          </div>
        </LayoutHeader>
        <LayoutBody>
          <BrandList />
        </LayoutBody>
      </ScrollArea>
    </Layout>
  );
};

export default Brand;
