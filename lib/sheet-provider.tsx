"use client";

import EditAdminSheet from "@/features/admin/edit-admin-sheet";
import NewAdminSheet from "@/features/admin/new-admin-sheet";
import EditBannerSheet from "@/features/banner/edit-banner-sheet";
import NewBannerSheet from "@/features/banner/new-banner-sheet";
import EditBannerAdSheet from "@/features/bannerAd/edit-banner-ad-sheet";
import NewBannerAdSheet from "@/features/bannerAd/new-banner-ad-sheet";
import EditBlogDialog from "@/features/blog/edit-blog-dialog";
import NewBlogDialog from "@/features/blog/new-blog-dialog";
import EditBrandsSheet from "@/features/brand/edit-tax-rule-sheet";
import NewBrandSheet from "@/features/brand/new-brand-sheet";
import EditBundleDealsSheet from "@/features/bundle-deal/edit-tax-rule-sheet";
import NewBundleDealSheet from "@/features/bundle-deal/new-bundle-deal-sheet";
import EditCareerDialog from "@/features/career/edit-career-dialog";
import NewCareerDialog from "@/features/career/new-career-dialog";
import EditCategorySheet from "@/features/category/edit-category-sheet";
import NewCategorySheet from "@/features/category/new-category-sheet";
import EditCollectionsSheet from "@/features/collections/edit-collections-sheet";
import NewCollectionsSheet from "@/features/collections/new-collections-sheet";
import EditCouponsSheet from "@/features/coupon/edit-coupon-dialog";
import NewCouponSheet from "@/features/coupon/new-coupon-dialog";
import EditDiscountBannerSheet from "@/features/discount-banner/edit-discount-banner-sheet";
import NewDiscountBannerSheet from "@/features/discount-banner/new-discount-banner-sheet";
import EditFeatureSheet from "@/features/feature/edit-feature-sheet";
import NewFeatureSheet from "@/features/feature/new-feature-sheet";
import EditInventoryDialog from "@/features/inventory/edit-inventory-dialog";
import NewInventoryDialog from "@/features/inventory/new-inventory-dialog";
import EditOrderDialog from "@/features/order/edit-order-dialog";
import EditPageLinkDialog from "@/features/page-link/edit-page-link-dialog";
import NewPageLinkDialog from "@/features/page-link/new-page-link-dialog";
import EditShippingRulesSheet from "@/features/shipping-rules/edit-shipping-rules-dialog";
import NewShippingRulesSheet from "@/features/shipping-rules/new-shipping-rules-dialog";
import EditVariantsDialog from "@/features/variants/edit-variants-dialog";
import EditVariantsItemDialog from "@/features/variants/edit-variants-item-dialog";
import NewVariantsDialog from "@/features/variants/new-variants-dialog";
import NewVariantsItemDialog from "@/features/variants/new-variants-item-dialog";

export const SheetProvider = () => {
  return (
    <>
      <EditCategorySheet />
      <NewCategorySheet />
      <NewAdminSheet />
      <EditAdminSheet />
      <EditVariantsDialog />
      <NewVariantsDialog />
      <NewVariantsItemDialog />
      <EditVariantsItemDialog />
      <NewBundleDealSheet />
      <NewBrandSheet />
      <EditBrandsSheet />
      <EditBundleDealsSheet />
      <EditCollectionsSheet />
      <NewCollectionsSheet />
      <NewInventoryDialog />
      <EditInventoryDialog />
      <NewBannerSheet />
      <EditBannerSheet />
      <NewCouponSheet />
      <EditCouponsSheet />
      <NewShippingRulesSheet />
      <EditShippingRulesSheet />
      <EditOrderDialog />
      <NewBannerAdSheet />
      <EditBannerAdSheet />
      <NewPageLinkDialog />
      <EditPageLinkDialog />
      <NewCareerDialog />
      <EditCareerDialog />
      <NewBlogDialog />
      <EditBlogDialog />
      <NewDiscountBannerSheet />
      <EditDiscountBannerSheet />
      <NewFeatureSheet />
      <EditFeatureSheet />
    </>
  );
};
