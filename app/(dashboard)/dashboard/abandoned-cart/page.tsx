import Breadcrumbs from "@/components/breadcrumb";
import { Layout, LayoutBody, LayoutHeader } from "@/components/custom/layout";
import { ThemeSwitch } from "@/components/theme-switch";
import { ScrollArea } from "@/components/ui/scroll-area";
import { UserNav } from "@/components/user-nav";
import { Metadata } from "next";
import AbandonedCartList from "./_components/vendors-list";
import { NotificationShow } from "@/components/dashboard/notification-show";

export const metadata: Metadata = {
  title: "Abandoned Cart | List",
  description: "",
};
export default function AbandonedCart() {
  return (
    <Layout>
      {/* ===== Top Heading ===== */}
      <LayoutHeader>
        {/* <Search /> */}
        <Breadcrumbs items={[{ label: "Admin" }]} />
        <div className="ml-auto flex items-center space-x-4">
          <NotificationShow />

          <UserNav />
        </div>
      </LayoutHeader>
      <LayoutBody>
        <AbandonedCartList />
      </LayoutBody>
    </Layout>
  );
}
