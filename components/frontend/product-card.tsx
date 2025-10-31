// "use client";

// import { useAuth } from "@/context/AuthContext";
// import { cn } from "@/lib/utils";
// import {
//   useCreateWishlistMutation,
//   useMyWishlistQuery,
// } from "@/redux/api/wishlistApi";
// import { calculateDiscount } from "@/utils/calculateDiscount";
// import { IconHeart, IconHeartFilled } from "@tabler/icons-react";
// import Image from "next/image";
// import Link from "next/link";
// import { useRouter } from "next/navigation";
// import { useState } from "react";
// import { toast } from "sonner";

// const ProductCard = ({ product }: any) => {
//   const [loadedImg, setLoadedImg] = useState(false);
//   const [createWishlist, { isLoading }] = useCreateWishlistMutation();
//   const { user, loading } = useAuth();
//   const { data } = useMyWishlistQuery(user?.id);
//   const router = useRouter();

//   const handleWishlist = async () => {
//     if (!user) {
//       router.push("/my-account");
//       return;
//     }
//     const wishlistData = {
//       userId: user?.id,
//       productId: product?.id,
//     };

//     const res = await createWishlist(wishlistData);
//     if (res?.data?.statusCode === 200 && res?.data?.success) {
//       toast.success(res?.data?.message);
//     }
//   };

//   return (
//     <div className="group relative overflow-hidden rounded border border-gray-100 text-sm font-medium text-slate-800 focus:outline-none focus:ring active:bg-brand active:text-white p-2">
//       <div className="bg-white cursor-pointer hover:shadow transition-shadow duration-500 relative group rounded">
//         <div className="relative h-[180px] md:h-[252px] lg:h-[247.36px] overflow-hidden">
//           {/* Preload the critical image */}
//           <link
//             rel="preload"
//             as="image"
//             href={product.thumbnail || "https://via.placeholder.com/560"}
//           />

//           <Image
//             fill
//             className={cn(
//               "object-cover rounded-lg object-top absolute group-hover:scale-105 inset-0 h-full w-full transition duration-500",
//               loadedImg ? "blur-none" : "blur-md"
//             )}
//             onLoad={() => setLoadedImg(true)}
//             alt={product?.name}
//             src={product.thumbnail || "https://via.placeholder.com/560"}
//             priority
//           />

//           {product?.isAvailable !== "outOfStock" && product?.bundleDiscount ? (
//             <span className="absolute bottom-2 left-2 bg-brand text-white font-medium px-2 py-1 text-xs">
//               {product?.bundleDiscount.name}
//             </span>
//           ) : null}
//         </div>

//         <div className="px-2 py-1">
//           <h2 className="font-bold md:text-sm text-xs line-clamp-1">
//             {product?.name}
//           </h2>

//           <p className="text-gray-700 md:text-xs text-[10px] h-8 line-clamp-2">
//             {product?.shortDescription}
//           </p>
//         </div>

//         <div className="px-2 py-2 flex justify-between items-center text-xs">
//           <span className="text-gray-700 font-bold">
//             ৳{" "}
//             {product?.discountPrice
//               ? calculateDiscount(product?.price, product?.discountPrice)
//               : product?.price}{" "}
//             <span className="line-through text-red-600">
//               {product?.discountPrice ? `৳ ${product?.price}` : ""}
//             </span>
//           </span>
//         </div>
//         {product?.isAvailable === "outOfStock" && (
//           <div className="absolute top-1/2 right-0 text-white left-0 w-full translate-x-0 translate-y-[-50%] bg-brand/40 font-bold px-2 py-1 text-xs">
//             <h4 className="text-xl text-center">Out Of Stock</h4>
//           </div>
//         )}
//       </div>

