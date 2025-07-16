import { tagTypes } from "../tag-types";
import { baseApi } from "./baseApi";

const TAX_RULE_URL = "/tax-rule";

const taxRuleApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    //taxRule list
    taxRules: build.query({
      query: (params) => ({
        url: `${TAX_RULE_URL}`,
        method: "GET",
        params,
      }),
      providesTags: [tagTypes.taxRule],
    }),
    // TaxRule by id
    taxRule: build.query({
      query: (id) => ({
        url: `${TAX_RULE_URL}/${id}`,
        method: "GET",
      }),
      providesTags: [tagTypes.taxRule],
    }),

    // TaxRule create
    createTaxRule: build.mutation({
      query: (body) => ({
        url: `${TAX_RULE_URL}`,
        method: "POST",
        data: body,
      }),
      invalidatesTags: [tagTypes.taxRule],
    }),

    //  TaxRule update
    updateTaxRule: build.mutation({
      query: (payload) => ({
        url: `${TAX_RULE_URL}/${payload.id}`,
        method: "PATCH",
        data: payload.body,
      }),
      invalidatesTags: [tagTypes.taxRule],
    }),
    // TaxRule delete
    deleteTaxRule: build.mutation({
      query: (id) => ({
        url: `${TAX_RULE_URL}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.taxRule],
    }),
  }),
});

export const {
  useTaxRulesQuery,
  useTaxRuleQuery,
  useCreateTaxRuleMutation,
  useUpdateTaxRuleMutation,
  useDeleteTaxRuleMutation,
} = taxRuleApi;
