import { tagTypes } from "../tag-types";
import { baseApi } from "./baseApi";

const NOTIFICATION_URL = "/notifications";

const notificationApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    // Get all notifications
    getAllNotification: build.query({
      query: (params) => ({
        url: `${NOTIFICATION_URL}`,
        method: "GET",
        params,
      }),
      providesTags: [tagTypes.carts],
    }),

    // get user notifications
    getUserNotification: build.query({
      query: (params) => ({
        url: `${NOTIFICATION_URL}`,
        method: "GET",
        params,
      }),
      providesTags: [tagTypes.carts],
    }),

    // mask as read
    markAsRead: build.mutation({
      query: () => ({
        url: `${NOTIFICATION_URL}/read`,
        method: "PATCH",
      }),
      invalidatesTags: [tagTypes.carts],
    }),
  }),
});

export const {
  useGetAllNotificationQuery,
  useGetUserNotificationQuery,
  useMarkAsReadMutation,
} = notificationApi;
