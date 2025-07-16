import { createSlice } from "@reduxjs/toolkit";

interface IEditCategorySheetState {
  isOpen: boolean;
  id?: string;
}

const initialEditCategorySheetState: IEditCategorySheetState = {
  isOpen: false,
  id: undefined,
};

interface ICategorySheetStore {
  isOpen: boolean;
}

const initialCategorySheetState: ICategorySheetStore = {
  isOpen: false,
};

const categorySlice = createSlice({
  name: "categorySlice",
  initialState: {
    newCategorySheet: { ...initialCategorySheetState },
    editCategorySheet: { ...initialEditCategorySheetState },
  },
  reducers: {
    onEditCategoryOpen: (state, action) => {
      state.editCategorySheet.isOpen = true;
      state.editCategorySheet.id = action.payload;
    },
    onCloseEditCategory: (state) => {
      state.editCategorySheet.isOpen = false;
      state.editCategorySheet.id = undefined;
    },
    onCategoryOpen: (state) => {
      state.newCategorySheet.isOpen = true;
    },
    onCloseCategory: (state) => {
      state.newCategorySheet.isOpen = false;
    },
  },
});

export const {
  onEditCategoryOpen,
  onCloseEditCategory,
  onCategoryOpen,
  onCloseCategory,
} = categorySlice.actions;

export default categorySlice.reducer;
