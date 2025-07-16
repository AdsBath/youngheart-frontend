import { baseApi } from "./api/baseApi";
import adminReducer from "./features/admin/adminSlice";
import bannerReducer from "./features/banner/bannerSlice";
import bannerAdReducer from "./features/bannerAd/bannerAdSlice";
import blogReducer from "./features/blog/blogSlice";
import brandReducer from "./features/brand/brandSlice";
import bundleDiscountReducer from "./features/bundleDiscount/bundleDiscountSlice";
import careerReducer from "./features/career/careerSlice";
import cartReducer from "./features/cart/cartSlice";
import categoryReducer from "./features/category/categorySlice";
import couponReducer from "./features/coupon/couponSlice";
import discountBannerReducer from "./features/discountBanner/discountBannerSlice";
import featureReducer from "./features/feature/featureSlice";
import inventoryReducer from "./features/inventory/inventorySlice";
import orderReducer from "./features/order/orderSlice";
import pageLinkReducer from "./features/pageLink/pageLinkSlice";
import productCollectionReducer from "./features/productCollection/productCollectionSlice";
import profileReducer from "./features/profile/profileSlice";
import shippingRulesReducer from "./features/shippingRules/shippingRulesSlice";
import variantReducer from "./features/variant/variantSlice";

export const reducer = {
  [baseApi.reducerPath]: baseApi.reducer,
  variant: variantReducer,
  inventory: inventoryReducer,
  user: profileReducer,
  category: categoryReducer,
  cart: cartReducer,
  admin: adminReducer,
  productCollection: productCollectionReducer,
  bundleDeal: bundleDiscountReducer,
  brand: brandReducer,
  banner: bannerReducer,
  coupon: couponReducer,
  shippingRules: shippingRulesReducer,
  order: orderReducer,
  bannerAd: bannerAdReducer,
  pageLink: pageLinkReducer,
  career: careerReducer,
  blog: blogReducer,
  discountBanner: discountBannerReducer,
  feature: featureReducer,
};
