import { createSlice } from "@reduxjs/toolkit";

interface IVariantStore {
  isOpen: boolean;
  id?: string;
}
interface IVariantEditStore {
  isOpen: boolean;
  id?: string;
}

const initialCreateState: IVariantStore = {
  isOpen: false,
  id: undefined,
};
const initialEditState: IVariantEditStore = {
  isOpen: false,
  id: undefined,
};

const variantSlice = createSlice({
  name: "variantDialog",
  initialState: {
    newVariant: { ...initialCreateState },
    editVariant: { ...initialEditState },
    newVariantItem: { ...initialCreateState },
    editVariantItem: { ...initialEditState },
  },
  reducers: {
    onEditVariantOpen: (state, action) => {
      state.editVariant.isOpen = true;
      state.editVariant.id = action.payload;
    },
    onEditVariantClose: (state) => {
      state.editVariant.isOpen = false;
      state.editVariant.id = undefined;
    },
    onNewVariantOpen: (state) => {
      state.newVariant.isOpen = true;
    },
    onNewVariantClose: (state) => {
      state.newVariant.isOpen = false;
    },
    onEditVariantItemOpen: (state, action) => {
      state.editVariantItem.isOpen = true;
      state.editVariantItem.id = action.payload;
    },
    onEditVariantItemClose: (state) => {
      state.editVariantItem.isOpen = false;
      state.editVariantItem.id = undefined;
    },
    onNewVariantItemOpen: (state, action) => {
      state.newVariantItem.isOpen = true;
      state.newVariantItem.id = action.payload;
    },
    onNewVariantItemClose: (state) => {
      state.newVariantItem.isOpen = false;
      state.newVariantItem.id = undefined;
    },
  },
});

export const {
  onEditVariantOpen,
  onEditVariantClose,
  onNewVariantOpen,
  onNewVariantClose,
  onEditVariantItemOpen,
  onEditVariantItemClose,
  onNewVariantItemOpen,
  onNewVariantItemClose,
} = variantSlice.actions;
export default variantSlice.reducer;
