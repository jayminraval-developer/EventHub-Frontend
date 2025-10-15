import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const user = JSON.parse(localStorage.getItem("eventhubUser"));

  if (!user) {
    // User not logged in, redirect to login
    return <Navigate to="/login" replace />;
  }

  // User logged in, show the component
  return children;
};

export default ProtectedRoute;
