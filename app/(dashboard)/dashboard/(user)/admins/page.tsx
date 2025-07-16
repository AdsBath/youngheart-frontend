import Breadcrumbs from "@/components/breadcrumb";
import { Layout, LayoutBody, LayoutHeader } from "@/components/custom/layout";
import { ThemeSwitch } from "@/components/theme-switch";
import { ScrollArea } from "@/components/ui/scroll-area";
import { UserNav } from "@/components/user-nav";
import { Metadata } from "next";
import AdminList from "./_components/admin-list";
import { NotificationShow } from "@/components/dashboard/notification-show";

export const metadata: Metadata = {
  title: "Admin | ",
  description: "",
};
export default function Admin() {
  return (
    <Layout>
      <ScrollArea className="h-[100vh]">
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
          <AdminList />
        </LayoutBody>
      </ScrollArea>
    </Layout>
  );
}
