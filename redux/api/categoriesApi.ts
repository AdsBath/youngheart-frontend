import { tagTypes } from "../tag-types";
import { baseApi } from "./baseApi";

const CATEGORIES_URL = "/categories";

const categoriesApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    //categories list
    categories: build.query({
      query: (params) => ({
        url: `${CATEGORIES_URL}`,
        method: "GET",
        params,
      }),
      providesTags: [tagTypes.category],
    }),

    // All categories find
    allCategories: build.query({
      query: () => ({
        url: `${CATEGORIES_URL}/all-categories`,
        method: "GET",
      }),
      providesTags: [tagTypes.category],
    }),

    // top levels categories
    topLevelsCategories: build.query({
      query: () => ({
        url: `${CATEGORIES_URL}/top-labels`,
        method: "GET",
      }),
      providesTags: [tagTypes.category],
    }),

    // featured categories
    featuredCategories: build.query({
      query: () => ({
        url: `${CATEGORIES_URL}/featured`,
        method: "GET",
      }),
      providesTags: [tagTypes.category],
    }),

    // featured categories
    footerCategories: build.query({
      query: () => ({
        url: `${CATEGORIES_URL}/footer-category`,
        method: "GET",
      }),
      providesTags: [tagTypes.category],
    }),

    // elementor categories
    elementorCategories: build.query({
      query: () => ({
        url: `${CATEGORIES_URL}/elementor`,
        method: "GET",
      }),
      providesTags: [tagTypes.category],
    }),

    // menu categories
    menuCategories: build.query({
      query: () => ({
        url: `${CATEGORIES_URL}/menu`,
        method: "GET",
      }),
      providesTags: [tagTypes.category],
    }),

    // category by id
    category: build.query({
      query: (id) => ({
        url: `${CATEGORIES_URL}/${id}`,
        method: "GET",
      }),
      providesTags: [tagTypes.category],
    }),

    categoryBySlug: build.query({
      /*************  ✨ Codeium Command ⭐  *************/
      /******  19424628-e458-4e86-8842-a582e7904d17  *******/
      query: (slug) => {
        return {
          url: `${CATEGORIES_URL}/slug/${slug}`,
          method: "GET",
        };
      },
      providesTags: [tagTypes.category],
    }),

    getFilterCategory: build.query({
      query: (slug) => ({
        url: `${CATEGORIES_URL}/filter-category`,
        method: "GET",
      }),
      providesTags: [tagTypes.category],
    }),

    // category create
    createCategory: build.mutation({
      query: (body) => ({
        url: `${CATEGORIES_URL}`,
        method: "POST",
        data: body,
      }),
      invalidatesTags: [tagTypes.category],
    }),

    //  category update
    updateCategory: build.mutation({
      query: (paylod) => ({
        url: `${CATEGORIES_URL}/${paylod.id}`,
        method: "PATCH",
        data: paylod.body,
      }),
      invalidatesTags: [tagTypes.category],
    }),

    // category delete
    deleteCategory: build.mutation({
      query: (id) => ({
        url: `${CATEGORIES_URL}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.category],
    }),
  }),
});

export const {
  useCategoriesQuery,
  useTopLevelsCategoriesQuery,
  useCategoryQuery,
  useCreateCategoryMutation,
  useUpdateCategoryMutation,
  useDeleteCategoryMutation,
  useFeaturedCategoriesQuery,
  useElementorCategoriesQuery,
  useMenuCategoriesQuery,
  useCategoryBySlugQuery,
  useFooterCategoriesQuery,
  useGetFilterCategoryQuery,
  useAllCategoriesQuery,
} = categoriesApi;
