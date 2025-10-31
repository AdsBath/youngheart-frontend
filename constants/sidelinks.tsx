/* eslint-disable react-hooks/rules-of-hooks */
import { useVariantsQuery } from "@/redux/api/attributeApi";
import { useBrandsQuery } from "@/redux/api/brandApi";
import { useBundleDiscountsQuery } from "@/redux/api/bundleDiscountApi";
import { useCategoriesQuery } from "@/redux/api/categoriesApi";
import { useCouponsQuery } from "@/redux/api/couponApi";
import { useOrdersQuery } from "@/redux/api/orderApi";
import { useProductsQuery } from "@/redux/api/productApi";
import { useProductCollectionsQuery } from "@/redux/api/productCollectionApi";
import {
  IconAd,
  IconBoxMargin,
  IconBoxModel2,
  IconBrandBlogger,
  IconCaretLeftRight,
  IconCategory,
  IconClipboardData,
  IconKeyframesFilled,
  IconLayoutDashboard,
  IconLayoutNavbar,
  IconPackage,
  IconPackageImport,
  IconPageBreak,
  IconPaperclip,
  IconSettings,
  IconShieldCancel,
  IconShoppingBagCheck,
  IconShoppingBagX,
  IconStackMiddle,
  IconTagStarred,
  IconTicket,
  IconTruckDelivery,
  IconUserCog,
  IconUserShield,
  IconUsersGroup,
} from "@tabler/icons-react";
import { StoreIcon } from "lucide-react";
import { MdBrandingWatermark, MdOutlineFeaturedPlayList } from "react-icons/md";

export interface NavLink {
  title: string;
  label?: string;
  href: string;
  icon: JSX.Element;
}

export interface SideLink extends NavLink {
  sub?: NavLink[];
}

