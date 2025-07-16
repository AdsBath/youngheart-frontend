import { tagTypes } from "../tag-types";
import { baseApi } from "./baseApi";

const AUTH_URL = "/auth";

const authApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    login: build.mutation({
      query: (loginData) => ({
        url: `${AUTH_URL}/login`,
        method: "POST",
        data: loginData,
        credentials: "include", // Add this line
        withCredentials: true, // Add this line
      }),
      invalidatesTags: [tagTypes.auth],
    }),

    checkoutLogin: build.mutation({
      query: (loginData) => ({
        url: `${AUTH_URL}/checkout-login`,
        method: "POST",
        data: loginData,
        credentials: "include", // Add this line
        withCredentials: true, // Add this line
      }),
      invalidatesTags: [tagTypes.auth],
    }),

    logout: build.mutation({
      query: () => ({
        url: `${AUTH_URL}/logout`,
        method: "POST",
        credentials: "include", // Add this line
        withCredentials: true, // Add this line
      }),
      invalidatesTags: [tagTypes.logout],
    }),

    register: build.mutation({
      query: (registerData) => ({
        url: `${AUTH_URL}/register`,
        method: "POST",
        data: registerData,
        credentials: "include",
        withCredentials: true,
      }),
      invalidatesTags: [tagTypes.auth],
    }),

    adminLogin: build.mutation({
      query: (loginData) => ({
        url: `${AUTH_URL}/admin-login`,
        method: "POST",
        data: loginData,
        credentials: "include", // Add this line
        withCredentials: true, // Add this line
      }),
      invalidatesTags: [tagTypes.auth],
    }),
    createAdmin: build.mutation({
      query: (loginData) => ({
        url: `${AUTH_URL}/register-admin`,
        method: "POST",
        data: loginData,
      }),
      invalidatesTags: [tagTypes.auth],
    }),

    forgetPassword: build.mutation({
      query: (data) => ({
        url: `${AUTH_URL}/forgot-password`,
        method: "PATCH",
        data: data,
      }),
      invalidatesTags: [tagTypes.auth],
    }),

    adminForgetPassword: build.mutation({
      query: (data) => ({
        url: `${AUTH_URL}/admin-forgot-password`,
        method: "PATCH",
        data: data,
      }),
      invalidatesTags: [tagTypes.auth],
    }),

    changePassword: build.mutation({
      query: (data) => ({
        url: `${AUTH_URL}/change-password`,
        method: "PATCH",
        data: data,
      }),
      invalidatesTags: [tagTypes.auth],
    }),

    //set password
    setPassword: build.mutation({
      query: (data) => ({
        url: `${AUTH_URL}/set-password`,
        method: "PATCH",
        data: data,
      }),
      invalidatesTags: [tagTypes.auth],
    }),
  }),
});

export const {
  useLoginMutation,
  useLogoutMutation,
  useRegisterMutation,
  useAdminLoginMutation,
  useCreateAdminMutation,
  useCheckoutLoginMutation,
  useForgetPasswordMutation,
  useChangePasswordMutation,
  useAdminForgetPasswordMutation,
  useSetPasswordMutation,
} = authApi;
