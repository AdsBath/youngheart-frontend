"use client";

import { useAuth } from "@/context/AuthContext";
import { cn } from "@/lib/utils";
import {
  useCreateWishlistMutation,
  useMyWishlistQuery,
} from "@/redux/api/wishlistApi";
import { calculateDiscount } from "@/utils/calculateDiscount";
import { IconHeart, IconHeartFilled } from "@tabler/icons-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

const ProductCard = ({ product }: any) => {
  const [loadedImg, setLoadedImg] = useState(false);
  const [createWishlist, { isLoading }] = useCreateWishlistMutation();
  const { user, loading } = useAuth();
  const { data } = useMyWishlistQuery(user?.id);
  const router = useRouter();

  const handleWishlist = async () => {
    if (!user) {
      router.push("/my-account");
      return;
    }
    const wishlistData = {
      userId: user?.id,
      productId: product?.id,
    };

    const res = await createWishlist(wishlistData);
    if (res?.data?.statusCode === 200 && res?.data?.success) {
      toast.success(res?.data?.message);
    }
  };

  return (
    <div className="group relative overflow-hidden rounded border border-gray-100 text-sm font-medium text-slate-800 focus:outline-none focus:ring active:bg-brand active:text-white p-2">
      <div className="bg-white cursor-pointer hover:shadow transition-shadow duration-500 relative group rounded">
        <div className="relative h-[180px] md:h-[252px] lg:h-[247.36px] overflow-hidden">
          {/* Preload the critical image */}
          <link
            rel="preload"
            as="image"
            href={product.thumbnail || "https://via.placeholder.com/560"}
          />

          <Image
            fill
            className={cn(
              "object-cover rounded-lg object-top absolute group-hover:scale-105 inset-0 h-full w-full transition duration-500",
              loadedImg ? "blur-none" : "blur-md"
            )}
            onLoad={() => setLoadedImg(true)}
            alt={product?.name}
            src={product.thumbnail || "https://via.placeholder.com/560"}
            priority
          />

          {product?.isAvailable !== "outOfStock" && product?.bundleDiscount ? (
            <span className="absolute bottom-2 left-2 bg-brand text-white font-medium px-2 py-1 text-xs">
              {product?.bundleDiscount.name}
            </span>
          ) : null}
        </div>

        <div className="px-2 py-1">
          <h2 className="font-bold md:text-sm text-xs line-clamp-1">
            {product?.name}
          </h2>

          <p className="text-gray-700 md:text-xs text-[10px] h-8 line-clamp-2">
            {product?.shortDescription}
          </p>
        </div>

        <div className="px-2 py-2 flex justify-between items-center text-xs">
          <span className="text-gray-700 font-bold">
            ৳{" "}
            {product?.discountPrice
              ? calculateDiscount(product?.price, product?.discountPrice)
              : product?.price}{" "}
            <span className="line-through text-red-600">
              {product?.discountPrice ? `৳ ${product?.price}` : ""}
            </span>
          </span>
        </div>
        {product?.isAvailable === "outOfStock" && (
          <div className="absolute top-1/2 right-0 text-white left-0 w-full translate-x-0 translate-y-[-50%] bg-brand/40 font-bold px-2 py-1 text-xs">
            <h4 className="text-xl text-center">Out Of Stock</h4>
          </div>
        )}
      </div>

      {/* Hover border effects */}
      <span className="ease absolute left-0 top-0 h-0 w-0 border-t-2 border-brand transition-all duration-500 group-hover:w-full"></span>
      <span className="ease absolute right-0 top-0 h-0 w-0 border-r-2 border-brand transition-all duration-500 group-hover:h-full"></span>
      <span className="ease absolute bottom-0 right-0 h-0 w-0 border-b-2 border-brand transition-all duration-500 group-hover:w-full"></span>
      <span className="ease absolute bottom-0 left-0 h-0 w-0 border-l-2 border-brand transition-all duration-500 group-hover:h-full"></span>
      <Link
        href={`/product/${product.slug}`}
        rel="preload"
        className="absolute inset-0 h-full w-full"
      ></Link>
      <span>
        <button onClick={handleWishlist}>
          {data?.data?.data?.some(
            (item: any) =>
              item?.userId === user?.id && item?.productId === product?.id
          ) ? (
            <IconHeartFilled
              size={20}
              className="invisible group-hover:visible absolute top-2 right-2 text-red-500 cursor-pointer hover:text-red-600 transition-colors duration-600 z-50"
            />
          ) : (
            <IconHeart
              size={20}
              className="invisible group-hover:visible absolute top-2 right-2 text-red-500 cursor-pointer hover:text-red-600 transition-colors duration-300 z-50"
            />
          )}
        </button>
      </span>
    </div>
  );
};

export default ProductCard;
