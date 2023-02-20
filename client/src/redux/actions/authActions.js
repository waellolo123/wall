import JWTDecode from "jwt-decode";
import { RemoveCookies, setCookies } from "../../utils/cookies";
import { create } from "../../utils/data-provider";
import { ConnectReducer, UserReducer } from "../slices/authSlice";
import { ErrorsReducer, IsErrorReducer } from "../slices/errorsSlice";
//############# Register Action #############
// @param form, navigate
//#######################################
export const RegisterAction = (form, navigate) => async (dispatch) => {
  try {
    await create("register", form);
    navigate("/login");
    dispatch(IsErrorReducer(false));
    dispatch(ErrorsReducer({}));
  } catch (error) {
    dispatch(IsErrorReducer(true));
    dispatch(ErrorsReducer(error.response.data));
  }
};

//############# Login Action #############
// @param: form
//#######################################
export const LoginAction = (form) => async (dispatch) => {
  try {
    const data = await create("login", form);
    const { token } = data.data;
    setCookies(token);
    const decoded = JWTDecode(token);
    dispatch(ConnectReducer(true));
    dispatch(UserReducer(decoded));
    dispatch(IsErrorReducer(false));
    dispatch(ErrorsReducer({}));
  } catch (error) {
    dispatch(IsErrorReducer(true));
    dispatch(ErrorsReducer(error.response.data));
  }
};

//############# Login Action #############
// @param: form
//#######################################
export const LogoutAction = (form) => async (dispatch) => {
  try {
    await create("logout", form);
    RemoveCookies();
    window.location.href = "/login";
  } catch (error) {
    dispatch(IsErrorReducer(true));
    dispatch(ErrorsReducer(error.response.data));
  }
};

//############# SetCurrentUser Action #############
// @Param decoded token
//################################################
export const setCurrentUser = (decoded) => (dispatch) => {
  dispatch(ConnectReducer(true));
  dispatch(UserReducer(decoded));
};
