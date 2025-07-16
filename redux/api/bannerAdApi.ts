import { tagTypes } from "../tag-types";
import { baseApi } from "./baseApi";

const BANNER_AD_URL = "/banner-ad";

const bannerAdApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    // Get banner ad list
    bannerAds: build.query({
      query: (params) => ({
        url: `${BANNER_AD_URL}`,
        method: "GET",
        params,
      }),
      providesTags: [tagTypes.bannerAd],
    }),

    // Get banner ad list
    bannerAdsForFrontend: build.query({
      query: (params) => ({
        url: `${BANNER_AD_URL}/frontend`,
        method: "GET",
        params,
      }),
      providesTags: [tagTypes.bannerAd],
    }),

    // Get banner ad by id
    bannerAd: build.query({
      query: (id) => ({
        url: `${BANNER_AD_URL}/${id}`,
        method: "GET",
      }),
      providesTags: [tagTypes.bannerAd],
    }),

    // Create banner ad
    createBannerAd: build.mutation({
      query: (body) => ({
        url: `${BANNER_AD_URL}/add`,
        method: "POST",
        data: body,
        credentials: "include",
        withCredentials: true,
      }),
      invalidatesTags: [tagTypes.bannerAd],
    }),

    // Update banner ad
    updateBannerAd: build.mutation({
      query: (payload) => ({
        url: `${BANNER_AD_URL}/${payload.id}`,
        method: "PATCH",
        data: payload.body,
      }),
      invalidatesTags: [tagTypes.bannerAd],
    }),

    // Delete banner ad
    deleteBannerAd: build.mutation({
      query: (id) => ({
        url: `${BANNER_AD_URL}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.bannerAd],
    }),
  }),
});

export const {
  useBannerAdQuery,
  useBannerAdsQuery,
  useCreateBannerAdMutation,
  useUpdateBannerAdMutation,
  useDeleteBannerAdMutation,
  useBannerAdsForFrontendQuery,
} = bannerAdApi;
