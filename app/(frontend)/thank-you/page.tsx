"use client";

import ThankYou from "./_components/thank-you";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import TrackAnimation from "./_components/animattion-car";

const ThankYouPage = () => {
  const router = useRouter();

  useEffect(() => {
    const orderId = JSON.parse(localStorage.getItem("orderId") || "null");
    setTimeout(() => {
      if (orderId) {
        return router.push(`/checkout/order-receive/${orderId}`);
      }
    }, 5000);
  }, [router]);

  return (
    <div>
      <TrackAnimation />
    </div>
  );
};

export default ThankYouPage;
