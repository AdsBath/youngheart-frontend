// "use client";

// import { useTopLevelsCategoriesQuery } from "@/redux/api/categoriesApi";
// import { useUserBySessionIdQuery } from "@/redux/api/userApi";
// import { onCartOpen } from "@/redux/features/cart/cartSlice";
// import { useAppSelector } from "@/redux/hooks";
// import { RootState } from "@/redux/store";
// import { IconShoppingCart } from "@tabler/icons-react";
// import Image from "next/image";
// import Link from "next/link";
// import { memo, useEffect, useState } from "react";
// import { useCookies } from "react-cookie";
// import { FaUser } from "react-icons/fa";
// import { useDispatch } from "react-redux";
// import Search from "../search";
// import { SidebarTrigger } from "../ui/sidebar";
// import { ManBagDropdown } from "./navbar-dropdown";

// // Define TypeScript interfaces
// interface CartItem {
//     id: string;
//     price: number;
//     quantity: number;
//     discountAmount: number;
//     discount: number;
// }

// interface Category {
//     id: string;
//     title: string;
//     slug: string;
//     showInFooter: boolean;
//     children: Category[];
// }

// interface CartData {
//     cartItems: CartItem[];
// }

// interface CategoriesData {
//     data: Category[];
// }

// const calculateTotals = (cartItems: any) => {
//     const discountAmount =
//         cartItems?.reduce(
//             (acc: any, item: any) =>
//                 acc +
//                 (item.price - (item.discount / 100) * item.price) *
//                 item.quantity,
//             0
//         ) || 0;

//     return { discountAmount };
// };

// const Navbar: React.FC = () => {
//     const dispatch = useDispatch();
//     const [cookie] = useCookies(["sessionId"]);
//     const sessionId = cookie?.sessionId || "";

//     // State for categories
//     const [categories, setCategories] = useState<Category[]>([]);
//     const [isLoadingLocal, setIsLoadingLocal] = useState(true);
//     const { items: cartItems } =
//         useAppSelector((state: RootState) => state.cart) || [];

//     // Fetch user session
//     const { data: sessionData } = useUserBySessionIdQuery(
//         { id: sessionId },
//         { skip: !sessionId }
//     );
//     const userId = sessionData?.data?.id;

//     // Fetch cart data
//     // const { data: cartData } = useCartQuery(userId, { skip: !userId });
//     // const cartItems = (cartData?.data as CartData)?.cartItems || [];

//     const { discountAmount } = calculateTotals(cartItems);

//     // Fetch categories
//     const { data: categoriesData, isLoading: isLoadingCategories } =
//         useTopLevelsCategoriesQuery({});

//     // Handle localStorage caching for categories
//     useEffect(() => {
//         // Load cached categories from localStorage
//         const cachedCategories = localStorage.getItem("categories");
//         if (cachedCategories) {
//             setCategories(JSON.parse(cachedCategories));
//             setIsLoadingLocal(false);
//         }

//         // Update categories with fresh data when available
//         if (categoriesData) {
//             const freshCategories =
//                 (categoriesData?.data as CategoriesData)?.data || [];
//             setCategories(freshCategories);

//             // Save fresh data to localStorage
//             localStorage.setItem("categories", JSON.stringify(freshCategories));
//         }
//     }, [categoriesData]);

//     const isLoading = isLoadingCategories && isLoadingLocal;

//     return (
//         <>
//             {/* Phone nav */}
//             <div className="shadow-sm sticky top-0 bg-[#FFFFFF] z-[40] block md:hidden text-black">
//                 <div className="flex relative justify-between items-center h-[60px] px-2 container mx-auto">
//                     <Link href="/">
//                         <Image
//                             src="/ "
//                             alt="youngheart-logo"
//                             width={100}
//                             height={50}
//                             priority
//                             className="cursor-pointer object-cover"
//                         />
//                     </Link>
//                     <div className="flex items-center w-[60%]">
//                         <Search />
//                     </div>
//                     <SidebarTrigger />
//                 </div>
//             </div>

