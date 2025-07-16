import { createSlice } from "@reduxjs/toolkit";

interface IEditBrandSheetState {
  isOpen: boolean;
  id?: string;
}

const initialEditBrandSheetState: IEditBrandSheetState = {
  isOpen: false,
  id: undefined,
};

interface IBrandSheetStore {
  isOpen: boolean;
}

const initialBrandSheetState: IBrandSheetStore = {
  isOpen: false,
};

const brandsSlice = createSlice({
  name: "brandsSlice",
  initialState: {
    newBrandSheet: { ...initialBrandSheetState },
    editBrandSheet: { ...initialEditBrandSheetState },
  },
  reducers: {
    onEditBrandOpen: (state, action) => {
      state.editBrandSheet.isOpen = true;
      state.editBrandSheet.id = action.payload;
    },
    onCloseEditBrand: (state) => {
      state.editBrandSheet.isOpen = false;
      state.editBrandSheet.id = undefined;
    },
    onBrandOpen: (state) => {
      state.newBrandSheet.isOpen = true;
    },
    onCloseBrand: (state) => {
      state.newBrandSheet.isOpen = false;
    },
  },
});

export const { onEditBrandOpen, onCloseEditBrand, onBrandOpen, onCloseBrand } =
  brandsSlice.actions;

export default brandsSlice.reducer;
