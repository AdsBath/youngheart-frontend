import { tagTypes } from "../tag-types";
import { baseApi } from "./baseApi";

const COUPON_URL = "/coupon";

const couponApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    //coupon list
    coupons: build.query({
      query: () => ({
        url: `${COUPON_URL}`,
        method: "GET",
      }),
      providesTags: [tagTypes.coupon],
    }),
    // coupon by id
    coupon: build.query({
      query: (id) => ({
        url: `${COUPON_URL}/${id}`,
        method: "GET",
      }),
      providesTags: [tagTypes.coupon],
    }),

    // coupon create
    createCoupon: build.mutation({
      query: (body) => ({
        url: `${COUPON_URL}/add`,
        method: "POST",
        data: body,
      }),
      invalidatesTags: [tagTypes.coupon],
    }),

    //  coupon update
    updateCoupon: build.mutation({
      query: (payload) => ({
        url: `${COUPON_URL}/${payload.id}`,
        method: "PATCH",
        data: payload.body,
      }),
      invalidatesTags: [tagTypes.coupon],
    }),
    // coupon delete
    deleteCoupon: build.mutation({
      query: (id) => ({
        url: `${COUPON_URL}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.coupon],
    }),
    deleteMultipleCoupon: build.mutation({
      query: (item) => ({
        url: `${COUPON_URL}/delete/delete-many`,
        data: item,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.coupon],
    }),
    // apply coupon
    applyCoupon: build.mutation({
      query: (data) => ({
        url: `${COUPON_URL}/apply-coupon`,
        method: "POST",
        data: data,
      }),
      invalidatesTags: [tagTypes.coupon],
    }),
  }),
});

export const {
  useCouponQuery,
  useCouponsQuery,
  useUpdateCouponMutation,
  useCreateCouponMutation,
  useDeleteCouponMutation,
  useApplyCouponMutation,
  useDeleteMultipleCouponMutation,
} = couponApi;
