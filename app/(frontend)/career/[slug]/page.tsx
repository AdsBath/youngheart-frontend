"use client";

import { CareerForm } from "@/components/frontend/career/career-form";
import { Preview } from "@/components/frontend/product/preview";
import Loading from "@/components/loding";
import { Button } from "@/components/ui/button";
import { useCareerQuery } from "@/redux/api/careerApi";
import { useRouter, useSearchParams } from "next/navigation";
import React from "react";

const CareerDetailsPage = ({
  params: { slug },
}: {
  params: { slug: string };
}) => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const id = searchParams.get("id");
  const apply = searchParams.get("apply");

  const { data, isLoading } = useCareerQuery(id);

  const career = data?.data;

  const addQueryParam = () => {
    const params = new URLSearchParams(searchParams);
    params.set("apply", slug);

    const newUrl = `${window.location.pathname}?${params.toString()}`;
    router.push(newUrl);
  };

  if (isLoading) {
    return (
      <div className="min-h-[60vh]">
        <Loading />
      </div>
    );
  }

  return (
    <>
      {!apply ? (
        <div className="bg-[#FFFFFF] py-20">
          <div className="container flex flex-col gap-y-10">
            <div>
              <div className="flex items-center justify-between h-16">
                <h2 className="text-2xl font-semibold mb-8">
                  {career?.title}
                  <span className="w-[200px] bg-gray-500 h-[5px] block mt-5 rounded-md"></span>
                </h2>
                <Button onClick={addQueryParam}>Apply now</Button>
              </div>
              <p className="text-md font-medium mb-5">
                {career?.shortDescription}
              </p>
              <div>
                <Preview value={career?.content} />
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="container min-h-[100vh] bg-white py-20">
          <div className="w-[80%] mx-auto">
            <h1 className="font-semibold text-[16px] mb-10 text-center">
              Please remember that, the form will be confidential and will be
              used for only internally; so, feel free to submit your data
              however you feel to submit
            </h1>
            <h2 className="text-[28px] font-semibold mb-10">
              Applicant Information
            </h2>
            <div>
              <CareerForm designation={slug} />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CareerDetailsPage;
