import Breadcrumbs from "@/components/breadcrumb";
import { Layout, LayoutBody, LayoutHeader } from "@/components/custom/layout";
import { ThemeSwitch } from "@/components/theme-switch";
import { ScrollArea } from "@/components/ui/scroll-area";
import { UserNav } from "@/components/user-nav";
import { Metadata } from "next";
import CategoryList from "./_components/categoryList";
import { NotificationShow } from "@/components/dashboard/notification-show";

export const metadata: Metadata = {
  title: "Category | Manage Products",
  description: "Manage Products Page Description | Category",
};

export default function Category() {
  return (
    <Layout>
      <ScrollArea className="h-[100vh]">
        {/* ===== Top Heading ===== */}
        <LayoutHeader>
          {/* <Search /> */}
          <Breadcrumbs
            items={[
              {
                label: "All Categories",
                href: "/dashboard/category",
              },
              { label: "List" },
            ]}
          />
          <div className="ml-auto flex items-center space-x-4">
            <NotificationShow />

            <UserNav />
          </div>
        </LayoutHeader>

        <LayoutBody className="flex flex-col" fixedHeight>
          {/* <div className="mb-2 flex items-center justify-between space-y-2">
            <div>
              <h2 className="text-2xl font-bold tracking-tight">
                Category Management
              </h2>
              <p className="text-muted-foreground">
                Manage your product categories here and add new categories.
              </p>
            </div>
            <div className="flex gap-3">
              <Button size={"sm"} variant={"default"} className="">
                <IconCategoryPlus size={18} className="mr-2" /> Add New Category
              </Button>
              <Button size={"sm"} variant={"secondary"} className="">
                <IconTableImport size={18} className="mr-2" /> Import
              </Button>
            </div>
          </div> */}
          {/* <div className="-mx-4 flex-1 overflow-auto px-4 py-1 lg:flex-row lg:space-x-12 lg:space-y-0"> */}
          <CategoryList />
          {/* </div> */}
        </LayoutBody>
      </ScrollArea>
    </Layout>
  );
}
