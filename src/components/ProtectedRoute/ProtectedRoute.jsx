import { Navigate, useLocation } from "react-router-dom";
import { useContext } from "react";
import AppContext from "../../contexts/AppContext";
import "./ProtectedRoute.css";

function ProtectedRoute({ children, anonymous = false }) {
  const location = useLocation();
  const from = location.state?.from || "/";

  const { isLoggedIn } = useContext(AppContext);

  if (anonymous && isLoggedIn) {
    return <Navigate to={from} />;
  }
  if (!anonymous && !isLoggedIn) {
    return <Navigate to="/login" state={{ from: location }} />;
  }

  return children;
}

export default ProtectedRoute;
