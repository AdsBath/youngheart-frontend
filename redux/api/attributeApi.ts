import { tagTypes } from "../tag-types";
import { baseApi } from "./baseApi";

const ATTRIBUTE_URL = "/attribute";
const ATTRIBUTE_ITEM_URL = "/attribute-item";

const attributeApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    //variants list
    variants: build.query({
      query: (params) => ({
        url: `${ATTRIBUTE_URL}`,
        method: "GET",
        params,
      }),
      providesTags: [tagTypes.variants],
    }),
    // Variant by id
    Variant: build.query({
      query: (id) => ({
        url: `${ATTRIBUTE_URL}/${id}`,
        method: "GET",
      }),
      providesTags: [tagTypes.variants],
    }),

    // Variant create
    createVariant: build.mutation({
      query: (body) => ({
        url: `${ATTRIBUTE_URL}/add`,
        method: "POST",
        data: body,
      }),
      invalidatesTags: [tagTypes.variants],
    }),

    //  Variant update
    updateVariant: build.mutation({
      query: (paylod) => ({
        url: `${ATTRIBUTE_URL}/${paylod.id}`,
        method: "PATCH",
        data: paylod.body,
      }),
      invalidatesTags: [tagTypes.variants],
    }),
    // Variant delete
    deleteVariant: build.mutation({
      query: (id) => ({
        url: `${ATTRIBUTE_URL}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.variants],
    }),
  }),
});

export const {
  useVariantsQuery,
  useVariantQuery,
  useCreateVariantMutation,
  useUpdateVariantMutation,
  useDeleteVariantMutation,
} = attributeApi;

const attributeItemApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    //variants list
    variantItems: build.query({
      query: (params) => ({
        url: `${ATTRIBUTE_ITEM_URL}`,
        method: "GET",
        params,
      }),
      providesTags: [tagTypes.variants],
    }),
    // Variant by id
    variantItem: build.query({
      query: (id) => ({
        url: `${ATTRIBUTE_ITEM_URL}/${id}`,
        method: "GET",
      }),
      providesTags: [tagTypes.variants],
    }),

    // Variant create
    createVariantItem: build.mutation({
      query: (body) => ({
        url: `${ATTRIBUTE_ITEM_URL}/add`,
        method: "POST",
        data: body,
      }),
      invalidatesTags: [tagTypes.variants],
    }),

    //  Variant update
    updateVariantItem: build.mutation({
      query: (paylod) => ({
        url: `${ATTRIBUTE_ITEM_URL}/${paylod.id}`,
        method: "PATCH",
        data: paylod.body,
      }),
      invalidatesTags: [tagTypes.variants],
    }),
    // Variant delete
    deleteVariantItem: build.mutation({
      query: (id) => ({
        url: `${ATTRIBUTE_ITEM_URL}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.variants],
    }),
    deleteMultipleVariantItem: build.mutation({
      query: (items) => ({
        url: `${ATTRIBUTE_ITEM_URL}/delete/delete-many`,
        data: items,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.variants],
    }),
  }),
});

export const {
  useVariantItemsQuery,
  useVariantItemQuery,
  useCreateVariantItemMutation,
  useUpdateVariantItemMutation,
  useDeleteVariantItemMutation,
  useDeleteMultipleVariantItemMutation,
} = attributeItemApi;
