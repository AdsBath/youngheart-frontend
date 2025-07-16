"use client";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import ProductCard from "../product-card";

const Offer = ({ offerProductData }: { offerProductData: any }) => {
    if (offerProductData?.length === 0) {
        return (
            <div className="grid grid-cols-2 lg:grid-cols-5 gap-3 container">
                {[...Array(5)]?.map((_, index) => (
                    <Card
                        key={index}
                        className="border-none w-[180px] md:w-[252px] lg:w-[247.36px] rounded-none"
                    >
                        <CardContent className="p-0 border-none rounded-none">
                            <Skeleton className=" h-[180px] md:h-[252px] lg:h-[247.36px] w-full " />
                            <div className="p-1 w-full">
                                <Skeleton className="h-5 w-[80%] mt-2" />
                                <Skeleton className="h-3 w-[70%] mt-2" />
                                <Skeleton className="h-2 w-[40%] my-2" />
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        );
    }
    return (
        <div className="container">
            <div className="mt-4">
                {offerProductData?.length > 0 ? (
                    <div className="grid grid-cols-2 lg:grid-cols-5 gap-3 px-2 md:px-0">
                        {offerProductData?.map((product: any) => (
                            <ProductCard key={product.id} product={product} />
                        ))}
                    </div>
                ) : (
                    <div className="text-center mt-9">No product found</div>
                )}
            </div>
        </div>
    );
};

export default Offer;