//             {/* Desktop nav */}
//             <div className="shadow-sm sticky top-0 bg-white/95 z-[40]">
//                 {/* Top Section */}
//                 <div className="h-[70px] md:flex bg-[#FFFFFF] hidden">
//                     <div className="container px-10 xl:px-0 py-5">
//                         <div className="flex justify-between items-center h-full">
//                             <Link href="/">
//                                 <Image
//                                     src="/youngheart.png"
//                                     alt="youngheart-logo"
//                                     width={100}
//                                     height={30}
//                                     priority
//                                     className="cursor-pointer object-cover"
//                                 />
//                             </Link>
//                             <div className="flex items-center gap-2 w-[50%]">
//                                 <Search />
//                             </div>
//                             <div className="flex items-center">
//                                 <span className="pl-4">
//                                     ৳ {Math.ceil(discountAmount)}
//                                 </span>
//                                 <div
//                                     onClick={() => dispatch(onCartOpen())}
//                                     className="relative cursor-pointer"
//                                 >
//                                     <IconShoppingCart size={24} />
//                                     {cartItems?.length > 0 && (
//                                         <div className="flex items-center justify-center bg-brand text-white text-xs rounded-full h-[17px] w-[17px] absolute -top-1 -right-3">
//                                             <span>{cartItems?.length}</span>
//                                         </div>
//                                     )}
//                                 </div>
//                                 <Link
//                                     href="/my-account"
//                                     className="text-black cursor-pointer text-sm flex ml-6 items-center gap-1 border-2 border-brand rounded-full p-2"
//                                 >
//                                     <FaUser size={16} fill="#00706b" />
//                                 </Link>
//                             </div>
//                         </div>
//                     </div>
//                 </div>

//                 {/* Categories Section */}
//                 <div className=" justify-center items-center container px-10 xl:px-0 h-[60px] hidden md:flex">
//                     <nav className="flex gap-5 text-sm h-full">
//                         {isLoading &&
//                             Array.from({ length: 10 })?.map((_, index) => (
//                                 <div
//                                     role="status"
//                                     className="max-w-sm animate-pulse"
//                                     key={index}
//                                 >
//                                     <div className="h-2.5 bg-gray-200 rounded-full w-16 mb-4"></div>
//                                 </div>
//                             ))}
//                         {categories?.map((category) =>
//                             category.showInFooter ? (
//                                 category?.children?.length ? (
//                                     <ManBagDropdown
//                                         key={category.id}
//                                         title={category.title}
//                                         slug={category.slug}
//                                         items={category.children}
//                                     />
//                                 ) : (
//                                     <Link
//                                         href={`/all-product/${category.slug}`}
//                                         key={category.id}
//                                         className="py-3"
//                                     >
//                                         {category.title}
//                                     </Link>
//                                 )
//                             ) : null
//                         )}
//                     </nav>
//                 </div>
//             </div>
//         </>
//     );
// };

// export default memo(Navbar);


"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Search, Heart, ShoppingBag, User, ChevronDown, MapPin, Menu, X } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

interface DropdownItem {
    title: string
    href: string
}

interface DropdownSection {
    title: string
    items: DropdownItem[]
}

interface CustomDropdownProps {
    trigger: string
    sections: DropdownSection[]
    isOpen: boolean
    onToggle: () => void
}

