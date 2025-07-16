import { tagTypes } from "../tag-types";
import { baseApi } from "./baseApi";

const PRODUCT_URL = "/products";

const productApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    //! product list new code with prefetch
    products: build.query({
      query: (params) => ({
        url: PRODUCT_URL,
        method: "GET",
        params,
      }),
      providesTags: [tagTypes.product],
    }),

    //product collection
    getProductByCollections: build.query({
      query: () => ({
        url: `${PRODUCT_URL}/product-collection`,
        method: "GET",
      }),
      providesTags: [tagTypes.product],
    }),

    //product collection
    getOfferProducts: build.query({
      query: () => ({
        url: `${PRODUCT_URL}/offer-product`,
        method: "GET",
      }),
      providesTags: [tagTypes.product],
    }),
    //product collection
    getAllOfferProducts: build.query({
      query: () => ({
        url: `${PRODUCT_URL}/all-offer-product`,
        method: "GET",
      }),
      providesTags: [tagTypes.product],
    }),

    //! Product by id new code with prefetch
    product: build.query({
      query: (id) => ({
        url: `${PRODUCT_URL}/${id}`,
        method: "GET",
      }),
      providesTags: (result, error, id) => [{ type: tagTypes.product, id }],
    }),

    // related product
    getRelatedProduct: build.query({
      query: (categoryId) => ({
        url: `${PRODUCT_URL}/related-product/${categoryId}`,
        method: "GET",
      }),
      providesTags: [tagTypes.product],
    }),

    //! Product by slug new code with prefetch
    getProduct: build.query({
      query: (slug) => ({
        url: `${PRODUCT_URL}/get/${slug}`,
        method: "GET",
      }),
      // Prefetch related products after the product query is fulfilled
      async onQueryStarted(slug, { dispatch, queryFulfilled }) {
        try {
          const { data: product } = await queryFulfilled;
          if (product?.categoryId) {
            dispatch(
              productApi.util.prefetch(
                "getRelatedProduct",
                product?.categoryId,
                {
                  force: true, // Prefetch related products
                }
              )
            );
          }
        } catch (error) {
          // Handle error if needed
        }
      },

      transformResponse: (response: any) => ({
        ...response,
        name: response.data.name || "No name available",
      }),

      keepUnusedDataFor: 300, // Cache data for 5 minutes
      providesTags: (result, error, slug) => [
        { type: tagTypes.product, id: result?.data?.id },
      ],
    }),

    // product create
    createProduct: build.mutation({
      query: (body) => ({
        url: `${PRODUCT_URL}/add`,
        method: "POST",
        data: body,
      }),
      invalidatesTags: [tagTypes.product],
    }),

    //  product update
    updateProduct: build.mutation({
      query: (payload) => ({
        url: `${PRODUCT_URL}/${payload.id}`,
        method: "PATCH",
        data: payload.body,
      }),
      invalidatesTags: [tagTypes.product],
    }),

    // product delete
    deleteProduct: build.mutation({
      query: (id) => ({
        url: `${PRODUCT_URL}/delete/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.product],
    }),
    deleteMultipleProduct: build.mutation({
      query: (item) => ({
        url: `${PRODUCT_URL}/all/delete-many`,
        data: item,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.product],
    }),
  }),
});

export const {
  useProductsQuery,
  useProductQuery,
  useCreateProductMutation,
  useUpdateProductMutation,
  useDeleteProductMutation,
  useGetProductQuery,
  useGetRelatedProductQuery,
  useGetProductByCollectionsQuery,
  useGetOfferProductsQuery,
  useDeleteMultipleProductMutation,
  useGetAllOfferProductsQuery,
} = productApi;
