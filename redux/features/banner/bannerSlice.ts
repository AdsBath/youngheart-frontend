import { createSlice } from "@reduxjs/toolkit";

interface IBannerStore {
  isOpen: boolean;
  id?: string;
}
interface IBannerEditStore {
  isOpen: boolean;
  id?: string;
}

const initialCreateState: IBannerStore = {
  isOpen: false,
  id: undefined,
};
const initialEditState: IBannerEditStore = {
  isOpen: false,
  id: undefined,
};

const bannerSlice = createSlice({
  name: "bannerAdDialog",
  initialState: {
    newBanner: { ...initialCreateState },
    editBanner: { ...initialEditState },
  },
  reducers: {
    onEditBannerOpen: (state, action) => {
      state.editBanner.isOpen = true;
      state.editBanner.id = action.payload;
    },
    onEditBannerClose: (state) => {
      state.editBanner.isOpen = false;
      state.editBanner.id = undefined;
    },
    onNewBannerOpen: (state) => {
      state.newBanner.isOpen = true;
    },
    onNewBannerClose: (state) => {
      state.newBanner.isOpen = false;
    },
  },
});

export const {
  onEditBannerClose,
  onEditBannerOpen,
  onNewBannerClose,
  onNewBannerOpen,
} = bannerSlice.actions;
export default bannerSlice.reducer;
