import { createSlice } from "@reduxjs/toolkit";

interface ICareerStore {
  isOpen: boolean;
  id?: string;
}
interface ICareerEditStore {
  isOpen: boolean;
  id?: string;
}

const initialCreateState: ICareerStore = {
  isOpen: false,
  id: undefined,
};
const initialEditState: ICareerEditStore = {
  isOpen: false,
  id: undefined,
};

const careerSlice = createSlice({
  name: "careerDialog",
  initialState: {
    newCareer: { ...initialCreateState },
    editCareer: { ...initialEditState },
  },
  reducers: {
    onEditCareerOpen: (state, action) => {
      state.editCareer.isOpen = true;
      state.editCareer.id = action.payload;
    },
    onEditCareerClose: (state) => {
      state.editCareer.isOpen = false;
      state.editCareer.id = undefined;
    },
    onNewCareerOpen: (state) => {
      state.newCareer.isOpen = true;
    },
    onNewCareerClose: (state) => {
      state.newCareer.isOpen = false;
    },
  },
});

export const {
  onEditCareerClose,
  onEditCareerOpen,
  onNewCareerClose,
  onNewCareerOpen,
} = careerSlice.actions;
export default careerSlice.reducer;
