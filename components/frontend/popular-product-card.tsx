"use client";

import { IconHeart, IconHeartFilled, IconLoader } from "@tabler/icons-react";
import Link from "next/link";
import { Button } from "../ui/button";
import { useCreateCartMutation } from "@/redux/api/cartApi";
import { useDispatch } from "react-redux";
import { onCartOpen } from "@/redux/features/cart/cartSlice";
import { toast } from "sonner";
import {
  useCreateWishlistMutation,
  useMyWishlistQuery,
} from "@/redux/api/wishlistApi";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import BlurImage from "../ui/blur-image";
import BlurImg from "../custom/blur-img";

const PopularProductCard = ({ product }: any) => {
  const [createCart, { isLoading }] = useCreateCartMutation();
  const dispatch = useDispatch();

  const [createWishlist] = useCreateWishlistMutation();
  const { user, loading } = useAuth();
  const { data } = useMyWishlistQuery(user?.id);
  const router = useRouter();
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
  // console.log("popular card", product);
  return (
    <div className=" bg-white cursor-pointer hover:shadow transition-shadow duration-300 relative group h-full flex flex-col justify-between rounded">
      <Link href={`/product/${product.slug}`}>
        <div>
          <BlurImg
            src={product.thumbnail || "https://via.placeholder.com/560"}
            alt={product?.name}
            className="w-full h-[300px] "
            object="object-cover"
          />
          <span>
            <Link href={"/"}>
              <IconHeart
                size={20}
                className="absolute top-2 right-2 text-red-500 cursor-pointer hover:text-red-600 transition-colors duration-300 group-hover:block hidden z-50"
              />
              <IconHeartFilled
                size={20}
                className="absolute top-2 right-2 text-red-500 cursor-pointer hover:text-red-600 transition-colors duration-300 hidden"
              />
            </Link>
          </span>
          <div className="px-2 py-1">
            <div className="font-bold text-sm">
              {product?.name?.substring(0, 20)}
            </div>
            <p className="text-gray-700 text-xs">
              {product?.shortDescription?.substring(0, 45)}
            </p>
          </div>
        </div>
        <div className="p-2 flex justify-between items-center text-xs ">
          <span className="text-gray-700 font-bold ">
            ৳ {product?.discountPrice}{" "}
            <span className="line-through text-gray-600  ">
              ৳ {product?.price}
            </span>
          </span>
        </div>
      </Link>
      <Button
        onClick={() => handleAddToCart(product?.id)}
        variant={"destructive"}
        size={"lg"}
        className="w-full"
      >
        {isLoading && <IconLoader className="animate-spin" size={17} />}
        Add to Cart
      </Button>

      <span>
        <button onClick={handleWishlist}>
          {data?.data?.data?.some(
            (item: any) =>
              item?.userId === user?.id && item?.productId === product?.id
          ) ? (
            <IconHeartFilled
              size={20}
              className="absolute top-2 right-2 text-red-500 cursor-pointer hover:text-red-600 transition-colors duration-300 z-50"
            />
          ) : (
            <IconHeart
              size={20}
              className="absolute top-2 right-2 text-red-500 cursor-pointer hover:text-red-600 transition-colors duration-300 group-hover:block z-50"
            />
          )}
        </button>
      </span>
    </div>
  );
};

export default PopularProductCard;
