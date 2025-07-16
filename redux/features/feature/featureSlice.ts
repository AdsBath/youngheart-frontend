import { createSlice } from "@reduxjs/toolkit";

interface IEditFeatureSheetState {
  isOpen: boolean;
  id?: string;
}

const initialEditFeatureSheetState: IEditFeatureSheetState = {
  isOpen: false,
  id: undefined,
};

interface IFeatureSheetStore {
  isOpen: boolean;
}

const initialFeatureSheetState: IFeatureSheetStore = {
  isOpen: false,
};

const featureSlice = createSlice({
  name: "feature",
  initialState: {
    newFeatureSheet: { ...initialFeatureSheetState },
    editFeatureSheet: { ...initialEditFeatureSheetState },
  },
  reducers: {
    onEditFeatureOpen: (state, action) => {
      state.editFeatureSheet.isOpen = true;
      state.editFeatureSheet.id = action.payload;
    },
    onCloseEditFeature: (state) => {
      state.editFeatureSheet.isOpen = false;
      state.editFeatureSheet.id = undefined;
    },
    onFeatureOpen: (state) => {
      console.log("onFeatureOpen");
      state.newFeatureSheet.isOpen = true;
    },
    onCloseFeature: (state) => {
      state.newFeatureSheet.isOpen = false;
    },
  },
});

export const {
  onEditFeatureOpen,
  onCloseEditFeature,
  onFeatureOpen,
  onCloseFeature,
} = featureSlice.actions;

export default featureSlice.reducer;