//       {/* Hover border effects */}
//       <span className="ease absolute left-0 top-0 h-0 w-0 border-t-2 border-brand transition-all duration-500 group-hover:w-full"></span>
//       <span className="ease absolute right-0 top-0 h-0 w-0 border-r-2 border-brand transition-all duration-500 group-hover:h-full"></span>
//       <span className="ease absolute bottom-0 right-0 h-0 w-0 border-b-2 border-brand transition-all duration-500 group-hover:w-full"></span>
//       <span className="ease absolute bottom-0 left-0 h-0 w-0 border-l-2 border-brand transition-all duration-500 group-hover:h-full"></span>
//       <Link
//         href={`/product/${product.slug}`}
//         rel="preload"
//         className="absolute inset-0 h-full w-full"
//       ></Link>
//       <span>
//         <button onClick={handleWishlist}>
//           {data?.data?.data?.some(
//             (item: any) =>
//               item?.userId === user?.id && item?.productId === product?.id
//           ) ? (
//             <IconHeartFilled
//               size={20}
//               className="invisible group-hover:visible absolute top-2 right-2 text-red-500 cursor-pointer hover:text-red-600 transition-colors duration-600 z-50"
//             />
//           ) : (
//             <IconHeart
//               size={20}
//               className="invisible group-hover:visible absolute top-2 right-2 text-red-500 cursor-pointer hover:text-red-600 transition-colors duration-300 z-50"
//             />
//           )}
//         </button>
//       </span>
//     </div>
//   );
// };

// export default ProductCard;

"use client";

import type React from "react";

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
import { Button } from "@/components/ui/button";
import { useDispatch } from "react-redux";
import { useCookies } from "react-cookie";
import { removeCommas } from "@/utils/removeCommas";
import { addItemToCart, onCartOpen } from "@/redux/features/cart/cartSlice";
import { useCreateCartMutation } from "@/redux/api/cartApi";

type ProductCardProps = {
  product: {
    id: string;
    name: string;
    shortDescription: string;
    thumbnail: string;
    price: number;
    discountPrice?: number;
    isAvailable: string;
    bundleDiscount?: { name: string };
    slug: string;
    colors?: string[];
    tags?: string[];
    sku?: string;
    quantity?: number;
    selectedImage?: string;
  };
};

