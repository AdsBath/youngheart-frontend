"use client";

import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";

const Banner = ({ url, id }: { url: string; id: string }) => {
  return (
    <>
      <section>
        <div className="lg:container mx-auto  ">
          <div className="w-full relative group  h-[100px] md:h-[200px] lg:h-[300px]">
            <div>
              <Image
                src={url}
                fill
                className={cn(
                  "transition duration-200 w-full h-full object-contain md:object-cover "
                )}
                alt="thumbnail"
              />
              <Link
                href={`${`/all-product?collection=${id}`}`}
                className="group-hover:opacity-100  absolute bottom-[20%] left-1/2 -translate-x-1/2 group-hover:translate-y-0 translate-y-full opacity-0  text-center text-white bg-brand transition duration-300  hover:text-brand hover:bg-white font-bold text-xl   sm:px-6 px-4 py-2 sm:py-3  rounded-md "
              >
                Visit More
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Banner;
