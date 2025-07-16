import { CategoryApia } from "@/components/api/catagory";
import { Layout, LayoutBody, LayoutHeader } from "@/components/custom/layout";
import Analytics from "@/components/dashboard/analytics";
import { NotificationShow } from "@/components/dashboard/notification-show";
import Overview from "@/components/dashboard/overview";
import Reports from "@/components/dashboard/reports";
import { ThemeSwitch } from "@/components/theme-switch";

import { TopNav } from "@/components/top-nav";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { UserNav } from "@/components/user-nav";

export default function Dashboard() {
  return (
    <Layout>
      {/* ===== Top Heading ===== */}
      <LayoutHeader>
        <TopNav links={topNav} />
        <div className="ml-auto flex items-center space-x-4">
          {/* <Search /> */}
          {/* <SearchComponent /> */}
          <NotificationShow />

          <UserNav />
        </div>
      </LayoutHeader>
      <CategoryApia />
      {/* ===== Main ===== */}
      <LayoutBody className="space-y-4">
        <Tabs
          orientation="vertical"
          defaultValue="overview"
          className="space-y-4"
        >
          <div className="w-full overflow-x-scroll pb-2">
            <TabsList>
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="analytics">Analytics</TabsTrigger>
              <TabsTrigger value="reports">Reports</TabsTrigger>
              {/* <TabsTrigger value="notifications">Notifications</TabsTrigger> */}
            </TabsList>
          </div>
          <TabsContent value="overview" className="space-y-4">
            <Overview />
          </TabsContent>
          <TabsContent value="analytics" className="space-y-4">
            <Analytics />
          </TabsContent>
          <TabsContent value="reports" className="space-y-4">
            <Reports />
          </TabsContent>
          {/* <TabsContent value="notifications" className="space-y-4">
            <Notification />
          </TabsContent> */}
        </Tabs>
      </LayoutBody>
    </Layout>
  );
}

const topNav = [
  {
    title: "Overview",
    href: "dashboard",
    isActive: true,
  },
  {
    title: "Customers",
    href: "dashboard/registered-customer",
    isActive: false,
  },
  {
    title: "Products",
    href: "dashboard/products",
    isActive: false,
  },
  {
    title: "Settings",
    href: "dashboard/settings",
    isActive: false,
  },
];
