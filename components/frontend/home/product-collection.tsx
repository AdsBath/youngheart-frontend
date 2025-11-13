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
import dynamic from "next/dynamic";
import React, { useMemo } from "react";
import ProductCard from "../product-card";
import type { CarouselApi } from "@/components/ui/carousel";

const Banner = dynamic(() => import("./banner"), { ssr: false });

interface Collection {
  id: string;
  name: string;
  imageUrl: string;
  productProductCollections: {
    product: Product;
  }[];
  imageUrl2: string;
  title: string;
  title2: string;
  category: any;
  category2: any;
}

interface Product {
  id: string;
  name: string;
  status: string;
  price: number;
  discountPrice?: number;
  thumbnail: string;
  shortDescription: string;
}

const ProductCollection = ({ collections }: any) => {
  const transformedData = useMemo(
    () =>
      collections?.map((item: Collection) => ({
        id: item.id,
        collectionName: item.name,
        image: item.imageUrl,
        products: item.productProductCollections?.map((i) => i.product),
        image2: item.imageUrl2,
        title: item.title,
        title2: item.title2,
        category: item.category,
        category2: item.category2,
      })),
    [collections]
  );

  const renderContent = () =>
    transformedData?.map(
      (item: any) =>
        item.products?.length > 0 && (
          <div key={item.id} className=" md:my-6 my-4  md:mt-10 mt-5">
            <section className="px-2 md:px-8 space-y-3 md:space-y-6">
              <h2 className="text-2xl md:text-4xl font-semibold mb-2 font-alt">
                {item.collectionName}
              </h2>
              <div className="md:px-5">
                <ProductCarousel products={item.products} />
              </div>
            </section>
            <div className="grid grid-cols-1 md:grid-cols-2 mt-20">
              <Banner
                url={item?.image}
                id={item?.id}
                title={item?.title}
                category={item?.category}
              />
              <Banner
                url={item?.image2}
                id={item?.id}
                title={item?.title2}
                category={item?.category2}
              />
            </div>
          </div>
        )
    );

  return <>{!collections?.length ? renderSkeleton() : renderContent()}</>;
};

export default React.memo(ProductCollection);

export const ProductCarousel = ({ products }: any) => {
  const [api, setApi] = React.useState<CarouselApi>();
  const [current, setCurrent] = React.useState(0);
  const [count, setCount] = React.useState(0);

  // Filter published products
  const publishedProducts = products.filter(
    (product: any) => product.status === "published"
  );

  React.useEffect(() => {
    if (!api) {
      return;
    }

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap() + 1);

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api]);

  const scrollTo = (index: number) => {
    api?.scrollTo(index);
  };

  return (
    <div className="w-full">
      <Carousel
        setApi={setApi}
        opts={{
          align: "start",
          loop: true,
        }}
        className="max-w-full"
      >
        <CarouselContent>
          {publishedProducts?.map((product: any) => (
            <CarouselItem
              key={product.id}
              className="basis-[65%] sm:basis-[50%] md:basis-[35%] lg:basis-[24%] xl:basis-[18%] px-2"
            >
              <div className="h-full">
                <ProductCard product={product} />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="-left-10 border-none rounded-sm bg-[#f974168b] hover:bg-[#f97316]  text-white hidden md:flex hover:text-white" />
        <CarouselNext className="-right-10 border-none rounded-sm bg-[#f974168b] hover:bg-[#f97316]  text-white hidden md:flex hover:text-white" />
      </Carousel>

      {/* Navigation Dots */}
      {count > 1 && (
        <div className="flex justify-center space-x-2 mt-4">
          {Array.from({ length: count }).map((_, index) => (
            <button
              key={index}
              className={`w-2 h-2 rounded-full transition-colors duration-200 ${
                index + 1 === current
                  ? "bg-black dark:bg-white"
                  : "bg-gray-300 dark:bg-gray-600 hover:bg-gray-400 dark:hover:bg-gray-500"
              }`}
              onClick={() => scrollTo(index)}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export const renderSkeleton = () => (
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
          className="basis-[40%] md:basis-[35%] lg:basis-[18%] mx-5"
        >
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
      ))}
    </CarouselContent>
  </Carousel>
);
