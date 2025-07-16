import { tagTypes } from "../tag-types";
import { baseApi } from "./baseApi";

const CAREER_URL = "/career";

const careerApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    // Get banner ad list
    careers: build.query({
      query: (params) => ({
        url: `${CAREER_URL}`,
        method: "GET",
        params,
      }),
      providesTags: [tagTypes.career],
    }),

    // Get banner ad list
    careerForFrontend: build.query({
      query: (params) => ({
        url: `${CAREER_URL}/frontend`,
        method: "GET",
        params,
      }),
      providesTags: [tagTypes.career],
    }),

    // Get banner ad by id
    career: build.query({
      query: (id) => ({
        url: `${CAREER_URL}/${id}`,
        method: "GET",
      }),
      providesTags: [tagTypes.career],
    }),

    // Create banner ad
    createCareer: build.mutation({
      query: (body) => ({
        url: `${CAREER_URL}/add`,
        method: "POST",
        data: body,
        credentials: "include",
        withCredentials: true,
      }),
      invalidatesTags: [tagTypes.career],
    }),

    // Update banner ad
    updateCareer: build.mutation({
      query: (payload) => ({
        url: `${CAREER_URL}/${payload.id}`,
        method: "PATCH",
        data: payload.body,
      }),
      invalidatesTags: [tagTypes.career],
    }),

    // Delete banner ad
    deleteCareer: build.mutation({
      query: (id) => ({
        url: `${CAREER_URL}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.career],
    }),
  }),
});

export const {
  useCareerForFrontendQuery,
  useCareerQuery,
  useCareersQuery,
  useCreateCareerMutation,
  useDeleteCareerMutation,
  useUpdateCareerMutation,
} = careerApi;
