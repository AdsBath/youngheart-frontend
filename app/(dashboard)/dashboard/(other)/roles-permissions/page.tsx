import Breadcrumbs from "@/components/breadcrumb";
import { Layout, LayoutBody, LayoutHeader } from "@/components/custom/layout";
import { ThemeSwitch } from "@/components/theme-switch";
import { ScrollArea } from "@/components/ui/scroll-area";
import { UserNav } from "@/components/user-nav";
import { Metadata } from "next";
import OrderList from "./_components/order-list";

export const metadata: Metadata = {
  title: "Orders | ",
  description: "orders list page"
};
export default function Order() {
  return (
    <Layout>
      <ScrollArea className="h-[100vh]">
        {/* ===== Top Heading ===== */}
        <LayoutHeader>
          {/* <Search /> */}
          <Breadcrumbs
            items={[
              {
                label: "Customer",
                href: "/dashboard/registered-customer",
              },
              { label: "Registered" },
            ]}
          />
          <div className="ml-auto flex items-center space-x-4">
            {/* */}
            <UserNav />
          </div>
        </LayoutHeader>
        <LayoutBody>
          <OrderList />
        </LayoutBody>
      </ScrollArea>
    </Layout>
  );
}
