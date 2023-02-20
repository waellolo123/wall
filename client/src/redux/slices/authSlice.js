import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isConnected: false,
  user: {},
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    ConnectReducer: (state, action) => {
      state.isConnected = action.payload;
    },
    UserReducer: (state, action) => {
      state.user = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { ConnectReducer, UserReducer } = authSlice.actions;

export default authSlice.reducer;
