import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import "./App.css";
import Footer from "./components/Footer";
import OpenRoute from "./components/Core/auth/openRoute";
import ForgotPassword from "./Pages/Forgotpassword";

function App() {
  return (
    <Router>
      <div className="w-100vh min-h-screen bg-richblack-900 flex flex-col font-inter overflow-x-hidden">
        <Navbar />
        <Routes>
          {/* Define your routes here */}
          {/* <Route path="/" element={<Home />} /> */}
          <Route
            path="forgot-password"
            element={
              <OpenRoute>
                <ForgotPassword />
              </OpenRoute>
            }
          />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
