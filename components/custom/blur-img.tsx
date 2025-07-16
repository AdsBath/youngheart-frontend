"use client";

import { cn } from "@/lib/utils";
import Image from "next/image";
import React from "react";

interface BlurImgProps {
  src: string;
  className?: string;
  alt: string;
  object?: string;
}

const BlurImg = ({ src, className, alt, object }: BlurImgProps) => {
  const [loaded, setLoaded] = React.useState(false);
  return (
    <div
      className={cn("relative w-52 h-52 rounded-md overflow-hidden", className)}
    >
      <Image
        onLoad={() => setLoaded(true)}
        fill
        className={cn(
          "object-cover object-center absolute inset-0 h-full w-full transition duration-300",
          loaded ? "blur-none" : "blur-md",
          object
        )}
        alt={alt}
        src={src}
      />
    </div>
  );
};

export default BlurImg;
