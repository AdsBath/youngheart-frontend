/* eslint-disable react/display-name */
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
import { memo } from "react";
import ProductCard from "../product-card";

const SkeletonItem = memo(() => (
    <CarouselItem className="basis-1/2 md:basis-[35%] lg:basis-[18%] mx-5">
        <Card className="border-none w-[180px] md:w-[252px] lg:w-[247.36px] rounded-none">
            <CardContent className="p-0 border-none rounded-none">
                <Skeleton className="h-[180px] md:h-[252px] lg:h-[247.36px] w-full" />
                <div className="p-1 w-full">
                    <Skeleton className="h-5 w-[80%] mt-2" />
                    <Skeleton className="h-3 w-[70%] mt-2" />
                    <Skeleton className="h-2 w-[40%] my-2" />
                </div>
            </CardContent>
        </Card>
    </CarouselItem>
));

const Features = memo(({ featureData }: { featureData: any }) => {
    return (
        <div>
            {!featureData?.length ? (
                <section className="py-5 md:container px-2">
                    <Carousel
                        opts={{ align: "start", loop: true }}
                        className="max-w-full"
                    >
                        <CarouselContent>
                            {Array.from({ length: 10 }, (_, index) => (
                                <SkeletonItem key={index} />
                            ))}
                        </CarouselContent>
                    </Carousel>
                </section>
            ) : (
                featureData?.map(
                    (item: any) =>
                        item.products?.length > 0 && (
                            <section
                                key={item.id}
                                className="py-5 md:container md:px-5 border border-brand/30 rounded-lg mb-8"
                            >
                                <h2 className="text-xl md:ml-5 ml-2 font-semibold text-left mb-2">
                                    {item.name.toUpperCase()}
                                </h2>
                                <Carousel
                                    opts={{ align: "start", loop: true }}
                                    className="md:px-5"
                                >
                                    <CarouselContent>
                                        {item.products?.map((product: any) => (
                                            <CarouselItem
                                                key={product.product.id}
                                                className="basis-[42%] md:basis-[35%] lg:basis-[19%] pl-2"
                                            >
                                                <ProductCard
                                                    product={product.product}
                                                />
                                            </CarouselItem>
                                        ))}
                                    </CarouselContent>
                                    <CarouselPrevious className="left-3 text-brand hidden md:block" />
                                    <CarouselNext className="right-3 text-brand hidden md:block" />
                                </Carousel>
                            </section>
                        )
                )
            )}
        </div>
    );
});

export default Features;
