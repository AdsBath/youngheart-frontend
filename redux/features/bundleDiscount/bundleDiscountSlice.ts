import { createSlice } from "@reduxjs/toolkit";

interface IEditBundleDiscountSheetState {
  isOpen: boolean;
  id?: string;
}

const initialEditBundleDiscountSheetState: IEditBundleDiscountSheetState = {
  isOpen: false,
  id: undefined,
};

interface IBundleDiscountSheetStore {
  isOpen: boolean;
}

const initialBundleDiscountSheetState: IBundleDiscountSheetStore = {
  isOpen: false,
};

const bundleDiscountSlice = createSlice({
  name: "bundleDiscountSlice",
  initialState: {
    newBundleDiscountSheet: { ...initialBundleDiscountSheetState },
    editBundleDiscountSheet: { ...initialEditBundleDiscountSheetState },
  },
  reducers: {
    onEditBundleDiscountOpen: (state, action) => {
      state.editBundleDiscountSheet.isOpen = true;
      state.editBundleDiscountSheet.id = action.payload;
    },
    onCloseEditBundleDiscount: (state) => {
      state.editBundleDiscountSheet.isOpen = false;
      state.editBundleDiscountSheet.id = undefined;
    },
    onBundleDiscountOpen: (state) => {
      state.newBundleDiscountSheet.isOpen = true;
    },
    onCloseBundleDiscount: (state) => {
      state.newBundleDiscountSheet.isOpen = false;
    },
  },
});

export const {
  onEditBundleDiscountOpen,
  onCloseEditBundleDiscount,
  onBundleDiscountOpen,
  onCloseBundleDiscount,
} = bundleDiscountSlice.actions;

export default bundleDiscountSlice.reducer;
