"use client";

import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";

interface BannerProps {
  url: string;
  id: string;
  title?: string;
  category?: string;
  categoryLink?: string;
}

const Banner = ({
  url,
  id,
  title = "QUALITY FLEECE",
  category = "MEN’S SWEATS",
  categoryLink = "/category/mens-sweats",
}: BannerProps) => {
  return (
    <section>
      <div className="w-full relative aspect-square overflow-hidden">
        <Image
          src={url}
          fill
          className={cn(
            "transition duration-200 w-full h-full object-cover object-center"
          )}
          alt="thumbnail"
          priority
        />

        <div className="absolute inset-0 flex flex-col items-center justify-end ">
          <p
            className="text-white text-xs md:text-base font-semibold tracking-wide mb-2"
            style={{ letterSpacing: "0.05em" }}
          >
            {category}
          </p>
          {/* Title */}
          <h2 className="text-white text-2xl md:text-4xl font-bold mb-6 text-center font-alt drop-shadow-lg">
            {title}
          </h2>
          {/* Category Link */}
          <Link
            href={categoryLink}
            className="text-white text-xs md:text-base font-semibold tracking-wide mb-2 hover:underline"
            style={{ letterSpacing: "0.05em" }}
          >
            SHOP NOW
            <span className="ml-1 text-lg">&#8594;</span>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Banner;
