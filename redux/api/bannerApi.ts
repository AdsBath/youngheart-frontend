import { tagTypes } from "../tag-types";
import { baseApi } from "./baseApi";

const BANNER_URL = "/banner";

const bannerApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    // Get banner list
    banners: build.query({
      query: (params) => ({
        url: `${BANNER_URL}`,
        method: "GET",
        params,
      }),
      providesTags: [tagTypes.banner],
    }),

    // Get banner by id
    banner: build.query({
      query: (id) => ({
        url: `${BANNER_URL}/${id}`,
        method: "GET",
      }),
      providesTags: [tagTypes.banner],
    }),

    // Create banner
    createBanner: build.mutation({
      query: (body) => ({
        url: `${BANNER_URL}/add`,
        method: "POST",
        data: body,
        credentials: "include",
        withCredentials: true,
      }),
      invalidatesTags: [tagTypes.banner],
    }),

    // Update banner
    updateBanner: build.mutation({
      query: (payload) => ({
        url: `${BANNER_URL}/${payload.id}`,
        method: "PATCH",
        data: payload.body,
      }),
      invalidatesTags: [tagTypes.banner],
    }),

    // Delete banner
    deleteBanner: build.mutation({
      query: (id) => ({
        url: `${BANNER_URL}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.banner],
    }),
  }),
});

export const {
  useBannerQuery,
  useBannersQuery,
  useCreateBannerMutation,
  useUpdateBannerMutation,
  useDeleteBannerMutation,
} = bannerApi;
