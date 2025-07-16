import { createSlice } from "@reduxjs/toolkit";

interface IPageLinkStore {
  isOpen: boolean;
  id?: string;
}
interface IPageLinkEditStore {
  isOpen: boolean;
  id?: string;
}

const initialCreateState: IPageLinkStore = {
  isOpen: false,
  id: undefined,
};
const initialEditState: IPageLinkEditStore = {
  isOpen: false,
  id: undefined,
};

const pageLinkSlice = createSlice({
  name: "careerDialog",
  initialState: {
    newPageLink: { ...initialCreateState },
    editPageLink: { ...initialEditState },
  },
  reducers: {
    onEditPageLinkOpen: (state, action) => {
      state.editPageLink.isOpen = true;
      state.editPageLink.id = action.payload;
    },
    onEditPageLinkClose: (state) => {
      state.editPageLink.isOpen = false;
      state.editPageLink.id = undefined;
    },
    onNewPageLinkOpen: (state) => {
      state.newPageLink.isOpen = true;
    },
    onNewPageLinkClose: (state) => {
      state.newPageLink.isOpen = false;
    },
  },
});

export const {
  onEditPageLinkClose,
  onEditPageLinkOpen,
  onNewPageLinkClose,
  onNewPageLinkOpen,
} = pageLinkSlice.actions;
export default pageLinkSlice.reducer;
