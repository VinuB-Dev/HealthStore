import { Route, Navigate } from "react-router-dom";
import { useUser } from "./context/user/userContext";

export default function PrivateRoute({ path, ...props }) {
  const {
    userState: { isLoggedIn }
  } = useUser();
  return isLoggedIn ? (
    <Route {...props} path={path} />
  ) : (
    <Navigate state={{ from: path }} to="/login" replace />
  );
}
