import { getCookieValue } from "@/utils/getCookieValue";
import { tagTypes } from "../tag-types";
import { baseApi } from "./baseApi";

const User_URL = "/user";

const sessionId = getCookieValue("sessionId");

const userApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    // Get User list
    users: build.query({
      query: () => ({
        url: `${User_URL}`,
        method: "GET",
      }),
      providesTags: [tagTypes.user],
    }),
    // Get User by session ID
    test: build.query({
      query: (id) => {
        return {
          url: `${User_URL}/current/${id?.id}`,
          method: "GET",
          withCredentials: true,
        };
      },
      providesTags: [tagTypes.carts],
    }),
    userBySessionId: build.query({
      query: (id) => {
        return {
          url: `${User_URL}/current/${id?.id}`,
          method: "GET",
          withCredentials: true,
        };
      },
      providesTags: [tagTypes.carts],
    }),

    // Get User by id
    user: build.query({
      query: (id) => ({
        url: `${User_URL}/${id}`,
        method: "GET",
      }),
      providesTags: [tagTypes.user],
    }),
    // Get User by id
    getMe: build.query({
      query: (id) => ({
        url: `${User_URL}/get-me?id=${sessionId}`,
        method: "GET",
        withCredentials: true,
      }),
      providesTags: [tagTypes.auth],
    }),

    // Create User
    createUser: build.mutation({
      query: (body) => ({
        url: `${User_URL}/add`,
        method: "POST",
        data: body,
      }),
      invalidatesTags: [tagTypes.user],
    }),

    // Update User
    updateUser: build.mutation({
      query: (payload) => ({
        url: `${User_URL}/${payload.id}`,
        method: "PATCH",
        data: payload.body,
      }),
      invalidatesTags: [tagTypes.user],
    }),
    // Delete User
    deleteUser: build.mutation({
      query: (id) => ({
        url: `${User_URL}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.user],
    }),
    // Get All Admin List
    fetchAllAdmin: build.query({
      query: () => ({
        url: `${User_URL}/all-admin`,
        method: "GET",
      }),
      providesTags: [tagTypes.auth, tagTypes.user],
    }),
    // Get Admin by id
    admin: build.query({
      query: (id) => ({
        url: `${User_URL}/admin/${id}`,
        method: "GET",
      }),
      providesTags: [tagTypes.auth, tagTypes.user],
    }),
    // Admin me
    adminProfile: build.query({
      query: () => ({
        url: `${User_URL}/admin-profile`,
        method: "GET",
        withCredentials: true,
      }),
      providesTags: [tagTypes.auth],
    }),
    // delete admin
    deleteAdmin: build.mutation({
      query: (id) => ({
        url: `${User_URL}/delete-admin/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.auth, tagTypes.user],
    }),
  }),
});

export const {
  useUsersQuery,
  useUserQuery,
  useCreateUserMutation,
  useUpdateUserMutation,
  useDeleteUserMutation,
  useUserBySessionIdQuery,
  useGetMeQuery,
  useFetchAllAdminQuery,
  useAdminProfileQuery,
  useDeleteAdminMutation,
  useAdminQuery,
  useTestQuery,
} = userApi;
