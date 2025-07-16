import Breadcrumbs from "@/components/breadcrumb";
import { Layout, LayoutBody, LayoutHeader } from "@/components/custom/layout";
import { ThemeSwitch } from "@/components/theme-switch";
import { ScrollArea } from "@/components/ui/scroll-area";
import { UserNav } from "@/components/user-nav";
import { Metadata } from "next";
import EditProductForm from "../../_components/edit-product";

export const metadata: Metadata = {
  title: "Product list | Manage Products",
  description: "Manage Products Page Description | Collections",
};
export default function EditProduct({
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
                label: "Manage Products",
                href: "/products",
              },
              { label: "Products List", href: "/products" },
              { label: "Edit Product" },
            ]}
          />
          <div className="ml-auto flex items-center space-x-4">
             {/* */}
            <UserNav />
          </div>
        </LayoutHeader>
        <LayoutBody>
          <EditProductForm productId={params.productId} />
        </LayoutBody>
      </ScrollArea>
    </Layout>
  );
}
