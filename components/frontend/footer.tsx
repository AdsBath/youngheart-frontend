"use client";

import { useFooterCategoriesQuery } from "@/redux/api/categoriesApi";
import { usePageLinksForFrontendQuery } from "@/redux/api/pageLinkApi";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";

import { FaFacebook, FaInstagram } from "react-icons/fa6";
import { FaYoutube, FaWhatsapp } from "react-icons/fa";
import { Skeleton } from "../ui/skeleton";

const BRAND_COLOR = "#030303";

const Footer = () => {
  const pathname = usePathname();
  const { data: pageLinksData } = usePageLinksForFrontendQuery({});
  const { data: footerCategory, isLoading: footerCategoryLoading } =
    useFooterCategoriesQuery({});
  const footerCategories = footerCategory?.data;

  return (
    <footer className="text-black px-5 pb-16 sm:pb-0 bg-white">
      <div className="container divide-y mx-auto">
        <div className="md:flex pt-10 sm:pt-20 mb-4 gap-8">
          {/* Logo & Social */}
          <div className="w-full flex items-center justify-center md:items-start md:justify-start flex-col pb-8 sm:w-[28%]">
            <Link href="/">
              <Image
                src="/youngheart.png"
                alt="YoungHeart Logo"
                width={180}
                height={70}
                className="cursor-pointer object-contain"
                priority
              />
            </Link>
            <p className="mt-5" style={{ color: BRAND_COLOR }}>
              We are committed and trusted!
            </p>
            <div className="flex items-center gap-4 mt-5">
              <a
                href="https://www.facebook.com/youngheart.bd?rdid=iOmFE5gRUiWoGLwJ&share_url=https%3A%2F%2Fwww.facebook.com%2Fshare%2F18oHimgdU3%2F#"
                target="_blank"
                rel="noopener noreferrer"
                className="transform transition-transform hover:scale-105"
                aria-label="Facebook"
              >
                <FaFacebook size={30} fill={BRAND_COLOR} />
              </a>
              <a
                href="https://www.instagram.com/youngheartbd/?igsh=Z2tjcW43ZjM4Mm9t#"
                target="_blank"
                rel="noopener noreferrer"
                className="transform transition-transform hover:scale-105"
                aria-label="Instagram"
              >
                <FaInstagram size={30} fill={BRAND_COLOR} />
              </a>
              <a
                href="https://www.youtube.com/@youngheart3251"
                target="_blank"
                rel="noopener noreferrer"
                className="transform transition-transform hover:scale-105"
                aria-label="YouTube"
              >
                <FaYoutube size={30} fill={BRAND_COLOR} />
              </a>
              <a
                href="https://api.whatsapp.com/send?phone=01789649019"
                target="_blank"
                rel="noopener noreferrer"
                className="transform transition-transform hover:scale-105"
                aria-label="WhatsApp"
              >
                <FaWhatsapp size={30} fill={BRAND_COLOR} />
              </a>
            </div>
          </div>

          {/* Categories */}
          <div className="w-full sm:w-[18%] text-base">
            <h3 className="font-bold mb-2 text-xl" style={{ color: BRAND_COLOR }}>
              Categories
            </h3>
            <div className="flex flex-col">
              {footerCategoryLoading
                ? Array.from({ length: 2 }).map((_, idx) => (
                  <div key={idx}>
                    <Skeleton className="h-3 w-[50%] mt-1" />
                    <Skeleton className="h-2 w-[30%] mt-1" />
                  </div>
                ))
                : footerCategories?.map((category: any, idx: number) => (
                  <Link key={idx} href={`/all-product/${category?.slug}`}>
                    <span
                      className="py-[1px] hover:underline text-[14px] transition-all duration-200"
                      style={{ color: BRAND_COLOR }}
                    >
                      {category?.title}
                    </span>
                  </Link>
                ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="w-full sm:w-[18%] text-base mb-3">
            <h3 className="font-bold mb-2 text-xl" style={{ color: BRAND_COLOR }}>
              Quick Links
            </h3>
            <div className="flex flex-col" style={{ color: BRAND_COLOR, fontSize: 15 }}>
              <Link href="/my-account">
                <span className="hover:underline">My Account</span>
              </Link>
              <Link href="/my-account/orders">
                <span className="hover:underline">Orders</span>
              </Link>
              <Link href="/my-account/addresses">
                <span className="hover:underline">Address</span>
              </Link>
              <Link href="/my-account/account-details">
                <span className="hover:underline">Account Details</span>
              </Link>
              <Link href="/my-account/my-wishlist">
                <span className="hover:underline">My Wishlist</span>
              </Link>
            </div>
          </div>

          {/* Information */}
          <div className="w-full sm:w-[18%] text-base mb-3">
            <h3 className="font-bold mb-2 text-xl" style={{ color: BRAND_COLOR }}>
              Information
            </h3>
            <div className="flex flex-col" style={{ color: BRAND_COLOR, fontSize: 15 }}>
              <Link href="/customize">
                <span className="hover:underline">Customize</span>
              </Link>
              <Link href="/cart">
                <span className="hover:underline">Shopping Cart</span>
              </Link>
              <Link href="/about">
                <span className="hover:underline">About Us</span>
              </Link>
              <Link href="/policies">
                <span className="hover:underline">Policies</span>
              </Link>
            </div>
          </div>

          {/* Contact Info */}
          <div className="w-full sm:w-[22%] mb-3">
            <h3 className="font-bold mb-2 text-xl" style={{ color: BRAND_COLOR }}>
              Contact Info
            </h3>
            <div className="flex flex-col" style={{ color: BRAND_COLOR, fontSize: 15 }}>
              <span>
                <span className="font-semibold">Email:</span> youngheartbd@gmail.com
              </span>
              <span>
                <span className="font-semibold">Call Us:</span> 01789649019
              </span>
              <span>
                <span className="font-semibold">Address:</span> Road 7, Ranavola, Turag, Dhaka-1230
              </span>
            </div>
          </div>
        </div>

        {/* Payment Methods */}
        <div className="flex flex-col items-center justify-center py-4 gap-2">
          <div className="w-full flex justify-center py-4">
            <Image
              src="/SSLCOMMERZ-Pay-With-logo-All-Size_Aug-21-02-1024x120.png"
              alt="sslcommerz logo"
              className="h-20 w-full object-contain"
              width={1024}
              height={120}
            />
          </div>
        </div>

        {/* Copyright */}
        <div
          className="py-4 flex items-center justify-center text-center"
          style={{ color: BRAND_COLOR, fontSize: 15 }}
        >
          <p>
            © 2025 All Rights Received YoungHeart | Developed by
            <a
              href="https://adsbath.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="ml-1 underline"
              style={{ color: BRAND_COLOR }}
            >
              AdsBath
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
