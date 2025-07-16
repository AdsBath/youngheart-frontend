"use client";

import Breadcrumbs from "@/components/breadcrumb";
import { Skeleton } from "@/components/ui/skeleton";
import { useVariantsQuery } from "@/redux/api/attributeApi";
import { useBrandsQuery } from "@/redux/api/brandApi";
import { useCategoriesQuery } from "@/redux/api/categoriesApi";
import { useProductsQuery } from "@/redux/api/productApi";
import { useProductCollectionsQuery } from "@/redux/api/productCollectionApi";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { MdKeyboardArrowRight } from "react-icons/md";
interface Category {
    id: string;
    title: string;
    slug: string;
    children: Category[];
}

export default function SearchLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const { data: collectionsData, isLoading: collectionsIsLoading } =
        useProductCollectionsQuery({});
    const { data: categories, isLoading, refetch } = useCategoriesQuery({});

    const { data: productsData, isLoading: productsLoading } = useProductsQuery(
        {}
    );

    const { data: brandData } = useBrandsQuery({});
    const searchParams = useSearchParams();
    const collectionId = searchParams.get("collection");
    const brandId = searchParams.get("brand");

    const pathName = usePathname();

    const totalProducts = productsData?.data?.total;
    const collections = collectionsData?.data?.data;
    const category = categories?.data?.data || [];

    const { data: variant } = useVariantsQuery({});
    const varriantData = variant?.data?.data.find(
        (item: any) => item.name === "Age"
    );
    // Remove the leading "/" and split the path into parts
    const pathParts = pathName.split("/").filter((part) => part); // This removes empty parts

    // Create the base URL for each part of the path
    const navigationItems = pathParts?.map((part, index) => {
        const href = "/" + pathParts.slice(0, index + 1).join("/");
        return {
            label:
                part.charAt(0).toUpperCase() + part.slice(1).replace(/-/g, " "),
            href: href,
        };
    });

    // Prepend the 'All Product' link
    navigationItems.unshift({
        label: "All Product",
        href: "/all-product",
    });

    return (
        <>
            {/* <Drawer open={open} onOpenChange={setOpen}>
        <DrawerContent className="top-0 mt-32">
          <div className="mx-auto w-full max-w-sm">
            <div className="order-first w-full md:flex-none md:max-w-[250px] bg-white px-4">

              <div className="flex flex-col gap-4 py-3">
                <h2 className="text-lg font-semibold">Categories</h2>

                <div className="flex flex-col gap-3 text-sm">
                  <Link
                    onClick={() => setOpen(!open)}
                    href={`/all-product`}
                    className="flex justify-between hover:text-red-500 hover:underline"
                  >
                    <button className="">All</button>
                    <span className="text-muted-foreground">
                      ({totalProducts})
                    </span>
                  </Link>
                  {category?.map((item: any, index: number) => (
                    <>
                      <Link
                        onClick={() => setOpen(!open)}
                        href={`/all-product/${item.slug}`}
                        key={index}
                        className="flex justify-between hover:text-red-500 hover:underline"
                      >
                        <button className="">{item.title}</button>
                        <span className="text-muted-foreground">
                          <MdKeyboardArrowRight />
                        </span>
                      </Link>
                      {item.children?.map((child: any, index: number) => (
                        <Link
                          onClick={() => setOpen(!open)}
                          href={`/all-product/${item.slug}`}
                          key={index}
                          className="flex  justify-between hover:text-red-500 hover:underline"
                        >
                          <button className="">{child.title}</button>
                          <span className="text-muted-foreground">
                            {" "}
                            <MdKeyboardArrowRight />
                          </span>
                        </Link>
                      ))}
                    </>
                  ))}
                </div>
              </div>

              <div className="flex flex-col gap-4 py-3">
                <h2 className="text-lg font-semibold">Collections</h2>

                <div className="flex flex-col gap-3 text-sm">
                  {collections?.map((item: any) => (
                    <Link
                      onClick={() => setOpen(!open)}
                      href={`/all-product?collection=${item.id}`}
                      key={item.id}
                      className="flex justify-between hover:text-red-500 hover:underline"
                    >
                      <button className="">{item.name}</button>
                      <span className="text-muted-foreground">
                        ({item?.productProductCollections?.length})
                      </span>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </DrawerContent>
      </Drawer> */}
            {/* Brad come */}
            <div className="md:container mx-auto py-3 px-3 md:px-0">
                <Breadcrumbs items={navigationItems} />
            </div>

            <div className="mx-auto flex md:container flex-col gap-4 pb-4 md:flex-row px-3 md:px-0">
                {/* <Button
          onClick={() => setOpen(!open)}
          variant={"outline"}
          className="md:hidden h-9 text-xs flex justify-between"
        >
          Select Categories
          <IconMathLower className="mr-2 rotate-[-90deg]" size={16} />
        </Button> */}
                {/* <PhoneNav /> end */}
                <div className="order-first w-full md:flex flex-col md:max-w-[250px] hidden h-[700px] overflow-auto">
                    {/* <Categories /> */}
                    <div className="flex flex-col gap-4 bg-white py-3 px-4 mb-2 rounded shadow-sm">
                        <h2 className="text-lg font-semibold">Categories</h2>
                        {productsLoading ||
                        isLoading ||
                        collectionsIsLoading ? (
                            Array(9)
                                .fill(0)
                                ?.map((_, index) => (
                                    <div
                                        className="flex justify-between gap-3"
                                        key={index}
                                    >
                                        <Skeleton className="w-4/12 h-4 rounded"></Skeleton>
                                        <Skeleton className="w-4 h-4 rounded-full"></Skeleton>
                                    </div>
                                ))
                        ) : (
                            <div className="flex flex-col gap-3 text-sm pb-5">
                                <Link
                                    href={`/all-product`}
                                    className="flex justify-between opacity-90 hover:opacity-100"
                                >
                                    <button className="">All</button>
                                    <span className="text-muted-foreground">
                                        ({totalProducts})
                                    </span>
                                </Link>
                                {category?.map((item: any, index: number) => (
                                    <>
                                        <Link
                                            href={`/all-product/${item?.slug}`}
                                            key={index}
                                            className="flex justify-between opacity-90 hover:opacity-100"
                                        >
                                            <button
                                                className={
                                                    pathName.includes(item.slug)
                                                        ? "text-brand"
                                                        : ""
                                                }
                                            >
                                                {item?.title}
                                            </button>
                                            <span className="text-muted-foreground">
                                                <MdKeyboardArrowRight
                                                    className={
                                                        pathName.includes(
                                                            item.slug
                                                        )
                                                            ? "rotate-90 transition-all duration-300"
                                                            : ""
                                                    }
                                                />
                                            </span>
                                        </Link>

                                        {pathName.includes(item.slug) &&
                                            item?.children?.length > 0 &&
                                            item.children?.map(
                                                (
                                                    child: any,
                                                    childIndex: number
                                                ) => (
                                                    <>
                                                        <Link
                                                            href={`/all-product/${item.slug}/${child.slug}`}
                                                            key={`${index}-${childIndex}`}
                                                            className="ml-4 flex justify-between opacity-90 hover:opacity-100"
                                                        >
                                                            <button
                                                                className={
                                                                    pathName.includes(
                                                                        child.slug
                                                                    )
                                                                        ? "text-brand"
                                                                        : ""
                                                                }
                                                            >
                                                                {child?.title}
                                                            </button>
                                                            <span className="text-muted-foreground">
                                                                <MdKeyboardArrowRight
                                                                    className={
                                                                        pathName.includes(
                                                                            child.slug
                                                                        )
                                                                            ? "rotate-90 transition-all duration-300"
                                                                            : ""
                                                                    }
                                                                />
                                                            </span>
                                                        </Link>

                                                        {pathName.includes(
                                                            child.slug
                                                        ) &&
                                                            child?.children
                                                                ?.length > 0 &&
                                                            child.children?.map(
                                                                (
                                                                    grandChild: any,
                                                                    grandChildIndex: number
                                                                ) => (
                                                                    <Link
                                                                        href={`/all-product/${item.slug}/${child.slug}/${grandChild.slug}`}
                                                                        key={`${index}-${childIndex}-${grandChildIndex}`}
                                                                        className="ml-8 flex justify-between opacity-90 hover:opacity-100"
                                                                    >
                                                                        <button
                                                                            className={
                                                                                pathName.includes(
                                                                                    grandChild.slug
                                                                                )
                                                                                    ? "text-brand"
                                                                                    : ""
                                                                            }
                                                                        >
                                                                            {
                                                                                grandChild?.title
                                                                            }
                                                                        </button>
                                                                        <span className="text-muted-foreground">
                                                                            <MdKeyboardArrowRight
                                                                                className={
                                                                                    pathName.includes(
                                                                                        grandChild.slug
                                                                                    )
                                                                                        ? "rotate-90 transition-all duration-300"
                                                                                        : ""
                                                                                }
                                                                            />
                                                                        </span>
                                                                    </Link>
                                                                )
                                                            )}
                                                    </>
                                                )
                                            )}
                                    </>
                                ))}
                            </div>
                        )}
                    </div>
                    {/* <Collections /> */}
                    <div className="flex flex-col gap-4 py-3 px-4 bg-white rounded shadow-sm">
                        <h2 className="text-lg font-semibold">Collections</h2>
                        {productsLoading ||
                        isLoading ||
                        collectionsIsLoading ? (
                            Array(4)
                                .fill(0)
                                ?.map((_, index) => (
                                    <div
                                        className="flex justify-between gap-3"
                                        key={index}
                                    >
                                        <Skeleton className="w-4/12 h-4  rounded"></Skeleton>
                                        <Skeleton className="w-4 h-4  rounded-full"></Skeleton>
                                    </div>
                                ))
                        ) : (
                            <div className="flex flex-col gap-3 text-sm pb-5">
                                {collections?.map((item: any) => (
                                    <Link
                                        href={`/all-product?collection=${item.id}`}
                                        key={item.id}
                                        className={"flex justify-between group"}
                                    >
                                        <button
                                            className={`text-start opacity-90 group-hover:opacity-100 ${
                                                collectionId === item.id
                                                    ? " text-brand"
                                                    : ""
                                            }`}
                                        >
                                            {item.name}
                                        </button>
                                        {/* <span className="text-muted-foreground">
                      ({item?.productProductCollections?.length})
                    </span> */}
                                    </Link>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Brand */}
                    <div className="flex flex-col gap-4 py-3 px-4 bg-white rounded shadow-sm">
                        <h2 className="text-lg font-semibold">Brands</h2>
                        {productsLoading ||
                        isLoading ||
                        collectionsIsLoading ? (
                            Array(4)
                                .fill(0)
                                ?.map((_, index) => (
                                    <div
                                        className="flex justify-between gap-3"
                                        key={index}
                                    >
                                        <Skeleton className="w-4/12 h-4  rounded"></Skeleton>
                                        <Skeleton className="w-4 h-4  rounded-full"></Skeleton>
                                    </div>
                                ))
                        ) : (
                            <div className="flex flex-col gap-3 text-sm pb-5">
                                {brandData?.data?.data?.map((item: any) => (
                                    <Link
                                        href={`/all-product?brand=${item.id}`}
                                        key={item.id}
                                        className={
                                            "flex justify-between group" +
                                                brandId ===
                                            item.id
                                                ? " text-brand"
                                                : ""
                                        }
                                    >
                                        <button className="text-start opacity-90 group-hover:opacity-100">
                                            {item.name}
                                        </button>
                                        {/* <span className="text-muted-foreground">
                      ({item?.productProductCollections?.length})
                    </span> */}
                                    </Link>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
                <div className="flex-1">{children}</div>
            </div>
        </>
    );
}
