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

const ShoppersChoice = () => {
    const { data, isLoading } = useProductsQuery({});
    const productsData = data?.data?.data;
    return (
        <section className="bg-[#F6F6F6]">
            <div className=" py-5 md:container mx-auto px-2 md:px-4 lg:px-[2rem]">
                <h2 className="text-xl md:text-2xl font-semibold text-start mb-4">
                    Shoppers Choice
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
                                        className="basis-1/2  md:basis-[35%] lg:basis-[19%] pl-2"
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
                        </>
                    ) : (
                        <CarouselContent>
                            {productsData?.map((product: any) => (
                                <CarouselItem
                                    key={product.id}
                                    className="basis-1/2  md:basis-[35%] lg:basis-[19%] pl-2"
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
                    <CarouselPrevious className="left-auto lg:flex hidden right-12 -bottom-14 top-auto text-brand" />
                    <CarouselNext className="right-3 lg:flex hidden z-30 -bottom-14 top-auto text-brand" />
                </Carousel>
            </div>
        </section>
    );
};

export default ShoppersChoice;
