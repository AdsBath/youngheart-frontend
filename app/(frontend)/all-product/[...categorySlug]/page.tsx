"use client";

import ProductCard from "@/components/frontend/product-card";

import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useCategoryBySlugQuery } from "@/redux/api/categoriesApi";

interface IParams {
    params: {
        categorySlug: string;
    };
}

const CategoryViewPage = ({ params: { categorySlug } }: IParams) => {
    const { data: categoryData, isLoading: categoryLoading } =
        useCategoryBySlugQuery(categorySlug);

    const products = categoryData?.data?.products;

    if (categoryLoading) {
        return (
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 container">
                {[...Array(7)]?.map((_, index) => (
                    <Card key={index} className="border-none rounded-none">
                        <CardContent className="p-0 border-none rounded-none">
                            <Skeleton className=" h-[180px] md:h-[252px] lg:h-[247.36px] w-full " />
                            <div className="p-1 w-full">
                                <Skeleton className="h-5 w-[80%] mt-2" />
                                <Skeleton className="h-3 w-[70%] mt-2" />
                                <Skeleton className="h-2 w-[40%] my-2" />
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        );
    }

    return (
        <>
            <div className="py-3 px-3 bg-white w-full">
                <h1 className="text-xl font-semibold">
                    {categoryData?.data?.category?.title}
                </h1>
            </div>
            <div className="mt-4">
                {products?.length > 0 ? (
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
                        {products?.map((product: any) => (
                            <ProductCard key={product?.id} product={product} />
                        ))}
                    </div>
                ) : (
                    <div className="text-center mt-9">No product found</div>
                )}
            </div>
        </>
    );
};

export default CategoryViewPage;
