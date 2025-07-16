"use client";

import { useFooterCategoriesQuery } from "@/redux/api/categoriesApi";
import { usePageLinksForFrontendQuery } from "@/redux/api/pageLinkApi";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
    MapPin,
    ShoppingCart,
    Package,
    Leaf,
    RotateCcw,
    Search,
    Building,
    Gift,
    Instagram,
    Facebook,
    ArrowRight,
} from "lucide-react"

const Footer = () => {
    const pathname = usePathname();
    const { data, isLoading: pageLoading } = usePageLinksForFrontendQuery({});
    const { data: footerCategory, isLoading: footerCategoryLoading } =
        useFooterCategoriesQuery({});
    const pageData = data?.data?.data;
    const footerCategories = footerCategory?.data;

    return (
        <footer >
            <div className="bg-gray-50 w-full">
                {/* Top Navigation Bar */}
                <div className="border-b border-gray-200">
                    <div className="container mx-auto px-4 py-6">
                        <div className="grid grid-cols-4 md:grid-cols-8 gap-4 text-center">
                            <div className="flex flex-col items-center space-y-2">
                                <MapPin className="h-6 w-6 text-gray-600" />
                                <span className="text-xs  text-gray-700">Store Locator</span>
                            </div>
                            <div className="flex flex-col items-center space-y-2">
                                <ShoppingCart className="h-6 w-6 text-gray-600" />
                                <span className="text-xs text-gray-700">Pick Up in Store</span>
                            </div>
                            <div className="flex flex-col items-center space-y-2">
                                <Package className="h-6 w-6 text-gray-600" />
                                <span className="text-xs text-gray-700">Delivery Options</span>
                            </div>
                            <div className="flex flex-col items-center space-y-2">
                                <Leaf className="h-6 w-6 text-gray-600" />
                                <span className="text-xs text-gray-700">Local Products</span>
                            </div>
                            <div className="flex flex-col items-center space-y-2">
                                <RotateCcw className="h-6 w-6 text-gray-600" />
                                <span className="text-xs text-gray-700">Returns</span>
                            </div>
                            <div className="flex flex-col items-center space-y-2">
                                <Search className="h-6 w-6 text-gray-600" />
                                <span className="text-xs text-gray-700">Track Orders</span>
                            </div>
                            <div className="flex flex-col items-center space-y-2">
                                <Building className="h-6 w-6 text-gray-600" />
                                <span className="text-xs text-gray-700">Careers</span>
                            </div>
                            <div className="flex flex-col items-center space-y-2">
                                <Gift className="h-6 w-6 text-gray-600" />
                                <span className="text-xs text-gray-700">Gift Cards</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Main Footer Content */}
                <div className="container mx-auto px-4 py-12">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8">
                        {/* Newsletter Signup */}
                        <div className="lg:col-span-2 space-y-4">
                            <h3 className="text-lg font-semibold text-gray-900 mb-4">UNLOCK EXCLUSIVE OFFERS</h3>
                            <p className="text-sm text-gray-600 mb-4">
                                Enter your email to get exclusive offers and updates from YoungHeart BD.
                                <br />
                                Stay connected with our latest products and special promotions.
                            </p>

                            <div className="space-y-4">
                                <p className="text-sm text-gray-700">What styles are you interested in?</p>
                                <div className="flex flex-wrap gap-4">
                                    <div className="flex items-center space-x-2">
                                        <Checkbox id="women" />
                                        <label htmlFor="women" className="text-sm text-gray-700">
                                            Women
                                        </label>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <Checkbox id="men" />
                                        <label htmlFor="men" className="text-sm text-gray-700">
                                            Men
                                        </label>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <Checkbox id="kids" />
                                        <label htmlFor="kids" className="text-sm text-gray-700">
                                            Kids
                                        </label>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <Checkbox id="leather" />
                                        <label htmlFor="leather" className="text-sm text-gray-700">
                                            Leather
                                        </label>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <Checkbox id="all" />
                                        <label htmlFor="all" className="text-sm text-gray-700">
                                            All
                                        </label>
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-3">
                                <Button className="w-full bg-black text-white hover:bg-gray-800 flex items-center justify-center space-x-2">
                                    <span>SIGN UP FOR EMAIL</span>
                                    <ArrowRight className="h-4 w-4" />
                                </Button>
                                <Button variant="outline" className="w-full flex items-center justify-center space-x-2 bg-transparent">
                                    <span>SIGN UP FOR TEXTS</span>
                                    <ArrowRight className="h-4 w-4" />
                                </Button>
                            </div>
                        </div>

                        {/* Orders */}
                        <div className="space-y-4">
                            <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4">ORDERS</h3>
                            <div className="space-y-3">
                                <Link href="#" className="block text-sm text-gray-700 hover:text-gray-900">
                                    Track Your Order
                                </Link>
                                <Link href="#" className="block text-sm text-gray-700 hover:text-gray-900">
                                    Returns and Exchanges
                                </Link>
                                <Link href="#" className="block text-sm text-gray-700 hover:text-gray-900">
                                    Shipping and Handling
                                </Link>
                                <Link href="#" className="block text-sm text-gray-700 hover:text-gray-900">
                                    International Orders
                                </Link>
                                <Link href="#" className="block text-sm text-gray-700 hover:text-gray-900">
                                    Roots at Your Service
                                </Link>
                            </div>
                        </div>

                        {/* About Roots */}
                        <div className="space-y-4">
                            <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4">ABOUT US</h3>
                            <div className="space-y-3">
                                <Link href="#" className="block text-sm text-gray-700 hover:text-gray-900">
                                    Our Story
                                </Link>
                                <Link href="#" className="block text-sm text-gray-700 hover:text-gray-900">
                                    Quality Promise
                                </Link>
                                <Link href="#" className="block text-sm text-gray-700 hover:text-gray-900">
                                    Our Mission
                                </Link>
                                <Link href="#" className="block text-sm text-gray-700 hover:text-gray-900">
                                    Sustainability
                                </Link>
                                <Link href="#" className="block text-sm text-gray-700 hover:text-gray-900">
                                    Local Impact
                                </Link>
                                <Link href="#" className="block text-sm text-gray-700 hover:text-gray-900">
                                    Our Team
                                </Link>
                            </div>
                        </div>

                        {/* We Can Help */}
                        <div className="space-y-4">
                            <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4">WE CAN HELP</h3>
                            <div className="space-y-3">
                                <Link href="#" className="block text-sm text-gray-700 hover:text-gray-900">
                                    Accessibility
                                </Link>
                                <Link href="#" className="block text-sm text-gray-700 hover:text-gray-900">
                                    Create an Account / Login
                                </Link>
                                <Link href="#" className="block text-sm text-gray-700 hover:text-gray-900">
                                    Gift Services
                                </Link>
                                <Link href="#" className="block text-sm text-gray-700 hover:text-gray-900">
                                    Help Centre
                                </Link>
                                <Link href="#" className="block text-sm text-gray-700 hover:text-gray-900">
                                    Leather Care
                                </Link>
                                <Link href="#" className="block text-sm text-gray-700 hover:text-gray-900">
                                    Sizing Chart
                                </Link>
                                <Link href="#" className="block text-sm text-gray-700 hover:text-gray-900">
                                    Generate Help Code
                                </Link>
                            </div>
                        </div>

                        {/* Contact Us & Community */}
                        <div className="space-y-8">
                            {/* Contact Us */}
                            <div className="space-y-4">
                                <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4">CONTACT US</h3>
                                <div className="space-y-3">
                                    <Link href="#" className="block text-sm text-gray-700 hover:text-gray-900">
                                        Careers
                                    </Link>
                                    <Link href="#" className="block text-sm text-gray-700 hover:text-gray-900">
                                        Connect with us
                                    </Link>
                                    <Link href="#" className="block text-sm text-gray-700 hover:text-gray-900">
                                        Give us feedback
                                    </Link>
                                    <Link href="#" className="block text-sm text-gray-700 hover:text-gray-900">
                                        International Opportunities
                                    </Link>
                                    <Link href="#" className="block text-sm text-gray-700 hover:text-gray-900">
                                        Investor Relations
                                    </Link>
                                    <Link href="#" className="block text-sm text-gray-700 hover:text-gray-900">
                                        Roots Business to Business
                                    </Link>
                                </div>
                            </div>

                            {/* Community */}
                            <div className="space-y-4">
                                <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4">COMMUNITY</h3>
                                <div className="space-y-3">
                                    <Link href="#" className="block text-sm text-gray-700 hover:text-gray-900">
                                        Brand Partners
                                    </Link>
                                    <Link href="#" className="block text-sm text-gray-700 hover:text-gray-900">
                                        Community Care
                                    </Link>
                                    <Link href="#" className="block text-sm text-gray-700 hover:text-gray-900">
                                        Customer Stories
                                    </Link>
                                    <Link href="#" className="block text-sm text-gray-700 hover:text-gray-900">
                                        Join Our Community
                                    </Link>
                                </div>

                                {/* Social Media Icons */}
                                <div className="flex space-x-4 pt-4">
                                    <Link href="#" className="text-gray-600 hover:text-gray-900">
                                        <Instagram className="h-5 w-5" />
                                    </Link>
                                    <Link href="#" className="text-gray-600 hover:text-gray-900">
                                        <Facebook className="h-5 w-5" />
                                    </Link>
                                    <Link href="#" className="text-gray-600 hover:text-gray-900">
                                        <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                                            <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.174-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.097.118.112.221.083.343-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.402.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.357-.629-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24.009 12.017 24.009c6.624 0 11.99-5.367 11.99-11.988C24.007 5.367 18.641.001.012.001z" />
                                        </svg>
                                    </Link>
                                    <Link href="#" className="text-gray-600 hover:text-gray-900">
                                        <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                                            <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z" />
                                        </svg>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bottom Footer */}
                <div className="border-t border-gray-200 py-6">
                    <div className="container mx-auto px-4">
                        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
                            <p className="text-xs text-gray-500">© YoungHeart BD 2020 - 2025 | Dhaka, Bangladesh</p>
                            <div className="flex space-x-6">
                                <Link href="#" className="text-xs text-gray-500 hover:text-gray-700">
                                    Privacy Policy
                                </Link>
                                <Link href="#" className="text-xs text-gray-500 hover:text-gray-700">
                                    Terms of Use
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;


