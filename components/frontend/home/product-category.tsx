"use client";

import {
    Carousel,
    CarouselContent,
    CarouselItem,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import Image from "next/image";
import Link from "next/link";
import { memo, useRef } from "react";

const ProductCategory = ({ categoriesData }: any) => {
    const plugin = useRef(Autoplay({ delay: 3000 }));
    return (
        <section className="py-6 lg:py-10 flex items-center justify-center px-2">
            <div className="container">
                {categoriesData && categoriesData?.length === 0 ? (
                    // Skeleton loader for better UX during data fetch
                    <div className="flex gap-5 justify-center">
                        {[...Array(6)]?.map((_, index) => (
                            <div
                                key={index}
                                className="flex flex-col items-center"
                            >
                                <div className="w-[60px] h-[60px] rounded-full bg-gray-200 animate-pulse"></div>
                                <div className="w-16 h-4 bg-gray-200 rounded-md animate-pulse mt-2"></div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <Carousel
                        plugins={[plugin.current]}
                        className="w-full"
                        opts={{
                            loop: true,
                            align: "start",
                        }}
                    >
                        <CarouselContent className="w-full">
                            {categoriesData?.map((category: any) => (
                                <CarouselItem
                                    key={category.id}
                                    className="basis-[30%] sm:basis-[25%] md:basis-[20%] lg:basis-[12.5%] xl:basis-[10%] pl-2"
                                >
                                    <div className="relative flex flex-col items-center">
                                        {/* Optimized image for lazy loading */}
                                        <div className="w-[60px] h-[60px] md:w-20 md:h-20 relative rounded-full overflow-hidden border border-brand bg-gray-100">
                                            {category?.image ? (
                                                <Image
                                                    src={category.image}
                                                    fill
                                                    className="object-cover object-top rounded-full transition-transform duration-300 hover:scale-95"
                                                    alt={
                                                        category.title ||
                                                        "Category"
                                                    }
                                                    placeholder="blur"
                                                    blurDataURL={
                                                        category?.image ||
                                                        "/placeholder.png"
                                                    }
                                                    loading="lazy"
                                                />
                                            ) : (
                                                <div className="w-full h-full bg-gray-200 animate-pulse rounded-full flex items-center justify-center">
                                                    <p> {category?.title}</p>
                                                </div>
                                            )}
                                        </div>

                                        <p className="text-xs font-semibold text-center mt-1">
                                            {category.title || "Untitled"}
                                        </p>
                                        <Link
                                            href={`/all-product/${category.slug}`}
                                            className="absolute inset-0"
                                            aria-label={`View products in ${category.title}`}
                                        ></Link>
                                    </div>
                                </CarouselItem>
                            ))}
                        </CarouselContent>
                    </Carousel>
                )}
            </div>
        </section>
    );
};

export default memo(ProductCategory);
