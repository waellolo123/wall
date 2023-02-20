import React, { useEffect } from "react";
import "./admin.css";
import userImg from "../../assets/heisen.jpg";
import { useDispatch, useSelector } from "react-redux";
import {
  DeleteUserAction,
  GetAllUsersAction,
} from "../../redux/actions/usersActions";
import {
  DeleteImagesAction,
  GetAllImagesAction,
} from "../../redux/actions/imagesActions";

const Admin = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { getAll } = useSelector((state) => state.users);
  const getAllImages = useSelector((state) => state.images.getAll);
  useEffect(() => {
    dispatch(GetAllUsersAction());
  }, []);
  return (
    <div className="admin">
      <div className="admin-container">
        <div className="users-section">
          {getAll
            .filter((u) => u._id !== user.id)
            .map((u) => {
              return (
                <div>
                  <div className="users-left">
                    <img
                      src={userImg}
                      alt=""
                      className="user-img"
                      onClick={() => dispatch(GetAllImagesAction(u._id))}
                    />
                    <span className="user-span">{u.fullname}</span>
                  </div>
                  <div className="users-right">
                    <button
                      className="users-btn"
                      onClick={() => dispatch(DeleteUserAction(u._id))}
                    >
                      Delete user
                    </button>
                  </div>
                </div>
              );
            })}
        </div>
        <div className="images-section">
          <div>Total Images: {getAllImages?.length}</div>
          <div style={{ display: "flex" }}>
            {getAllImages?.map((image) => {
              return (
                <>
                  <div className="single-image">
                    <img
                      src={`http://localhost:3400${image.image}`}
                      alt=""
                      className="single"
                    />
                    <div className="single-imageLayer"></div>
                    <button
                      className="users-btn"
                      onClick={() =>
                        dispatch(DeleteImagesAction(image, image._id))
                      }
                    >
                      Delete Image
                    </button>
                  </div>
                </>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Admin;
