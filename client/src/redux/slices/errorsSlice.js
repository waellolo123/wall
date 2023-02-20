import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isError: false,
  content: {},
};

export const errorsSlice = createSlice({
  name: "errors",
  initialState,
  reducers: {
    IsErrorReducer: (state, action) => {
      state.isError = action.payload;
    },
    ErrorsReducer: (state, action) => {
      state.content = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { ErrorsReducer, IsErrorReducer } = errorsSlice.actions;

export default errorsSlice.reducer;