const CustomDropdown = ({ trigger, sections, isOpen, onToggle }: CustomDropdownProps) => {
    return (
        <div className="relative">
            <button
                onClick={onToggle}
                className="flex items-center space-x-1 text-gray-700 hover:text-orange-500 transition-colors font-medium"
            >
                <span>{trigger}</span>
                <motion.div animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.2 }}>
                    <ChevronDown className="h-4 w-4" />
                </motion.div>
            </button>

            <AnimatePresence>
                {isOpen && (
                    <>
                        {/* Desktop Dropdown */}
                        <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.3, ease: "easeOut" }}
                            className="hidden lg:block absolute top-full left-1/2 transform -translate-x-1/2 mt-2 bg-white shadow-2xl rounded-lg border z-50"
                            style={{ width: "50vw", maxWidth: "800px" }}
                        >
                            <div className="p-8">
                                <div className={`grid gap-8 ${sections.length === 2 ? "grid-cols-2" : "grid-cols-3"}`}>
                                    {sections.map((section, index) => (
                                        <motion.div
                                            key={section.title}
                                            initial={{ opacity: 0, x: -20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ duration: 0.3, delay: index * 0.1 }}
                                        >
                                            <h4 className="font-bold text-orange-500 mb-4 text-lg border-b border-orange-100 pb-2">
                                                {section.title}
                                            </h4>
                                            <div className="space-y-3">
                                                {section.items.map((item, itemIndex) => (
                                                    <motion.div
                                                        key={item.title}
                                                        initial={{ opacity: 0, x: -10 }}
                                                        animate={{ opacity: 1, x: 0 }}
                                                        transition={{ duration: 0.2, delay: index * 0.1 + itemIndex * 0.05 }}
                                                    >
                                                        <Link
                                                            href={item.href}
                                                            className="block text-gray-700 hover:text-orange-500 transition-colors py-2 px-3 rounded-md hover:bg-orange-50"
                                                            onClick={onToggle}
                                                        >
                                                            {item.title}
                                                        </Link>
                                                    </motion.div>
                                                ))}
                                            </div>
                                        </motion.div>
                                    ))}
                                </div>
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.3, delay: 0.3 }}
                                    className="mt-8 pt-6 border-t border-gray-200 text-center"
                                >
                                    <Link
                                        href={`/${trigger.toLowerCase()}`}
                                        className="inline-block bg-orange-500 text-white px-6 py-3 rounded-lg hover:bg-orange-600 transition-colors font-medium"
                                        onClick={onToggle}
                                    >
                                        View All {trigger}
                                    </Link>
                                </motion.div>
                            </div>
                        </motion.div>

                        {/* Mobile Dropdown */}
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.3, ease: "easeInOut" }}
                            className="lg:hidden absolute top-full left-0 right-0 bg-white shadow-lg border-t z-50 overflow-hidden"
                        >
                            <div className="p-4 max-h-96 overflow-y-auto">
                                {sections.map((section, index) => (
                                    <motion.div
                                        key={section.title}
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ duration: 0.3, delay: index * 0.1 }}
                                        className="mb-6"
                                    >
                                        <h4 className="font-bold text-orange-500 mb-3 text-sm uppercase tracking-wider">{section.title}</h4>
                                        <div className="space-y-2">
                                            {section.items.map((item, itemIndex) => (
                                                <motion.div
                                                    key={item.title}
                                                    initial={{ opacity: 0, x: -10 }}
                                                    animate={{ opacity: 1, x: 0 }}
                                                    transition={{ duration: 0.2, delay: index * 0.1 + itemIndex * 0.05 }}
                                                >
                                                    <Link
                                                        href={item.href}
                                                        className="block text-gray-700 hover:text-orange-500 transition-colors py-2 px-2 rounded hover:bg-orange-50"
                                                        onClick={onToggle}
                                                    >
                                                        {item.title}
                                                    </Link>
                                                </motion.div>
                                            ))}
                                        </div>
                                    </motion.div>
                                ))}
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.3, delay: 0.3 }}
                                    className="pt-4 border-t border-gray-200"
                                >
                                    <Link
                                        href={`/${trigger.toLowerCase()}`}
                                        className="block w-full bg-orange-500 text-white text-center py-3 rounded-lg hover:bg-orange-600 transition-colors font-medium"
                                        onClick={onToggle}
                                    >
                                        View All {trigger}
                                    </Link>
                                </motion.div>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </div>
    )
}

