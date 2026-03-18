import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";

const PublicRoute = ({ children }) => {
  const { token } = useContext(AuthContext);

  console.log("TOKEN NO PUBLIC ROUTE:", token);

  if (token) {
    return <Navigate to="/home" replace />;
  }

  return children;
};

export default PublicRoute;