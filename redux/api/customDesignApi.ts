import { tagTypes } from "../tag-types";
import { baseApi } from "./baseApi";

const CUSTOM_DESIGN_URL = "/custom-design";

const customDesignApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    // custom design list
    customDesigns: build.query({
      query: (params) => ({
        url: `${CUSTOM_DESIGN_URL}`,
        method: "GET",
        params,
      }),
      providesTags: [tagTypes.customDesign],
    }),

    // custom design
    customDesign: build.query({
      query: (id) => ({
        url: `${CUSTOM_DESIGN_URL}/${id}`,
        method: "GET",
      }),
      providesTags: [tagTypes.customDesign],
    }),

    // Create customDesign
    createCustomDesign: build.mutation({
      query: (body) => ({
        url: `${CUSTOM_DESIGN_URL}/add`,
        method: "POST",
        data: body,
      }),
      invalidatesTags: [tagTypes.customDesign],
    }),

    // Update customDesign
    updateCustomDesign: build.mutation({
      query: (payload) => ({
        url: `${CUSTOM_DESIGN_URL}/${payload.id}`,
        method: "PATCH",
        data: payload.body,
      }),
      invalidatesTags: [tagTypes.customDesign],
    }),

    // Delete customDesign
    deleteCustomDesign: build.mutation({
      query: (id) => ({
        url: `${CUSTOM_DESIGN_URL}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.customDesign],
    }),
  }),
});

export const {
  useCustomDesignQuery,
  useCustomDesignsQuery,
  useCreateCustomDesignMutation,
  useDeleteCustomDesignMutation,
  useUpdateCustomDesignMutation,
} = customDesignApi;
