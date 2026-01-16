"use client";

import { useMemo } from "react";

import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useProductsQuery } from "@/redux/api/productApi";
import { useProductCollectionQuery } from "@/redux/api/productCollectionApi";
import ShowProducts from "./show-products";

const AllProducts = ({
    searchValue,
    collection,
}: {
    searchValue: string;
    collection: string;
}) => {
    const productParams = useMemo(() => {
        const params: Record<string, string> = {};

        if (searchValue) params.q = searchValue;
        if (collection) params.collection = collection;

        return params;
    }, [collection, searchValue]);

    const {
        data: productsData,
        isLoading: productsLoading,
        isFetching,
    } = useProductsQuery(productParams, {
        refetchOnMountOrArgChange: false,
        refetchOnReconnect: false,
        refetchOnFocus: false,
    });

    const products = productsData?.data?.data;
    const { data: collectionData } = useProductCollectionQuery(collection, {
        skip: !collection,
    });

    if (productsLoading || isFetching) {
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
                <h1 className="text-xl font-semibold ">
                    {collection ? collectionData?.data?.name : "All"}
                </h1>
            </div>
            <ShowProducts products={products} />
        </div>
    );
};

export default AllProducts;
