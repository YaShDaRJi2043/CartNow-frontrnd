import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

const PrivateRoute = ({ role }) => {
  const { userToken, adminToken } = useSelector((state) => state.auth);

  if (role === "user") {
    return userToken ? <Outlet /> : <Navigate to="/signin" />;
  } else if (role === "admin") {
    return adminToken ? <Outlet /> : <Navigate to="/admin" />;
  } else {
    return <Navigate to="/" />;
  }
};

export default PrivateRoute;
