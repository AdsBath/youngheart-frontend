import { tagTypes } from "../tag-types";
import { baseApi } from "./baseApi";

const DISCOUNT_BANNER_URL = "/discount-banner";

const discountBannerApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    // Get discount banner list
    discountBanners: build.query({
      query: (params) => ({
        url: `${DISCOUNT_BANNER_URL}`,
        method: "GET",
        params,
      }),
      providesTags: [tagTypes.bannerAd],
    }),

    // Get discount banner list
    discountBannerForFrontend: build.query({
      query: (params) => ({
        url: `${DISCOUNT_BANNER_URL}/frontend`,
        method: "GET",
        params,
      }),
      providesTags: [tagTypes.bannerAd],
    }),

    // Get discount banner by id
    discountBanner: build.query({
      query: (id) => ({
        url: `${DISCOUNT_BANNER_URL}/${id}`,
        method: "GET",
      }),
      providesTags: [tagTypes.bannerAd],
    }),

    // Get discount banner
    getDiscountBanner: build.query({
      query: (id) => ({
        url: `${DISCOUNT_BANNER_URL}/frontend`,
        method: "GET",
      }),
      providesTags: [tagTypes.bannerAd],
    }),

    // Create discount banner
    createDiscountBanner: build.mutation({
      query: (body) => ({
        url: `${DISCOUNT_BANNER_URL}/add`,
        method: "POST",
        data: body,
        credentials: "include",
        withCredentials: true,
      }),
      invalidatesTags: [tagTypes.bannerAd],
    }),

    // Update discount banner
    updateDiscountBanner: build.mutation({
      query: (payload) => ({
        url: `${DISCOUNT_BANNER_URL}/${payload.id}`,
        method: "PATCH",
        data: payload.body,
      }),
      invalidatesTags: [tagTypes.bannerAd],
    }),

    // Delete discount banner
    deleteDiscountBanner: build.mutation({
      query: (id) => ({
        url: `${DISCOUNT_BANNER_URL}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.bannerAd],
    }),
  }),
});

export const {
  useCreateDiscountBannerMutation,
  useDeleteDiscountBannerMutation,
  useDiscountBannerForFrontendQuery,
  useDiscountBannerQuery,
  useDiscountBannersQuery,
  useUpdateDiscountBannerMutation,
  useGetDiscountBannerQuery,
} = discountBannerApi;
