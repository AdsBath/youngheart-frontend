import { createSlice } from "@reduxjs/toolkit";

interface IEditOrderSheetState {
  isOpen: boolean;
  data?: any;
}

const initialEditOrderSheetState: IEditOrderSheetState = {
  isOpen: false,
  data: undefined,
};

const orderSlice = createSlice({
  name: "orderSlice",
  initialState: {
    editOrderSheet: { ...initialEditOrderSheetState },
  },
  reducers: {
    onEditOrderOpen: (state, action) => {
      state.editOrderSheet.isOpen = true;
      state.editOrderSheet.data = action.payload;
    },
    onCloseEditOrder: (state) => {
      state.editOrderSheet.isOpen = false;
      state.editOrderSheet.data = undefined;
    },
  },
});

export const { onEditOrderOpen, onCloseEditOrder } = orderSlice.actions;

export default orderSlice.reducer;
