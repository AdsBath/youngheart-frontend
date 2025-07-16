import { tagTypes } from "../tag-types";
import { baseApi } from "./baseApi";

const APPLICATION_URL = "/application";

const careerApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    // application list
    applications: build.query({
      query: (params) => ({
        url: `${APPLICATION_URL}`,
        method: "GET",
        params,
      }),
      providesTags: [tagTypes.application],
    }),

    // application
    application: build.query({
      query: (id) => ({
        url: `${APPLICATION_URL}/${id}`,
        method: "GET",
      }),
      providesTags: [tagTypes.application],
    }),

    // Create application
    createApplication: build.mutation({
      query: (body) => ({
        url: `${APPLICATION_URL}/add`,
        method: "POST",
        data: body,
      }),
      invalidatesTags: [tagTypes.application],
    }),

    // Update application
    updateApplication: build.mutation({
      query: (payload) => ({
        url: `${APPLICATION_URL}/${payload.id}`,
        method: "PATCH",
        data: payload.body,
      }),
      invalidatesTags: [tagTypes.application],
    }),

    // Delete application
    deleteApplication: build.mutation({
      query: (id) => ({
        url: `${APPLICATION_URL}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.application],
    }),
  }),
});

export const {
  useApplicationQuery,
  useApplicationsQuery,
  useCreateApplicationMutation,
  useDeleteApplicationMutation,
  useUpdateApplicationMutation,
} = careerApi;
