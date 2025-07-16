import { createSlice } from "@reduxjs/toolkit";

interface IEditShippingRulesSheetState {
  isOpen: boolean;
  id?: string;
}

const initialEditShippingRulesSheetState: IEditShippingRulesSheetState = {
  isOpen: false,
  id: undefined,
};

interface IShippingRulesSheetStore {
  isOpen: boolean;
}

const initialShippingRulesSheetState: IShippingRulesSheetStore = {
  isOpen: false,
};

const shippingRulesSlice = createSlice({
  name: "taxRuleSlice",
  initialState: {
    newShippingRulesSheet: { ...initialShippingRulesSheetState },
    editShippingRulesSheet: { ...initialEditShippingRulesSheetState },
  },
  reducers: {
    onEditShippingRulesOpen: (state, action) => {
      state.editShippingRulesSheet.isOpen = true;
      state.editShippingRulesSheet.id = action.payload;
    },
    onCloseEditShippingRules: (state) => {
      state.editShippingRulesSheet.isOpen = false;
      state.editShippingRulesSheet.id = undefined;
    },
    onShippingRulesOpen: (state) => {
      state.newShippingRulesSheet.isOpen = true;
    },
    onCloseShippingRules: (state) => {
      state.newShippingRulesSheet.isOpen = false;
    },
  },
});

export const {
  onEditShippingRulesOpen,
  onCloseEditShippingRules,
  onShippingRulesOpen,
  onCloseShippingRules,
} = shippingRulesSlice.actions;

export default shippingRulesSlice.reducer;
