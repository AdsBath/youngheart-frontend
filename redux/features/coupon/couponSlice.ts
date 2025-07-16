import { createSlice } from "@reduxjs/toolkit";

interface IEditCouponSheetState {
  isOpen: boolean;
  id?: string;
}

const initialEditCouponSheetState: IEditCouponSheetState = {
  isOpen: false,
  id: undefined,
};

interface ICouponSheetStore {
  isOpen: boolean;
}

const initialCouponSheetState: ICouponSheetStore = {
  isOpen: false,
};

const couponSlice = createSlice({
  name: "couponSlice",
  initialState: {
    newCoupon: { ...initialCouponSheetState },
    editCoupon: { ...initialEditCouponSheetState },
  },
  reducers: {
    onEditCouponOpen: (state, action) => {
      state.editCoupon.isOpen = true;
      state.editCoupon.id = action.payload;
    },
    onCloseEditCoupon: (state) => {
      state.editCoupon.isOpen = false;
      state.editCoupon.id = undefined;
    },
    onCouponOpen: (state) => {
      state.newCoupon.isOpen = true;
    },
    onCloseCoupon: (state) => {
      state.newCoupon.isOpen = false;
    },
  },
});

export const {
  onEditCouponOpen,
  onCloseEditCoupon,
  onCouponOpen,
  onCloseCoupon,
} = couponSlice.actions;

export default couponSlice.reducer;