{/* <footer className={"text-black px-5 pb-16 sm:pb-0 bg-[#00706a]"}>
    <div className="container divide-y mx-auto">

        <div className="md:flex pt-10 sm:pt-20 mb-4 ">

            <div className="w-full flex items-center justify-center md:items-start md:justify-start flex-col pb-8 sm:w-[28%]">
                <Link href={"/"}>
                    <Image
                        src="/white-logo.svg"
                        alt="babu-khusi-logo"
                        width={180}
                        height={70}
                        className="cursor-pointer object-contain"
                        priority
                    />
                </Link>
                <div className="flex items-center gap-4 mt-5">
                    <div className="grid grid-cols-4 gap-4">

                        <div className="flex justify-center items-center">
                            <a
                                href="https://www.facebook.com/babukushibd"
                                target="_blank"
                                className="transform transition-transform hover:scale-105"
                            >
                                <span className="sr-only">
                                    Facebook
                                </span>
                                <FaFacebook size={30} fill="white" />

                            </a>
                            <a
                                href="https://www.instagram.com/babukhusibd
"
                                target="_blank"
                                className="transform transition-transform hover:scale-105 ml-4"
                            >
                                <span className="sr-only">
                                    Facebook
                                </span>
                                <FaInstagram size={30} fill="white" />

                            </a>
                        </div>
                    </div>
                </div>
            </div>
          
            <div className="w-full sm:w-[22%] mb-3">
                <h3 className="font-bold mb-2 text-xl text-white">
                    About
                </h3>
                <div className="flex flex-col">
                    <Link href={"/career"}>
                        <span className="py-[1px] hover:underline text-[14px] text-white">
                            Career
                        </span>
                    </Link>
                    {pageLoading
                        ? [...Array(2)]?.map((_, index) => (
                            <div key={index}>
                                <Skeleton className="h-3 w-[50%] mt-1" />
                                <Skeleton className="h-2 w-[20%] mt-1" />
                            </div>
                        ))
                        : pageData?.map((page: any, index: number) => (
                            <Link
                                key={index}
                                href={`/page/${slugify(
                                    page?.title
                                )}?id=${page?.id}`}
                            >
                                <span className="py-[1px] hover:underline text-[14px] text-white">
                                    {page?.title}
                                </span>
                            </Link>
                        ))}
                </div>
            </div>
        
            <div className="w-full sm:w-[22%] text-base">
                <h3 className="font-bold mb-2 text-xl text-white">
                    Categories
                </h3>
                <div className="flex flex-col">
                    {footerCategoryLoading
                        ? [...Array(2)]?.map((_, index) => (
                            <div key={index}>
                                <Skeleton className="h-3 w-[50%] mt-1" />
                                <Skeleton className="h-2 w-[30%] mt-1" />
                            </div>
                        ))
                        : footerCategories?.map(
                            (category: any, index: number) => (
                                <Link
                                    key={index}
                                    href={`/all-product/${category?.slug}`}
                                >
                                    <span className="py-[1px] hover:underline text-[14px] transition-all duration-200 text-white">
                                        {category?.title}
                                    </span>
                                </Link>
                            )
                        )}
                </div>
            </div>
       
            <div className="w-full sm:w-[26%]">
                <p className="pb-3 text-white">
                    Get the latest updates on new products and upcoming
                    sales by our newsletter!
                </p>
                <div className="flex gap-2">
                    <Input placeholder="Enter your email" />
                    <Button className="text-white" variant={"success"}>
                        Subscribe
                    </Button>
                </div>
            </div>
        </div>

        <div className="flex justify-center py-4">
            <Image
                src="/SSLCOMMERZ-Pay-With-logo-All-Size_Aug-21-02-1024x120.png"
                alt="sslcommerz logo"
                className="h-20 w-full object-contain"
                width={1024}
                height={120}
            />
        </div>

        <div className="py-4 flex items-center justify-center text-center text-white">
            <p>&copy; 2024 Babu Khusi. All Rights Reserved.</p>
        </div>
    </div>
</footer> */}