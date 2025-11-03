// src/components/ProtectedRoute.jsx
import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import axios from "axios";

const ProtectedRoute = ({ children }) => {
  const [isValid, setIsValid] = useState(true);

  useEffect(() => {
    const verifySession = async () => {
      const token = localStorage.getItem("token");
      const deviceToken = localStorage.getItem("deviceToken");

      if (!token || !deviceToken) {
        setIsValid(false);
        return;
      }

      try {
        await axios.get("https://eventhub-backend-mveb.onrender.com/api/user/verify", {
          headers: {
            Authorization: `Bearer ${token}`,
            "x-device-token": deviceToken,
          },
        });
        setIsValid(true);
      } catch (err) {
        // Auto logout if invalid session
        localStorage.clear();
        setIsValid(false);
      }
    };

    verifySession();
  }, []);

  if (!isValid) return <Navigate to="/login" replace />;
  return children;
};

export default ProtectedRoute;
