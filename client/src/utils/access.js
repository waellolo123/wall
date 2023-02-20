import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

export const PrivateRoute = ({ children }) => {
  const { isConnected } = useSelector((state) => state.auth);

  if (!isConnected) {
    return <Navigate to={{ pathname: "/login" }} replace />;
  }
  return children;
};

export const NoPageIfConnected = ({ children }) => {
  const { isConnected } = useSelector((state) => state.auth);

  if (isConnected) {
    return <Navigate to={{ pathname: "/" }} replace />;
  }
  return children;
};

export const PrivateRole = ({ role, children }) => {
  const { roles } = useSelector((state) => state.auth.user);

  if (roles.indexOf(role) === -1) {
    return <Navigate to={{ pathname: "/" }} replace />;
  }
  return children;
};

export const UploadProvider = ({ children }) => {
  const { structure } = useSelector((state) => state.images);

  if (structure === null) {
    return <Navigate to={{ pathname: "/structure" }} replace />;
  }
  return children;
};
