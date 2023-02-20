import { create, deleteOne, getList } from "../../utils/data-provider";
import { ErrorsReducer, IsErrorReducer } from "../slices/errorsSlice";
import { GetAllImagesReducer, setStructure } from "../slices/imagesSlice";
import Swal from "sweetalert2";

//############# Get all images #############
//#######################################
export const GetGlobalImagesAction = () => async (dispatch) => {
  try {
    const data = await getList(`images`);
    dispatch(GetAllImagesReducer(data));
  } catch (error) {
    dispatch(IsErrorReducer(true));
    dispatch(ErrorsReducer(error.response.data));
  }
};

//############# Get images by user #############
//#######################################
export const GetAllImagesAction = (id) => async (dispatch) => {
  try {
    const data = await getList(`images/${id}`);
    dispatch(GetAllImagesReducer(data));
  } catch (error) {
    dispatch(IsErrorReducer(true));
    dispatch(ErrorsReducer(error.response.data));
  }
};

//############# Delete image #############
//#######################################
export const DeleteImagesAction = (image, id) => async (dispatch) => {
  Swal.fire({
    title: "Do you want to delete this image?",
    showCancelButton: true,
    confirmButtonText: "Delete",
  }).then(async (result) => {
    /* Read more about isConfirmed, isDenied below */
    if (result.isConfirmed) {
      try {
        await deleteOne("images", id);
        Swal.fire("Good job!", "Image delete", "success");
        dispatch(GetAllImagesAction(image.user._id));
      } catch (error) {
        dispatch(IsErrorReducer(true));
        dispatch(ErrorsReducer(error.response.data));
      }
    }
  });
};

//############# Add image #############
//#######################################
export const AddImageAction = (form) => async (dispatch) => {
  console.log(form);
  try {
    await create("uploads", form);
    Swal.fire("Good job!", "Image Added", "success");
  } catch (error) {
    dispatch(IsErrorReducer(true));
    dispatch(ErrorsReducer(error.response.data));
  }
};

//############# Add structure #############
//#######################################
export const AddStructureAction = (value, navigate) => async (dispatch) => {
  await dispatch(setStructure(value));
  navigate("/upload");
};
