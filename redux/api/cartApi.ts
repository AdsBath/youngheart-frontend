import { tagTypes } from "../tag-types";
import { baseApi } from "./baseApi";

const CART_URL = "/cart";

const cartApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    // Get cart list
    carts: build.query({
      query: (params) => ({
        url: `${CART_URL}`,
        method: "GET",
        params,
      }),
      providesTags: [tagTypes.carts],
    }),
    // Get cart by id
    cart: build.query({
      query: (id) => {
        return {
          url: `${CART_URL}/${id}`,
          method: "GET",
        };
      },
      providesTags: [tagTypes.carts],
    }),

    // Create cart
    createCart: build.mutation({
      query: (body) => ({
        url: `${CART_URL}/add`,
        method: "POST",
        data: body,
        credentials: "include",
        withCredentials: true,
        contentType: "application/json",
      }),
      invalidatesTags: [tagTypes.carts],
    }),

    // Update cart
    updateCart: build.mutation({
      query: (payload) => ({
        url: `${CART_URL}/${payload.id}`,
        method: "PATCH",
        data: payload.body,
      }),
      invalidatesTags: [tagTypes.carts],
    }),
    // Delete cart
    deleteCart: build.mutation({
      query: (id) => ({
        url: `${CART_URL}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.carts],
    }),
    // increment quantity of cart
    incrementQuantity: build.mutation({
      query: (payload) => ({
        url: `${CART_URL}/increment`,
        method: "post",
        data: payload,
      }),
      invalidatesTags: [tagTypes.carts],
    }),
    // decrement quantity of cart
    decrementQuantity: build.mutation({
      query: (payload) => ({
        url: `${CART_URL}/decrement`,
        method: "post",
        data: payload,
      }),
      invalidatesTags: [tagTypes.carts],
    }),

    deleteCartItem: build.mutation({
      query: (id) => ({
        url: `${CART_URL}/item/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.carts],
    }),
  }),
});

export const {
  useCartsQuery,
  useCartQuery,
  useCreateCartMutation,
  useUpdateCartMutation,
  useDeleteCartMutation,
  useIncrementQuantityMutation,
  useDecrementQuantityMutation,
  useDeleteCartItemMutation,
} = cartApi;
