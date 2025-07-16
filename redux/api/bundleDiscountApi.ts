import { tagTypes } from "../tag-types";
import { baseApi } from "./baseApi";

const BUNDLE_Discount_URL = "/bundle-discount";

const bundleDiscountApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    //BundleDiscount list
    bundleDiscounts: build.query({
      query: (params) => ({
        url: `${BUNDLE_Discount_URL}`,
        method: "GET",
        params,
      }),
      providesTags: [tagTypes.bundleDiscount],
    }),
    // BundleDiscount by id
    bundleDiscount: build.query({
      query: (id) => ({
        url: `${BUNDLE_Discount_URL}/${id}`,
        method: "GET",
      }),
      providesTags: [tagTypes.bundleDiscount],
    }),
    // BundleDiscount create
    createBundleDiscount: build.mutation({
      query: (body) => ({
        url: `${BUNDLE_Discount_URL}/add`,
        method: "POST",
        data: body,
      }),
      invalidatesTags: [tagTypes.bundleDiscount],
    }),
    //  BundleDiscount update
    updateBundleDiscount: build.mutation({
      query: (payload) => ({
        url: `${BUNDLE_Discount_URL}/${payload.id}`,
        method: "PATCH",
        data: payload.body,
      }),
      invalidatesTags: [tagTypes.bundleDiscount],
    }),
    // BundleDiscount delete
    deleteBundleDiscount: build.mutation({
      query: (id) => ({
        url: `${BUNDLE_Discount_URL}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.bundleDiscount],
    }),
    deleteMultipleBundleDiscount: build.mutation({
      query: (items) => ({
        url: `${BUNDLE_Discount_URL}/delete/delete-many`,
        data: items,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.bundleDiscount],
    }),
  }),
});

export const {
  useBundleDiscountsQuery,
  useBundleDiscountQuery,
  useCreateBundleDiscountMutation,
  useUpdateBundleDiscountMutation,
  useDeleteBundleDiscountMutation,
  useDeleteMultipleBundleDiscountMutation,
} = bundleDiscountApi;
