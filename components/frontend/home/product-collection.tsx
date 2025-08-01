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

const Banner = dynamic(() => import("./banner"), { ssr: false });

interface Collection {
  id: string;
  name: string;
  imageUrl: string;
  productProductCollections: {
    product: Product;
  }[];
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
      })),
    [collections]
  );

  const renderContent = () =>
    transformedData?.map(
      (item: any) =>
        item.products?.length > 0 && (
          <div key={item.id} className="my-6 mt-10">
            <section className="container px-2 space-y-6">
              <h2 className="text-xl md:text-4xl font-semibold mb-2 font-alt">
                {item.collectionName.toUpperCase()}
              </h2>
              <div className="px-5">
                <ProductCarousel products={item.products} />
              </div>
            </section>
            <div className="grid grid-cols-1 md:grid-cols-2 mt-20">
              <Banner url={item.image} id={item.id} />
              <Banner url={item.image} id={item.id} />
            </div>
          </div>
        )
    );

  return <>{!collections?.length ? renderSkeleton() : renderContent()}</>;
};

export default React.memo(ProductCollection);

export const ProductCarousel = ({ products }: any) => {
  return (
    <Carousel
      opts={{
        align: "start",
        loop: true,
      }}
      className="max-w-full"
    >
      <CarouselContent>
        {products
          .filter((product: any) => product.status === "published")
          ?.map((product: any) => (
            <CarouselItem
              key={product.id}
              className="basis-[42%] md:basis-[35%] lg:basis-[19%] pl-2"
            >
              <div className="h-full">
                <ProductCard product={product} />
              </div>
            </CarouselItem>
          ))}
      </CarouselContent>
      <CarouselPrevious className="-left-8  border-none rounded-xs bg-black text-white " />
      <CarouselNext className="-right-8 border-none rounded-xs bg-black text-white" />
    </Carousel>
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
