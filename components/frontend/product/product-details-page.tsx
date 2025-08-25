"use client";

import { useCreateCartMutation } from "@/redux/api/cartApi";
import { addItemToCart, onCartOpen } from "@/redux/features/cart/cartSlice";
import { IconLoader } from "@tabler/icons-react";
import { Suspense, useEffect, useMemo, useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "sonner";

import { Gallery } from "@/components/frontend/product/gallery";
import RelatedProduct from "@/components/frontend/product/related-product";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { useCookies } from "react-cookie";

import { calculateDiscount } from "@/utils/calculateDiscount";
import { removeCommas } from "@/utils/removeCommas";
import { Noto_Serif } from "next/font/google";
import { useRouter } from "next/navigation";
import { AgeSelector } from "./AgeSelector";
import { ColorSelector } from "./ColorSelector";

import { Preview } from "./preview";
import { QuantitySelector } from "./QuantitySelector";
import { ShareButtons } from "./ShareButtons";
import { SizeSelector } from "./SizeSelector";

const font = Noto_Serif({
  weight: ["400", "500", "600", "700", "500"],
  style: ["normal", "italic"],
  subsets: ["latin"],
  display: "swap",
});
const ProductDetails = ({ product }: { product: any }) => {
  const [buyLoading, setBuyLoading] = useState(false);
  const [selectedImage, setSelectedImage] = useState("");
  const [color, setColor] = useState<string>("");
  const [size, setSize] = useState<string>("");
  const [age, setAge] = useState<string>("");
  const [quantity, setQuantity] = useState<number>(1);
  const [createCart, { isLoading }] = useCreateCartMutation();
  const dispatch = useDispatch();
  const shareUrl = typeof window !== "undefined" ? window.location.href : "";
  const [cookie, setCookie] = useCookies(["sessionId"]);
  const router = useRouter();

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
      image: selectedImage,
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

  const handleBuyNow = async (productId: string) => {
    setBuyLoading(true);
    const data = {
      productId,
      color,
      size,
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
      image: selectedImage,
    };

    const res = await createCart(data).unwrap();

    if (res?.statusCode === 200 && res?.success) {
      setCookie("sessionId", res.data.sessionId);
      setBuyLoading(false);
      router.push(`/checkout?add-to-cart=${product?.slug}`);
    } else {
      toast.error(res?.error);
      setBuyLoading(false);
    }
  };

  useEffect(() => {
    if (product?.variations) {
      const defaultVariant = product?.variations[0];
      setColor(defaultVariant?.color || "");
      setSize(defaultVariant?.size || "");
      setAge(defaultVariant?.age || "");
    }
  }, [product]);

  const getAgeVariants = useMemo(() => {
    return product?.variations
      ?.map((item: any) => item.age)
      .filter((i: string) => i);
  }, [product]);
  const getSizeVariants = useMemo(() => {
    return product?.variations
      ?.map((item: any) => item.size)
      .filter((i: string) => i);
  }, [product]);

  const getColorVariants = useMemo(() => {
    return product?.variations
      ?.map((item: any) => item.color)
      .filter((i: string) => i);
  }, [product]);
  const sortImage = useMemo(() => {
    return product?.images.sort((a: string, b: string) => {
      return a.localeCompare(b);
    });
  }, [product?.images]);

  return (
    <div className="container px-0">
      <div className="flex flex-col md:flex-row my-10">
        <div className="h-full w-full basis-full lg:basis-4/6 ">
          <Suspense fallback={<div className="aspect-square h-full" />}>
            <Gallery
              images={[product?.thumbnail, ...sortImage]?.map((image: any) => ({
                src: image,
                altText: image,
              }))}
              setSelectedImage={setSelectedImage}
            />
          </Suspense>
        </div>

        <div className="md:w-1/2 md:pl-8 mt-4 md:mt-0 px-2">
          <h1 className="text-xl md:text-3xl font-bold mb-2">
            {product?.name}
          </h1>
          <p className="text-gray-700 mb-4 text-sm">
            {product?.shortDescription}
          </p>

          <div className="text-red-500 font-bold text-4xl mb-4">
            ৳{" "}
            {product?.discountPrice > 0
              ? calculateDiscount(product?.price, product?.discountPrice)
              : product?.price}
            {product?.discountPrice > 0 && (
              <span className="line-through text-gray-600 text-lg">
                {" "}
                ৳ {product?.price}{" "}
              </span>
            )}
            {product?.bundleDiscountId && (
              <span className=" text-brand ml-4 text-sm">
                {" "}
                {product?.bundleDiscount?.name}{" "}
              </span>
            )}
          </div>

          <Separator className="my-2" />

          <p className="text-sm font-normal mb-2">
            SKU: <strong>{product?.sku}</strong>
          </p>

          {getColorVariants?.length > 0 && (
            <ColorSelector
              colors={getColorVariants}
              selectedColor={color}
              setColor={setColor}
            />
          )}
          {getSizeVariants?.length > 0 && (
            <SizeSelector
              sizes={getSizeVariants}
              selectedSize={size}
              setSize={setSize}
            />
          )}
          {getAgeVariants?.length > 0 && (
            <AgeSelector
              ages={getAgeVariants}
              selectedAge={age}
              setAge={setAge}
            />
          )}

          <div>
            <div className="flex gap-2 my-2 text-xs text-blue-600">
              <span>
                {product?.isAvailable === "inStock"
                  ? "In Stock"
                  : "Out Of Stock"}
              </span>
            </div>
          </div>

          <div className="flex gap-2 flex-col md:flex-row">
            <QuantitySelector quantity={quantity} setQuantity={setQuantity} />

            <div className="flex flex-1  gap-3">
              <Button
                onClick={() => handleAddToCart(product?.id)}
                className="bg-[#f97316] hover:bg-[#f97316]"
                size="lg"
                disabled={
                  product?.isAvailable !== "inStock" || isLoading || buyLoading
                }
              >
                {!buyLoading && isLoading && (
                  <IconLoader className="animate-spin" size={17} />
                )}
                Add to Cart
              </Button>

              <Button
                onClick={() => handleBuyNow(product?.id)}
                variant="secondary"
                size="lg"
                disabled={buyLoading || product?.isAvailable !== "inStock"}
                className="text-[#f97316]"
              >
                {buyLoading && (
                  <IconLoader className="animate-spin" size={17} />
                )}
                Buy Now
              </Button>
            </div>
          </div>

          <ShareButtons shareUrl={shareUrl} />
        </div>
      </div>

      <Tabs defaultValue="description" className="w-full">
        <TabsList className="w-full justify-start">
          <TabsTrigger value="description">Description</TabsTrigger>
          <TabsTrigger value="details">Product Details</TabsTrigger>
          {/* <TabsTrigger value="instructions">Care Instructions</TabsTrigger>
          <TabsTrigger value="faq">FAQ</TabsTrigger> */}
        </TabsList>

        <TabsContent value="description">
          <Preview value={product?.description} className={font.className} />
        </TabsContent>
        <TabsContent value="details">
          <Preview value={product?.productDetails} />
        </TabsContent>
        {/* <TabsContent value="instructions">
          <CareInstructions />
        </TabsContent>
        <TabsContent value="faq">
          <ProductAccordion />
        </TabsContent> */}
      </Tabs>

      <RelatedProduct categoryId={product?.categoryId} />
      {/* <PopularProduct /> */}
    </div>
  );
};

export default ProductDetails;
