/* eslint-disable react/display-name */
"use client";

import ProductCard from "@/components/frontend/product-card";
import { Button } from "@/components/ui/button";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel";
import { Skeleton } from "@/components/ui/skeleton";
import Image from "next/image";
import Link from "next/link";
import { memo } from "react";

interface Product {
    id: string;
}

const SkeletonItem = memo(() => (
    <CarouselItem className="basis-[50%] md:basis-[35%] lg:basis-[30%] pl-2">
        <div className="border-none w-[180px] md:w-[252px] lg:w-[247.36px]">
            <Skeleton className="h-[180px] md:h-[252px] lg:h-[247.36px]" />
            <div className="p-1 w-full">
                <Skeleton className="h-5 w-[80%] mt-2" />
                <Skeleton className="h-3 w-[70%] mt-2" />
                <Skeleton className="h-2 w-[40%] my-2" />
            </div>
        </div>
    </CarouselItem>
));

const OfferPage = ({ offerProductData, bannerData }: any) => {
    const bannerBgImage =
        bannerData?.bgImage ||
        "https://via.placeholder.com/1200x500?text=Banner+Image";

    const bannerLogo =
        bannerData?.logo ||
        "https://via.placeholder.com/500x500?text=Offer+Logo";

    return (
        offerProductData?.length > 0 && (
            <section className="flex justify-center items-center mb-5 sm:mb-10 container mx-auto px-2">
                <div
                    style={{
                        backgroundImage: `url('${bannerBgImage}')`,
                    }}
                    className="py-5 md:rounded-2xl px-2 md:px-6 w-full flex flex-col gap-3 bg-bottom bg-cover bg-no-repeat overflow-hidden"
                >
                    <div className="relative">
                        <Image
                            src={bannerLogo}
                            alt="Offer Logo"
                            className="h-[136px] w-[300px] mx-auto object-contain"
                            width={500}
                            height={290}
                            priority
                            placeholder="blur"
                            blurDataURL="https://via.placeholder.com/100x100?text=Loading"
                        />
                    </div>

                    <Carousel
                        opts={{
                            align: "start",
                            loop: true,
                        }}
                        className="max-w-full"
                    >
                        <CarouselContent>
                            {!offerProductData?.length
                                ? [...Array(4)]?.map((_, index) => (
                                      <SkeletonItem key={index} />
                                  ))
                                : offerProductData?.map((product: Product) => (
                                      <CarouselItem
                                          key={product.id}
                                          className="basis-[42%] md:basis-[35%] lg:basis-[19%] pl-2"
                                      >
                                          <ProductCard product={product} />
                                      </CarouselItem>
                                  ))}
                        </CarouselContent>
                        <CarouselPrevious className="left-3 text-brand hidden md:block" />
                        <CarouselNext className="right-3 text-brand hidden md:block" />
                    </Carousel>

                    <Button
                        className="mx-auto text-white"
                        variant="success"
                        size="lg"
                    >
                        <Link href={`/offer`} className="px-[30px] text-lg">
                            View All
                        </Link>
                    </Button>
                </div>
            </section>
        )
    );
};

export default memo(OfferPage);
