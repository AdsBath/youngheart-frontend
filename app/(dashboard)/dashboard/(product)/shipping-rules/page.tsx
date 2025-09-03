import Breadcrumbs from "@/components/breadcrumb";
import { Layout, LayoutBody, LayoutHeader } from "@/components/custom/layout";
import { ThemeSwitch } from "@/components/theme-switch";
import { ScrollArea } from "@/components/ui/scroll-area";
import { UserNav } from "@/components/user-nav";
import { Metadata } from "next";
import ShippingRulesList from "./_components/shipping-rules-list";
import { NotificationShow } from "@/components/dashboard/notification-show";

export const metadata: Metadata = {
  title: "Shipping Rule | Manage Products",
  description: "Manage Products Page Description | Shipping",
};

export default function ShippingRule() {
  return (
    <Layout>
      <ScrollArea className="h-[100vh]">
        {/* ===== Top Heading ===== */}
        <LayoutHeader>
          {/* <Search /> */}
          <Breadcrumbs
            items={[
              {
                label: "Shipping Rules",
                href: "/dashboard/shipping-rules",
              },
              { label: "All Shipping Rules" },
            ]}
          />
          <div className="ml-auto flex items-center space-x-4">
            <NotificationShow />

            <UserNav />
          </div>
        </LayoutHeader>

        <LayoutBody className="flex flex-col" fixedHeight>
          <ShippingRulesList />
        </LayoutBody>
      </ScrollArea>
    </Layout>
  );
}
