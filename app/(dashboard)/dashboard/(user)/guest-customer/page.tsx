import Breadcrumbs from "@/components/breadcrumb";
import { Layout, LayoutBody, LayoutHeader } from "@/components/custom/layout";
import { ThemeSwitch } from "@/components/theme-switch";
import { ScrollArea } from "@/components/ui/scroll-area";
import { UserNav } from "@/components/user-nav";
import { Metadata } from "next";
import GuestCustomerList from "./_components/guest-list";
import { NotificationShow } from "@/components/dashboard/notification-show";

export const metadata: Metadata = {
  title: "Guest Customer |",
  description: "Guest Customer list page",
};
export default function GuestCustomer() {
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
                href: "/dashboard/guest-customer",
              },
              { label: "Guest" },
            ]}
          />
          <div className="ml-auto flex items-center space-x-4">
            <NotificationShow />

            <UserNav />
          </div>
        </LayoutHeader>
        <LayoutBody>
          <GuestCustomerList />
        </LayoutBody>
      </ScrollArea>
    </Layout>
  );
}
