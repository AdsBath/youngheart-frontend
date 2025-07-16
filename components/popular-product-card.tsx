"use client";
import { useAuth } from "@/context/AuthContext";
import { cn } from "@/lib/utils";
import {
  useCreateWishlistMutation,
  useMyWishlistQuery,
} from "@/redux/api/wishlistApi";
import {
  IconHeart,
  IconHeartFilled,
  IconLoader,
  IconMinus,
  IconPlus,
} from "@tabler/icons-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import { Button } from "./ui/button";
import { useDispatch } from "react-redux";
import { onCartOpen } from "@/redux/features/cart/cartSlice";
import { useCreateCartMutation } from "@/redux/api/cartApi";

const PopularProductCard = ({ product }: any) => {
  const [quantity, setQuantity] = useState(1);
  const [loadedImg, setLoadedImg] = useState(false);
  const [createWishlist, { isLoading }] = useCreateWishlistMutation();
  const { user, loading } = useAuth();
  const { data } = useMyWishlistQuery(user?.id);
  const [createCart, { isLoading: addToCartLoading }] = useCreateCartMutation();
  const router = useRouter();
  const dispatch = useDispatch();

  const handleAddToCart = async (value: any) => {
    const data = {
      productId: value?.productId,
      color: value?.color,
      size: value?.size,
      price: value?.price,
      quantity,
    };
    const res = await createCart(data).unwrap();
    // console.log(res);
    if (res?.statusCode === 200 && res?.success) {
      // toast.success("Add to cart successfull");
      dispatch(onCartOpen());
    } else {
      toast.error(res?.error);
    }
  };

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
    <div className="relative group">
      <div className=" bg-white cursor-pointer hover:shadow transition-shadow duration-300 relative group h-full flex flex-col justify-between rounded">
        <Link href={`/product/${product.slug}`}>
          <div className="">
            <div className="relative h-[180px] md:h-[252px] lg:h-[247.36px] overflow-hidden">
              <Image
                fill
                className={cn(
                  "object-cover object-top absolute inset-0 h-full w-full transition duration-20",
                  loadedImg ? "blur-none" : "blur-md"
                )}
                onLoad={() => setLoadedImg(true)}
                alt={product?.name}
                src={product.thumbnail || "https://via.placeholder.com/560"}
              />
            </div>
            <div className="px-2 py-1">
              <div>
                <h2 className="font-bold md:text-sm text-xs line-clamp-1">
                  {product?.name}
                </h2>
              </div>
              <p className="text-gray-700 md:text-xs text-[10px] h-8 line-clamp-2">
                {product?.shortDescription}
              </p>
            </div>
          </div>
          <div className="px-2 pb-2 flex justify-center items-center text-xs">
            <span className="text-yellow-500 font-bold">
              ৳{" "}
              {product?.discountPrice ? product?.discountPrice : product?.price}{" "}
              <span className="line-through text-red-600  ">
                {product?.discountPrice ? `৳ ${product?.price}` : ""}
              </span>
            </span>
          </div>
        </Link>
        <div className="px-2 pb-2 flex space-x-3">
          <div
            style={{ width: "75px" }}
            className="flex justify-between text-sm items-center p-1 border rounded-md h-6"
          >
            <IconMinus
              onClick={() =>
                setQuantity((prev) => {
                  if (prev > 1) {
                    return prev - 1;
                  }
                  return prev;
                })
              }
              size={13}
              className="cursor-pointer"
            />
            <span>{quantity}</span>
            <IconPlus
              onClick={() =>
                setQuantity((prev) => {
                  return prev + 1;
                })
              }
              size={13}
              className="cursor-pointer"
            />
          </div>
          <Button
            onClick={() => {
              const color = product?.variations[0].color;
              const size = product?.variations[0].size;
              const price = parseFloat(product?.variations[0].discountPrice)
                ? parseFloat(product?.variations[0].discountPrice)
                : parseFloat(product?.variations[0].price);
              const addToCartData = {
                color,
                size,
                price,
                productId: product?.id,
              };
              handleAddToCart(addToCartData);
            }}
            variant={"secondary"}
            size={"sm"}
            className="h-6 flex-1"
            disabled={addToCartLoading}
          >
            {addToCartLoading && (
              <IconLoader className="animate-spin" size={17} />
            )}
            Add to Cart
          </Button>
        </div>
      </div>
      <span>
        <button onClick={handleWishlist}>
          {data?.data?.data?.some(
            (item: any) =>
              item?.userId === user?.id && item?.productId === product?.id
          ) ? (
            <IconHeartFilled
              size={20}
              className="invisible group-hover:visible absolute top-2 right-2 text-red-500 cursor-pointer hover:text-red-600 transition-colors duration-300 z-50"
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

export default PopularProductCard;
