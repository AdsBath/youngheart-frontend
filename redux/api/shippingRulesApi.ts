import { tagTypes } from "../tag-types";
import { baseApi } from "./baseApi";

const SHIPPING_RULES_URL = "/shipping-rules";

const shippingRulesApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    //Shipping list
    shippingRules: build.query({
      query: (params) => ({
        url: `${SHIPPING_RULES_URL}`,
        method: "GET",
        params,
      }),
      providesTags: [tagTypes.shippingRules],
    }),
    // Shipping by id
    shippingRule: build.query({
      query: (id) => ({
        url: `${SHIPPING_RULES_URL}/${id}`,
        method: "GET",
      }),
      providesTags: [tagTypes.shippingRules],
    }),
    // Shipping create
    createShippingRule: build.mutation({
      query: (body) => ({
        url: `${SHIPPING_RULES_URL}/add`,
        method: "POST",
        data: body,
      }),
      invalidatesTags: [tagTypes.shippingRules],
    }),
    //  Shipping update
    updateShippingRule: build.mutation({
      query: (payload) => ({
        url: `${SHIPPING_RULES_URL}/${payload.id}`,
        method: "PATCH",
        data: payload.body,
      }),
      invalidatesTags: [tagTypes.shippingRules],
    }),
    // Shipping delete
    deleteShippingRule: build.mutation({
      query: (id) => ({
        url: `${SHIPPING_RULES_URL}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.shippingRules],
    }),
    deleteMultipleVariantItem: build.mutation({
      query: (items) => ({
        url: `${SHIPPING_RULES_URL}/delete/delete-many`,
        data: items,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.shippingRules],
    }),
  }),
});

export const {
  useCreateShippingRuleMutation,
  useDeleteShippingRuleMutation,
  useShippingRuleQuery,
  useShippingRulesQuery,
  useUpdateShippingRuleMutation,
  useDeleteMultipleVariantItemMutation,
} = shippingRulesApi;
