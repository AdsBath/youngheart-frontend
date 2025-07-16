"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useCareerForFrontendQuery } from "@/redux/api/careerApi";
import { slugify } from "@/utils/slugify";
import { IconFile } from "@tabler/icons-react";
import { useRouter } from "next/navigation";

const Career = () => {
    const { data, isLoading } = useCareerForFrontendQuery({});
    const router = useRouter();
    const careers = data?.data?.data || [];

    if (isLoading) {
        return (
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 container">
                {[...Array(7)]?.map((_, index) => (
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
        <div className="min-h-screen">
            <div className="bg-[#FFFFFF] h-[20vh] sm:h-[30vh] flex items-center">
                <div className="container text-white">
                    <h2 className="text-xl sm:text-3xl font-semibold mb-5 text-[#292929]">
                        Career at Babukhusi
                    </h2>
                    <p className="text-xl font-normal w-full sm:w-[800px] text-wrap text-[#292929]">
                        Join Babukhusi: Elevate Beauty, Inspire Confidence,
                        Shape Your Future.
                    </p>
                </div>
            </div>
            <div>
                {careers?.length > 0 ? (
                    <>
                        <div className="bg-[#F6F6F6] py-20">
                            <div className="container grid grid-cols-1 sm:grid-cols-2 gap-10">
                                {careers?.map((career: any, index: number) => (
                                    <div key={index}>
                                        <h2 className="text-2xl font-semibold mb-8 h-16 text-wrap">
                                            {career?.title}
                                        </h2>
                                        <p className="text-md font-medium mb-5">
                                            {career?.shortDescription}
                                        </p>
                                        <Button
                                            onClick={() =>
                                                router.push(
                                                    `/career/${slugify(
                                                        career?.title
                                                    )}?id=${career?.id}`
                                                )
                                            }
                                        >
                                            View Details
                                        </Button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </>
                ) : (
                    <div className="flex flex-col justify-center items-center h-[400px]">
                        <IconFile size={48} />
                        <p className="text-zinc-500">There has no data</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Career;
