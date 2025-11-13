"use client";

import CartItem from "@/components/frontend/cart/cart-item";
import Loading from "@/components/loding";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useCartQuery } from "@/redux/api/cartApi";
import { useProductsQuery } from "@/redux/api/productApi";
import { useShippingRulesQuery } from "@/redux/api/shippingRulesApi";
import { useUserBySessionIdQuery } from "@/redux/api/userApi";
import { useAppSelector } from "@/redux/hooks";
import { RootState } from "@/redux/store";
import { trackViewCart } from "@/lib/ga4-events";

import { IconCash } from "@tabler/icons-react";
import { useRouter } from "next/navigation";
import { useCookies } from "react-cookie";
import { useEffect } from "react";

const Cart = () => {
  const router = useRouter();
  const [cookie] = useCookies(["sessionId"]);
  const { items: cartItems } = useAppSelector((state: RootState) => state.cart);
  const { data: sessionData, isLoading: isLoadingSession } =
    useUserBySessionIdQuery({
      id: cookie.sessionId || "",
    });

  const userId = sessionData?.data?.id;
  const { data: cartData, isLoading: isLoadingCart } = useCartQuery(userId);
  const { data: productsData, isLoading: isLoadingProducts } = useProductsQuery(
    {}
  );
  const { data: shippingRulesData, isLoading: isShippingRulesLoading } =
    useShippingRulesQuery({});

  const cart = cartData?.data;
  
  // Map cart items with product data for tracking
  const cartItemsWithProducts = cartItems?.map((cartItem: any) => {
    const product = productsData?.data?.data?.find(
      (product: any) => product.id === cartItem.productId
    );
    return { ...cartItem, product };
  });

  // Track view_cart event when cart page loads
  useEffect(() => {
    if (
      cartItemsWithProducts &&
      cartItemsWithProducts.length > 0 &&
      productsData?.data?.data
    ) {
      trackViewCart(cartItemsWithProducts, productsData.data.data);
    }
  }, [cartItemsWithProducts, productsData]);

  const subtotal =
    cartItems?.reduce(
      (acc: any, item: any) => acc + item.price * item.quantity,
      0
    ) || 0;
  const discount =
    cartItems?.reduce(
      (acc: any, item: any) => acc + item.discountAmmount * item.quantity,
      0
    ) || 0;
  const delivery = cartItems?.length === 0 ? 0 : 60;

  if (
    isLoadingSession ||
    isLoadingCart ||
    isLoadingProducts ||
    isShippingRulesLoading
  ) {
    return (
      <div className="h-screen">
        <Loading />
      </div>
    );
  }

  return (
    <div className="px-2 md:container mx-auto">
      <section className="mt-3 w-full min-h-screen">
        {/* 1 Shopping Cart ------------ 2 Shipping and Checkout ------------ 2 Confirmation */}

        <div className="pt-8 pb-2 flex justify-center items-center w-full flex-wrap sm:flex-nowrap">
          {/* Step 1 */}
          <div className="flex-1 border-t-2 border-red-300 mr-2"></div>
          <div className="flex justify-center items-center relative">
            <div className="w-8 sm:w-10 h-8 sm:h-10 flex items-center justify-center bg-red-500 text-white rounded-full">
              <span className="leading-none">1</span>
            </div>
            <span className="text-[10px] sm:text-sm font-bold absolute bottom-10 w-[80px] text-center sm:w-[100px] text-red-500 -right-[20px] sm:-right-[35px]">
              Shopping Cart
            </span>
          </div>

          {/* Separator */}
          <div className="flex-1 border-t-2 border-red-300 mx-2 sm:mx-4"></div>

          {/* Step 2 */}
          <div className="flex justify-center items-center relative">
            <div className="w-8 sm:w-10 h-8 sm:h-10 flex items-center justify-center bg-gray-200 text-gray-500 rounded-full">
              <span className="leading-none">2</span>
            </div>
            <span className="text-[10px] sm:text-sm font-bold absolute bottom-10 w-[140px] text-center sm:w-[200px] text-gray-500 -right-[55px] sm:-right-[105px]">
              Shipping and Checkout
            </span>
          </div>

          {/* Separator */}
          <div className="flex-1 border-t-2 border-gray-300 mx-2 sm:mx-4"></div>

          {/* Step 3 */}
          <div className="flex justify-center items-center relative">
            <div className="w-8 sm:w-10 h-8 sm:h-10 flex items-center justify-center bg-gray-200 text-gray-500 rounded-full">
              <span className="leading-none">3</span>
            </div>
            <span className="text-[10px] sm:text-sm absolute text-gray-500 bottom-10 w-[80px] text-center sm:w-auto -right-[20px] sm:-right-[25px]">
              Confirmation
            </span>
          </div>

          <div className="flex-1 border-t-2 border-gray-300 mx-2 sm:mx-4"></div>
        </div>

        <div className="w-full flex md:flex-row flex-col items-start gap-3 mt-3">
          <div className="flex flex-col gap-4 md:w-[70%] w-full flex-1">
            {cartItems?.length > 0 ? (
              cartItems?.map((item: any) => (
                <CartItem
                  key={item.id}
                  item={item}
                  userId={userId}
                  cardPage={false}
                />
              ))
            ) : (
              <div className="flex items-center justify-center h-full">
                <span className="text-sm">Your cart is empty</span>
              </div>
            )}
          </div>
          <div className="w-full md:w-[30%] px-1 sm:px-4 my-16 md:my-0">
            <div className="w-full border">
              <div className="border-b">
                <div className="flex justify-between p-3">
                  <span className="text-sm">Subtotal:</span>
                  <span className="text-sm">
                    ৳ {subtotal.toFixed(2) - Math.ceil(discount)}
                  </span>
                </div>
                <div className="flex justify-between p-3">
                  <span className="text-sm">
                    Shipping charge will be estimeted in checkout page
                  </span>
                </div>
              </div>
              <div className="w-full flex flex-col gap-2">
                {shippingRulesData?.data?.data?.map(
                  (shippingRulesItem: any, index: number) => (
                    <div
                      key={index}
                      className="p-2 flex items-center justify-between"
                    >
                      <div className="flex items-center gap-2">
                        <Label className="text-sm font-semibold">
                          {shippingRulesItem?.name}
                        </Label>
                        <IconCash size={18} />
                      </div>
                      <span className="text-xs">
                        ৳ {shippingRulesItem?.shippingCost.toFixed(2)}
                      </span>
                    </div>
                  )
                )}
              </div>
            </div>

            <Button
              disabled={cartItems?.length === 0 ? true : false}
              className="w-full mt-3"
              size={"lg"}
              variant={"destructive"}
              onClick={() =>
                router.push(`/checkout?add-to-cart=${cartItems?.length}`)
              }
            >
              Checkout
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Cart;
