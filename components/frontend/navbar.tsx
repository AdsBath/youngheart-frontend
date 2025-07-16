"use client";

import { useTopLevelsCategoriesQuery } from "@/redux/api/categoriesApi";
import { useUserBySessionIdQuery } from "@/redux/api/userApi";
import { onCartOpen } from "@/redux/features/cart/cartSlice";
import { useAppSelector } from "@/redux/hooks";
import { RootState } from "@/redux/store";
import { IconShoppingCart } from "@tabler/icons-react";
import Image from "next/image";
import Link from "next/link";
import { memo, useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { FaUser } from "react-icons/fa";
import { useDispatch } from "react-redux";
import Search from "../search";
import { SidebarTrigger } from "../ui/sidebar";
import { ManBagDropdown } from "./navbar-dropdown";

// Define TypeScript interfaces
interface CartItem {
    id: string;
    price: number;
    quantity: number;
    discountAmount: number;
    discount: number;
}

interface Category {
    id: string;
    title: string;
    slug: string;
    showInFooter: boolean;
    children: Category[];
}

interface CartData {
    cartItems: CartItem[];
}

interface CategoriesData {
    data: Category[];
}

const calculateTotals = (cartItems: any) => {
    const discountAmount =
        cartItems?.reduce(
            (acc: any, item: any) =>
                acc +
                (item.price - (item.discount / 100) * item.price) *
                    item.quantity,
            0
        ) || 0;

    return { discountAmount };
};

const Navbar: React.FC = () => {
    const dispatch = useDispatch();
    const [cookie] = useCookies(["sessionId"]);
    const sessionId = cookie?.sessionId || "";

    // State for categories
    const [categories, setCategories] = useState<Category[]>([]);
    const [isLoadingLocal, setIsLoadingLocal] = useState(true);
    const { items: cartItems } =
        useAppSelector((state: RootState) => state.cart) || [];

    // Fetch user session
    const { data: sessionData } = useUserBySessionIdQuery(
        { id: sessionId },
        { skip: !sessionId }
    );
    const userId = sessionData?.data?.id;

    // Fetch cart data
    // const { data: cartData } = useCartQuery(userId, { skip: !userId });
    // const cartItems = (cartData?.data as CartData)?.cartItems || [];

    const { discountAmount } = calculateTotals(cartItems);

    // Fetch categories
    const { data: categoriesData, isLoading: isLoadingCategories } =
        useTopLevelsCategoriesQuery({});

    // Handle localStorage caching for categories
    useEffect(() => {
        // Load cached categories from localStorage
        const cachedCategories = localStorage.getItem("categories");
        if (cachedCategories) {
            setCategories(JSON.parse(cachedCategories));
            setIsLoadingLocal(false);
        }

        // Update categories with fresh data when available
        if (categoriesData) {
            const freshCategories =
                (categoriesData?.data as CategoriesData)?.data || [];
            setCategories(freshCategories);

            // Save fresh data to localStorage
            localStorage.setItem("categories", JSON.stringify(freshCategories));
        }
    }, [categoriesData]);

    const isLoading = isLoadingCategories && isLoadingLocal;

    return (
        <>
            {/* Phone nav */}
            <div className="shadow-sm sticky top-0 bg-[#FFFFFF] z-[40] block md:hidden text-black">
                <div className="flex relative justify-between items-center h-[60px] px-2 container mx-auto">
                    <Link href="/">
                        <Image
                            src="/logo.svg"
                            alt="babu-khusi-logo"
                            width={100}
                            height={50}
                            priority
                            className="cursor-pointer object-cover"
                        />
                    </Link>
                    <div className="flex items-center w-[60%]">
                        <Search />
                    </div>
                    <SidebarTrigger />
                </div>
            </div>

            {/* Desktop nav */}
            <div className="shadow-sm sticky top-0 bg-white/95 z-[40]">
                {/* Top Section */}
                <div className="h-[70px] md:flex bg-[#FFFFFF] hidden">
                    <div className="container px-10 xl:px-0 py-5">
                        <div className="flex justify-between items-center h-full">
                            <Link href="/">
                                <Image
                                    src="/logo.svg"
                                    alt="babu-khusi-logo"
                                    width={100}
                                    height={30}
                                    priority
                                    className="cursor-pointer object-cover"
                                />
                            </Link>
                            <div className="flex items-center gap-2 w-[50%]">
                                <Search />
                            </div>
                            <div className="flex items-center">
                                <span className="pl-4">
                                    ৳ {Math.ceil(discountAmount)}
                                </span>
                                <div
                                    onClick={() => dispatch(onCartOpen())}
                                    className="relative cursor-pointer"
                                >
                                    <IconShoppingCart size={24} />
                                    {cartItems?.length > 0 && (
                                        <div className="flex items-center justify-center bg-brand text-white text-xs rounded-full h-[17px] w-[17px] absolute -top-1 -right-3">
                                            <span>{cartItems?.length}</span>
                                        </div>
                                    )}
                                </div>
                                <Link
                                    href="/my-account"
                                    className="text-black cursor-pointer text-sm flex ml-6 items-center gap-1 border-2 border-brand rounded-full p-2"
                                >
                                    <FaUser size={16} fill="#00706b" />
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Categories Section */}
                <div className=" justify-center items-center container px-10 xl:px-0 h-[60px] hidden md:flex">
                    <nav className="flex gap-5 text-sm h-full">
                        {isLoading &&
                            Array.from({ length: 10 })?.map((_, index) => (
                                <div
                                    role="status"
                                    className="max-w-sm animate-pulse"
                                    key={index}
                                >
                                    <div className="h-2.5 bg-gray-200 rounded-full w-16 mb-4"></div>
                                </div>
                            ))}
                        {categories?.map((category) =>
                            category.showInFooter ? (
                                category?.children?.length ? (
                                    <ManBagDropdown
                                        key={category.id}
                                        title={category.title}
                                        slug={category.slug}
                                        items={category.children}
                                    />
                                ) : (
                                    <Link
                                        href={`/all-product/${category.slug}`}
                                        key={category.id}
                                        className="py-3"
                                    >
                                        {category.title}
                                    </Link>
                                )
                            ) : null
                        )}
                    </nav>
                </div>
            </div>
        </>
    );
};

export default memo(Navbar);
