import { createSlice } from "@reduxjs/toolkit";

interface IEditAdminSheetState {
  isOpen: boolean;
  id?: string;
}

const initialEditAdminSheetState: IEditAdminSheetState = {
  isOpen: false,
  id: undefined,
};

interface IAdminSheetStore {
  isOpen: boolean;
}

const initialAdminSheetState: IAdminSheetStore = {
  isOpen: false,
};

const adminSlice = createSlice({
  name: "adminSlice",
  initialState: {
    newAdminSheet: { ...initialAdminSheetState },
    editAdminSheet: { ...initialEditAdminSheetState },
  },
  reducers: {
    onEditAdminOpen: (state, action) => {
      state.editAdminSheet.isOpen = true;
      state.editAdminSheet.id = action.payload;
    },
    onCloseEditAdmin: (state) => {
      state.editAdminSheet.isOpen = false;
      state.editAdminSheet.id = undefined;
    },
    onAdminOpen: (state) => {
      state.newAdminSheet.isOpen = true;
    },
    onCloseAdmin: (state) => {
      state.newAdminSheet.isOpen = false;
    },
  },
});

export const {
  onEditAdminOpen,
  onCloseEditAdmin,
  onAdminOpen,
  onCloseAdmin,
} = adminSlice.actions;

export default adminSlice.reducer;
