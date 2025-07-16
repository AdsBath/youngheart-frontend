import { tagTypes } from "../tag-types";
import { baseApi } from "./baseApi";

const FEATURE_URL = "/feature";

const featureApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    //feature list
    features: build.query({
      query: (params) => ({
        url: `${FEATURE_URL}`,
        method: "GET",
        params,
      }),
      providesTags: [tagTypes.feature],
    }),
    // feature by id
    feature: build.query({
      query: (id) => {
        return {
          url: `${FEATURE_URL}/${id}`,
          method: "GET",
        };
      },
      providesTags: [tagTypes.feature],
    }),

    // feature create
    createFeature: build.mutation({
      query: (body) => ({
        url: `${FEATURE_URL}`,
        method: "POST",
        data: body,
      }),
      invalidatesTags: [tagTypes.feature],
    }),

    //  feature update
    updateFeature: build.mutation({
      query: (payload) => ({
        url: `${FEATURE_URL}/${payload.id}`,
        method: "PATCH",
        data: payload.body,
      }),
      invalidatesTags: [tagTypes.feature],
    }),
    // feature delete
    deleteFeature: build.mutation({
      query: (id) => ({
        url: `${FEATURE_URL}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.feature],
    }),
    deleteMultipleFeature: build.mutation({
      query: (items) => {
        return {
          url: `${FEATURE_URL}/delete/delete-many`,
          data: items,
          method: "DELETE",
        };
      },
      invalidatesTags: [tagTypes.feature],
    }),
  }),
});

export const {
  useFeaturesQuery,
  useFeatureQuery,
  useCreateFeatureMutation,
  useUpdateFeatureMutation,
  useDeleteFeatureMutation,
  useDeleteMultipleFeatureMutation,
} = featureApi;
