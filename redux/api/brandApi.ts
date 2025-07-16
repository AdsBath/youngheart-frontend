import { tagTypes } from "../tag-types";
import { baseApi } from "./baseApi";

const BRANDS_URL = "/brands";

const brandsApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    //Brands list
    brands: build.query({
      query: (params) => ({
        url: `${BRANDS_URL}`,
        method: "GET",
        params,
      }),
      providesTags: [tagTypes.brands],
    }),
    // Brand by id
    brand: build.query({
      query: (id) => ({
        url: `${BRANDS_URL}/${id}`,
        method: "GET",
      }),
      providesTags: [tagTypes.brands],
    }),

    // Brand create
    createBrand: build.mutation({
      query: (body) => ({
        url: `${BRANDS_URL}`,
        method: "POST",
        data: body,
      }),
      invalidatesTags: [tagTypes.brands],
    }),

    //  Brand update
    updateBrand: build.mutation({
      query: (paylod) => ({
        url: `${BRANDS_URL}/${paylod.id}`,
        method: "PATCH",
        data: paylod.body,
      }),
      invalidatesTags: [tagTypes.brands],
    }),
    // Brand delete
    deleteBrand: build.mutation({
      query: (id) => ({
        url: `${BRANDS_URL}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.brands],
    }),
    deleteMultipleBrand: build.mutation({
      query: (id) => ({
        url: `${BRANDS_URL}/delete/delete-many`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.brands],
    }),
  }),
});

export const {
  useBrandsQuery,
  useBrandQuery,
  useCreateBrandMutation,
  useUpdateBrandMutation,
  useDeleteBrandMutation,
  useDeleteMultipleBrandMutation,
} = brandsApi;
