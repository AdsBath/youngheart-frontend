"use client";

import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { useMyWishlistQuery } from "@/redux/api/wishlistApi";
import Loading from "@/components/loding";
import PopularProductCard from "@/components/popular-product-card";

const WishlistProduct = ({ user }: { user: any }) => {
  const { data, isLoading } = useMyWishlistQuery(user?.id);
  const productsData = data?.data?.data;
  return (
    <section>
      <div className="py-4 px-2">
        {isLoading ? (
          <div className="relative">
            <Loading />
          </div>
        ) : (
          <>
            {productsData?.length > 0 ? (
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
                      className="basis-1/2 md:basis-1/2 lg:basis-[25%]"
                    >
                      {/* <div className="h-full">
                        <WishlistProductCard
                          key={product.id}
                          product={product?.product}
                        />
                      </div> */}
                      <PopularProductCard product={product?.product} />
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious className="left-3" />
                <CarouselNext className="right-3" />
              </Carousel>
            ) : (
              <div>
                <p className="text-center">No data store</p>
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
};

export default WishlistProduct;
