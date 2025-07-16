import { tagTypes } from "../tag-types";
import { baseApi } from "./baseApi";

export const imageApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    //delete Banner
    deleteImage: build.mutation({
      query: (publicId) => ({
        url: `/image/${publicId}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.image],
    }),
  }),
});

export const { useDeleteImageMutation } = imageApi;