export default function Navbar() {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
    const [activeDropdown, setActiveDropdown] = useState<string | null>(null)

    const toggleDropdown = (dropdown: string) => {
        setActiveDropdown(activeDropdown === dropdown ? null : dropdown)
    }

    const closeAllDropdowns = () => {
        setActiveDropdown(null)
    }

    const womenSections: DropdownSection[] = [
        {
            title: "Clothing",
            items: [
                { title: "Tops & Blouses", href: "/women/tops" },
                { title: "Dresses", href: "/women/dresses" },
                { title: "Bottoms", href: "/women/bottoms" },
                { title: "Outerwear", href: "/women/outerwear" },
                { title: "Activewear", href: "/women/activewear" },
            ],
        },
        {
            title: "Accessories",
            items: [
                { title: "Bags", href: "/women/bags" },
                { title: "Jewelry", href: "/women/jewelry" },
                { title: "Shoes", href: "/women/shoes" },
                { title: "Scarves", href: "/women/scarves" },
                { title: "Sunglasses", href: "/women/sunglasses" },
            ],
        },
    ]

    const menSections: DropdownSection[] = [
        {
            title: "Clothing",
            items: [
                { title: "Shirts", href: "/men/shirts" },
                { title: "T-Shirts", href: "/men/tshirts" },
                { title: "Pants", href: "/men/pants" },
                { title: "Jackets", href: "/men/jackets" },
                { title: "Activewear", href: "/men/activewear" },
            ],
        },
        {
            title: "Accessories",
            items: [
                { title: "Watches", href: "/men/watches" },
                { title: "Belts", href: "/men/belts" },
                { title: "Shoes", href: "/men/shoes" },
                { title: "Wallets", href: "/men/wallets" },
                { title: "Sunglasses", href: "/men/sunglasses" },
            ],
        },
    ]

    const kidsSections: DropdownSection[] = [
        {
            title: "Boys",
            items: [
                { title: "T-Shirts", href: "/kids/boys/tshirts" },
                { title: "Shorts", href: "/kids/boys/shorts" },
                { title: "Shoes", href: "/kids/boys/shoes" },
                { title: "Accessories", href: "/kids/boys/accessories" },
            ],
        },
        {
            title: "Girls",
            items: [
                { title: "Dresses", href: "/kids/girls/dresses" },
                { title: "Tops", href: "/kids/girls/tops" },
                { title: "Shoes", href: "/kids/girls/shoes" },
                { title: "Accessories", href: "/kids/girls/accessories" },
            ],
        },
        {
            title: "Baby",
            items: [
                { title: "Onesies", href: "/kids/baby/onesies" },
                { title: "Sleepwear", href: "/kids/baby/sleepwear" },
                { title: "Accessories", href: "/kids/baby/accessories" },
                { title: "Toys", href: "/kids/baby/toys" },
            ],
        },
    ]

    return (
        <>
            {/* Top Bar - Not Sticky */}
            <div className="bg-black text-white text-xs">
                <div className="container mx-auto px-4 py-2 flex justify-between items-center">
                    <div className="flex items-center space-x-2">
                        <MapPin className="h-3 w-3" />
                        <span>Find a Store</span>
                    </div>
                    <div className="flex items-center space-x-2">
                        <span>BANGLADESH</span>
                        <div className="w-4 h-3 bg-green-600 relative">
                            <div className="absolute inset-0 bg-red-600 rounded-full w-3 h-3 left-0.5 top-0"></div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Navigation - Sticky */}
            <div className="sticky top-0 z-40 bg-white border-b shadow-sm ">
                <div className="container mx-auto px-4">
                    <div className="flex items-center justify-between py-4">
                        {/* Logo */}
                        <Link href="/">
                            <Image
                                src="/youngheart.png"
                                alt="youngheart-logo"
                                width={100}
                                height={30}
                                priority
                                className="cursor-pointer object-cover"
                            />
                        </Link>

                        {/* Desktop Navigation */}
                        <nav className="hidden lg:flex items-center space-x-4 text-sm">
                            <CustomDropdown
                                trigger="WOMEN"
                                sections={womenSections}
                                isOpen={activeDropdown === "women"}
                                onToggle={() => toggleDropdown("women")}
                            />

                            <CustomDropdown
                                trigger="MEN"
                                sections={menSections}
                                isOpen={activeDropdown === "men"}
                                onToggle={() => toggleDropdown("men")}
                            />

                            <CustomDropdown
                                trigger="KIDS"
                                sections={kidsSections}
                                isOpen={activeDropdown === "kids"}
                                onToggle={() => toggleDropdown("kids")}
                            />

                            <Link href="/bangladesh" className="font-medium text-orange-500 hover:text-orange-600 transition-colors">
                                BANGLADESH
                            </Link>
                            <Link href="/activewear" className="font-medium text-gray-700 hover:text-orange-500 transition-colors">
                                ACTIVEWEAR
                            </Link>
                            <Link href="/sweats" className="font-medium text-gray-700 hover:text-orange-500 transition-colors">
                                SWEATS
                            </Link>
                            <Link href="/gifts" className="font-medium text-gray-700 hover:text-orange-500 transition-colors">
                                GIFTS
                            </Link>
                            <Link href="/leather" className="font-medium text-gray-700 hover:text-orange-500 transition-colors">
                                LEATHER
                            </Link>
                            <Link href="/sale" className="font-medium text-orange-500 hover:text-orange-600 transition-colors">
                                SALE
                            </Link>
                        </nav>

                        {/* Right Side Icons */}
                        <div className="flex items-center space-x-1">

                            <Button variant="ghost" size="icon" className="hidden md:flex hover:text-orange-500">
                                <Search className="h-5 w-5" />
                            </Button>
                            <Button variant="ghost" size="icon" className="hidden md:flex hover:text-orange-500">
                                <Heart className="h-5 w-5" />
                            </Button>
                            <Button variant="ghost" size="icon" className="hover:text-orange-500">
                                <ShoppingBag className="h-5 w-5" />
                            </Button>

                            <Button variant="ghost" className="hidden md:flex items-center space-x-1 hover:text-orange-500">
                                <User className="h-5 w-5" />
                                <span className="text-sm">Sign In</span>
                            </Button>
                            {/* Mobile Menu Button */}
                            <Button
                                variant="ghost"
                                size="icon"
                                className="lg:hidden"
                                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            >
                                {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                            </Button>

                        </div>
                    </div>

                    {/* Mobile Menu */}
                    <AnimatePresence>
                        {isMobileMenuOpen && (
                            <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: "auto" }}
                                exit={{ opacity: 0, height: 0 }}
                                transition={{ duration: 0.3, ease: "easeInOut" }}
                                className="lg:hidden border-t bg-white overflow-hidden"
                            >
                                <nav className="py-4 space-y-2">
                                    <div className="relative">
                                        <CustomDropdown
                                            trigger="WOMEN"
                                            sections={womenSections}
                                            isOpen={activeDropdown === "women-mobile"}
                                            onToggle={() => toggleDropdown("women-mobile")}
                                        />
                                    </div>

                                    <div className="relative">
                                        <CustomDropdown
                                            trigger="MEN"
                                            sections={menSections}
                                            isOpen={activeDropdown === "men-mobile"}
                                            onToggle={() => toggleDropdown("men-mobile")}
                                        />
                                    </div>

                                    <div className="relative">
                                        <CustomDropdown
                                            trigger="KIDS"
                                            sections={kidsSections}
                                            isOpen={activeDropdown === "kids-mobile"}
                                            onToggle={() => toggleDropdown("kids-mobile")}
                                        />
                                    </div>

                                    <Link
                                        href="/bangladesh"
                                        className="block font-medium text-orange-500 hover:text-orange-600 px-4 py-2"
                                    >
                                        BANGLADESH
                                    </Link>
                                    <Link href="/activewear" className="block font-medium text-gray-700 hover:text-orange-500 px-4 py-2">
                                        ACTIVEWEAR
                                    </Link>
                                    <Link href="/sweats" className="block font-medium text-gray-700 hover:text-orange-500 px-4 py-2">
                                        SWEATS
                                    </Link>
                                    <Link href="/gifts" className="block font-medium text-gray-700 hover:text-orange-500 px-4 py-2">
                                        GIFTS
                                    </Link>
                                    <Link href="/leather" className="block font-medium text-gray-700 hover:text-orange-500 px-4 py-2">
                                        LEATHER
                                    </Link>
                                    <Link href="/sale" className="block font-medium text-orange-500 hover:text-orange-600 px-4 py-2">
                                        SALE
                                    </Link>

                                    <div className="border-t pt-4 px-4">
                                        <div className="flex items-center space-x-4">
                                            <Button variant="ghost" size="icon" className="hover:text-orange-500">
                                                <Search className="h-5 w-5" />
                                            </Button>
                                            <Button variant="ghost" size="icon" className="hover:text-orange-500">
                                                <Heart className="h-5 w-5" />
                                            </Button>
                                            <Button variant="ghost" className="hover:text-orange-500">
                                                <User className="h-5 w-5 mr-2" />
                                                Sign In
                                            </Button>
                                        </div>
                                    </div>
                                </nav>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>

            {/* Overlay to close dropdowns when clicking outside */}
            <AnimatePresence>
                {activeDropdown && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black bg-opacity-20 z-30"
                        onClick={closeAllDropdowns}
                    />
                )}
            </AnimatePresence>
        </>
    )
}
