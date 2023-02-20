import Swal from "sweetalert2";
import { deleteOne, getList, getOne } from "../../utils/data-provider";
import { ErrorsReducer, IsErrorReducer } from "../slices/errorsSlice";
import { GetAllUsersReducer, GetOneUserReducer } from "../slices/usersSlice";
//############# Get all users #############
//#######################################
export const GetAllUsersAction = () => async (dispatch) => {
  try {
    const data = await getList("users");
    dispatch(GetAllUsersReducer(data));
  } catch (error) {
    dispatch(IsErrorReducer(true));
    dispatch(ErrorsReducer(error.response.data));
  }
};

//############# Get one users #############
//#######################################
export const GetOneUserAction = (id) => async (dispatch) => {
  try {
    const data = await getOne("users", id);
    dispatch(GetOneUserReducer(data));
  } catch (error) {
    dispatch(IsErrorReducer(true));
    dispatch(ErrorsReducer(error.response.data));
  }
};

//############# Get one users #############
//#######################################
export const DeleteUserAction = (id) => async (dispatch) => {
  Swal.fire({
    title: "Do you want to delete this user?",
    showCancelButton: true,
    confirmButtonText: "Delete",
  }).then(async (result) => {
    /* Read more about isConfirmed, isDenied below */
    if (result.isConfirmed) {
      try {
        await deleteOne("users", id);
        Swal.fire("User delete", "success");
        dispatch(GetAllUsersAction());
      } catch (error) {
        dispatch(IsErrorReducer(true));
        dispatch(ErrorsReducer(error.response.data));
      }
    }
  });
};
