import Breadcrumbs from "@/components/breadcrumb";
import { Layout, LayoutBody, LayoutHeader } from "@/components/custom/layout";
import { ThemeSwitch } from "@/components/theme-switch";
import { ScrollArea } from "@/components/ui/scroll-area";
import { UserNav } from "@/components/user-nav";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Product list | Manage Products",
  description: "Manage Products Page Description | Collections",
};
export default function ViewProduct({
  params,
}: {
  params: { productId: string };
}) {
  return (
    <Layout>
      <ScrollArea className="h-[100vh]">
        {/* ===== Top Heading ===== */}
        <LayoutHeader>
          {/* <Search /> */}
          <Breadcrumbs
            items={[
              {
                label: "All Products",
                href: "/dashboard/products",
              },
              { label: "View Product" },
            ]}
          />
          <div className="ml-auto flex items-center space-x-4">
            {/* */}
            <UserNav />
          </div>
        </LayoutHeader>
        <LayoutBody>
          {/* <EditProductForm productId={params.productId} /> */}

          {params.productId}
        </LayoutBody>
      </ScrollArea>
    </Layout>
  );
}
