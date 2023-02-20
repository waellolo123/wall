import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";

//####### Redux ###############
import { Provider } from "react-redux";
import { store } from "./store";
import { getCookies } from "./utils/cookies";
import jwtDecode from "jwt-decode";
import { ConnectReducer, UserReducer } from "./redux/slices/authSlice";
//#############################

const token = getCookies();
if (token) {
  const decoded = jwtDecode(token);
  store.dispatch(ConnectReducer(true));
  store.dispatch(UserReducer(decoded));
}
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
