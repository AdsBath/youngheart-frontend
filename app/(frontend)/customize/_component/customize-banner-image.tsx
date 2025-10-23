"use client";
import BlurImage from "@/components/ui/blur-image";
import { useBannerAdsForFrontendQuery } from "@/redux/api/bannerAdApi";
import React, { useState } from "react";

export default function CustomBanner() {
  const { data: elementorCategory } = useBannerAdsForFrontendQuery({});
  const elementor = elementorCategory?.data?.data[0];

  return (
    <div className="relative w-full h-[160px] sm:h-[250px] lg:h-[500px]">
      <BlurImage
        src={elementor?.imageUrl || "https://via.placeholder.com/1920x500"}
        alt="Custom Leather Masterpiece"
        className="h-full w-full object-center "
      />
    </div>
  );
}
