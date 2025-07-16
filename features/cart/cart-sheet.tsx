/* eslint-disable react-hooks/exhaustive-deps */
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";

import CartItem from "@/components/frontend/cart/cart-item";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";

import { useCartQuery } from "@/redux/api/cartApi";
import { useProductsQuery } from "@/redux/api/productApi";
import { useUserBySessionIdQuery } from "@/redux/api/userApi";
import { onCloseCart, setCartItems } from "@/redux/features/cart/cartSlice";
import { useAppSelector } from "@/redux/hooks";
import { RootState } from "@/redux/store";
import { useEffect } from "react";
import { useCookies } from "react-cookie";

const CartSheet = () => {
  // const [cartItems, setCartItem] = useState<any[]>();
  const { items: cartItems } = useAppSelector((state: RootState) => state.cart);

  const [cookie] = useCookies(["sessionId"]);
  const isMobile = () => window.innerWidth <= 768;
  const containerHeight = isMobile()
    ? "calc(95vh - 5.8rem)"
    : "calc(100vh - 5.8rem)";
  const id = cookie.sessionId;
  const dispatch = useDispatch();
  const { data: sessionData, isLoading: isLoadingSession } =
    useUserBySessionIdQuery(
      { id: id || "" },
      {
        skip: !id,
      }
    );
  const userId = sessionData?.data?.id;
  const {
    data: cartData,
    isLoading: isLoadingCart,
    isFetching,
  } = useCartQuery(userId);

  const { data: productsData, isLoading: isLoadingProducts } = useProductsQuery(
    {}
  );

  const { isOpen } = useSelector((state: RootState) => state.cart);

  const cart = cartData?.data;

  // useEffect(() => {
  //   setCartItem(items);
  // }, [items]);

  useEffect(() => {
    const cartItems = cart?.cartItems?.map((cartItem: any) => {
      const product = productsData?.data?.data?.find(
        (product: any) => product.id === cartItem.productId
      );
      return { ...cartItem, product };
    });

    const sortedCartItems: any[] = cartItems?.sort((a: any, b: any) => {
      const dateA = a.createdAt ? new Date(a.createdAt) : null;
      const dateB = b.createdAt ? new Date(b.createdAt) : null;

      if (dateA && dateB) {
        return dateB.getTime() - dateA.getTime();
      }
      return 0;
    });
    dispatch(setCartItems(sortedCartItems));
  }, [cart]);

  const subtotal =
    cartItems?.reduce(
      (acc: any, item: any) => acc + item?.price * item?.quantity,
      0
    ) || 0;
  const discount =
    cartItems?.reduce(
      (acc: any, item: any) => acc + item?.discountAmmount * item?.quantity,
      0
    ) || 0;

  return (
    <Sheet open={isOpen} onOpenChange={() => dispatch(onCloseCart())}>
      <SheetContent style={{ width: "360px" }}>
        <SheetHeader>
          <SheetTitle>Your Cart</SheetTitle>
        </SheetHeader>

        <div
          style={{ height: containerHeight }}
          className="flex flex-col justify-between relative"
        >
          {cartItems?.length! > 0 ? (
            <ScrollArea className="h-[80%]">
              {cartItems?.map((item: any) => (
                <CartItem key={item.id} item={item} userId={userId} />
              ))}
            </ScrollArea>
          ) : (
            <div className="flex items-center justify-center h-full">
              <span className="text-sm">Your cart is empty</span>
            </div>
          )}
          <div className="fixed bottom-0 space-y-2 w-[300px] pb-2">
            <div className="flex justify-between">
              <span className="text-sm font-semibold">Subtotal:</span>
              <span className="text-sm font-bold">
                ৳ {subtotal.toFixed(2) - Math.ceil(discount)}
              </span>
            </div>

            <Link
              href="/cart"
              className="w-full mx-auto block py-3 border border-brand rounded text-center"
              onClick={() => {
                dispatch(onCloseCart());
              }}
            >
              View Cart
            </Link>
            <Link
              href={`/checkout?add-to-cart=${cartItems?.length}`}
              onClick={() => {
                dispatch(onCloseCart());
              }}
              className="bg-brand rounded text-center text-white w-full py-3 block mx-auto"
            >
              Checkout
            </Link>
          </div>
        </div>
        {/* )} */}
      </SheetContent>
    </Sheet>
  );
};

export default CartSheet;
