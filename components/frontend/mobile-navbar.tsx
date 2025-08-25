"use client";

import { useCartQuery } from "@/redux/api/cartApi";
import { useUserBySessionIdQuery } from "@/redux/api/userApi";
import { onCartOpen } from "@/redux/features/cart/cartSlice";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCookies } from "react-cookie";
import { BiHomeAlt2 } from "react-icons/bi";
import { BsCart2 } from "react-icons/bs";
import { FaRegUser } from "react-icons/fa";
import { GoGift } from "react-icons/go";
import { MdOutlineShoppingBag } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";

const NAV_ITEMS = [
  { id: 0, icon: BiHomeAlt2, href: "/", label: "Home" },
  { id: 1, icon: GoGift, href: "/offer", label: "Offer" },
  { id: 2, icon: MdOutlineShoppingBag, href: "/all-product", label: "Shop" },
  { id: 3, icon: BsCart2, href: "/cart", label: "Cart" },
  { id: 4, icon: FaRegUser, href: "/my-account", label: "Profile" },
];

export default function MobileNavbar() {
  const pathname = usePathname();
  const [cookie] = useCookies(["sessionId"]);
  const dispatch = useDispatch();

  // Get user and cart info
  const { data: sessionData } = useUserBySessionIdQuery({
    id: cookie.sessionId,
  });
  const userId = sessionData?.data?.id;
  const { data: cartData } = useCartQuery(userId);
  const cartItems = cartData?.data?.cartItems?.length || 0;

  // Helper to determine if nav item is active
  const isActive = (href: string) => {
    if (href === "/cart") return pathname === "/cart";
    return pathname === href;
  };

  return (
    <nav className="sm:hidden fixed bottom-0 left-0 w-full z-50 bg-white border-t border-gray-200 shadow-lg">
      <ul className="flex justify-around items-center h-16">
        {NAV_ITEMS.map((item) => {
          const Icon = item.icon;
          const active = isActive(item.href);

          // Special handling for Cart
          if (item.id === 3) {
            return (
              <li key={item.id} className="flex-1 flex justify-center">
                <button
                  onClick={() => dispatch(onCartOpen())}
                  className={`relative flex flex-col items-center group focus:outline-none ${
                    active ? "text-brand" : "text-gray-500"
                  }`}
                  aria-label="Open cart"
                  type="button"
                >
                  <span
                    className={`flex items-center justify-center p-2 rounded-full transition-all duration-200 ${
                      active
                        ? "bg-brand/10 text-brand shadow"
                        : "hover:bg-gray-100"
                    }`}
                  >
                    <Icon size={20} />
                  </span>
                  <span className="text-xs font-medium tracking-wide">
                    {item.label}
                  </span>
                  {cartItems > 0 && (
                    <span className="absolute -top-1.5 -right-2 bg-brand text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center shadow">
                      {cartItems}
                    </span>
                  )}
                </button>
              </li>
            );
          }

          // All other nav items
          return (
            <li key={item.id} className="flex-1 flex justify-center">
              <Link
                href={item.href}
                className={`flex flex-col items-center group ${
                  active ? "text-brand" : "text-gray-500"
                }`}
                aria-label={item.label}
              >
                <span
                  className={`flex items-center justify-center p-2 rounded-full transition-all duration-200 ${
                    active
                      ? "bg-brand/10 text-brand shadow"
                      : "hover:bg-gray-100"
                  }`}
                >
                  <Icon size={18} />
                </span>
                <span className="font-medium tracking-wide text-xs">
                  {item.label}
                </span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
