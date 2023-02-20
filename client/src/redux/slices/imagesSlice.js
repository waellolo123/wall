import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  getAll: [],
  getOne: {},
  structure: null,
};

export const imagesSlice = createSlice({
  name: "images",
  initialState,
  reducers: {
    GetAllImagesReducer: (state, action) => {
      state.getAll = action.payload;
    },
    GetOneImageReducer: (state, action) => {
      state.getOne = action.payload;
    },
    setStructure: (state, action) => {
      state.structure = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { GetAllImagesReducer, GetOneImageReducer, setStructure } =
  imagesSlice.actions;

export default imagesSlice.reducer;
