import { Navigate, Outlet } from "react-router-dom";
import { SIGNIN } from "constants/routes";
import { useAppSelector } from "store/hooks";
import { getUser } from "slices/authSlice";

type ProtectedRouteTypes = {
  redirectPath?: string;
};

const ProtectedRoute = ({ redirectPath = SIGNIN }: ProtectedRouteTypes) => {
  const user = useAppSelector(getUser);

  if (!user) {
    return <Navigate to={redirectPath} replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
