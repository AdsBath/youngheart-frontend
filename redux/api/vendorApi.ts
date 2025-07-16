import { tagTypes } from "../tag-types";
import { baseApi } from "./baseApi";

const VENDOR_URL = "/auth/all-partner";

const vendorApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    //Vendor list
    vendors: build.query({
      query: (params) => ({
        url: `${VENDOR_URL}`,
        method: "GET",
        params,
      }),
      providesTags: [tagTypes.vendor],
    }),
    // Vendor by id
    vendor: build.query({
      query: (id) => ({
        url: `${VENDOR_URL}/${id}`,
        method: "GET",
      }),
      providesTags: [tagTypes.vendor],
    }),

    // Vendor create
    createVendor: build.mutation({
      query: (body) => ({
        url: `${VENDOR_URL}`,
        method: "POST",
        data: body,
      }),
      invalidatesTags: [tagTypes.vendor],
    }),

    //  Vendor update
    updateVendor: build.mutation({
      query: (payload) => ({
        url: `${VENDOR_URL}/${payload.id}`,
        method: "PATCH",
        data: payload.body,
      }),
      invalidatesTags: [tagTypes.vendor],
    }),
    // Vendor delete
    deleteVendor: build.mutation({
      query: (id) => ({
        url: `${VENDOR_URL}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.vendor],
    }),
  }),
});

export const {
  useVendorsQuery,
  useVendorQuery,
  useCreateVendorMutation,
  useUpdateVendorMutation,
  useDeleteVendorMutation,
} = vendorApi;
