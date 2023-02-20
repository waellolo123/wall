import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  getAll: [],
  getOne: {},
};

export const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    GetAllUsersReducer: (state, action) => {
      state.getAll = action.payload;
    },
    GetOneUserReducer: (state, action) => {
      state.getOne = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { GetAllUsersReducer, GetOneUserReducer } = usersSlice.actions;

export default usersSlice.reducer;
