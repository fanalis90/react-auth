import { useLocation, Navigate, Outlet } from "react-router-dom";
// import { useSelector } from "react-redux";
// import { selectCurrentToken } from "./authSlice";
import { getAuthToken } from "../../utils/authUtils";

const RequireAuth = () => {
  // const token = useSelector(selectCurrentToken);
  const token = getAuthToken()
  const location = useLocation();
console.log(token)
  return token ? (
    <Outlet />
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
};
export default RequireAuth;
