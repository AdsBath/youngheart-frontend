"use client";
import React from "react";
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
import { useGetRelatedProductQuery } from "@/redux/api/productApi";

const RelatedProduct = ({ categoryId }: { categoryId: string }) => {
  const { data, isLoading } = useGetRelatedProductQuery(categoryId);
  const productsData = data?.data?.data || [];

  // Filter published products (if status exists)
  const publishedProducts = productsData.filter(
    (product: any) => product.status === "published"
  );

  // Carousel state for navigation dots
  const [api, setApi] = React.useState<any>();
  const [current, setCurrent] = React.useState(0);
  const [count, setCount] = React.useState(0);

  React.useEffect(() => {
    if (!api) return;
    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap() + 1);

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api, isLoading]);

  const scrollTo = (index: number) => {
    api?.scrollTo(index);
  };

  // Skeleton loader (copied from ProductCarousel)
  const renderSkeleton = () => (
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

  return (
    <section className="py-5 mx-auto px-2 md:px-12">
      <h2 className="text-2xl font-semibold text-start mb-6">
        Similar Products
      </h2>
      {isLoading ? (
        renderSkeleton()
      ) : (
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
                  className="basis-[65%] md:basis-[33%] lg:basis-[22%]  xl:basis-[18%] px-2"
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
      )}
    </section>
  );
};

export default RelatedProduct;
