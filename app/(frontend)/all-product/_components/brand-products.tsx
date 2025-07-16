"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useBrandQuery } from "@/redux/api/brandApi";
import ShowProducts from "./show-products";

const BrandProducts = ({
    searchValue,
    collection,
}: {
    searchValue: string;
    collection: string;
}) => {
    const {
        data: brandData,
        isLoading,
        isFetching,
    } = useBrandQuery(collection);

    const products = brandData?.data?.products;

    if (isLoading || isFetching) {
        return (
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
                {[...Array(7)]?.map((_, index) => (
                    <Card
                        key={index}
                        className="border-none w-[180px] md:w-[252px] lg:w-[247.36px] rounded-none"
                    >
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
        <div>
            <div className="py-3 px-3 bg-white rounded w-full">
                <h1 className="text-sm font-semibold ">
                    {searchValue ? searchValue : "All"}
                </h1>
            </div>
            <ShowProducts products={products} />
        </div>
    );
};

export default BrandProducts;
