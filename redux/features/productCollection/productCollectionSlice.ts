import { createSlice } from "@reduxjs/toolkit";

interface IEditProductCollectionSheetState {
  isOpen: boolean;
  id?: string;
}

const initialEditProductCollectionSheetState: IEditProductCollectionSheetState =
  {
    isOpen: false,
    id: undefined,
  };

interface IProductCollectionSheetStore {
  isOpen: boolean;
}

const initialProductCollectionSheetState: IProductCollectionSheetStore = {
  isOpen: false,
};

const productCollectionSlice = createSlice({
  name: "orderSlice",
  initialState: {
    newProductCollectionSheet: { ...initialProductCollectionSheetState },
    editProductCollectionSheet: { ...initialEditProductCollectionSheetState },
  },
  reducers: {
    onEditProductCollectionOpen: (state, action) => {
      state.editProductCollectionSheet.isOpen = true;
      state.editProductCollectionSheet.id = action.payload;
    },
    onCloseEditProductCollection: (state) => {
      state.editProductCollectionSheet.isOpen = false;
      state.editProductCollectionSheet.id = undefined;
    },
    onProductCollectionOpen: (state) => {
      state.newProductCollectionSheet.isOpen = true;
    },
    onCloseProductCollection: (state) => {
      state.newProductCollectionSheet.isOpen = false;
    },
  },
});

export const {
  onEditProductCollectionOpen,
  onCloseEditProductCollection,
  onProductCollectionOpen,
  onCloseProductCollection,
} = productCollectionSlice.actions;

export default productCollectionSlice.reducer;
