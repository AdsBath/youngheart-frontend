import Breadcrumbs from "@/components/breadcrumb";
import { Layout, LayoutBody, LayoutHeader } from "@/components/custom/layout";
import { ThemeSwitch } from "@/components/theme-switch";
import { ScrollArea } from "@/components/ui/scroll-area";
import { UserNav } from "@/components/user-nav";
import { Metadata } from "next";
import ProductsList from "./_components/productsList";
import { NotificationShow } from "@/components/dashboard/notification-show";

export const metadata: Metadata = {
  title: "Product list | Manage Products",
  description: "Manage Products Page Description | Collections",
};
export default function Product() {
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
              { label: "Products List" },
            ]}
          />
          <div className="ml-auto flex items-center space-x-4">
            <NotificationShow />
            
            <UserNav />
          </div>
        </LayoutHeader>
        <LayoutBody className="">
          <ProductsList />
        </LayoutBody>
      </ScrollArea>
    </Layout>
  );
}
