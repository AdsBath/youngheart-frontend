"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useCreateCartMutation } from "@/redux/api/cartApi";
import { onCartOpen } from "@/redux/features/cart/cartSlice";
import { calculateDiscount } from "@/utils/calculateDiscount";
import { IconLoader } from "@tabler/icons-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useDispatch } from "react-redux";

const WishlistProductCard = ({ product }: any) => {
  const [loadedImg, setLoadedImg] = useState(false);
  const [createCart, { isLoading }] = useCreateCartMutation();
  const dispatch = useDispatch();

  const handleAddToCart = async (productId: string) => {
    const data = {
      productId,
      color: product?.variations[0]?.color,
      size: product?.variations[0]?.size,
      price:
        parseFloat(product?.variations[0]?.discount) > 0
          ? parseFloat(product?.variations[0]?.discount)
          : parseFloat(product?.variations[0]?.price),
      quantity: 1,
    };
    const res = await createCart(data).unwrap();
    // console.log(res);
    dispatch(onCartOpen());
  };

  // console.log("popular card", product);
  return (
    <div className="bg-gray-100 bg-transparent border cursor-pointer transition-shadow duration-300 relative group h-full flex flex-col justify-between rounded">
      <div className="relative group">
        <Link href={`/product/${product.slug}`}>
          <div className="cursor-pointer transition-shadow duration-300 relative group h-full flex flex-col justify-between rounded">
            <div>
              <div className="relative h-[150px] md:h-[200px] overflow-hidden">
                <Image
                  fill
                  className={cn(
                    "object-cover object-top absolute rounded inset-0 h-full w-full transition duration-20",
                    loadedImg ? "blur-none" : "blur-md"
                  )}
                  onLoad={() => setLoadedImg(true)}
                  alt={product?.name}
                  src={product.thumbnail || "https://via.placeholder.com/560"}
                />
              </div>
              <div className="px-2 py-1">
                <div className="font-bold md:text-sm text-xs">
                  {product?.name?.substring(0, 20)}
                </div>
                <p className="text-gray-700 md:text-xs text-[10px]">
                  {product?.shortDescription?.substring(0, 45)}
                </p>
              </div>
            </div>
            <div className="px-2 pb-2 flex justify-between items-center text-xs ">
              <span className="text-gray-700 font-bold ">
                ৳{" "}
                {product?.discountPrice
                  ? calculateDiscount(product?.price, product?.discountPrice)
                  : product?.price}{" "}
                <span className="line-through text-red-600  ">
                  {product?.discountPrice ? `৳ ${product?.price}` : ""}
                </span>
              </span>
            </div>
          </div>
        </Link>
      </div>
      <Button
        onClick={() => handleAddToCart(product?.id)}
        variant={"destructive"}
        size={"lg"}
        className="w-full"
      >
        {isLoading && <IconLoader className="animate-spin" size={17} />}
        Add to Cart
      </Button>
    </div>
  );
};

export default WishlistProductCard;
