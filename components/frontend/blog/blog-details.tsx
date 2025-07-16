"use client";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import Image from "next/image";
import React, { useState } from "react";
import { Preview } from "../product/preview";

const BlogDetails = ({ blog }: { blog: any }) => {
  const [loadedImg, setLoadedImg] = useState(false);
  // console.log(blog);
  return (
    <div className="container sm:px-52 my-10">
      <div className="relative h-[25vh] md:h-[45vh] lg:h-[60vh] overflow-hidden">
        <Image
          fill
          className={cn(
            "object-fill absolute inset-0 h-full w-full transition duration-20",
            loadedImg ? "blur-none" : "blur-md"
          )}
          onLoad={() => setLoadedImg(true)}
          alt={blog?.title}
          src={blog.thumbnail || "https://via.placeholder.com/560"}
        />
      </div>
      <h2 className="mt-8 text-2xl sm:text-4xl font-semibold text-wrap tracking-normal">
        {blog?.title}
      </h2>
      <p className="mt-3 text-zinc-500">{format(blog?.createdAt, "PP")}</p>
      <div className="mt-5">
        <Preview value={blog?.content} />
      </div>
    </div>
  );
};

export default BlogDetails;
