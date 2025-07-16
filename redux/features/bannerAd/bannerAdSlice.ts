import { createSlice } from "@reduxjs/toolkit";

interface IBannerAdStore {
  isOpen: boolean;
  id?: string;
}
interface IBannerAdEditStore {
  isOpen: boolean;
  id?: string;
}

const initialCreateState: IBannerAdStore = {
  isOpen: false,
  id: undefined,
};
const initialEditState: IBannerAdEditStore = {
  isOpen: false,
  id: undefined,
};

const bannerAdSlice = createSlice({
  name: "bannerAdDialog",
  initialState: {
    newBannerAd: { ...initialCreateState },
    editBannerAd: { ...initialEditState },
  },
  reducers: {
    onEditBannerAdOpen: (state, action) => {
      state.editBannerAd.isOpen = true;
      state.editBannerAd.id = action.payload;
    },
    onEditBannerAdClose: (state) => {
      state.editBannerAd.isOpen = false;
      state.editBannerAd.id = undefined;
    },
    onNewBannerAdOpen: (state) => {
      state.newBannerAd.isOpen = true;
    },
    onNewBannerAdClose: (state) => {
      state.newBannerAd.isOpen = false;
    },
  },
});

export const {
  onEditBannerAdClose,
  onEditBannerAdOpen,
  onNewBannerAdClose,
  onNewBannerAdOpen,
} = bannerAdSlice.actions;
export default bannerAdSlice.reducer;
