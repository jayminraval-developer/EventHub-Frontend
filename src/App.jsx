import React from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ProtectedRoute from "./components/ProtectedRoute";

const AppLayout = ({ children }) => {
  const location = useLocation();
  // Hide navbar on login page
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
          {/* Public route */}
          <Route path="/login" element={<Login />} />

          {/* Protected route */}
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />
        </Routes>
      </AppLayout>
    </Router>
  );
}

export default App;
