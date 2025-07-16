"use client";
import { Preview } from "@/components/frontend/product/preview";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { usePageLinkQuery } from "@/redux/api/pageLinkApi";
import { useSearchParams } from "next/navigation";
import React from "react";

const Page = () => {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");

  const { data, isLoading } = usePageLinkQuery(id);

  if (isLoading) {
    return (
      <div className="min-h-screen">
        <div className="bg-bandBlack h-[20vh] sm:h-[30vh] flex items-center">
          <div className="container text-white ">
            <Skeleton className="h-5 w-60 mb-5" />
            <Skeleton className="h-3 w-80" />
          </div>
        </div>
        <div className="container py-10">
          <div className="space-y-3">
            <Skeleton className="h-4 w-1/2" />
            <Skeleton className="h-4 w-3/4 bg-white" />
            <Skeleton className="h-4 bg-white w-1/2" />
            <Skeleton className="h-4 bg-white w-3/4" />
            <Skeleton className="h-4 bg-white w-1/2" />
            <Skeleton className="h-4 bg-white w-3/4" />
            <Skeleton className="h-4 bg-white w-1/2" />
            <Skeleton className="h-4 bg-white w-3/4" />
            <Skeleton className="h-4 bg-white w-1/2" />
            <Skeleton className="h-4 bg-white w-3/4" />
            <Skeleton className="h-4 bg-white w-1/2" />
          </div>
        </div>
      </div>
    );
  }

  // console.log(data);
  return (
    <div className="min-h-screen">
      <div className="bg-bandBlack h-[20vh] sm:h-[30vh] flex items-center">
        <div className="container text-white">
          <h2 className="text-xl sm:text-3xl font-semibold mb-5">
            {data?.data?.title}
          </h2>
          {data?.data?.shortDescription && (
            <p className="text-xl font-normal w-full sm:w-[500px] text-wrap">
              {data?.data?.shortDescription}
            </p>
          )}
        </div>
      </div>
      <div className="container py-5">
        {/* <div dangerouslySetInnerHTML={{ __html: data?.data?.content }}></div> */}
        <Preview value={data?.data?.content} className="text-2xl" />
      </div>
    </div>
  );
};

export default Page;
