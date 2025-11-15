import React from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ProtectedRoute from "./components/ProtectedRoute";
import Profile from "./pages/Profile/Profile";   // <-- ADD THIS

const AppLayout = ({ children }) => {
  const location = useLocation();
  const hideNavbar = location.pathname === "/login";

  return (
    <div className="app-container">
      {!hideNavbar && <Navbar />}
      {children}
      <Footer />
    </div>
  );
};

function App() {
  return (
    <Router>
      <AppLayout>
        <Routes>
          <Route path="/login" element={<Login />} />

          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />

          {/* ✅ ADD THIS NEW ROUTE */}
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />

        </Routes>
      </AppLayout>
    </Router>
  );
}

export default App;