const ProductCard = ({ product }: any) => {
  const [loadedImg, setLoadedImg] = useState(false);
  const [createWishlist] = useCreateWishlistMutation();
  const [createCart] = useCreateCartMutation();
  const [cookie, setCookie] = useCookies(["sessionId"]);
  const { user, loading } = useAuth();
  const dispatch = useDispatch();
  const { data } = useMyWishlistQuery(user?.id);
  const [color, setColor] = useState<string>("");
  const [size, setSize] = useState<string>("");
  const [quantity, setQuantity] = useState<number>(1);
  const router = useRouter();
  const handleWishlist = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

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

  const handleAddToCart = async (productId: string) => {
    const data: any = {
      productId,
      color,
      size,
      name: product?.name,
      sku: product?.sku,
      price: parseFloat(removeCommas(product?.price)),
      discountAmmount:
        parseFloat(product?.discountPrice) > 0
          ? (parseFloat(removeCommas(product?.price)) *
              parseFloat(product?.discountPrice)) /
            100
          : 0,
      discount:
        parseFloat(product?.discountPrice) > 0
          ? parseFloat(product?.discountPrice)
          : 0,
      quantity,
      sessionId: cookie.sessionId,
      image: product?.thumbnail,
    };
    dispatch(addItemToCart(data));
    dispatch(onCartOpen());
    try {
      const res = await createCart(data).unwrap();
      if (res?.statusCode === 200 && res?.success) {
        setCookie("sessionId", res.data.sessionId);
      } else {
        toast.error(res?.error);
      }
    } catch (error) {
      console.error("Failed to add to cart:", error);
      toast.error("Could not add item to cart");
    }
  };

  const isInWishlist = data?.data?.data?.some(
    (item: any) => item?.userId === user?.id && item?.productId === product?.id
  );

  return (
    <div className="group relative bg-white rounded-lg overflow-hidden hover:border hover:border-[#f97316] transition-all duration-300 ">
      {/* Image Container */}
      <div className="relative aspect-[3/4] overflow-hidden bg-[#f4f4f4]">
        <link
          rel="preload"
          as="image"
          href={product.thumbnail || "https://via.placeholder.com/400x533"}
        />
        <Image
          fill
          className={cn(
            "object-cover transition-all duration-500 group-hover:scale-105",
            loadedImg ? "blur-none" : "blur-md"
          )}
          onLoad={() => setLoadedImg(true)}
          alt={product?.name}
          src={product.thumbnail || "https://via.placeholder.com/400x533"}
          priority
        />

        {/* Wishlist Button */}
        <button
          onClick={handleWishlist}
          className="absolute top-3 right-3 p-2 rounded-full bg-white/80 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-white z-10"
        >
          {isInWishlist ? (
            <IconHeartFilled size={18} className="text-red-500" />
          ) : (
            <IconHeart size={18} className="text-gray-600 hover:text-red-500" />
          )}
        </button>

        {/* Bundle Discount Badge */}
        {product?.isAvailable !== "outOfStock" && product?.bundleDiscount && (
          <span className="absolute top-3 left-3 bg-red-500 text-white font-medium px-2 py-1 text-xs rounded">
            {product?.bundleDiscount.name}
          </span>
        )}

        {/* Out of Stock Overlay */}
        {product?.isAvailable === "outOfStock" && (
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
            <span className="text-white font-bold text-lg">Out Of Stock</span>
          </div>
        )}

        {/* Action Buttons - Only show on hover and when in stock */}
        {product?.isAvailable !== "outOfStock" && (
          <div className="absolute bottom-0 left-0 right-0 bg-orange-500/50 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className="flex items-center justify-center  md:gap-4 md:p-2">
              {/* Add to Bag Button */}
              <button
                onClick={() => handleAddToCart(product?.id)}
                className="px-1 py-3 text-white text-xs"
              >
                Add to Bag
              </button>

              {/* Divider */}
              <div className="h-6 w-px bg-gray-500" />

              {/* Quick View Button */}
              <Link href={`/product/${product.slug}?view=quick`} passHref>
                <button className="px-1 py-3 text-white text-xs">
                  Quick View
                </button>
              </Link>
            </div>
          </div>
        )}
      </div>
      {/* Product Info */}
      <div className="p-0.5 space-y-3">
        {/* Product Name */}
        <h3 className="font-medium text-gray-900 text-sm leading-tight line-clam">
          {product?.name}
        </h3>

        {/* Price */}
        <div className="flex items-center gap-2">
          <span className="font-bold text-gray-900">
            ৳{" "}
            {product?.discountPrice
              ? calculateDiscount(product?.price, product?.discountPrice)
              : product?.price}
          </span>
          {product?.discountPrice && (
            <span className="text-sm text-gray-500 line-through">
              ৳ {product?.price}
            </span>
          )}
        </div>

        {/* Color Swatches */}
        {/* {product?.colors && product.colors.length > 0 && (
          <div className="flex items-center gap-1">
            {product.colors.slice(0, 4).map((color, index) => (
              <div
                key={index}
                className="w-4 h-4 rounded-full border border-gray-300"
                style={{ backgroundColor: color }}
              />
            ))}
            {product.colors.length > 4 && (
              <span className="text-xs text-gray-500 ml-1">+{product.colors.length - 4}</span>
            )}
          </div>
        )} */}

        {/* Tags */}
        {/* {product?.tags && product.tags.length > 0 && (
          <div className="flex flex-wrap gap-1">
            {product.tags.map((tag, index) => (
              <span key={index} className="px-2 py-1 text-xs font-medium text-gray-700 bg-gray-100 rounded border">
                {tag}
              </span>
            ))}
          </div>
        )} */}
      </div>
    </div>
  );
};

export default ProductCard;
