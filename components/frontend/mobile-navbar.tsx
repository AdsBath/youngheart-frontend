"use client";

import { useCartQuery } from "@/redux/api/cartApi";
import { useUserBySessionIdQuery } from "@/redux/api/userApi";
import { onCartOpen } from "@/redux/features/cart/cartSlice";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { useCookies } from "react-cookie";
import { BiHomeAlt2 } from "react-icons/bi";
import { BsCart2 } from "react-icons/bs";
import { FaRegUser } from "react-icons/fa";
import { GoGift } from "react-icons/go";
import { MdOutlineShoppingBag } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";

export default function MobileNavbar() {
    const [active, setActive] = useState(0);
    const { isOpen } = useSelector((state: any) => state.cart);
    const pathname = usePathname();
    const [cookie] = useCookies(["sessionId"]);
    const dispatch = useDispatch();
    const { data: sessionData, isLoading: isLoadingSession } =
        useUserBySessionIdQuery({ id: cookie.sessionId });
    const userId = sessionData?.data?.id;

    const { data: cartData, isLoading: isLoadingCart } = useCartQuery(userId);
    const cart = cartData?.data;

    const cartItems = cart?.cartItems?.length;

    const menuItems = [
        { id: 0, icon: <BiHomeAlt2 size={28} />, href: "/", name: "HOME" },
        {
            id: 1,
            icon: <GoGift size={28} />,
            href: "/offer",
            name: "OFFER",
        },
        {
            id: 2,
            icon: <MdOutlineShoppingBag size={28} />,
            href: "/all-product",
            name: "SHOP",
        },
        { id: 3, icon: <BsCart2 size={28} />, href: "/#", name: "CART" },
        {
            id: 4,
            icon: <FaRegUser size={28} />,
            href: "/my-account",
            name: "PROFILE",
        },
    ];

    return (
        <nav className="sm:hidden fixed -bottom-1 left-1/2 transform -translate-x-1/2 w-full bg-white px-5 py-2 shadow-lg flex justify-between items-center">
            <ul className="flex justify-between w-full">
                {menuItems?.map((item) => (
                    <li
                        key={item.id}
                        className={`list-none transition-all duration-500 ${
                            pathname === item.href || "/cart"
                                ? "-translate-y-1 opacity-100"
                                : "translate-y-0 opacity-75"
                        }`}
                    >
                        {item.id === 3 ? (
                            <div
                                onClick={() => dispatch(onCartOpen())}
                                className={`flex flex-col items-center transition-all duration-500 relative ${
                                    pathname === "/cart"
                                        ? "text-brand"
                                        : "text-gray-700"
                                }`}
                            >
                                <span
                                    className={`w-12 h-12 flex items-center justify-center rounded-full transition-all ${
                                        pathname === "/cart"
                                            ? "text-brand border-4 border-white"
                                            : ""
                                    }`}
                                >
                                    {item.icon}
                                </span>
                                <span
                                    className={`flex items-center text-xs justify-center font-medium rounded-full transition-all `}
                                >
                                    {item.name}
                                </span>
                                {cartItems > 0 && item.id === 3 && (
                                    <div className="flex items-center justify-center text-brand  text-xs rounded-full h-5 w-5  absolute -top-1 -right-1">
                                        <span>{cartItems}</span>
                                    </div>
                                )}
                            </div>
                        ) : (
                            <Link
                                href={item.href}
                                className={`flex flex-col items-center transition-all duration-500 relative ${
                                    pathname === item.href
                                        ? "text-brand"
                                        : "text-gray-700"
                                }`}
                            >
                                <span
                                    className={`w-12 h-12 flex items-center justify-center font-medium rounded-full transition-all ${
                                        pathname === item.href
                                            ? "text-brand border-4 border-white"
                                            : ""
                                    }`}
                                >
                                    {item.icon}
                                </span>
                                <span
                                    className={`flex items-center text-xs justify-center font-medium rounded-full transition-all `}
                                >
                                    {item.name}
                                </span>
                            </Link>
                        )}
                    </li>
                ))}
            </ul>
        </nav>
    );
}
