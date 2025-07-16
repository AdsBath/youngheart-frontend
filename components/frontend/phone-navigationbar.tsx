"use client";
import { useCartQuery } from "@/redux/api/cartApi";
import { useUserBySessionIdQuery } from "@/redux/api/userApi";
import { onCartOpen } from "@/redux/features/cart/cartSlice";
import { CiGift, CiHome, CiShop, CiShoppingCart, CiUser } from "react-icons/ci";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCookies } from "react-cookie";
import { useDispatch } from "react-redux";

const PhoneNav = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [cookie] = useCookies(["sessionId"]);
  const { data: sessionData, isLoading: isLoadingSession } =
    useUserBySessionIdQuery({ id: cookie.sessionId });
  const userId = sessionData?.data?.id;

  const { data: cartData, isLoading: isLoadingCart } = useCartQuery(userId);
  const cart = cartData?.data;

  const cartItems = cart?.cartItems?.length;

  return (
    <div className="fixed bottom-0 left-0  backdrop-blur-sm bg-white block md:hidden z-[100] w-full">
      <div className=" flex gap-2 items-center justify-evenly flex-1 py-[7px] px-4">
        <Link
          href="/"
          className="flex flex-col items-center gap-1 text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
          prefetch={false}
        >
          <CiHome size={20} />
          <span className="text-xs">Home</span>
        </Link>
        <Link
          href="/offer"
          className="flex flex-col items-center gap-1 text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
          prefetch={false}
        >
          <CiGift size={20} />
          <span className="text-xs">OFFER</span>
        </Link>

        <Link
          href="/all-product"
          className="flex flex-col items-center gap-1 text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
          prefetch={false}
        >
          <CiShop size={20} />
          <span className="text-xs">Shop</span>
        </Link>

        <div
          className="flex flex-col items-center gap-1 text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
          onClick={() => dispatch(onCartOpen())}
        >
          <div className="relative">
            <CiShoppingCart size={20} />
            {cartItems > 0 && (
              <div className="flex items-center justify-center bg-red-500 text-white text-xs rounded-full h-[17px] w-[17px]  absolute -top-1 -right-3">
                <span>{cartItems}</span>
              </div>
            )}
          </div>
          <span className="text-xs">Cart</span>
        </div>
        <Link
          href="/my-account"
          className="flex flex-col items-center gap-1 text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
          prefetch={false}
        >
          <CiUser size={20} />
          <span className="text-xs">Account</span>
        </Link>
      </div>
    </div>
  );
};

export default PhoneNav;
