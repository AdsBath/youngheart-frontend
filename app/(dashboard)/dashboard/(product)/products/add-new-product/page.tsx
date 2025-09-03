import Breadcrumbs from "@/components/breadcrumb";
import { Layout, LayoutBody, LayoutHeader } from "@/components/custom/layout";
import { ThemeSwitch } from "@/components/theme-switch";
import { ScrollArea } from "@/components/ui/scroll-area";
import { UserNav } from "@/components/user-nav";
import { Metadata } from "next";
import ProductsForm from "../_components/productsForm";

export const metadata: Metadata = {
  title: "Product list | Manage Products",
  description: "Manage Products Page Description | Collections",
};
export default function NewProduct() {
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
              { label: "Add New Product" },
            ]}
          />
          <div className="ml-auto flex items-center space-x-4">
            {/* */}
            <UserNav />
          </div>
        </LayoutHeader>
        <LayoutBody>
          {/* <div className="mb-2 md:flex items-center justify-between space-y-2 ">
            <div>
              <h2 className="text-2xl font-bold tracking-tight">
                Add New Product
              </h2>
              <p className="text-muted-foreground">
                Add a new product to the store. Fill in the details below.
              </p>
            </div>
          </div> */}
          <ProductsForm />
        </LayoutBody>
      </ScrollArea>
    </Layout>
  );
}
