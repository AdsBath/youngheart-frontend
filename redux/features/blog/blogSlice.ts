import { createSlice } from "@reduxjs/toolkit";

interface IBlogStore {
  isOpen: boolean;
  id?: string;
}
interface IBlogEditStore {
  isOpen: boolean;
  id?: string;
}

const initialCreateState: IBlogStore = {
  isOpen: false,
  id: undefined,
};
const initialEditState: IBlogEditStore = {
  isOpen: false,
  id: undefined,
};

const blogSlice = createSlice({
  name: "blogDialog",
  initialState: {
    newBlog: { ...initialCreateState },
    editBlog: { ...initialEditState },
  },
  reducers: {
    onEditBlogOpen: (state, action) => {
      state.editBlog.isOpen = true;
      state.editBlog.id = action.payload;
    },
    onEditBlogClose: (state) => {
      state.editBlog.isOpen = false;
      state.editBlog.id = undefined;
    },
    onNewBlogOpen: (state) => {
      state.newBlog.isOpen = true;
    },
    onNewBlogClose: (state) => {
      state.newBlog.isOpen = false;
    },
  },
});

export const {
  onEditBlogClose,
  onEditBlogOpen,
  onNewBlogClose,
  onNewBlogOpen,
} = blogSlice.actions;
export default blogSlice.reducer;
