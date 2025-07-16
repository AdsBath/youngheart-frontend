"use client";

import { useFooterCategoriesQuery } from "@/redux/api/categoriesApi";
import { usePageLinksForFrontendQuery } from "@/redux/api/pageLinkApi";
import { slugify } from "@/utils/slugify";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaFacebook, FaInstagram } from "react-icons/fa";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Skeleton } from "../ui/skeleton";

const Footer = () => {
    const pathname = usePathname();
    const { data, isLoading: pageLoading } = usePageLinksForFrontendQuery({});
    const { data: footerCategory, isLoading: footerCategoryLoading } =
        useFooterCategoriesQuery({});
    const pageData = data?.data?.data;
    const footerCategories = footerCategory?.data;

    return (
        <footer className={"text-black px-5 pb-16 sm:pb-0 bg-[#00706a]"}>
            <div className="container divide-y mx-auto">
                {/* footer top */}
                <div className="md:flex pt-10 sm:pt-20 mb-4 ">
                    {/* 1 */}
                    <div className="w-full flex items-center justify-center md:items-start md:justify-start flex-col pb-8 sm:w-[28%]">
                        <Link href={"/"}>
                            <Image
                                src="/white-logo.svg"
                                alt="babu-khusi-logo"
                                width={180}
                                height={70}
                                className="cursor-pointer object-contain"
                                priority
                            />
                        </Link>
                        <div className="flex items-center gap-4 mt-5">
                            <div className="grid grid-cols-4 gap-4">
                                {/* <!-- Facebook --> */}
                                <div className="flex justify-center items-center">
                                    <a
                                        href="https://www.facebook.com/babukushibd"
                                        target="_blank"
                                        className="transform transition-transform hover:scale-105"
                                    >
                                        <span className="sr-only">
                                            Facebook
                                        </span>
                                        <FaFacebook size={30} fill="white" />
                                        {/* <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="30"
                      height="30"
                      viewBox="0 0 30 30"
                      fill="none"
                    >
                      <path
                        d="M27.5 15C27.5 8.1 21.9 2.5 15 2.5C8.1 2.5 2.5 8.1 2.5 15C2.5 21.05 6.8 26.0875 12.5 27.25V18.75H10V15H12.5V11.875C12.5 9.4625 14.4625 7.5 16.875 7.5H20V11.25H17.5C16.8125 11.25 16.25 11.8125 16.25 12.5V15H20V18.75H16.25V27.4375C22.5625 26.8125 27.5 21.4875 27.5 15Z"
                        fill="#FFFFFF"
                      ></path>
                    </svg> */}
                                    </a>
                                    <a
                                        href="https://www.instagram.com/babukhusibd
"
                                        target="_blank"
                                        className="transform transition-transform hover:scale-105 ml-4"
                                    >
                                        <span className="sr-only">
                                            Facebook
                                        </span>
                                        <FaInstagram size={30} fill="white" />
                                        {/* <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="30"
                      height="30"
                      viewBox="0 0 30 30"
                      fill="none"
                    >
                      <path
                        d="M27.5 15C27.5 8.1 21.9 2.5 15 2.5C8.1 2.5 2.5 8.1 2.5 15C2.5 21.05 6.8 26.0875 12.5 27.25V18.75H10V15H12.5V11.875C12.5 9.4625 14.4625 7.5 16.875 7.5H20V11.25H17.5C16.8125 11.25 16.25 11.8125 16.25 12.5V15H20V18.75H16.25V27.4375C22.5625 26.8125 27.5 21.4875 27.5 15Z"
                        fill="#FFFFFF"
                      ></path>
                    </svg> */}
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* 2 */}
                    <div className="w-full sm:w-[22%] mb-3">
                        <h3 className="font-bold mb-2 text-xl text-white">
                            About
                        </h3>
                        <div className="flex flex-col">
                            <Link href={"/career"}>
                                <span className="py-[1px] hover:underline text-[14px] text-white">
                                    Career
                                </span>
                            </Link>
                            {pageLoading
                                ? [...Array(2)]?.map((_, index) => (
                                      <div key={index}>
                                          <Skeleton className="h-3 w-[50%] mt-1" />
                                          <Skeleton className="h-2 w-[20%] mt-1" />
                                      </div>
                                  ))
                                : pageData?.map((page: any, index: number) => (
                                      <Link
                                          key={index}
                                          href={`/page/${slugify(
                                              page?.title
                                          )}?id=${page?.id}`}
                                      >
                                          <span className="py-[1px] hover:underline text-[14px] text-white">
                                              {page?.title}
                                          </span>
                                      </Link>
                                  ))}
                        </div>
                    </div>
                    {/* 3 */}
                    <div className="w-full sm:w-[22%] text-base">
                        <h3 className="font-bold mb-2 text-xl text-white">
                            Categories
                        </h3>
                        <div className="flex flex-col">
                            {footerCategoryLoading
                                ? [...Array(2)]?.map((_, index) => (
                                      <div key={index}>
                                          <Skeleton className="h-3 w-[50%] mt-1" />
                                          <Skeleton className="h-2 w-[30%] mt-1" />
                                      </div>
                                  ))
                                : footerCategories?.map(
                                      (category: any, index: number) => (
                                          <Link
                                              key={index}
                                              href={`/all-product/${category?.slug}`}
                                          >
                                              <span className="py-[1px] hover:underline text-[14px] transition-all duration-200 text-white">
                                                  {category?.title}
                                              </span>
                                          </Link>
                                      )
                                  )}
                        </div>
                    </div>
                    {/* 4 */}
                    <div className="w-full sm:w-[26%]">
                        <p className="pb-3 text-white">
                            Get the latest updates on new products and upcoming
                            sales by our newsletter!
                        </p>
                        <div className="flex gap-2">
                            <Input placeholder="Enter your email" />
                            <Button className="text-white" variant={"success"}>
                                Subscribe
                            </Button>
                        </div>
                    </div>
                </div>
                {/* sslCommerz */}
                <div className="flex justify-center py-4">
                    <Image
                        src="/SSLCOMMERZ-Pay-With-logo-All-Size_Aug-21-02-1024x120.png"
                        alt="sslcommerz logo"
                        className="h-20 w-full object-contain"
                        width={1024}
                        height={120}
                    />
                </div>
                {/* footer */}
                <div className="py-4 flex items-center justify-center text-center text-white">
                    <p>&copy; 2024 Babu Khusi. All Rights Reserved.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
