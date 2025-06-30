import { Navigate } from "react-router";
import { useAuth } from "../context/AuthContext";

const PublicOnlyRoute = ({ children }) => {
  const { user } = useAuth();

  return user ? <Navigate to="/" /> : <>{children}</>;
};

export default PublicOnlyRoute;
