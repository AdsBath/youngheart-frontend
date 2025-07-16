"use client";

import Footer from "@/components/frontend/footer";
import Navbar from "@/components/frontend/navbar";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function NotFoundError() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex flex-col items-center justify-center flex-grow py-10 bg-white">
        {/* 404 Title */}
        <h1 className="text-[6rem] font-extrabold text-brand mb-4 leading-none">
          404
        </h1>

        {/* Error Message */}
        <span className="text-lg font-medium text-gray-600">
          Oops! The page you’re looking for can’t be found.
        </span>

        {/* Secondary Message */}
        <p className="text-center text-gray-500 mt-2 mb-6">
          It seems the page you’re trying to reach doesn’t exist or may have
          been moved.
        </p>

        {/* Call-to-Action Buttons */}
        <div className="flex gap-4 mt-4">
          <Link href="/">
            <Button className="px-8 py-3 text-lg font-medium bg-brand text-white hover:bg-bandBlack transition duration-200 rounded-md shadow-md">
              Back to Home
            </Button>
          </Link>
          <Link href="/all-products">
            <Button
              variant="outline"
              className="px-8 py-3 text-lg font-medium text-black border border-brand transition duration-200 rounded-md shadow-md"
            >
              Shop Products
            </Button>
          </Link>
        </div>

        {/* Suggested Links */}
        <div className="mt-10 flex flex-col items-center">
          <span className="text-sm text-gray-500">
            Or explore some popular categories:
          </span>
          <div className="flex gap-6 mt-4">
            <Link
              href="/all-product/man"
              className="text-sm text-blue-600 hover:underline"
            >
              Men&apos;s Fashion
            </Link>
            <Link
              href="/all-product/women"
              className="text-sm text-blue-600 hover:underline"
            >
              Women&apos;s Fashion
            </Link>
            <Link
              href="/all-product/accessories"
              className="text-sm text-blue-600 hover:underline"
            >
              Accessories
            </Link>
            <Link
              href="/all-product/sale"
              className="text-sm text-blue-600 hover:underline"
            >
              On Sale
            </Link>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
