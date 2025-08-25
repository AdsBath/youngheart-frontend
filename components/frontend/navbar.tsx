"use client";

import { useTopLevelsCategoriesQuery } from "@/redux/api/categoriesApi";
import { useUserBySessionIdQuery } from "@/redux/api/userApi";
import { onCartOpen } from "@/redux/features/cart/cartSlice";
import { useAppSelector } from "@/redux/hooks";
import { RootState } from "@/redux/store";
import Image from "next/image";
import Link from "next/link";
import { memo, useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { useDispatch } from "react-redux";
import { AnimatePresence, motion } from "framer-motion";
import {
  ChevronDown,
  Heart,
  MapPin,
  Menu,
  ShoppingBag,
  User,
  X,
} from "lucide-react";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { MegaMenu } from "./mega-drop";
import { useMyWishlistQuery } from "@/redux/api/wishlistApi";
import { useRouter } from "next/navigation";
import Search from "../search";
import { IconSearch } from "@tabler/icons-react";

interface Category {
  id: string;
  title: string;
  slug: string;
  showInFooter: boolean;
  children: Category[];
}

interface CategoriesData {
  data: Category[];
}

interface MobileDropdownProps {
  category: Category;
  isOpen: boolean;
  onToggle: () => void;
  onLinkClick?: () => void;
}

export function MobileDropdown({
  category,
  isOpen,
  onToggle,
  onLinkClick,
}: MobileDropdownProps) {
  return (
    <div className="border-b border-gray-100 bg-white">
      <motion.button
        onClick={onToggle}
        whileHover={{ backgroundColor: "rgb(255 247 237)" }}
        whileTap={{ scale: 0.98 }}
        className="flex items-center justify-between w-full px-6 py-4 text-left font-semibold text-gray-800 hover:text-orange-600 transition-all duration-200 relative"
      >
        <div className="flex items-center space-x-3">
          <div
            className={`w-1 h-6 rounded-full transition-all duration-200 ${
              isOpen ? "bg-orange-500" : "bg-gray-300"
            }`}
          ></div>
          <span className="text-base">{category.title}</span>
        </div>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className={`transition-colors duration-200 ${
            isOpen ? "text-orange-500" : "text-gray-400"
          }`}
        >
          <ChevronDown className="h-5 w-5" />
        </motion.div>
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="overflow-hidden bg-gradient-to-b from-orange-25 to-gray-50"
          >
            <div className="px-6 py-4">
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.1 }}
                className="mb-4 pb-3 border-b border-orange-200"
              >
                <h4 className="font-bold text-orange-600 text-sm uppercase tracking-wider flex items-center">
                  <div className="w-2 h-2 bg-orange-500 rounded-full mr-2"></div>
                  {category?.title} Collection
                </h4>
                <p className="text-xs text-gray-500 mt-1">
                  Explore our {category?.title.toLowerCase()} products
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: 0.2 }}
                className="space-y-1"
              >
                {category?.children?.map((item, index) => (
                  <motion.div
                    key={item.title}
                    initial={{ opacity: 0, x: -15, scale: 0.95 }}
                    animate={{ opacity: 1, x: 0, scale: 1 }}
                    transition={{
                      duration: 0.3,
                      delay: index * 0.05,
                      ease: "easeOut",
                    }}
                    whileHover={{ x: 4 }}
                    className="relative"
                  >
                    <Link
                      href={`/all-product/${item?.slug}`}
                      className="group flex items-center space-x-3 text-gray-700 hover:text-orange-600 transition-all duration-200 py-3 px-4 rounded-lg hover:bg-white hover:shadow-sm border border-transparent hover:border-orange-100"
                      onClick={() => {
                        onToggle();
                        onLinkClick?.();
                      }}
                    >
                      <div className="w-2 h-2 rounded-full bg-gray-300 group-hover:bg-orange-400 transition-colors duration-200 flex-shrink-0"></div>
                      <span className="text-sm font-medium flex-1 group-hover:translate-x-1 transition-transform duration-200">
                        {item.title}
                      </span>
                      <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                        <svg
                          className="w-4 h-4 text-orange-500"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 5l7 7-7 7"
                          />
                        </svg>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.4 }}
                className="mt-6 pt-4 border-t border-gray-200"
              >
                <Link
                  href={`/all-product/${category.slug}`}
                  className="flex items-center justify-center space-x-2 w-full py-3 px-4 bg-orange-500 hover:bg-orange-600 text-white rounded-lg font-medium text-sm transition-all duration-200 hover:shadow-lg transform hover:scale-[1.02]"
                  onClick={() => {
                    onToggle();
                    onLinkClick?.();
                  }}
                >
                  <span>View All {category.title}</span>
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 7l5 5m0 0l-5 5m5-5H6"
                    />
                  </svg>
                </Link>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

const Navbar: React.FC = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [cookie] = useCookies(["sessionId"]);
  const sessionId = cookie?.sessionId || "";
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoadingLocal, setIsLoadingLocal] = useState(true);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  const { items: cartItems } =
    useAppSelector((state: RootState) => state.cart) || [];

  const { data: sessionData } = useUserBySessionIdQuery(
    { id: sessionId },
    { skip: !sessionId }
  );
  const userId = sessionData?.data?.id;

  const { data: wishlistData, isLoading: wishlistLoading } =
    useMyWishlistQuery(userId);
  const wishlistProducts = wishlistData?.data?.data;

  const toggleDropdown = (dropdown: string) => {
    setActiveDropdown(activeDropdown === dropdown ? null : dropdown);
  };

  const { data: categoriesData } = useTopLevelsCategoriesQuery({});

  useEffect(() => {
    const cachedCategories = localStorage.getItem("categories");
    if (cachedCategories) {
      setCategories(JSON.parse(cachedCategories));
      setIsLoadingLocal(false);
    }

    if (categoriesData) {
      const freshCategories =
        (categoriesData?.data as CategoriesData)?.data || [];
      setCategories(freshCategories);
      localStorage.setItem("categories", JSON.stringify(freshCategories));
    }
  }, [categoriesData]);

  return (
    <>
      <motion.div
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="bg-black text-white text-xs"
      >
        <div className="px-4 sm:px-6 md:px-16 py-2 flex justify-between items-center">
          <div className=" hidden md:flex items-center space-x-2 hover:text-orange-300 transition-colors cursor-pointer">
            <MapPin className="h-3 w-3" />
            <span>Find a Store</span>
          </div>
          <span className="font-semibold uppercase">
            Free Shipping on Orders Over ৳ 5000
          </span>
          <div className="flex items-center space-x-2">
            <span>BANGLADESH</span>
            <div className="w-4 h-3 bg-green-600 relative rounded-sm overflow-hidden">
              <div className="absolute inset-0 bg-red-600 rounded-full w-3 h-3 left-0.5 top-0"></div>
            </div>
          </div>
        </div>
      </motion.div>

      <div className="sticky top-0 z-40 bg-white border-b shadow-sm backdrop-blur-sm bg-white/95">
        <div className="px-4 sm:px-6 md:px-16">
          <div className="flex items-center justify-between py-1 md:py-2">
            <motion.div
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="xl:hidden md:w-32 items-center justify-center flex"
            >
              <Button
                variant="ghost"
                size="icon"
                className="hover:text-orange-500 hover:bg-orange-50 transition-colors"
                onClick={(e) => {
                  e.stopPropagation();
                  setIsMobileMenuOpen(!isMobileMenuOpen);
                }}
              >
                <AnimatePresence mode="wait">
                  {isMobileMenuOpen ? (
                    <motion.div
                      key="close"
                      initial={{ rotate: -90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: 90, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <X className="h-6 w-6" />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="menu"
                      initial={{ rotate: 90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: -90, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Menu className="h-6 w-6" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </Button>
            </motion.div>

            <Link href="/">
              <Image
                src="/youngheart.png"
                alt="YoungHeart Logo"
                width={128}
                height={64}
                className=" h-14 md:h-16 w-auto object-contain"
                priority
              />
              <div className="text-2xl font-bold text-orange-500 sr-only">
                YoungHeart
              </div>
            </Link>

            <nav className="hidden xl:flex items-center space-x-2">
              {categories?.map((category) => (
                <div key={category.id} className="relative group">
                  {category.children && category.children.length > 0 ? (
                    <MegaMenu category={category} />
                  ) : (
                    <Link
                      href={`/all-product/${category.slug}`}
                      className="text-gray-700 hover:text-orange-500 transition-colors font-medium py-2 px-3 rounded-md hover:bg-orange-50"
                    >
                      {category.title}
                    </Link>
                  )}
                </div>
              ))}
            </nav>

            <div className="flex items-center space-x-1">
              <motion.div
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  variant="ghost"
                  size="icon"
                  className="hidden md:flex hover:text-orange-500 hover:bg-orange-50 transition-colors"
                  onClick={() => setIsSearchOpen(!isSearchOpen)}
                >
                  <IconSearch className="h-5 w-5" />
                </Button>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => {
                    router.push("/my-account/my-wishlist");
                  }}
                  className="hidden md:flex hover:text-orange-500 hover:bg-orange-50 transition-colors relative"
                >
                  <Heart className="h-5 w-5" />
                  {wishlistProducts?.length > 0 && (
                    <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs bg-orange-500">
                      {wishlistProducts?.length}
                    </Badge>
                  )}
                </Button>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  onClick={() => dispatch(onCartOpen())}
                  variant="ghost"
                  size="icon"
                  className="hover:text-orange-500 hover:bg-orange-50 transition-colors relative"
                >
                  <ShoppingBag className="h-5 w-5" />
                  {cartItems?.length > 0 && (
                    <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs bg-orange-500">
                      {cartItems?.length}
                    </Badge>
                  )}
                </Button>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {userId ? (
                  <Link
                    href={`/my-account?userId=${userId}`}
                    className="hidden md:flex"
                  >
                    <Button
                      variant="ghost"
                      size="icon"
                      className="hover:text-orange-500 hover:bg-orange-50"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <User className="h-5 w-5" />
                      <span className="text-sm sr-only">Profile</span>
                    </Button>
                  </Link>
                ) : (
                  <Link href="/my-account" className="hidden md:flex">
                    <Button
                      variant="ghost"
                      className="hover:text-orange-500 hover:bg-orange-50"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <User className="h-5 w-5 mr-2" />
                      Sign In
                    </Button>
                  </Link>
                )}
              </motion.div>
            </div>
          </div>

          <AnimatePresence>
            {isSearchOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.07, ease: "easeInOut" }}
                className="border-t px-4 py-4 container mx-auto relative flex items-center justify-center"
              >
                <X
                  className="absolute right-3 top-1 text-gray-400 cursor-pointer"
                  onClick={() => setIsSearchOpen(false)}
                />
                <div className="relative w-96">
                  {/* TODO: Search functionality */}
                  {/* <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search products..."
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    autoFocus
                  /> */}
                  <Search />
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <AnimatePresence>
            {isMobileMenuOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="xl:hidden border-t bg-white overflow-hidden"
                onClick={(e) => e.stopPropagation()}
              >
                <nav className="py-2">
                  {categories?.map((category) => {
                    if (category?.children && category?.children?.length > 0) {
                      return (
                        <MobileDropdown
                          key={category.id}
                          category={category}
                          isOpen={activeDropdown === `${category.id}-mobile`}
                          onToggle={() =>
                            toggleDropdown(`${category.id}-mobile`)
                          }
                          onLinkClick={() => {
                            setIsMobileMenuOpen(false);
                            setActiveDropdown(null);
                          }}
                        />
                      );
                    } else {
                      return (
                        <Link
                          key={category.id}
                          href={`/all-product/${category.slug}`}
                          className="block px-4 py-2 text-gray-700 hover:text-orange-500 hover:bg-orange-50 transition-colors"
                          onClick={() => {
                            setIsMobileMenuOpen(false);
                            setActiveDropdown(null);
                          }}
                        >
                          {category.title}
                        </Link>
                      );
                    }
                  })}

                  <div className="border-t pt-4 px-4 mt-4">
                    <div className="flex items-center justify-center">
                      {userId ? (
                        <Link href={`/my-account?userId=${userId}`}>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="hover:text-orange-500 hover:bg-orange-50"
                            onClick={() => setIsMobileMenuOpen(false)}
                          >
                            <User className="h-5 w-5 mr-2" />
                          </Button>
                        </Link>
                      ) : (
                        <Link href="/my-account">
                          <Button
                            variant="ghost"
                            className="hover:text-orange-500 hover:bg-orange-50"
                            onClick={() => setIsMobileMenuOpen(false)}
                          >
                            <User className="h-5 w-5 mr-2" />
                            Sign In
                          </Button>
                        </Link>
                      )}
                    </div>
                  </div>
                </nav>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </>
  );
};

export default memo(Navbar);
