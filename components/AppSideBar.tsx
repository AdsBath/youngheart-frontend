"use client";

import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    useSidebar,
} from "@/components/ui/sidebar";
import { useBrandsQuery } from "@/redux/api/brandApi";
import { useTopLevelsCategoriesQuery } from "@/redux/api/categoriesApi";
import { useProductCollectionsQuery } from "@/redux/api/productCollectionApi";
import { ChevronRight } from "lucide-react";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

// Recursive Component for Nested Categories
const NestedSidebarMenu = ({
    categories,
    expandedCategories,
    toggleCategory,
    selectItem,
}: {
    categories: any[];
    expandedCategories: string[];
    toggleCategory: (slug: string) => void;
    selectItem: string;
}) => {
    const pathName = usePathname();
    const splitPathName = pathName.split("/");

    return (
        <>
            {categories?.map((category) => (
                <div key={category.slug} className="relative">
                    {/* Parent Category */}
                    <SidebarMenuItem>
                        <SidebarMenuButton className="flex justify-between items-center">
                            <Link
                                href={`/all-product/${category.slug}`}
                                className={`flex-1 ${
                                    splitPathName[splitPathName?.length - 1] ===
                                    category.slug
                                        ? "text-brand "
                                        : ""
                                }`}
                            >
                                {category?.title}
                            </Link>
                            {category?.children &&
                                category?.children?.length > 0 && (
                                    <span className="ml-2">
                                        <ChevronRight
                                            onClick={() =>
                                                toggleCategory(category.slug)
                                            }
                                            className={`duration-500 h-4 w-4 ${
                                                expandedCategories.includes(
                                                    category.slug
                                                )
                                                    ? "rotate-90"
                                                    : ""
                                            }`}
                                        />
                                    </span>
                                )}
                        </SidebarMenuButton>
                    </SidebarMenuItem>

                    {/* Child Categories */}
                    {category?.children && category?.children?.length > 0 && (
                        <div
                            className={`pl-4 transition-all duration-500 overflow-hidden ${
                                expandedCategories.includes(category?.slug)
                                    ? "max-h-screen"
                                    : "max-h-0"
                            }`}
                        >
                            <SidebarMenu>
                                <NestedSidebarMenu
                                    categories={category?.children}
                                    expandedCategories={expandedCategories}
                                    toggleCategory={toggleCategory}
                                    selectItem={selectItem}
                                />
                            </SidebarMenu>
                        </div>
                    )}
                </div>
            ))}
        </>
    );
};

export function AppSidebar() {
    const [expandedCategories, setExpandedCategories] = useState<string[]>([]);

    const [selectItem, setSelectItem] = useState<string>("");
    const searchParams = useSearchParams();
    const collectionId = searchParams.get("collection");
    const { data: categoriesData } = useTopLevelsCategoriesQuery({});
    const categories = categoriesData?.data?.data;
    const { data: collectionsData, isLoading: collectionsIsLoading } =
        useProductCollectionsQuery({});
    const collections = collectionsData?.data?.data;

    const { data: brandData } = useBrandsQuery({});
    const brandId = searchParams.get("brand");

    const toggleCategory = (slug: string) => {
        setExpandedCategories(
            (prev) =>
                prev.includes(slug)
                    ? prev.filter((category) => category !== slug) // Collapse the category
                    : [...prev, slug] // Expand the category
        );
        setSelectItem(slug);
    };
    const pathname = usePathname();
    const {
        state,
        open,
        setOpen,
        openMobile,
        setOpenMobile,
        isMobile,
        toggleSidebar,
    } = useSidebar();
    useEffect(() => {
        toggleSidebar();
        setOpenMobile(false);
        setOpen(false);
    }, [pathname]);

    return (
        <Sidebar side="left" variant="sidebar" collapsible="offcanvas">
            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupLabel className="font-semibold text-lg text-black">
                        Categories
                    </SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {categories && (
                                <NestedSidebarMenu
                                    categories={categories}
                                    expandedCategories={expandedCategories}
                                    toggleCategory={toggleCategory}
                                    selectItem={selectItem}
                                />
                            )}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
                <SidebarGroup>
                    <SidebarGroupLabel className="font-semibold text-lg text-black">
                        Collections
                    </SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {collections?.map((item: any) => (
                                <SidebarMenu key={item.id}>
                                    <SidebarMenuItem>
                                        <SidebarMenuButton className="flex justify-between items-center">
                                            <Link
                                                href={`/all-product?collection=${item.id}`}
                                                key={item.id}
                                                className={`flex justify-between group ${
                                                    collectionId === item.id
                                                        ? " text-brand"
                                                        : ""
                                                }`}
                                            >
                                                {item.name}

                                                {/* <span className="text-muted-foreground">
     ({item?.productProductCollections?.length})
   </span> */}
                                            </Link>
                                        </SidebarMenuButton>
                                    </SidebarMenuItem>
                                </SidebarMenu>
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
                <SidebarGroup>
                    <SidebarGroupLabel className="font-semibold text-lg text-black">
                        Brands
                    </SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {brandData?.data?.data?.map((item: any) => (
                                <SidebarMenu key={item.id}>
                                    <SidebarMenuItem>
                                        <SidebarMenuButton className="flex justify-between items-center">
                                            <Link
                                                href={`/all-product?collection=${item.id}`}
                                                key={item.id}
                                                className={`flex justify-between group ${
                                                    brandId === item.id
                                                        ? " text-brand"
                                                        : ""
                                                }`}
                                            >
                                                {item.name}

                                                {/* <span className="text-muted-foreground">
     ({item?.productProductCollections?.length})
   </span> */}
                                            </Link>
                                        </SidebarMenuButton>
                                    </SidebarMenuItem>
                                </SidebarMenu>
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
        </Sidebar>
    );
}
