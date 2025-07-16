import { tagTypes } from "../tag-types";
import { baseApi } from "./baseApi";

const ADDRESS_URL = "/address";

const addressApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    // Get cart list
    addresses: build.query({
      query: (params) => ({
        url: `${ADDRESS_URL}`,
        method: "GET",
        params,
      }),
      providesTags: [tagTypes.abandonedCart],
    }),

    // Get cart by id
    address: build.query({
      query: (id) => ({
        url: `${ADDRESS_URL}/${id}`,
        method: "GET",
      }),
      providesTags: [tagTypes.abandonedCart],
    }),

    // Create cart
    createAddress: build.mutation({
      query: (body) => ({
        url: `${ADDRESS_URL}/add`,
        method: "POST",
        data: body,
        credentials: "include",
        withCredentials: true,
      }),
      invalidatesTags: [tagTypes.abandonedCart],
    }),

    // Update cart
    updateAddress: build.mutation({
      query: (payload) => ({
        url: `${ADDRESS_URL}/${payload.id}`,
        method: "PATCH",
        data: payload.body,
      }),
      invalidatesTags: [tagTypes.abandonedCart],
    }),

    // Delete cart
    deleteAddress: build.mutation({
      query: (id) => ({
        url: `${ADDRESS_URL}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.abandonedCart],
    }),
  }),
});

export const {
  useAddressQuery,
  useAddressesQuery,
  useCreateAddressMutation,
  useDeleteAddressMutation,
} = addressApi;
