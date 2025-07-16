import { createSlice } from "@reduxjs/toolkit";

interface IInventoryStore {
  isOpen: boolean;
  id?: string;
}
interface IInventoryEditStore {
  isOpen: boolean;
  id?: string;
}

const initialCreateState: IInventoryStore = {
  isOpen: false,
  id: undefined,
};
const initialEditState: IInventoryEditStore = {
  isOpen: false,
  id: undefined,
};

const inventorySlice = createSlice({
  name: "inventoryDialog",
  initialState: {
    newInventory: { ...initialCreateState },
    editInventory: { ...initialEditState },
  },
  reducers: {
    onEditInventoryOpen: (state, action) => {
      state.editInventory.isOpen = true;
      state.editInventory.id = action.payload;
    },
    onEditInventoryClose: (state) => {
      state.editInventory.isOpen = false;
      state.editInventory.id = undefined;
    },
    onNewInventoryOpen: (state, action) => {
      state.newInventory.isOpen = true;
      state.newInventory.id = action.payload;
    },
    onNewInventoryClose: (state) => {
      state.newInventory.isOpen = false;
      state.newInventory.id = undefined;
    },
  },
});

export const {
  onEditInventoryOpen,
  onEditInventoryClose,
  onNewInventoryOpen,
  onNewInventoryClose,
} = inventorySlice.actions;
export default inventorySlice.reducer;
