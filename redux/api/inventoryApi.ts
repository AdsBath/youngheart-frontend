import { tagTypes } from "../tag-types";
import { baseApi } from "./baseApi";

const INVENTORY_URL = "/inventory";

const inventoryApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    // Get Inventories
    inventories: build.query({
      query: (params) => ({
        url: `${INVENTORY_URL}`,
        method: "GET",
        params,
      }),
      providesTags: [tagTypes.inventory],
    }),

    // Get Inventory by id
    inventory: build.query({
      query: (id) => ({
        url: `${INVENTORY_URL}/${id}`,
        method: "GET",
      }),
      providesTags: [tagTypes.inventory],
    }),

    // Get Inventory note by id
    inventoryNote: build.query({
      query: (id) => ({
        url: `${INVENTORY_URL}/inventory-note/${id}`,
        method: "GET",
      }),
      providesTags: [tagTypes.inventory],
    }),
    // create inventory
    createInventory: build.mutation({
      query: (data) => ({
        url: `${INVENTORY_URL}/add`,
        method: "POST",
        data: data,
      }),
      invalidatesTags: [tagTypes.inventory],
    }),

    // create inventory note
    createInventoryNote: build.mutation({
      query: (data) => ({
        url: `${INVENTORY_URL}/inventory-note/add`,
        method: "POST",
        data: data,
      }),
      invalidatesTags: [tagTypes.inventory],
    }),

    // Update inventory
    updateInventory: build.mutation({
      query: (data) => ({
        url: `${INVENTORY_URL}/${data.id}`,
        method: "PATCH",
        data: data.body,
      }),
      invalidatesTags: [tagTypes.inventory],
    }),

    // Update inventory note
    updateInventoryNote: build.mutation({
      query: (data) => ({
        url: `${INVENTORY_URL}/inventory-note/${data.id}`,
        method: "PATCH",
        data: data.body,
      }),
      invalidatesTags: [tagTypes.inventory],
    }),

    // Delete inventory
    deleteInventory: build.mutation({
      query: (id) => ({
        url: `${INVENTORY_URL}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.inventory],
    }),
  }),
});

export const {
  useInventoryQuery,
  useInventoriesQuery,
  useCreateInventoryMutation,
  useDeleteInventoryMutation,
  useUpdateInventoryMutation,
  useCreateInventoryNoteMutation,
  useUpdateInventoryNoteMutation,
  useInventoryNoteQuery,
} = inventoryApi;
