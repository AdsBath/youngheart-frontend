"use client";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import React from "react";

const PaymentFailPage = () => {
  const router = useRouter();
  return (
    <div className="container mx-auto min-h-[60vh] my-10 flex flex-col justify-center items-center w-full">
      <h1 className="text-red-500 font-bold text-2xl tracking-normal leading-7 text-center mb-10">
        Opps! <br /> Your payment has been fail!.
      </h1>
      <Button onClick={() => router.push("/")}>Return Shop</Button>
    </div>
  );
};

export default PaymentFailPage;
