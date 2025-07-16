"use client";

import { Card, CardContent } from "@/components/ui/card";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel";
import { Skeleton } from "@/components/ui/skeleton";
import { useProductsQuery } from "@/redux/api/productApi";
// import PopularProductCard from "../popular-product-card";
import PopularProductCard from "@/components/popular-product-card";

const PopularProduct = () => {
    const { data, isLoading } = useProductsQuery({});
    const productsData = data?.data?.data
        ?.map((product: any) => {
            const filteredCollections =
                product.productProductCollections.filter(
                    (collection: any) =>
                        collection.productCollection.name === "New Arrival"
                );

            // Return a new product object with the filtered collections
            return {
                ...product,
                productProductCollections: filteredCollections,
            };
        })
        .filter(
            (product: any) => product?.productProductCollections?.length > 0
        );
    return isLoading ? (
        <section className="py-5 md:container mx-auto px-2 md:px-10 xl:px-0">
            <Carousel
                opts={{
                    align: "start",
                    loop: true,
                }}
                className="max-w-full"
            >
                <CarouselContent>
                    {[...Array(10)]?.map((_, index) => (
                        <CarouselItem
                            key={index}
                            className="basis-1/2 md:basis-[35%] lg:basis-[18%] mx-5"
                        >
                            <Card className="border-none w-[180px] md:w-[252px] lg:w-[247.36px] rounded-none">
                                <CardContent className="p-0 border-none rounded-none">
                                    <Skeleton className=" h-[180px] md:h-[252px] lg:h-[247.36px] w-full " />
                                    <div className="p-1 w-full">
                                        <Skeleton className="h-5 w-[80%] mt-2" />
                                        <Skeleton className="h-3 w-[70%] mt-2" />
                                        <Skeleton className="h-2 w-[40%] my-2" />
                                    </div>
                                </CardContent>
                            </Card>
                        </CarouselItem>
                    ))}
                </CarouselContent>
            </Carousel>
        </section>
    ) : (
        <>
            <section className="py-5 md:container mx-auto px-2 md:px-10 xl:px-0">
                <h2 className="text-2xl font-semibold text-start mb-6">
                    CUSTOMERS ALSO VIEWED
                </h2>
                <Carousel
                    opts={{
                        align: "start",
                        loop: true,
                    }}
                    className="max-w-full"
                >
                    <CarouselContent>
                        {productsData?.map((product: any) => (
                            <CarouselItem
                                key={product.id}
                                className="basis-1/2  md:basis-[35%] lg:basis-[19%] pl-2"
                            >
                                <div className="h-full">
                                    <PopularProductCard product={product} />
                                </div>
                            </CarouselItem>
                        ))}
                    </CarouselContent>

                    <CarouselPrevious className="left-3 text-brand" />
                    <CarouselNext className="right-3 text-brand" />
                </Carousel>
            </section>
        </>
    );
};

export default PopularProduct;
