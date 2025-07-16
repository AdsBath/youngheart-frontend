import { createSlice } from "@reduxjs/toolkit";

interface IDiscountBannerStore {
  isOpen: boolean;
  id?: string;
}
interface IDiscountBannerEditStore {
  isOpen: boolean;
  id?: string;
}

const initialCreateState: IDiscountBannerStore = {
  isOpen: false,
  id: undefined,
};
const initialEditState: IDiscountBannerEditStore = {
  isOpen: false,
  id: undefined,
};

const discountBannerSlice = createSlice({
  name: "discountBannerDialog",
  initialState: {
    newDiscountBanner: { ...initialCreateState },
    editDiscountBanner: { ...initialEditState },
  },
  reducers: {
    onEditDiscountBannerOpen: (state, action) => {
      state.editDiscountBanner.isOpen = true;
      state.editDiscountBanner.id = action.payload;
    },
    onEditDiscountBannerClose: (state) => {
      state.editDiscountBanner.isOpen = false;
      state.editDiscountBanner.id = undefined;
    },
    onNewDiscountBannerOpen: (state) => {
      state.newDiscountBanner.isOpen = true;
    },
    onNewDiscountBannerClose: (state) => {
      state.newDiscountBanner.isOpen = false;
    },
  },
});

export const {
  onEditDiscountBannerClose,
  onEditDiscountBannerOpen,
  onNewDiscountBannerClose,
  onNewDiscountBannerOpen,
} = discountBannerSlice.actions;
export default discountBannerSlice.reducer;
