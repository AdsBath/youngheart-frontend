"use client";
import ProductCard from "@/components/frontend/product-card";
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

const DapperExecutiveWhereStyleShines = () => {
    const { data, isLoading } = useProductsQuery({});
    const productsData = data?.data?.data;
    return (
        <section className="bg-[#F6F6F6]">
            <div className="container mx-auto  py-10">
                <h2 className="text-2xl font-semibold text-start mb-6">
                    Dapper Executive - Where Style Shines
                </h2>
                <Carousel
                    opts={{
                        align: "start",
                        loop: true,
                    }}
                    className="max-w-full"
                >
                    {isLoading ? (
                        <>
                            <CarouselContent>
                                {[...Array(10)]?.map((_, index) => (
                                    <CarouselItem
                                        key={index}
                                        className="md:basis-1/2 lg:basis-[19%]"
                                    >
                                        <div className="p-1">
                                            <Card>
                                                <CardContent className="p-0 border-none">
                                                    <Skeleton className="h-44 " />
                                                    <Skeleton className="h-5 w-[80%] mt-2" />
                                                    <Skeleton className="h-5 w-[70%] mt-2" />
                                                    <Skeleton className="h-5 w-[40%] my-2" />
                                                </CardContent>
                                            </Card>
                                        </div>
                                    </CarouselItem>
                                ))}
                            </CarouselContent>
                        </>
                    ) : (
                        <CarouselContent>
                            {productsData?.map((product: any) => (
                                <CarouselItem
                                    key={product.id}
                                    className="md:basis-1/2 lg:basis-[19%]"
                                >
                                    <div className="h-full">
                                        <ProductCard
                                            key={product.id}
                                            product={product}
                                        />
                                    </div>
                                </CarouselItem>
                            ))}
                        </CarouselContent>
                    )}
                    <CarouselPrevious className="left-3" />
                    <CarouselNext className="right-3" />
                </Carousel>
            </div>
        </section>
    );
};

export default DapperExecutiveWhereStyleShines;
