"use client";

import {
    Carousel,
    CarouselContent,
    CarouselItem,
} from "@/components/ui/carousel";
import { cn } from "@/lib/utils";
import Autoplay from "embla-carousel-autoplay";
import Image from "next/image";
import Link from "next/link";
import { memo, useRef, useState } from "react";

const CustomCarousel = ({ bannerData }: any = {}) => {
    const plugin = useRef(Autoplay({ delay: 8000 }));
    const [loaded, setLoaded] = useState<{ [key: string]: boolean }>({});

    const handleImageLoad = (id: string) => {
        setLoaded((prevState) => ({ ...prevState, [id]: true }));
    };

    return (
        <section className="h-[185px] md:h-[85vh]">
            {bannerData?.length === 0 ? (
                <div className="w-full h-full bg-gray-200 animate-pulse"></div>
            ) : (
                <Carousel
                    plugins={[plugin.current]}
                    className="w-full h-full"
                    opts={{ loop: true, align: "start" }}
                >
                    <CarouselContent className="w-full h-full">
                        {bannerData?.map((bannerItem: any) => (
                            <CarouselItem
                                className="pb-0 px-0"
                                key={bannerItem?.id}
                            >
                                <div className="w-full h-full relative">
                                    {!loaded[bannerItem.id] && (
                                        <div className="absolute inset-0 bg-gray-300 blur-md animate-pulse"></div>
                                    )}
                                    <Image
                                        src={bannerItem?.imageUrl}
                                        fill
                                        onLoadingComplete={() =>
                                            handleImageLoad(bannerItem.id)
                                        }
                                        className={cn(
                                            "transition duration-200 w-full h-full md:object-cover",
                                            loaded[bannerItem.id]
                                                ? "blur-none"
                                                : "blur-md"
                                        )}
                                        blurDataURL={bannerItem?.imageUrl}
                                        placeholder="blur"
                                        alt={
                                            bannerItem?.altText ||
                                            "Carousel image"
                                        }
                                        priority={true}
                                    />
                                    {bannerItem?.linkUrl && (
                                        <Link
                                            href={bannerItem?.linkUrl}
                                            className="absolute inset-0"
                                            aria-label="Carousel Link"
                                        />
                                    )}
                                </div>
                            </CarouselItem>
                        ))}
                    </CarouselContent>
                </Carousel>
            )}
        </section>
    );
};

export default memo(CustomCarousel);