export const sideLinks = (role: string) => {
  const { data: categories, isLoading: isCategoryLoading } = useCategoriesQuery(
    {}
  );
  const { data: collections, isLoading: isCollectionLoading } =
    useProductCollectionsQuery({});
  const { data: variants, isLoading: isVariantsLoading } = useVariantsQuery({});
  const { data: bundleDeal, isLoading: isBundleDealLoading } =
    useBundleDiscountsQuery({});
  const { data: products, isLoading: isProductLoading } = useProductsQuery({});
  const { data: orders, isLoading: isOrderLoading } = useOrdersQuery({});
  const { data: coupon, isLoading: isCouponLoading } = useCouponsQuery({});
  const { data: brand, isLoading: isBrandLoading } = useBrandsQuery({});

  let totalCategory = categories?.data.total.toString() || "0";
  let totalCollection = collections?.data?.total.toString() || "0";
  let totalVarient = variants?.data?.total.toString() || "0";
  let totalBundleDeal = bundleDeal?.data?.total.toString() || "0";
  let totalProducts = products?.data?.total.toString() || "0";
  let totalOrders = orders?.data?.total.toString() || "0";
  let totalCoupons = coupon?.data?.total.toString() || "0";
  let totalBrands = brand?.data?.total.toString() || "0";

  // const defaultSideLinks: SideLink[] = [];

  const adminSideLinks: SideLink[] = [
    {
      title: "Dashboard",
      label: "",
      href: "/dashboard",
      icon: <IconLayoutDashboard size={18} />,
    },
    {
      title: "Manage Products",
      label: `products ${totalProducts}`,
      href: "",
      icon: <IconPackage size={18} />,
      sub: [
        {
          title: "Category",
          label: "total " + totalCategory,
          href: "/dashboard/category",
          icon: <IconCategory size={18} />,
        },
        {
          title: "Variants",
          label: "total " + totalVarient,
          href: "/dashboard/variants",
          icon: <IconBoxMargin size={18} />,
        },
        {
          title: "Collections",
          label: "total " + totalCollection,
          href: "/dashboard/collections",
          icon: <IconStackMiddle size={18} />,
        },
        {
          title: "Brands",
          label: "total " + totalCollection,
          href: "/dashboard/brands",
          icon: <MdBrandingWatermark size={18} />,
        },
        {
          title: "Bundle deals",
          label: "total " + totalBundleDeal,
          href: "/dashboard/bundle-deals",
          icon: <IconTagStarred size={18} />,
        },
        {
          title: "Coupons",
          label: "total " + totalCoupons,
          href: "/dashboard/coupon",
          icon: <IconTicket size={18} />,
        },
        {
          title: "Shipping Rules",
          label: "total " + totalBundleDeal,
          href: "/dashboard/shipping-rules",
          icon: <IconTruckDelivery size={18} />,
        },
        {
          title: "Features",
          label: "total " + totalProducts,
          href: "/dashboard/feature",
          icon: <MdOutlineFeaturedPlayList size={18} />,
        },
        {
          title: "Products",
          label: "total " + totalProducts,
          href: "/dashboard/products",
          icon: <IconPackageImport size={18} />,
        },
      ],
    },
    {
      title: "Order",
      label: "total " + totalOrders,
      href: "/dashboard/order",
      icon: <IconShoppingBagCheck size={18} />,
    },
    {
      title: "Customer",
      label: "",
      href: "/dashboard/rating-reviews",
      icon: <IconUsersGroup size={18} />,
      sub: [
        {
          title: "Registered",
          label: "",
          href: "/dashboard/registered-customer",
          icon: <IconUserShield size={18} />,
        },
        {
          title: "Guest",
          label: "",
          href: "/dashboard/guest-customer",
          icon: <IconShieldCancel size={18} />,
        },
      ],
    },
    // {
    //   title: "Admins",
    //   label: "6",
    //   href: "/dashboard/admins",
    //   icon: <IconUserCog size={18} />,
    // },
    {
      title: "Abandoned Cart",
      label: "",
      href: "/dashboard/abandoned-cart",
      icon: <IconShoppingBagX size={18} />,
    },
    // {
    //   title: "Roles & Permissions",
    //   label: "",
    //   href: "/dashboard/roles-permissions",
    //   icon: <IconShieldLock size={18} />,
    // },
    {
      title: "Inventory",
      label: "",
      href: "/dashboard/inventory",
      icon: <IconClipboardData size={18} />,
    },
    {
      title: "Store UI",
      label: "front end",
      href: "/dashboard/store-ui",
      icon: <StoreIcon size={17} />,
      sub: [
        {
          title: "Page",
          label: "",
          href: "/dashboard/page-link",
          icon: <IconPageBreak size={18} />,
        },
        {
          title: "Career",
          label: "",
          href: "/dashboard/career",
          icon: <IconCaretLeftRight size={18} />,
        },
        {
          title: "Banner Ad",
          label: "",
          href: "/dashboard/banner-ad",
          icon: <IconAd size={18} />,
        },
        {
          title: "Banner",
          label: "",
          href: "/dashboard/banner",
          icon: <IconLayoutNavbar size={18} />,
        },
        {
          title: "Discount Banner",
          label: "",
          href: "/dashboard/discount-banner",
          icon: <IconBoxModel2 size={18} />,
        },
        {
          title: "Blog",
          label: "",
          href: "/dashboard/blog",
          icon: <IconBrandBlogger size={18} />,
        },
        {
          title: "Application",
          label: "",
          href: "/dashboard/applicant",
          icon: <IconSettings size={18} />,
        },
      ],
    },
    {
      title: "Customize Request",
      label: "",
      href: "/dashboard/custom-design",
      icon: <IconKeyframesFilled size={18} />,
    },
    {
      title: "Settings",
      label: "",
      href: "/dashboard/settings/appearance",
      icon: <IconSettings size={18} />,
    },
  ];

  const superAdminSideLinks: SideLink[] = [
    {
      title: "Dashboard",
      label: "",
      href: "/dashboard",
      icon: <IconLayoutDashboard size={18} />,
    },
    {
      title: "Manage Products",
      label: `products ${totalProducts}`,
      href: "",
      icon: <IconPackage size={18} />,
      sub: [
        {
          title: "Category",
          label: "total " + totalCategory,
          href: "/dashboard/category",
          icon: <IconCategory size={18} />,
        },

        {
          title: "Variants",
          label: "total " + totalVarient,
          href: "/dashboard/variants",
          icon: <IconBoxMargin size={18} />,
        },
        {
          title: "Collections",
          label: "total " + totalCollection,
          href: "/dashboard/collections",
          icon: <IconStackMiddle size={18} />,
        },
        {
          title: "Brands",
          label: "total " + totalBrands,
          href: "/dashboard/brands",
          icon: <MdBrandingWatermark size={18} />,
        },
        {
          title: "Bundle deals",
          label: "total " + totalBundleDeal,
          href: "/dashboard/bundle-deals",
          icon: <IconTagStarred size={18} />,
        },
        {
          title: "Coupons",
          label: "total " + totalCoupons,
          href: "/dashboard/coupon",
          icon: <IconTicket size={18} />,
        },
        {
          title: "Shipping Rules",
          label: "total " + totalBundleDeal,
          href: "/dashboard/shipping-rules",
          icon: <IconTruckDelivery size={18} />,
        },
        {
          title: "Features",
          label: "total " + totalProducts,
          href: "/dashboard/feature",
          icon: <MdOutlineFeaturedPlayList size={18} />,
        },
        {
          title: "Products",
          label: "total " + totalProducts,
          href: "/dashboard/products",
          icon: <IconPackageImport size={18} />,
        },
      ],
    },
    {
      title: "Order",
      label: "total " + totalOrders,
      href: "/dashboard/order",
      icon: <IconShoppingBagCheck size={18} />,
    },
    {
      title: "Customer",
      label: "",
      href: "/dashboard/rating-reviews",
      icon: <IconUsersGroup size={18} />,
      sub: [
        {
          title: "Registered",
          label: "",
          href: "/dashboard/registered-customer",
          icon: <IconUserShield size={18} />,
        },
        {
          title: "Guest",
          label: "",
          href: "/dashboard/guest-customer",
          icon: <IconShieldCancel size={18} />,
        },
      ],
    },
    {
      title: "Admins",
      label: "",
      href: "/dashboard/admins",
      icon: <IconUserCog size={18} />,
    },
    {
      title: "Abandoned Cart",
      label: "",
      href: "/dashboard/abandoned-cart",
      icon: <IconShoppingBagX size={18} />,
    },
    // {
    //   title: "Roles & Permissions",
    //   label: "",
    //   href: "/dashboard/roles-permissions",
    //   icon: <IconShieldLock size={18} />,
    // },
    {
      title: "Inventory",
      label: "",
      href: "/dashboard/inventory",
      icon: <IconClipboardData size={18} />,
    },
    {
      title: "Store UI",
      label: "front end",
      href: "/dashboard/store-ui",
      icon: <StoreIcon size={17} />,
      sub: [
        {
          title: "Page",
          label: "",
          href: "/dashboard/page-link",
          icon: <IconPageBreak size={18} />,
        },
        {
          title: "Career",
          label: "",
          href: "/dashboard/career",
          icon: <IconCaretLeftRight size={18} />,
        },
        {
          title: "Banner Ad",
          label: "",
          href: "/dashboard/banner-ad",
          icon: <IconAd size={18} />,
        },
        {
          title: "Banner",
          label: "",
          href: "/dashboard/banner",
          icon: <IconLayoutNavbar size={18} />,
        },
        {
          title: "Blog",
          label: "",
          href: "/dashboard/blog",
          icon: <IconBrandBlogger size={18} />,
        },
        {
          title: "Discount Banner",
          label: "",
          href: "/dashboard/discount-banner",
          icon: <IconBoxModel2 size={18} />,
        },
        {
          title: "Application",
          label: "",
          href: "/dashboard/applicant",
          icon: <IconPaperclip size={18} />,
        },
      ],
    },
    {
      title: "Customize Request",
      label: "",
      href: "/dashboard/custom-design",
      icon: <IconKeyframesFilled size={18} />,
    },
    {
      title: "Settings",
      label: "",
      href: "/dashboard/settings/appearance",
      icon: <IconSettings size={18} />,
    },
  ];

  const managerSideLinks: SideLink[] = [
    {
      title: "Dashboard",
      label: "",
      href: "/dashboard",
      icon: <IconLayoutDashboard size={18} />,
    },
    {
      title: "Manage Products",
      label: `products ${totalProducts}`,
      href: "",
      icon: <IconPackage size={18} />,
      sub: [
        {
          title: "Category",
          label: "total " + totalCategory,
          href: "/dashboard/category",
          icon: <IconCategory size={18} />,
        },

        {
          title: "Variants",
          label: "total " + totalVarient,
          href: "/dashboard/variants",
          icon: <IconBoxMargin size={18} />,
        },
        {
          title: "Collections",
          label: "total " + totalCollection,
          href: "/dashboard/collections",
          icon: <IconStackMiddle size={18} />,
        },
        {
          title: "Bundle deals",
          label: "total " + totalBundleDeal,
          href: "/dashboard/bundle-deals",
          icon: <IconTagStarred size={18} />,
        },
        {
          title: "Coupons",
          label: "total " + totalCoupons,
          href: "/dashboard/coupon",
          icon: <IconTicket size={18} />,
        },
        {
          title: "Shipping Rules",
          label: "total " + totalBundleDeal,
          href: "/dashboard/shipping-rules",
          icon: <IconTruckDelivery size={18} />,
        },
        {
          title: "Products",
          label: "total " + totalProducts,
          href: "/dashboard/products",
          icon: <IconPackageImport size={18} />,
        },
      ],
    },
    {
      title: "Order",
      label: "total " + totalOrders,
      href: "/dashboard/order",
      icon: <IconShoppingBagCheck size={18} />,
    },
    {
      title: "Customer",
      label: "",
      href: "/dashboard/rating-reviews",
      icon: <IconUsersGroup size={18} />,
      sub: [
        {
          title: "Registered",
          label: "",
          href: "/dashboard/registered-customer",
          icon: <IconUserShield size={18} />,
        },
        {
          title: "Guest",
          label: "",
          href: "/dashboard/guest-customer",
          icon: <IconShieldCancel size={18} />,
        },
      ],
    },
    // {
    //   title: "Admins",
    //   label: "6",
    //   href: "/dashboard/admins",
    //   icon: <IconUserCog size={18} />,
    // },
    {
      title: "Abandoned Cart",
      label: "",
      href: "/dashboard/abandoned-cart",
      icon: <IconShoppingBagX size={18} />,
    },
    // {
    //   title: "Roles & Permissions",
    //   label: "",
    //   href: "/dashboard/roles-permissions",
    //   icon: <IconShieldLock size={18} />,
    // },
    {
      title: "Inventory",
      label: "",
      href: "/dashboard/inventory",
      icon: <IconClipboardData size={18} />,
    },
    {
      title: "Store UI",
      label: "front end",
      href: "/dashboard/store-ui",
      icon: <StoreIcon size={17} />,
      sub: [
        // {
        //   title: "Page",
        //   label: "",
        //   href: "/dashboard/page-link",
        //   icon: <IconPageBreak size={18} />,
        // },
        {
          title: "Career",
          label: "",
          href: "/dashboard/career",
          icon: <IconCaretLeftRight size={18} />,
        },
        // {
        //   title: "Banner Ad",
        //   label: "",
        //   href: "/dashboard/banner-ad",
        //   icon: <IconAd size={18} />,
        // },
        // {
        //   title: "Banner",
        //   label: "",
        //   href: "/dashboard/banner",
        //   icon: <IconLayoutNavbar size={18} />,
        // },
        {
          title: "Blog",
          label: "",
          href: "/dashboard/blog",
          icon: <IconBrandBlogger size={18} />,
        },
        // {
        //   title: "Footer links",
        //   label: "",
        //   href: "/settings",
        //   icon: <IconSettings size={18} />,
        // },
      ],
    },
    {
      title: "Settings",
      label: "",
      href: "/dashboard/settings/appearance",
      icon: <IconSettings size={18} />,
    },
  ];

  const employSideLinks: SideLink[] = [
    {
      title: "Dashboard",
      label: "",
      href: "/dashboard",
      icon: <IconLayoutDashboard size={18} />,
    },
    {
      title: "Manage Products",
      label: `products ${totalProducts}`,
      href: "",
      icon: <IconPackage size={18} />,
      sub: [
        // {
        //   title: "Category",
        //   label: "total " + totalCategory,
        //   href: "/dashboard/category",
        //   icon: <IconCategory size={18} />,
        // },

        // {
        //   title: "Variants",
        //   label: "total " + totalVarient,
        //   href: "/dashboard/variants",
        //   icon: <IconBoxMargin size={18} />,
        // },
        // {
        //   title: "Collections",
        //   label: "total " + totalCollection,
        //   href: "/dashboard/collections",
        //   icon: <IconStackMiddle size={18} />,
        // },
        // {
        //   title: "Bundle deals",
        //   label: "total " + totalBundleDeal,
        //   href: "/dashboard/bundle-deals",
        //   icon: <IconTagStarred size={18} />,
        // },
        // {
        //   title: "Coupons",
        //   label: "total " + totalCoupons,
        //   href: "/dashboard/coupon",
        //   icon: <IconTicket size={18} />,
        // },
        // {
        //   title: "Shipping Rules",
        //   label: "total " + totalBundleDeal,
        //   href: "/dashboard/shipping-rules",
        //   icon: <IconTruckDelivery size={18} />,
        // },
        {
          title: "Products",
          label: "total " + totalProducts,
          href: "/dashboard/products",
          icon: <IconPackageImport size={18} />,
        },
      ],
    },
    {
      title: "Order",
      label: "total " + totalOrders,
      href: "/dashboard/order",
      icon: <IconShoppingBagCheck size={18} />,
    },
    // {
    //   title: "Customer",
    //   label: "6",
    //   href: "/dashboard/rating-reviews",
    //   icon: <IconUsersGroup size={18} />,
    //   sub: [
    //     {
    //       title: "Registered",
    //       label: "",
    //       href: "/dashboard/registered-customer",
    //       icon: <IconUserShield size={18} />,
    //     },
    //     {
    //       title: "Guest",
    //       label: "",
    //       href: "/dashboard/guest-customer",
    //       icon: <IconShieldCancel size={18} />,
    //     },
    //   ],
    // },
    {
      title: "Abandoned Cart",
      label: "",
      href: "/dashboard/abandoned-cart",
      icon: <IconShoppingBagX size={18} />,
    },
    // {
    //   title: "Roles & Permissions",
    //   label: "",
    //   href: "/dashboard/roles-permissions",
    //   icon: <IconShieldLock size={18} />,
    // },
    // {
    //   title: "Inventory",
    //   label: "",
    //   href: "/dashboard/inventory",
    //   icon: <IconClipboardData size={18} />,
    // },
    {
      title: "Settings",
      label: "",
      href: "/dashboard/settings/appearance",
      icon: <IconSettings size={18} />,
    },
  ];

  if (role === "ADMIN") {
    return adminSideLinks;
  } else if (role === "MANAGER") {
    return managerSideLinks;
  } else if (role === "SUPER_ADMIN") {
    return superAdminSideLinks;
  } else {
    return employSideLinks;
  }
};

// else if (role === USER_ROLE.ADMIN) return adminSidebarItems;
// else if (role === USER_ROLE.ACCOUNTS) return accountsSidebarItems;
// else if (role === USER_ROLE.VENDOR) return vendorSidebarItems;
