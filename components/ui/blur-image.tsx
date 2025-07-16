"use client";

import { cn } from "@/lib/utils";
import Image from "next/image";
import { useState } from "react";

const BlurImage = ({
  alt = "thumbnail",
  src,
  className,
}: {
  alt: string;
  src: string;
  className?: string;
}) => {
  const [loaded, setLoaded] = useState(false);
  return (
    <div className="relative w-full h-full">
      <Image
        src={src}
        layout="fill"
        onLoad={() => setLoaded(true)}
        className={cn(
          "object-cover object-center transition duration-200",
          loaded ? "blur-none" : "blur-md",
          className
        )}
        alt={alt}
      />
    </div>
  );
};

export default BlurImage;
