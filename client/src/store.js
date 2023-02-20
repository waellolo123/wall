import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./redux/slices/authSlice";
import errorsSlice from "./redux/slices/errorsSlice";
import imagesSlice from "./redux/slices/imagesSlice";
import usersSlice from "./redux/slices/usersSlice";

export const store = configureStore({
  reducer: {
    auth: authSlice,
    users: usersSlice,
    images: imagesSlice,
    errors: errorsSlice,
  },
});
