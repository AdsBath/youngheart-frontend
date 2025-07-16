import { tagTypes } from "../tag-types";
import { baseApi } from "./baseApi";

const ABANDONED_CART_URL = "/abandoned-cart";

const abandonedCartApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    // Get cart list
    abandonedCarts: build.query({
      query: (params) => ({
        url: `${ABANDONED_CART_URL}`,
        method: "GET",
        params,
      }),
      providesTags: [tagTypes.abandonedCart],
    }),

    // Get cart by id
    abandonedCart: build.query({
      query: (id) => ({
        url: `${ABANDONED_CART_URL}/${id}`,
        method: "GET",
      }),
      providesTags: [tagTypes.abandonedCart],
    }),

    // Create cart
    createAbandonedCart: build.mutation({
      query: (body) => ({
        url: `${ABANDONED_CART_URL}/add`,
        method: "POST",
        data: body,
        credentials: "include",
        withCredentials: true,
      }),
      invalidatesTags: [tagTypes.abandonedCart],
    }),

    // Update cart
    updateAbandonedCart: build.mutation({
      query: (payload) => ({
        url: `${ABANDONED_CART_URL}/${payload.id}`,
        method: "PATCH",
        data: payload.body,
      }),
      invalidatesTags: [tagTypes.abandonedCart],
    }),

    // Delete cart
    deleteAbandonedCart: build.mutation({
      query: (id) => ({
        url: `${ABANDONED_CART_URL}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.abandonedCart],
    }),

    // increment quantity of cart
    incrementAbandonedCartQuantity: build.mutation({
      query: (payload) => ({
        url: `${ABANDONED_CART_URL}/increment`,
        method: "post",
        data: payload,
      }),
      invalidatesTags: [tagTypes.abandonedCart],
    }),

    // decrement quantity of cart
    decrementAbandonedCartQuantity: build.mutation({
      query: (payload) => ({
        url: `${ABANDONED_CART_URL}/decrement`,
        method: "post",
        data: payload,
      }),
      invalidatesTags: [tagTypes.abandonedCart],
    }),

    deleteAbandonedCartItem: build.mutation({
      query: (id) => ({
        url: `${ABANDONED_CART_URL}/item/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.abandonedCart],
    }),
  }),
});

export const {
  useAbandonedCartQuery,
  useAbandonedCartsQuery,
  useCreateAbandonedCartMutation,
  useDecrementAbandonedCartQuantityMutation,
  useDeleteAbandonedCartItemMutation,
  useDeleteAbandonedCartMutation,
  useUpdateAbandonedCartMutation,
} = abandonedCartApi;
