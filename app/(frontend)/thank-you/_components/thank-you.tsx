"use client";
import React from "react";
import Lottie from "lottie-react";
import animation from "./../../../../data/animation.json";

const ThankYou = () => {
  return (
    <div className="h-[80vh] overflow-hidden relative">
      <Lottie animationData={animation} loop={false} />
      <h2 className="text-green-600 absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] text-[50px] text-center font-bold">
        Thank you! Your Order has been received.
      </h2>
    </div>
  );
};

export default ThankYou;
