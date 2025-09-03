import Breadcrumbs from "@/components/breadcrumb";
import { Layout, LayoutBody, LayoutHeader } from "@/components/custom/layout";
import { ThemeSwitch } from "@/components/theme-switch";
import { ScrollArea } from "@/components/ui/scroll-area";
import { UserNav } from "@/components/user-nav";
import { Metadata } from "next";
import VariantsList from "./_components/variants-list";
import { NotificationShow } from "@/components/dashboard/notification-show";

export const metadata: Metadata = {
  title: "Shipping Rule| Manage Products",
  description: "Manage Products Page Description |Shipping Rules",
};

export default function Variants() {
  return (
    <Layout>
      {/* ===== Top Heading ===== */}
      <LayoutHeader>
        {/* <Search /> */}
        <Breadcrumbs
          items={[
            {
              label: "All Product Variants",
              href: "/dashboard/variants",
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
        <VariantsList />
      </LayoutBody>

    </Layout >
  );
}
