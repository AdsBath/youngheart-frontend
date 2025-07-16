import { getCookieValue } from "@/utils/getCookieValue";
import { tagTypes } from "../tag-types";
import { baseApi } from "./baseApi";

const ORDER_URL = "/orders";

const sessionId = getCookieValue("sessionId");

const orderApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    // Get orders
    orders: build.query({
      query: (params) => ({
        url: `${ORDER_URL}`,
        method: "GET",
        params,
      }),
      providesTags: [tagTypes.carts],
    }),

    // Get order by id
    order: build.query({
      query: (id) => ({
        url: `${ORDER_URL}/${id}`,
        method: "GET",
      }),
      providesTags: [tagTypes.carts],
    }),

    // Get order overview
    orderOverview: build.query({
      query: (id) => ({
        url: `${ORDER_URL}/order-overview`,
        method: "GET",
      }),
      providesTags: [tagTypes.carts],
    }),

    // Get order analytics
    orderAnalytics: build.query({
      query: (params) => ({
        url: `${ORDER_URL}/order-analytics`,
        method: "GET",
        params,
      }),
      providesTags: [tagTypes.carts],
    }),
    // Get order analytics
    getTopTenCategory: build.query({
      query: (params) => ({
        url: `${ORDER_URL}/top-ten-category`,
        method: "GET",
        params,
      }),
      providesTags: [tagTypes.carts],
    }),
    // Get order analytics
    getTopTenProducts: build.query({
      query: (params) => ({
        url: `${ORDER_URL}/top-ten-products`,
        method: "GET",
        params,
      }),
      providesTags: [tagTypes.carts],
    }),

    // Get order analytics
    getDailyDataForMonth: build.query({
      query: (params) => ({
        url: `${ORDER_URL}/order-monthly-data`,
        method: "GET",
        params,
      }),
      providesTags: [tagTypes.carts],
    }),

    // Create order
    createOrder: build.mutation({
      query: (body) => ({
        url: `${ORDER_URL}/add`,
        method: "POST",
        data: body,
      }),
      invalidatesTags: [tagTypes.carts],
    }),

    // Get order by id
    myOrderById: build.query({
      query: (id) => ({
        url: `${ORDER_URL}/my-order/${id}`,
        method: "GET",
      }),
      providesTags: [tagTypes.carts],
    }),

    // Get order by id
    myOrder: build.query({
      query: () => ({
        url: `${ORDER_URL}/get-my-order?sessionId=${sessionId}`,
        method: "GET",
        withCredentials: true,
      }),
      providesTags: [tagTypes.carts],
    }),

    // Update order
    updateOrder: build.mutation({
      query: (payload) => ({
        url: `${ORDER_URL}/${payload.id}`,
        method: "PATCH",
        data: payload.body,
      }),
      invalidatesTags: [tagTypes.carts],
    }),
    // Update order status
    updateOrderStatus: build.mutation({
      query: (payload) => ({
        url: `${ORDER_URL}/update-status/${payload.id}`,
        method: "PATCH",
        data: payload.body,
      }),
      invalidatesTags: [tagTypes.carts],
    }),

    // Delete order
    deleteOrder: build.mutation({
      query: (id) => ({
        url: `${ORDER_URL}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.carts],
    }),
    deleteMultipleOrder: build.mutation({
      query: (item) => ({
        url: `${ORDER_URL}/delete/delete-many
        `,
        data: item,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.carts],
    }),
  }),
});

export const {
  useCreateOrderMutation,
  useDeleteOrderMutation,
  useOrderQuery,
  useOrdersQuery,
  useUpdateOrderMutation,
  useMyOrderByIdQuery,
  useUpdateOrderStatusMutation,
  useMyOrderQuery,
  useOrderOverviewQuery,
  useOrderAnalyticsQuery,
  useGetDailyDataForMonthQuery,
  useGetTopTenCategoryQuery,
  useGetTopTenProductsQuery,
  useDeleteMultipleOrderMutation,
} = orderApi;
