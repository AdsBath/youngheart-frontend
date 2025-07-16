import { tagTypes } from "../tag-types";
import { baseApi } from "./baseApi";

const WISHLIST_URL = "/wishlist";

const wishlistApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    // Get my wishlist
    myWishlist: build.query({
      query: (userId) => ({
        url: `${WISHLIST_URL}/my-wishlist/${userId}`,
        method: "GET",
      }),
      providesTags: [tagTypes.wishlist],
    }),

    // Get wishlist by id
    wishlist: build.query({
      query: (id) => ({
        url: `${WISHLIST_URL}/${id}`,
        method: "GET",
      }),
      providesTags: [tagTypes.wishlist],
    }),

    // Create wishlist
    createWishlist: build.mutation({
      query: (body) => ({
        url: `${WISHLIST_URL}/add`,
        method: "POST",
        data: body,
      }),
      invalidatesTags: [tagTypes.wishlist],
    }),

    // Update wishlist
    updateWishlist: build.mutation({
      query: (payload) => ({
        url: `${WISHLIST_URL}/${payload.id}`,
        method: "PATCH",
        data: payload.body,
      }),
      invalidatesTags: [tagTypes.wishlist],
    }),

    // Delete wishlist
    deleteWishlist: build.mutation({
      query: (id) => ({
        url: `${WISHLIST_URL}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.wishlist],
    }),
  }),
});

export const {
  useCreateWishlistMutation,
  useDeleteWishlistMutation,
  useMyWishlistQuery,
  useUpdateWishlistMutation,
  useWishlistQuery,
} = wishlistApi;
