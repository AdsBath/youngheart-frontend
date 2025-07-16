"use client";
import Breadcrumbs from "@/components/breadcrumb";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import { useBlogsQuery } from "@/redux/api/blogApi";
import { IconArrowBigRightLines, IconFile } from "@tabler/icons-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const Blog = () => {
    const [loadedImg, setLoadedImg] = useState(false);
    const { data: blog, isLoading } = useBlogsQuery({});
    const blogs = blog?.data?.data;
    if (isLoading) {
        return (
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 container">
                {[...Array(7)]?.map((_, index) => (
                    <Card
                        key={index}
                        className="border-none w-[180px] md:w-[252px] lg:w-[247.36px] rounded-none"
                    >
                        <CardContent className="p-0 border-none rounded-none">
                            <Skeleton className=" h-[180px] md:h-[252px] lg:h-[247.36px] w-full " />
                            <div className="p-1 w-full">
                                <Skeleton className="h-5 w-[80%] mt-2" />
                                <Skeleton className="h-3 w-[70%] mt-2" />
                                <Skeleton className="h-2 w-[40%] my-2" />
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        );
    }
    return (
        <div className="container mt-5 mb-10 h-[60vh]">
            <Breadcrumbs
                items={[
                    {
                        label: "Home",
                        href: "/",
                    },
                    { label: "Blog" },
                ]}
            />
            <h2 className="mt-2 text-3xl font-semibold">Blog</h2>
            {blogs?.length ? (
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mt-5">
                    {blogs?.map((blog: any, index: number) => (
                        <Link
                            className="group"
                            href={`/blog/${blog?.slug}`}
                            key={index}
                        >
                            <div className="relative h-[180px] md:h-[252px] lg:h-[247.36px] overflow-hidden">
                                <Image
                                    fill
                                    className={cn(
                                        "object-cover absolute inset-0 h-full w-full transition duration-20",
                                        loadedImg ? "blur-none" : "blur-md"
                                    )}
                                    onLoad={() => setLoadedImg(true)}
                                    alt={blog?.title}
                                    src={
                                        blog.thumbnail ||
                                        "https://via.placeholder.com/560"
                                    }
                                />
                                <div className="absolute flex items-center justify-center h-full w-full bg-black opacity-50 group-hover:visible invisible">
                                    <IconArrowBigRightLines className="text-white" />
                                </div>
                            </div>
                            <h2 className="text-xl mt-7 font-medium text-wrap">
                                {blog?.title}
                            </h2>
                        </Link>
                    ))}
                </div>
            ) : (
                <div className="flex flex-col items-center justify-center h-[400px]">
                    <IconFile size={48} />
                    <p className="text-zinc-500">There has no data</p>
                </div>
            )}
        </div>
    );
};

export default Blog;
