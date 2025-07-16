import { tagTypes } from "../tag-types";
import { baseApi } from "./baseApi";

const BLOG_URL = "/blog";

const blogApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    // Get banner ad list
    blogs: build.query({
      query: (params) => ({
        url: `${BLOG_URL}`,
        method: "GET",
        params,
      }),
      providesTags: [tagTypes.blog],
    }),

    // Get banner ad list
    blogForFrontend: build.query({
      query: (params) => ({
        url: `${BLOG_URL}/frontend`,
        method: "GET",
        params,
      }),
      providesTags: [tagTypes.blog],
    }),

    // Get banner ad by id
    blog: build.query({
      query: (id) => ({
        url: `${BLOG_URL}/${id}`,
        method: "GET",
      }),
      providesTags: [tagTypes.blog],
    }),

    // Get banner ad by id
    getBlogBySlug: build.query({
      query: (slug) => ({
        url: `${BLOG_URL}/get/${slug}`,
        method: "GET",
      }),
      providesTags: [tagTypes.blog],
    }),

    // Create banner ad
    createBlog: build.mutation({
      query: (body) => ({
        url: `${BLOG_URL}/add`,
        method: "POST",
        data: body,
        credentials: "include",
        withCredentials: true,
      }),
      invalidatesTags: [tagTypes.blog],
    }),

    // Update banner ad
    updateBlog: build.mutation({
      query: (payload) => ({
        url: `${BLOG_URL}/${payload.id}`,
        method: "PATCH",
        data: payload.body,
      }),
      invalidatesTags: [tagTypes.blog],
    }),

    // Delete banner ad
    deleteBlog: build.mutation({
      query: (id) => ({
        url: `${BLOG_URL}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.blog],
    }),
  }),
});

export const {
  useBlogQuery,
  useBlogsQuery,
  useCreateBlogMutation,
  useUpdateBlogMutation,
  useDeleteBlogMutation,
  useBlogForFrontendQuery,
  useGetBlogBySlugQuery,
} = blogApi;
