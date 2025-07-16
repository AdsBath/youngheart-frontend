import { tagTypes } from "../tag-types";
import { baseApi } from "./baseApi";

const PAGE_LINK_URL = "/page";

const pageLinkApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    // Get banner ad list
    pageLinks: build.query({
      query: (params) => ({
        url: `${PAGE_LINK_URL}`,
        method: "GET",
        params,
      }),
      providesTags: [tagTypes.pageLink],
    }),

    // Get banner ad list
    pageLinksForFrontend: build.query({
      query: (params) => ({
        url: `${PAGE_LINK_URL}/frontend`,
        method: "GET",
        params,
      }),
      providesTags: [tagTypes.pageLink],
    }),

    // Get banner ad by id
    pageLink: build.query({
      query: (id) => ({
        url: `${PAGE_LINK_URL}/${id}`,
        method: "GET",
      }),
      providesTags: [tagTypes.pageLink],
    }),

    // Create banner ad
    createPageLink: build.mutation({
      query: (body) => ({
        url: `${PAGE_LINK_URL}/add`,
        method: "POST",
        data: body,
        credentials: "include",
        withCredentials: true,
      }),
      invalidatesTags: [tagTypes.pageLink],
    }),

    // Update banner ad
    updatePageLink: build.mutation({
      query: (payload) => ({
        url: `${PAGE_LINK_URL}/${payload.id}`,
        method: "PATCH",
        data: payload.body,
      }),
      invalidatesTags: [tagTypes.pageLink],
    }),

    // Delete banner ad
    deletePageLink: build.mutation({
      query: (id) => ({
        url: `${PAGE_LINK_URL}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.pageLink],
    }),
  }),
});

export const {
  usePageLinkQuery,
  usePageLinksQuery,
  useCreatePageLinkMutation,
  useUpdatePageLinkMutation,
  useDeletePageLinkMutation,
  usePageLinksForFrontendQuery,
} = pageLinkApi;
