import { tagTypes } from "../tag-types";
import { baseApi } from "./baseApi";

const PRODUCT_COLLECTION_URL = "/product-collection";

const productCollectionApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    //productCollection list
    productCollections: build.query({
      query: (params) => ({
        url: `${PRODUCT_COLLECTION_URL}`,
        method: "GET",
        params,
      }),
      providesTags: [tagTypes.productCollection],
    }),
    // productCollection by id
    productCollection: build.query({
      query: (id) => {
        return {
          url: `${PRODUCT_COLLECTION_URL}/${id}`,
          method: "GET",
        };
      },
      providesTags: [tagTypes.productCollection],
    }),

    // productCollection create
    createProductCollection: build.mutation({
      query: (body) => ({
        url: `${PRODUCT_COLLECTION_URL}`,
        method: "POST",
        data: body,
      }),
      invalidatesTags: [tagTypes.productCollection],
    }),

    //  productCollection update
    updateProductCollection: build.mutation({
      query: (payload) => ({
        url: `${PRODUCT_COLLECTION_URL}/${payload.id}`,
        method: "PATCH",
        data: payload.body,
      }),
      invalidatesTags: [tagTypes.productCollection],
    }),
    // productCollection delete
    deleteProductCollection: build.mutation({
      query: (id) => ({
        url: `${PRODUCT_COLLECTION_URL}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.productCollection],
    }),
    deleteMultipleProductCollection: build.mutation({
      query: (items) => {
        return {
          url: `${PRODUCT_COLLECTION_URL}/delete/delete-many`,
          data: items,
          method: "DELETE",
        };
      },
      invalidatesTags: [tagTypes.productCollection],
    }),
  }),
});

export const {
  useProductCollectionsQuery,
  useProductCollectionQuery,
  useCreateProductCollectionMutation,
  useUpdateProductCollectionMutation,
  useDeleteProductCollectionMutation,
  useDeleteMultipleProductCollectionMutation,
} = productCollectionApi;
